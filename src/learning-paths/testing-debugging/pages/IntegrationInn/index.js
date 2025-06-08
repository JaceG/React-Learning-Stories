import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './IntegrationInn.css';

function IntegrationInn() {
	const [connectedComponents, setConnectedComponents] = useState([]);
	const [integrationTests, setIntegrationTests] = useState([]);
	const [componentConflicts, setComponentConflicts] = useState([]);
	const [mockServices, setMockServices] = useState({});
	const [harmonyLevel, setHarmonyLevel] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Integration handlers
	const connectComponents = (comp1, comp2) => {
		const connection = `${comp1}-${comp2}`;
		if (!connectedComponents.includes(connection)) {
			setConnectedComponents([...connectedComponents, connection]);
			setHarmonyLevel(harmonyLevel + 10);
		}
	};

	// Add integration test
	const addIntegrationTest = (test) => {
		setIntegrationTests([...integrationTests, test]);
		// Check for conflicts
		if (test.type === 'state-conflict') {
			setComponentConflicts([...componentConflicts, test]);
		}
	};

	// Mock service creation
	const createMockService = (serviceName, response) => {
		setMockServices({
			...mockServices,
			[serviceName]: response
		});
	};

	// Resolve conflicts
	const resolveConflict = (conflictId) => {
		setComponentConflicts(componentConflicts.filter(c => c.id !== conflictId));
		setHarmonyLevel(harmonyLevel + 15);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Integration Inn</h1>
			<p className='lesson-subtitle'>
				Where components meet and learn to work together harmoniously
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
					connectedComponents,
					connectComponents,
					integrationTests,
					addIntegrationTest,
					componentConflicts,
					resolveConflict,
					mockServices,
					createMockService,
					harmonyLevel
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
				courseId='testing-debugging'
				lessonId='integration-inn'
			/>
		</div>
	);
}

export default IntegrationInn;