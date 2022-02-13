module.exports = {


  friendlyName: 'Logout',


  description: 'Logout something.',


  inputs: {},


  exits: {},


  fn: async function (inputs, exits, env) {
    if(!env.req.isSocket){
      throw {badRequest: 'connection is not socket'};
    }

    console.log(env.req.cookies.secret);
    let player = await Player.findOne({secret: env.req.cookies.secret})
      .populate('room')
      .catch(err => {
        throw err;
      });

    if(player){
      await Player.archiveOne({secret: env.req.cookies.secret})
        .catch(err => {
          throw err;
        });
      // leave the socket-room
      sails.sockets.leave(env.req, player.room.roomId);

      sails.sockets.broadcast(player.room.roomId, 'newmsg', {name: 'Server', msg:`Speler ${player.name} is zojuist uitgelogd`}, env.req);
      // broadcast to the room you left that there's a new scoreboard.
      sails.sockets.broadcast(player.room.roomId, 'scoreboardupdate', await Room.getScores(player.room.id), null);
    }else{
      return env.res.serverError('Could not find user.. Already logged out?');
    }

    return env.res.ok('player successfully loggedout');
  }


};
