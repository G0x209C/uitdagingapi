module.exports={
    attributes:{
        players: {collection:'player', via:'room'},
        messages: {collection:'message', via:'room'},
        roomId: {type:'string', unique:true, required: true},
        activeGame: {model:'game'}
    }
}