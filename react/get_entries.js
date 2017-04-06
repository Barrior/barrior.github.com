const fs = require('fs');

module.exports = function getEntries(path) {

    let entries = {};

    fs.readdirSync(path).forEach(child => {
        let childPath = `${path}\\${child}`;

        let stat = fs.statSync(childPath);

        switch (stat.mode) {
            //33206表示文件
            case 33206:
                if (child.indexOf('.html') !== -1) {
                    let name = child.slice(0, -5);
                    entries[name] = `./${name}/${name}.js`;
                }
                break;
            //16822表示文件夹
            case 16822:
                if (child !== 'node_modules') {
                    Object.assign(entries, getEntries(childPath))
                }
                break;
        }
    });

    return entries;
};