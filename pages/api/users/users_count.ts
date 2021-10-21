//var ObjectID = require('mongodb').ObjectID;
//const bcrypt = require('bcrypt');
const csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function users_count (req, res) {
  try{
    const count = await LibMongo.get_count("users" , {} ) 
//console.log(count)
    res.json({count: count})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
