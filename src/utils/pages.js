const fs = require('fs');
const path = require('path');
const rootPath = __dirname.replace('src', '');

class Pages {
    constructor() {
        this.pages = fs.readdirSync(path.join(rootPath, '../app/pages'));
        this.index = path.join(rootPath, '../app/index.html');
    }

    getPage(page) {
        return path.join(rootPath, '../app/pages/' + page + '.html'); 
    }
}

module.exports = new Pages();