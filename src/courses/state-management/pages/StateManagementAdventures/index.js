import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './StateManagementAdventures.css';

function StateManagementAdventures() {
	const navigate = useNavigate();
	const location = useLocation();
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	return (
		<div className='lesson-container state-management-adventures'>
			<div className='lesson-opener'>
				<p>The morning sun cast long shadows across React Kingdom as Aria 
				stood before the State Management Citadel - a towering structure 
				where all the state management disciplines converged. Here, she would 
				face her final challenge: combining everything she'd learned into a 
				unified understanding of state management.</p>
			</div>

			<h1 className='lesson-title'>State Management Adventures</h1>
			<p className='lesson-subtitle'>
				Join Aria as she masters the art of combining all state management 
				techniques into powerful applications
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
				lessonId='state-management-adventures'
			/>
		</div>
	);
}

export default StateManagementAdventures;
