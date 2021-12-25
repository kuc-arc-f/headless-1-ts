//var ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibContent from "../../../libs/LibContent"
//import LibApiFind from "../../../libs/LibApiFind"
//
export default async function contentSearch(req, res){
  try{
    const data = req.body
    //var token =data._token
// console.log( data )
    const column_id = data.column_id 
    const site_id = data.site_id 
    const search_key = data.search_key 
    const where = {site_id:  site_id,
      column_id: column_id,
    }
    const limit = {skip: 0 , limit: 500 }
    let items = await LibMongo.get_arrayLimit("contents" , where, limit)      
    items = LibContent.getSearchItems(items, search_key ,[] )
//console.log( items )    
const ret ={
      items: items
    }    
//console.log( ret )
    res.json(ret)
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}

