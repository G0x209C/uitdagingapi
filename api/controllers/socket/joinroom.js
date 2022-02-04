module.exports = {


  friendlyName: 'Joinroom',


  description: 'Joinroom socket.',


  inputs: {
    room: {type:'string', required:true}
  },


  exits: {

  },


  fn: async function (inputs, exits, env) {

    // check if incoming request is a socket.
    if(!env.req.isSocket){
      throw {badRequest: 'connection must be socket'};
    }
    sails.sockets.join(env.req,inputs.room,(err)=>{
      if(err){
        sails.sockets.broadcast(sails.sockets.getId(env.req), 'servermsg', {err:true, msg: err});
      }
    });
  }


};
