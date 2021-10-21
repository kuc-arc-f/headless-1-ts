//var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function List (req, res){
  try{
//console.log( "site_id=", req.query.site_id )
    const site_id = req.query.site_id 
    const where = { site_id: site_id }
    const items = await LibMongo.get_arrayWhere("columns" , where)
// console.log(items)
    const ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
