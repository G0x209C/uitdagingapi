const {v4} = require('uuid');
/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // add the games to the database
  if(await Game.count()<6){
    await Game.createEach([
      {name:'Wie ben ik?', link: '/wiebenik'},
      {name:'Wat is dit?', link: '/watisdit'},
      {name:'Triviant', link: '/triviant'},
      {name:'Telepathie', link: '/telepathie'},
      {name:'Maak de zin af', link: '/maakdezinaf'},
      {name:'Goed of fout?', link: '/goedfout'},
    ]);
  }

  // method to create some fake messages for each player;
  const createRandomString = () =>
  {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result=[];
    for(let i=0; i<chars.length; i++){
      result[i] = chars[Math.floor(Math.random()*chars.length)];
    }
    return result.join('');
  };

  // creating some test players
  if(await Player.count < 6){
    let player1 = await Player.newPlayer("henk", undefined);
    let player2 = await Player.newPlayer("bob", player1.room.roomId);
    let player3 = await Player.newPlayer("Caro", player1.room.roomId);
    let player4 = await Player.newPlayer("Toby", undefined);
    let player5 = await Player.newPlayer("Merno", player4.room.roomId);
    let player6 = await Player.newPlayer("Skof", player4.room.roomId);
    // create some random messages.
    await Message.createEach([
      {room:player1.room.id, name:player1.name, msg:createRandomString()},
      {room:player1.room.id, name:player1.name, msg:createRandomString()},
      {room:player2.room.id, name:player2.name, msg:createRandomString()},
      {room:player3.room.id, name:player3.name, msg:createRandomString()},
      {room:player4.room.id, name:player4.name, msg:createRandomString()},
      {room:player5.room.id, name:player5.name, msg:createRandomString()},
      {room:player4.room.id, name:player4.name, msg:createRandomString()},
      {room:player6.room.id, name:player6.name, msg:createRandomString()},
      {room:player1.room.id, name:player1.name, msg:createRandomString()},
      {room:player2.room.id, name:player2.name, msg:createRandomString()},
    ]);
  }
};
