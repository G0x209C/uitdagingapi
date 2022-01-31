module.exports = {
  attributes: {
    name: {type: 'string', required: true},
    link: {type: 'string', required: true}
  },

  getGames: async () => {
    return await Game.find().catch(err => {
      throw err;
    });
  }
};
