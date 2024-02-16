import { IApplicant } from "@/types/applicantTypes";
import { IResponseData } from "@/types/commonTypes";

export const saveApplicants = async (
	data: IApplicant
): Promise<IResponseData> => {
	try {
		return fetch("/api/applicants", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.catch((err) => ({
				status: "failed",
				message: err,
			}))
			.then((res: any) => res.json())
			.then((res: any) => {
				return {
					status: "success",
					message: res.insertedId,
				};
			});
	} catch (error: any) {
		return {
			status: "failed",
			message: error,
		};
	}
};

export const fetchApplicants = async (): Promise<IApplicant[]> => {
	try {
		return fetch("/api/applicants")
			.catch((err) => [])
			.then((response: any) => response.json())
			.then((data) => data);
	} catch (error: any) {
		return [];
	}
};

export const deleteApplicant = async (id: number): Promise<IResponseData> => {
	try {
		const res = await fetch(`/api/applicants?id=${id}`, {
			method: "DELETE",
		});

		if (res.status !== 204) {
            const msg = await res.json();

			return {
				status: "failed",
				message: msg.message,
			};
		}
		return {
			status: "success",
			message: "",
		};
	} catch (error: any) {
		return {
			status: "failed",
			message: error,
		};
	}
};


export const setPrimary = async (id: number): Promise<IResponseData> => {
	try {
		const res = await fetch(`/api/applicants/primary`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({id}),
		});

		if (res.status !== 204) {
            const msg = await res.json();

			return {
				status: "failed",
				message: msg.message,
			};
		}
		return {
			status: "success",
			message: "",
		};
	} catch (error: any) {
		return {
			status: "failed",
			message: error,
		};
	}
};
