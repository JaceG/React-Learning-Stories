import React from 'react';
import { Link } from 'react-router-dom';
import { getAdjacentLessons } from '../../courses/lessonSequences';
import './Layout.css';

function LessonNavigation({ courseId, lessonId }) {
  const { prev, next } = getAdjacentLessons(courseId, lessonId);
  
  return (
    <div className="lesson-navigation">
      {prev ? (
        <Link 
          to={`/courses/${courseId}/${prev.id}`} 
          className="lesson-nav-button"
        >
          ← {prev.title}
        </Link>
      ) : (
        <Link 
          to={`/courses/${courseId}`} 
          className="lesson-nav-button"
        >
          Back to Overview
        </Link>
      )}
      
      <button className="lesson-complete-button">
        Mark as Complete
      </button>
      
      {next ? (
        <Link 
          to={`/courses/${courseId}/${next.id}`} 
          className="lesson-nav-button"
        >
          {next.title} →
        </Link>
      ) : (
        <Link 
          to="/courses" 
          className="lesson-nav-button"
        >
          All Courses
        </Link>
      )}
    </div>
  );
}

export default LessonNavigation;