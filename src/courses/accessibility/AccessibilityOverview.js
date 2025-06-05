import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function AccessibilityOverview() {
  const lessons = [
    {
      id: 'aria-attributes',
      title: 'ARIA Attributes',
      description: 'Master ARIA roles, states, and properties to enhance screen reader support.',
      icon: '🏷️'
    },
    {
      id: 'keyboard-navigation',
      title: 'Keyboard Navigation',
      description: 'Build interfaces that work seamlessly with keyboard-only navigation.',
      icon: '⌨️'
    },
    {
      id: 'screen-reader-support',
      title: 'Screen Reader Support',
      description: 'Ensure your React apps work perfectly with assistive technologies.',
      icon: '🔊'
    },
    {
      id: 'accessible-forms-modals',
      title: 'Accessible Forms & Modals',
      description: 'Create inclusive forms, modals, and interactive components.',
      icon: '♿'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Accessibility (a11y)</h1>
        <p className='course-description'>
          Enter the Hall of Inclusion where every user matters. Learn to build React 
          applications that are accessible to all, regardless of ability. Master the 
          techniques that make your apps usable by everyone.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This course focuses on inclusive design and requires:
        </p>
        <ul>
          <li>Solid React component knowledge</li>
          <li>HTML semantic elements understanding</li>
          <li>Basic CSS knowledge</li>
          <li>Empathy and commitment to inclusion</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Install a screen reader for testing
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/accessibility/${lesson.id}`} 
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
          <li>🎯 WCAG guidelines and compliance</li>
          <li>🎯 Semantic HTML in React</li>
          <li>🎯 ARIA best practices</li>
          <li>🎯 Focus management techniques</li>
          <li>🎯 Keyboard navigation patterns</li>
          <li>🎯 Screen reader testing</li>
          <li>🎯 Color contrast and visual design</li>
          <li>🎯 Accessibility testing tools</li>
        </ul>
      </div>
    </div>
  );
}

export default AccessibilityOverview;