import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './DataRivers.css';

function DataRivers() {
  return (
    <div className='lesson-container data-rivers-container'>
      <LessonHeader
        title='The Data Rivers'
        subtitle='Navigate the one-way flow of information with Aria and River Master Flux'
        opener="Following Propius's directions, Aria and Binary made their way to the Cascade District, where the sound of rushing water grew louder with each step. Here, crystal-clear rivers flowed through the kingdom, carrying not water, but streams of pure data between the component settlements."
        totalChapters={3}
      />

      <Outlet />

      <LessonFooter
        courseId='props-data-flow'
        lessonId='data-rivers'
        totalChapters={3}
      />
    </div>
  );
}

export default DataRivers;