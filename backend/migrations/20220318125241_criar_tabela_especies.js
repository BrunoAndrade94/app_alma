/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("especies", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("especies");
};
