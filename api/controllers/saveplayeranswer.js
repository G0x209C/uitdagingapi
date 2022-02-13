module.exports = {


  friendlyName: 'Saveplayeranswer',


  description: 'Saveplayeranswer something.',


  inputs: {
    secret: {
      type: 'string',
      required: true
    },
    answer: {
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits, env) {
    let answer = await Player.findOne({
        secret: inputs.secret
      })
      .then(async (player) => {
        let antwoord = await Quizantwoorden.create({
            player: player.id,
            antwoord: inputs.answer
          }).fetch()
          .catch(err => {
            throw {
              badRequest: `An error occurred: errmsg: ${err}`
            }
          });
        return await Quizantwoorden.findOne({id:antwoord.id}).populate('player');
      })
      .catch(err => {
        throw err;
      });

    return env.res.json(answer);

  }


};
