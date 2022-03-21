// IP DANTE
const ip = "192.168.252.47";

// IP CASA
// const ip = '10.10.0.254'

// PORTA
const porta = 3333;

const app = require("express")();
const consign = require("consign");
const bancoDeDados = require("./config/db/bancoDeDados.js");

const mongoose = require("mongoose");
require("./config/db/mongodb.js");

app.db = bancoDeDados;
app.mongoose = mongoose;

consign()
	.include("./config/admin/passaporte.js")
	.then("./config/middlewares.js")
	.then("./api")
	.then("./config")
	.then("./config/routes")
	.into(app);

app.listen(porta, ip, () => {
	console.log(`--IP:    ${ip}\n--PORTA: ${porta}`);
});
