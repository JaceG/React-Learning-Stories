import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './CompoundComponents.css';

function CompoundComponents() {
	const [componentFamily, setComponentFamily] = useState([]);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [implicitConnections, setImplicitConnections] = useState([]);
	const [sharedState, setSharedState] = useState({});
	const [compositionPreview, setCompositionPreview] = useState(null);
	const [architectureLevel, setArchitectureLevel] = useState(0);

	// Add component to family
	const addToFamily = (component) => {
		if (!componentFamily.find(c => c.id === component.id)) {
			setComponentFamily([...componentFamily, component]);
			setArchitectureLevel(architectureLevel + 10);
		}
	};

	// Create implicit connection
	const createConnection = (parent, child) => {
		const connection = { parent, child, id: Date.now() };
		setImplicitConnections([...implicitConnections, connection]);
	};

	// Update shared state
	const updateSharedState = (key, value) => {
		setSharedState({
			...sharedState,
			[key]: value
		});
	};

	// Select pattern for exploration
	const selectPattern = (pattern) => {
		setSelectedPattern(pattern);
		if (pattern === 'tabs' || pattern === 'accordion' || pattern === 'select') {
			setArchitectureLevel(architectureLevel + 15);
		}
	};

	// Preview composition
	const previewComposition = (composition) => {
		setCompositionPreview(composition);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Compound Components`}
				subtitle={`Master the art of component families that work as one`}
				opener={`A golden scroll arrived at Aria's quarters, sealed with the mark of the Architect's Academy. The message was brief but momentous: "Guide Aria, your mastery of React's fundamentals, performance, and quality has not gone unnoticed." The Architect's Academy floated above the kingdom - a crystalline structure that seemed to shift and reconfigure itself constantly. Dean Architectus greeted Aria at the entrance. "Welcome. Here we teach not just how to build components, but how to compose them into elegant architectures."`}
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					componentFamily,
					addToFamily,
					selectedPattern,
					selectPattern,
					implicitConnections,
					createConnection,
					sharedState,
					updateSharedState,
					compositionPreview,
					previewComposition,
					architectureLevel
				}}
			/>

			<LessonFooter
				courseId={`advanced-patterns`}
				lessonId={`compound-components`}
				totalChapters={3}
			/>
		</div>
	);
}

export default CompoundComponents;