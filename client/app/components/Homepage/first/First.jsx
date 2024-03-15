"use client"

import { useState, useEffect } from "react";
import { imageArray } from './images'
import "./first.css";

export default function First() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentImgIndex((currentImgIndex + 1) % imageArray.length)
    }, 5000)

    return () => clearInterval(rotate)
  }, [currentImgIndex])

  return (
    <div>
      <div className="homepage">
        {imageArray.map((img, index) => (
          <div key={index}>
            <img
              className={`images ${index === currentImgIndex ? "active" : ""}`}
              src={img.src}
              alt={`image ${index + 1}`}
            />
            {
              index === currentImgIndex && 
              <div className="image-content-div">
                <div className={`image-content ${index === currentImgIndex ? "active" : ""}`}>
                  <h1>{img.head}</h1>
                  <h3>{img.content}</h3>
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
