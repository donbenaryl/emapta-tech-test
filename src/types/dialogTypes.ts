export interface IDialogProps {
    isActive: boolean;
    readonly title: string;
    readonly description?: string;
    cancelText?: string;
    confirmText?: string;
    setIsActive: (isActive: boolean) => void;
    onConfirm: () => void;
    icon?: React.ReactNode;
}