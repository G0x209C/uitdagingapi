module.exports = {


  friendlyName: 'Get games',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits,env) {
    // all done
    return env.res.ok(await Game.getGames());

  }


};
