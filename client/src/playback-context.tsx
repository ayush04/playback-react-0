import React, { createContext, useState } from 'react';

export const PlaybackContext = createContext({});

const PlaybackProvider = ({ children }: any) => {
    const [data, setData] = useState({});
    return (
        <PlaybackContext.Provider value={{data, setData}}>
            { children }
        </PlaybackContext.Provider>
    );
}

export default PlaybackProvider;