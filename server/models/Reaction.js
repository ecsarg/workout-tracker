const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema (
    {
        reactionBody: {
            type: String,
            require: true,
            maxlength: 200
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

// const Reaction = model('Reaction', ReactionSchema);




module.exports = ReactionSchema;