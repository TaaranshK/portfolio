import React, { useRef, useEffect } from "react";

function Particlesbackground() {

  const canvasRef = useRef(null);

  //Creating Our Hook
  useEffect(() => {
    const canvas = canvasRef.current;
    //To Draw On a Canvas we Use .getContext
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,0,0.7)"]; // Fixed missing comma

    //Abb hum Particles ko define karenge matlab
    //Unka Radius, Color, speed shape kya hoga sare proprties consier karenge
    // so ek class Create Karte hai
    class Particle {
      constructor(){
        //Defining The Properties 
        //x-> Particle on horizontal axis
        //y-> Particle On verticle axis
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        //This Line Defines THe size OF the Particle (like particle size ranges btw (1px-3px))
        this.radius = Math.random()*2+1;
        //It Basically Loops The Colors Array ( and Picks Any Random Color from The Array)
        this.color = colors[Math.floor(Math.random()*colors.length)];
        //Speed of the Particle
        this.speedX =(Math.random() - 0.5)*0.5 ;
        this.speedY =(Math.random() - 0.5)*0.5 ;
      }

      //Drawing The Particles
      draw() {
        ctx.beginPath();
        //We want our Particles to Be in Circular Shape
        ctx.arc(this.x, this.y,this.radius,0,Math.PI*2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;   // FIXED shadowcolor → shadowColor
        ctx.fillStyle = this.color;     // FIXED fillstyle → fillStyle
        //Fill The Canvas
        ctx.fill();
      }

      //Moving THe Particles
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        //We need To Create a Wrap_Around Effect
        //Like if Our Particle IS going of our screen Then Its Coming Back again
        //Particle Going Out From left Side

        if(this.x <0 )  this.x = canvas.width;
        if(this.x > canvas.width) this.x = 0;
        //Now For Verticle Axis As well
        if(this.y <0 )  this.y = canvas.height;
        if(this.y > canvas.height) this.y = 0;   // FIXED wrong axis

        //Calling the Draw method To Draw the PArticle On new Positions
        this.draw();
      }
    }

    function createParticles() {
      particles = [];
      for(let i = 0; i < particleCount; i++) {
        particles.push(new Particle());  // FIXED Particle() casing
      }
    }

    //This Function maintain Canvas Height and width according to The Window Innerwidth and height
    function handleResize() {
      canvas.width = window.innerWidth;   // FIXED innerwidth → innerWidth
      canvas.height = window.innerHeight;
      //When-When The Canvas or window size Changes The particles Are recreated
      createParticles();
    }

    handleResize();

    //So jab Bhi apni window ka resize Hoga handleResize Fxn Call hoga
    window.addEventListener("resize", handleResize);

    let animationId;
    //Our Animation Is Going Frame-By-frame so we Want when we goto new Frame
    //Our Previous Animations gets Cleared
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      //Stops Animation To avoid Memory Leaks
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" // FIXED classname → className
    ></canvas>
  );
}

export default Particlesbackground;
