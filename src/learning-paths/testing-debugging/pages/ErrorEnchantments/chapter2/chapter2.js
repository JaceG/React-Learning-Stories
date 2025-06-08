import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		errorBoundaries,
		createErrorBoundary,
		fallbackStrategies,
		addFallbackStrategy,
		errorLogbook,
		logError,
		protectionLevel
	} = useOutletContext();

	const [selectedComponent, setSelectedComponent] = useState(null);
	const [boundaryCreationMode, setBoundaryCreationMode] = useState(false);
	const [testError, setTestError] = useState(null);

	// Components that need error boundaries
	const vulnerableComponents = [
		{ 
			id: 'userProfile',
			name: 'User Profile',
			icon: '👤',
			vulnerability: 'Async data loading',
			protected: false
		},
		{ 
			id: 'dataGrid',
			name: 'Data Grid',
			icon: '📊',
			vulnerability: 'Complex rendering logic',
			protected: false
		},
		{ 
			id: 'paymentForm',
			name: 'Payment Form',
			icon: '💳',
			vulnerability: 'Third-party integration',
			protected: false
		},
		{ 
			id: 'chatWidget',
			name: 'Chat Widget',
			icon: '💬',
			vulnerability: 'Real-time updates',
			protected: false
		}
	];

	// Create error boundary for component
	const protectComponent = (component) => {
		createErrorBoundary({
			id: component.id,
			name: `${component.name} Boundary`,
			component: component.name,
			fallback: 'default'
		});

		// Add fallback strategy
		addFallbackStrategy(component.id, {
			type: 'graceful',
			message: `${component.name} is temporarily unavailable`,
			retry: true
		});

		setSelectedComponent(null);
		setBoundaryCreationMode(false);
	};

	// Simulate error in component
	const triggerError = (component) => {
		setTestError({ component: component.name, time: Date.now() });
		logError({
			id: Date.now(),
			error: {
				type: 'Test Error',
				message: `Simulated error in ${component.name}`,
				component: component.name
			},
			timestamp: new Date().toISOString(),
			handled: errorBoundaries.find(b => b.component === component.name) ? true : false
		});

		setTimeout(() => setTestError(null), 3000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Error Boundaries
			</h2>

			<div className='chapter-bridge'>
				With error types understood, it was time to build defenses...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Safiya</strong> led Aria to the Boundary Workshop. "Error Boundaries 
					are React's built-in protection spell," she explained. "They catch errors in 
					component trees and display fallback UI instead of crashing."
				</p>

				<p className='story-paragraph'>
					The workshop was filled with shimmering barriers, each protecting a different 
					component. "Watch this," Safiya said, deliberately triggering an error in an 
					unprotected component. The error spread like wildfire, crashing everything it 
					touched.
				</p>

				<p className='story-paragraph'>
					Then she triggered the same error in a protected component. The boundary 
					contained it, displaying a gentle message instead. "Error Boundaries act like 
					try-catch for components," <strong>Debuggora</strong> explained. "But they only 
					catch certain errors."
				</p>

				<p className='story-paragraph'>
					"The art," Safiya continued, "is knowing where to place boundaries and what 
					fallback UI to show. Too many boundaries fragment your app. Too few leave it 
					vulnerable."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Error Boundary Workshop</h3>
				
				<div className='error-boundary-workshop'>
					<h4>
						<span className='service-icon'>🛡️</span>
						Component Protection Status
					</h4>
					
					<button 
						className='mock-button'
						onClick={() => setBoundaryCreationMode(!boundaryCreationMode)}>
						{boundaryCreationMode ? 'Exit Protection Mode' : 'Create Error Boundaries'}
					</button>
					
					<div className='boundary-components'>
						{vulnerableComponents.map(component => {
							const isProtected = errorBoundaries.find(b => b.component === component.name);
							return (
								<div 
									key={component.id}
									className={`component-boundary ${isProtected ? 'protected' : ''} ${
										testError?.component === component.name ? 'error-active' : ''
									}`}
									onClick={() => boundaryCreationMode && !isProtected && setSelectedComponent(component)}>
									<div style={{ fontSize: '30px', marginBottom: '10px' }}>{component.icon}</div>
									<div className='component-name'>{component.name}</div>
									<div className='vulnerability-info'>{component.vulnerability}</div>
									<div className='boundary-status'>
										{isProtected ? '✓ Protected' : '⚠️ Vulnerable'}
									</div>
									{!boundaryCreationMode && (
										<button 
											className='test-error-button'
											onClick={(e) => {
												e.stopPropagation();
												triggerError(component);
											}}>
											Test Error
										</button>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{selectedComponent && boundaryCreationMode && (
					<div className='boundary-creation-panel'>
						<h4>Configure Error Boundary: {selectedComponent.name}</h4>
						
						<div className='fallback-options'>
							<h5>Choose Fallback Strategy:</h5>
							<div className='fallback-screen'>
								<div className='fallback-icon'>⚠️</div>
								<div className='fallback-message'>
									Something went wrong in {selectedComponent.name}
								</div>
								<div className='fallback-actions'>
									<button className='fallback-button primary'>Try Again</button>
									<button className='fallback-button'>Go Back</button>
								</div>
							</div>
						</div>
						
						<div className='boundary-controls'>
							<button 
								className='mock-button'
								onClick={() => protectComponent(selectedComponent)}>
								Create Boundary
							</button>
							<button 
								className='mock-button'
								onClick={() => setSelectedComponent(null)}>
								Cancel
							</button>
						</div>
					</div>
				)}

				{errorLogbook.length > 0 && (
					<div className='error-logbook'>
						<div className='logbook-header'>Error Logbook</div>
						{errorLogbook.slice(-5).reverse().map(entry => (
							<div 
								key={entry.id} 
								className={`log-entry ${entry.handled ? 'handled' : ''} ${
									entry.recovered ? 'recovered' : ''
								}`}>
								<div className='log-timestamp'>{new Date(entry.timestamp).toLocaleTimeString()}</div>
								<div className='log-error-type'>{entry.error.type}</div>
								<div className='log-message'>{entry.error.message}</div>
								{entry.handled && <span className='handled-badge'>Handled</span>}
							</div>
						))}
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Error Boundary Implementation</span>
					<div className='code-actions'>
						<button onClick={() => logError({ 
							error: { type: 'Demo', message: 'Boundary test' },
							timestamp: new Date().toISOString(),
							handled: true
						})}>
							Log Test Error
						</button>
					</div>
				</div>
				<div className='code-example'>
					<pre>{`// Creating Error Boundaries in React

// 1. Basic Error Boundary Class
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to monitoring service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong</h2>
          <p>We're sorry for the inconvenience.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 2. Using Error Boundaries
function App() {
  return (
    <div>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
    </div>
  );
}

// 3. Specialized Error Boundaries
class UserProfileErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Specific handling for user profile errors
    if (error.message.includes('401')) {
      // Redirect to login
      window.location.href = '/login';
    } else {
      // Log to monitoring
      trackError('UserProfile', error);
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="profile-error">
          <img src="/default-avatar.png" alt="Default" />
          <p>Unable to load profile</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 4. Error Boundary with Retry Logic
class RetryErrorBoundary extends React.Component {
  state = { hasError: false, retryCount: 0 };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  handleReset = () => {
    this.setState({ 
      hasError: false, 
      retryCount: this.state.retryCount + 1 
    });
  };
  
  render() {
    if (this.state.hasError) {
      if (this.state.retryCount >= 3) {
        return (
          <div className="error-fallback">
            <p>Failed after 3 attempts.</p>
            <a href="/">Return to Home</a>
          </div>
        );
      }
      
      return (
        <div className="error-fallback">
          <p>Something went wrong. Attempt {this.state.retryCount + 1} of 3</p>
          <button onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 5. Error Boundary Hook Pattern (custom)
function useErrorHandler() {
  const [error, setError] = useState(null);
  
  const resetError = () => setError(null);
  
  const captureError = (error) => {
    setError(error);
    // Log to service
    console.error('Error captured:', error);
  };
  
  // For async errors
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      captureError(new Error(event.reason));
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  return { error, resetError, captureError };
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Boundary Wisdom:</strong> "Error Boundaries don't catch errors in event 
					handlers, async code, SSR, or in the boundary itself. Place them strategically - 
					around feature sections, not every component. Each boundary is a safety checkpoint."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Error Boundary Lesson:</h3>
				<p>
					Error Boundaries are React's way of containing component failures. They work like 
					try-catch blocks but for component trees. When an error occurs in a child component, 
					the boundary catches it and renders fallback UI instead of crashing the entire app.
				</p>
				<p>
					The strategic placement of Error Boundaries is crucial. Too granular, and you 
					fragment the user experience. Too broad, and large sections fail together. The 
					sweet spot is usually around feature boundaries or major UI sections.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Error Boundaries</h3>
				<p>
					<strong>What errors can't Error Boundaries catch?</strong> Consider why event 
					handlers and async code need different error handling strategies. How would you 
					handle errors in these cases?
				</p>
				<p>
					<strong>How do you decide where to place Error Boundaries?</strong> Think about 
					user experience - which parts of your app can fail independently? What's the 
					impact of showing fallback UI in different locations?
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As boundaries shimmered into place around vulnerable components, Safiya smiled. 
					"You've learned to contain errors. Tomorrow, we'll explore production error 
					handling - monitoring, logging, and recovering gracefully from the unexpected..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;