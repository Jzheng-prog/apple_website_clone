import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Model from './components/Model'
import * as Sentry from '@sentry/react'

const  App = ()=> {
  return (<button onClick={() => methodDoesNotExist()}>Break the world</button>);
  // return (

  //   <main className = 'bg-black'>
  //     <NavBar/>
  //     <Hero/>
  //     <Highlights/>
  //     <Model/>
  //   </main>
  
  // )
}

export default Sentry.withProfiler(App);
