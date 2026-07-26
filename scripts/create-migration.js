/***
 * 1. Crear un fichero en una ruta específica
 * 
 */

const fs = require('fs/promises')
const path = require('path')

const template = `const { sql } = require("slonik");

    const up = sql.unsafe\`\`;

    const down = sql.unsafe\`\`;
    module.exports = {
        up,
        down
    }
`;

const migrationsPath = path.join(__dirname, '../migrations');

(async () => {
    try {
        const [, , name] = process.argv;

        if(!name) return console.log("It needs a param in order to continue");
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${timestamp}_${name}.js`;
        
        await fs.writeFile(path.join(migrationsPath, fileName), template);

        console.log('> [SUCCESS]: migrations file successfully created')

    } catch (error) {
        console.log("> [ERROR]: ", error.message);
    }    
})();
