import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './PropForge.css';

function PropForge() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current chapter from URL
  const chapterMatch = location.pathname.match(/chapter(\d)/);
  const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

  const goToChapter = (chapter) => {
    navigate(`chapter${chapter}`);
  };

  return (
    <div className='lesson-container prop-forge-container'>
      <div className='lesson-opener'>
        <p>Following Flux's directions, Aria and Binary climbed the winding path to the Industrial 
        Quarter, where the rhythmic clanging of hammers on metal echoed through the streets. The 
        Prop Forge stood at the district's heart - a massive workshop where raw props were refined, 
        reshaped, and transformed into precisely what components needed.</p>
      </div>
      
      <h1 className='lesson-title'>The Prop Forge</h1>
      <p className='lesson-subtitle'>
        Learn the ancient arts of destructuring and transforming props with Master Smith Destructo
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
        lessonId='prop-forge'
      />
    </div>
  );
}

export default PropForge;