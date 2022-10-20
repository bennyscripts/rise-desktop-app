const Config = require('../utils/config');
const fs = require('fs');
const path = require('path');

class RiseConfig {
    constructor() {
        this.risePath = Config.getRisePath();
        this.config = JSON.parse(fs.readFileSync(path.join(this.risePath, 'config.json'), 'utf8'));
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
        fs.writeFileSync(path.join(this.risePath, 'config.json'), JSON.stringify(this.config, null, 2));
    }
}

module.exports = new RiseConfig();