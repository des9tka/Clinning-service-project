import Joi from 'joi'

const service_validator = Joi.object({
    name: Joi.string().required().regex(/^[a-zA-Zа-яА-Я]{2,30}$/).messages({
        'string.pattern.base': 'Name: Only letters (2-30).',
        'string.empty': 'Name is required!'
    }),
    address: Joi.string().required().regex(/^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9]{2,50}$/).messages({
        'string.pattern.base': 'Address: Only letters and nums (2-30).',
        'string.empty': 'Address is required!'
    }),
    city: Joi.string().required().regex(/^[a-zA-Zа-яА-Я]{2,30}$/).messages({
        'string.pattern.base': 'City: Only letters (2-30).',
        'string.empty': 'City is required!'
    }),
})

export {
    service_validator
}