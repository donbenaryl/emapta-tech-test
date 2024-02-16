import { applicantFormDataSchema, IApplicant } from "@/types/applicantTypes";
import knex from "@/config/db";
import { IResponseData } from "@/types/commonTypes";
import logger from "@/config/logger";

export const fetchApplicants = async () => knex.select("*").from("applicants");

export const fetchPrimaryApplicants = async () =>
	knex.select("*").from("applicants").where({
		is_primary: 1,
	});

export const saveApplicant = async (
	data: IApplicant
): Promise<IResponseData> => {
	try {
		logger.info("Validating request body...");
		await applicantFormDataSchema.validate(data);
	} catch (err: any) {
		logger.warn("Request body validation failed.");
		return {
			status: "failed",
			message: err.errors,
		};
	}

	logger.info("Inserting data...");
	const [insertedId] = await knex("applicants").insert(data);
	logger.info("Data inserted.");

	return {
		status: "success",
		message: `${insertedId}`,
	};
};

export const deleteApplicant = async (id: number) => {
	try {
		const applicants = await fetchApplicants();
		if (applicants.length <= 1) {
			return {
				status: "failed",
				message:
					"Can no longer delete as there should always be 1 applicant to exist.",
			};
		}

		const primaryApplicant = applicants.find((row) => row.id === id && row.is_primary)

		if (primaryApplicant) {
			return {
				status: "failed",
				message:
					"Unable to delete Primary Applicant. Please set another applicant as primary for this to be deleted.",
			};
		}


		await logger.info(`Deleting applicant ID ${id}...`);
		await knex("applicants").where({ id }).del();
	} catch (err: any) {
		logger.warn("Request body validation failed.");
		return {
			status: "failed",
			message: err.errors,
		};
	}

	return {
		status: "success",
		message: "",
	};
};

export const setPrimary = async (id: number) => {
	await knex("applicants").where({ is_primary: 1 }).update({ is_primary: false });
	await knex("applicants").where({ id }).update({ is_primary: true });
}
