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

    // get the player, using find->limit, because somehow WaterlineORM randomly complains about
    // the whereclause {} in findOne not to be specific enough.
    let player = (await Player.find({secret: env.req.cookies.secret}).limit(1).populate('room')
      .catch(err => {
        throw err;
      }))[0];
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
