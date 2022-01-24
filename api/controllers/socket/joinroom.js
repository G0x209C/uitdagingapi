module.exports = {


  friendlyName: 'Joinroom',


  description: 'Joinroom socket.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits, env) {

    // check if incoming request is a socket.
    if(!env.req.isSocket){
      throw {badRequest: 'connection must be socket'};
    }

    // check if user already has a secret.
    if(env.req.cookies.secret){
      // retrieve room from player.
      let roomId = Player.findOne({secret: env.req.cookies.secret}).populate('room')
        .then((player)=>{
          return player.room.id;
        })
        .catch(err=>{throw err;});
      // join socket to socket-room for the associated room.
      sails.sockets.join(env.req, Room.getRoomName(roomId), (err)=>{
        if(err){ // if error, send it back to the client.
          return res.serverError(err);
        }
      });
    }else{ // if no identifier, send badRequest.
      throw {badRequest: 'lacking identifier'};
    }

  }


};
