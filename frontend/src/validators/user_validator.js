import Joi from "joi"

const user_validator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]{2,30}$/).required().messages({
        'string.pattern.base': 'Only litters (2-30).'
    }),
    surname: Joi.string().regex(/^[a-zA-Z]{2,30}$/).required().messages({
        'string.pattern.base': 'Only litters (2-30).'
    }),
    phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required().messages({
        'string.pattern.base': 'Invalid phone number.'
    }),
    age: Joi.string().regex(/^(1[4-9]|[2-9]\d)$/).required().messages({
        'string.pattern.base': 'For 14+ y.o. users.'
    }),
    email: Joi.string().regex(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/).required().messages({
        'string.pattern.base': 'Invalid email.'
    }),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/).required().messages({
        'string.pattern.base': 'Password demands: 8-20 chars, contains a number(0-9), contains at least one UpperCase latter, contains at least one' +
            ' LowerCase latter, contains at least one SpecialChar latter.'
    }),

})

export {
    user_validator,

}
