<template>
	<div class="produtos">
		<b-card no-body>
			<b-tabs id="formulario" pills card lazy>
				<b-tab title="Produtos" active>
					<TituloPagina
						icone="fa-solid fa-dolly"
						titulo="Produtos"
						sub="Aqui pode alterar as informações dos produtos"
					/>

					<BotaoCrud
						:desativarModoIncluir="modo === 'opcoes'"
						:desativarModoOpcoes="modo === 'incluir'"
						:clicarObter="obter"
						:clicarLimpar="carregarProdutos"
						:clicarIncluir="incluir"
						:clicarAtualizar="atualizar"
						:clicarRemover="remover"
					/>
					<b-form>
						<b-row>
							<b-col md="2" sm="2">
								<b-form-group label="Código:" label-for="produto">
									<b-form-input
										v-model="produto.id"
										id="produto-id"
										type="number"
										min="0"
										placeholder="#"
									/>
								</b-form-group>
							</b-col>
							<b-col md="10" sm="10">
								<b-form-group label="* Produto:" label-for="produto">
									<b-form-input
										:autofocus="true"
										required
										id="produto-nome"
										type="text"
										v-model="produto.nome"
										placeholder="Informe o nome do produto..."
										@keydown.enter.native="clicou"
									/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col class="d-none d-sm-block" md="2" sm="2">
								<b-form-group label="Código:" label-for="especie">
									<b-form-input
										required
										v-model="especie"
										id="especie-id"
										type="number"
										min="0"
										placeholder="#"
									/>
								</b-form-group>
							</b-col>
							<b-col md="10" sm="10">
								<b-form-group label="* Espécie:" label-for="especie">
									<b-form-select
										required
										id="especie-nome"
										v-model="especie"
										:options="especies"
										value-field="id"
										text-field="nome"
									/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col class="d-none d-sm-block" md="2" sm="2">
								<b-form-group label="Código:" label-for="unidade">
									<b-form-input
										required
										v-model="unidade"
										id="unidade-id"
										type="number"
										min="0"
										placeholder="#"
									/>
								</b-form-group>
							</b-col>
							<div></div>
							<b-col md="10" sm="10">
								<b-form-group label="* Unidade:" label-for="unidade">
									<b-form-select
										required
										id="unidade-nome"
										v-model="unidade"
										:options="unidades"
										value-field="id"
										text-field="nome"
									>
									</b-form-select>
								</b-form-group>
							</b-col>
						</b-row>
					</b-form>
					<hr />
					<b-table
						stacked="sm"
						show-empty
						outlined
						responsive
						hover
						small
						striped
						@row-selected="opcoesProduto"
						selectable
						select-mode="single"
						selected-variant="danger"
						:current-page="paginaAtual"
						:per-page="porPagina"
						:items="produtos"
						:fields="campos"
					>
					</b-table>
					<b-pagination
						pills
						v-model="paginaAtual"
						:total-rows="totalDeLinhas"
						:per-page="porPagina"
						class="my-0"
					></b-pagination>
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import axios from "axios";
	import v from "@/validarGlobal";
	import g from "@/global";
	import Paginacao from "../../components/buttons/Paginacao.vue";
	import TituloPagina from "../../components/others/TituloPagina.vue";
	import BotaoCrud from "../../components/buttons/BotaoCrud.vue";
	export default {
		nome: "Produtos",
		components: { TituloPagina, BotaoCrud, Paginacao },
		data: function () {
			return {
				modo: "incluir",
				idTela: 0,
				produto: {},
				especie: {},
				unidade: {},
				produtos: [],
				especies: [],
				unidades: [],
				paginaAtual: 1,
				porPagina: 5,
				totalDeLinhas: 0,
				campos: [
					{ key: "id", label: "#", sortable: true },
					{ key: "nome", label: "Produtos", sortable: true },
					{
						key: "idEspecie",
						label: "#",
						sortable: true,
					},
					{ key: "nomeEspecie", label: "Espécies", sortable: true },
					{
						key: "idUnidade",
						label: "#",
						sortable: true,
					},
					{ key: "nomeUnidade", label: "Unidades", sortable: true },
					{
						key: "fator",
						label: "Fator",
						sortable: true,
					},
				],
			};
		},
		methods: {
			obterIdTela() {
				axios.get(`${baseApi}modulo/Produtos`).then((id) => {
					this.idTela = [id.data];
				});
			},
			clicou(evento) {
				if (evento.which === 13) {
					if (this.modo === "incluir") {
						this.incluir();
					} else {
						this.atualizar();
					}
				}
			},
			carregarDados() {
				this.limpar();
				this.carregarProdutos();
				this.carregarEspecies();
				this.carregarUnidades();
			},
			opcoesProduto(evento) {
				this.produto = evento[0];
				this.modo = "opcoes";
			},
			carregarProduto(produto) {
				this.produto = { ...produto };
			},
			carregarProdutos() {
				this.limpar();

				// OBTEM OS PRODUTOS COM JOIN EM ESPECIES E UNIDADE
				axios.get(`${g.baseApi}produtos`).then((produtos) => {
					this.produtos = produtos.data;
					this.totalDeLinhas = this.produtos.length;
					this.carregarEspecies();
					this.carregarUnidades();
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.produto = {};
				this.especie = {};
				this.unidade = {};
				this.produtos = {};
				this.especies = {};
				this.unidades = {};
			},
			incluir() {
				if (!v.objetoVazio(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (!v.objetoVazio(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.post(`${g.baseApi}produtos`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} incluído com sucesso!`
						);
						this.limpar();
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				// remove o nome da especie e unidade
				delete this.produto.nomeEspecie;
				delete this.produto.nomeUnidade;

				// injeta novos ids especie e unidade
				if (v.éNumero(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (v.éNumero(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.put(`${g.baseApi}produtos/${this.produto.id}`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} atualizado com sucesso!`
						);
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			obter() {
				if (!v.objetoVazio(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (!v.objetoVazio(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.post(`${g.baseApi}produto`, this.produto)
					.then((produtos) => {
						this.produtos = produtos.data;
						if (this.produtos.length > 0) {
							g.mostrarSucesso("Encontrei essa (s)!");
							this.totalDeLinhas = this.produtos.length;
							this.carregarEspecies();
							this.carregarUnidades();
						} else {
							g.mostrarErro("Não encontrei nada!");
						}
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}produtos/${this.produto.id}`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} removido com sucesso!`
						);
						this.limpar();
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			// ==============================
			// ==============================
			// ==============================
			carregarEspecies() {
				axios.get(`${g.baseApi}especies`).then((especies) => {
					this.especies = especies.data;
				});
			},

			carregarUnidades() {
				axios.get(`${g.baseApi}unidades`).then((unidades) => {
					this.unidades = unidades.data;
				});
			},
		},
		created() {},
		mounted() {
			this.carregarDados();
		},
	};
</script>

<style>
	.mr-1 {
		size: 10px;
		text-align: left;
		align-items: center;
		justify-items: center;
		border-radius: 20px;
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