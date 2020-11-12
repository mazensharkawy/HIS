const userResponses = {
  AccessDenied: {
    message: 'accessDenied',
    code: 403
  },
  TokenCreated: {
    data: {},
    token: ''
  },
  User: {
    _id: '',
    username: '',
    email: '',
    extraData: {},
    token: ''
  },
  UsersList: [] // Array<User>
}

export default (req, res, next) => {
  if (req.User !== null) {
    next()
  } else {
    const AccessDenied = userResponses.AccessDenied
    next({
      error: {
        accessDenied: AccessDenied.message,
        code: AccessDenied.code
      }
    })
  }
}
