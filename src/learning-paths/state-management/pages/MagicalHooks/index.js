import React from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './MagicalHooks.css';

function MagicalHooks() {
	return (
		<div className='lesson-container'>
			<LessonHeader
				title='The Magical Hooks'
				subtitle='Join Aria as she discovers the specialized hooks that unlock advanced component capabilities'
				opener='After her enlightening day with Memnon and the State Sorcerers, Aria arrived at the legendary Hook Forge - a massive workshop where master crafters created the special tools that gave React components their extraordinary powers. The air hummed with magical energy, and apprentices hurried between glowing workstations.'
				totalChapters={3}
			/>

			<Outlet />

			<LessonFooter
				courseId='state-management'
				lessonId='magical-hooks'
				totalChapters={3}
			/>
		</div>
	);
}

export default MagicalHooks;
