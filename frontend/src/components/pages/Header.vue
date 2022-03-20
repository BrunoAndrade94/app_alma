<template>
	<header class="header">
		<Menu v-if="usuario" />
		<TituloEmpresa />
		<MenuUsuario v-if="usuario" />
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

<style scope>
</style>