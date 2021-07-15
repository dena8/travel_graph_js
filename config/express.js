const express = require('express');
const cors = require('cors');
const isAuth=require('../middleware/isAuthentication');

module.exports = (app) => {

  app.use(cors());
  app.options('*', cors());   

  app.use(express.json());
  app.use(express.urlencoded({extended:true}));  

  app.use(isAuth());
};




