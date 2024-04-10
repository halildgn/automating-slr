import { create } from 'zustand'
import { Build } from "../types/index";
import { setThemeConfiguration, setBuildsConfiguration } from '../resources/configuration-resource';

interface ConfigStore{
  theme: 'light' | 'dark'
  builds: Array<Build>,
  setTheme: (theme: 'light' | 'dark') => Promise<void>,
  saveBuild: (build:Build)=> Promise<void>,
  removeBuild: (id:string) => Promise<void>
}

export function buildsArePresent(): boolean{
    const builds = localStorage.getItem('builds-storage');
      return !!builds;
}

export function setInitialBuilds(){
      localStorage.setItem('builds-storage', JSON.stringify({builds: []}));
  }

export const useConfigStore =  create<ConfigStore>(
  (set,get) => {
    return ({
  theme: null as unknown as 'light' | 'dark',
  builds: null as unknown as Array<Build>,
  setTheme: async (newTheme: 'light' | 'dark') => {
    await setThemeConfiguration(newTheme);
    set({theme: newTheme})
  },
  saveBuild: async (newBuild: Build) => {
    set({builds: [...get().builds, newBuild]})
  setBuildsConfiguration(get().builds);
  },
  removeBuild: async (id: string) => {
    set({builds: get().builds.filter((build)=>build.id !== id)})
  setBuildsConfiguration(get().builds);
  },
})
  }
)
