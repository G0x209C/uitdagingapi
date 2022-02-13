/**
 * Module dependencies
 */

// ...


/**
 * newplayerlegacy.js
 *
 * Newplayerlegacy something.
 */
module.exports = async function newplayerlegacy(req, res) {

  let player;
  // TODO: implement max-users per room.
  // if code is given, pass in code.
  let code = req.param('code');
  let name = req.param('name');
  if (code) {
    let room = await Room.findOne({roomId: code}).catch(err => {
      throw err;
    });
    if (room) {
      if (await Room.checkMemberCount(room.id) <= 6) {
        player = await Player.newPlayer(name, code);
      } else {
        return res.serverError('Room is full'); // TODO: replace this with something other than serverError
      }
    } else {
      return res.serverError('Room not found'); // TODO: replace this with something other than serverError
    }
  } else {
    player = await Player.newPlayer(name, undefined);
  }
  // update scoreboard
  // call addScore without adding a score.
  // this should broadcast the new player to all others
  await Player.addScore(player.secret, 0);
  // res.cookie('secret', player.secret, {
  //   domain: 'localhost',
  //   path: '/',
  //   secure:false,
  // });
  //
  // res.cookie('name', player.name, {
  //   domain: 'localhost',
  //   path: '/',
  //   secure:false,
  // });
  // res.cookie('room', player.room.roomId, {
  //   domain: 'localhost',
  //   path: '/',
  //   secure:false,
  // });
  console.log(res);
  return res.ok(player);

};
