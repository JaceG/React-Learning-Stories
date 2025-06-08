import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function PerformanceOptimizationOverview() {
  const [showLagMonster, setShowLagMonster] = useState(false);

  const lessons = [
    {
      id: 'speed-sanctum',
      title: 'The Speed Sanctum',
      description: 'Discover the ancient arts of React.memo and component optimization to defeat the Lag Monster.',
      icon: '⚡',
      character: 'Master Velocity',
      location: 'Northern Mountains'
    },
    {
      id: 'memory-monastery',
      title: 'Memory Monastery',
      description: 'Learn the sacred rituals of memory management with Brother RAM and the cleanup ceremonies.',
      icon: '🧠',
      character: 'Brother RAM',
      location: 'Mountain Peak'
    },
    {
      id: 'lazy-library',
      title: 'The Lazy Library',
      description: 'Master code splitting and lazy loading with Librarian Loadius in the Progressive Archives.',
      icon: '📚',
      character: 'Librarian Loadius',
      location: 'Mountain Valley'
    },
    {
      id: 'virtualization-vault',
      title: 'Virtualization Vault',
      description: 'Handle infinite data with Keeper Virtus through the mystical art of windowing.',
      icon: '🗄️',
      character: 'Keeper Virtus',
      location: 'Mountain Depths'
    }
  ];

  return (
    <div className='course-overview performance-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Performance & Optimization</h1>
        
        <div className='narrative-introduction'>
          <div className='location-banner'>
            <span className='location-icon'>🏔️</span>
            <span>The Northern Mountains - Mountains of Optimization</span>
          </div>
          
          <div className='aria-returns'>
            <p className='story-paragraph'>
              <strong>Aria</strong>, now a React Kingdom Guide, received an urgent summons. 
              The kingdom's applications were slowing, users were frustrated, and productivity 
              was grinding to a halt. The cause? The dreaded <strong>Lag Monster</strong> had 
              awakened in the Northern Mountains.
            </p>
            
            <p className='story-paragraph'>
              "The kingdom needs your expertise," the message read. "Only someone who 
              understands the complete React system can optimize it. Journey to the 
              Mountains of Optimization and learn from the Performance Masters."
            </p>
            
            <p className='story-paragraph'>
              <strong>Binary</strong> flickered with concern. "The Lag Monster feeds on 
              inefficient code, unnecessary re-renders, and memory leaks. We'll need to 
              master every optimization technique to defeat it!"
            </p>
          </div>
          
          <div 
            className='lag-monster-preview'
            onMouseEnter={() => setShowLagMonster(true)}
            onMouseLeave={() => setShowLagMonster(false)}>
            <div className={`monster-shadow ${showLagMonster ? 'visible' : ''}`}>
              <span className='monster-icon'>👾</span>
              <p>The Lag Monster lurks...</p>
            </div>
          </div>
        </div>
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