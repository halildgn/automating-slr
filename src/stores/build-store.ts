import { Build } from "../types/index";

export function getBuilds(){
return JSON.parse(localStorage.getItem('builds') as string);
}

export function buildsArePresent(): boolean{
    const builds = localStorage.getItem('builds');
      return !!builds;
}

export function setInitialBuilds(){
      localStorage.setItem('builds', JSON.stringify([]));
  }

export function saveBuild(build:Build){
  const builds: Array<Build> = getBuilds();
  builds.push(build);
  localStorage.setItem('builds', JSON.stringify(builds));
}


 export function removeBuild(id: string){
    const builds: Array<Build> = getBuilds();
    const index = builds.findIndex((build)=>build.id === id)
    builds.splice(index,1);
    localStorage.setItem('builds', JSON.stringify(builds));
 }
