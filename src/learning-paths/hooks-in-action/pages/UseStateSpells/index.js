import React from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './UseStateSpells.css';

function UseStateSpells() {
  return (
    <div className='lesson-container use-state-spells-container'>
      <LessonHeader
        title='The useState Spells'
        subtitle='Learn the fundamental hook spell with Professor Hooksworth'
        opener={`The Hooks Academy stood as a modern marvel - a gleaming tower of glass and steel that seemed to defy the traditional stone architecture of React Kingdom. As Aria approached with Binary, holographic runes floated in the air, demonstrating various hook patterns. This was where React's most advanced magic was taught, where functional components gained powers once reserved for classes.`}
        totalChapters={3}
      />

      {/* Render the current chapter */}
      <Outlet />

      <LessonFooter
        courseId='hooks-in-action'
        lessonId='use-state-spells'
        totalChapters={3}
      />
    </div>
  );
}

export default UseStateSpells;