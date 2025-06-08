import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './MagicalHooks.css';

function MagicalHooks() {
	const navigate = useNavigate();
	const location = useLocation();
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-opener'>
				<p>After her enlightening day with Memnon and the State Sorcerers, 
				Aria arrived at the legendary Hook Forge - a massive workshop where 
				master crafters created the special tools that gave React components 
				their extraordinary powers. The air hummed with magical energy, and 
				apprentices hurried between glowing workstations.</p>
			</div>

			<h1 className='lesson-title'>The Magical Hooks</h1>
			<p className='lesson-subtitle'>
				Join Aria as she discovers the specialized hooks that unlock 
				advanced component capabilities
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<Outlet />

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='state-management'
				lessonId='magical-hooks'
			/>
		</div>
	);
}

export default MagicalHooks;
