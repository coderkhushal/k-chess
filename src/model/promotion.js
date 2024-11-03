import React from 'react'
import { move } from './Game'

const promotionPieces = ["r","n","q","b"]

const Promotion = (props) => {
    const {promotion}= props
  return (
    <div className='board'>
      {promotionPieces.map((p,i)=>{
        return(<div key ={i} className='promote-square'>
            <div className='piece-container' onClick={()=>move(promotion.from, promotion.to ,p)}>
                <img src={require(`../assets/${p}_${promotion.color}.png`)} alt=""  className='piece-image'/>
            </div>
        </div>)
      })}
    </div>
  )
}

export default Promotion
