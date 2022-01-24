const {async} = require('async');

module.exports = {

  /**
   * Definition of msghistory array:
   * utterer: [name of players]
   * msg: [array of messages]
   */

  attributes: {
    room: {model: 'room', required:true},
    name: {type: 'string', required:true},
    msg: {type: 'string', required:true},
  },

  // return the messages
  getMessages: async (room) => {
    return await Message.find({room:room}).catch(err=>{throw err;});
  },

  createnewMesage: async (secret, msg) => {
    // find player.
    let player = await Player.findOne({secret:secret}).populate('room').catch(err=>{throw err});
    // return the created message:
    return await Message.create({
      room: player.room.id,
      name: player.name,
      msg: msg
    }).fetch().catch(err => {
      throw err;
    });
  }
};
