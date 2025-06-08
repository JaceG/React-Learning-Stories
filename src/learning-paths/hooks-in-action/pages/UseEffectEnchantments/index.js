import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './UseEffectEnchantments.css';

function UseEffectEnchantments() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current chapter from URL
  const chapterMatch = location.pathname.match(/chapter(\d)/);
  const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

  const goToChapter = (chapter) => {
    navigate(`chapter${chapter}`);
  };

  return (
    <div className='lesson-container use-effect-enchantments-container'>
      <div className='lesson-opener'>
        <p>The Temporal Tower loomed before Aria - a spiraling structure where time seemed to flow 
        differently at each level. Clock faces of various sizes ticked at different speeds along 
        its walls. This was where the Academy taught its most mysterious hook: useEffect, the 
        bridge between React's pure world and the chaotic realm of side effects.</p>
      </div>
      
      <h1 className='lesson-title'>The useEffect Enchantments</h1>
      <p className='lesson-subtitle'>
        Master the art of side effects with the enigmatic Effect Sage
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
        lessonId='use-effect-enchantments'
      />
    </div>
  );
}

export default UseEffectEnchantments;