import {BehaviorSubject}  from "rxjs"
const {Chess} =require("chess.js") 

let chess= new Chess()



export function initGame(){
    updategame()
}

export function resetgame(){
    chess.reset()
}

export function handlemove(from, to){
    const promotions= chess.moves({verbose: true }).filter(move=>{return move.promotion})
    if(promotions.some((p=> `${p.from}:${p.to}`=== `${from}:${to}`))){
        const pendingPromotion= {from, to, color:promotions[0].color} 
        updategame(pendingPromotion)
    }

    const {pendingPromotion}= gameSubject.getValue()
    if(!pendingPromotion){
        move(from,to)
    }
}

export const gameSubject = new BehaviorSubject({
    board: chess.board()
})

export function move(from , to, promotion){
    try{
    let tempmove = {from , to}
    if(promotion){
        tempmove.promotion = promotion
    }
    const legalmove= chess.move(tempmove)
    if(legalmove){
        updategame()
    }}catch(err){
        console.log(err)
    }   
}

function updategame(pendingPromotion){
    const isGameOver= chess.isGameOver()

    const newGame= {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn:chess.turn(),
        result : isGameOver? getGameResult():null,

    } 
    gameSubject.next(newGame)
}

const getGameResult=()=>{
    if(chess.isCheckmate()){
        const winner = chess.turn()==="w"?"BLACK":"WHITE"
        return `CHECKMATE- WINNER- ${winner}`
    }
    else if(chess.isDraw()){
        let reason= "50-MOVES-RULE"   
        if(chess.isStalemate()){
            reason = "STALEMATE"
        }
        else if(chess.isThreefoldRepetition()){
            reason = "REPITION"
        }
        else if(chess.isInsufficientMaterial()){
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW- ${reason}`
    }
    else{
        return 'UNKNOWN REASON'
    }

    

}

// export function GlowMoves(from){
//     chess.moves({verbose:true}).filter(move=>{
//         if(move.from=== from){
//             console.log(move)
//         }
//     })
// }
export function GlowMoves(from){
    chess.moves({verbose:true}).filter(move=>{
        if(move.from === from){
            console.log(move)
            
        }
    })
}


