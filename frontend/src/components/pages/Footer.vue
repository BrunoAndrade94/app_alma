<template>
	<footer class="footer">
		<span
			>Desenvolvido com <strong> <i class="fa-solid fa-heart" /> </strong> por
			Bruno Andrade</span
		>
	</footer>
</template>

<script>
	export default {};
</script>

<style>
	.footer {
		grid-area: footer;
		background-color: #ddd;
		color: #333;

		align-content: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 23px;
	}
	.footer i {
		color: rgb(0, 255, 21);
	}
</style>