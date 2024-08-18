const {z} = require('zod');

// create a objct

const testSchema = z.object({
    name: z.string({required_error: 'name requred!'})
    .trim()
    .min(3, {message: 'min name is 3 characters'})
    .max(30, {message: 'max name is 10 chacters'}),
});

module.exports = testSchema;