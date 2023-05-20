import Joi from "joi";

let currentYear = new Date().getFullYear();
let nextYear = currentYear + 1;
const yearRegex = `^(?:${currentYear}|${nextYear})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$`;

const order_validator = Joi.object({

    address: Joi
        .string()
        .regex(/^[a-zA-Zа-яА-Я]{2,30}$/)
        .required().messages({
            'string.pattern.base': 'Address must contain 2-30 letters.',
            'string.empty': 'Address is required!'
        }),

    date: Joi
        .string()
        .regex(new RegExp(yearRegex))
        .required()
        .custom((value, helpers) => {
            const date = new Date()
            const currentDate = new Date().toISOString().slice(0, 10);
            const selectedDate = new Date(value).toISOString().slice(0, 10);
            const timeSelect = document.getElementById('time');
            if (selectedDate < currentDate) {
                timeSelect.disabled = true;
                return helpers.message('Date cannot be earlier than the current date!');
            } else if (selectedDate === currentDate && date.getHours() >= 17) {
                timeSelect.disabled = true;
                return helpers.message('Date is too late for today, pick another day!');
            } else {
                timeSelect.disabled = false;
            }
            return value;
        }, 'Custom Date Validation')
        .messages({
            'string.pattern.base': `Date should be between ${currentYear} and ${nextYear}. Date cant be earlier than date now. DD-MM-YYYY format.`,
            'string.empty': 'Date is required!'
        }),

    time: Joi
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
        .required()
        .messages({
            'string.pattern.base': 'Time has invalid format, should be HH-MM.',
            'string.empty': 'Time is required!'
        }),

    footage: Joi
        .string()
        .regex(/^\d{1,5}$/)
        .required()
        .messages({
            'string.pattern.base': 'Footage demands only digits, 5 max.',
            'string.empty': 'Footage is required!'
        }),

    task_description: Joi
        .string()
        .regex(/^[a-zA-Zа-яА-Я0-9]{2,300}$/)
        .required()
        .messages({
            'string.pattern.base': 'Task demands only digits and letters, 2-300 chars.',
            'string.empty': 'Task is required!'
        }),
})

export {
    order_validator
}
