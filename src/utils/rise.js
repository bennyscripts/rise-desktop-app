const fs = require('fs');
const path = require('path');
const RiseConfig = require('../utils/riseConfig');

class Rise {
    constructor() {
        this.config = RiseConfig;
        this.themesDir = path.join(this.config.risePath, 'Themes');
        this.scriptsDir = path.join(this.config.risePath, 'Scripts');
    }

    getThemes() {
        let themes = [];
        let themeFiles = fs.readdirSync(this.themesDir);
        themeFiles = themeFiles.filter(file => file.endsWith('.json'));
        
        themeFiles.forEach(filename => {
            let themePath = path.join(this.themesDir, filename);
            themes.push({
                name: filename.replace('.json', ''),
                path: themePath,
            })
        });

        return themes;
    }

    getScripts() {
        let scripts = [];
        let scriptFiles = fs.readdirSync(this.scriptsDir);
        scriptFiles = scriptFiles.filter(file => file.endsWith('.py'));
    
        scriptFiles.forEach(filename => {
            let scriptPath = path.join(this.scriptsDir, filename);
            scripts.push({
                name: filename.replace('.py', ''),
                path: scriptPath,
            })
        });

        return scripts;
    }
}

module.exports = new Rise();