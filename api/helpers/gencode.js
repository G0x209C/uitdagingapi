module.exports = {


  friendlyName: 'Gencode',


  description: 'Gencode something.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result=[];
    for(let i=0; i<6; i++){
      result[i] = chars[Math.floor(Math.random()*chars.length)];
    }
    return result.join('');
  }


};

