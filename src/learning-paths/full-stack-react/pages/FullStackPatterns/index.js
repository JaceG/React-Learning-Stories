import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './FullStackPatterns.css';

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
			<LessonHeader
				title={`App Distribution`}
				subtitle={`Navigate the Publishing Port with Publisher Prime to distribute your app globally`}
				opener={`The Publishing Port stood at the edge of the Mobile Frontier, where apps prepared for their journey to millions of devices worldwide. Publisher Prime welcomed Aria to the bustling docks. "You've built something remarkable with React Native," he said, gesturing to the ships preparing for departure. "Now it's time to share it with the world. But between your code and the app stores lies a gauntlet of certificates, reviews, and global considerations."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`react-native`}
				lessonId={`app-distribution`}
				totalChapters={3}
			/>
		</div>
	);
}

export default AppDistribution;
