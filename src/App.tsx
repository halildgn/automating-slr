import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Tabs from "@mui/material/Tabs";
import IconButton from '@mui/material/IconButton';
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import QueryGenerator from "./components/QueryGenerator";
import Filtering from "./components/Filtering";
import { COMPONENTS } from "./types/index";
import Download from "./components/Download";
import colapsLogo from './assets/colaps.png';

function App() {
  // let theme: 'light' | 'dark'
  // useEffect(() => {
  //   getCurrentTheme();
  // }, []);

  // function getCurrentTheme(){
  //   return localStorage.getItem('theme') ??
  // }

  // function setTheme(){

  // }

  const [isDark, setToDark] = useState<boolean>(false); 


  
  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const light = createTheme({
    palette: {
      mode: "light",
    },
  });

  const [component, setComponent] = useState<COMPONENTS>(0);

  function toggleTheme(){
    setToDark(!isDark);
  }

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
        aria-current={props.selected && "page"}
        {...props}
      />
    );
  }

  const handleChange = (event: React.SyntheticEvent, newComponent: number) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      switch (newComponent) {
        case COMPONENTS.GENERATOR:
          setComponent(COMPONENTS.GENERATOR);
          break;
        case COMPONENTS.FILTERING:
          setComponent(COMPONENTS.FILTERING);
          break;
        case COMPONENTS.DOWNLOAD:
          setComponent(COMPONENTS.DOWNLOAD);
          break;
        default:
          break;
      }
    }
  };

  function MainComponent() {
    switch (component) {
      case COMPONENTS.GENERATOR:
        return <QueryGenerator />;
      case COMPONENTS.FILTERING:
        return <Filtering />;
      case COMPONENTS.DOWNLOAD:
        return <Download />;
      default:
        break;
    }
  }

  return (
    <>
      <ThemeProvider theme={ isDark ? dark : light}>
        <CssBaseline />
        <div className={component === COMPONENTS.DOWNLOAD ? 'download-container' : 'container'}>
          <Box sx={{ width: "100%" }}>
    <img src={colapsLogo} className="colaps-logo"/>
            <div style={{position: 'absolute', top: '3%', right: '5%', zIndex: 1000}}>
   <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </div>
            <Tabs
              value={component}
              onChange={handleChange}
              aria-label="navigation tabs"
              role="navigation"
              centered
            >
              <LinkTab label="Query Generator" />
              <LinkTab label="Filtering" />
              <LinkTab label="Download" />
            </Tabs>
          </Box>
          <MainComponent />
        </div>
      </ThemeProvider>
    </>
  );
}
export default App;
