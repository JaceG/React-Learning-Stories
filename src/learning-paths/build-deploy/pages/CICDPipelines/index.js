import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './CICDPipelines.css';

function CiCdPipeline() {
	const [automatedFlows, setAutomatedFlows] = useState([]);
	const [selectedPipeline, setSelectedPipeline] = useState(null);
	const [pipelineStatus, setPipelineStatus] = useState('idle');
	const [automationLevel, setAutomationLevel] = useState(0);

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
			<LessonHeader
				title={`CI/CD Pipeline`}
				subtitle={`Navigate the Automation Harbor where code flows through automated gates to production`}
				opener={`Beyond the Optimization Shipyard lay the Automation Harbor, where Captain Pipeline commanded an army of automated workers. "Manual deployments are relics of the past," the Captain declared, watching as code flowed through glowing channels. "Here, we build pipelines that never sleep, never forget, and never make human errors."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`build-deploy`}
				lessonId={`ci-cd-pipeline`}
				totalChapters={3}
			/>
		</div>
	);
}

export default CiCdPipeline;