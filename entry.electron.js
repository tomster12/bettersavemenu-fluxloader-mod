const styleFilePath = path.join(fluxloaderAPI.getModsPath(), "bettersavemenu", "bettersavemenu.css");

log("info", "bettersavemenu", `Including css from path: ${styleFilePath}`);

// ------------------------------------------------------------------------------------------------------------

fluxloaderAPI.setPatch("index.html", "bettersavemenu:add-styles", {
    type: "replace",
    from: "<title>Sandustry Demo</title>",
    to: `$<link rel="stylesheet" type="text/css" href="${styleFilePath}" />`,
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-1", {
    type: "replace",
    from: '"div",tT({ref:a,',
    to: '$ className: "bsm-menu-wrapper",',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-2", {
    type: "replace",
    from: 'US.div,tT({initial:{y:10},animate:{y:0},transition:{y:{duration:.1}},className:"h-full bg-black bg-opacity-85 p-4 shadow-lg ui-box card-2 text-white',
    to: '$ bsm-menu-content',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-list", {
    type: "replace",
    from: 'space-y-4 mb-4 max-h-[40vh] overflow-y-auto pr-2',
    to: '$ bsm-save-list',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save", {
    type: "replace",
    from: 'p-3 rounded-lg transition-all duration-200 border\\n',
    to: '$ bsm-save',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-inner", {
    type: "replace",
    from: 'flex items-start space-x-3 cursor-pointer w-full',
    to: '$ bsm-save-inner',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-info-row-1", {
    type: "replace",
    from: 'flex flex-col flex-grow',
    to: '$ bsm-save-info-row-1',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-select", {
    type: "replace",
    from: 'mt-1.5 form-radio text-blue-600',
    to: '$ bsm-save-select',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-name", {
    type: "replace",
    from: 'text-lg font-semibold mb-1"',
    to: 'bsm-save-name $',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-info-row-2", {
    type: "replace",
    from: 'text-sm space-y-1.5',
    to: '$ bsm-save-info-row-2',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-info-item-1", {
    type: "replace",
    from: 'flex items-center text-gray-400',
    to: '$ bsm-save-info-item',
    expectedMatches: 2,
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:add-class-bsm-save-info-item-2", {
    type: "replace",
    from: 'flex items-center space-x-4 text-gray-400',
    to: '$ bsm-save-info-item',
    token: "$"
});

// ------------------------------------------------------------------------------------------------------------

fluxloaderAPI.setPatch("js/bundle.js", "bettersavemenu:speedup-get-saves", {
    type: "replace",
    from: "window.electron.getSaveFiles()",
    to: `window.electron.invoke("mod:bsm-get-save-files")`,
    expectedMatches: 2,
});

fluxloaderAPI.handleGameIPC("bsm-get-save-files", async () => {
    const userData = await fluxloaderAPI.getUserDataPath();
    const storePath = path.join(userData, "..", "sandustrydemo", "saves");
    if (!fs.existsSync(storePath)) return [];

    const readFileMetadataAsync = async (file) => {
        try {
            const filePath = path.join(storePath, file);
            const stream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 1024 });
            let firstLine = '';
            for await (const chunk of stream) {
                const newlineIndex = chunk.indexOf('\n');
                if (newlineIndex !== -1) {
                    firstLine += chunk.slice(0, newlineIndex);
                    stream.close();
                    break;
                }
                firstLine += chunk;
            }
            return JSON.parse(firstLine);
        } catch (err) {
            log("error", "bettersavemenu", `Failed to read metadata from save file ${file}: ${err.toString()}`);
            return null;
        }
    };

    const allFiles = await fs.promises.readdir(storePath);
    let saveFiles = allFiles.filter(f => f.endsWith('.save'));
    const saveMetadatas = await Promise.all(saveFiles.map(readFileMetadataAsync));
    return saveMetadatas.filter(Boolean);
});