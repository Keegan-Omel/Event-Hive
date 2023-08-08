import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';

const NavBar = () => {

    //JAVASCRPIT CODE: USESTATE/ USEEFFECT/ CONST/ PROPS


  return (
    <div className="card bg-white card-rounded w-50">

        <ul>

            <li> Home </li>
            <li> Profile </li>
            <li> About </li> 
            <li> Login </li> 
            <li> Singup </li>  

        </ul>  
      
    </div>
  );
};

export default NavBar;
