const Joi = require('joi');

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object({
            firstname: Joi.string().min(2).max(256).required(),
            middleName: Joi.string().min(2).max(256).optional(),
            lastname: Joi.string().min(2).max(256).required(),
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(9).pattern(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
        ).message(
            'Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-'
        ).required(),
        phone: Joi.string().min(10).max(15).pattern(/0[0-9]{2}-?\s?[0-9]{3}\s?[0-9]{4}/)
            .message('Must be a valid phone number').required(),
        image: Joi.object({
            url: Joi.string().uri().required(),
            alt: Joi.string().min(2).max(256).optional(),
        }),
        address: Joi.object({
            state: Joi.string().min(2).max(256).allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            zip: Joi.string().min(2).max(256).required(),
            homeNum: Joi.string().min(2).max(256).required(),
        }),
        isBusiness: Joi.boolean().required(),
        isAdmin: Joi.boolean().allow(),
    });

    const { error } = schema.validate(user);
    if (error) {
        return error.details.map(detail => detail.message).join(', ');
    }

    return null;
};

module.exports = registerValidation;
