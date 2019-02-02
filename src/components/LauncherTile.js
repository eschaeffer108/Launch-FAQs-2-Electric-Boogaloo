import React from 'react';
import {Link} from 'react-router';


const LauncherTile = props => {
  return(
    <div className="launcher">
      <li>
        <Link to={`/launchers/${props.id}`}><h3>{props.name}</h3></Link>
      </li>
    </div>
  )
}

export default LauncherTile;
