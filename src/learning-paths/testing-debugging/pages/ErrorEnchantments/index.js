import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './ErrorEnchantments.css';

function ErrorEnchantments() {
	const [errorSpells, setErrorSpells] = useState([]);
	const [capturedErrors, setCapturedErrors] = useState([]);
	const [errorBoundaries, setErrorBoundaries] = useState([]);
	const [fallbackStrategies, setFallbackStrategies] = useState({});
	const [errorLogbook, setErrorLogbook] = useState([]);
	const [protectionLevel, setProtectionLevel] = useState(0);

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
			<LessonHeader
				title={`Error Enchantments`}
				subtitle={`Master the art of error handling and graceful failure recovery`}
				opener={`After mastering integration testing at the Inn, Aria arrived at the Error Enchantments sanctuary. This mystical place was unlike anything she'd seen - errors floated in the air like glowing orbs, each containing dangerous power. Guardian Safiya welcomed her with a knowing smile. "Welcome to where we turn chaos into control. Here, errors aren't enemies - they're teachers."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`testing-debugging`}
				lessonId={`error-enchantments`}
				totalChapters={3}
			/>
		</div>
	);
}

export default ErrorEnchantments;