import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ValidationGuardians.css';

function ValidationGuardians() {
	const [fortressSecured, setFortressSecured] = useState(false);
	const [activeGates, setActiveGates] = useState({});
	const [wardRunes, setWardRunes] = useState({});
	const [defenseLog, setDefenseLog] = useState([]);
	const [guardianStance, setGuardianStance] = useState('defensive');
	const [validationStrategies, setValidationStrategies] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	const secureGate = (gateName, isSecure) => {
		setActiveGates({ ...activeGates, [gateName]: isSecure });
		logDefense(`Gate ${gateName}: ${isSecure ? 'Secured' : 'Breached'}`, isSecure);
	};

	const activateWardRune = (runeName) => {
		setWardRunes({ ...wardRunes, [runeName]: true });
		logDefense(`Ward ${runeName} activated`, true);
	};

	const logDefense = (message, success) => {
		const entry = {
			message,
			success,
			timestamp: new Date().toLocaleTimeString()
		};
		setDefenseLog(prev => [...prev.slice(-9), entry]);
	};

	const changeStance = (stance) => {
		setGuardianStance(stance);
		logDefense(`Guardian stance changed to: ${stance}`, true);
	};

	const addStrategy = (strategy) => {
		if (!validationStrategies.includes(strategy)) {
			setValidationStrategies([...validationStrategies, strategy]);
			logDefense(`New strategy deployed: ${strategy}`, true);
		}
	};

	const checkFortressSecurity = () => {
		const allGatesSecure = Object.values(activeGates).every(gate => gate === true);
		const hasWards = Object.keys(wardRunes).length >= 3;
		setFortressSecured(allGatesSecure && hasWards);
	};

	return (
		<div className='lesson-container validation-guardians-container'>
			<div className='lesson-opener'>
				<p>The Validation Fortress stood imposingly at the Western Quarter's edge, its walls 
				shimmering with protective runes. Aria and Binary approached the massive gates where 
				guards in crimson armor stood watch. "Hook Craftmaster Aria," one announced, "Commander 
				Validus has been expecting you. Your form validation innovations have reached even our 
				fortified walls."</p>
			</div>
			
			<h1 className='lesson-title'>Validation Guardians</h1>
			<p className='lesson-subtitle'>
				Command validation forces with Guardian Commander Validus
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

			<Outlet
				context={{
					fortressSecured,
					activeGates,
					secureGate,
					wardRunes,
					activateWardRune,
					defenseLog,
					logDefense,
					guardianStance,
					changeStance,
					validationStrategies,
					addStrategy,
					checkFortressSecurity
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
				courseId='forms-events'
				lessonId='validation-guardians'
			/>
		</div>
	);
}

export default ValidationGuardians;