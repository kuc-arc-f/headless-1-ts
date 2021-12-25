import LibMongo from "../../../libs/LibMongo"
//import LibApiFind from "../../../libs/LibApiFind"

//
export default async function getCount (req, res){
  try{
//console.log(req.query );
    const content_name = req.query.content;
    const site_id = req.query.site_id
    const where ={site_id: site_id,
      name: content_name
    }
    const ret = await LibMongo.get_count("contents" , where)
//console.log(ret);
    res.json({count : ret });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}

