import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function StateManagementOverview() {
  const lessons = [
    {
      id: 'state-sorcerers',
      title: 'The State Sorcerers',
      description: 'Enter the world of State Sorcerers and learn how components can remember information and change over time.'
    },
    {
      id: 'magical-hooks',
      title: 'The Magical Hooks',
      description: 'Discover how useState, useEffect, and other hooks give functional components the power of state.'
    },
    {
      id: 'grand-context',
      title: 'The Grand Context',
      description: 'Learn how to share state across component hierarchies using React Context.'
    },
    {
      id: 'state-management-adventures',
      title: 'State Management Adventures',
      description: 'Explore advanced state management with libraries like Redux and the challenges of application state.'
    }
  ];

  return (
    <div className="course-overview">
      <h1 className="course-title">State Management</h1>
      <p className="course-description">
        Welcome to the mystical world of State Sorcery! In this course, you'll discover how React 
        components can remember information and change over time. Through enchanting stories and 
        hands-on spells, you'll master the arts of component state, hooks, context, and more advanced 
        state management techniques.
      </p>
      
      <div className="lesson-grid">
        {lessons.map(lesson => (
          <div key={lesson.id} className="lesson-card">
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <Link to={`/courses/state-management/${lesson.id}`} className="lesson-link">
              Begin Lesson
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StateManagementOverview;