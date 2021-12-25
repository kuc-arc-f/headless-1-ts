//var ObjectID = require('mongodb').ObjectID;
const csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function siteSettingSave (req, res){
  try{
    const data = req.body
// console.log(data);
const webhook_url =  data.url
const item = {
      webhook_url: webhook_url, 
      site_id : data.site_id, 
      user_id: "",
      created_at: new Date(),
    };    
    const where = {site_id:  data.site_id}
    const itemOne = await LibMongo.get_item("site_settings" , where ) 
    if(itemOne != null ){
//console.log(itemOne);
      itemOne.webhook_url = webhook_url
      await LibMongo.update_item("site_settings" , where, itemOne )
    }else{
      await LibMongo.add_item("site_settings" ,item )
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
