import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: null,
		_v_model: null,
		_total_rows: null,
		_per_page: null,
	},
	getters: {},
	mutations: {
		definirUsuario(estado, usuario) {
			estado.usuario = usuario;
			if (usuario) {
				axios.defaults.headers.common[
					"Authorization"
				] = `bearer ${usuario.token}`;
			} else {
				delete axios.defaults.headers.common["Authorization"];
			}
		},
	},
	actions: {},
	modules: {},
});
