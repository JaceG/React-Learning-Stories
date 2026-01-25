import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

/**
 * ChapterNavigation - Navigation buttons for moving between chapters
 *
 * @param {Object} props
 * @param {number} props.totalChapters - Total number of chapters in this lesson
 */
function ChapterNavigation({ totalChapters = 3 }) {
	const navigate = useNavigate();
	const location = useLocation();
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	return (
		<div className='chapter-navigation'>
			<button
				onClick={() => goToChapter(currentChapter - 1)}
				disabled={currentChapter === 1}
				className='chapter-nav-button'>
				← Previous Chapter
			</button>
			<span className='chapter-indicator'>
				Chapter {currentChapter} of {totalChapters}
			</span>
			<button
				onClick={() => goToChapter(currentChapter + 1)}
				disabled={currentChapter === totalChapters}
				className='chapter-nav-button'>
				Next Chapter →
			</button>
		</div>
	);
}

export default ChapterNavigation;
