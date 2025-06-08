import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './UseStateSpells.css';

function UseStateSpells() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current chapter from URL
  const chapterMatch = location.pathname.match(/chapter(\d)/);
  const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

  const goToChapter = (chapter) => {
    navigate(`chapter${chapter}`);
  };

  return (
    <div className='lesson-container use-state-spells-container'>
      <div className='lesson-opener'>
        <p>The Hooks Academy stood as a modern marvel - a gleaming tower of glass and steel that 
        seemed to defy the traditional stone architecture of React Kingdom. As Aria approached with 
        Binary, holographic runes floated in the air, demonstrating various hook patterns. This was 
        where React's most advanced magic was taught, where functional components gained powers once 
        reserved for classes.</p>
      </div>
      
      <h1 className='lesson-title'>The useState Spells</h1>
      <p className='lesson-subtitle'>
        Learn the fundamental hook spell with Professor Hooksworth
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
        courseId='hooks-in-action'
        lessonId='use-state-spells'
      />
    </div>
  );
}

export default UseStateSpells;