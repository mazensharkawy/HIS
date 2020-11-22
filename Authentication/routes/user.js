import bcrypt from 'bcrypt'
import Router from 'express'
import Database from '../db'
import tokenMiddleWare from '../middleware/token'
import checkUser from '../middlewares/checkUser'



const router = Router()

router.post('/', tokenMiddleWare, checkUser, createUser)

async function createUser(req, res, next) {
  let { email, password, extraData } = req.body
  if (!email || !password) {
    return next({
      error: {
        input: 'One of the fields are empty',
        code: 409
      }
    })
  }
  if (password.length < 4) {
   return next({
      error: {
        password: 'Password is too short',
        code: 409
      }
    })
  }
  email = String(email).toLowerCase()
  const emailPattern = /^[a-z0-9.-_]+@[a-z]+\.[a-z]{3}$/
  const isValid = emailPattern.test(email)
  if (!isValid)
    return next({
      error: {
        email: 'Email is not in a valid format',
        code: 409
      }
    })
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds).then(hash => hash)

  const user = {
    email,
    password: hash,
    ...extraData
  }

  const doc = Database.write({ tableName: 'User', object: user })
  res.status(201).send(doc)
}

export default router
