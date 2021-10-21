
//
const LibContentType = {
  valid_form :function(formData){
    try {
      let ret = false
      let content_name = formData.get( "content_name" )
console.log( content_name)
      if(content_name == ""){
          alert("Error, content_name is required.")
          return ret
      }
      return true
    } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
        throw new Error('Error , get_show_item');
    }          
  },
  validContentName :function(items , content_name){
    try {
      let ret = true
      items.forEach(function(item){
console.log("name=", item.name , content_name);
        if(item.name === content_name){
          ret = false
          alert("Error, content_name is already exist")
        }
      });
      return ret
    } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
      throw new Error('Error , get_show_item');
    }          
  },         
  func1 :async function(){
  },
}
export default LibContentType;
