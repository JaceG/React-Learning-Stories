import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function HooksInActionOverview() {
  const lessons = [
    {
      id: 'use-state-spells',
      title: 'The useState Spells',
      description: 'Join Aria at the Hooks Academy as she learns the fundamental spell of state management from Professor Hooksworth',
      icon: '✨'
    },
    {
      id: 'use-effect-enchantments',
      title: 'The useEffect Enchantments',
      description: 'Master the art of side effects and lifecycle magic with the mysterious Effect Sage',
      icon: '🌟'
    },
    {
      id: 'custom-hook-crafting',
      title: 'Custom Hook Crafting',
      description: 'Learn to forge your own magical hooks with Master Artificer Compose',
      icon: '⚒️'
    },
    {
      id: 'hook-pattern-mastery',
      title: 'Hook Pattern Mastery',
      description: 'Combine hooks into powerful patterns under the guidance of Pattern Weaver Synthesis',
      icon: '🎭'
    }
  ];

  return (
    <div className="course-overview">
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className="course-title">Hooks in Action</h1>
        <p className="course-description">
          After mastering state and data flow, Aria arrives at the prestigious Hooks Academy. Here, 
          she'll learn React's most powerful spells - from fundamental useState incantations to 
          advanced custom hook crafting. Join her as she becomes a true Hook Mage!
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