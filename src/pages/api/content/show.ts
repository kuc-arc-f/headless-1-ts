const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function contentShow (req, res){
  try{
//console.log("apiShow.query=", req.query);
    const id = req.query.id
    const where = { _id: new ObjectID(id) }
    const item = await LibMongo.get_item("contents" , where )           
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
