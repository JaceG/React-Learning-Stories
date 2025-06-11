import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './ApiIntegration.css';

function ApiIntegration() {
	const [dataStreams, setDataStreams] = useState([]);
	const [apiRequests, setApiRequests] = useState([]);
	const [errorHandlingPatterns, setErrorHandlingPatterns] = useState([]);
	const [authStrategies, setAuthStrategies] = useState([]);
	const [currentProtocol, setCurrentProtocol] = useState(null);
	const [citadelStage, setCitadelStage] = useState('arrival');
	
	const navigate = useNavigate();
	const location = useLocation();
	
	// State evolution
	const evolve = (newStage) => {
		setCitadelStage(newStage);
	};
	
	// Learn data stream
	const learnDataStream = (stream) => {
		setDataStreams([...dataStreams, stream]);
	};
	
	// Make API request
	const makeApiRequest = (method, endpoint, options = {}) => {
		const request = {
			id: Date.now(),
			method,
			endpoint,
			options,
			timestamp: new Date().toISOString()
		};
		setApiRequests([...apiRequests, request]);
	};
	
	// Add error handling pattern
	const addErrorPattern = (pattern) => {
		setErrorHandlingPatterns([...errorHandlingPatterns, pattern]);
	};
	
	// Learn authentication strategy
	const learnAuthStrategy = (strategy) => {
		setAuthStrategies([...authStrategies, strategy]);
	};
	
	// Set current protocol focus
	const focusProtocol = (protocol) => {
		setCurrentProtocol(protocol);
	};
	
	// Calculate connection strength
	const connectionStrength = Math.min(100, 
		(dataStreams.length * 15) + 
		(apiRequests.length * 10) +
		(errorHandlingPatterns.length * 10) +
		(authStrategies.length * 10)
	);
	
	// Navigate between chapters
	const navigateToChapter = (chapter) => {
		navigate(`/learning-paths/server-data/api-integration/${chapter}`);
	};
	
	// Get current chapter from location
	const getCurrentChapter = () => {
		const pathParts = location.pathname.split('/');
		return pathParts[pathParts.length - 1] || 'chapter1';
	};
	
	return (
		<div className='api-integration-container'>
			<div className='cloud-header'>
				<h1 className='cloud-title'>The Cloud Citadel</h1>
				<div className='connection-meter'>
					<div className='connection-bar'>
						<div 
							className='connection-fill'
							style={{ width: `${connectionStrength}%` }}
						/>
					</div>
					<span className='connection-label'>
						Connection Strength: {connectionStrength}%
					</span>
				</div>
			</div>
			
			<nav className='cloud-nav'>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter1' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter1')}>
					Citadel Entrance
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter2' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter2')}>
					Protocol Chambers
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter3' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter3')}>
					Data Embassy
				</button>
			</nav>
			
			<div className='cloud-content'>
				<Outlet context={{
					dataStreams,
					learnDataStream,
					apiRequests,
					makeApiRequest,
					errorHandlingPatterns,
					addErrorPattern,
					authStrategies,
					learnAuthStrategy,
					currentProtocol,
					focusProtocol,
					citadelStage,
					evolve,
					connectionStrength
				}} />
			</div>
			
			<div className='cloud-citadel-status'>
				<h3>Citadel Status</h3>
				<div className='status-grid'>
					<div className='status-item'>
						<span className='status-label'>Data Streams:</span>
						<span className='status-value'>{dataStreams.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>API Requests:</span>
						<span className='status-value'>{apiRequests.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Error Patterns:</span>
						<span className='status-value'>{errorHandlingPatterns.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Auth Strategies:</span>
						<span className='status-value'>{authStrategies.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApiIntegration;