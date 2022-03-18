/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("usuarios", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.string("usuario").notNull();
		tabela.string("email").notNull();
		tabela.string("senha").notNull();
		tabela.boolean("admin").defaultTo(false).notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("usuarios");
};
