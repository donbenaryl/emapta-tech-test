import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema
		.createTable("applicants", function (table) {
			table.increments("id").primary();
			table.string("first_name");
			table.string("last_name");
			table.string("mobile_number");
			table.string("email");
			table.boolean("is_primary").defaultTo(0);
			table.timestamps(true, true);
		})
		.then(() => {
			return knex("applicants").insert({
				first_name: "Don Benary",
				last_name: "Lagadan",
				mobile_number: "09174211608",
				email: "donbenaryl@gmail.com",
				is_primary: true,
			});
		});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("applicants");
}
