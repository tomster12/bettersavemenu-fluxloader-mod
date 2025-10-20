
const styleFilePath = path.join(modPath, "bettermenu.css");

log("info", "bettermenu", `Including css from path: ${styleFilePath}`);

fluxloaderAPI.setPatch("index.html", "bettermenu:add-styles", {
    type: "replace",
    from: "<title>Sandustry Demo</title>",
    to: `$<link rel="stylesheet" type="text/css" href="${styleFilePath}" />`,
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-1", {
    type: "replace",
    from: '"div",tT({ref:a,',
    to: '$ className: "bettermenu-menu-wrapper",',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-2", {
    type: "replace",
    from: 'US.div,tT({initial:{y:10},animate:{y:0},transition:{y:{duration:.1}},className:"h-full bg-black bg-opacity-85 p-4 shadow-lg ui-box card-2 text-white',
    to: '$ bettermenu-menu-content',
    token: "$"
});


fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-list", {
    type: "replace",
    from: 'space-y-4 mb-4 max-h-[40vh] overflow-y-auto pr-2',
    to: '$ bettermenu-save-list',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save", {
    type: "replace",
    from: 'p-3 rounded-lg transition-all duration-200 border\\n',
    to: '$ bettermenu-save',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-inner", {
    type: "replace",
    from: 'flex items-start space-x-3 cursor-pointer w-full',
    to: '$ bettermenu-save-inner',
    token: "$"
});



fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-info-row-1", {
    type: "replace",
    from: 'flex flex-col flex-grow',
    to: '$ bettermenu-save-info-row-1',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-select", {
    type: "replace",
    from: 'mt-1.5 form-radio text-blue-600',
    to: '$ bettermenu-save-select',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-name", {
    type: "replace",
    from: 'text-lg font-semibold mb-1"',
    to: 'bettermenu-save-name $',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-info-row-2", {
    type: "replace",
    from: 'text-sm space-y-1.5',
    to: '$ bettermenu-save-info-row-2',
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-info-item-1", {
    type: "replace",
    from: 'flex items-center text-gray-400',
    to: '$ bettermenu-save-info-item',
    expectedMatches: 2,
    token: "$"
});

fluxloaderAPI.setPatch("js/bundle.js", "bettermenu:add-class-bettermenu-save-info-item-2", {
    type: "replace",
    from: 'flex items-center space-x-4 text-gray-400',
    to: '$ bettermenu-save-info-item',
    token: "$"
});
