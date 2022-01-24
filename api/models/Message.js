module.exports = {

  attributes: {
    utterer: {model: 'player'},
    room: {model: 'room'},
    msg: {type: 'string', required: true}
  },

  getMessages: async (room) => {
    let messages;
    if (room) {
      messages = await Room.findOne({roomId: room}).populateAll().then((room) => {
        return room.messages;
      }).catch(err => {
        throw err;
      });
    } else {
      throw {badRequest: 'No room provided'};
    }
    return messages;
  }
};
