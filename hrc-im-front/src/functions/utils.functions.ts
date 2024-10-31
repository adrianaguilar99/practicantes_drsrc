import { setIndex } from "../redux/sidebar-redux/sidebarSlice";
import { store } from "../redux/store";

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

  export function LightstringToColor(string: string, alpha: number = 0.9) {
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
  
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  }
  

  // Get avatar from string {Function from MUI}
  export function stringAvatar(name: string, size: number = 40, fontSize: number = size / 2.5) {
    const nameParts = name.split(' ');
  
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
        fontSize: fontSize,
      },
      children: nameParts.length === 1 
        ? `${nameParts[0][0]}`
        : `${nameParts[0][0]}${nameParts[1][0]}`,
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



export function formatPhoneNumber(phoneNumber : string) {
  const cleaned = phoneNumber.toString().replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}`;
  }

  return phoneNumber;
}


export const parseTimeString = (timeString: string) => {
  const timeValue = parseInt(timeString.slice(0, -1));
  const timeUnit = timeString.slice(-1);

  switch (timeUnit) {
      case 's': 
          return timeValue * 1000;
      case 'm': 
          return timeValue * 1000 * 60;
      case 'h': 
          return timeValue * 1000 * 60 * 60;
      case 'd': 
          return timeValue * 1000 * 60 * 60 * 24;
      default:
          throw new Error('Formato de tiempo inválido');
  }
};