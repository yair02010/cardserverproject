const Joi = require('joi');

const loginValidation = (email, password) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(9).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
        return error.details[0].message; 
    }
    return null; 
};

module.exports = loginValidation;
