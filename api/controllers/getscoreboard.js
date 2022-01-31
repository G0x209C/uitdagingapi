module.exports = {


  friendlyName: 'Getplayersinfo',


  description: 'Getplayersinfo something.',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs, exits, env) {
    // check if it is a socket
    if(!env.req.isSocket){
      throw {badRequest: 'Connection is not a socket'};
    }
    // retrieve player.room(id)
    let player = await Player.findOne({secret:env.req.cookies.secret})
      .catch(err=>{throw err;});
    // return scores from Model-method getScores.
    return env.res.ok(await Room.getScores(player.room)); // gets the id from unpopulated record.
    // player.room without population of the room record == room.id.
  }


};
