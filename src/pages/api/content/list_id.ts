const ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibPagenate from "../../../libs/LibPagenate"

//
export default  async function ListId (req, res){
  try{
// console.log("q=", req.query)
    const id = req.query.id
    const page = req.query.page
    LibPagenate.init();
    const page_info = LibPagenate.get_page_start(page);
// console.log(page_info) 
const limit = {skip: page_info.start , limit: page_info.limit }
const where = {site_id:  req.query.site_id ,
      column_id: id,
    }
    const items = await LibMongo.get_arrayLimit("contents" , where, limit)  
    const ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
