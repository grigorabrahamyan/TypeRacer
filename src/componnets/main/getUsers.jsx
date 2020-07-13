import React, { useEffect, useState, useMemo } from 'react';
import Loading from '../../assets/loading';

const GetUsers = () => {

  const [correctData, setCorrectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        let response = await fetch('https://jsonstorage.net/api/items/916710d9-3147-4623-a0dd-02108c2fe3f0');
        let result = await response.json();
        if (!Array.isArray(result)) {
          result = [result];
        }
        const promiseArray = result.map(item => fetch(item.uri));
        const responses = await Promise.all(promiseArray);
        const data = await Promise.all(responses.map(item => item.json()));
        let resultData = [...data];
        if (resultData.length > 10) {
          resultData = resultData.slice(0, 10);
        }
        setCorrectData(resultData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />
  }

    return (
      <div className='startGame__wrapperUsers' >
        {
          correctData?.map((item, index) => {
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
    );
};

export default GetUsers;