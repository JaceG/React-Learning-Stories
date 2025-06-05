import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function StateManagementOverview() {
  const lessons = [
    {
      id: 'state-sorcerers',
      title: 'The State Sorcerers',
      description: 'Enter the world of State Sorcerers and learn how components can remember information and change over time.',
      icon: '🧙‍♂️'
    },
    {
      id: 'magical-hooks',
      title: 'The Magical Hooks',
      description: 'Discover how useState, useEffect, and other hooks give functional components the power of state.',
      icon: '🪝'
    },
    {
      id: 'grand-context',
      title: 'The Grand Context',
      description: 'Learn how to share state across component hierarchies using React Context.',
      icon: '🌐'
    },
    {
      id: 'state-management-adventures',
      title: 'State Management Adventures',
      description: 'Explore advanced state management with libraries like Redux and the challenges of application state.',
      icon: '🗺️'
    }
  ];

  return (
    <div className="course-overview">
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className="course-title">State Management</h1>
        <p className="course-description">
          Welcome to the mystical world of State Sorcery! In this course, you'll discover how React 
          components can remember information and change over time. Through enchanting stories and 
          hands-on spells, you'll master the arts of component state, hooks, context, and more advanced 
          state management techniques.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          Before diving into state management, make sure you're comfortable with:
        </p>
        <ul>
          <li>React components and component structure</li>
          <li>Props and how to pass data between components</li>
          <li>Basic JavaScript concepts (variables, functions, objects)</li>
          <li>Event handling in React</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Complete <Link to='/courses/components-basics' className='prerequisite-link'>Components Basics</Link> first
        </p>
      </div>
      
      <div className="lessons-grid">
        {lessons.map(lesson => (
          <Link 
            key={lesson.id} 
            to={`/courses/state-management/${lesson.id}`} 
            className="lesson-card"
          >
            <div className='lesson-icon'>{lesson.icon}</div>
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <div className='lesson-progress'>
              <span>3 chapters</span>
              <span className='progress-indicator'>Start Learning</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='learning-objectives'>
        <h3>What You'll Learn</h3>
        <ul>
          <li>🎯 Understanding React state and when to use it</li>
          <li>🎯 Managing component state with useState</li>
          <li>🎯 Side effects and lifecycle with useEffect</li>
          <li>🎯 Custom hooks for reusable state logic</li>
          <li>🎯 React Context for global state management</li>
          <li>🎯 Advanced patterns with useReducer</li>
          <li>🎯 State management best practices</li>
          <li>🎯 Introduction to external state libraries</li>
        </ul>
      </div>
    </div>
  );
}

export default StateManagementOverview;