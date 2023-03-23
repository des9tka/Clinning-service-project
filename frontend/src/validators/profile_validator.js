import Joi from "joi";

const profile_validator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]{2,30}$/).messages({
        'string.pattern.base': 'Only letters (2-30).'
    }),
    surname: Joi.string().regex(/^[a-zA-Z]{2,30}$/).messages({
        'string.pattern.base': 'Only letters (2-30).'
    }),
    phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required().messages({
        'string.pattern.base': 'Invalid phone number.'
    }),
    age: Joi.string().regex(/^(1[4-9]|[2-9]\d)$/).messages({
        'string.pattern.base': 'For 14+ y.o. users.'
    })
})

export {
    profile_validator
}