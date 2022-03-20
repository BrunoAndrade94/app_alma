<template>
	<div class="usuario-admin">
		<TituloPagina
			icone="fa-solid fa-users-gear"
			titulo="Usuários"
			sub="Aqui pode gerenciar as informações dos usuários"
		/>
		<BotaoCrud
			:desativarModoIncluir="modo === 'opcoes'"
			:desativarModoOpcoes="modo === 'incluir'"
			:clicarObter="obter"
			:clicarIncluir="incluir"
			:clicarAtualizar="atualizar"
			:clicarRemover="remover"
		/>
		<b-form>
			<input id="usuario-id" type="hidden" v-model="usuario.id" />
			<b-row>
				<b-col md="6" sm="12">
					<b-form-group label="* Nome:" label-for="usuario.nome">
						<b-form-input
							id="usuario-nome"
							required
							type="text"
							@keydown.enter.native="clicou"
							v-model="usuario.nome"
							:readonly="modo === 'remover'"
							placeholder="Informe o nome..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="* E-mail:" label-for="usuario.email">
						<b-form-input
							id="usuario-email"
							required
							type="email"
							v-model="usuario.email"
							@keydown.enter.native="clicou"
							:readonly="modo === 'remover'"
							placeholder="Informe o e-mail..."
						/>
					</b-form-group>
				</b-col>
			</b-row>

			<b-row>
				<b-col class="mt-3" md="6" sm="12">
					<b-form-group label="* Usuário:" label-for="usuario.usuario">
						<b-form-input
							id="usuario-usuario"
							required
							type="text"
							v-model="usuario.usuario"
							@keydown.enter.native="clicou"
							:readonly="modo === 'remover'"
							placeholder="Informe o usuário..."
						/>
					</b-form-group>
				</b-col>
				<b-form-checkbox
					id="usuario-admin"
					v-model="usuario.admin"
					class="mt-4 mb-4 ml-4"
					:disabled="modo === 'remover'"
				>
					Administração
				</b-form-checkbox>
				<b-form-checkbox
					v-model="alterar"
					:disabled="modo === 'incluir'"
					class="mt-4 mb-4 ml-4"
				>
					Alterar Senha
				</b-form-checkbox>
			</b-row>
			<b-row v-show="alterar || (modo === 'incluir' && !alterar)">
				<b-col md="6" sm="12">
					<b-form-group label="* Senha:" label-for="usuario.senha">
						<b-form-input
							id="usuario-senha"
							required
							type="password"
							@keydown.enter.native="clicou"
							v-model="usuario.senha"
							placeholder="Informe a senha..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group
						label="* Confirmação de Senha:"
						label-for="usuario.confirmacaoSenha"
					>
						<b-form-input
							id="usuario-confirmacaoSenha"
							type="password"
							v-model="usuario.confirmacaoSenha"
							@keydown.enter.native="clicou"
							required
							placeholder="Confirme a senha..."
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<hr />
		</b-form>
		<hr />
		<b-table
			stacked="sm"
			responsive
			hover
			striped
			:items="usuarios"
			:fields="campos"
			:current-page="paginaAtual"
			:per-page="porPagina"
		>
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesUsuario(data.item)"
					v-if="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarUsuarios()"
					v-if="modo === 'opcoes'"
					class="mr-1"
				>
					<i class="fa-solid fa-cancel" />
				</b-button>
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
	import BotaoCrud from "../../components/buttons/BotaoCrud.vue";
	import TituloPagina from "../../components/others/TituloPagina.vue";
	import g from "@/global";
	import axios from "axios";
	export default {
		nome: "UsuariosAdmin",
		computed: mapState(["usuario"]),
		components: { TituloPagina, BotaoCrud },
		data: function () {
			return {
				modo: "incluir",
				alterar: false,
				usuario: {},
				usuarios: [],
				paginaAtual: 1,
				porPagina: 3,
				totalDeLinhas: 0,
				campos: [
					{
						key: "id",
						label: "#",
						sortable: true,
					},
					{
						key: "nome",
						label: "Nome",
						sortable: true,
					},
					{
						key: "email",
						label: "E-mail",
						sortable: true,
					},
					{ key: "usuario", label: "Usuário", sortable: true },
					{
						key: "admin",
						label: "Adm",
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
			opcoesUsuario(usuario, modo = "opcoes") {
				this.modo = modo;
				this.usuario = usuario;
				this.usuarios = [{ ...this.usuario }];
				// this.usuarios.caminho = [this.usuario.caminho];
			},
			carregarUsuario(usuario, modo = "incluir") {
				this.modo = modo;
				this.usuario = { ...usuario };
			},
			carregarUsuarios(modo = "incluir") {
				this.limpar(modo);
				axios.get(`${g.baseApi}usuarios`).then((usuarios) => {
					this.usuarios = usuarios.data;
					this.totalDeLinhas = this.usuarios.length;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.usuario = {};
				// his.carregarUsuarios();
			},
			incluir() {
				axios
					.post(`${g.baseApi}usuarios`, this.usuario)
					.then(() => {
						g.mostrarSucesso("Incluído com sucesso!");
						this.carregarUsuarios();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				axios
					.put(`${g.baseApi}usuario/${this.usuario.id}`, this.usuario)
					.then(() => {
						g.mostrarSucesso(`${this.usuario.nome} atualizado com sucesso!`);
						this.carregarUsuarios();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}usuarios/${this.usuario.id}`)
					.then(() => {
						g.mostrarSucesso(`${this.usuario.nome} excluído com sucesso!`);
						this.carregarUsuarios();
					})
					.catch(g.mostrarErro);
			},
		},
		mounted() {
			this.carregarUsuarios();
		},
	};
</script>

<style>
</style>