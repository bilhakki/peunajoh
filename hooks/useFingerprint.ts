import { create } from "zustand";

export interface UseFingerprint {
  visitorId?: string;
  setVisitorId: (visitorId?: string) => void;
}

export const useFingerprint = create<UseFingerprint>((set) => ({
  visitorId: undefined,
  setVisitorId: (visitorId?: string) => set({ visitorId }),
}));
