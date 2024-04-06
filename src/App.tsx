import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import QueryGenerator from './components/QueryGenerator';
import Filtering from './components/Filtering';
import MyQueries from './components/MyQueries';
import { COMPONENTS} from './types/index';
import Download from './components/Download';

function App() {

  const [component, setComponent] = useState<COMPONENTS>(0);

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}


  const handleChange = (event: React.SyntheticEvent, newComponent: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      switch(newComponent){
        case COMPONENTS.GENERATOR: 
          setComponent(COMPONENTS.GENERATOR);
          break;
   case COMPONENTS.FILTERING: 
          setComponent(COMPONENTS.FILTERING);
          break;
    case COMPONENTS.MY_QUERIES: 
          setComponent(COMPONENTS.MY_QUERIES);
          break;
     case COMPONENTS.DOWNLOAD: 
          setComponent(COMPONENTS.DOWNLOAD);
          break;
        default: 
          break;
      }
      }
    }

  function MainComponent(){
switch(component){
        case COMPONENTS.GENERATOR: 
         return (<QueryGenerator />) 
   case COMPONENTS.FILTERING: 
             return (<Filtering/>) 
    case COMPONENTS.MY_QUERIES: 
          return (<MyQueries/>) 
     case COMPONENTS.DOWNLOAD: 
          return (<Download/>) 
        default: 
          break;
      }
  }


  return (
    <div className="container">
  <Box sx={{ width: '100%' }}>
      <Tabs
          value={component}
        onChange={handleChange}
        aria-label="navigation tabs"
        role="navigation"
          centered
      >
        <LinkTab label="Query Generator" />
        <LinkTab label="Filtering" />
        <LinkTab label="My Queries" />
        <LinkTab label="Download(Experimental)" />
      </Tabs>
    </Box>
      <MainComponent />
</div>
       );
}
export default App;
