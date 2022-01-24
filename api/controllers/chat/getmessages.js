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

    }else{
      throw {badRequest:'lacking identifier'};
    }

  }


};
