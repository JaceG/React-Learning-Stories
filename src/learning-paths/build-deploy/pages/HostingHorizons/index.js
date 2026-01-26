import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './HostingHorizons.css';

function HostingHorizons() {
	const [visitedPlatforms, setVisitedPlatforms] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState(null);
	const [navigationSkill, setNavigationSkill] = useState('Explorer');
	const [globalReach, setGlobalReach] = useState(0);

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
			<LessonHeader
				title={`Hosting Horizons`}
				subtitle={`Explore the Platform Archipelago and choose the perfect destination for your applications`}
				opener={`The Platform Archipelago stretched across the digital horizon - hundreds of islands, each offering a different home for applications. Navigator Vercel stood at the helm of the exploration vessel. "Every application needs a home, Ambassador. But choosing the right platform is as important as building the application itself."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`build-deploy`}
				lessonId={`hosting-horizons`}
				totalChapters={3}
			/>
		</div>
	);
}

export default HostingHorizons;