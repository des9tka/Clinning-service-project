import Joi from "joi";

let currentYear = new Date().getFullYear();
let nextYear = currentYear + 1;
const yearRegex = `^(?:${currentYear}|${nextYear})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$`;

const order_validator = Joi.object({
    address: Joi.string().regex(/^[a-zA-Zа-яА-Я]{2,30}$/).required().messages({
        'string.pattern.base': 'must contain 2-30 letters.',
        'string.empty': 'is required!'
    }),
    date: Joi.string().regex(new RegExp(yearRegex)).required().custom((value, helpers) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < currentDate) {
            return helpers.message('cannot be earlier than the current date!');
        }
        return value;
    }, 'Custom Date Validation').messages({
        'string.pattern.base': `should be between ${currentYear} and ${nextYear}. Date cant be earlier than date now. DD-MM-YYYY format.`,
        'string.empty': 'is required!'
    }),
    time: Joi.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).required().messages({
        'string.pattern.base': 'has invalid format, should be HH-MM.',
        'string.empty': 'is required!'
    }),
    footage: Joi.string().regex(/^\d{1,5}$/).required().messages({
        'string.pattern.base': 'demands only digits, 5 max.',
        'string.empty': 'is required!'
    }),
    task_description: Joi.string().regex(/^[a-zA-Zа-яА-Я0-9]{2,300}$/).required().messages({
        'string.pattern.base': 'demands only digits and letters, 2-300 chars.',
        'string.empty': 'is required!'
    }),
})


export {
    order_validator
}
