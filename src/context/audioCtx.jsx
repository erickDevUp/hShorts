
import React, { useState } from 'react';


const audioCtx = React.createContext({})
export const AudioCtx = ({children}) => {


    const [muting, setMuting] = useState(true);

    return(<audioCtx.Provider value={{muting, setMuting}}>
        {children}
    </audioCtx.Provider>
)
}
 
export default audioCtx;
