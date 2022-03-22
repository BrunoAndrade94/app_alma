<template>
	<div class="titulo-empresa">
		<router-link v-if="usuario" to="/home">
			<i id="logo" class="fa-solid fa-cannabis" />
		</router-link>
		<i v-else id="logo" class="fa-solid fa-cannabis" />
		<span> Alma</span>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		computed: mapState(["usuario"]),
	};
</script>

<style>
	.title {
		font-size: 1.5rem;
		color: rgb(240, 16, 16);
		font-weight: 100;
		flex-grow: 1;
		text-align: left;
		padding: 5px;
		margin-top: 0.5rem;
		padding-left: 0px;
		flex-wrap: flex;
	}
	span {
		margin-left: 10px;
	}
	#logo {
		margin-top: 5px;
		margin-left: 10px;
		color: rgb(115, 202, 115);
	}
	#logo:hover {
		color: rgba(0, 0, 0, 0.2);
	}
</style>