import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './MobileFoundations.css';

function MobileFoundations() {
	const [translatedComponents, setTranslatedComponents] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState('ios');
	const [nativeSkill, setNativeSkill] = useState('Newcomer');
	const [frontierProgress, setFrontierProgress] = useState(0);

	// Component translation handler
	const translateComponent = (webComponent) => {
		const translation = {
			id: Date.now(),
			web: webComponent.web,
			native: webComponent.native,
			platform: selectedPlatform
		};
		
		if (!translatedComponents.find(t => t.web === webComponent.web)) {
			setTranslatedComponents([...translatedComponents, translation]);
			setFrontierProgress(prev => Math.min(100, prev + 20));
		}
	};

	// Platform switch handler
	const switchPlatform = (platform) => {
		setSelectedPlatform(platform);
	};

	// Skill advancement
	const advanceSkill = (newSkill) => {
		setNativeSkill(newSkill);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Mobile Foundations`}
				subtitle={`Cross the border to the Mobile Frontier with Frontier Marshal Native`}
				opener={`Beyond the Web Kingdom's borders lay the Mobile Frontier - a vast territory where applications lived not in browsers but in the very devices people carried. Frontier Marshal Native stood at the border checkpoint, badge gleaming. "Welcome to familiar yet different territory, Captain Aria. Here, React's principles govern, but the land itself has different rules - no DOM, no CSS as you know it, but native performance and device capabilities beyond anything the browser can offer."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					translatedComponents,
					translateComponent,
					selectedPlatform,
					switchPlatform,
					nativeSkill,
					advanceSkill,
					frontierProgress,
					setFrontierProgress
				}}
			/>

			<LessonFooter
				courseId='react-native'
				lessonId='mobile-foundations'
			/>
		</div>
	);
}

export default MobileFoundations;