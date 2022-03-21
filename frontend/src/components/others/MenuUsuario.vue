<template>
	<div class="menu-usuario">
		<div class="botao-usuario">
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item-dropdown class="usu" right>
						<template #button-content>
							<i class="fa-solid fa-user" />
							<span>{{ usuario.usuario }}</span>
						</template>
						<b-dropdown-item href="">Perfil</b-dropdown-item>
						<b-dd-divider />
						<b-dropdown-item to="/administracao">
							Administração
						</b-dropdown-item>
						<b-dropdown-item to="/modulos"> Módulos </b-dropdown-item>
						<b-dropdown-item to="/produtos"> Produtos </b-dropdown-item>
						<b-dropdown-item to="/especies"> Espécies </b-dropdown-item>
						<b-dropdown-item to="/unidades"> Unidades </b-dropdown-item>
						<b-dd-divider />
						<b-dd-item>
							<i class="fa-solid fa-person-running" />
							<href @click.prevent="deslogar"> Sair </href>
						</b-dd-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</div>
	</div>
</template>

<script>
	import g from "@/global";
	import { mapState } from "vuex";
	export default {
		components: {},
		computed: mapState(["usuario"]),
		methods: {
			deslogar() {
				localStorage.removeItem(g.chaveUsuario);
				this.$store.commit("definirUsuario", null);
				this.$router.push({ path: "/autenticar" });
			},
		},
	};
</script>

<style setup>
	i {
		font-size: 1.6rem;
	}
	a {
		text-decoration: none;
		color: black;
	}
</style>