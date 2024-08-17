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

    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query("UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), `año-publicacion`=(?), ISBN=(?) WHERE id=(?)", [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN, libro.id]);
        res.json({"Libros actualizados": result.changedRows});
    }

    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json({"Registros eliminados": result.affectedRows,"ISBN eliminado": libro.ISBN});
    }

}

export const libro = new LibroController();

