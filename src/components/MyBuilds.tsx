import {Build, COMPONENTS} from '../types/index'
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import LaunchIcon from '@mui/icons-material/Launch';
import { useConfigStore} from '../stores/config-store';
import { useFieldsStore } from '../stores/query-generation-store';
import { useComponentStore } from '../stores/component-store';
import { Box } from '@mui/material';

function MyBuilds(){
const builds = useConfigStore((state)=>state.builds)
const removeBuild = useConfigStore((state)=>state.removeBuild)
 const setFields = useFieldsStore((state) => state.setFields)
  const setComponent = useComponentStore((state)=>state.setCurrentComponent)

  return (
  <div className="my-builds-container-builds">
{builds.map((build: Build) => (
        <>
 <Paper elevation={3} className="my-builds-container-paper"> 
            {build.name}
            <Box className="my-builds-container-paper-icons">
    <Tooltip title="Load to generator">
              <LaunchIcon onClick={()=>{setFields(build.fields);setComponent(COMPONENTS.GENERATOR)}}/>
          </Tooltip>
                <Tooltip title="Delete">
              <DeleteIcon onClick={()=>removeBuild(build.id)}/>
          </Tooltip>
          </Box>
            </Paper>
                 </>
      ))} 
  </div>
  );
}

export default MyBuilds;
