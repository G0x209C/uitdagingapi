module.exports = {


  friendlyName: 'Selectgame',


  description: 'Selectgame for lobby.',


  inputs: {
    gameId: {type: 'string', required: true}
  },


  exits: {},


  fn: async function (inputs, exits, env) {
    if (!env.req.isSocket) {
      throw {badRequest: 'Connection is not a socket'};
    }

    let player = await Player.findOne({secret: env.req.cookies.secret}).populate('room')
      .catch(err => {
        throw err;
      });
    if (!player.isHost) {
      throw {badRequest: 'Player is not host'};
    }
    // check if game exists:
    let game = await Game.findOne({id: inputs.gameId})
      .catch(err => {
        // game not found, return badRequest to user;
        sails.log.error(`User requested non-existing room\nError: ${err.error}`);
        throw {badRequest: 'Game not found'};
      });
    if(game){
      // update room and send connected clients the game they have to go to.
      await Room.updateOne({id: player.room.id})
        .set({activeGame: game.id})
        .catch(err => {
          throw err;
        });
      sails.sockets.broadcast(player.room.roomId, 'startgame', {gameLink: game.link});
    }

  }


};
