import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './TestingTower.css';

function TestingTower() {
	const [currentTest, setCurrentTest] = useState(null);
	const [testResults, setTestResults] = useState([]);
	const [bugsCaught, setBugsCaught] = useState(0);
	const [testCoverage, setTestCoverage] = useState(0);
	const [protectedComponents, setProtectedComponents] = useState([]);

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
			<LessonHeader
				title={`The Testing Tower`}
				subtitle={`Build an impenetrable fortress of tests to protect your kingdom`}
				opener={`The optimized kingdom ran swiftly, but strange reports emerged. Components behaved unexpectedly, features broke without warning, and worst of all - bugs had begun manifesting as actual creatures throughout the realm. Aria descended into the Underground Realms, where the Testing Tower stood as the first line of defense against the chaos.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`testing-debugging`}
				lessonId={`testing-tower`}
				totalChapters={3}
			/>
		</div>
	);
}

export default TestingTower;