import React from 'react'
import './Home.css'
import Title from '../../assets/logo.png'

export const Home = () => {
  return (
    <div className='homeDesign'>
      <div className='homeContainer'>
        <div className='homeTitle'><img className='homeLogo' src={Title} alt="" /></div>
        <div className='homeSection'>
          <p>Introducing MateTraveller, the innovative web application designed to connect solo travelers
          with like-minded individuals exploring the world.</p> 
          <p>Whether you're embarking on a backpacking adventure or simply craving some company during your journey, 
          MateTraveller provides a platform where you can meet fellow travelers and forge meaningful connections along the way.</p> 
          <p>With a user-friendly interface, you can create a MateVenture or join to a existing one to anywhere in the world. </p>
          <p>From there, you can connect, chat, and plan adventures together, fostering new friendships and creating unforgettable memories. </p>
          <p>Say goodbye to lonely travels and embrace the joy of shared experiences with MateTraveller.</p>
        </div>
      </div>
    </div>
  )
}
