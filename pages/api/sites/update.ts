const ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
const tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function siteUpdate (req, res){
  try{
    const data = req.body
//console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    const id = data.id
    const where = {"_id": new ObjectID( id )};
    const itemOne = await LibMongo.get_item("sites" , where ) 
    itemOne.name = data.name
    itemOne.content = data.content
//console.log(itemOne);
    await LibMongo.update_item("sites" , where, itemOne )
//console.log(id);
    const ret ={
      item: itemOne
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
