<template>
	<div class="header">
		<b-navbar sticky>
			<b-navbar-brand class="title">
				<router-link v-if="usuario" to="/">
					<i id="logo" class="fa-solid fa-cannabis" />
				</router-link>
				<i v-else id="logo" class="fa-solid fa-cannabis" />
				<span> Alma</span>
			</b-navbar-brand>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item-dropdown class="usu" right>
						<template #button-content>
							<i class="fa-solid fa-user" />
							<span>
								<em>Usuário</em>
							</span>
						</template>
						<b-dropdown-item href="">Perfil</b-dropdown-item>
						<b-dropdown-item href="produtos">Produtos</b-dropdown-item>
						<b-dd-item to="/autenticar">
							<i class="fa-solid fa-person-running" />
							<span href @click.prevent="deslogar"> Sair </span>
						</b-dd-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

	<script>
	import { chaveUsuario } from "@/global";
	import { mapState } from "vuex";
	import Gravatar from "vue-gravatar";
	export default {
		components: { Gravatar },
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
	.title {
		font-size: 1.5rem;
		color: rgb(255, 255, 255);
		font-weight: 100;
		flex-grow: 1;
		text-align: left;
		padding: 5px;
		margin-top: 0.5rem;
		padding-left: 0px;
		flex-wrap: flex;
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
</style>