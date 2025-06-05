import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ReactNativeOverview() {
  const lessons = [
    {
      id: 'mobile-components',
      title: 'Mobile-Specific Components',
      description: 'Master Views, ScrollViews, FlatLists, and other React Native core components.',
      icon: '📱'
    },
    {
      id: 'navigation-mobile',
      title: 'Navigation in React Native',
      description: 'Implement stack, tab, and drawer navigation with React Navigation.',
      icon: '🧭'
    },
    {
      id: 'platform-specific',
      title: 'Platform-Specific Code',
      description: 'Write code that adapts beautifully to iOS and Android platforms.',
      icon: '🔀'
    },
    {
      id: 'mobile-gestures',
      title: 'Mobile Gestures & Animations',
      description: 'Create fluid interactions with gesture handlers and native animations.',
      icon: '👆'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>React Native Fundamentals</h1>
        <p className='course-description'>
          Cross the bridge to the Mobile Realm where React powers native iOS and Android 
          applications. Learn to build beautiful, performant mobile apps using the React 
          skills you already know and love.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          Before starting mobile development, ensure you have:
        </p>
        <ul>
          <li>Strong React fundamentals</li>
          <li>JavaScript ES6+ proficiency</li>
          <li>Basic understanding of mobile app concepts</li>
          <li>Development environment setup (Xcode/Android Studio)</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Complete all React web courses first
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/react-native/${lesson.id}`} 
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
          <li>🎯 React Native component architecture</li>
          <li>🎯 Styling with StyleSheet API</li>
          <li>🎯 Navigation patterns and best practices</li>
          <li>🎯 Platform-specific UI/UX guidelines</li>
          <li>🎯 Touch and gesture handling</li>
          <li>🎯 Animated API and interactions</li>
          <li>🎯 Native module integration</li>
          <li>🎯 Performance optimization for mobile</li>
        </ul>
      </div>
    </div>
  );
}

export default ReactNativeOverview;