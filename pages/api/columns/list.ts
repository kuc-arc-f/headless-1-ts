import LibMongo from "../../../libs/LibMongo"

//
export default async function List (req, res){
  try{
//console.log( "site_id=", req.query.site_id )
    const site_id = req.query.site_id 
    const where = { site_id: site_id }
    const client = await LibMongo.get_client();
    const dbName = LibMongo.getDbName();
//console.log(dbName);
    const db = client.db(dbName);
    const collection = db.collection("columns");
    const items = await collection.find(where).sort({name: 1}).toArray()
    client.close();
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
