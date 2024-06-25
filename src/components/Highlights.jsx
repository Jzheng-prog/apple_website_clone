import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {

  useGSAP(()=>{
    gsap.to('.section-heading',{
      opacity:1,
      y:0,
      delay:1.5
    })
    gsap.to('.link',{
      opacity:1,
      y:0,
      delay:1.5,
      duration:1,
      stagger:0.25
    })
  },[])
  return (
    <section id ='highlights' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className="screen-max-width">
        <div className='mb-12 w-full md:flex items-end justify-between'>
          <h1 id="title" className='section-heading'>
            Get the Highlights
          </h1>
          <div className="flex flew-wrap items-end gap-5">
            <p className="link"> Watch the Film
              <img src={watchImg} alt="watch img" className='ml-2' />
            </p>
            <p className="link"> Watch the Event
              <img src={rightImg} alt="right img" className='ml-2' />
            </p>
          </div>
        </div>

        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights
