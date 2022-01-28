const _ = require('lodash');
module.exports = {


  friendlyName: 'Getmessages',


  description: 'Getmessages chat.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits,env) {

    // check if connection is socket
    if(!env.req.isSocket){
      throw {badRequest:'connection is not a socket'};
    }

    if(env.req.cookies.secret){
      // get player
      let room_id = await Player.findOne({secret:env.req.cookies.secret}).populate('room')
        .then((player)=>{
          return player.room.id;
        })
        .catch(err=>{throw err;});
      return env.res.ok(_.reverse(await Message.getMessages(room_id)));
    }else{
      throw {badRequest:'lacking identifier'};
    }

  }


};
