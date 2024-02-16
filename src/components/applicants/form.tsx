import "~styles/globals.scss";
import { useForm } from "react-hook-form";
import Input from "@/components/form/input";
import { IoSaveSharp } from "react-icons/io5";
import React from "react";
import { IApplicant } from "@/types/applicantTypes";
import BtnPrimary from "@/components/form/primary";
import { emailPattern } from "@/lib/fe/validators";
import { saveApplicants } from "@/lib/fe/applicants";
import { useApplicantStore } from "@/stores/applicant-store";
import { useToastStore } from '../../stores/toast';

interface Props {
    className?: string;
}

export default function ApplicantForm(props: Props) {
    const applicants = useApplicantStore(state => state.applicants);
    const setApplicant = useApplicantStore(state => state.setApplicants);
    const setToastData = useToastStore(state => state.setToastData)
    const { className } = props;

	const {
		register,
		handleSubmit,
        reset,
		formState: { errors, isSubmitted },
	} = useForm<IApplicant>();

	const handleSave = async (data: IApplicant) => {
        const res = await saveApplicants(data);

        if (res.status === 'success') {
            // SET ID ON APPLICANT TO PUSH
            data.id = Number(res.message);
            // MERGE EXISTING APPLICANTS AND NEW ADDED
            setApplicant([...applicants, data]);
            // RESET FORM
            reset();

            setToastData({
                isShown: true,
                title: 'Success!',
                message: `${data.first_name} ${data.last_name} successfully added!`,
                type: 'success'
            })
        }
    };

	return (
		<>
			<form onSubmit={handleSubmit(handleSave)} className={className}>
				<Input
					id="first_name"
					name="first_name"
					type="text"
					label="First Name"
					register={register}
                    isSubmitted={isSubmitted}
					rules={{
						required: "First Name Required",
					}}
					error={errors.first_name ? errors.first_name.message : ""}
				/>
				<Input
					id="last_name"
					name="last_name"
					type="text"
					label="Last Name"
                    isSubmitted={isSubmitted}
					register={register}
					rules={{
						required: "Last Name Required",
					}}
					error={errors.last_name ? errors.last_name.message : ""}
				/>
				<Input
					id="mobile_number"
					name="mobile_number"
					type="text"
					label="Mobile Number"
                    isSubmitted={isSubmitted}
					register={register}
					rules={{
						required: "Mobile Number Required",
						pattern: {
							// REGEX PATTERN THAT ALLOWS 10 OR MORE DIGITS WITH OPTIONAL "+" AS THE FIRST CHARACTER FOR AN OPTION TO INPUT ARE CODE
							value: /^\+?\d{10,}$/,
							message: "Please enter a valid mobile number",
						},
					}}
					error={
						errors.mobile_number ? errors.mobile_number.message : ""
					}
				/>
				<Input
					id="email"
					name="email"
					type="text"
					label="Email"
                    isSubmitted={isSubmitted}
					register={register}
					rules={{
						required: "Email Required",
                        pattern: emailPattern
					}}
					error={errors.email ? errors.email.message : ""}
				/>

                <BtnPrimary className="float-right  w-full" type="submit">
                    <IoSaveSharp className="relative top-1 mr-2" />
                    Save
                </BtnPrimary>
			</form>
		</>
	);
}
