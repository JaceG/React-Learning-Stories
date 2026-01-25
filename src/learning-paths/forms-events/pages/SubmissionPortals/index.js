import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './SubmissionPortals.css';

function SubmissionPortals() {
	const [portalState, setPortalState] = useState('idle');
	const [submissionProgress, setSubmissionProgress] = useState(0);
	const [submissionLog, setSubmissionLog] = useState([]);
	const [currentPhase, setCurrentPhase] = useState('');
	const [errorState, setErrorState] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const [optimizations, setOptimizations] = useState({
		debounce: false,
		throttle: false,
		optimisticUI: false,
		backgroundSync: false,
	});
	const [responseData, setResponseData] = useState(null);

	const activatePortal = () => {
		setPortalState('active');
		addLog('Portal activated', 'info');
	};

	const updateProgress = (progress, phase) => {
		setSubmissionProgress(progress);
		setCurrentPhase(phase);
		addLog(`Progress: ${progress}% - ${phase}`, 'info');
	};

	const addLog = (message, type = 'info') => {
		const entry = {
			message,
			type,
			timestamp: new Date().toLocaleTimeString(),
		};
		setSubmissionLog((prev) => [...prev.slice(-19), entry]);
	};

	const handleError = (error) => {
		setErrorState(error);
		setPortalState('error');
		addLog(`Error: ${error}`, 'error');
	};

	const retrySubmission = () => {
		setRetryCount((prev) => prev + 1);
		setErrorState(null);
		setPortalState('active');
		addLog(`Retry attempt #${retryCount + 1}`, 'warning');
	};

	const completeSubmission = (data) => {
		setPortalState('success');
		setResponseData(data);
		setSubmissionProgress(100);
		addLog('Submission successful!', 'success');
	};

	const resetPortal = () => {
		setPortalState('idle');
		setSubmissionProgress(0);
		setCurrentPhase('');
		setErrorState(null);
		setRetryCount(0);
		setResponseData(null);
		addLog('Portal reset', 'info');
	};

	const toggleOptimization = (key) => {
		setOptimizations((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
		addLog(`${key} ${optimizations[key] ? 'disabled' : 'enabled'}`, 'info');
	};

	return (
		<div className='lesson-container submission-portals-container'>
			<LessonHeader
				title='Submission Portals'
				subtitle='Master the final synthesis with Portal Keeper Sage'
				opener='At the heart of the Western Quarter stood the Submission Portal Gateway, a magnificent structure where all form data converged before traveling to distant servers. Aria and Binary approached the swirling vortex of energy, where Portal Keeper Sage awaited - ready to teach the final synthesis of the Forms & Events journey.'
				totalChapters={3}
			/>

			<Outlet
				context={{
					portalState,
					activatePortal,
					submissionProgress,
					updateProgress,
					submissionLog,
					addLog,
					currentPhase,
					errorState,
					handleError,
					retryCount,
					retrySubmission,
					completeSubmission,
					resetPortal,
					optimizations,
					toggleOptimization,
					responseData,
				}}
			/>

			<LessonFooter
				courseId='forms-events'
				lessonId='submission-portals'
				totalChapters={3}
			/>
		</div>
	);
}

export default SubmissionPortals;
