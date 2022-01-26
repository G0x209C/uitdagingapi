module.exports = {


  friendlyName: 'Newplayer',


  description: 'Action endpoint for creating new player.',


  inputs: {
    name: {type:'string', required: true},
    code: {type:'string', required:false},
  },


  exits: {

  },


  fn: async function (inputs, exits, env) {
    let player;
    // TODO: implement max-users per room.
    // if code is given, pass in code.
    if(inputs.code){
      player = await Player.newPlayer(inputs.name,inputs.code);
    }else{
      player = await Player.newPlayer(inputs.name,undefined);
    }
    // update scoreboard
    // call addScore without adding a score.
    await Player.addScore(player.secret, 0);
    // this should broadcast the new player to all others
    // All done.
    return env.res.json(player);

  }


};
