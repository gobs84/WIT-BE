const Joi = require('joi');
const db = require('./conexion');
 
const schema = Joi.object().keys({
    nombre: Joi.string().min(1).max(50),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    mensaje: Joi.string().min(1).max(8000)
});
 
const contacto = db.get('contacto');
 
function getAll() {
    return contacto.find();
}
 
function create(mensaje) {
 
    const result = Joi.validate(mensaje, schema);
    if (result.error == null) {
        return contacto.insert(mensaje);
    } else {
        return Promise.reject(result.error);
    }
}
 
module.exports = {
    create,
    getAll
};