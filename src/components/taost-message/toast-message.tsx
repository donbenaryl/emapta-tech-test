import "~styles/globals.scss";
import { useEffect, useState } from "react";
import { useToastStore } from "@/stores/toast";

export default function ToastMessage() {
	const toastData = useToastStore((state) => state.toastData);
	const setToastData = useToastStore((state) => state.setToastData);
	const [isLoaded, setIsLoaded] = useState(false);

	let textColor =
		toastData.type === "danger"
			? "red"
			: toastData.type == "success"
			? "green"
			: "orange";

	
	useEffect(() => {
		setIsLoaded(true);

		if (toastData.isShown) {
			setTimeout(() => setToastData({...toastData, isShown: false}), 5000)
		}
	}, [toastData]);

	return (
		<div className="fixed right-0 bottom-0 lg:w-1/4 max-md:w-full md:m-2 max-sm:p-2">
			{toastData.isShown && isLoaded && (
				<div className="flex flex-col gap-3">
					<div
						className={`flex bg-white items-center px-6 py-4 text-sm border-t-2 rounded-b shadow-sm border-${textColor}-500`}
					>
						{toastData.type === "danger" && (
							<svg
								viewBox="0 0 24 24"
								className="w-8 h-8 text-red-500 stroke-current"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						)}
						{toastData.type === "success" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-8 h-8 text-green-500 stroke-current"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						)}
						{toastData.type === "warn" && (
							<svg
								viewBox="0 0 24 24"
								className="text-orange-500 w-5 h-5 sm:w-5 sm:h-5 mr-3"
							>
								<path
									fill="currentColor"
									d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
								></path>
							</svg>
						)}
						<div className="ml-3">
							<div
								className={`font-bold text-left text-${textColor}-500`}
							>
								{toastData.title}
							</div>
							<div className="w-full text-gray-600 mt-1">
								{toastData.message}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
