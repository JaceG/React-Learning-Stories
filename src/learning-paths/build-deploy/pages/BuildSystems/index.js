import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './BuildSystems.css';

function BuildSystems() {
	const [deploymentShips, setDeploymentShips] = useState([]);
	const [selectedVessel, setSelectedVessel] = useState(null);
	const [captainRank, setCaptainRank] = useState('Apprentice');
	const [fleetReadiness, setFleetReadiness] = useState(0);

	// Prepare a deployment ship
	const prepareShip = (ship) => {
		setDeploymentShips([...deploymentShips, ship]);
		setFleetReadiness(prev => Math.min(100, prev + 15));
	};

	// Select a vessel for deployment
	const selectVessel = (vessel) => {
		setSelectedVessel(vessel);
	};

	// Promote captain rank
	const promoteRank = (newRank) => {
		setCaptainRank(newRank);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Build Systems`}
				subtitle={`Command the Deployment Armada and transform your code into production-ready vessels`}
				opener={`The Deployment Armada Docks bustled with activity as ships of all sizes prepared to carry applications across the digital seas to Production Island. Admiral Webpack, commander of the fleet, stood on the command deck reviewing manifests. "Ambassador Aria! Your applications are powerful, but they're still in the kingdom. Time to learn the art of deployment."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					deploymentShips,
					prepareShip,
					selectedVessel,
					selectVessel,
					captainRank,
					promoteRank,
					fleetReadiness,
					setFleetReadiness
				}}
			/>

			<LessonFooter
				courseId={`build-deploy`}
				lessonId={`build-systems`}
				totalChapters={3}
			/>
		</div>
	);
}

export default BuildSystems;