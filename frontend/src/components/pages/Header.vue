<template>
	<header class="header">
		<Menu />
		<TituloEmpresa />
		<MenuUsuario />
	</header>
</template>

<script>
	import { mapState } from "vuex";
	import Menu from "./Menu.vue";
	import MenuUsuario from "../others/MenuUsuario.vue";
	import TituloEmpresa from "../others/TituloEmpresa.vue";
	export default {
		components: { Menu, TituloEmpresa, MenuUsuario },
		computed: mapState(["usuario"]),
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
	span {
		margin-left: 10px;
	}
	#logo {
		margin-top: 5px;
		margin-left: 10px;
		color: rgb(115, 202, 115);
	}
	#logo:hover {
		color: rgba(0, 0, 0, 0.2);
	}
