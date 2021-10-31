import { light } from "./light";

type colorType = typeof light

export const dark: colorType = {
	colors: {
    line: '#6A6C6F',
    background: '#303030',
    background_secondary: '#0E0E0E',
    background_is_dark: '#F2F3F5',
    background_is_dark_secondary: '#FFFFFF',
  
    title: '#D6D7D9',
    subtitle: '#DBDCE0',
    text: '#C6C6C6',
    text_light: '#BABCBE',
    text_details: '#ACADAF',
  
    attention: '#E83F5B',
    attention_dark: '#E83F5B',
    attention_light: '#EC788B',

    attention_title: '#E83F5B',
    attention_hover_title: '#FFF5F5',

    attention_background: '#FFF5F5',
    attention_hover_background: '#E83F5B',
  
    success: '#4CD62B',
    success_dark: '#4CD62B',
    success_light: '#7BED60',

    success_title: '#3FB023',
    success_hover_title: '#FFFFFF',

    success_background: '#F7FFF5',
    success_hover_background: '#4CD62B',
  
    main: '#5965E0',
    main_dark: '#4953B8',
    main_light: '#AFB4E4',

    main_title: '#5965E0',
    main_hover_title: '#D3D7FD',
    
    main_background: '#D3D7FD',
    main_hover_background: '#5965E0',
  
    secondary: '#2AA9E0',
    secondary_dark: '#2AA9E0',
    secondary_light: '#86D0F0',

    secondary_title: '#2AA9E0',
    secondary_hover_title: '#FFFFFF',

    secondary_background: '#F5FCFF',
    secondary_hover_background: '#2AA9E0',
  }
};
