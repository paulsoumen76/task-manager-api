
//CRUD operation

const {MongoClient, ObjectId, ObjectID} = require('mongodb')

const databaseName = 'task-manager'

MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser : true},(error,client) =>{

    if(error){
        return console.log("unable to connect to database!")
    }
    
    console.log("connected successfully!")
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name:'soumen',
    //     age:26
    // },(error,result) =>{
       
    //     if(error){
    //         return console.log("unable to insert user")
    //     }

    //     console.log(result.ops)

    // })
//     db.collection('users').insertMany([{
//         name:'deep',
//         age:25
//     },{
//         nae:'arnab',
//         age:'27'

//     }
// ],(error,result) =>{
       
//         if(error){
//             return console.log("unable to insert user")
//         }

//         console.log(result.ops)

//     })
// db.collection('tasks').insertMany([{
//     description:'post a blog',
//     completed:false
// },{
//     description:'make tea',
//     completed:false
// },{
//     description:'gossip',
//     completed:true
// }
// ],(error,result) =>{
   
//     if(error){
//         return console.log("unable to insert user")
//     }

//     console.log(result.ops)

// })
//  db.collection('tasks').findOne({_id: new ObjectId("5fba9b46514bbb43cc38779d")},(error,task) =>{
//     if(error){
//         return console.log("unable to fetch task!")
//     }    
    
//     console.log(task)
//  })
//  db.collection('tasks').find({completed:false}).count((error,tasks) => {

//     console.log(tasks)

//  })

// db.collection('tasks').updateOne({
//     _id:new ObjectId("5fba9b46514bbb43cc38779c")
// },{
//     $set:{
//         task:"make coffe"
//     }
// }).then((error) =>{
//     console.log(error)
// }).catch((result) =>{
//     console.log(result)
// })
db.collection('tasks').deleteOne({
    description:"make tea"
}).then((error) =>{
    console.log(error)
}).catch((result) =>{
    console.log(result)
})

//deletMany is also same like deleteOne

})
