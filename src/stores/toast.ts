import { IToastStore } from '@/types/toastMessageTypes';
import { create } from 'zustand';

export const useToastStore = create<IToastStore>((set) => ({
    toastData: {
        isShown: false,
        title: 'title',
        message: 'message',
        type: 'success'
    },
    setToastData: (toastData) => set({toastData}),
}))