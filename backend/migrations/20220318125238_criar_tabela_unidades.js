/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("unidades", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.integer("fator").defaultTo(1);
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("unidades");
};
