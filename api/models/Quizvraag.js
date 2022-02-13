module.exports = {
  attributes:{
    vraag:{ type:'string', required: true},
    mogelijkeantwoorden: {type:'json', required: true},
    juisteantwoord: {type: 'string', required: true},
  }
};
