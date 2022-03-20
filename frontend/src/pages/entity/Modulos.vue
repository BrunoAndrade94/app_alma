<template>
	<div class="modulos">
		<TituloPagina
			icone="fa-solid fa-boxes-stacked"
			titulo="Módulos"
			sub="Aqui pode gerenciar as informações dos módulos"
		/>
		<BotaoCrud
			:desativarModoIncluir="modo === 'opcoes'"
			:desativarModoOpcoes="modo === 'incluir'"
			:clicarObter="obter"
			:clicarLimpar="carregarModulos"
			:clicarIncluir="incluir"
			:clicarAtualizar="atualizar"
			:clicarRemover="remover"
		/>

		<b-form>
			<b-row>
				<b-col md="2" sm="12">
					<b-form-group label="Código:" label-for="modulo-id">
						<b-form-input
							id="modulo-id"
							type="number"
							v-model="modulo.id"
							placeholder="#"
							min="0"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="8" sm="12">
					<b-form-group label="* Módulo:" label-for="modulo-nome">
						<b-form-input
							@keydown.enter.native="clicou"
							id="modulo-nome"
							type="text"
							required
							v-model="modulo.nome"
							placeholder="Informe o nome do módulo..."
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-form-checkbox class="mt-3 ml-4 pl-3 pt-3"> Tela </b-form-checkbox>
			</b-row>
			<b-row>
				<b-col class="d-none d-sm-block" md="2" sm="12">
					<b-form-group label="Código:" label-for="maeId">
						<b-form-input
							required
							v-model="modulo"
							id="maeId"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="8" sm="12">
					<b-form-group label="Módulo Mãe:" label-for="modulo-mae">
						<b-form-select
							id="modulo-mae"
							v-model="modulo"
							:options="modulos"
							value-field="id"
							text-field="nome"
						>
						</b-form-select>
						<b-form-input
							id="modulo-mae"
							type="text"
							v-model="moduloAnterior"
							:readonly="true"
						>
						</b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="18" sm="12">
					<b-form-group label="Caminho:" label-for="modulo-nome">
						<b-form-input
							id="modulo-nome"
							:readonly="true"
							type="text"
							v-model="modulo.caminho"
							placeholder="Caminho do módulo..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
		<hr />
		<b-table
			stacked="sm"
			:current-page="paginaAtual"
			:per-page="porPagina"
			:items="modulos"
			:fields="campos"
		>
			<template slot="acoes" slot-scope="">
				<b-btn> botao </b-btn>
			</template>
		</b-table>
		<b-pagination
			pills
			v-model="paginaAtual"
			:total-rows="totalDeLinhas"
			:per-page="porPagina"
			class="my-0"
		></b-pagination>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import axios from "axios";
	import g from "@/global";
	import TituloPagina from "../../components/others/TituloPagina.vue";
	import BotaoCrud from "../../components/buttons/BotaoCrud.vue";
	// import Paginacao from "../buttons/Paginacao.vue";
	// import Opcoes from "../entradaSaida/Opcoes.vue";
	// import IdDescricao from "../entradaSaida/IdDescricao.vue";
	export default {
		components: { TituloPagina, BotaoCrud },
		computed: mapState(["paginaAtual"]),
		data: function () {
			return {
				modo: "incluir",
				modulo: {},
				modulos: [],
				moduloAnterior: "",
				paginaAtual: 1,
				porPagina: 5,
				totalDeLinhas: 0,
				campos: [
					{ key: "id", label: "#", sortable: true },
					{ key: "nome", label: "Módulos", sortable: true },
					{
						key: "maeId",
						label: "#",
						sortable: true,
					},
					{ key: "caminho", label: "Caminhos", sortable: true },
					{
						key: "modoTela",
						label: "Tela",
						sortable: true,
						formatter: (valor) => (valor ? "Sim" : "Não"),
					},
					{ key: "acoes", label: "Opções" },
				],
			};
		},
		methods: {
			clicou(evento) {
				if (evento.which === 13) {
					if (this.modo === "incluir") {
						this.incluir();
					} else {
						this.atualizar();
					}
				}
			},
			opcoesModulo(modulo, modo) {
				this.obterModuloAnterior();
				// console.log(this.moduloAnterior);
				this.modulo = modulo;
				this.modulos = [{ ...this.modulo }];
				this.modo = modo;
			},
			carregarModulos() {
				this.limpar();

				axios.get(`${g.baseApi}modulos`).then((modulos) => {
					this.modulos = modulos.data;
					this.totalDeLinhas = this.modulos.length;
				});
			},
			obter() {},
			incluir() {
				// ESTÁ COMO INDEFINIDO, VER MODEL DO INPUT
				// DEPOIS DE APRENDER SOBRE STORE, MUDAR AQUI
				// console.log(this.modulo.mae);

				// this.modulo.maeId = this.modulo.id;
				// this.modulo.nome = this.modulo.nome;

				axios
					.post(`${g.baseApi}modulos`, this.modulo)
					.then(() => {
						g.mostrarSucesso(`Módulo: ${this.modulo.nome} incluído com sucesso!`);
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				delete this.modulo.caminho;

				axios
					.put(`${g.baseApi}modulos/${this.modulo.id}`, this.modulo)
					.then(() => {
						g.mostrarSucesso(
							`Módulo: ${this.modulo.nome} atualizado com sucesso!`
						);
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}modulos/${this.modulo.id}`, this.modulo)
					.then(() => {
						g.mostrarSucesso(`Módulo: ${this.modulo.nome} removido com sucesso!`);
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.modulo = {};
				this.modulos = {};
			},
			obterModuloAnterior() {
				axios
					.get(`${g.baseApi}moduloAnterior/${this.modulo.id}`)
					.then((modulo) => (this.moduloAnterior = modulo.data));
			},
		},
		created() {
			this.carregarModulos();
		},
		mounted() {},
	};
</script>

<style>
</style>