import React from 'react';
import { Link } from 'react-router-dom';
import './CourseStyles.css';

function CourseIndex() {
  const courses = [
    {
      id: 'components-basics',
      title: 'Components Basics',
      description: 'Learn the fundamentals of React Components through engaging stories and interactive exercises.',
      lessons: 4,
      icon: '🏰', // Castle icon representing the Component Kingdom
      level: 'Beginner'
    },
    {
      id: 'state-management',
      title: 'State Management',
      description: 'Discover how React components can remember information and change over time using State.',
      lessons: 4,
      icon: '🧙‍♂️', // Wizard icon for State "magic"
      level: 'Beginner'
    },
    {
      id: 'props-data-flow',
      title: 'Props & Data Flow',
      description: 'Master the flow of data between components using props and callbacks.',
      lessons: 3,
      icon: '📨', // Message icon for Props as messengers
      level: 'Beginner'
    },
    {
      id: 'hooks-in-action',
      title: 'Hooks in Action',
      description: 'Learn to use React Hooks to add advanced functionality to your components.',
      lessons: 5,
      icon: '🎣', // Fishing hook icon
      level: 'Intermediate'
    },
    {
      id: 'forms-events',
      title: 'Forms & Events',
      description: 'Build interactive forms and handle user events in your React applications.',
      lessons: 3,
      icon: '📝', // Form icon
      level: 'Intermediate'
    }
  ];

  return (
    <div className="course-catalog">
      <h1 className="catalog-title">React Learning Stories</h1>
      <p className="catalog-intro">
        Welcome to React Learning Stories! Dive into the world of React through engaging 
        narratives and hands-on exercises. Each course combines storytelling with kinesthetic 
        learning to help you grasp React concepts intuitively and effectively.
      </p>
      
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-icon">{course.icon}</div>
            <div className="course-info">
              <h2 className="course-title">{course.title}</h2>
              <div className="course-meta">
                <span className="course-level">{course.level}</span>
                <span className="course-lessons">{course.lessons} Lessons</span>
              </div>
              <p className="course-description">{course.description}</p>
              <Link to={`/courses/${course.id}`} className="course-link">
                Begin Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseIndex;