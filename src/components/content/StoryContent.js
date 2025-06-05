import React from 'react';
import './Content.css';

// Component to display story content
function StoryContent({ content }) {
	return (
		<div className="story-content">
			{content}
		</div>
	);
}

export default StoryContent;
