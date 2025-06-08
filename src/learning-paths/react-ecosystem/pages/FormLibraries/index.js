import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './FormLibraries.css';

function FormLibraries() {
	const [formSolutions, setFormSolutions] = useState([]);
	const [implementedForms, setImplementedForms] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({});
	const [validationStrategies, setValidationStrategies] = useState([]);
	const [currentLibrary, setCurrentLibrary] = useState(null);
	const [federationStage, setFederationStage] = useState('arrival');
	
	const navigate = useNavigate();
	const location = useLocation();
	
	// State evolution
	const evolve = (newStage) => {
		setFederationStage(newStage);
	};
	
	// Add form solution
	const addFormSolution = (solution) => {
		setFormSolutions([...formSolutions, solution]);
	};
	
	// Implement a form pattern
	const implementForm = (library, pattern) => {
		const implementation = {
			id: Date.now(),
			library,
			pattern,
			timestamp: new Date().toISOString()
		};
		setImplementedForms([...implementedForms, implementation]);
	};
	
	// Record performance metric
	const recordMetric = (library, metric, value) => {
		setPerformanceMetrics(prev => ({
			...prev,
			[library]: { ...prev[library], [metric]: value }
		}));
	};
	
	// Add validation strategy
	const addValidationStrategy = (strategy) => {
		setValidationStrategies([...validationStrategies, strategy]);
	};
	
	// Set current library focus
	const focusLibrary = (library) => {
		setCurrentLibrary(library);
	};
	
	// Calculate understanding level
	const understandingLevel = Math.min(100, 
		(formSolutions.length * 15) + 
		(implementedForms.length * 10) +
		(validationStrategies.length * 10)
	);
	
	// Navigate between chapters
	const navigateToChapter = (chapter) => {
		navigate(`/learning-paths/react-ecosystem/form-libraries/${chapter}`);
	};
	
	// Get current chapter from location
	const getCurrentChapter = () => {
		const pathParts = location.pathname.split('/');
		return pathParts[pathParts.length - 1] || 'chapter1';
	};
	
	return (
		<div className='form-libraries-container'>
			<div className='form-header'>
				<h1 className='form-title'>The Form Federation</h1>
				<div className='form-progress'>
					<div className='progress-bar'>
						<div 
							className='progress-fill'
							style={{ width: `${understandingLevel}%` }}
						/>
					</div>
					<span className='progress-label'>
						Form Mastery: {understandingLevel}%
					</span>
				</div>
			</div>
			
			<nav className='form-nav'>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter1' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter1')}>
					Federation Welcome
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter2' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter2')}>
					Library Deep Dive
				</button>
				<button 
					className={`nav-button ${getCurrentChapter() === 'chapter3' ? 'active' : ''}`}
					onClick={() => navigateToChapter('chapter3')}>
					Form Consensus
				</button>
			</nav>
			
			<div className='form-content'>
				<Outlet context={{
					formSolutions,
					addFormSolution,
					implementedForms,
					implementForm,
					performanceMetrics,
					recordMetric,
					validationStrategies,
					addValidationStrategy,
					currentLibrary,
					focusLibrary,
					federationStage,
					evolve,
					understandingLevel
				}} />
			</div>
			
			<div className='form-federation-status'>
				<h3>Federation Status</h3>
				<div className='status-grid'>
					<div className='status-item'>
						<span className='status-label'>Libraries Explored:</span>
						<span className='status-value'>{formSolutions.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Forms Implemented:</span>
						<span className='status-value'>{implementedForms.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Validation Strategies:</span>
						<span className='status-value'>{validationStrategies.length}</span>
					</div>
					<div className='status-item'>
						<span className='status-label'>Current Focus:</span>
						<span className='status-value'>{currentLibrary || 'None'}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormLibraries;