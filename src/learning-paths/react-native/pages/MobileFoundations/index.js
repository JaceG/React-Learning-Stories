import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './MobileFoundations.css';

function MobileFoundations() {
	const [translatedComponents, setTranslatedComponents] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState('ios');
	const [nativeSkill, setNativeSkill] = useState('Newcomer');
	const [frontierProgress, setFrontierProgress] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<div className='lesson-header'>
				<h1>Mobile Foundations</h1>
				<p className='lesson-subtitle'>
					Cross the border to the Mobile Frontier with Frontier Marshal Native
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
				courseId='react-native'
				lessonId='mobile-foundations'
			/>
		</div>
	);
}

export default MobileFoundations;