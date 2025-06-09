import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './CiCdPipeline.css';

function CiCdPipeline() {
	const [automatedFlows, setAutomatedFlows] = useState([]);
	const [selectedPipeline, setSelectedPipeline] = useState(null);
	const [pipelineStatus, setPipelineStatus] = useState('idle');
	const [automationLevel, setAutomationLevel] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Create automated flow
	const createFlow = (flow) => {
		setAutomatedFlows([...automatedFlows, flow]);
		setAutomationLevel(prev => Math.min(100, prev + 20));
	};

	// Select pipeline
	const selectPipeline = (pipeline) => {
		setSelectedPipeline(pipeline);
	};

	// Update pipeline status
	const updateStatus = (status) => {
		setPipelineStatus(status);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>CI/CD Pipeline</h1>
				<p className='lesson-subtitle'>
					Navigate the Automation Harbor where code flows through automated gates to production
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
					automatedFlows,
					createFlow,
					selectedPipeline,
					selectPipeline,
					pipelineStatus,
					updateStatus,
					automationLevel,
					setAutomationLevel
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
				courseId='build-deploy'
				lessonId='ci-cd-pipeline'
			/>
		</div>
	);
}

export default CiCdPipeline;