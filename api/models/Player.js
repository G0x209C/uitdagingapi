const { create } = require('lodash');
const {v4} = require('uuid');
module.exports = {
    
    attributes:{
        secret: {type:'string', unique:true,required:true},
        name: {type:'string', required:true},
        isHost: {type:'boolean', defaultsTo:false},
        score: {type:'number', defaultsTo:0},
        room: {model:'room'},
        messages: {collection:'message',via:'utterer'}
    },

    newPlayer: async(name,roomId)=>{
        let createdPlayer;
        if(roomId){ // joining a room, create user that is not host.
            let room = await Room.findOne({roomId:roomId}).catch(err=>{throw err;});
            if(room){
                createdPlayer = await Player.create({
                    secret: v4(), 
                    name:name,
                    room:room.id,
                }).fetch().populate('room').catch(err=>{throw err;});
            }
        }else{ // creating a room, create user that is host.
            let room = await Room.create({roomId:sails.helpers.gencode()}).fetch().catch(err=>{throw err;});
            if(room){
                createdPlayer = await Player.create({
                    secret: v4(),
                    name:name,
                    isHost: true,
                    room:room.id
                }).fetch().populate('room');
            }
        }
        return createdPlayer;
    }
}