const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.filename = filename;
    }

    readFile() {
        const filepath = path.join(process.cwd(), 'db', this.filename);
        console.log(`Reading from file: ${filepath}`);
        return fs.readFileSync(filepath, "utf8");
    }

    writeFile(data) {
        const filepath = path.join(process.cwd(), 'db', this.filename);
        console.log(`Writing to file: ${filepath}`);
        fs.writeFileSync(filepath, data, "utf8");
    }
}

module.exports = {
     DBConnector,
};