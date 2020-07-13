import React from 'react';
import Loader from 'react-loader-spinner'

function Loading() {

    return (
        <div className = 'loading' >
            <Loader
                type="Oval"
                color="#4CCCC9"
                height={100}
                width={100}
            />
        </div>
    );
}

export default Loading;