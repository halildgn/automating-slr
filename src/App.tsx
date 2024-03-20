import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./App.css";
import { useState } from 'react';
import { Route, Switch } from "wouter";
import QueryGenerator from './components/QueryGenerator';
import { useLocation } from "wouter";
import Filtering from './components/Filtering';

function App() {

  const [value, setValue] = useState(0);
  const [loc, setLocation] = useLocation();

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
      setValue(newValue);
      if(newValue === 0){
          setLocation("/query");
      }else if(newValue === 1){
           setLocation("/filtering");
      }else if(newValue === 2){
           setLocation("/both");
      }
      }
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
        <LinkTab label="Query Generator" href="/query" />
        <LinkTab label="Filtering" href="/filtering" />
        <LinkTab label="Both" href="/both" />
      </Tabs>
    </Box>
    <Switch>
      <Route path="/query" component={QueryGenerator} />
    <Route path="/filtering" component={Filtering} />
      <Route component= {QueryGenerator}/>
    </Switch>
</div>
       );
}
export default App;
