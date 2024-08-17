import {pool} from './database.js'; //usamos pool para poder manejar varias conexiones de forma paralela

class LibroController{
    //async await permite al servidor trabajar de forma paralela varias solicitudes y no monopolice recursos durante la ejecucion
    async getAll(req, res){ //req es la solicitud del cliente, res es la respuesta que vamos a dar
        const [result] = await pool.query('SELECT * FROM libros'); //query espera como argumento scripts SQL
        res.json(result);
        //el corchete es para que solo muestre el array de datos y no los de info sobre la operacion
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query("INSERT INTO Libros(nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?)", [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN]);
        res.json({"Id insertado": result.insertId, "Libro insertado": libro.nombre});
    }
/*
    async delete(req, res){
        const persona = req.body;
        const [result] = await pool.query(`DELETE FROM Personas WHERE id=(?)`, [persona.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req, res){
        const persona = req.body;
        const [result] = await pool.query(`UPDATE Personas SET nombre=(?), apellido=(?), dni=(?) WHERE id=(?)`, [persona.nombre, persona.apellido, persona.dni, persona.id]);
        res.json({"Registros actualizados": result.changedRows});
    }
*/
}

export const libro = new LibroController();

