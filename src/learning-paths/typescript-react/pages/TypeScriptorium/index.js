import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './TypeScriptorium.css';

function TypeScriptorium() {
	const [typeSystem, setTypeSystem] = useState('inference');
	const [forgeMode, setForgeMode] = useState('basic');
	const [contractResults, setContractResults] = useState([]);
	const [typeErrors, setTypeErrors] = useState([]);
	const [compileStatus, setCompileStatus] = useState('idle');

	// Type Forge demonstration functions
	const forgeType = (input, expectedType) => {
		setCompileStatus('forging');
		
		setTimeout(() => {
			const isValid = validateType(input, expectedType);
			if (isValid) {
				setContractResults([...contractResults, { 
					input, 
					type: expectedType, 
					status: 'success' 
				}]);
				setCompileStatus('success');
			} else {
				setTypeErrors([...typeErrors, {
					message: `Type '${typeof input}' is not assignable to type '${expectedType}'`,
					line: contractResults.length + 1
				}]);
				setCompileStatus('error');
			}
		}, 1000);
	};

	const validateType = (value, expectedType) => {
		switch(expectedType) {
			case 'string':
				return typeof value === 'string';
			case 'number':
				return typeof value === 'number';
			case 'boolean':
				return typeof value === 'boolean';
			case 'array':
				return Array.isArray(value);
			default:
				return false;
		}
	};

	const clearForge = () => {
		setContractResults([]);
		setTypeErrors([]);
		setCompileStatus('idle');
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Type Forge`}
				subtitle={`Where Code Contracts Are Hammered Into Unbreakable Forms`}
				opener={`Deep beneath the React Kingdom, accessible only through the Cloud Citadel's lower passages, lay the Type Forge - a place of ancient power where code contracts were hammered into unbreakable forms. Master Typus, the Forge Keeper, greeted Aria with eyes that seemed to see through code to its very essence. "Ambassador Aria," he rumbled, his beard sparking with type annotations, "you've built great things, but they're held together by trust and hope. Here, we forge guarantees."`}
				totalChapters={3}
			/>

			<Outlet context={{
				typeSystem,
				setTypeSystem,
				forgeMode,
				setForgeMode,
				contractResults,
				typeErrors,
				compileStatus,
				forgeType,
				clearForge,
				setTypeErrors,
				setCompileStatus
			}} />

			<LessonFooter
				courseId={`typescript-react`}
				lessonId={`type-scriptorium`}
				totalChapters={3}
			/>
		</div>
	);
}

export default TypeScriptorium;