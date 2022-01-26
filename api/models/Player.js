const {v4} = require('uuid');
module.exports = {

  attributes: {
    secret: {type: 'string', unique: true, required: true},
    name: {type: 'string', required: true},
    isHost: {type: 'boolean', defaultsTo: false},
    score: {type: 'number', defaultsTo: 0},
    room: {model: 'room'},
  },

  /**
   * @function newPlayer
   * @description This function is used to register new users to the site.
   * It creates a new room and adds the player to it,
   * or in case a roomId(code) is given, the player will join the existing room.
   */
  newPlayer: async (name, roomId) => {
    let secret = v4(); // create UUID.
    if (roomId) { // joining a room, create user that is not host.
      // find the room that was given
      let room = await Room.findOne({roomId: roomId}).catch(err => {
        throw err;
      });
      if (room) { // check if room was found.
        // create player.
        await Player.create({
          secret: secret,
          name: name,
          room: room.id,
        }).catch(err => {
          throw err;
        });
      }else{
        return null;
      }
    } else { // creating a room, create user that is host.
      // generate a room code
      let code = await sails.helpers.gencode();
      // check if room code already exists, if so, run the generator again.
      while (await Room.count({roomId:code}) > 0){
        code = await sails.helpers.gencode();
      }
      // create the new room.
      let room = await Room.create({roomId: code}).fetch().catch(err => {
        throw err;
      });
      if (room) { // if room is made
        // create player and link player to that room as a host.
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
    // return a player object with all associations populated.
    return await Player.findOne({secret:secret}).populateAll();
  },

  /**
   * @function addScore
   * @description updates playerscore and broadcasts an updated scoreboard to roommembers.
   */
  addScore: async (secret, score)=>{
    // add score to player and broadcast the updated scoreboard to players.
    let player = await Player.findOne({secret:secret})
      .populate('room')
      .catch(err=>{throw err;});
    // update database record.
    await Player.updateOne({secret:secret})
      .set({score:(player.score+score)})
      .catch(err=>{throw err;});

    // broadcast an updated scoreboard to clients.
    sails.sockets.broadcast(player.room.roomId, 'scoreboardupdate', await Room.getScores(player.room.id));
  }
};
