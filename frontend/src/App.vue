<template>
	<div id="app">
		<NavBar />
		<Content />
		<Footer />
	</div>
</template>

<script>
	import g from "@/global";
	import axios from "axios";
	import { mapState } from "vuex";
	import Loading from "./components/pages/Loading.vue";
	import Header from "./components/pages/Header.vue";
	import NavBar from "./components/pages/NavBar.vue";
	import Content from "./components/pages/Content.vue";
	import Footer from "./components/pages/Footer.vue";
	export default {
		components: { Header, Content, Footer, Loading, NavBar },
		computed: mapState(["usuario"]),
		data: function () {
			return {
				validandoToken: Boolean,
			};
		},
		methods: {
			async validarToken() {
				this.validandoToken = true;

				const json = localStorage.getItem(g.chaveUsuario);
				const dadosUsuario = JSON.parse(json);
				this.$store.commit("definirUsuario", null);

				if (!dadosUsuario) {
					this.validandoToken = false;
					return this.$router.push({ path: "/autenticar" });
				}

				const res = await axios.post(`${g.baseApi}validarToken`, dadosUsuario);

				if (res.data) {
					this.$store.commit("definirUsuario", dadosUsuario);
				} else {
					localStorage.removeItem(g.chaveUsuario);
					return this.$router.push({ path: "/autenticar" });
				}
				this.validandoToken = false;
			},
		},
		created() {
			this.validarToken();
		},
	};
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>
