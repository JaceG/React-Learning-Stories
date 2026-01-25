import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './GuardianGates.css';

function GuardianGates() {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		currentStep: 0
	});
	const [roleGates, setRoleGates] = useState({});
	const [gateStatuses, setGateStatuses] = useState({});
	const [redirectPath, setRedirectPath] = useState(null);
	const [guardianState, setGuardianState] = useState({
		public: true,
		merchant: false,
		academy: false,
		royal: false
	});
	const [attemptedEntries, setAttemptedEntries] = useState([]);

	// Authentication functions
	const handleLogin = (credentials) => {
		setAuthState({
			isAuthenticated: true,
			user: credentials,
			currentStep: 5
		});
		if (redirectPath) {
			// Simulate returning to original destination
			setRedirectPath(null);
		}
	};

	const handleLogout = () => {
		setAuthState({
			isAuthenticated: false,
			user: null,
			currentStep: 0
		});
	};

	const checkPermission = (permission) => {
		if (!authState.user) return false;
		return authState.user.permissions?.includes(permission) || false;
	};

	const handleGateCheck = (gateId, accessLevel) => {
		const attempt = {
			gate: gateId,
			accessLevel,
			timestamp: new Date().toISOString(),
			success: false
		};

		// Check access based on gate requirements
		const gateRequirements = {
			public: () => true,
			merchant: () => ['merchant', 'royal'].includes(accessLevel),
			academy: () => ['student', 'teacher', 'royal'].includes(accessLevel),
			royal: () => accessLevel === 'royal'
		};

		if (gateRequirements[gateId]) {
			const hasAccess = gateRequirements[gateId]();
			attempt.success = hasAccess;
			
			setGuardianState(prev => ({
				...prev,
				[gateId]: hasAccess
			}));
		}

		setAttemptedEntries(prev => [...prev, attempt]);
		return attempt.success;
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title='Guardian Gates'
				subtitle='Master the art of protecting routes with authentication and authorization'
				opener='Marina led Aria to the Navigation Corps training grounds, where advanced security patterns were taught. Here, she would learn how to protect routes with authentication and authorization - securing the most sensitive areas of React applications.'
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					authState,
					handleLogin,
					handleLogout,
					redirectPath,
					setRedirectPath,
					roleGates,
					setRoleGates,
					checkPermission,
					gateStatuses,
					setGateStatuses,
					guardianState,
					setGuardianState,
					handleGateCheck,
					attemptedEntries,
					setAttemptedEntries
				}}
			/>

			<LessonFooter
				courseId='routing-navigation'
				lessonId='guardian-gates'
				totalChapters={3}
			/>
		</div>
	);
}

export default GuardianGates;