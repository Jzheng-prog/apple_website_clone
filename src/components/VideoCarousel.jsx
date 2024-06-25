import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {

    const vidRef = useRef([])
    const vidSpanRef = useRef([])
    const vidDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedData, setLoadedData] = useState([])

    const {isEnd, isLastVideo, startPlay, videoId, isPlaying} = video;

    useEffect(()=>{
        if(loadedData.length > 3){ //end of the carousel
            if(!isPlaying){ //not playing anymore
                vidRef.current[videoId].pause(); //pause it
            }else{ //end but still playing
                startPlay && vidRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])

    useEffect(()=>{
        let currProgress = 0;
        let span = vidSpanRef.current;

        if(span[videoId]){
            let anim = gsap.to(span[videoId],{
                onUpdate:()=>{
                    const progress = Math.ceil(anim.progress() *100)
                    if(currProgress != progress){
                        currProgress = progress;
                        gsap.to(vidDivRef.current[videoId],{
                            width: window.innerWidth < 760
                            ? '10vw'
                            :window.innerWidth <1200
                                ? '10vw'
                                :'4vw'
                        })
                        gsap.to(span[videoId],{
                            width:`${currProgress}%`,
                            backgroundColor: 'white'
                        })
                    }

                },
                onComplete:()=>{
                    if(isPlaying){
                        gsap.to(vidDivRef.current[videoId],{
                            width:'12px',
                        })
                        gsap.to(span[videoId],{
                            backgroundColor:'#afafaf',
                        })
                    }
                }
            })

            if(videoId ==0){
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(vidRef.current[videoId].currentTime/ hightlightsSlides[videoId].videoDuration)
            }
            if(isPlaying){
                gsap.ticker.add(animUpdate);
            }else{
                gsap.ticker.remove(animUpdate);
            }
        }
    
    },[videoId, startPlay])

    useGSAP(()=>{
        gsap.to('#video', {
            scrollTrigger:{
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: ()=>{
                setVideo((prev)=>({
                    ...prev, startPlay:true, isPlaying:true
                }))
            }
        })

        gsap.to('#slider', {
            transform: `translateX(${-100 *videoId}%)`,
            duration:2,
            ease: 'power2.inOut'
        })

    },[isEnd, videoId])

    const handleProcess = (type, i) =>{
        switch(type){
            case 'video-end':
                console.log(type)
                setVideo((prev)=>({
                    ...prev, isEnd:true, videoId: i +1
                }))
                break;
            case 'video-last':
                console.log(type)
                setVideo((prev)=>({
                    ...prev, isLastVideo:true
                }))
                break;
            case 'video-reset':
                console.log(type)
                setVideo((prev)=>({
                    ...prev, videoId: 0, isLastVideo:false
                }))
                break;
            
            case 'play':
                console.log(type)
                setVideo((prev)=>({
                    ...prev, isPlaying: !prev.isPlaying
                }))
                break;
            case 'pause':
                console.log(type)
                setVideo((prev)=>({
                    ...prev, isPlaying: !prev.isPlaying
                }))
                break;
            default:
                return video;
        }
    }

    const handleLoadedMetaData = (index, event)=>{
        setLoadedData((prev)=>[...prev, event])
    }
    console.log(isEnd, isLastVideo, startPlay, videoId, isPlaying)

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list,i)=>(
            <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                <div className='video-carousel_container'>
                    <div className='w-ful h-full flex-center rounded-3xl overflow-hidden bg-black'>
                        <video className={`${list.id ===2 && 'translate-x-44'} pointer-events-none`}
                            id='video' playsInline={true} preload='auto' muted
                            ref={(element)=> (vidRef.current[i] = element)}
                            onPlay={()=>{
                                setVideo((currVid)=>({
                                    ...currVid, isPlaying:true
                                }))
                            }}
                            onEnded={()=>
                                i !== 3
                                ? handleProcess('video-end', i)
                                : handleProcess('video-last')
                            }
                            onLoadedMetadata={(event)=>handleLoadedMetaData(i,event)}
                        >
                            <source src={list.video} type ='video/mp4'/>
                        </video>
                    </div>
                    <div className='absolute top-12 left-[5%] z-10'>
                        {list.textLists.map((text)=>(
                            <p key={text} className='md:text-2xl text-xl font-medium'>
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
            {vidRef.current.map((_,i)=>(
                <span key={i} ref={(element)=> (vidDivRef.current[i] = element)} className='mx-2 w-3 h-3 rounded-full bg-gray-600 relative cursor-pointer'>
                    <span className='absolute h-full w-full rounded-full' ref={(element)=> (vidSpanRef.current[i] = element)}/>

                </span>
            ))}
        </div>
        <button className="control-btn">
            <img src={isLastVideo ? replayImg: !isPlaying ? playImg : pauseImg} alt={isLastVideo? 'replay': !isPlaying? 'play': 'pause'}
            onClick={isLastVideo
                ? ()=>handleProcess('video-reset')
                :!isPlaying? ()=> handleProcess('play')
                :()=> handleProcess('pause')
            } />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
