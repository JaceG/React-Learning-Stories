import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>Guardian Gates</h1>
			<p className='lesson-subtitle'>
				Master the art of protecting routes with authentication and authorization
			</p>

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
				courseId='routing-navigation'
				lessonId='guardian-gates'
			/>
		</div>
	);
}

export default GuardianGates;