import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ErrorEnchantments.css';

function ErrorEnchantments() {
	const [errorSpells, setErrorSpells] = useState([]);
	const [capturedErrors, setCapturedErrors] = useState([]);
	const [errorBoundaries, setErrorBoundaries] = useState([]);
	const [fallbackStrategies, setFallbackStrategies] = useState({});
	const [errorLogbook, setErrorLogbook] = useState([]);
	const [protectionLevel, setProtectionLevel] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Error handling functions
	const captureError = (error) => {
		setCapturedErrors([...capturedErrors, error]);
		setProtectionLevel(protectionLevel + 10);
		
		// Log the error
		logError({
			id: Date.now(),
			error: error,
			timestamp: new Date().toISOString(),
			handled: true
		});
	};

	// Create error boundary
	const createErrorBoundary = (boundary) => {
		setErrorBoundaries([...errorBoundaries, boundary]);
		setProtectionLevel(protectionLevel + 15);
	};

	// Add fallback strategy
	const addFallbackStrategy = (component, strategy) => {
		setFallbackStrategies({
			...fallbackStrategies,
			[component]: strategy
		});
	};

	// Learn error spell
	const learnErrorSpell = (spell) => {
		if (!errorSpells.find(s => s.id === spell.id)) {
			setErrorSpells([...errorSpells, spell]);
			setProtectionLevel(protectionLevel + 20);
		}
	};

	// Log error to the logbook
	const logError = (errorEntry) => {
		setErrorLogbook([...errorLogbook, errorEntry]);
	};

	// Handle error recovery
	const recoverFromError = (errorId) => {
		const error = capturedErrors.find(e => e.id === errorId);
		if (error) {
			setCapturedErrors(capturedErrors.filter(e => e.id !== errorId));
			logError({
				id: Date.now(),
				error: error,
				timestamp: new Date().toISOString(),
				handled: true,
				recovered: true
			});
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Error Enchantments</h1>
			<p className='lesson-subtitle'>
				Master the art of error handling and graceful failure recovery
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
					errorSpells,
					learnErrorSpell,
					capturedErrors,
					captureError,
					errorBoundaries,
					createErrorBoundary,
					fallbackStrategies,
					addFallbackStrategy,
					errorLogbook,
					logError,
					recoverFromError,
					protectionLevel
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
				lessonId='error-enchantments'
			/>
		</div>
	);
}

export default ErrorEnchantments;