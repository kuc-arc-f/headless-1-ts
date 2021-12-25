// LibApiCreate

//
const LibApiCreate = {
  valid_post: function(data, coluValues){
    const ret =[]
    coluValues.forEach(function(item){
      if(item.name !=""){
//        console.log("name=" ,item.name)
        let d = Object.keys(data).indexOf(item.name)
        if(d !== -1){
//          ret[item.name] = data[item.name]
          let row:any ={
            name: item.name, value: data[item.name]
          }
          ret.push( row )
//          console.log("name=" ,item.name, data[item.name] )
        }        
      }
    })
    return ret
  },

}
export default LibApiCreate;

