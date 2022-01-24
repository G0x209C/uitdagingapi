module.exports = {


  friendlyName: 'Sendmessage',


  description: 'Sendmessage chat.',


  inputs: {
    msg:{type:'string',required:true}
  },


  exits: {

  },


  fn: async function (inputs,exits,env) {

    if(!env.req.isSocket){
      throw {badRequest: 'appears like you are not a socket connected client'};
    }

    if(env.req.cookies.secret){
      // get player -> room.
      let player = await Player.findOne({secret:env.req.cookies.secret}).populate('room')
        .catch(err=>{throw err;});
      // create the message
      let message = await Message.createnewMesage(env.req.cookies.secret,inputs.msg);
      // publish message in room except for the utterer.
      sails.sockets.broadcast(player.room.roomId, 'newmsg', {name:message.name, msg:message.msg}, env.req);
    }else {
      throw env.res.serverError('Lacking identifier');
    }

  }


};
