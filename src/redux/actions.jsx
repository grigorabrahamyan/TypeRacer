const timer = (data) => ({ type: 'CHNAGE_TIMER', payload: data });
const wrong = (data) => ({ type: 'CHANGE_WRONG', payload: data });
const period = (data) => ({ type: 'CHANGE_PERIOD', payload: data });
const names = (data) => ({ type: 'CHANGE_NAMES', payload: data });
const endTimeDate = (data) => ({ type: 'FIX_ENDTIME_MAINSTR', payload: data });

export const changeTimer = (data) => (dispatch) => {
  dispatch(timer(data));
}

export const changeWrong = (data) => (dispatch) => {
  dispatch(wrong(data));
}

export const changePeriod = (data) => (dispatch) => {
  dispatch(period(data));
}

export const changenames = (name, lastName) => (dispatch) => {
  const obj = {
    name,
    lastName,
  };
  dispatch(names(obj));
} 

export const fixEndTime = (endTime, str, currentStr) => (dispatch) => {
  const obj = {
    endTime,
    str,
    currentStr
  } 
  dispatch(endTimeDate(obj));
}