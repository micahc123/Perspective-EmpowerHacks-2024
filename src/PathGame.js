import React, { useState, useEffect, useRef } from 'react';
import PanoramaViewer from './PanoramaViewer';
import './PathGame.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PathGame = ({ path, onBack, onMainMenu }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showPopDown, setShowPopDown] = useState(false);
  const popDownRef = useRef(null);

  const pageDetails = [
    { title: "School", header: "School View", text: "Drag and click around to learn more about my school life" },
    { title: "Home", header: "Home View", text: "Drag and click around to learn more about my home life" },
    { title: "College Admissions Day", header: "CAD View", text: "Drag and click around to open my college letters" },
    { title: "Work", header: "Work View", text: "Drag and click around to learn more about what I do now" }
  ];

  const pages = [
    ...path.panoramaImages.map((image, index) => ({
      title: pageDetails[index]?.title || `View ${index + 1}`,
      content: (
        <PanoramaViewer
          imageUrl={typeof image === 'string' ? image : image.url}
          interactivePoints={typeof image === 'string' ? [] : image.interactivePoints || []}
        />
      ),
      header: pageDetails[index]?.header || `View ${index + 1}`,
      text: pageDetails[index]?.text || `This is view ${index + 1} of the path.`
    })),
    {
      title: 'End of Path',
      content: (
        <div>
          <p>You have reached the end of the path.</p>
          <button onClick={onMainMenu} className="main-menu-button">
            Back to Main Menu
          </button>
        </div>
      ),
      header: 'End of Path',
      text: 'You have reached the end of the path.'
    }
  ];

  useEffect(() => {
    setShowPopDown(false);

    if (popDownRef.current) {
      popDownRef.current.style.display = 'none';
      void popDownRef.current.offsetHeight; // Trigger a reflow 
      popDownRef.current.style.display = '';
    }

    const showTimer = setTimeout(() => setShowPopDown(true), 50);

    return () => {
      clearTimeout(showTimer);
    };
  }, [pageIndex]);

  const handleNext = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const handlePrev = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  return (
    <div className="path-game">
      <div className="page-content">
        {pages[pageIndex].content}
        <div 
          ref={popDownRef}
          className={`pop-down ${showPopDown ? 'show' : ''}`}
        >
          <h3>{pages[pageIndex].header}</h3>
          <hr />
          <p>{pages[pageIndex].text}</p>
        </div>
      </div>
      <div className="navigation-buttons">
        {pageIndex > 0 && (
          <button onClick={handlePrev} className="nav-button btn-prev">
            <FaArrowLeft /> Previous
          </button>
        )}
        {pageIndex < pages.length - 1 && (
          <button onClick={handleNext} className="nav-button btn-next">
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default PathGame;