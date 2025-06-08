import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AnimationLibraries.css';

function AnimationLibraries() {
	const [animationTechniques, setAnimationTechniques] = useState([]);
	const [masteredAnimations, setMasteredAnimations] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({});
	const [gesturePatterns, setGesturePatterns] = useState([]);
	const [currentDojo, setCurrentDojo] = useState(null);
	const [monasteryStage, setMonasteryStage] = useState('arrival');
	
	const navigate = useNavigate();
	const location = useLocation();
	
	// State evolution
	const evolve = (newStage) => {
		setMonasteryStage(newStage);
	};
	
	// Learn animation technique
	const learnTechnique = (technique) => {
		setAnimationTechniques([...animationTechniques, technique]);
	};
	
	// Master an animation
	const masterAnimation = (library, pattern) => {
		const mastery = {
			id: Date.now(),
			library,
			pattern,
			timestamp: new Date().toISOString()
		};
		setMasteredAnimations([...masteredAnimations, mastery]);
	};
	
	// Record performance metric
	const recordMetric = (library, metric, value) => {
		setPerformanceMetrics(prev => ({
			...prev,
			[library]: { ...prev[library], [metric]: value }
		}));
	};
	
	// Add gesture pattern
	const addGesturePattern = (pattern) => {
		setGesturePatterns([...gesturePatterns, pattern]);
	};
	
	// Set current dojo focus
	const focusDojo = (dojo) => {
		setCurrentDojo(dojo);
	};
	
	// Calculate fluidity level
	const fluidityLevel = Math.min(100, 
		(animationTechniques.length * 15) + 
		(masteredAnimations.length * 10) +
		(gesturePatterns.length * 10)
	);
	
	// Navigate between chapters
	const navigateToChapter = (chapter) => {
		navigate(`/learning-paths/react-ecosystem/animation-libraries/${chapter}`);
	};
	
	// Get current chapter from location
	const getCurrentChapter = () => {
		const pathParts = location.pathname.split('/');
		return pathParts[pathParts.length - 1] || 'chapter1';
	};
	
	return (
		<div className='animation-libraries-container'>
			<div className='animation-header'>
				<h1 className='animation-title'>The Motion Monastery</h1>
				<div className='fluidity-meter'>
					<div className='fluidity-bar'>
						<div 
							className='fluidity-fill'
							style={{ width: `${fluidityLevel}%` }}
						/>
					</div>
					<span className='fluidity-label'>
						Motion Fluidity: {fluidityLevel}%
					</span>
				</div>
			</div>
			
			<nav className='animation-nav'>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter1' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter1')}>
					Monastery Entrance
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter2' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter2')}>
					Animation Dojos
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter3' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter3')}>
					Fluid Kingdom
				</button>
			</nav>
			
			<div className='animation-content'>
				<Outlet context={{
					animationTechniques,
					learnTechnique,
					masteredAnimations,
					masterAnimation,
					performanceMetrics,
					recordMetric,
					gesturePatterns,
					addGesturePattern,
					currentDojo,
					focusDojo,
					monasteryStage,
					evolve,
					fluidityLevel
				}} />
			</div>
			
			<div className='motion-monastery-status'>
				<h3>Monastery Status</h3>
				<div className='status-grid'>
					<div className='status-item'>
						<span className='status-label'>Techniques Learned:</span>
						<span className='status-value'>{animationTechniques.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Animations Mastered:</span>
						<span className='status-value'>{masteredAnimations.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Gesture Patterns:</span>
						<span className='status-value'>{gesturePatterns.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Current Dojo:</span>
						<span className='status-value'>{currentDojo || 'None'}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnimationLibraries;