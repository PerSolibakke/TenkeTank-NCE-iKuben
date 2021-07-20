export type InformationBoxState = {
    isInformationBox: boolean;
  };
  
  export type ToggleInformationBoxStateAction = {
    type: typeof SET_INFORMATION_BOX;
  };
  
  export const SET_INFORMATION_BOX = 'TOGGLE_INFORMATION_BOX';