import React from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import nehaImg from '../assets/neha1.jpg'; // Strictly imports the image down so Vite bundles it automatically!

export default function Home() {
  const navigate = useNavigate();

  const goNext = () => {
    // Smooth transition
    gsap.to(".app-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => navigate("/letter")
    });
  };

  return (
    <div className="app-container">
      <div className="container" style={{ padding: "40px 30px" }}>
        {/* Picture of Neha */}
        <img 
          src={nehaImg} 
          alt="Neha" 
          onError={(e) => { e.target.style.display = 'none'; }} 
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", marginBottom: "20px", border: "4px solid white", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
        />
        <h1 className="title">Ente Dear Neha 🤍</h1>
        <p className="subtitle">Got a small message that i would like to say to you!!</p>
        <button onClick={goNext}>Open 💌</button>
      </div>
    </div>
  );
}
