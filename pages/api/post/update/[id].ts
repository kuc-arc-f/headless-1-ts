//import Head from 'next/head'
//import React from 'react'
//import Link from 'next/link';
const ObjectID = require('mongodb').ObjectID;

import LibMongo from "../../../../libs/LibMongo"
import LibApiCreate from "../../../../libs/LibApiCreate"
//
export default async function postUpdate(req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const content_name = req.query.id
    const apikey = req.headers.apikey
    const data = req.body
//console.log( data )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    const where = { key:  apikey }
    const key = await LibMongo.get_item("apikeys" , where ) 
    if(key === null){ throw new Error('Invalid key , apikeys') }
//console.log( "site_id=", key.site_id )
    const site_id = key.site_id
    const whereColumn = {
      site_id:  site_id, name: content_name,
    }
    const id = data.id
//console.log( "id=", id  )  
    const column = await LibMongo.get_item("columns" , whereColumn )   
    //console.log(column)  
    const coluValues = JSON.parse(column.values || '[]')
    const newData = LibApiCreate.valid_post(data, coluValues)
    const whereContent = { "_id": new ObjectID( id ) };
    const content = await LibMongo.get_item("contents" , whereContent ) 
    content.values = newData
//console.log( content )
    await LibMongo.update_item("contents" , whereContent, content )
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
