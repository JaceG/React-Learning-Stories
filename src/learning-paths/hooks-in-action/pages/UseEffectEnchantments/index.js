import React from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './UseEffectEnchantments.css';

function UseEffectEnchantments() {
  return (
    <div className='lesson-container use-effect-enchantments-container'>
      <LessonHeader
        title='The useEffect Enchantments'
        subtitle='Master the art of side effects with the enigmatic Effect Sage'
        opener={`The Temporal Tower loomed before Aria - a spiraling structure where time seemed to flow differently at each level. Clock faces of various sizes ticked at different speeds along its walls. This was where the Academy taught its most mysterious hook: useEffect, the bridge between React's pure world and the chaotic realm of side effects.`}
        totalChapters={3}
      />

      {/* Render the current chapter */}
      <Outlet />

      <LessonFooter
        courseId='hooks-in-action'
        lessonId='use-effect-enchantments'
        totalChapters={3}
      />
    </div>
  );
}

export default UseEffectEnchantments;