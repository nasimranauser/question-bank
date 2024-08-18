const {Schema, model} = require('mongoose');

// creae a schema
const testSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    dname: {
        item: {
            type:String,
            required:true,
        }
    }
});

// define a model
const Test = model('Test', testSchema);

module.exports = Test;