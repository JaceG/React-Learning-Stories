import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './BuildSystems.css';

function BuildSystems() {
	const [deploymentShips, setDeploymentShips] = useState([]);
	const [selectedVessel, setSelectedVessel] = useState(null);
	const [captainRank, setCaptainRank] = useState('Apprentice');
	const [fleetReadiness, setFleetReadiness] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<div className='lesson-header'>
				<h1>Build Systems</h1>
				<p className='lesson-subtitle'>
					Command the Deployment Armada and transform your code into production-ready vessels
				</p>
			</div>

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
				courseId='build-deploy'
				lessonId='build-systems'
			/>
		</div>
	);
}

export default BuildSystems;