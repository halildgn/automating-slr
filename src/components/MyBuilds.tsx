import {Build, COMPONENTS} from '../types/index'
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import LaunchIcon from '@mui/icons-material/Launch';
import { useBuildsStore} from '../stores/build-store';
import { useFieldsStore } from '../stores/query-generation-store';
import { useComponentStore } from '../stores/component-store';

function MyBuilds(){
const builds = useBuildsStore((state)=>state.builds)

const removeBuild = useBuildsStore((state)=>state.removeBuild)
 const setFields = useFieldsStore((state) => state.setFields)
  const setComponent = useComponentStore((state)=>state.setCurrentComponent)

  return (
  <>
{builds.map((build: Build) => (
        <>
 <Paper elevation={3}> 
            {build.name}
    <Tooltip title="Load to generator">
              <LaunchIcon onClick={()=>{setFields(build.fields);setComponent(COMPONENTS.GENERATOR)}}/>
          </Tooltip>
                <Tooltip title="Delete">
              <DeleteIcon onClick={()=>removeBuild(build.id)}/>
          </Tooltip>
            </Paper>
                 </>
      ))} 
  </>
  );
}

export default MyBuilds;
