module.exports = {


  friendlyName: 'Emit init data',


  description: '',


  inputs: {
    secret: {type:'string', required:true},
  },


  exits: {

  },


  fn: async function (inputs, exits, env) {

    if(!env.req.isSocket){
      throw {badRequest: 'Connection is not a socket'};
    }
    let player = await Player.findOne({secret:inputs.secret}).populateAll()
      .catch(err=>{throw err});

    let data = {
      room: player.room.roomId,
      playerscores: await Room.getScores(player.room.id),
      messages: await Message.getMessages(player.room.id),
      games: await Game.getGames(),
      isHost: player.isHost,
    };

    sails.sockets.broadcast(sails.sockets.getId(env.req), 'initdata', data);

  }


};
