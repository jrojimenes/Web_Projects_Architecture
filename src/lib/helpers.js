const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPsw = async (password) => {
    //repeat the ecexution of this method 10 times for create hash
const salt =  await  bcrypt.genSalt(10);
    //encrypt password
const hash = await bcrypt.hash(password, salt);
return hash;
};


helpers.matchPassword = async (password, savePassword) => {
try{
  return await bcrypt.compare(password, savePassword);
}
catch(e){
console.log(e);
}
};

module.exports = helpers;