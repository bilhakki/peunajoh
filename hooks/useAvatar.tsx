import { create } from "zustand";

interface Lipsync {
  metadata: {
    soundFile: string;
    duration: number;
  };
  mouthCues: {
    start: number;
    end: number;
    value: string;
  }[];
}

export interface UseAvatar {
  lipsync?: Lipsync;
  setLipsync: (lipsync: Lipsync) => void;
  audio?: HTMLAudioElement;
  setAudio: (audio: HTMLAudioElement) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  path?: string;
  setPath: (path?: string) => void;
}

export const useAvatar = create<UseAvatar>((set) => ({
  lipsync: undefined,
  setLipsync: (lipsync?: Lipsync) => set((state: UseAvatar) => ({ lipsync })),
  audio: undefined,
  setAudio: (audio?: HTMLAudioElement) =>
    set((state: UseAvatar) => ({ audio })),
  play: false,
  setPlay: (play: boolean) => set((state: UseAvatar) => ({ play })),
  path: undefined,
  setPath: (path: string | undefined) => set((state: UseAvatar) => ({ path })),
}));
