import React from 'react'

const Square = (props) => {
   const {black}= props
   const bgClass = black ? "squared-black":"squared-white"
  return (
    <div className={`${bgClass} board-square`}>
        {props.children}
    </div>
  )
}

export default Square
