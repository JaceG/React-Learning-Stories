import React from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './HookPatternMastery.css';

function HookPatternMastery() {
  return (
    <div className='lesson-container hook-pattern-mastery-container'>
      <LessonHeader
        title='Hook Pattern Mastery'
        subtitle='Weave hooks into powerful patterns with Pattern Weaver Synthesis'
        opener='At the apex of the Hooks Academy stood the Integration Sanctum - a spherical chamber where all hook knowledge converged. Energy streams from every workshop and tower flowed here, creating intricate patterns in the air. This was where students learned to weave individual hooks into masterful patterns that could handle any challenge.'
        totalChapters={3}
      />

      {/* Render the current chapter */}
      <Outlet />

      <LessonFooter
        courseId='hooks-in-action'
        lessonId='hook-pattern-mastery'
        totalChapters={3}
      />
    </div>
  );
}

export default HookPatternMastery;