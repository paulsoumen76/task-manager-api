const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')

const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(doc|docx)/)){
            return callback(new Error("Please upload a WORD document"))
        }
        callback(undefined,true)
    }
})

app.post('/upload', upload.single('upload'), (req,res) =>{
    res.send()
})




// app.use((req,res,next) =>{
//     if(req.method ==='GET'){
//         res.send("GET is disabled")
//     }
//     else{
//         next()
//     }
// })

// app.use((req,res,next) =>{

//     res.status(503).send("Server is under maintainence")
   
// })

app.use(express.json())//automatically parse json to object
app.use(userRouter)
app.use(taskRouter)

app.listen(port,() =>{
    console.log("Server is running on " + port)
})

const main = async () =>{
//    const task = await Task.findById('5fbf287eaba90963a8a7fe81')
//    await task.populate('owner').execPopulate()
//    console.log(task.owner)
      const user = await User.findById('5fc12b0841d1945b60e45696')
      await user.populate('tasks').execPopulate()
      
}
main()

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

// const myFunction = async () =>{
//     const password = 'red123!'    
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(password,hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

const jwt = require('jsonwebtoken')
const { findById } = require('./models/user')

// const myFunction = async () =>{

//     const token = jwt.sign({_id:'abc123'},'thisisme',{expiresIn:'7 days'})
//     const data = jwt.verify(token,'thisisme')
//     console.log(data)
    
// }
// myFunction()