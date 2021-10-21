const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function getFindone (req, res){
  try{
//console.log(req.query );
    const id = req.query.id;
    const where = { _id: new ObjectID(id) }
    let item = await LibMongo.get_item("contents" , where ) 
    item = LibApiFind.convertItemOne(item)
//console.log(item);
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
