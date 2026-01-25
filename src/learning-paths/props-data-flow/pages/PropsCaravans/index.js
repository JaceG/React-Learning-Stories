import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './PropsCaravans.css';

function PropsCaravans() {
  return (
    <div className='lesson-container props-caravans-container'>
      <LessonHeader
        title='The Props Caravans'
        subtitle="Join Aria as she learns the art of transporting data through React Kingdom's component network"
        opener='After mastering the complexities of state management, Aria found herself at the bustling Trade Quarter of React Kingdom. Here, colorful caravans lined the streets, loaded with precious cargo destined for workshops throughout the realm. The air buzzed with the energy of commerce and data exchange.'
        totalChapters={3}
      />

      <Outlet />

      <LessonFooter
        courseId='props-data-flow'
        lessonId='props-caravans'
        totalChapters={3}
      />
    </div>
  );
}

export default PropsCaravans;