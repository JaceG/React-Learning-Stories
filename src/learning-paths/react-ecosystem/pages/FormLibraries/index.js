import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './FormLibraries.css';

function FormLibraries() {
	const [selectedLibrary, setSelectedLibrary] = useState(null);
	const [comparisonMode, setComparisonMode] = useState(false);
	const [implementedForms, setImplementedForms] = useState([]);
	const [federationProgress, setFederationProgress] = useState(0);

	// Library selection
	const selectLibrary = (library) => {
		setSelectedLibrary(library);
		setFederationProgress(federationProgress + 25);
	};

	// Add implemented form
	const addImplementedForm = (formType) => {
		if (!implementedForms.includes(formType)) {
			setImplementedForms([...implementedForms, formType]);
		}
	};

	// Toggle comparison mode
	const toggleComparison = () => {
		setComparisonMode(!comparisonMode);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Form Libraries`}
				subtitle={`Join the Form Federation and master advanced form solutions`}
				opener={`The Federal Form Chancellor welcomed Aria to the Form Federation headquarters. "Ambassador Aria, you've mastered basic React forms, but complex applications demand more." The grand hall displayed holographic forms of increasing complexity - multi-step wizards, dynamic field arrays, real-time validation, and conditional logic that would make any developer's head spin.`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					selectedLibrary,
					selectLibrary,
					comparisonMode,
					toggleComparison,
					implementedForms,
					addImplementedForm,
					federationProgress,
					setFederationProgress
				}}
			/>

			<LessonFooter
				courseId={`react-ecosystem`}
				lessonId={`form-libraries`}
				totalChapters={3}
			/>
		</div>
	);
}

export default FormLibraries;