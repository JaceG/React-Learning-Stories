import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function PropsDataFlowOverview() {
  const lessons = [
    {
      id: 'props-caravans',
      title: 'The Props Caravans',
      description: 'Journey with the caravan traders to learn how props transport data between components',
      icon: '🐪'
    },
    {
      id: 'data-rivers',
      title: 'The Data Rivers',
      description: 'Follow the flow of data through the React Kingdom\'s mighty rivers',
      icon: '🌊'
    },
    {
      id: 'prop-forge',
      title: 'The Prop Forge',
      description: 'Master the ancient arts of destructuring and transforming props',
      icon: '🔨'
    },
    {
      id: 'event-echoes',
      title: 'The Event Echoes',
      description: 'Learn how events echo upward through callback functions',
      icon: '🔔'
    }
  ];

  return (
    <div className="course-overview">
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className="course-title">Props & Data Flow</h1>
        <p className="course-description">
          Master the flow of data through your React applications. Learn how props carry information 
          like merchant caravans, flow like rivers, and how events echo back up the component tree.
        </p>
      </div>
      
      <div className="course-prerequisites">
        <h3>Prerequisites</h3>
        <p>
          This course builds upon fundamental React concepts. You should be comfortable with:
        </p>
        <ul>
          <li>Creating and composing React components</li>
          <li>Basic prop passing between components</li>
          <li>Understanding parent-child relationships</li>
          <li>Basic state management with useState</li>
        </ul>
        <p className="prerequisite-note">
          💡 Recommended: Complete <Link to="/courses/components-basics" className="prerequisite-link">Components Basics</Link> and 
          the "Props Messengers" lesson first
        </p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/props-data-flow/${lesson.id}`} 
            className="lesson-card"
          >
            <div className='lesson-icon'>{lesson.icon}</div>
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
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
          <li>🎯 Advanced prop patterns and techniques</li>
          <li>🎯 Prop drilling and when to avoid it</li>
          <li>🎯 Component composition strategies</li>
          <li>🎯 Callback props and event handling</li>
          <li>🎯 Prop validation with PropTypes</li>
          <li>🎯 Default props and prop spreading</li>
          <li>🎯 Data transformation patterns</li>
          <li>🎯 Optimizing data flow in large applications</li>
        </ul>
      </div>
    </div>
  );
}

export default PropsDataFlowOverview;