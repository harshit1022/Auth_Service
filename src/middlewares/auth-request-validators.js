const validateUserAuth = (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      err: 'Email or Password Not Entered',
      data: {},
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  validateUserAuth
}