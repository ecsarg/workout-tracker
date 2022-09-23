const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const workoutSchema = new Schema ({
    workoutBody: {
        type: String,
        required: "You need to add your workout!",
        minlength:1,
        maxlength:280
    },
    username: {
        type: String, 
        require: true
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    reactions: [ reactionSchema ],
},
{
    toJSON: {
        getters: true
    },
}
);

workoutSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Workout = model('Workout', workoutSchema);


module.exports = Workout;