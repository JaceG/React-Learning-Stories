import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function PropsDataFlowOverview() {
  const lessons = [
    {
      id: 'props-caravans',
      title: 'The Props Caravans',
      description: 'Journey with the caravan traders to learn how props transport data between components',
      chapters: 3
    },
    {
      id: 'data-rivers',
      title: 'The Data Rivers',
      description: 'Follow the flow of data through the React Kingdom\'s mighty rivers',
      chapters: 3
    },
    {
      id: 'prop-forge',
      title: 'The Prop Forge',
      description: 'Master the ancient arts of destructuring and transforming props',
      chapters: 3
    },
    {
      id: 'event-echoes',
      title: 'The Event Echoes',
      description: 'Learn how events echo upward through callback functions',
      chapters: 3
    }
  ];

  return (
    <div className="course-overview">
      <h1 className="course-title">Props & Data Flow</h1>
      <p className="course-description">
        Master the flow of data through your React applications. Learn how props carry information 
        like merchant caravans, flow like rivers, and how events echo back up the component tree.
      </p>
      
      <div className="course-prerequisites">
        <p className="prerequisite-note">
          <strong>📚 Prerequisites:</strong> This course builds upon concepts from <Link to="/courses/components-basics" className="prerequisite-link">Component Basics</Link>. 
          We recommend completing "The Props Messengers" lesson first to understand basic prop passing.
        </p>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <Link 
              to={`/courses/props-data-flow/${lesson.id}`} 
              className="lesson-link"
            >
              Begin Lesson
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropsDataFlowOverview;