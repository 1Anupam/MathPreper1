import { Fragment } from "react";
import  "./Info.css";

const Info = props => {
    return <Fragment>
        <section id="home-info" className="bg-dark">
      <div className="info-img"></div>
      <div className="info-content">
         <h2><span className="text-primary h2">The Mission</span> Of MathPrepper</h2>
         <p className="p">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, at animi! Quaerat nobis perferendis repellendus autem corporis. Ipsam quibusdam amet ipsa, laboriosam aperiam, natus, pariatur consequatur voluptates adipisci sapiente possimus ea dignissimos consectetur sunt nesciunt tempore debitis illum non dolore!</p>
         <a href="#" className="btn btn-light a">Sign In</a>
      </div>
   </section>

   <section id="features">
      <div className="box bg-light">
         
         <h3 className="h3">Number 1 Tool for students </h3>
         <p className="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit?</p>
      </div>
      <div className="box bg-primary">
         
         <h3 className="h3">Number 1 Tool for teachers</h3>
         <p className="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit?</p>
      </div>
      <div className="box bg-light">
         
         <h3 className="h3">Number 1 Tool for education</h3>
         <p className="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit?</p>
      </div>
   </section>

   <div className="clr"></div>

   <footer id="main-footer">
      <p>MathPrepper &copy; 2022, All Rights Reserved</p>
   </footer>

    
    </Fragment>
};
  

export default Info;