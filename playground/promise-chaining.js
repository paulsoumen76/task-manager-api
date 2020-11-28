const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5fbbe0d9968d0b2b1cdf07ca',{age:1}).then((user) =>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((count) =>{
//     console.log(count)
// }).catch((e) =>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age) =>{
   const user = await User.findByIdAndUpdate(id,{age})
   const count = await User.countDocuments({age})
   return count
}

updateAgeAndCount('5fbbe5a0e9d79a1ea0b3ba28',26).then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})