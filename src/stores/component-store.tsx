import { create } from 'zustand'
import { COMPONENTS } from '../types/index'


interface ComponentStore{
  currentComponent: COMPONENTS,
  setCurrentComponent: (componentToRender: COMPONENTS)=>void
}

export const useComponentStore =  create<ComponentStore>((set) => ({
  currentComponent: COMPONENTS.GENERATOR,
  setCurrentComponent: (componentToRender: COMPONENTS) => set(() => ({currentComponent : componentToRender })),
}))

