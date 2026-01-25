import React from 'react';

/**
 * ChapterIntro - A consistent chapter introduction component
 *
 * @param {Object} props
 * @param {number} props.chapterNumber - The chapter number (1, 2, 3, etc.)
 * @param {string} props.title - The chapter title
 * @param {string} [props.bridge] - Optional transition text from previous chapter (typically for chapters 2+)
 */
const ChapterIntro = ({ chapterNumber, title, bridge }) => {
	return (
		<>
			<h2 className='chapter-title'>
				Chapter {chapterNumber}: {title}
			</h2>

			{bridge && (
				<div className='chapter-bridge'>
					<p>{bridge}</p>
				</div>
			)}
		</>
	);
};

export default ChapterIntro;
