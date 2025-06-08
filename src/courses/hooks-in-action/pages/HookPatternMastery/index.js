import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './HookPatternMastery.css';

function HookPatternMastery() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current chapter from URL
  const chapterMatch = location.pathname.match(/chapter(\d)/);
  const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

  const goToChapter = (chapter) => {
    navigate(`chapter${chapter}`);
  };

  return (
    <div className='lesson-container hook-pattern-mastery-container'>
      <div className='lesson-opener'>
        <p>At the apex of the Hooks Academy stood the Integration Sanctum - a spherical chamber 
        where all hook knowledge converged. Energy streams from every workshop and tower flowed 
        here, creating intricate patterns in the air. This was where students learned to weave 
        individual hooks into masterful patterns that could handle any challenge.</p>
      </div>
      
      <h1 className='lesson-title'>Hook Pattern Mastery</h1>
      <p className='lesson-subtitle'>
        Weave hooks into powerful patterns with Pattern Weaver Synthesis
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
        lessonId='hook-pattern-mastery'
      />
    </div>
  );
}

export default HookPatternMastery;