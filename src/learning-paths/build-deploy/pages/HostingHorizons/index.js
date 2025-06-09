import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './HostingHorizons.css';

function HostingHorizons() {
	const [visitedPlatforms, setVisitedPlatforms] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState(null);
	const [navigationSkill, setNavigationSkill] = useState('Explorer');
	const [globalReach, setGlobalReach] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Visit a platform
	const visitPlatform = (platform) => {
		if (!visitedPlatforms.find(p => p.id === platform.id)) {
			setVisitedPlatforms([...visitedPlatforms, platform]);
			setGlobalReach(prev => Math.min(100, prev + 25));
		}
		setSelectedPlatform(platform);
	};

	// Level up navigation skill
	const levelUpSkill = (newSkill) => {
		setNavigationSkill(newSkill);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Hosting Horizons</h1>
				<p className='lesson-subtitle'>
					Explore the Platform Archipelago and choose the perfect destination for your applications
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
					visitedPlatforms,
					visitPlatform,
					selectedPlatform,
					setSelectedPlatform,
					navigationSkill,
					levelUpSkill,
					globalReach,
					setGlobalReach
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
				lessonId='hosting-horizons'
			/>
		</div>
	);
}

export default HostingHorizons;