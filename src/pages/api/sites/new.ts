//var ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
const tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function siteNew (req, res){
  try{
//console.log(req.body);
const data = req.body
const token =data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    let item: any = {
      name: data.name ,  
      content: data.content ,
      user_id: "",
      created_at: new Date(),
    };
    item = await LibMongo.add_item("sites" ,item )
// console.log("id=", item._id.toString() , typeof(item._id) )
//console.log(item)       //
    const key = LibSite.get_apikey()
    let itemKey ={
      site_id: item._id.toString(),
      key: key,
      user_id: "",
      created_at: new Date(),
    }
    itemKey = await LibMongo.add_item("apikeys" ,itemKey )
//console.log(itemKey)   
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
