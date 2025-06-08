import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './CompoundComponents.css';

function CompoundComponents() {
	const [componentFamily, setComponentFamily] = useState([]);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [implicitConnections, setImplicitConnections] = useState([]);
	const [sharedState, setSharedState] = useState({});
	const [compositionPreview, setCompositionPreview] = useState(null);
	const [architectureLevel, setArchitectureLevel] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Add component to family
	const addToFamily = (component) => {
		if (!componentFamily.find(c => c.id === component.id)) {
			setComponentFamily([...componentFamily, component]);
			setArchitectureLevel(architectureLevel + 10);
		}
	};

	// Create implicit connection
	const createConnection = (parent, child) => {
		const connection = { parent, child, id: Date.now() };
		setImplicitConnections([...implicitConnections, connection]);
	};

	// Update shared state
	const updateSharedState = (key, value) => {
		setSharedState({
			...sharedState,
			[key]: value
		});
	};

	// Select pattern for exploration
	const selectPattern = (pattern) => {
		setSelectedPattern(pattern);
		if (pattern === 'tabs' || pattern === 'accordion' || pattern === 'select') {
			setArchitectureLevel(architectureLevel + 15);
		}
	};

	// Preview composition
	const previewComposition = (composition) => {
		setCompositionPreview(composition);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Compound Components</h1>
			<p className='lesson-subtitle'>
				Master the art of component families that work as one
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

			{/* Render the current chapter */}
			<Outlet
				context={{
					componentFamily,
					addToFamily,
					selectedPattern,
					selectPattern,
					implicitConnections,
					createConnection,
					sharedState,
					updateSharedState,
					compositionPreview,
					previewComposition,
					architectureLevel
				}}
			/>

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
				courseId='advanced-patterns'
				lessonId='compound-components'
			/>
		</div>
	);
}

export default CompoundComponents;