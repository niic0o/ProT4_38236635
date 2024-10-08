import { libro } from './controller.js';
import express from 'express';

export const router = express.Router();

router.get('/libros', libro.getAll); //cuando el usuario entre a la pagina raiz /personas va a obterner listado de la bdd
router.post('/libro', libro.add);
router.delete('/libro', libro.delete);
router.put('/libro', libro.update);
router.get('/unlibro:id', libro.getOne);