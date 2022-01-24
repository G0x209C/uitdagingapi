const {v4} = require('uuid');
module.exports = {

  attributes: {
    secret: {type: 'string', unique: true, required: true},
    name: {type: 'string', required: true},
    isHost: {type: 'boolean', defaultsTo: false},
    score: {type: 'number', defaultsTo: 0},
    room: {model: 'room'},
  },

  newPlayer: async (name, roomId) => {
    let secret = v4(); // create UUID.
    if (roomId) { // joining a room, create user that is not host.
      let room = await Room.findOne({roomId: roomId}).catch(err => {
        throw err;
      });
      if (room) {
        await Player.create({
          secret: secret,
          name: name,
          room: room.id,
        }).catch(err => {
          throw err;
        });
      }
    } else { // creating a room, create user that is host.
      let code = await sails.helpers.gencode();
      while (await Room.count({roomId:code}) > 0){
        code = await sails.helpers.gencode(); // make new code if roomId already exists
      }
      let room = await Room.create({roomId: code}).fetch().catch(err => {
        throw err;
      });
      if (room) {
        await Player.create({
          secret: secret,
          name: name,
          isHost: true,
          room: room.id
        }).catch(err => {
          throw err;
        });
      }
    }
    return await Player.findOne({secret:secret}).populateAll();
  }
};
