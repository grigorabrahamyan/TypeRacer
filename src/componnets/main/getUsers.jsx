import React, { useEffect, useState } from 'react';
import Loading from '../../assets/loading';

const GetUsers = () => {

  const [data, setData] = useState([]);
  const [correctData, setCorrectData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      (
        async () => {
          setLoading(true);
          let response = await fetch('https://jsonstorage.net/api/items/916710d9-3147-4623-a0dd-02108c2fe3f0');
          let result = await response.json();
          setData(result);
          setLoading(false);
        }
      )()
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(data)) {
      try {
        (
          async () => {
            setLoading(true);
            let response = await fetch(data.uri);
            let result = await response.json();
            setCorrectData([result]);
            setLoading(false);
          }
        )()
      } catch (err) {
        console.log(err);
      }
    } else {
      const correctData = data.map(item => fetch(item.uri));
      //setLoading(true);
      Promise.all(correctData)
        .then(response => response)
        .then(response => Promise.all(response.map(r => r.json())))
        .then(response => setCorrectData(response))
        //.then(response => setLoading(false))
        .catch(err => console.log(err));
    }
  }, [data]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='startGame__wrapperUsers' >
      {
        correctData.map((item, index) => {
          return (
            <div key={index} className='startGame__user' >
              <p>{`${item.firstName} ${item.lastName}`}</p>
              <p>{`WPM: ${item.netWPM}`}</p>
              <p>{`Accurancy: ${item.accuracy}%`}</p>
            </div>
          )
        })
      }
    </div>
  )
};

export default GetUsers;