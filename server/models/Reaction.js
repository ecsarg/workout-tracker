const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema (
    {
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        
},
{
    toJSON: {
        getters: true,
    }
}
);



module.exports = reactionSchema;