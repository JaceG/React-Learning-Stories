import React from 'react';
import ChapterNavigation from './ChapterNavigation';
import './Layout.css';

/**
 * LessonHeader - A consistent header component for all lessons
 *
 * @param {Object} props
 * @param {string} props.title - The lesson title (e.g., "The JSX Magic Scrolls")
 * @param {string} props.subtitle - The lesson subtitle (e.g., "A story about the magical syntax...")
 * @param {string|React.ReactNode} props.opener - The lesson opener narrative text
 * @param {number} props.totalChapters - Total number of chapters in this lesson
 */
function LessonHeader({ title, subtitle, opener, totalChapters = 3 }) {
	return (
		<div className='lesson-header'>
			{opener && (
				<div className='lesson-opener'>
					{typeof opener === 'string' ? <p>{opener}</p> : opener}
				</div>
			)}

			<h1 className='lesson-title'>{title}</h1>
			{subtitle && <p className='lesson-subtitle'>{subtitle}</p>}

			<ChapterNavigation totalChapters={totalChapters} />
		</div>
	);
}

export default LessonHeader;
