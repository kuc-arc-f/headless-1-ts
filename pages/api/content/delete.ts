const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function contentDelete (req, res){
  try{
    const data = req.body
    const id = data.id
//console.log(data);
const where = { "_id": new ObjectID( id ) };
//console.log(itemOne); 
    await LibMongo.delete_item("contents" , where )   
//console.log(url);
    const ret ={
      id: id
    } 
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
