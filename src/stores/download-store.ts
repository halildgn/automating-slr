import { create } from 'zustand'


interface DownloadStore{
  library: null | 'WOS',
  setLibrary: (lib: 'WOS') => void,
  query: string | null,
  setQuery: (q: string) => void
}

export const useDownloadStore =  create<DownloadStore>((set) => ({
 library: null,
  setLibrary: (lib) => set(() => ({library : lib })),
  query: null,
  setQuery: (q) => set(() => ({query : q })),
}))

