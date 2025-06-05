import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function HooksInActionOverview() {
  const lessons = [
    {
      id: 'use-state-spells',
      title: 'The useState Spells',
      description: 'Master the fundamental spell of state management and learn advanced useState patterns',
      chapters: 3
    },
    {
      id: 'use-effect-enchantments',
      title: 'The useEffect Enchantments',
      description: 'Discover the magic of side effects and lifecycle management in functional components',
      chapters: 3
    },
    {
      id: 'custom-hook-crafting',
      title: 'Custom Hook Crafting',
      description: 'Forge your own magical hooks to encapsulate and share component logic',
      chapters: 3
    },
    {
      id: 'hook-pattern-mastery',
      title: 'Hook Pattern Mastery',
      description: 'Combine multiple hooks to create powerful patterns and solve complex problems',
      chapters: 3
    }
  ];

  return (
    <div className="course-overview">
      <h1 className="course-title">Hooks in Action</h1>
      <p className="course-description">
        Delve deep into the magical world of React Hooks. From the fundamental spells of useState 
        to the complex enchantments of custom hooks, master the modern way of building React components.
      </p>
      
      <div className="course-prerequisites">
        <p className="prerequisite-note">
          <strong>📚 Prerequisites:</strong> This course builds upon <Link to="/courses/state-management" className="prerequisite-link">State Management</Link> and 
          <Link to="/courses/props-data-flow" className="prerequisite-link"> Props & Data Flow</Link>. 
          Understanding of functional components and basic hooks is recommended.
        </p>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <Link 
              to={`/courses/hooks-in-action/${lesson.id}`} 
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

export default HooksInActionOverview;