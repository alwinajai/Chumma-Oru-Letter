import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeartsBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear in case of re-mount
    containerRef.current.innerHTML = '';
    
    // Brown and Cherry Red theme colors (Cherry, Maroon, Sienna, White, IndianRed)
    const colors = ['#8B0000', '#D2691E', '#CD5C5C', '#A0522D', '#FFFFFF'];
    
    // Create 35 hearts
    for (let i = 0; i < 35; i++) {
      createSingleHeart(containerRef.current, colors);
    }
  }, []);

  const createSingleHeart = (container, colors) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.style.position = 'absolute';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 1.5 + 0.5; 
    
    heart.style.color = color;
    heart.style.fontSize = `${size}rem`;
    heart.style.opacity = 0; 
    heart.style.pointerEvents = 'none';
    
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    
    container.appendChild(heart);
    animateHeart(heart, container, colors);
  };

  const animateHeart = (heart, container, colors) => {
    const duration = Math.random() * 4 + 4; 
    const swayX = (Math.random() - 0.5) * 80; 
    const swayY = (Math.random() - 0.5) * 80; 
    const rot = (Math.random() - 0.5) * 60;
    const scaleTo = Math.random() * 0.5 + 1;

    gsap.to(heart, {
      opacity: Math.random() * 0.5 + 0.2, // soft fading
      scale: scaleTo,
      x: swayX,
      y: swayY,
      rotation: rot,
      duration: duration / 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Only restart if still attached
        if (!heart.parentNode) return;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
        gsap.set(heart, {x: 0, y: 0, rotation: 0, scale: 1});
        animateHeart(heart, container, colors);
      }
    });
  };

  return <div className="hearts-container" ref={containerRef}></div>;
}
