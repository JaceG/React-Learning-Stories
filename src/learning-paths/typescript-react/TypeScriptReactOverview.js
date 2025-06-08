import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function TypeScriptReactOverview() {
  const lessons = [
    {
      id: 'component-typing',
      title: 'Component Typing',
      description: 'Learn to type functional and class components, props, and children effectively.',
      icon: '📝'
    },
    {
      id: 'hook-typing',
      title: 'Hook Typing',
      description: 'Master TypeScript with React hooks, custom hooks, and advanced hook patterns.',
      icon: '🎣'
    },
    {
      id: 'generic-components',
      title: 'Generic Components',
      description: 'Build flexible, reusable components with TypeScript generics.',
      icon: '🧬'
    },
    {
      id: 'type-safe-patterns',
      title: 'Type-Safe Patterns',
      description: 'Implement advanced patterns with complete type safety and IntelliSense.',
      icon: '🛡️'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>TypeScript with React</h1>
        <p className='course-description'>
          Enter the Type Forge where code is tempered with the strength of static types. 
          Learn to combine TypeScript's powerful type system with React to build robust, 
          self-documenting applications with confidence.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This course requires knowledge of:
        </p>
        <ul>
          <li>React components and hooks</li>
          <li>Basic TypeScript syntax</li>
          <li>JavaScript ES6+ features</li>
          <li>Type annotations and interfaces</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Complete React fundamentals and basic TypeScript tutorials first
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/typescript-react/${lesson.id}`} 
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
          <li>🎯 Typing props, state, and events</li>
          <li>🎯 Function component type patterns</li>
          <li>🎯 useState and useReducer with TypeScript</li>
          <li>🎯 Custom hook type patterns</li>
          <li>🎯 Generic component patterns</li>
          <li>🎯 Discriminated unions in React</li>
          <li>🎯 Type-safe context patterns</li>
          <li>🎯 Third-party library types</li>
        </ul>
      </div>
    </div>
  );
}

export default TypeScriptReactOverview;