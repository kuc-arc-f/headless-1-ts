//var csrf = require('csrf');
//var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function columunNew (req, res){
  try{
//console.log(req.body);
    const data = req.body
//    var token =data._token
//console.log(data)
    const item = {
      name: data.content_name ,  
      values: data.colmuns_json,
      user_id: "",
      site_id: data.site_id,
      created_at: new Date(),
    };
console.log(item)
    await LibMongo.add_item("columns" ,item ) 
    const url = "/content_type/" + data.site_id
    if (res) {
//      res.writeHead(302, { Location: '/sites' });
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
