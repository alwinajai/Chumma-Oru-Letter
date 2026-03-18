import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const messageText = `Hey ❤️

You might think I’m just saying all this every day to impress you…
but I really mean every word.

Even though we’re far apart and can’t meet every day,
talking to you somehow makes all my days feel better than they usually are.

The way you are…
the way you understand me…
the way you just *get me*…

It all means more than you probably realize.
Just be yourself—that’s already more than enough for me.

And I just want you to know this honestly…
I’ve fallen for you, badly.

This is something small,
but it comes straight from my heart 💌
And by the way

I LOVE YOUUU ❤️(Appo Sheri Bye The Byee)`;

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef(null);
  const typeTimeoutRef = useRef(null);

  useEffect(() => {
    // Fade in on mount
    gsap.fromTo(".app-container", { opacity: 0 }, { opacity: 1, duration: 0.8 });
    return () => clearTimeout(typeTimeoutRef.current);
  }, []);

  const openLetter = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();

    tl.to(".flap", {
      rotateX: -170,
      duration: 0.8,
      ease: "power3.out"
    })
    // 1. Slide letter completely out of the envelope
    .to(".letter", {
      y: -250,
      duration: 0.6,
      ease: "power2.out"
    })
    // 2. Bring letter to front
    .set(".letter", { zIndex: 10 })
    // 3. Move it down securely, widen the paper out horizontally, and let height automatically expand
    .to(".letter", {
      y: -140, // keep high enough
      left: "-15%", // expand to the left
      width: "130%", // expand the width horizontally so the writing adjusts
      height: "auto", // Automatically expands to fit however much text is added!
      minHeight: 350,
      scale: 1, // Remove extra scale so the text isn't massive, allowing it to stretch horizontally smoothly
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => typeWriter(0) 
    })
    // 4. Fade out the open button gracefully so it's entirely gone
    .to(".buttons", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.4,
      ease: "power2.out"
    }, "<"); // Run at the same exact time
  };

  const typeWriter = (i) => {
    if (i < messageText.length && textRef.current) {
      textRef.current.innerHTML = messageText.substring(0, i + 1).replace(/\n/g, '<br/>');
      typeTimeoutRef.current = setTimeout(() => typeWriter(i + 1), 25);
    }
  };

  return (
    <div className="app-container">
      <div className="container" style={{ padding: "50px 30px" }}>
        <div className="envelope">
          <div className="flap"></div>
          <div className="letter">
            <p ref={textRef} style={{ margin: 0 }}></p>
          </div>
        </div>

        <div className="buttons" style={{ position: 'relative', zIndex: 20, marginTop: '80px', transition: 'opacity 0.5s' }}>
          <button onClick={openLetter}>Open 💌</button>
        </div>
      </div>
    </div>
  );
}
