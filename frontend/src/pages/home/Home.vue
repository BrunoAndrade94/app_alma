<template>
	<div class="home">
		<PageTitle
			icone="fa-solid fa-house-chimney-crack"
			titulo=" Boas-Vindas!"
			sub=" Resolvendo seus problemas!"
		/>
		<div class="estatisticas">
			<Estatistica titulo="Usuários:" icone="fa-solid fa-users" cor="green" />
			<Estatistica
				titulo="Módulos:"
				icone="fa-solid fa-boxes-stacked"
				cor="purple"
			/>
			<Estatistica titulo="Produtos:" icone="fa-solid fa-box" cor="red" />
			<Estatistica titulo="Espécies:" icone="fa-solid fa-frog" cor="black" />
			<Estatistica titulo="Unidades:" icone="fa-solid fa-umbrella" cor="blue" />
		</div>
	</div>
</template>

<script>
	import PageTitle from "../../components/others/TituloPagina.vue";
	import Estatistica from "../../components/stats/Estatistica.vue";
	export default {
		components: { PageTitle, Estatistica },
	};
</script>

<style>
	.estatisticas {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style> 