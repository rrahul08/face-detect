import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const onImageLoad = (event) => {
    // Calculate the center position of the image
    const imageWidth = event.target.width;
    const containerWidth = event.target.parentElement.offsetWidth;
    const centerPosition = (containerWidth - imageWidth) / 2;

    // Set the left margin of the image to center it
    event.target.style.marginLeft = `${centerPosition}px`;
  };
  const renderFaceBoxes = () => {
    if (Array.isArray(box) && box.length > 0) {
      return box.map((faceBox, index) => {
        return (
          <div
            key={index}
            className='bounding-box'
            style={{
              top: faceBox.topRow,
              right: faceBox.rightCol,
              bottom: faceBox.bottomRow,
              left: faceBox.leftCol,
            }}
          ></div>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className='facerec center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' alt='' src={imageUrl} width={'500px'} height={'auto'} onLoad={onImageLoad} />
        {renderFaceBoxes()}
      </div>
    </div>
  );
};

export default FaceRecognition;
