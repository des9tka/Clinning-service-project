import Joi from "joi"

const user_validator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Zа-яА-Я]{2,30}$/).required().messages({
        'string.pattern.base': 'Only litters (2-30).',
        'string.empty': 'is required!'
    }),
    surname: Joi.string().regex(/^[a-zA-Zа-яА-Я]{2,30}$/).required().messages({
        'string.pattern.base': 'Only litters (2-30).',
        'string.empty': 'is required!'
    }),
    phone: Joi.string().regex(/^(?:\+?3[80]|0)\d{9,12}$/).required().messages({
        'string.pattern.base': 'Invalid phone number.',
        'string.empty': 'is required!'
    }),
    age: Joi.string().regex(/^(1[4-9]|[2-9]\d)$/).required().messages({
        'string.pattern.base': 'For 14+ y.o. users.',
        'string.empty': 'is required!'
    }),
    email: Joi.string().regex(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/).required().messages({
        'string.pattern.base': 'Invalid email.',
        'string.empty': 'is required!'
    }),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/).required().messages({
        'string.pattern.base': '8-20 chars, contains a number(0-9), contains at least one UpperCase latter, contains at least one' +
            ' LowerCase latter, contains at least one SpecialChar latter.',
        'string.empty': 'is required!'
    }),
})

const email_validator = Joi.object({
    email: Joi.string().regex(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/).required().messages({
        'string.pattern.base': 'Invalid email.',
        'string.empty': 'Email is required!'
    }),
})

const password_validator = Joi.object({
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/).required().messages({
        'string.pattern.base': 'Password demands: 8-20 chars, contains a number(0-9), contains at least one UpperCase latter, contains at least one' +
            ' LowerCase latter, contains at least one SpecialChar latter.',
        'string.empty': 'Password is required!'
    }),
})


export {
    user_validator,
    email_validator,
    password_validator
}
