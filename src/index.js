const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express')

const app = express()

mongoose.connect("localhost:4000", async()=>{
    console.log("conexion exitosa");
    app.listen(4000, async( => {
        console.log("Servidor inicializado en puerto 4000")
    }))
})