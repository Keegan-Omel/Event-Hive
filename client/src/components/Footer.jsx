import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';

const Footer = () => {

    //JAVASCRPIT CODE: USESTATE/ USEEFFECT/ CONST/ PROPS


    return (
      // FOOTER SECTION
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              {networks}
            </ul>

            <ul>
              <li>Created by EventHive</li>
            </ul>

            <ul className="copyright">
              <li>&copy; Template Inspired and Credited to Tim Baker - Copyright 2017 Tim Baker</li>
              <li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li>
            </ul>

          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
        </div>
      </footer>
    );
  }


export default Footer;