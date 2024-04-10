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
import { useEffect } from "react";
import QueryGenerator from "./components/QueryGenerator";
import Filtering from "./components/Filtering";
import { COMPONENTS } from "./types/index";
import Download from "./components/Download";
import colapsLogo from './assets/colaps.png';
import classNames from 'classnames';
import MyBuilds from "./components/MyBuilds";
import {useConfigStore } from "./stores/config-store";
import { useComponentStore } from "./stores/component-store";
import { getConfiguration } from "./resources/configuration-resource";

function App() {
  const component = useComponentStore((state)=>state.currentComponent) 
    const setComponent = useComponentStore((state)=>state.setCurrentComponent)
  const theme = useConfigStore((state)=>state.theme)
  const setTheme = useConfigStore((state)=> state.setTheme) 

  const mainContainerClass = classNames({
'container': component !== COMPONENTS.DOWNLOAD && component !== COMPONENTS.MY_BUILDS,
'download-container': component === COMPONENTS.DOWNLOAD ,
'my-builds-container': component === COMPONENTS.MY_BUILDS 
	});

  const dark = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: '#464545'
      }
    },
  });
  const light = createTheme({
    palette: {
      mode: "light",
    },
  });

  useEffect(()=>{
  const setInitialConfiguration = async () => {
    const {theme,builds} = await getConfiguration();  
      useConfigStore.setState({theme, builds})
  }
setInitialConfiguration();
  })


	function toggleTheme() {
			const newTheme =  theme === "light" ? "dark" : "light";
      setTheme(newTheme)
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
        case COMPONENTS.MY_BUILDS:
          setComponent(COMPONENTS.MY_BUILDS);
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
      case COMPONENTS.MY_BUILDS:
        return <MyBuilds />;
      default:
        break;
    }
  }

  return (
 <>
      <ThemeProvider theme={ theme === 'dark' ? dark : light}>
        <CssBaseline />
        <div className={mainContainerClass}>
          <Box sx={{ width: "100%" , position: "relative"}}>
    <img src={colapsLogo} className="colaps-logo"/>
            <div style={{position: 'absolute', top: '3%', right: '5%', zIndex: 1000}}>
   <IconButton onClick={toggleTheme}>
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
              <LinkTab label="My Builds" />
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
