module.exports = {
  attributes: {
    players: {collection: 'player', via: 'room'},
    messages: {collection: 'message', via: 'room'},
    roomId: {type: 'string', unique: true, required: true},
    activeGame: {model: 'game'}
  },

  getScores: async (room_id) => {
    // get room, get players, return a list of playernames and scores
    return await Room.findOne({id: room_id}).populate('players').then((room) => {
      let result = [];
      for (let i = 0; i < room.players.length; i++) {
        result[i] = {name: room.players[i].name, isHost: room.players[i].isHost, score: room.players[i].score};
      }
      return result;
    }).catch(err => {
      throw err;
    });

  }
};
