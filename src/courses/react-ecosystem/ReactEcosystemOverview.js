import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ReactEcosystemOverview() {
  const lessons = [
    {
      id: 'state-libraries',
      title: 'State Management Libraries',
      description: 'Explore Redux, Zustand, MobX and other powerful state management solutions.',
      icon: '🏛️'
    },
    {
      id: 'styling-solutions',
      title: 'Styling Solutions',
      description: 'Master CSS-in-JS, CSS Modules, and modern styling approaches for React.',
      icon: '🎨'
    },
    {
      id: 'form-libraries',
      title: 'Form Libraries',
      description: 'Simplify complex forms with React Hook Form, Formik, and validation libraries.',
      icon: '📋'
    },
    {
      id: 'animation-libraries',
      title: 'Animation Libraries',
      description: 'Bring your apps to life with Framer Motion, React Spring, and animation techniques.',
      icon: '✨'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>React Ecosystem</h1>
        <p className='course-description'>
          Explore the vast React Kingdom's marketplace where powerful tools and libraries 
          await. Learn to choose and integrate the best solutions for state management, 
          styling, forms, and animations to build production-ready applications.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This course explores external libraries and requires:
        </p>
        <ul>
          <li>Solid understanding of React fundamentals</li>
          <li>Experience with npm/yarn package management</li>
          <li>Familiarity with React hooks and state management</li>
          <li>Basic understanding of build tools</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Complete <Link to='/courses/hooks-in-action' className='prerequisite-link'>Hooks in Action</Link> and 
          <Link to='/courses/state-management' className='prerequisite-link'> State Management</Link> first
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/react-ecosystem/${lesson.id}`} 
            className='lesson-card'
          >
            <div className='lesson-icon'>{lesson.icon}</div>
            <h3 className='lesson-title'>{lesson.title}</h3>
            <p className='lesson-description'>{lesson.description}</p>
            <div className='lesson-progress'>
              <span>3 chapters</span>
              <span className='progress-indicator coming-soon'>Coming Soon</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='learning-objectives'>
        <h3>What You'll Learn</h3>
        <ul>
          <li>🎯 Redux fundamentals and Redux Toolkit</li>
          <li>🎯 Zustand for lightweight state management</li>
          <li>🎯 MobX and reactive programming</li>
          <li>🎯 CSS-in-JS with styled-components and Emotion</li>
          <li>🎯 CSS Modules and component styling</li>
          <li>🎯 React Hook Form for performant forms</li>
          <li>🎯 Animation with Framer Motion</li>
          <li>🎯 Choosing the right tools for your project</li>
        </ul>
      </div>
    </div>
  );
}

export default ReactEcosystemOverview;