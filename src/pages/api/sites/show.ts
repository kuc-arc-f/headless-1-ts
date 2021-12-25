const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function siteShow(req, res){
  try{
//    console.log("id=", req.query.id);
    const id = req.query.id
    const where = { _id: new ObjectID(id) }
    const item = await LibMongo.get_item("sites" , where ) 
    //
    const whereKey = { site_id: id }
    const itemKey = await LibMongo.get_item("apikeys" , whereKey )           
    const ret ={
      item: item,
      apikey : itemKey,
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
