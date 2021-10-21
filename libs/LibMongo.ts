// LibMongo
const MongoClient = require('mongodb').MongoClient;

//
// export default const LibMongo = {
const LibMongo = {
  init:function(){
    this.dbName = process.env.MONGODB_DB_NAME
    this.url = process.env.MONGODB_URL
  },
  get_client:async function(){
    try{
      this.init()
      let client = await MongoClient.connect(this.url);
      return client
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_client');
    }
  },   
  get_array: async function(collectionName ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find({}).sort({created_at: -1}).toArray()
      client.close();
      return items
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },
  get_arrayWhere: async function(collectionName , where){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find(where).sort({created_at: -1}).toArray()
      client.close();
      return items
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },
  get_arrayLimit: async function(collectionName , where, limit){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find(where, limit).sort({created_at: -1}).toArray()
      client.close();
      return items
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },
  get_item: async function(collectionName , where ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const item = await collection.findOne(where) 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_item');
    }
  },
  add_item: async function(collectionName ,item ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.insertOne(item); 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, add_item');
    }
  }, 
  update_item: async function(collectionName , where, item ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.updateOne(where, { $set: item })
      client.close();
    } catch (err) {
      console.log(err);
      throw new Error('Error, update_item');
    }
  }, 
  delete_item: async function(collectionName , where ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.deleteOne(where)   
      client.close();
    } catch (err) {
      console.log(err);
      throw new Error('Error, delete_item');
    }
  },
  get_count: async function(collectionName , where){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const ret = await collection.find(where).count()
      client.close();
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },

}
export default LibMongo;
