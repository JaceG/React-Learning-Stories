import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './IntegrationInn.css';

function IntegrationInn() {
	const [connectedComponents, setConnectedComponents] = useState([]);
	const [integrationTests, setIntegrationTests] = useState([]);
	const [componentConflicts, setComponentConflicts] = useState([]);
	const [mockServices, setMockServices] = useState({});
	const [harmonyLevel, setHarmonyLevel] = useState(0);

	// Integration handlers
	const connectComponents = (comp1, comp2) => {
		const connection = `${comp1}-${comp2}`;
		if (!connectedComponents.includes(connection)) {
			setConnectedComponents([...connectedComponents, connection]);
			setHarmonyLevel(harmonyLevel + 10);
		}
	};

	// Add integration test
	const addIntegrationTest = (test) => {
		setIntegrationTests([...integrationTests, test]);
		// Check for conflicts
		if (test.type === 'state-conflict') {
			setComponentConflicts([...componentConflicts, test]);
		}
	};

	// Mock service creation
	const createMockService = (serviceName, response) => {
		setMockServices({
			...mockServices,
			[serviceName]: response
		});
	};

	// Resolve conflicts
	const resolveConflict = (conflictId) => {
		setComponentConflicts(componentConflicts.filter(c => c.id !== conflictId));
		setHarmonyLevel(harmonyLevel + 15);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Integration Inn`}
				subtitle={`Where components meet and learn to work together harmoniously`}
				opener={`The Integration Inn was where components from different parts of the kingdom came together. A warm, welcoming place where formerly isolated components learned to work in harmony. Innkeeper Cypress welcomed Aria warmly, his weathered face showing years of experience. "Individual components may work perfectly alone, but put them together..." He gestured to the bar where two components were already in conflict.`}
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					connectedComponents,
					connectComponents,
					integrationTests,
					addIntegrationTest,
					componentConflicts,
					resolveConflict,
					mockServices,
					createMockService,
					harmonyLevel
				}}
			/>

			<LessonFooter
				courseId={`testing-debugging`}
				lessonId={`integration-inn`}
				totalChapters={3}
			/>
		</div>
	);
}

export default IntegrationInn;