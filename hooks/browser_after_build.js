module.exports = function(ctx) {
    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');

    var nodeModulesPath = ctx.opts.projectRoot + "/node_modules";
    var jsRoot = path.join(ctx.opts.projectRoot, '/www/js/lib');

    var hardCodedMuduleFiles = [
        ["excalibur.min.js", "/excalibur/dist/excalibur.min.js"]
    ];

    if (!fs.existsSync(nodeModulesPath)) {
        console.log("Node modules path: " + nodeModulesPath);
        console.log("No 'node_modules' detected. Perhaps run 'npm install' in the root directory");
        return;
    }

    if (!fs.existsSync(jsRoot)) {
        fs.mkdirSync(jsRoot);
    }

    hardCodedMuduleFiles.forEach(function(moduleFileConfig) {
        var sourceFile = nodeModulesPath + moduleFileConfig[1];
        var destFile = jsRoot + "/" + moduleFileConfig[0];
        console.log("Copy module: " + moduleFileConfig[0]);
        fs.createReadStream(sourceFile).pipe(fs.createWriteStream(destFile));
    });
    return;
};
