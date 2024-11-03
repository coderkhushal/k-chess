
import React, { useState } from 'react'
import Chesscontext from "./chesscontext"
const ChessState = (props) => {
    
    
    const [MovePieceFrom , setMovePieceFrom]= useState(null);
    const [highlight, sethighlight]= useState(null)

  return (
    <Chesscontext.Provider value = {{MovePieceFrom, setMovePieceFrom , highlight, sethighlight}}>
        {props.children}
    </Chesscontext.Provider>
  )}

export default ChessState