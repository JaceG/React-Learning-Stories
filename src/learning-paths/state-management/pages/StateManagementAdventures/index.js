import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './StateManagementAdventures.css';

function StateManagementAdventures() {
	return (
		<div className='lesson-container state-management-adventures'>
			<LessonHeader
				title='State Management Adventures'
				subtitle='Join Aria as she masters the art of combining all state management techniques into powerful applications'
				opener='The morning sun cast long shadows across React Kingdom as Aria stood before the State Management Citadel - a towering structure where all the state management disciplines converged. Here, she would face her final challenge: combining everything she had learned into a unified understanding of state management.'
				totalChapters={3}
			/>

			<Outlet />

			<LessonFooter
				courseId='state-management'
				lessonId='state-management-adventures'
				totalChapters={3}
			/>
		</div>
	);
}

export default StateManagementAdventures;
