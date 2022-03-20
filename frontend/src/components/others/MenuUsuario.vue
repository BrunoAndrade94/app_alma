<template>
	<div class="menu-usuario">
		<div class="botao-usuario">
			<b-dd
				id="menu"
				lazy
				right
				:text="usuario.nome"
				variant="outline-info"
				class="m-md-2"
			>
				<b-dd-item to="/produtos">
					<i class="fa-solid fa-people-carry-box" />
					<span> Produtos </span>
				</b-dd-item>
				<b-dd-header> Opções do Usuário </b-dd-header>
				<b-dd-item v-if="usuario.admin" to="/administracao">
					<i class="fa-solid fa-users-gear" />
					<span> Administração </span>
				</b-dd-item>
				<b-dd-item to="/configurarUsuario">
					<i class="fa-solid fa-user-gear" />
					<span> Configurar Usuário </span>
				</b-dd-item>
				<b-dd-divider />
				<b-dd-item to="/autenticar">
					<i class="fa-solid fa-person-running" />
					<span href @click.prevent> Sair </span>
				</b-dd-item>
			</b-dd>
		</div>
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

<style setup>
	#img {
		size: 5px;
		/* padding: 10px; */
		margin: 0px 70px;
		max-height: 30px;
		border-radius: 7px;
	}
	i {
		font-size: 1.6rem;
	}
	.botao-usuario {
		display: flex;
		align-items: center;
		color: #f9f9f9;
		font-weight: 100;
		height: 100%;
		padding: 0px 20px;
	}
</style>