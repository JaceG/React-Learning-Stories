import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './PropForge.css';

function PropForge() {
  return (
    <div className='lesson-container prop-forge-container'>
      <LessonHeader
        title='The Prop Forge'
        subtitle='Learn the ancient arts of destructuring and transforming props with Master Smith Destructo'
        opener="Following Flux's directions, Aria and Binary climbed the winding path to the Industrial Quarter, where the rhythmic clanging of hammers on metal echoed through the streets. The Prop Forge stood at the district's heart - a massive workshop where raw props were refined, reshaped, and transformed into precisely what components needed."
        totalChapters={3}
      />

      <Outlet />

      <LessonFooter
        courseId='props-data-flow'
        lessonId='prop-forge'
        totalChapters={3}
      />
    </div>
  );
}

export default PropForge;