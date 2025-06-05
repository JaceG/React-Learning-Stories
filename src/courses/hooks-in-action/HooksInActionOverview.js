import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function HooksInActionOverview() {
  const lessons = [
    {
      id: 'use-state-spells',
      title: 'The useState Spells',
      description: 'Master the fundamental spell of state management and learn advanced useState patterns',
      icon: '✨'
    },
    {
      id: 'use-effect-enchantments',
      title: 'The useEffect Enchantments',
      description: 'Discover the magic of side effects and lifecycle management in functional components',
      icon: '🌟'
    },
    {
      id: 'custom-hook-crafting',
      title: 'Custom Hook Crafting',
      description: 'Forge your own magical hooks to encapsulate and share component logic',
      icon: '⚒️'
    },
    {
      id: 'hook-pattern-mastery',
      title: 'Hook Pattern Mastery',
      description: 'Combine multiple hooks to create powerful patterns and solve complex problems',
      icon: '🎭'
    }
  ];

  return (
    <div className="course-overview">
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className="course-title">Hooks in Action</h1>
        <p className="course-description">
          Delve deep into the magical world of React Hooks. From the fundamental spells of useState 
          to the complex enchantments of custom hooks, master the modern way of building React components.
        </p>
      </div>
      
      <div className="course-prerequisites">
        <h3>Prerequisites</h3>
        <p>
          This intermediate course requires solid understanding of:
        </p>
        <ul>
          <li>React functional components</li>
          <li>Basic useState and useEffect usage</li>
          <li>Props and component composition</li>
          <li>JavaScript ES6+ features (arrow functions, destructuring)</li>
        </ul>
        <p className="prerequisite-note">
          💡 Recommended: Complete <Link to="/courses/state-management" className="prerequisite-link">State Management</Link> and 
          <Link to="/courses/props-data-flow" className="prerequisite-link"> Props & Data Flow</Link> first
        </p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/hooks-in-action/${lesson.id}`} 
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
          <li>🎯 Advanced useState patterns and lazy initialization</li>
          <li>🎯 useEffect cleanup and dependency management</li>
          <li>🎯 Performance optimization with useMemo and useCallback</li>
          <li>🎯 Context and useContext patterns</li>
          <li>🎯 useReducer for complex state logic</li>
          <li>🎯 Creating reusable custom hooks</li>
          <li>🎯 Hook composition and patterns</li>
          <li>🎯 Testing components with hooks</li>
        </ul>
      </div>
    </div>
  );
}

export default HooksInActionOverview;