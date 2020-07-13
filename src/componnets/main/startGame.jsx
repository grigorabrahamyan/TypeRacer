import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changePeriod, changenames } from '../../redux/actions';
import GetUsers from './getUsers';

const StartGame = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const changeCurrentPeriod = useCallback(() => {
    if (name.length && lastName.length) {
      dispatch(changePeriod('middle'));
      dispatch(changenames(name, lastName));
    } else {
      const elem = document.querySelector('.lessInput');
      elem.classList.toggle('showMassage');
    }
  }, [name, lastName]);

  const fillInputs = useCallback(() => {
    const elem = document.querySelector('.lessInput');
    elem.classList.remove('showMassage');
  }, []);

  return (
    <section className="container startGame">
      <div className='startGame__titleWrapper' >
        <h1 className='startGame__title' >It’s like a game where you can understand how fast you can type and how accurately</h1>
      </div>
      <GetUsers />
      <div className='lessInput' >
        <p>Please fill all fields</p>
      </div>
      <div className='startGame__nameSpace' >
        <div className='startGame__wrapperInput' >
          <input
            type="text"
            value={name}
            placeholder='First Name'
            onFocus={fillInputs}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='startGame__wrapperInput' >
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onFocus={fillInputs}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className='startGame__wrapperButton' >
        <div className='startGame__button' >
          <button
            onClick={changeCurrentPeriod}
          >
            START THE GAME
          </button>
        </div>
      </div>
    </section>
  )
};

export default StartGame;