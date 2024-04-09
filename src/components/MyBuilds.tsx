import {Build} from '../types/index'
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import LaunchIcon from '@mui/icons-material/Launch';
import { useBuildsStore} from '../stores/build-store';

function MyBuilds(){
const builds = useBuildsStore((state)=>state.builds)
const removeBuild = useBuildsStore((state)=>state.removeBuild)

  return (
  <>
{builds.map((build: Build) => (
        <>
 <Paper elevation={3}> 
            {build.name}
    <Tooltip title="Load to generator">
              <LaunchIcon />
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
