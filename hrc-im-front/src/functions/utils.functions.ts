import { setIndex } from "../redux/sidebar-redux/sidebarSlice";
import { store } from "../redux/sidebar-redux/store";

//Get url from path
export function GetUrl() {
    const path = window.location.pathname; 
    const lastSegment = path.split('/').filter(Boolean).pop(); 
    return lastSegment ? lastSegment.toLowerCase() : '';
  }

// Get color from string {Function from MUI}
export function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  export function LightstringToColor(string: string, alpha: number = 0.5) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = [0, 0, 0];
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color[i] = value;
    }
  
    // Devuelve el color en formato rgba, donde `alpha` es la transparencia
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  }
  

  // Get avatar from string {Function from MUI}
export  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  


  //Reset index if home

export const resetIndexIfHome = () => {
    const currentUrl = window.location.pathname;

    if (currentUrl != '/home') {
        store.dispatch(setIndex(0));
        const currentSidebarState = JSON.parse(sessionStorage.getItem('sidebarState') || '{}');
        currentSidebarState.index = 0;
        sessionStorage.setItem('sidebarState', JSON.stringify(currentSidebarState));
    }
};


