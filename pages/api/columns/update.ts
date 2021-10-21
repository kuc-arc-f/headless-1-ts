const ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function update (req, res){
  try{
    const data = req.body
// console.log(data);
    const item = data
//console.log(item);
    const where = {"_id": new ObjectID( item.id )};
    const itemOne = await LibMongo.get_item("columns" , where ) 
    itemOne.values = item.colmuns_json
// console.log(itemOne);
    await LibMongo.update_item("columns" , where, itemOne )
    const url = `/content_type/${itemOne.site_id}`
//console.log( "url=",url  )       
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
