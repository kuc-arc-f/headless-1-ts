const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function show (req, res){
  try{
//    console.log("id=", req.query.id);
const id = req.query.id
    const where = { _id: new ObjectID(id) }
    const item = await LibMongo.get_item("columns" , where )          
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
