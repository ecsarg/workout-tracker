const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('../models/Reaction');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');

const WorkoutSchema = new Schema ({
    workoutBody: {
        type: String,
        require: true
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
    muscleGroup: { 
        type: String,
        require: true,
        maxlength: 50
    },
    reactions: [ ReactionSchema ],
},
{
    toJSON: {
        getters: true
    },
}
);

WorkoutSchema.virtual('reactionCount').git(function(){
    return this.reactions.length;
});


const workout = model('Workout', WorkoutSchema);


module.exports = workout;