import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../assets/loading';

import { changeTimer, changeWrong, changePeriod, fixEndTime } from '../../redux/actions.jsx';

const GamePlace = () => {

  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [wrongStr, setWrongStr] = useState('');
  const [trueStr, setTrueStr] = useState('');
  const [currentStr, setCurrentStr] = useState('');
  const [correctStr, setCorrectStr] = useState([]);
  const [strLength, setStrLength] = useState(null);
  const [loading, setLoading] = useState(false);

  const { timer, wrongStep } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let str = data?.[0];
    //let result = str?.match(/([a-zA-Z]+)|([(]([a-zA-Z]+[+])+[a-zA-Z]+[)])+/gi);
    const cor = str?.replace(/\..{1}/g, '.');
    setCorrectStr(cor);
    setStrLength(cor?.length);
  }, [data]);

  const correctTimer = useMemo(() => {
    let m = 0;
    let s = 0;
    if (!(timer % 60)) {
      m = `0${timer / 60}`
      s = `00`;
    } else {
      m = `0${(timer - (timer % 60)) / 60}`;
      if (timer % 60 < 10) {
        s = `0${timer % 60}`
      } else {
        s = `${timer % 60}`
      }
    }
    return {
      m,
      s
    }
  }, [timer]);

  useEffect(() => {
    if (!text.length) {
      setCurrentStr(correctStr);
      setTrueStr('');
      setWrongStr('');
    } else {
      if (correctStr.includes(text) && correctStr[0] === text[0]) {
        if (text[text.length - 1] === correctStr[text.length - 1]) {
          setCurrentStr(correctStr.slice(text.length));
          setTrueStr(text);
          setWrongStr('');
        }
      } else {
        if (text.length < wrongStr.length + trueStr.length) {
          setWrongStr(wrongStr.slice(0, wrongStr.length - 1));
          setCurrentStr(correctStr.slice(text.length));
        } else {
          dispatch(changeWrong(wrongStep + 1));
          setWrongStr(wrongStr + correctStr.substr(text.length - 1, 1));
          setTrueStr(text.slice(0, text.length - wrongStr.length - 1));
          setCurrentStr(correctStr.slice(text.length));
        }
      }
    }
  }, [correctStr, text]);

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const request = await fetch('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1');
        const response = await request.json();
        setData(response);
        setLoading(false);
      })()
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let timerTimeOut = setTimeout(() => dispatch(changeTimer(timer - 1)), 1000);
    if (timer === 0) {
      return clearTimeout(timerTimeOut);
    }
  }, [timer]);

  useEffect(() => {
    if (text.length === strLength && !wrongStr.length) {
      dispatch(changePeriod('end'));
      dispatch(fixEndTime(timer, strLength, text.length));
    }
    if (timer === 0) {
      dispatch(changePeriod('end'));
      dispatch(fixEndTime(0, strLength, text.length));
    }
  }, [text, wrongStr, timer]);

  return (
    <section className="container">
      <div className='container__wrapper' >
        <div className='wrapper__timer__wrong' >
          <div className='same wrong' >
            <p>Wrong Step</p>
            <p>{wrongStep}</p>
          </div>
          <div className='same timer' >
            <p>Timer</p>
            <p>{`${correctTimer.m}m : ${correctTimer.s}s`}</p>
          </div>
        </div>
        <div className='text text__fetch' >
          {
            loading ? <Loading /> :
              (
                <>
                  <span className='true__str' >{trueStr}</span>
                  <span className='wrong__str' >{wrongStr}</span>
                  <span className='current__str' >{currentStr}</span>
                </>
              )
          }
        </div>
        <div className='text text__correct' >
          <div>
            <textarea
              className='text__textarea'
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  )
};

export default GamePlace;