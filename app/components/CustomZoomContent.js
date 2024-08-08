// components/CustomZoomContent.js
import React, { useState, useLayoutEffect } from 'react';

const CustomZoomContent = ({
  buttonUnzoom, // default unzoom button
  modalState,   // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
  img,          // your image, prepped for zooming
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true);
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false);
    }
  }, [modalState]);

  const overlayClass = isLoaded ? 'zoom-overlay zoom-overlay--loaded' : 'zoom-overlay';

  return (
    <div className="custom-zoom-content">
      {buttonUnzoom}
      <div className={overlayClass}>
        {img}
      </div>
    </div>
  );
};

export default CustomZoomContent;