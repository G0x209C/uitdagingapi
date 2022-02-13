module.exports = {


  friendlyName: 'Newplayer',


  description: 'Action endpoint for creating new player.',


  inputs: {
    name: {type: 'string', required: true},
    code: {type: 'string', required: false},
  },


  exits: {},


  fn: async function (inputs, exits, env) {
    let player;
    // TODO: implement max-users per room.
    // if code is given, pass in code.
    if (inputs.code) {
      let room = await Room.findOne({roomId: inputs.code}).catch(err => {
        throw err;
      });
      if (room) {
        if (await Room.checkMemberCount(room.id) <= 6) {
          player = await Player.newPlayer(inputs.name, inputs.code);
        } else {
          return env.res.serverError('Room is full'); // TODO: replace this with something other than serverError
        }
      } else {
        return env.res.serverError('Room not found'); // TODO: replace this with something other than serverError
      }
    } else {
      player = await Player.newPlayer(inputs.name, undefined);
    }
    // update scoreboard
    // call addScore without adding a score.
    // this should broadcast the new player to all others
    await Player.addScore(player.secret, 0);

    return env.res.json(player);

  }


};
