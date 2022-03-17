module.exports = (app) => {
	app.route("usuarios").post(app.api.entidades.usuario.incluir);
};
