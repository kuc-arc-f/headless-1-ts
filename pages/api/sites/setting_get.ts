const ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function siteSettingGet(req, res){
  try{
    const id = req.query.id
// console.log(id);
    let where = { site_id: id }
    const item = await LibMongo.get_item("site_settings" , where ) 
//console.log(item);
    let whereSite = { _id: new ObjectID(id) }
    const site = await LibMongo.get_item("sites" , whereSite ) 
// console.log(site);
    const ret ={
      item: item, site : site
    }    
    res.json(ret);    
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
