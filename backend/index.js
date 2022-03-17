// IP DANTE
const ip = "192.168.252.47";

// IP CASA
// const ip = '10.10.0.254'

const porta = 3033;
const app = require("express")();
const consign = require("consign");
// const bancoDeDados = require()

const mongoose = require("mongoose");
// require()

// app.db = bancoDeDados
app.mongoose = mongoose;

consign().then("./config/middlewares.js").into(app);

app.listen(porta, ip, () => {
	console.log(`--IP:    ${ip}\n--PORTA: ${porta}`);
});
