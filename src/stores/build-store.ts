import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Build } from "../types/index";

interface BuildStore{
  builds: Array<Build>,
  saveBuild: (build:Build)=> void,
  removeBuild: (id: string)=> void
}

export function buildsArePresent(): boolean{
    const builds = localStorage.getItem('builds-storage');
      return !!builds;
}

export function setInitialBuilds(){
      localStorage.setItem('builds-storage', JSON.stringify({builds: []}));
  }

export const useBuildsStore = create(
  persist<BuildStore>(
    (set, get) =>{
      const storage = localStorage.getItem('builds-storage')
return ({
      builds: storage ? (JSON.parse(storage) as BuildStore).builds : [],
      saveBuild: (build: Build) =>set({builds: [...get().builds, build]}),
      removeBuild: (id: string)=> set({builds: get().builds.filter((build)=>build.id !== id)})
    })
    } 
    ,{
      name: 'builds-storage',
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)
