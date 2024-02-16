import { IApplicant, IApplicantStore } from '@/types/applicantTypes';
import { create } from 'zustand';

export const useApplicantStore = create<IApplicantStore>((set) => ({
    applicants: [],
    setApplicants: (applicants: IApplicant[]) => set({applicants})
}))