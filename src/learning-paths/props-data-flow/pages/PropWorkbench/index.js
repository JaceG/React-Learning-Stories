import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './PropWorkbench.css';

function PropWorkbench() {
  return (
    <div className='lesson-container prop-workbench-container'>
      <LessonHeader
        title='The Prop Workbench'
        subtitle='Learn the ancient arts of destructuring and transforming props with Master Craftsman Destructo'
        opener="Following Flux's directions, Aria and Binary climbed the winding path to the Industrial Quarter, where the rhythmic clanging of hammers on metal echoed through the streets. The Prop Workbench stood at the district's heart - a massive workshop where raw props were refined, reshaped, and transformed into precisely what components needed."
        totalChapters={3}
      />

      <Outlet />

      <LessonFooter
        courseId='props-data-flow'
        lessonId='prop-workbench'
        totalChapters={3}
      />
    </div>
  );
}

export default PropWorkbench;