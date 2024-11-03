import React, {  useContext, useEffect, useState } from 'react'
import Square from './Square'
import Piece from './piece'
import { useDrop } from 'react-dnd'
import {  gameSubject, handlemove } from './Game'
import Promotion from './promotion'
import Chesscontext from '../context/chesscontext'



const BoardSquare = (props) => {
    const context= useContext(Chesscontext)
    const {MovePieceFrom}= context
    const {piece, black, position}= props
    const [promotion,setpromotion]= useState(null)
   
     const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromposition]= item.id.split("_")
            handlemove(fromposition, position)
        },
        collect: (monitor) => {
          return {isOver: !!monitor.isOver()}
        }
      });

      useEffect(()=>{
        const subscribe = gameSubject.subscribe(({pendingPromotion}) =>{
            (pendingPromotion && pendingPromotion.to === position)? setpromotion(pendingPromotion): setpromotion(null)
        })
        return ()=>{return subscribe.unsubscribe()}
    },[position])

  return (
    <div className='board-square' ref={drop} onClick={()=>{{handlemove(MovePieceFrom, position)}}}>
      <Square black= {black} >
        {promotion ? <Promotion promotion={promotion}/>: piece?<Piece piece ={piece}  position ={position}/ > : null }
        
        </Square>
    </div>
  )
}

export default BoardSquare
