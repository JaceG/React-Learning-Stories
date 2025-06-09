import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './TypeForge.css';

function TypeForge() {
	const [typeSystem, setTypeSystem] = useState('inference');
	const [forgeMode, setForgeMode] = useState('basic');
	const [contractResults, setContractResults] = useState([]);
	const [typeErrors, setTypeErrors] = useState([]);
	const [compileStatus, setCompileStatus] = useState('idle');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Type Forge demonstration functions
	const forgeType = (input, expectedType) => {
		setCompileStatus('forging');
		
		setTimeout(() => {
			const isValid = validateType(input, expectedType);
			if (isValid) {
				setContractResults([...contractResults, { 
					input, 
					type: expectedType, 
					status: 'success' 
				}]);
				setCompileStatus('success');
			} else {
				setTypeErrors([...typeErrors, {
					message: `Type '${typeof input}' is not assignable to type '${expectedType}'`,
					line: contractResults.length + 1
				}]);
				setCompileStatus('error');
			}
		}, 1000);
	};

	const validateType = (value, expectedType) => {
		switch(expectedType) {
			case 'string':
				return typeof value === 'string';
			case 'number':
				return typeof value === 'number';
			case 'boolean':
				return typeof value === 'boolean';
			case 'array':
				return Array.isArray(value);
			default:
				return false;
		}
	};

	const clearForge = () => {
		setContractResults([]);
		setTypeErrors([]);
		setCompileStatus('idle');
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Type Forge</h1>
			<p className='lesson-subtitle'>
				Where Code Contracts Are Hammered Into Unbreakable Forms
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

			<Outlet context={{
				typeSystem,
				setTypeSystem,
				forgeMode,
				setForgeMode,
				contractResults,
				typeErrors,
				compileStatus,
				forgeType,
				clearForge,
				setTypeErrors,
				setCompileStatus
			}} />

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
				courseId='typescript-react'
				lessonId='type-forge'
			/>
		</div>
	);
}

export default TypeForge;