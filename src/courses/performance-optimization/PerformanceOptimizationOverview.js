import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function PerformanceOptimizationOverview() {
  const lessons = [
    {
      id: 'speed-sanctum',
      title: 'The Speed Sanctum',
      description: 'Unlock the secrets of React.memo and component optimization techniques.',
      icon: '⚡'
    },
    {
      id: 'memory-monastery',
      title: 'Memory Monastery',
      description: 'Master useMemo and useCallback to preserve precious computational resources.',
      icon: '🧠'
    },
    {
      id: 'lazy-library',
      title: 'The Lazy Library',
      description: 'Learn code splitting and lazy loading to create lightning-fast applications.',
      icon: '📚'
    },
    {
      id: 'virtualization-vault',
      title: 'Virtualization Vault',
      description: 'Handle massive lists with virtual scrolling and windowing techniques.',
      icon: '🗄️'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Performance & Optimization</h1>
        <p className='course-description'>
          Enter the Temple of Speed where every millisecond matters. Learn the ancient 
          arts of optimization to create React applications that run at the speed of thought, 
          delighting users with instantaneous responses and smooth interactions.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          To master optimization, you should already understand:
        </p>
        <ul>
          <li>React hooks (especially useState and useEffect)</li>
          <li>Component lifecycle and re-renders</li>
          <li>JavaScript performance basics</li>
          <li>Props and state management</li>
        </ul>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/performance-optimization/${lesson.id}`} 
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
          <li>🎯 React DevTools Profiler</li>
          <li>🎯 Component memoization strategies</li>
          <li>🎯 Optimizing expensive computations</li>
          <li>🎯 Preventing unnecessary re-renders</li>
          <li>🎯 Code splitting and dynamic imports</li>
          <li>🎯 Bundle size optimization</li>
          <li>🎯 Virtual scrolling techniques</li>
          <li>🎯 Performance monitoring and metrics</li>
        </ul>
      </div>
    </div>
  );
}

export default PerformanceOptimizationOverview;