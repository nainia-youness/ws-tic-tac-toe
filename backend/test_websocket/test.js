//u1 end with 8
game_state=[{user_id:"u1",move:0},{user_id:"u1",move:8},{user_id:"u1",move:7},{user_id:"u1",move:6},{user_id:"u2",move:4},{user_id:"u2",move:2},{user_id:"u2",move:3}]


host_id="u1"
guest_id="u2"

const is_game_ended =(game_state,gamer1_id,gamer2_id)=>{

    console.log(game_state)
    console.log(game_state.length)
    if(game_state.length<5)
        return undefined
    const winning_combinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]]
    let boxList=['_','_','_','_','_','_','_','_','_']
    //add to boxList ex => ['u1', '_',  'u2','u2', 'u2', '_','u1', 'u1', 'u1']
    for(const i in game_state){
            const move= game_state[i].move
            if(game_state[i].user_id==gamer1_id){
                boxList[move]=gamer1_id
        }
        else if(game_state[i].user_id==gamer2_id){
            boxList[move]=gamer2_id
        }
    }
    console.log(boxList)
    //check if someone won
    for(const i in winning_combinations){
            const index1=winning_combinations[i][0]
            const index2=winning_combinations[i][1]
            const index3=winning_combinations[i][2]

            if(boxList[index1]!='_' && boxList[index1]==boxList[index2] && boxList[index1]==boxList[index3]){
                console.log("someone won")
                let is_host_won=false
                if(boxList[index1]==gamer1_id){
                    is_host_won=true                        
                }
                else{
                    is_host_won=false
                }
                console.log(is_host_won)
                const winner_id= is_host_won ? gamer1_id : gamer2_id
                const loser_id=  !is_host_won ? gamer1_id : gamer2_id
                return {
                        method:"game_end",
                        winning_indexes:[index1,index2,index3],
                        end_game_state:{
                            winner_id:winner_id,
                            loser_id:loser_id
                        }
                }
            }
    }
    console.log("nothing happend")
    return undefined
}

let is_game_end = is_game_ended (game_state,host_id,guest_id);
        if( is_game_end !=undefined){//game ended
                console.log(is_game_end)
        }








/*
const winning_combinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]]

let boxList=['_','_','_','_','_','_','_','_','_']
console.log(game_state)

let host_moves=[]
let guest_moves=[]
host_id="u1"
guest_id="u2"



for(const i in game_state){
        const move= game_state[i].move
        if(game_state[i].user_id==host_id){
            boxList[move]=host_id
    }
    else if(game_state[i].user_id==guest_id){
        boxList[move]=guest_id
    }
}


console.log(boxList)

for(const i in winning_combinations){
            const index1=winning_combinations[i][0]
            const index2=winning_combinations[i][1]
            const index3=winning_combinations[i][2]


            if(boxList[index1]!='_' && boxList[index1]==boxList[index2] && boxList[index1]==boxList[index3]){
                let butState=''
                if(boxList[index1]==host_id){
                    console.log(host_id+' won')
                    console.log(guest_id+' lost')
                }
                else{
                    console.log(guest_id+' won')
                    console.log(host_id+' lost')
                }
            }
}

*/
/*
host_moves=[]
guest_moves=[]
game_state.forEach(element => {
    if(element.user_id=="u1"){
        host_moves.push(element.move)
    }
    else if(element.user_id=="u2"){
        guest_moves.push(element.move)
    }
});


for(const i in host_moves){
    for(const j in host_moves){
        if(i!=j){
            for(const k in host_moves){
                if(k!=j){

                }
            }
        }

    }
}*/

//console.log(host_moves,guest_moves)