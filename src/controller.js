import {pool} from './database.js'; //usamos pool para poder manejar varias conexiones de forma paralela

class LibroController{


  async getOne(req, res) {
    try {
      const libroId = req.params.id;
      const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [libroId]);
      console.log(result); // Imprime el resultado de la consulta
      if (result.length > 0) {
        res.json({ libro: result[0] }); // Devuelve los datos del libro
      } else {
        res.status(404).json({ message: 'Libro no encontrado' }); // Devuelve un mensaje de error si no se encuentra el libro
      }
    } catch (error) {
      console.error(error); // Imprime el error en la consola
      res.status(500).json({ message: 'La base de datos esta desconectada. Contacte con el Administrador' }); // Devuelve un mensaje de error genérico
    }
  }
    //async await permite al servidor trabajar de forma paralela varias solicitudes y no monopolice recursos durante la ejecucion
    async getAll(req, res){ //req es la solicitud del cliente, res es la respuesta que vamos a dar
        try {
            const [result] = await pool.query('SELECT * FROM libros'); //query espera como argumento scripts SQL
            res.json(result);
        } catch (error) {
            console.error('Error al obtener libros:', error);
            res.status(500).json({ message: 'Error al obtener libros, contactese con el administrador' });
        }
    }

    async add(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query("INSERT INTO Libros(nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?)", [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN]);
            res.json({"Id insertado": result.insertId, "Libro insertado": libro.nombre});
        } catch (error) {
            console.error('Error al agregar libro:', error);
            res.status(500).json({ message: 'Error al agregar libro, complete todos los campos con el tipo de dato correcto' });
        }
    }

    async update(req, res) {
        try {
          const libro = req.body;
      
          // Validar que los campos obligatorios estén presentes
          if (!libro.id || !libro.nombre || !libro.autor || !libro.categoria || !libro['año-publicacion'] || !libro.ISBN) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
          }
      
          // Validar tipo de datos
          if (typeof libro.nombre !== 'string' || typeof libro.autor !== 'string' || typeof libro.categoria !== 'string' || typeof libro['año-publicacion'] !== 'number' || typeof libro.ISBN !== 'string') {
            return res.status(400).json({ message: 'Tipos de datos incorrectos' });
          }
      
          // Validar año de publicación
          if (libro['año-publicacion'] < 1900 || libro['año-publicacion'] > 2100) {
            return res.status(400).json({ message: 'El año de publicación debe ser un número entre 1900 y 2100' });
          }
      
          const [result] = await pool.query("UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), `año-publicacion`=(?), ISBN=(?) WHERE id=(?)", [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN, libro.id]);
          res.json({"Libros actualizados": result.changedRows});
        } catch (error) {
          console.error('Error al actualizar libro:', error);
          res.status(500).json({ message: 'Error al actualizar libro, indique un [id] existente y/o complete todos los campos con el tipo de dato correcto' });
        }
      }

      async delete(req, res) {
        try {
          const libro = req.body;
      
          // Validar que el ISBN esté presente
          if (!libro.ISBN) {
            return res.status(400).json({ message: 'Falta el campo ISBN' });
          }
      
          // Validar que el ISBN sea un string
          if (typeof libro.ISBN !== 'string') {
            return res.status(400).json({ message: 'El ISBN debe ser un string' });
          }
      
          // Validar que el ISBN tenga la longitud correcta (13 caracteres)
          if (libro.ISBN.length !== 13) {
            return res.status(400).json({ message: 'El ISBN debe tener 13 caracteres' });
          }
      
          // Validar que el ISBN sea un número (aunque sea un string, debe contener solo dígitos)
          if (!/^\d+$/.test(libro.ISBN)) {
            return res.status(400).json({ message: 'El ISBN debe contener solo dígitos' });
          }
      
          // Verificar que el ISBN exista en la base de datos
          const [exist] = await pool.query("SELECT 1 FROM Libros WHERE ISBN = (?)", [libro.ISBN]);
          if (!exist) {
            return res.status(404).json({ message: 'El ISBN no existe' });
          }
      
          const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
          res.json({"Registros eliminados": result.affectedRows, "ISBN eliminado": libro.ISBN});
        } catch (error) {
          console.error('Error al eliminar libro:', error);
          res.status(500).json({ message: 'Error al eliminar libro, indique un [ISBN] existente' });
        }
      }

}

export const libro = new LibroController();
