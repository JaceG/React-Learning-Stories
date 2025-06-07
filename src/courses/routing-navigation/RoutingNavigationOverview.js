import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function RoutingNavigationOverview() {
  const lessons = [
    {
      id: 'navigation-compass',
      title: 'The Navigation Compass',
      description: 'Chart your course through React applications with React Router fundamentals.',
      icon: '🧭'
    },
    {
      id: 'guardian-gates',
      title: 'Guardian Gates',
      description: 'Protect routes with authentication guards and conditional navigation.',
      icon: '🚪'
    },
    {
      id: 'waypoint-wizardry',
      title: 'Waypoint Wizardry',
      description: 'Master dynamic routing, URL parameters, and nested navigation patterns.',
      icon: '🗺️'
    },
    {
      id: 'portal-passages',
      title: 'Portal Passages',
      description: 'Navigate programmatically and handle navigation state across your app.',
      icon: '🌌'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Routing & Navigation</h1>
        <p className='course-description'>
          Embark on a journey through the Navigation Realm, where paths connect components 
          across dimensions. Master the art of routing to create seamless single-page 
          applications that guide users through your React universe.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          Before navigating these waters, ensure you're comfortable with:
        </p>
        <ul>
          <li>React components and props</li>
          <li>State management with hooks</li>
          <li>Conditional rendering</li>
          <li>Basic JavaScript modules</li>
        </ul>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/routing-navigation/${lesson.id}`} 
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
          <li>🎯 React Router setup and configuration</li>
          <li>🎯 Route components and navigation</li>
          <li>🎯 Protected routes and authentication</li>
          <li>🎯 Dynamic routing with parameters</li>
          <li>🎯 Nested routes and layouts</li>
          <li>🎯 Programmatic navigation</li>
          <li>🎯 Route guards and redirects</li>
          <li>🎯 Navigation state management</li>
        </ul>
      </div>
    </div>
  );
}

export default RoutingNavigationOverview;