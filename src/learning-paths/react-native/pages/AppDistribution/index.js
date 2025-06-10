import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './AppDistribution.css';

function AppDistribution() {
	const [publishingProgress, setPublishingProgress] = useState({
		preparation: false,
		review: false,
		launch: false
	});
	const [appStatus, setAppStatus] = useState('development');
	const [storeSubmissions, setStoreSubmissions] = useState({
		appStore: null,
		playStore: null
	});
	const [globalReach, setGlobalReach] = useState(0);
	const [publisherLevel, setPublisherLevel] = useState('Apprentice');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Publishing progress management
	const advancePublishing = (stage) => {
		setPublishingProgress(prev => ({
			...prev,
			[stage]: true
		}));
	};

	// App status progression
	const updateAppStatus = (status) => {
		setAppStatus(status);
	};

	// Store submission handling
	const submitToStore = (store, result) => {
		setStoreSubmissions(prev => ({
			...prev,
			[store]: result
		}));
		
		// Check for publisher advancement
		const completedSubmissions = Object.values({
			...storeSubmissions,
			[store]: result
		}).filter(s => s === 'approved').length;
		
		if (completedSubmissions >= 2) {
			setPublisherLevel('Master Publisher');
		} else if (completedSubmissions >= 1) {
			setPublisherLevel('Store Expert');
		}
	};

	// Global reach calculation
	const expandGlobalReach = (countries) => {
		setGlobalReach(prev => prev + countries);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>App Distribution</h1>
				<p className='lesson-subtitle'>
					Navigate the Publishing Port with Publisher Prime to distribute your app globally
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
					publishingProgress,
					advancePublishing,
					appStatus,
					updateAppStatus,
					storeSubmissions,
					submitToStore,
					globalReach,
					expandGlobalReach,
					publisherLevel,
					setPublisherLevel
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
				lessonId='app-distribution'
			/>
		</div>
	);
}

export default AppDistribution;