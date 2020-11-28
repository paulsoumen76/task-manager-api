const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')
const sharp =require('sharp')
const router = new express.Router()

// app.post('/users',(req,res) =>{

//     const user = new User(req.body)
//     user.save().then(() =>{
//         res.status(201).send(user)
//     }).catch((e) =>{
        
//         res.status(400).send(e)
//     })
// })


router.post('/users', async (req,res) =>{

    const user = new User(req.body)
    try{
       await user.save()
       sendWelcomeEmail(user.name, user.email)
       const token = user.generateAuthToken()
       res.status(201).send({user,token})

    }catch(e){
       res.status(400).send(e)
    }
})



router.post('/users/login',async (req,res) =>{
    try{
       const user = await User.findByCredentials(req.body.email,req.body.password)
       const token = await user.generateAuthToken()
       res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth , async (req,res) =>{
  try{
      req.user.tokens = req.user.tokens.filter((token) =>{
          return token.token !== req.token
      })

      await req.user.save()
      res.send("successfully logout!")

  }catch(e){
      res.status(500).send()
  }
})

router.post('/users/logoutAll', auth , async (req,res) =>{
    try{
        req.user.tokens = []
  
        await req.user.save()
        res.send("Please login")
  
    }catch(e){
        res.status(500).send()
    }
  })

// app.get('/users',(req,res) =>{
//     User.find({}).then((users) =>{
//         res.send(users)
//     }).catch((e) =>{
//         res.status(500).send(e)
//     })
// })
router.get('/users/me', auth , async (req,res) =>{
   res.send(req.user)
})

const profile = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            callback(new Error("Please upload an image file"))
        }
        callback(undefined,true)
    }
})

router.post('/users/me/avatar', auth, profile.single('avatar'), async (req,res) =>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
   
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({error:error.message})
})

router.get('/users/:id/avatar', async (req,res) =>{
    try{
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar){
        throw new Error()
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
} catch(e){
    res.status(404).send()
}

})

router.delete('/users/me/avatar', auth, async (req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// app.get('/users/:id',(req,res) =>{
//     const _id = req.params.id
//     console.log(req.params)
//     User.findById(_id).then((user) =>{
//         console.log(user)
//         if(!user){
//             return res.status(404).send()
//         }        
//         res.send(user)
//     }).catch((e) =>{
//         res.status(400).send(e)
//     })
// })

// router.get('/users/:id',async (req,res) =>{
//     const _id = req.params.id
//     try{
//        const user = await User.findById(_id)
//        if(!user){
//            return res.status(404).send()
//        }

//        res.send(user)
//     }catch(e){
//        res.status(500).send(e)
//     }
// })

// router.patch('/users/:id', async (req,res) =>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','age','email','password']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
//     if(!isValidOperation){
//         return res.status(400).send({error : "invalid updates!"})
//     }
    
//     try{

//        const user = await User.findById(req.params.id) 
//        updates.forEach((update) => user[update] = req.body[update])
//        await user.save()
//     //   const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
//        if(!user){
//           res.status(404).send()
//       }

//       res.send(user)
//     } catch(e){
//       res.status(400).send(e)
//     }
// })

router.patch('/users/me', auth, async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({error : "invalid updates!"})
    }
    
    try{
       updates.forEach((update) => req.user[update] = req.body[update])
       await req.user.save()
       res.send(req.user)
    }  catch(e){
       res.status(400).send(e)
    }
})


router.delete('/users/me', auth,  async (req,res) => {
    try{       
        await req.user.remove()
        sendCancelationEmail(req.user.name, req.user.email)
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})

// router.delete('/users/:id',async (req,res) => {
//     const user = await User.findByIdAndDelete(req.params.id)
//     try{
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send()
//     }
// })

module.exports = router