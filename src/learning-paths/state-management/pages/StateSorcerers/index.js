import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './StateSorcerers.css';

function StateSorcerers() {
	return (
		<div className='lesson-container'>
			<LessonHeader
				title='The State Sorcerers'
				subtitle='Aria journeys to the Eastern Quarter to meet the legendary State Sorcerers, who will teach her how to give components memory and the power to change over time.'
				opener='The morning after her training with Chronos, Aria set out eastward as the sun painted the React Kingdom in golden hues. The Eastern Quarter was known for its towering crystal spires, each one pulsing with stored memories and dynamic energy. This was where the State Sorcerers practiced their ancient craft - giving components the ability to remember and respond.'
				totalChapters={3}
			/>

			<Outlet />

			<LessonFooter
				courseId='state-management'
				lessonId='state-sorcerers'
				totalChapters={3}
			/>
		</div>
	);
}

export default StateSorcerers;
