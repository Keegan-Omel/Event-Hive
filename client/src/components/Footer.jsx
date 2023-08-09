import React from 'react';
import '../assets/css/Footer.css'; 

function Footer() {
  return <footer> &copy; 2023 EventHive </footer>;
}

export default Footer;



// FIX: THIS IS how it should be:

// import React from 'react'
// import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
// // import { useQuery } from '@apollo/client';
// // import { QUERY_MATCHUPS } from '../utils/queries';

// const Footer = () => {
//   return (

//     // each icon is linked to a corresponding profile! (target blank indicates opening the link on a new tab/page)
//     <footer className="portfolio-footer">
//       <div className="social-icons">
//         <a href="https://github.com/cynthiamory/EventHive.git" target="_blank">
//           <FaGithub />
//         </a>
//         <a href="https://www.linkedin.com" target="_blank">
//           <FaLinkedin />
//         </a>
//         <a href="https://stackoverflow.com" target="_blank">
//           <FaStackOverflow />
//         </a>
//       </div>

//       <div className='footer-bottom-text'>
//         <ul>
//           <li>Created by EventHive</li>
//         </ul>
//       </div>
//     </footer>

//   )
// };


// export default Footer;
