module.exports = function(ctx) {
    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');

    var nodeModulesPath = ctx.opts.projectRoot + "/node_modules";
    var platformJsLibRoot = path.join(ctx.opts.projectRoot, '/platforms/browser/www/js/lib');

    var hardCodedMuduleFiles = [
        ["excalibur.min.js", "/excalibur/dist/excalibur.min.js"]
    ];

    if (!fs.existsSync(nodeModulesPath)) {
        console.log("Node modules path: " + nodeModulesPath);
        console.log("No 'node_modules' detected. Perhaps run 'npm install' in the root directory");
        return;
    }

    if (!fs.existsSync(platformJsLibRoot)) {
        fs.mkdirSync(platformJsLibRoot);
    }

    hardCodedMuduleFiles.forEach(function(moduleFileConfig) {
        var sourceFile = nodeModulesPath + moduleFileConfig[1];
        var destFile = platformJsLibRoot + "/" + moduleFileConfig[0];
        console.log("Copy module: " + moduleFileConfig[0]);
        fs.createReadStream(sourceFile).pipe(fs.createWriteStream(destFile));
    });
    return;
};
