import Joi from 'joi'

const service_validator = Joi.object({
    name: Joi.string().required().regex(/^[a-zA-Z]{2,30}$/).messages({
        'string.pattern.base': 'Only letters (2-30).'
    }),
    address: Joi.string().required().min(2).max(50),
    city: Joi.string().required().min(2).max(30)
})

export {
    service_validator
}