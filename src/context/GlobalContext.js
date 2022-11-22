import React, { useState } from "react";

// create context
export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [isLoaded, setLoaded] = useState(false);

    //global
    const [globalData, setglobalData] = useState({
        team: {}
    });
    return <GlobalContext.Provider value={{
        data: globalData,
        setData: setglobalData
    }}>{children}</GlobalContext.Provider>
}
