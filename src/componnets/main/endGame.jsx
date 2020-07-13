import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePeriod } from '../../redux/actions';

const EndGame = () => {

  const { endTime, firstName, lastName, wrongStep, mainStrLength, currentStr } = useSelector(state => state);

  //const endTime = 0;
  //const firstName = 'Arsen';
  //const lastName = 'Safaryan';
  //const wrongStep = 8;
  //const mainStrLength = 300;
  //const currentStr = 295;

  const [saveData, setSaveData] = useState({});
  const [afterSave, setAfterSave] = useState('');
  const [beforData, setBeforData] = useState({});
  const dispatch = useDispatch();

  const netWPM = useMemo(() => {
    return Math.round((mainStrLength / 5 / ((180 - endTime) / 60))) - wrongStep;
  }, [mainStrLength, endTime, wrongStep]);

  const accuracy = useMemo(() => {
    if (mainStrLength - currentStr < 0) {
      return 0;
    }
    return Math.round((currentStr - (mainStrLength - currentStr) - wrongStep) * 100 / mainStrLength);
  }, [mainStrLength, currentStr, wrongStep]);

  const handleSaveResult = useCallback((firstName, lastName, netWPM, accuracy) => {
    const obj = {
      firstName,
      lastName,
      netWPM,
      accuracy
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    try {
      (async () => {
        let response = await fetch('https://jsonstorage.net/api/items', options);
        let result = await response.json();
        setSaveData(result);
      })()
    } catch (err) {
      console.log(err, 'error massage');
    }
  }, [saveData]);

  useEffect(() => {
    try {
      (
        async () => {
          let response = await fetch('https://jsonstorage.net/api/items/916710d9-3147-4623-a0dd-02108c2fe3f0');
          let result = await response.json();
          setBeforData(result);
        }
      )()
    } catch (err) {
      console.log(err);
    }
  }, [afterSave]);

  useEffect(() => {
    if (!saveData.uri) return
    let arr = [];
    if (!Array.isArray(beforData)) {
      arr = [saveData];
    } else {
      arr = [saveData, ...beforData];
    }
    const options = {
      method: 'PUT',
      body: JSON.stringify(arr),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };
    try {
      (async () => {
        let response = await fetch('https://jsonstorage.net/api/items/916710d9-3147-4623-a0dd-02108c2fe3f0', options);
        let result = await response.json();
        if (result.uri !== 'https://jsonstorage.net/api/items/916710d9-3147-4623-a0dd-02108c2fe3f0') {
          setAfterSave('Something went wrong!');
        } else {
          setAfterSave('Your result has been saved!');
        }
      })()
    } catch (err) {
      console.log(err, 'error massage');
    }
  }, [saveData]);

  useEffect(() => {
    if (!afterSave.length) return
    document.addEventListener('click', () => dispatch(changePeriod('start')));
  }, [afterSave]);

  return (
    <section className="container endGame">
      <div className='endGame__body' >
        <div className='endGame__wrapperTitle' >
          <h1 className='endGame__title' >{`${firstName} ${lastName}`}</h1>
        </div>
        <div className='endGame__wrapperText' >
          <p className='endGame__text' >{`Average speed in WPM: ${netWPM}`}</p>
          <p className='endGame__text' >{`Completion percent: ${accuracy}%`}</p>
        </div>
        {
          afterSave.length ?
            <div className='endGame__afterSave' >
              <p>{afterSave}</p>
            </div> : null
        }
        <div className='endGame__saveWrapper' >
          <div className='endGame__button' >
            <button
              onClick={() => handleSaveResult(firstName, lastName, netWPM, accuracy)}
            >
              SAVE RESULT
            </button>
          </div>
          <div className='endGame__button' >
            <button
              onClick={() => dispatch(changePeriod('start'))}
            >
              NEW GAME
            </button>
          </div>
        </div>
      </div>
    </section>
  )
};

export default EndGame;