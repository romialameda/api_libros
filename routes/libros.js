const express = require("express");
const router = express.Router();
const libros = require("../data");
const Joi = require("joi");

const libroSchema = Joi.object({
  titulo: Joi.string().required().label("Titulo"),
  autor: Joi.string().required().label("Autor"),
});

//Obtener todos los libros
router.get("/", (req, res, next) => {
  try {
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

//Obter un libro por ID
router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const libro = libros.find((l) => l.id == id);

    if (!libro) {
      error.status(404).json({ error: "Libro no encontrado." });
    } else {
      res.json(libro);
    }
  } catch (err) {
    next(err);
  }
});

//Crear un libro nuevo
router.post("/", (req, res, next) => {
  try {
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validación");
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;
    const nuevoLibro = {
      id: libros.length + 1,
      titulo,
      autor,
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
  } catch (err) {
    next(err);
  }
});

//Actualizar un libro existente
router.put("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validación");
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = req.body;

    const libro = libros.find((l) => l.id == id);

    if (!libro) {
      res.status(404).json({ error: "Producto no encontrado." });
    } else {
      libro.titulo = titulo || libro.titulo;
      libro.autor = autor || libro.autor;

      res.json(libro);
    }
  } catch (err) {
    next(err);
  }
});

//Eliminar un producto
router.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = libros.findIndex((l) => l.id == id);

    if (index === -1) {
      res.status(404).json({ error: "Producto no encontrado." });
    } else {
      const libroEliminado = libros.splice(index, 1);

      res.json(libroEliminado[0]);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
