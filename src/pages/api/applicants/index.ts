import { NextApiRequest, NextApiResponse } from "next";
import { METHOD_NOT_ALLOWED_MSG } from "@/constants/Errors";
import {
	deleteApplicant,
	fetchApplicants,
	saveApplicant,
} from "@/lib/api/applicants";
import logger from "@/config/logger";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const applicants = await fetchApplicants();
			res.status(200).json(applicants);
		} catch (error) {
			logger.error("Error fetching applicants:", error);
			res.status(500).json({ message: "Failed to fetch applicants" });
		}
		return;
	} else if (req.method === "POST") {
		const saved = await saveApplicant(req.body);

		if (saved.status === "failed") {
			res.status(400).json({ message: saved.message });
			return;
		}

		res.status(200).json({ insertedId: Number(saved.message) });
		return;
	} else if (req.method === "DELETE") {
		if (!req.query.id) {
			res.status(400).json({ message: "Applicant ID not found" });
			return;
		}

		const result = await deleteApplicant(Number(req.query.id));

		if (result.status === "failed") {
			res.status(400).json({ message: result.message });
			return;
		}

		res.status(204).end();
		return;
	} else {
		res.status(405).json(METHOD_NOT_ALLOWED_MSG);
		return;
	}
}
