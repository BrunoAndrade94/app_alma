<template>
	<aside class="menu">
		<b-button class="menu-button" v-b-toggle.sidebar-menu variant="none" block>
			<i class="fa-solid fa-ellipsis-vertical" />
		</b-button>
		<b-sidebar
			lazy
			id="sidebar-menu"
			title="Menu Alma"
			shadow
			no-header
			:backdrop-variant="dark"
			backdrop
		>
			<h3 class="mt-3 px-4 ml-5">
				Menu Alma
				<i class="fa-solid fa-dna" />
			</h3>
			<b-col md="11" sm="2">
				<b-form-input
					type="text"
					placeholder="Procurar..."
					v-model="filtrarArvore"
					class="ml-2 mr-1"
				/>
			</b-col>
			<Arvore
				:data="dadosDaArvore"
				:filter="filtrarArvore"
				:options="opcoesDaArvore"
				ref="arvore"
			/>
			<template #footer="{}">
				<div class="align-items-center px-3 py-2">
					<strong class="mr-auto">Alma</strong>
				</div>
			</template>
		</b-sidebar>
	</aside>
</template>

<script>
	import Arvore from "liquor-tree";
	import { baseApi } from "@/global";
	import axios from "axios";

	export default {
		components: { Arvore },
		data: function () {
			return {
				filtrarArvore: "",
				dadosDaArvore: this.obterDadosDaArvore(),
				opcoesDaArvore: {
					propertyNames: { text: "nome" },
					filter: {
						emptyText: "não encontrei nada por aqui..",
						plainList: false,
					},
				},
			};
		},

		methods: {
			obterDadosDaArvore() {
				return axios.get(`${baseApi}arvore/modulos`).then((res) => res.data);
			},
			moduloSelecionado(modulo) {
				this.$router.push({
					name: "",
					params: { nome: modulo.nome },
				});
			},
		},
		mounted() {
			this.$refs.tree.$on("node:selected", this.moduloSelecionado);
		},
	};
</script>

<style scope>
	#img {
		margin-top: 4px;
	}
	.menu-button {
		width: 50px;
		height: 100%;
		color: black;
		justify-self: flex-start;
		text-decoration: none;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.menu-button:hover {
		color: white;
	}
</style>