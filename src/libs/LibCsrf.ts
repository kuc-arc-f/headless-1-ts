// LibCsrf
const csrf = require('csrf');
const tokens = new csrf();
import LibMongo from "../libs/LibMongo"

//
const LibCsrf = {
  get_token:async function(secret){
    try{
      const token = tokens.create(secret);
      const ret ={
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },
  get_token_db:async function(user_id){
    try{
      const secret = tokens.secretSync();
      const token = tokens.create(secret);
      const item = {
          value:{
            secret: secret,
            token: token,
          },
          user_id: user_id,
          created_at: new Date(),
      }
      await LibMongo.add_item("sessions" ,item )         
      const ret ={
//        id: doc.insertedId.toString(),
        id: "",
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },  
  valid_token:function(token){
    try{
        if(tokens.verify(process.env.CSRF_SECRET, token) === false){
            throw new Error('Invalid Token');
        }
        return true
    } catch (e) {
        console.log(e);
        console.log("error, csrf token");
//        req.flash('err', 'Error , csrf token');
//        res.redirect('/')
        return false
    }  

  }

}
export default LibCsrf;
