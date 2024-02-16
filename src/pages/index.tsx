import ApplicantList from "@/components/applicants/applicants";
import ApplicantForm from "@/components/applicants/form";
import H1 from "@/components/typography/heading1";
import "~styles/globals.scss";
import ToastMessage from "@/components/taost-message/toast-message";

export default function Applicants() {
	return (
		<div className="block px-5 mb-10">
			<ToastMessage />
			<div className="container rounded-md bg-white !mt-10 p-10">
				<H1>Emapta Tech Test</H1>
				<label>By:</label>{" "}
				<span className="text-gray-900">Don Benary Lagadan</span>
			</div>
			<div className="container rounded-md bg-white !mt-5 p-10 height-auto md:grid md:grid-cols-3 md:gap-2">
				<div className="md:col-span-2 sm:col-span-3 xl:pr-10">
					<H1>Applicant(s)</H1>
					<ApplicantList />
				</div>
				<div className="max-sm:mt-10">
					<H1 className="w-full block">
						<span className="float-left">Add Applicant</span>
					</H1>
					<ApplicantForm className="float-left w-full" />
				</div>
			</div>
		</div>
	);
}
