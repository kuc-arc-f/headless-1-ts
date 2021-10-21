// LibCookie
import moment from 'moment'
//
const LibCookie = {
  set_cookie: function(key, value){
    try{
      const dt = moment().add(10, 'year').toDate().toUTCString()
//      console.log( dt );
      document.cookie = `${key}=${value}; path=/; expires=${dt}`;
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },
}
export default LibCookie;