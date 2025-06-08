import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './DataRivers.css';

function DataRivers() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current chapter from URL
  const chapterMatch = location.pathname.match(/chapter(\d)/);
  const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

  const goToChapter = (chapter) => {
    navigate(`chapter${chapter}`);
  };

  return (
    <div className='lesson-container data-rivers-container'>
      <div className='lesson-opener'>
        <p>Following Propius's directions, Aria and Binary made their way to the Cascade District, 
        where the sound of rushing water grew louder with each step. Here, crystal-clear rivers 
        flowed through the kingdom, carrying not water, but streams of pure data between the 
        component settlements.</p>
      </div>
      
      <h1 className='lesson-title'>The Data Rivers</h1>
      <p className='lesson-subtitle'>
        Navigate the one-way flow of information with Aria and River Master Flux
      </p>

      <div className='chapter-navigation'>
        <button
          onClick={() => goToChapter(currentChapter - 1)}
          disabled={currentChapter === 1}
          className='chapter-nav-button'>
          ← Previous Chapter
        </button>
        <span className='chapter-indicator'>
          Chapter {currentChapter} of 3
        </span>
        <button
          onClick={() => goToChapter(currentChapter + 1)}
          disabled={currentChapter === 3}
          className='chapter-nav-button'>
          Next Chapter →
        </button>
      </div>

      {/* Render the current chapter */}
      <Outlet />

      <div className='chapter-navigation'>
        <button
          onClick={() => goToChapter(currentChapter - 1)}
          disabled={currentChapter === 1}
          className='chapter-nav-button'>
          ← Previous Chapter
        </button>
        <span className='chapter-indicator'>
          Chapter {currentChapter} of 3
        </span>
        <button
          onClick={() => goToChapter(currentChapter + 1)}
          disabled={currentChapter === 3}
          className='chapter-nav-button'>
          Next Chapter →
        </button>
      </div>

      <LessonNavigation
        courseId='props-data-flow'
        lessonId='data-rivers'
      />
    </div>
  );
}

export default DataRivers;