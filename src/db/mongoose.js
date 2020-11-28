const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})


// const me = new User({
//     name:'   soumen',
//     email:'mIKKKKke@gmail.com',
//     password:'              rcccccccc      ',
// })

// me.save().then(() =>{
//     console.log(me)
// }).catch((error) =>{
//     console.log('Error: ',error)
// })



// const task = new Task({
//     description:'buy foods',
//     completed:true

    
// })

// task.save().then(() =>{
//     console.log(task)
// }).catch((error) =>{
//     console.log("Error: ",error)
// })

