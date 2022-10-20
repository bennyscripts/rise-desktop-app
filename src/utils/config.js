const fs = require('fs');
const path = require('path');
const rootPath = __dirname.replace('utils', '');

class Config {
    constructor() {
        this.config = JSON.parse(fs.readFileSync(path.join(rootPath, 'data/config.json'), 'utf8'));

        if (this.config.risePath === null || this.config.risePath === "") {
            console.error("Rise path is null! Please set one in src/data/config.json");
            process.exit(1);
        }
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
        fs.writeFileSync(path.join(rootPath, 'data/config.json'), JSON.stringify(this.config, null, 2));
    }

    getRisePath() {
        let userDir = process.env.USERPROFILE || process.env.HOME;
        let risePath = this.get('risePath');
        
        if (risePath === null) {
            return null;
        }

        return risePath.replace('{USER}', userDir);
    }
    
    setRisePath(path) {
        this.set('risePath', path);
    }
}

module.exports = new Config();