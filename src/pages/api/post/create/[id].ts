import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibMongo from "../../../../libs/LibMongo"
import LibApiCreate from "../../../../libs/LibApiCreate"
//
export default async function Page(req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const content_name = req.query.id
    const apikey = req.headers.apikey
    const data = req.body
//    var token =data._token
//console.log( "content_name=", content_name )
//console.log( data )
    const where = { key:  apikey }
    const key = await LibMongo.get_item("apikeys" , where ) 
    if(key == null){ throw new Error('Invalid key , apikeys') }
    const site_id = key.site_id
// console.log( "site_id=", key.site_id )
    const whereColumn = {
      site_id:  site_id, name: content_name,
    }
    const column = await LibMongo.get_item("columns" , whereColumn ) 
    const coluValues = JSON.parse(column.values || '[]')
//console.log( column )
    const newData = LibApiCreate.valid_post(data, coluValues)
    const item = {
      name: content_name,
      column_id: column._id.toString(),
      site_id: site_id,
      values: newData,
      user_id: "",
      created_at: new Date(),
    };
//console.log( item )
    await LibMongo.add_item("contents" ,item )
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
