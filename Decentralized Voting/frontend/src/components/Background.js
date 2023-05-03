import React from 'react';
import './Background.css';
import video from '../assets/background.mp4';

function Background() {
  return (
    <div className="background-video">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
export default Background;
