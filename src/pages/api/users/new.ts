//var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
//
export default async function userNew(req, res){
  try{
    const data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    const item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }    
//console.log(item);
    await LibMongo.add_item("users" ,item )
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
