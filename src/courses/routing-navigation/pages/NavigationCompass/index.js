import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './NavigationCompass.css';

function NavigationCompass() {
	const [activeRoute, setActiveRoute] = useState('/');
	const [compassDirection, setCompassDirection] = useState(0);
	const [navigationHistory, setNavigationHistory] = useState(['/']);
	const [currentView, setCurrentView] = useState('home');

	const navigate = useNavigate();
	const location = useLocation();

	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Navigation handling
	const handleNavigation = (path) => {
		setActiveRoute(path);
		setNavigationHistory([...navigationHistory, path]);
		
		// Update compass based on navigation
		const directions = { '/': 0, '/about': 90, '/products': 180, '/contact': 270 };
		setCompassDirection(directions[path] || 0);
	};

	// View switching for demo
	const switchView = (view) => {
		setCurrentView(view);
		handleNavigation(`/${view === 'home' ? '' : view}`);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Navigation Compass</h1>
			<p className='lesson-subtitle'>
				Chart your course through React applications with React Router
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
					activeRoute,
					handleNavigation,
					compassDirection,
					navigationHistory,
					currentView,
					switchView
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
				courseId='routing-navigation'
				lessonId='navigation-compass'
			/>
		</div>
	);
}

export default NavigationCompass;