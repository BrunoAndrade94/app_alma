import Vue from "vue";
import VueRouter from "vue-router";

import { chaveUsuario } from "@/global";
import Autenticar from "../pages/auth/Autenticar.vue";
import Home from "../pages/home/Home.vue";
import Administracao from "../pages/admin/UsuariosAdmin.vue";
import Produtos from "../pages/entity/Produtos.vue";
import Especies from "../pages/entity/Especies.vue";
import Unidades from "../pages/entity/Unidades.vue";
import Modulos from "../pages/entity/Modulos.vue";

Vue.use(VueRouter);

const routes = [
	{
		name: "autenticar",
		path: "/autenticar",
		component: Autenticar,
	},
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "paginasAdmin",
		path: "/administracao",
		component: Administracao,
		meta: { requerAdmin: true },
	},
	{
		path: "/produtos",
		name: "produtos",
		component: Produtos,
	},
	{
		path: "/modulos",
		name: "modulos",
		component: Modulos,
	},
	{
		path: "/unidades",
		name: "unidades",
		component: Unidades,
	},
	{
		path: "/especies",
		name: "especies",
		component: Especies,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach((para, onde, proximo) => {
	const json = localStorage.getItem(chaveUsuario);

	if (para.matched.some((dados) => dados.meta.requerAdmin)) {
		const usuario = JSON.parse(json);
		return usuario && usuario.admin ? proximo() : proximo({ path: "/" });
	} else {
		proximo();
	}
});

export default router;
