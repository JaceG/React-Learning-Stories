import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './TestingTower.css';

function TestingTower() {
	const [currentTest, setCurrentTest] = useState(null);
	const [testResults, setTestResults] = useState([]);
	const [bugsCaught, setBugsCaught] = useState(0);
	const [testCoverage, setTestCoverage] = useState(0);
	const [protectedComponents, setProtectedComponents] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Test execution handlers
	const runTest = (testName) => {
		setCurrentTest(testName);
		const result = {
			name: testName,
			status: Math.random() > 0.3 ? 'pass' : 'fail',
			time: Math.floor(Math.random() * 100) + 50
		};
		setTestResults([...testResults, result]);
		if (result.status === 'pass') {
			setBugsCaught(bugsCaught + 1);
		}
	};

	// Coverage handlers
	const updateCoverage = (component) => {
		if (!protectedComponents.includes(component)) {
			setProtectedComponents([...protectedComponents, component]);
			setTestCoverage(Math.min(100, testCoverage + 20));
		}
	};

	// Bug detection
	const detectBug = () => {
		return {
			type: ['null-pointer', 'type-error', 'logic-error'][Math.floor(Math.random() * 3)],
			severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
		};
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Testing Tower</h1>
			<p className='lesson-subtitle'>
				Build an impenetrable fortress of tests to protect your kingdom
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
					currentTest,
					runTest,
					testResults,
					bugsCaught,
					testCoverage,
					updateCoverage,
					protectedComponents,
					detectBug
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
				lessonId='testing-tower'
			/>
		</div>
	);
}

export default TestingTower;