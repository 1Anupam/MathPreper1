import { Fragment } from "react";
import  "./Info.css";

const Info = props => {
    return <Fragment>
        <section id="home-info" className="bg-dark">
      <div className="info-img"></div>
      <div className="info-content">
         <h2><span className="text-primary h2">The Mission</span> Of MathPrepper</h2>
         <p className="p">Introducing our innovative math problem generation software, designed to empower educators, students, and enthusiasts alike. With our user-friendly platform, you can effortlessly create a vast array of math problems inspired by existing ones, revolutionizing the way math is taught and learned. Quickly adapt, modify, and customize math challenges to suit your unique needs, ensuring an engaging and tailored learning experience. Whether you're a teacher looking to diversify your curriculum, a student seeking extra practice, or a math enthusiast craving intellectual stimulation, our software is your key to unlocking limitless mathematical possibilities, all at your fingertips. Join us in transforming the world of math education with the click of a button.</p>
         <a href="#" className="btn btn-light a">Sign In</a>
      </div>
   </section>

   <section id="features">
      <div className="box bg-light">
         
         <h3 className="h3">Number 1 Tool for students </h3>
         <p className="p">Students benefit from this software by gaining access to a virtually endless supply of math problems, fostering deeper understanding and mastery of mathematical concepts while enjoying a diverse and engaging learning experience.</p>
      </div>
      <div className="box bg-primary">
         
         <h3 className="h3">Number 1 Tool for teachers</h3>
         <p className="p">For teachers, our math problem generation software streamlines lesson planning and assessment, enabling them to effortlessly create customized assignments, quizzes, and tests tailored to their students' needs while saving valuable time.</p>
      </div>
      <div className="box bg-light">
         
         <h3 className="h3">Number 1 Tool for education</h3>
         <p className="p">This software enriches education by offering a versatile and efficient tool for educators and students to enhance learning outcomes, adapt to diverse teaching needs, and promote a deeper understanding of mathematics, elevating the quality of education in math-related fields.</p>
      </div>
   </section>

   <div className="clr"></div>

   <footer id="main-footer">
      <p>MathPrepper &copy; 2022, All Rights Reserved</p>
   </footer>

    
    </Fragment>
};
  

export default Info;