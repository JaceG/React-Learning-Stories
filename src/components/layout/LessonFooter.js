import React from 'react';
import ChapterNavigation from './ChapterNavigation';
import LessonNavigation from './LessonNavigation';
import './Layout.css';

/**
 * LessonFooter - A consistent footer component for all lessons
 *
 * @param {Object} props
 * @param {string} props.courseId - The course ID for lesson navigation
 * @param {string} props.lessonId - The lesson ID for lesson navigation
 * @param {number} props.totalChapters - Total number of chapters in this lesson
 */
function LessonFooter({ courseId, lessonId, totalChapters = 3 }) {
	return (
		<div className='lesson-footer'>
			<ChapterNavigation totalChapters={totalChapters} />
			<LessonNavigation courseId={courseId} lessonId={lessonId} />
		</div>
	);
}

export default LessonFooter;
