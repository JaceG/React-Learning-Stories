import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function RoutingNavigationOverview() {
  const lessons = [
    {
      id: 'navigation-compass',
      title: 'The Navigation Compass',
      description: 'Meet Captain Marina as an equal and together chart new paths through React applications.',
      icon: '🧭'
    },
    {
      id: 'guardian-gates',
      title: 'Guardian Gates',
      description: 'Co-architect secure routes with Marina, integrating all your accumulated knowledge.',
      icon: '🚪'
    },
    {
      id: 'waypoint-wizardry',
      title: 'Waypoint Wizardry',
      description: 'Design advanced routing systems that showcase your complete React mastery.',
      icon: '🗺️'
    },
    {
      id: 'portal-passages',
      title: 'Portal Passages',
      description: 'Demonstrate the ultimate synthesis and become a Guide for future apprentices.',
      icon: '🌌'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Routing & Navigation</h1>
        <p className='course-description'>
          At last, Aria arrives at the Central Citadel where all paths converge. Captain Marina, 
          having followed her legendary journey, has specifically requested her expertise. No longer 
          an apprentice but a recognized master, Aria will apply everything she's learned to create 
          revolutionary navigation systems. This is where her journey reaches its triumphant conclusion 
          and her legacy begins.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          Complete Aria's full journey to reach this culmination:
        </p>
        <ul>
          <li>Components Basics - Foundation of understanding</li>
          <li>State Management - Memory and reactivity mastery</li>
          <li>Props & Data Flow - Communication expertise</li>
          <li>Hooks in Action - Advanced pattern craftsmanship</li>
          <li>Forms & Events - User interaction architecture</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Aria's Journey: This is the final chapter. Complete <Link to='/courses/forms-events' className='prerequisite-link'>Forms & Events</Link> first
        </p>
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
        <h3>What You'll Master</h3>
        <ul>
          <li>🎯 React Router as the culmination of component systems</li>
          <li>🎯 Route state management integrating all hook patterns</li>
          <li>🎯 Protected routes combining auth, forms, and validation</li>
          <li>🎯 Dynamic routing showcasing complete React mastery</li>
          <li>🎯 Advanced navigation patterns you'll create with Marina</li>
          <li>🎯 Teaching and mentoring future React developers</li>
          <li>🎯 Becoming a guide and leaving your legacy</li>
          <li>🎯 The complete synthesis of all React knowledge</li>
        </ul>
      </div>
    </div>
  );
}

export default RoutingNavigationOverview;