const Joi = require('joi');

const updateValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object({
            firstname: Joi.string().min(2).max(256).required(),
            middleName: Joi.string().min(2).max(256).optional(),
            lastname: Joi.string().min(2).max(256).required(),
        }),
        phone: Joi.string().min(10).max(15).pattern(/0[0-9]{2}-?\s?[0-9]{3}\s?[0-9]{4}/)
            .message('Must be a valid phone number').required(),
        image: Joi.object({
            url: Joi.string().uri().required(),
            alt: Joi.string().min(2).max(256).optional(),
        }),
        address: Joi.object({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        }).required(),
    });

    return schema.validate(user);
};

module.exports = updateValidation;
