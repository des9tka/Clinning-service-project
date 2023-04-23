import Joi from "joi";

const order_validator = Joi.object({
    address: Joi.string().required().regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9]{2,50}$/).messages({
        'string.pattern.base': 'Address: Only letters and nums (2-30).'
    }),
    footage: Joi.string().regex(/^[0-9]{1,5}$/).messages({
        'string.pattern.base': 'Surname: Only letters (2-30).'
    }),
    task_description: Joi.string().required().regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9]{2,300}$/).messages({
        'string.pattern.base': 'Address: Only letters and nums (2-300).'
    }),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        'string.pattern.base': 'Phone: Invalid phone number.'
    }),
    time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        'string.pattern.base': 'Phone: Invalid phone number.'
    }),

})

export {
    profile_validator
}