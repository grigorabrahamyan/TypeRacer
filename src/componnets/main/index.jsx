import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import GamePlace from './gamePlace';
import StartGame from './startGame';
import EndGame from './endGame';

const Main = () => {

  const { period } = useSelector(state => state);

  if (period === 'start') return <StartGame /> 
  if (period === 'middle') return <GamePlace />
  if (period === 'end') return <EndGame />
  
};

export default Main;