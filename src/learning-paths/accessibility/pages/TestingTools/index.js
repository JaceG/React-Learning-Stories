import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
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
			<LessonHeader
				title={`Testing & Tools`}
				subtitle={`Learn accessibility testing, compliance standards, and build an inclusive development culture`}
				opener={`The Testing Tower rose from the heart of the Accessibility Kingdom, its many windows glowing with the light of verification tools. Master Validator stood at the entrance, a clipboard in one hand and a magnifying glass in the other. "Welcome, travelers! Every component you've built, every interaction you've designed - they all must pass through the Testing Tower. But testing isn't about finding fault - it's about ensuring everyone can experience what you've created." She gestured to the tower's many levels. "Automated tools, compliance standards, and the most important ingredient: a culture that values inclusion."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='accessibility'
				lessonId='testing-tools'
			/>
		</div>
	);
}

export default TestingTools;
