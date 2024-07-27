import React, { useState } from 'react';
import PanoramaView from './PanoramaView';
import CollegeMiniGame from './CollegeMiniGame';
import './PathGame.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const PathGame = ({ path, onBack, onMainMenu }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    {
      title: 'Background Info',
      content: <PanoramaView images={path.panoramaImages} />,
    },
    {
      title: 'Extracuricculars',
      content: <p>{path.studyInfo}</p>,
    },
    {
      title: 'Hobbies ',
      content: <p>{path.interestingInfo}</p>,
    },
    {
      title: 'College Admissions Day!',
      content: <CollegeMiniGame colleges={path.colleges} description={path.collegeDescription} />,
    },
    {
      title: 'Current Career Path',
      content: <p>{path.currentInfo}</p>,
    },
    {
      title: 'End',
      content: (
        <div>
          <p>Thank you for exploring this path!</p>
          <button onClick={onMainMenu} className="main-menu-button">Back to Main Menu</button>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const handlePrev = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  return (
    <div className="path-game">
      <h2>{pages[pageIndex].title}</h2>
      <div className="page-content">
        {pages[pageIndex].content}
      </div>
      <div className="navigation-buttons">
        {pageIndex > 0 && (
          <button onClick={handlePrev} className="btn btn-secondary">
            <FaArrowLeft /> Previous
          </button>
        )}
        {pageIndex < pages.length - 1 && (
          <button onClick={handleNext} className="btn btn-secondary btn-next">
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default PathGame;