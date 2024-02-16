import { object, string, InferType } from 'yup';

export const applicantFormDataSchema = object({
	first_name: string().required(),
	last_name: string().required(),
	mobile_number: string().required(),
	email: string().required().email(),
});

export interface IApplicant extends InferType<typeof applicantFormDataSchema> {
    id?: number;
	is_primary?: boolean;
}

export interface IApplicantStore {
	applicants: IApplicant[];
	setApplicants: (applicants: IApplicant[]) => void;
}