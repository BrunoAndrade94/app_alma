<template>
	<div class="header">
		<b-navbar>
			<Menu v-show="usuario" />
			<b-navbar-brand class="title">
				<TituloEmpresa />
			</b-navbar-brand>
			<MenuUsuario v-show="usuario" />
		</b-navbar>
	</div>
</template>

	<script>
	import { chaveUsuario } from "@/global";
	import { mapState } from "vuex";
	import Menu from "./Menu.vue";
	import MenuUsuario from "../others/MenuUsuario.vue";
	import TituloEmpresa from "../others/TituloEmpresa.vue";
	export default {
		components: { TituloEmpresa, Menu, MenuUsuario },
		computed: mapState(["usuario"]),
		methods: {
			deslogar() {
				localStorage.removeItem(chaveUsuario);
				this.$store.commit("definirUsuario", null);
				this.$router.push({ path: "autenticar" });
			},
		},
	};
</script>

<style>
	.header {
		grid-area: header;
		background: linear-gradient(to right, #658a80, #4375a3);
		display: flex;
		justify-content: center;
		align-items: flex;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 140px;
		grid-template-columns: 1fr;
		grid-template-areas: "header header";
	}
	template {
		padding: 10px;
	}
</style>