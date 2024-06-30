import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Model from './components/Model'
import Features from './components/Features'
import * as Sentry from '@sentry/react'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

const  App = ()=> {
  // return (<button onClick={() => methodDoesNotExist()}>Break the world</button>);
  return (

    <main className = 'bg-black'>
      <NavBar/>
      <Hero/>
      <Highlights/>
      <Model/>
      <Features/>
      <HowItWorks/>
      <Footer/>
    </main>
  
  )
}

export default Sentry.withProfiler(App);
