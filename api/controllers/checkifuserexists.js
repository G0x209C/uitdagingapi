module.exports = {


  friendlyName: 'Checkifuserexists',


  description: 'Checks if user already in database',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits, env) {

    if(!env.req.isSocket) {
      throw {badRequest: 'Connection is not a socket'};
    }

    // TODO: expand this with a check for how long a user has been inactive
    if(env.req.cookies.secret){
      if(await Player.count({secret:env.req.cookies.secret})>0){
        // if player exists: send true, no delete.
        return env.res.ok({exists:true, delete:false});
      }else{
        // client doesn't exist in database, send command to delete the identifier cookie.
        return env.res.ok({exists:false, delete:true});
      }
    }else{
      // no cookie found, send it as error message;
      return env.res.ok({exists:false, delete:false, error:'no identifier cookie found'});
    }
  }

};
