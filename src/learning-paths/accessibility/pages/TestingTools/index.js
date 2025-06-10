import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './TestingTools.css';

function TestingTools() {
	const [testingStrategy, setTestingStrategy] = useState('manual');
	const [automatedTools, setAutomatedTools] = useState({
		axe: false,
		wave: false,
		lighthouse: false,
		jest: false,
		cypress: false
	});
	const [testingChecklist, setTestingChecklist] = useState({
		keyboard: false,
		screenReader: false,
		colorContrast: false,
		focusIndicators: false,
		altText: false,
		headingStructure: false,
		formLabels: false,
		errorMessages: false
	});
	const [wcagLevel, setWcagLevel] = useState('AA');
	const [complianceScore, setComplianceScore] = useState(0);
	const [teamCulture, setTeamCulture] = useState({
		training: false,
		documentation: false,
		codeReviews: false,
		userTesting: false,
		cicd: false
	});
	const [testResults, setTestResults] = useState([]);
	const [auditFindings, setAuditFindings] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Run accessibility test
	const runAccessibilityTest = (tool) => {
		const result = {
			tool,
			timestamp: new Date().toISOString(),
			errors: Math.floor(Math.random() * 10),
			warnings: Math.floor(Math.random() * 15),
			passes: Math.floor(Math.random() * 50) + 50
		};
		setTestResults(prev => [...prev, result]);
		return result;
	};

	// Add audit finding
	const addAuditFinding = (finding) => {
		setAuditFindings(prev => [...prev, {
			...finding,
			id: Date.now(),
			timestamp: new Date().toISOString()
		}]);
	};

	// Calculate compliance score
	const calculateComplianceScore = () => {
		const checkedItems = Object.values(testingChecklist).filter(v => v).length;
		const totalItems = Object.keys(testingChecklist).length;
		const score = Math.round((checkedItems / totalItems) * 100);
		setComplianceScore(score);
		return score;
	};

	// Enable testing tool
	const enableTool = (tool) => {
		setAutomatedTools(prev => ({
			...prev,
			[tool]: true
		}));
	};

	// Update checklist item
	const updateChecklist = (item, value) => {
		setTestingChecklist(prev => ({
			...prev,
			[item]: value
		}));
		calculateComplianceScore();
	};

	// Build team culture
	const buildCulture = (aspect) => {
		setTeamCulture(prev => ({
			...prev,
			[aspect]: true
		}));
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Testing & Tools</h1>
				<p className='lesson-subtitle'>
					Learn accessibility testing, compliance standards, and build an inclusive development culture
				</p>
			</div>

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

			<Outlet
				context={{
					testingStrategy,
					setTestingStrategy,
					automatedTools,
					setAutomatedTools,
					testingChecklist,
					setTestingChecklist,
					wcagLevel,
					setWcagLevel,
					complianceScore,
					setComplianceScore,
					teamCulture,
					setTeamCulture,
					testResults,
					setTestResults,
					auditFindings,
					setAuditFindings,
					runAccessibilityTest,
					addAuditFinding,
					calculateComplianceScore,
					enableTool,
					updateChecklist,
					buildCulture
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
				courseId='accessibility'
				lessonId='testing-tools'
			/>
		</div>
	);
}

export default TestingTools;