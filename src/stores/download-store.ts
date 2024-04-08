import { create } from 'zustand'
import { Library} from '../types/index'


interface DownloadStore{
  library: null | Library,
  setLibrary: (lib: Library) => void,
  query: string | null,
  setQuery: (q: string) => void
}

export const useDownloadStore =  create<DownloadStore>((set) => ({
 library: null,
  setLibrary: (lib) => set(() => ({library : lib })),
  query: null,
  setQuery: (q) => set(() => ({query : q })),
}))

