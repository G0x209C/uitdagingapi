module.exports = {
  attributes: {
    player: {model: 'player'},
    antwoord: {type:'string', required: true},
  },
  spelerAntwoorden: async (spelerId)=>{
    return await Quizantwoorden.find({player:spelerId}).catch(err=>{throw err;});
  }
};
