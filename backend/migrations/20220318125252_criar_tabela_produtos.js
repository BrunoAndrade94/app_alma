/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("produtos", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela
			.integer("idUnidade")
			.references("id")
			.inTable("unidades")
			.notNull();
		tabela
			.integer("idEspecie")
			.references("id")
			.inTable("especies")
			.notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("produtos");
};
