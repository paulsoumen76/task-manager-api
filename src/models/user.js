const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
           if(value<0){
               throw new Error('Age must be a positive number')
           }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password" ')
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
    
},{
    timestamps:true
})

//setup virtual
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

//creating jwt authentication for user

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    user.save()
    return token
}

//creating hiding private data function

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//creating login function

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }

    return user

}
//Delete user tasks when user is removed

userSchema.pre('remove', async (next) =>{
    const user  = this
    Task.deleteMany({owner:user._id})
    next()
   
})

//hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){

        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User