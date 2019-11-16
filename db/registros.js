const Joi = require('joi');
const db = require('./conexion');
 
const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    intereses: Joi.array().items(Joi.string())
});
 
const registros = db.get('registros');
 
function getAll() {
    return registros.find();
}
 
function create(registro) {
    const result = Joi.validate(registro, schema);
    if (result.error == null) {
        return registros.insert(registro);
    } else {
        return Promise.reject(result.error);
    }
}
 
module.exports = {
    create,
    getAll
};