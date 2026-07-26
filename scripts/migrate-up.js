/**
 * 1. Crear tabla de control, si no existe
 * 2. Comprobar que en el directorio de migraciones, hay migraciones
 * 3. Extraer todas las migracioneshechas de la tabla de control
 * 4. Hacemos Set para almacenar las migraciones hechas 
 *  Y por cada una:
      4a. Comprobamos si ya existe.
      4b. Si existe: no hacemos nada.
      4c. Si no existe: Corremos la migración y actualizamos tabla de control.
 */
const fs = require("fs/promises");
const path = require("path");
const { sql } = require("slonik");
const db = require("../src/config/db");

const migrationsPath = path.join(__dirname, "../migrations");

const createControl = sql.unsafe`
    CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(50) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
    );
`;


const selectMigratedIds = sql.unsafe`
    SELECT id FROM migrations;
`;


const updateControl = (id) => sql.unsafe`
    INSERT INTO migrations (id)
    VALUES (${id})
`;

      (async () => {
        try {
            const migrationsDir = await fs.readdir(migrationsPath);
            if(!migrationsDir.length) throw Error("No migration files found");
            console.log('> dir: ', migrationsDir);

            const connection = await db; 
            await connection.query(createControl);

            const migratedIds = await connection.query(selectMigratedIds);
            const migratedList = new Set(migratedIds.rows.map(({ id }) => id));

            for await (const file of migrationsDir) {
                if(migratedList.has(file)) continue;
                const { up } = require(path.join(migrationsPath, file));

                await connection.query(up);
                await connection.query(updateControl(file));
            }

            console.log(">[SUCCESS]: migrations done!");

        } catch (error) {
            console.log("> [ERROR]: ", error.message);
        }
      })();