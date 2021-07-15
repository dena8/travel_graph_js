const {userRouter,tourRouter,categoryRouter,cartRouter,orderRouter}= require('../routes/index')

module.exports= (app)=>{
    app.use('/users',userRouter);
    app.use('/tours',tourRouter);
    app.use('/categories',categoryRouter);
    app.use('/cart',cartRouter);
    app.use('/orders',orderRouter);
   
}