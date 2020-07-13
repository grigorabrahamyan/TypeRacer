const initialState = {
  timer: 180,
  wrongStep: 0,
  period: 'start',
  firstName: '',
  lastName: '',
  endTime: null,
  mainStrLength: null,
  currentStr: null,
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'CHNAGE_TIMER':
      return {
        ...state,
        timer: actions.payload
      };
    case 'CHANGE_WRONG':
      return {
        ...state,
        wrongStep: actions.payload
      };
    case 'CHANGE_PERIOD':
      return {
        ...state,
        period: actions.payload
      };
    case 'CHANGE_NAMES':
      const { name, lastName } = actions.payload;
      return {
        ...state,
        firstName: name,
        lastName
      };
    case 'FIX_ENDTIME_MAINSTR':
      const { endTime, str, currentStr } = actions.payload
      return {
        ...state,
        endTime,
        mainStrLength: str,
        currentStr
      };
    default:
      return state;
  }
};
