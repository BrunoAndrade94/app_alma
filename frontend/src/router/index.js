import Vue from "vue";
import VueRouter from "vue-router";

import { chaveUsuario } from "@/global";
import Autenticar from "../pages/auth/Autenticar.vue";
import Home from "../pages/home/Home.vue";
import PaginasAdmin from "../components/admin/PaginasAdmin.vue";
import Produtos from "../pages/entity/Produtos.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/autenticar",
		name: "autenticar",
		component: Autenticar,
	},
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		name: "paginasAdmin",
		path: "/administracao",
		component: PaginasAdmin,
		meta: { requerAdmin: true },
	},
	{
		path: "/produtos",
		name: "produtos",
		component: Produtos,
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
