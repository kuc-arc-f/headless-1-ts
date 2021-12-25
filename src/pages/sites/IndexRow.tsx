import Link from 'next/link';

const IndexRow = props => (
  <tr>
    <td>
      <h3>
      <Link href={`/content/list?site_id=${props.id}`}>
        <a>{props.name}</a>
      </Link>
      </h3>
      {props.content}<br />
      {props.date} , ID: {props.id}
    </td>
    <td>
      <Link href={`/content/list?site_id=${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-primary"> Open </a>
      </Link>
      <Link href={`/content_type/${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-primary"> ContentType</a>
      </Link><br />
      <Link href={`/sites/setting/${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-dark mt-2"> 
          <i className="fas fa-cog"></i> Site Setting
        </a>
      </Link>      
      <Link href={`/sites/edit/${props.id}`}>
        <a className="btn btn-sm ml-2 mt-2 btn-outline-dark"> Edit </a>
      </Link>

    </td>
  </tr>
);
export default IndexRow;
