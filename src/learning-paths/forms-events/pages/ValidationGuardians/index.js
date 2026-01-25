import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './ValidationGuardians.css';

function ValidationGuardians() {
	const [fortressSecured, setFortressSecured] = useState(false);
	const [activeGates, setActiveGates] = useState({});
	const [wardRunes, setWardRunes] = useState({});
	const [defenseLog, setDefenseLog] = useState([]);
	const [guardianStance, setGuardianStance] = useState('defensive');
	const [validationStrategies, setValidationStrategies] = useState([]);

	const secureGate = (gateName, isSecure) => {
		setActiveGates({ ...activeGates, [gateName]: isSecure });
		logDefense(
			`Gate ${gateName}: ${isSecure ? 'Secured' : 'Breached'}`,
			isSecure
		);
	};

	const activateWardRune = (runeName) => {
		setWardRunes({ ...wardRunes, [runeName]: true });
		logDefense(`Ward ${runeName} activated`, true);
	};

	const logDefense = (message, success) => {
		const entry = {
			message,
			success,
			timestamp: new Date().toLocaleTimeString(),
		};
		setDefenseLog((prev) => [...prev.slice(-9), entry]);
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
		const allGatesSecure = Object.values(activeGates).every(
			(gate) => gate === true
		);
		const hasWards = Object.keys(wardRunes).length >= 3;
		setFortressSecured(allGatesSecure && hasWards);
	};

	return (
		<div className='lesson-container validation-guardians-container'>
			<LessonHeader
				title='Validation Guardians'
				subtitle='Command validation forces with Guardian Commander Validus'
				opener={`The Validation Fortress stood imposingly at the Western Quarter's edge, its walls shimmering with protective runes. Aria and Binary approached the massive gates where guards in crimson armor stood watch. "Aria," one announced, "Commander Validus has been expecting you. Your systematic approach to optimization has reached even our fortified walls."`}
				totalChapters={3}
			/>

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
					checkFortressSecurity,
				}}
			/>

			<LessonFooter
				courseId='forms-events'
				lessonId='validation-guardians'
				totalChapters={3}
			/>
		</div>
	);
}

export default ValidationGuardians;
