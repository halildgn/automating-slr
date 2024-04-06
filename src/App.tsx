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

function App() {

  const [value, setValue] = useState<number>(0);

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


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      if(newValue === 0){
        setValue(0);
      }else if(newValue === 1){
        setValue(1);
      }else if(newValue === 2){
        setValue(2);
      }
      }
    }

  function MainComponent(){
    if(value === 1){
      return (<Filtering />);
    }
    if(value === 2){
   return (<MyQueries />);
    }
      return (<QueryGenerator />);
  }


  return (
    <div className="container">
  <Box sx={{ width: '100%' }}>
      <Tabs
          value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
          centered
      >
        <LinkTab label="Query Generator" />
        <LinkTab label="Filtering" />
        <LinkTab label="My Queries" />
        <LinkTab label="Query and Filter(Experimental)" />
   {/* <LinkTab label="My Queries" href="/my-queries" /> */}
      </Tabs>
    </Box>
      <MainComponent />
</div>
       );
}
export default App;
