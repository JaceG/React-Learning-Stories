import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ServerDataOverview() {
  const lessons = [
    {
      id: 'data-fetching',
      title: 'Data Fetching Patterns',
      description: 'Master modern data fetching with React Query, SWR, and native approaches.',
      icon: '🔄'
    },
    {
      id: 'server-components',
      title: 'Server Components',
      description: 'Explore React 18+ Server Components and the future of React architecture.',
      icon: '🖥️'
    },
    {
      id: 'suspense-concurrent',
      title: 'Suspense & Concurrent Features',
      description: 'Harness the power of Suspense, concurrent rendering, and transitions.',
      icon: '⚡'
    },
    {
      id: 'realtime-updates',
      title: 'Real-time Updates',
      description: 'Implement WebSockets, Server-Sent Events, and real-time data synchronization.',
      icon: '📡'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Server & Data</h1>
        <p className='course-description'>
          Journey to the Data Nexus where information flows between servers and clients. 
          Master modern data fetching patterns, server components, and real-time updates 
          to build responsive, data-driven React applications.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This advanced course requires understanding of:
        </p>
        <ul>
          <li>Async JavaScript and Promises</li>
          <li>REST APIs and HTTP concepts</li>
          <li>React hooks and state management</li>
          <li>Basic server concepts</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Familiarity with Node.js and Express is helpful
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/server-data/${lesson.id}`} 
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
          <li>🎯 Modern data fetching with React Query</li>
          <li>🎯 SWR for data synchronization</li>
          <li>🎯 React Server Components architecture</li>
          <li>🎯 Suspense for data fetching</li>
          <li>🎯 Concurrent features and transitions</li>
          <li>🎯 WebSocket integration</li>
          <li>🎯 Optimistic updates and caching</li>
          <li>🎯 Error boundaries for data fetching</li>
        </ul>
      </div>
    </div>
  );
}

export default ServerDataOverview;