import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import keys from '../keys'
import checkUser from '../middleware/checkUser'
import token from '../middleware/token'
import Database from '../db'

const router = Router()

router.post('/', loginUser)
router.get('/', token, checkUser, (req, res) => {
  res.status(200).send(req.User)
})

async function loginUser(req, res, next) {
  var { email, password } = req.body

  if (!email || !password) {
    next({
      error: {
        input: 'One or more fields are empty',
        code: 409
      }
    })
  }

  if (password.length < 4) {
    next({
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
    next({
      error: {
        email: 'Email is not in a valid format',
        code: 409
      }
    })
  const user = await Database.read({
    tableName: 'User',
    query: { email }
  })

  if (!user || user.length === 0) {
    return next({
      error: {
        user: 'Wrong Email or Password',
        code: 409
      }
    })
  }

  bcrypt.compare(password, user[0].password).then(function (isMatching) {
    if (isMatching) {
      const payload = {
        id: user[0]._id,
        email: user[0].email,
        data: user[0].extraData
      }
      const token = jwt.sign(payload, keys.privateKey, { expiresIn: "24h" })

      res.status(201).send({
        payload,
        token
      })
    } else {
      next({
        error: {
          user: 'Wrong Email or Password',
          code: 409
        }
      })
    }
  })
}

export default router
