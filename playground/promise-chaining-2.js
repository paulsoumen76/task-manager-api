const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5fbbfe4d01442303dcfedde0').then((result) =>{
//    console.log(result)
//    return Task.countDocuments({completed:false})
// }).then((task) =>{
//     console.log(task)
// }).catch((e) =>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id,completed) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments(completed)
    return count
}

deleteTaskAndCount('5fbbfef52831233d880a52ce',false).then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})


