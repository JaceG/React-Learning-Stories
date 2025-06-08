import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function AdvancedPatternsOverview() {
  const lessons = [
    {
      id: 'compound-components',
      title: 'Compound Components',
      description: 'Master the art of building flexible, composable components that work together seamlessly.',
      icon: '🧩'
    },
    {
      id: 'render-props',
      title: 'Render Props',
      description: 'Learn how to share component logic using the powerful render prop pattern.',
      icon: '🎁'
    },
    {
      id: 'higher-order-components',
      title: 'Higher-Order Components',
      description: 'Enhance components with reusable logic using the HOC pattern.',
      icon: '🏗️'
    },
    {
      id: 'portals-refs',
      title: 'Portals & Refs',
      description: 'Break out of the DOM hierarchy with portals and directly access DOM elements with refs.',
      icon: '🌀'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Advanced Patterns</h1>
        <p className='course-description'>
          Enter the Architect's Guild where master builders share their most sophisticated 
          techniques. Learn advanced React patterns that enable you to create flexible, 
          reusable, and maintainable component architectures.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This advanced course requires strong understanding of:
        </p>
        <ul>
          <li>React hooks and functional components</li>
          <li>Component composition and props</li>
          <li>State management patterns</li>
          <li>JavaScript closures and higher-order functions</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Complete all beginner and intermediate courses first
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/advanced-patterns/${lesson.id}`} 
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
          <li>🎯 Compound component patterns for flexible APIs</li>
          <li>🎯 Render props for cross-cutting concerns</li>
          <li>🎯 HOC patterns and best practices</li>
          <li>🎯 When to use each pattern effectively</li>
          <li>🎯 Portal use cases and implementation</li>
          <li>🎯 Ref forwarding and imperative APIs</li>
          <li>🎯 Pattern composition and combination</li>
          <li>🎯 Performance implications of each pattern</li>
        </ul>
      </div>
    </div>
  );
}

export default AdvancedPatternsOverview;