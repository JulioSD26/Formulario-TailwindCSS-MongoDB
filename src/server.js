const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración para mongoDB
mongoose.connect("mongodb://localhost:27017/miBaseDeDatos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
    direccion: String,
    contrasena: String,
});

const userMongo = mongoose.model("User", userSchema);

// Ruta para el registro de usuario
app.post("/register", async (req, res) => {
    const { nombre, email, telefono, direccion, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = new userMongo({ nombre, email, telefono, direccion, contrasena: hashedPassword });
    await newUser.save();
    res.status(200).send({ message: "Usuario registrado en MongoDB" });
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});