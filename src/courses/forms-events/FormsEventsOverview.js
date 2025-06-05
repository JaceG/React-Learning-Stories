import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function FormsEventsOverview() {
  const lessons = [
    {
      id: 'form-alchemy',
      title: 'Form Alchemy',
      description: 'Master the art of controlled and uncontrolled components, turning user input into React gold.',
      icon: '⚗️'
    },
    {
      id: 'event-symphony',
      title: 'Event Symphony',
      description: 'Orchestrate browser events with React\'s synthetic event system and event handling patterns.',
      icon: '🎼'
    },
    {
      id: 'validation-guardians',
      title: 'Validation Guardians',
      description: 'Deploy powerful validation strategies to protect your forms from invalid data.',
      icon: '🛡️'
    },
    {
      id: 'submission-portals',
      title: 'Submission Portals',
      description: 'Open gateways to handle form submissions, async operations, and user feedback.',
      icon: '🌀'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Forms & Events</h1>
        <p className='course-description'>
          Enter the Interactive Realm where user input transforms into application state. 
          Master the ancient arts of form handling, event management, and validation to 
          create truly responsive React applications.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This learning path builds upon the concepts from Components Basics and State Management. 
          You should be comfortable with:
        </p>
        <ul>
          <li>Creating and using React components</li>
          <li>Managing state with useState</li>
          <li>Understanding props and data flow</li>
          <li>Basic event handling in React</li>
        </ul>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/forms-events/${lesson.id}`} 
            className='lesson-card'
          >
            <div className='lesson-icon'>{lesson.icon}</div>
            <h3 className='lesson-title'>{lesson.title}</h3>
            <p className='lesson-description'>{lesson.description}</p>
            <div className='lesson-progress'>
              <span>3 chapters</span>
              <span className='progress-indicator'>Not Started</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='learning-objectives'>
        <h3>What You'll Learn</h3>
        <ul>
          <li>🎯 Controlled vs uncontrolled components</li>
          <li>🎯 Form state management patterns</li>
          <li>🎯 React's synthetic event system</li>
          <li>🎯 Event delegation and bubbling</li>
          <li>🎯 Form validation strategies</li>
          <li>🎯 Async form submissions</li>
          <li>🎯 Error handling and user feedback</li>
          <li>🎯 Complex form patterns</li>
        </ul>
      </div>
    </div>
  );
}

export default FormsEventsOverview;