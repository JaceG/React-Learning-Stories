import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './GrandContext.css';

function GrandContext() {
	return (
		<div className='lesson-container'>
			<LessonHeader
				title='The Grand Context'
				subtitle='Discover how Aria learns to share state across entire component trees without prop drilling'
				opener="Following Master Hooke's directions, Aria and Binary made their way to the Grand Hall - a magnificent structure at the heart of React Kingdom. Here, the Context Keepers maintained the invisible threads that connected components across vast distances, allowing them to share memories without passing props through every level."
				totalChapters={3}
			/>

			<Outlet />

			<LessonFooter
				courseId='state-management'
				lessonId='grand-context'
				totalChapters={3}
			/>
		</div>
	);
}

export default GrandContext;
