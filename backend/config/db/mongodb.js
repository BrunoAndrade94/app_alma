const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/relatorio", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((e) => {
		console.log("NÃO FOI POSSIVEL SE CONECTAR SEU MONGODB");
	});
