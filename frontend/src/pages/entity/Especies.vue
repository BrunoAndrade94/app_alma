<template>
	<div class="especie">
		<b-card no-body>
			<b-tabs id="formulario" pills card lazy>
				<b-tab title="Espécies" active>
					<TituloPagina
						icone="fa-solid fa-cogs"
						titulo="Espécies"
						sub="Aqui pode alterar as informações das espécies"
					/>
					<BotaoCrud
						:desativarModoIncluir="modo === 'opcoes'"
						:desativarModoOpcoes="modo === 'incluir'"
						:clicarObter="obter"
						:clicarLimpar="carregarEspecies"
						:clicarIncluir="incluir"
						:clicarAtualizar="atualizar"
						:clicarRemover="remover"
					/>
					<b-form>
						<b-row>
							<b-col md="2" sm="2">
								<b-form-group label="Código:" label-for="especie-id">
									<b-form-input
										id="especie-id"
										type="number"
										v-model="especie.id"
										placeholder="#"
										min="0"
									></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="10" sm="10">
								<b-form-group label="* Espécie:" label-for="especie-nome">
									<b-form-input
										@keydown.enter.native="clicou"
										id="especie-nome"
										type="text"
										v-model="especie.nome"
										placeholder="Informe a espécie..."
									></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>
					</b-form>
					<hr />
					<b-table hover striped :items="especies" :fields="campos">
						<template slot="acoes" slot-scope="data">
							<b-button
								variant="info"
								@click="opcoesEspecie(data.item, 'opcoes')"
								v-show="modo === 'incluir'"
								class="mr-1"
							>
								<i class="fa-solid fa-cogs" />
							</b-button>
							<b-button
								variant="warning"
								@click="carregarEspecies(data.item, 'incluir')"
								v-show="modo === 'opcoes'"
								class="mr-1"
							>
								<i class="fa-solid fa-cancel" />
							</b-button>
						</template>
					</b-table>
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import g from "@/global";
	import axios from "axios";
	import TituloPagina from "../../components/others/TituloPagina.vue";
	import BotaoCrud from "../../components/buttons/BotaoCrud.vue";
	export default {
		nome: "Especies",
		components: { TituloPagina, BotaoCrud },
		data: function () {
			return {
				modo: "incluir",
				especie: {},
				especies: [],
				campos: [
					{
						key: "id",
						label: "#",
						sortable: true,
					},
					{
						key: "nome",
						label: "Espécies",
						sortable: true,
					},
					{
						key: "acoes",
						label: "Opções",
					},
				],
			};
		},
		methods: {
			clicou(evento) {
				if (evento.which === 13) {
					this.incluir();
				}
			},
			opcoesEspecie(especie, modo) {
				this.modo = modo;
				this.especie = especie;
				this.especies = [{ ...this.especie }];
			},
			carregarEspecie() {
				this.limpar();
				axios.get(`${g.baseApi}especies/${this.especie.id}`).then((especie) => {
					this.especies = especie.data;
				});
			},
			carregarEspecies() {
				this.limpar();
				axios.get(`${g.baseApi}especies`).then((especies) => {
					this.especies = especies.data;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.especie = {};
			},
			incluir() {
				axios
					.post(`${g.baseApi}especies`, this.especie)
					.then(() => {
						g.mostrarSucesso(
							`Espécie: ${this.especie.nome} incluída com sucesso!`
						);
						this.carregarEspecies();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				axios
					.put(`${g.baseApi}especies/${this.especie.id}`, this.especie)
					.then(() => {
						g.mostrarSucesso(
							`Espécie: ${this.especie.nome} atualizada com sucesso!`
						);
						this.carregarEspecies();
					})
					.catch(g.mostrarErro);
			},
			obter() {
				axios
					.post(`${g.baseApi}especie`, this.especie)
					.then((especies) => {
						this.especies = especies.data;
						if (this.especies.length > 0) {
							g.mostrarSucesso("Encontrei essa (s)!");
						} else {
							g.mostrarErro("Não encontrei nada!");
						}
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}especies/${this.especie.id}`)
					.then(() => {
						g.mostrarSucesso(
							`Espécie: ${this.especie.nome} excluída com sucesso!`
						);
						this.carregarEspecies();
					})
					.catch(g.mostrarErro);
			},
		},
		mounted() {
			this.carregarEspecies();
		},
	};
</script>

<style>
	.opcoes {
		size: 300px;
		position: left;
		padding: 10px;
	}

	.mr-1 {
		border-radius: 2rem;
	}
	hr {
		border: 0;
		margin: 10px;
		width: 100%;
		height: 2px;
		background-image: linear-gradient(
			to right,
			rgba(120, 120, 120, 0),
			rgba(120, 120, 120, 0.75),
			rgba(120, 120, 120, 0)
		);
	}
</style>