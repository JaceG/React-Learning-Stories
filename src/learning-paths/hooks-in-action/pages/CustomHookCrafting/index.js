import React from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './CustomHookCrafting.css';

function CustomHookCrafting() {
  return (
    <div className='lesson-container custom-hook-crafting-container'>
      <LessonHeader
        title='Custom Hook Crafting'
        subtitle='Forge your own hooks with Master Artificer Compose'
        opener='The Synthesis Workshop occupied an entire floor of the Hooks Academy, filled with workbenches where students crafted their own magical artifacts. Glowing blueprints floated above each station, showing hook patterns being assembled and tested. This was where React developers transcended from users to creators of hooks.'
        totalChapters={3}
      />

      {/* Render the current chapter */}
      <Outlet />

      <LessonFooter
        courseId='hooks-in-action'
        lessonId='custom-hook-crafting'
        totalChapters={3}
      />
    </div>
  );
}

export default CustomHookCrafting;