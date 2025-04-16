import React from 'react';
import { Navigate } from 'react-router-dom';
import './Content.css';

// This component now just redirects to the new structure
function StoryContent() {
	return <Navigate to='/courses/components-basics' replace />;
}

export default StoryContent;
