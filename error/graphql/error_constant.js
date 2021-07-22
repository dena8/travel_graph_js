const errorName = {
      NOTFOUND:'NOTFOUND',
      CREDENTIALS_ERROR:'CREDENTIALS_ERROR',
      UNAUTHORIZED:'UNAUTHORIZED'
}

const errorType ={
    NOTFOUND:{
        message:'Not found',
        statusCode:404
    },
    CREDENTIALS_ERROR:{
        message:'Invalid credentials',
        statusCode: 401
    },
    UNAUTHORIZED:{
        message:'Unauthorized',
        statusCode: 401
    }   

}

module.exports ={
    errorName,
    errorType
}