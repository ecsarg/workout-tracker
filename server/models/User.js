const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String, 
        require: true,
        unique: true,
        minlength: 8,
        maxlength: 32
    },
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    }
}
);

UserSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  UserSchema.virtual('followerCount').get(function() {
    return this.followers.length;
  });

const user = model('User', UserSchema);


module.exports = UserSchema;

