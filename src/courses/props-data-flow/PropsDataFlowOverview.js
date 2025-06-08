import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function PropsDataFlowOverview() {
  const lessons = [
    {
      id: 'props-caravans',
      title: 'The Props Caravans',
      description: 'Join Aria as she meets the Caravan Masters and learns how props transport data like merchant caravans',
      icon: '🐪'
    },
    {
      id: 'data-rivers',
      title: 'The Data Rivers',
      description: 'Navigate the data rivers with Aria and understand the one-way flow of information',
      icon: '🌊'
    },
    {
      id: 'prop-forge',
      title: 'The Prop Forge',
      description: 'Discover the ancient arts of destructuring and transforming props at the legendary forge',
      icon: '🔨'
    },
    {
      id: 'event-echoes',
      title: 'The Event Echoes',
      description: 'Master the echo caves where Aria learns how events travel back up the component tree',
      icon: '🔔'
    }
  ];

  return (
    <div className="course-overview">
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className="course-title">Props & Data Flow</h1>
        <p className="course-description">
          Fresh from her state management victories, Aria ventures into the bustling trade routes of React Kingdom. 
          Here, she'll discover how data flows through components like merchant caravans, navigate the one-way rivers 
          of information, and learn the ancient arts of prop transformation.
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
              <span className='progress-indicator'>Start Learning</span>
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