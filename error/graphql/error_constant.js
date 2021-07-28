const errorName = {
      NOTFOUND:'NOTFOUND',
      CREDENTIALS_ERROR:'CREDENTIALS_ERROR',
      UNAUTHORIZED:'UNAUTHORIZED',
      CATEGORY_NOT_EXIST:'CATEGORY_NOT_EXIST'
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
    },
    CATEGORY_NOT_EXIST:{
        message:'Category not exist. Please create',
        statusCode:404
    }   

}

module.exports ={
    errorName,
    errorType
}