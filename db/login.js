const Joi = require('joi');
const db = require('./conexion');
 
const schema = Joi.object().keys({
    user: Joi.string().min(4),
    password: Joi.string().min(8)
});
 
const usuarios = db.get('usuarios');
 
function logUser(user) {
    return usuarios.findOne({user: user.user, password: user.password});
}

function users(){
    return usuarios.find();
}

function create(user) {
    const result = Joi.validate(user, schema);
    if (result.error == null) {
        return usuarios.insert(user);
    } else {
        return Promise.reject(result.error);
    }
}

 
module.exports = {
    logUser,
    create,
    users
};