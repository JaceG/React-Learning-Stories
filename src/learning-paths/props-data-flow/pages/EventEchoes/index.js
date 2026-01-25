import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './EventEchoes.css';

function EventEchoes() {
  return (
    <div className='lesson-container event-echoes-container'>
      <LessonHeader
        title='The Event Echoes'
        subtitle='Master the art of upward communication through callback functions'
        opener='Leaving the industrial heat of the Prop Forge behind, Aria and Binary followed a winding path into the mountains. The air grew cool and thin, and soon they heard it - a haunting symphony of echoes bouncing off cavern walls. The Echo Caves lay ahead, where the final secret of data flow awaited.'
        totalChapters={3}
      />

      <Outlet />

      <LessonFooter
        courseId='props-data-flow'
        lessonId='event-echoes'
        totalChapters={3}
      />
    </div>
  );
}

export default EventEchoes;