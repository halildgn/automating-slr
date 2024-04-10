import { Build } from "../types/index";
import axios from "axios"

export const getConfiguration = async (): Promise<{theme: 'light' | 'dark' , builds: Array<Build>}> => {
      const { data } = await axios.get("http://localhost:9998/config")
  return data;
  }

export const setThemeConfiguration = async (theme: 'light' | 'dark'): Promise<void> =>{
   await axios.post("http://localhost:9998/setThemeConfig", {theme: theme}) 
}

export const setBuildsConfiguration = async (builds: Array<Build>): Promise<void> =>{
  await  axios.post("http://localhost:9998/setBuildsConfig", {builds: builds}) 
}
