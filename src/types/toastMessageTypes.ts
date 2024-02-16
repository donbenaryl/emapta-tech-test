export interface IToastMessage {
    isShown: boolean;
	type: "danger" | "success" | "warn";
	title: string;
	message: string;
}

export interface IToastStore {
    toastData: IToastMessage;
    setToastData: (data: IToastMessage) => void;
}