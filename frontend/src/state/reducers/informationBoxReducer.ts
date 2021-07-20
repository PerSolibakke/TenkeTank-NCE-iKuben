import {
    InformationBoxState,
    ToggleInformationBoxStateAction,
    SET_INFORMATION_BOX,
  } from '../../types/redux/informationBoxTypes';
  
  const defaultState: InformationBoxState = {
    isInformationBox: true,
  };
  
  const informationBoxReducer = (
    state: InformationBoxState = defaultState,
    action: ToggleInformationBoxStateAction,
  ) => {
    switch (action.type) {
      case SET_INFORMATION_BOX:
        return {
          isInformationBox: !state.isInformationBox,
        };
      default:
        return state;
    }
  };
  
  export const ToggleInformationBox = (): ToggleInformationBoxStateAction => ({
    type: 'TOGGLE_INFORMATION_BOX',
  });
  
  export default informationBoxReducer;
  