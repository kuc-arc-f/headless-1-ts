//var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function auth_check(req, res) {
  try{
    if (req.method === "POST") {
      const retArr: any = {ret:0, user_id:0}
      const data = req.body
// console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      }  
      const where = { mail: data.mail }
      const item = await LibMongo.get_item("users" , where )  
//console.log(item)
      if(item == null){ return res.json(retArr); }
      if (data.mail === item.mail
        && bcrypt.compareSync(data.password,  item.password )){
          //console.log("OK-auth:", data.mail)
          retArr.ret = 1
          item.password = ""
          retArr.user = item
          return res.json(retArr);
      }else{
        //console.log("NG-auth:", data.mail)
        return res.json(retArr);
      } 
    }
    return res.status(404).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
