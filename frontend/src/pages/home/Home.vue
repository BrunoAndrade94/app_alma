<template>
	<div class="home">
		<b-card no-body>
			<b-tabs id="formulario" pills card lazy>
				<b-tab title="Página Inicial" active>
					<PageTitle
						icone="fa-solid fa-house-chimney-crack"
						titulo=" Boas-Vindas!"
						sub=" Resolvendo seus problemas!"
					/>
					<div class="estatisticas">
						<Estatistica
							titulo="Usuários:"
							icone="fa-solid fa-users"
							cor="green"
							:valor="estatistica.usuarios"
						/>
						<Estatistica
							titulo="Módulos:"
							icone="fa-solid fa-boxes-stacked"
							cor="purple"
							:valor="estatistica.modulos"
						/>
						<Estatistica
							titulo="Produtos:"
							icone="fa-solid fa-box"
							cor="red"
							:valor="estatistica.produtos"
						/>
						<Estatistica
							titulo="Espécies:"
							icone="fa-solid fa-frog"
							cor="black"
							:valor="estatistica.especies"
						/>
						<Estatistica
							titulo="Unidades:"
							icone="fa-solid fa-umbrella"
							cor="blue"
							:valor="estatistica.unidades"
						/>
					</div>
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template> 

<script>
	import axios from "axios";
	import g from "@/global";
	import PageTitle from "../../components/others/TituloPagina.vue";
	import Estatistica from "../../components/stats/Estatistica.vue";
	export default {
		components: { PageTitle, Estatistica },
		data: function () {
			return {
				estatistica: {},
			};
		},
		methods: {
			obterEstatistica() {
				axios.get(`${g.baseApi}rlt`).then((res) => (this.estatistica = res.data));
			},
		},
		mounted() {
			this.obterEstatistica();
		},
	};
</script>

<style>
	.estatisticas {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style> 