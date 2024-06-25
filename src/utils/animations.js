const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) =>{

    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(firstTarget, {
        ...animationProps,
        ease: 'power2.inOut'
    }, '<') // insert animation at the start of previous animation

    timeline.to(secondTarget, {
        ...animationProps,
        ease: 'power2.inOut'
    }, '<')


};

export default animateWithGsapTimeline;