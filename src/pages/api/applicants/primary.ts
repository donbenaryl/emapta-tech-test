import { NextApiRequest, NextApiResponse } from "next";
import { METHOD_NOT_ALLOWED_MSG } from "@/constants/Errors";
import {
    setPrimary,
} from "@/lib/api/applicants";
import logger from "@/config/logger";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    if (req.method === "POST") {
		if (!req.body.id) {
			res.status(400).json({ message: 'Applicant ID not found' });
			return;
		}

        logger.info(`Setting Applicant ID ${req.body.id} as primary applicant.`)
		await setPrimary(req.body.id);

		res.status(204).end();
		return;
	} else {
		res.status(405).json(METHOD_NOT_ALLOWED_MSG);
		return;
	}
}
