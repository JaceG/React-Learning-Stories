import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function FormsEventsOverview() {
  const lessons = [
    {
      id: 'form-alchemy',
      title: 'Form Alchemy',
      description: 'Transform user input into application state with Master Alchemist Formeus in the Western Quarter\'s Alchemy Lab.',
      icon: '⚗️'
    },
    {
      id: 'event-symphony',
      title: 'Event Symphony',
      description: 'Compose complex event orchestrations with Conductor Eventus, mastering the harmony of user interactions.',
      icon: '🎼'
    },
    {
      id: 'validation-guardians',
      title: 'Validation Guardians',
      description: 'Command validation forces with Guardian Commander Validus, creating impenetrable defenses against invalid data.',
      icon: '🛡️'
    },
    {
      id: 'submission-portals',
      title: 'Submission Portals',
      description: 'Master the final synthesis with Portal Keeper Sage, where all your React knowledge converges in form submission.',
      icon: '🌀'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Forms & Events</h1>
        <p className='course-description'>
          Having mastered hooks and become a Hook Craftmaster, Aria arrives at the Western Quarter 
          where React's abstract powers transform into tangible user interactions. Here, the masters 
          of form and event handling have heard of her innovative approaches and eagerly await her 
          expertise. Join Aria as she applies all her accumulated knowledge to master forms, events, 
          validation, and submission!
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          Before tackling forms and events, ensure you've completed:
        </p>
        <ul>
          <li>Components Basics - Understanding component structure</li>
          <li>State Management - Mastery of useState and useEffect</li>
          <li>Props & Data Flow - Data passing and communication</li>
          <li>Hooks in Action - Advanced hook patterns and custom hooks</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Aria's Journey: This is Part 5 of her adventures. Complete <Link to='/courses/hooks-in-action' className='prerequisite-link'>Hooks in Action</Link> first
        </p>
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
              <span className='progress-indicator'>Start Learning</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='learning-objectives'>
        <h3>What You'll Learn</h3>
        <ul>
          <li>🎯 Controlled vs uncontrolled components</li>
          <li>🎯 Form state management with custom hooks</li>
          <li>🎯 Event handling and synthetic events</li>
          <li>🎯 Event delegation and optimization</li>
          <li>🎯 Multi-layer validation strategies</li>
          <li>🎯 Async form submission patterns</li>
          <li>🎯 Error handling and retry logic</li>
          <li>🎯 Synthesizing all React knowledge for complex forms</li>
        </ul>
      </div>
    </div>
  );
}

export default FormsEventsOverview;