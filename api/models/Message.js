const {async} = require('async');
const _ = require('lodash');

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
  getMessages: async (room_id) => {
    return _.reverse(await Message.find({room: room_id}).catch(err => {
      throw err;
    }));
  },

  createnewMesage: async (secret, msg, req) => {
    // find player.
    let player = await Player.findOne({secret:secret}).populate('room').catch(err=>{throw err});
    // return the created message:
    let message;
    if(player) {
      message = await Message.create({
        room: player.room.id,
        name: player.name,
        msg: msg
      }).fetch().catch(err => {
        throw err;
      });
    }
    // broadcast message to room.
    if(message){
      sails.sockets.broadcast(player.room.roomId, 'newmsg', {name:message.name, msg:message.msg}, req);
    }
  }
};
