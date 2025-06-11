import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';
import './SpeedSanctum.css';

const SpeedSanctum = () => {
	const location = useLocation();
	const [sanctumEnergy, setSanctumEnergy] = useState(50);
	const [profileData, setProfileData] = useState(null);
	const [optimizationLevel, setOptimizationLevel] = useState(0);
	
	const chapters = [
		{ 
			path: '1', 
			title: 'The Slowing Kingdom',
			description: 'Discover the Lag Monster\'s impact'
		},
		{ 
			path: '2', 
			title: 'The Art of Memoization',
			description: 'Learn React.memo and useMemo'
		},
		{ 
			path: '3', 
			title: 'The Sanctum\'s Secret Techniques',
			description: 'Master useCallback and advanced patterns'
		}
	];

	const adjustSanctumEnergy = (amount) => {
		setSanctumEnergy(prev => Math.max(0, Math.min(100, prev + amount)));
	};

	const updateProfileData = (data) => {
		setProfileData(data);
	};

	const increaseOptimizationLevel = () => {
		setOptimizationLevel(prev => Math.min(3, prev + 1));
	};

	// Check if we're at the index page
	const isIndex = location.pathname.endsWith('speed-sanctum') || 
	               location.pathname.endsWith('speed-sanctum/');

	return (
		<div className='lesson-container speed-sanctum'>
			<div className='lesson-header'>
				<Link to='..' className='back-link'>← Back to Performance & Optimization</Link>
				<h1 className='lesson-title'>
					<span className='lesson-icon'>⚡</span>
					The Speed Sanctum
				</h1>
				<div className='sanctum-status'>
					<div className='energy-meter'>
						<span>Sanctum Energy:</span>
						<div className='energy-bar'>
							<div 
								className='energy-fill' 
								style={{ width: `${sanctumEnergy}%` }}
							/>
						</div>
					</div>
					<div className='optimization-badges'>
						{[1, 2, 3].map(level => (
							<span 
								key={level}
								className={`opt-badge ${optimizationLevel >= level ? 'earned' : ''}`}>
								{level === 1 && '🥉'}
								{level === 2 && '🥈'}
								{level === 3 && '🥇'}
							</span>
						))}
					</div>
				</div>
			</div>

			{isIndex ? (
				<div className='lesson-intro'>
					<div className='narrative-section'>
						<div className='location-intro'>
							<h2>Welcome to the Speed Sanctum</h2>
							<div className='scene-setting'>
								<p className='story-paragraph'>
									<strong>Aria</strong> and <strong>Binary</strong> arrived at the 
									Speed Sanctum, a gleaming temple carved into the mountainside. 
									Crystal formations pulsed with energy, their light dimming with 
									each passing moment as the Lag Monster's influence grew stronger.
								</p>
								
								<p className='story-paragraph'>
									<strong>Master Velocity</strong> emerged from the shadows, his 
									movements swift and precise. "Welcome, Aria. I've heard of your 
									journey through the kingdom. Your comprehensive understanding makes 
									you uniquely qualified to face this threat."
								</p>
								
								<p className='story-paragraph'>
									He gestured to the dimming crystals. "The Lag Monster feeds on 
									inefficiency - unnecessary re-renders, expensive computations, 
									and unoptimized components. Here in the Speed Sanctum, you'll 
									learn to measure, identify, and eliminate these performance 
									bottlenecks."
								</p>
								
								<p className='story-paragraph'>
									<strong>Binary</strong> scanned the environment. "I'm detecting 
									massive performance degradation throughout the kingdom! We need 
									to act fast!"
								</p>
							</div>
						</div>
						
						<div className='master-introduction'>
							<div className='character-card master-velocity'>
								<h3>Master Velocity</h3>
								<div className='character-portrait'>⚡</div>
								<p className='character-description'>
									Guardian of the Speed Sanctum and master of optimization. His 
									philosophy: "Measure twice, optimize once. Every millisecond 
									counts when users are waiting."
								</p>
								<div className='character-skills'>
									<span>React DevTools Profiler</span>
									<span>Performance Metrics</span>
									<span>Optimization Patterns</span>
								</div>
							</div>
						</div>
					</div>

					<div className='chapter-navigation'>
						<h3>Your Training Path</h3>
						<div className='chapters-grid'>
							{chapters.map((chapter, index) => (
								<Link 
									key={chapter.path} 
									to={chapter.path} 
									className='chapter-card'
								>
									<div className='chapter-number'>Chapter {index + 1}</div>
									<h4>{chapter.title}</h4>
									<p>{chapter.description}</p>
									<div className='chapter-status'>
										<span className='status-indicator'>Ready to Begin</span>
									</div>
								</Link>
							))}
						</div>
					</div>

					<div className='lesson-objectives'>
						<h3>What You'll Master</h3>
						<div className='objectives-list'>
							<div className='objective'>
								<span className='objective-icon'>🔍</span>
								<div>
									<h4>Performance Profiling</h4>
									<p>Use React DevTools to identify bottlenecks</p>
								</div>
							</div>
							<div className='objective'>
								<span className='objective-icon'>⚛️</span>
								<div>
									<h4>React.memo</h4>
									<p>Prevent unnecessary component re-renders</p>
								</div>
							</div>
							<div className='objective'>
								<span className='objective-icon'>🧮</span>
								<div>
									<h4>useMemo</h4>
									<p>Cache expensive computations</p>
								</div>
							</div>
							<div className='objective'>
								<span className='objective-icon'>📞</span>
								<div>
									<h4>useCallback</h4>
									<p>Stabilize function references</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='chapter-content'>
					<Outlet context={{
						sanctumEnergy,
						adjustSanctumEnergy,
						profileData,
						updateProfileData,
						optimizationLevel,
						increaseOptimizationLevel
					}} />
				</div>
			)}
		</div>
	);
};

// Wrapper component to handle routing
const SpeedSanctumWrapper = () => {
	return (
		<Routes>
			<Route path='/' element={<SpeedSanctum />}>
				<Route path='1' element={<ChapterOne />} />
				<Route path='2' element={<ChapterTwo />} />
				<Route path='3' element={<ChapterThree />} />
			</Route>
		</Routes>
	);
};

export default SpeedSanctumWrapper;