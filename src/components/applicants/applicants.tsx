import { IApplicant } from "@/types/applicantTypes";
import { useEffect, useState } from "react";
import "~styles/globals.scss";
import styles from "~styles/table.module.scss";
import RadioCheckbox from "../form/radio-checkbox";
import { IoTrash } from "react-icons/io5";
import {
	deleteApplicant,
	fetchApplicants,
	setPrimary,
} from "@/lib/fe/applicants";
import { useApplicantStore } from "@/stores/applicant-store";
import Confirm from "../dialogs/confirm";
import { IDialogProps } from "@/types/dialogTypes";
import { useToastStore } from "@/stores/toast";
import { useForm } from "react-hook-form";

export default function ApplicantList() {
	const setToastData = useToastStore((state) => state.setToastData);

	const applicants = useApplicantStore((state) => state.applicants);
	const setApplicants = useApplicantStore((state) => state.setApplicants);
    
	const [isConfirmShown, setIsConfirmShown] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedApplicant, setSelectedApplicant] = useState<IApplicant>();
	const [dialogData, setDialogData] = useState<IDialogProps>({
		isActive: true,
		title: "",
		setIsActive: () => {},
		onConfirm: () => {},
	});

	const handleFetchApplicants = async () => {
		// LOAD APPLICANTS
		const applicants = await fetchApplicants();
		await setApplicants(applicants);

		// GET PRIMARY USER
		const primary = await applicants.find((row) => row.is_primary);

		if (primary) {
			setValue("primary", `${primary.id}`);
		}
		await setIsLoading(false);
	};

	const { register, setValue } = useForm();

	const handlePrimaryApplicantUpdate = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
        const id = await Number(e.target.value);
        await setPrimary(id);

        // UPDATE APPLICANTS LIST
        setApplicants(applicants.map((row) => ({
            ...row,
            is_primary: row.id === id ? true : false
        })))
    }

	useEffect(() => {
		handleFetchApplicants();
	}, []);

	const handleDelete = (data: IApplicant) => {
		setSelectedApplicant(data);
		// CONFIRM IF USER IS SURE TO DELETE THE APPLICANT
		setDialogData({
			...dialogData,
			title: "Delete Applicant?",
			description: `Are you sure you want to delete applicant ${data.first_name} ${data.last_name}?`,
		});
		// SHOW CONFIRM DIALOG
		setIsConfirmShown(true);
	};

	const processDeletion = async () => {
		const res = await deleteApplicant(Number(selectedApplicant?.id));

		if (res.status === "success") {
			// REMOVE DELETED APPLICANT IN THE LIST
			await setApplicants([
				...applicants.filter((row) => row.id != selectedApplicant?.id),
			]);
			// SHOW SUCCESS DELETION MESSAGE
			await setToastData({
				isShown: true,
				title: "Success!",
				message: `${selectedApplicant?.first_name} ${selectedApplicant?.last_name} successfully deleted!`,
				type: "success",
			});
		} else {
			setToastData({
				isShown: true,
				title: "Failed!",
				message: res.message,
				type: "danger",
			});
		}

		// HIDE CONFIRM DIALOG
		await setIsConfirmShown(false);
	};

	return (
		<form className="overflow-x-auto">
			<table
				className={`w-full align-middle text-dark border-neutral-200 ${styles.table}`}
			>
				<thead className="align-bottom">
					<tr className="text-secondary-dark">
						<th className="pb-3 text-start">Primary</th>
						<th className="pb-3 text-start">ID</th>
						<th className="pb-3 text-start">Name</th>
						<th className="pb-3 pr-12 text-start">Email</th>
						<th className="pb-3 text-start">Mobile Number</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan={6} className="text-center">
								Loading data...
							</td>
						</tr>
					) : (
						applicants.map((item, index) => (
							<tr key={index} className="rounded">
								<td className="pl-3 p-3 pl-0">
									<RadioCheckbox
										id="primary"
										name="primary"
										type="text"
										value={item.id}
										register={register}
										onChange={handlePrimaryApplicantUpdate}
									>
										{" "}
									</RadioCheckbox>
								</td>
								<td className="p-3 pl-0 text-start">
									{item.id}
								</td>
								<td className="p-3 pl-0 text-start">
									<span className="capitalize">
										{item.first_name}
									</span>{" "}
									<span className="capitalize">
										{item.last_name}
									</span>
								</td>
								<td className="p-3 pl-0 text-start">
									{item.email}
								</td>
								<td className="p-3 pl-0 text-start">
									{item.mobile_number}
								</td>
								<td>
									{applicants.length > 1 && !item.is_primary ? (
										<IoTrash
											className="text-lg text-red-600 hover:text-red-700 cursor-pointer"
											onClick={() => handleDelete(item)}
										/>
									) : null}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

			<Confirm
				isActive={isConfirmShown}
				title={dialogData.title}
				description={dialogData.description}
				setIsActive={setIsConfirmShown}
				onConfirm={processDeletion}
				confirmText="Delete Applicant"
				icon={
					<IoTrash className="w-16 h-16 bg-red-600 text-white p-3 rounded-full" />
				}
			/>
		</form>
	);
}
