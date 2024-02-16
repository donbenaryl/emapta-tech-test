import "~styles/globals.scss";
import { IDialogProps } from "@/types/dialogTypes";
import React, { useEffect } from "react";

export default function Confirm(props: IDialogProps) {
	const { isActive, setIsActive, description, title, cancelText, confirmText, onConfirm, icon } =
		props;

	useEffect(() => {
		if (isActive) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isActive]);

	const closeAlert = () => setIsActive(false);

	return (
		<div className="fixed top-0 z-10 w-full left-0">
			{isActive && (
				<div className="min-h-screen bg-gray-500/50 flex justify-center items-center">
					<div className="bg-white rounded-lg">
						<div className="w-96 border-t-8 border-blue-600 rounded-lg flex">
							<div className="w-1/3 pt-6 flex justify-center">
                                {icon || null}
							</div>
							<div className="w-full pt-9 pr-4">
								<h3 className="font-bold text-blue-700">
									{title}
								</h3>
								<p className="py-4 text-sm text-gray-700">
									{description}
								</p>
							</div>
						</div>

						<div className="p-4 flex space-x-4">
							<button
								className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
								onClick={closeAlert}
								type="button"
							>
								{cancelText || 'Cancel'}
							</button>
							<button
								className="w-1/2 px-4 py-3 text-center text-pink-100 bg-primary rounded-lg hover:bg-blue-600 font-bold text-sm"
								onClick={onConfirm}
								type="button"
							>
                                {confirmText || 'Confirm'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
