import React, { useContext, useState } from 'react'
import { useDrag , DragPreviewImage} from 'react-dnd'
import Chesscontext from '../context/chesscontext'
import { GlowMoves } from './Game'

const Piece = (props) => {
    const context= useContext(Chesscontext)
    const { setMovePieceFrom,highlight, sethighlight}= context
    
    const{type, color } = props.piece
    const {position} = props
    const [{isDragging},drag, preview]= useDrag({
        type: 'piece',
        item: {
            id: `${position}_${type}_${color}`
        },
        collect: (monitor) => {
            return {isDragging: !!monitor.isDragging()}
          }
    })
    const pieceImg = require(`../assets/${type}_${color}.png`)
  return (
    <>
    <DragPreviewImage connect={preview} src={pieceImg}/>
    <div style={{opacity: isDragging?0:1}} ref={drag}>
        <img src={pieceImg} alt=""  className="piece-image" onClick={(e)=>{
            if(highlight==null){
                sethighlight("highlight")
            }
            else{
                sethighlight(null)
            }
            ;GlowMoves(position);setMovePieceFrom(position)}}/>

    </div >
    </>
  
  )
}

export default Piece
