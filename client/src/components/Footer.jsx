import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <section className="d-flex flex-column flex-md-row justify-content-center my-3">

          {/* Cynthia */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/cynthiamory" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">Cynthia</span>
            </a>
          </div>

          {/* Melanie*/}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/melwang1" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">Melanie</span>
            </a>
          </div>

          {/* Muhammad */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/ThatOneMHMD" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">Muhammad</span>
            </a>
          </div>

          {/* Keegan */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/Keegan-Omel" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">Keegan</span>
            </a>
          </div>

        </section>
        <section className="footer" id="footer">
          <section className="form-footer">
            <h5 className="text-center mb-2">EventHive</h5>
            <p className="text-center mb-0">
              <h6>&copy; {new Date().getFullYear()} All rights reserved.</h6>
            </p>
          </section>
        </section>
      </div>
    </footer>
  );
};

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
