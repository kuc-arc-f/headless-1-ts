//import Head from 'next/head'
//import React from 'react'
//import Link from 'next/link';
const ObjectID = require('mongodb').ObjectID;

import LibMongo from "../../../../libs/LibMongo"
//
export default async function postDelete (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
//    var content_name = req.query.id
    const apikey = req.headers.apikey
    const data = req.body
//    var token =data._token
//console.log( "key=", apikey )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    const id = data.id
//console.log( "id=", id  )
    const where = { key:  apikey }
    const key = await LibMongo.get_item("apikeys" , where ) 
    if(key == null){ throw new Error('Invalid key , apikeys') }
//console.log( "site_id=", key.site_id )
    const whereContent = { "_id": new ObjectID( id ) };
    await LibMongo.delete_item("contents" , whereContent )
//console.log(itemOne); 
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
