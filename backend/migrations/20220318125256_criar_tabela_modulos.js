/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("modulos", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.integer("idMae").references("id").inTable("modulos");
		tabela.boolean("modoTela").defaultTo(false);
		tabela.binary("descricao", 1000);
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("modulos");
};
