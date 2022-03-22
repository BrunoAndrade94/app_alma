<template>
	<div class="menu-usuario">
		<div class="botao-usuario">
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item-dd right>
						<template #button-content>
							<i class="fa-solid fa-house-chimney-user" />
							<span>{{ usuario.usuario }}</span>
						</template>
						<b-dd-item to="/usuario">
							<i class="fa-solid fa-user" />
							<span>Perfil</span>
						</b-dd-item>
						<b-dd-divider />
						<b-dd-item to="/administracao">
							<i class="fa-solid fa-users-gear" />
							<span> Administração </span>
						</b-dd-item>
						<b-dd-item to="/modulos">
							<i class="fa-solid fa-boxes-stacked" />
							<span> Módulos </span>
						</b-dd-item>
						<b-dd-divider />
						<to @click.prevent="deslogar">
							<b-dd-item>
								<i class="fa-solid fa-person-running" />
								<span>Sair</span>
							</b-dd-item>
						</to>
					</b-nav-item-dd>
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