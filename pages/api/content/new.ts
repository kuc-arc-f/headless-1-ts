//var ObjectID = require('mongodb').ObjectID;
//var csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function contentNew(req, res){
  try{
    const data = req.body
    //var token =data._token
//console.log( data )
    const cole_name = data.content_name
    const values = JSON.parse(data.colmuns_json || '[]')
    const item = {
      name: cole_name,
      column_id: data.column_id,
      site_id: data.site_id,
      values: values,
      user_id: "",
      created_at: new Date(),
    };    
//console.log( item )
    await LibMongo.add_item("contents" ,item )
    const url = `/content/list?site_id=${item.site_id}&column=${item.column_id}`
//    console.log( "url=",url  )
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
