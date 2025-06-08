import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		activeDebugTool,
		activateTool,
		bugTrail,
		foundBugs,
		captureBug,
		stackTrace
	} = useOutletContext();

	const [bossBug, setBossBug] = useState({
		form: 'normal',
		health: 100,
		behaviors: ['works-in-dev', 'random-failures', 'user-specific']
	});
	const [errorBoundaryActive, setErrorBoundaryActive] = useState(false);
	const [monitoringData, setMonitoringData] = useState({
		errorRate: 0,
		responseTime: 0,
		activeUsers: 0
	});
	const [battleLog, setBattleLog] = useState([]);

	// Boss battle mechanics
	const attackBoss = (strategy) => {
		const damage = Math.floor(Math.random() * 30) + 10;
		setBossBug(prev => ({
			...prev,
			health: Math.max(0, prev.health - damage),
			form: prev.health < 50 ? 'shapeshifted' : 'normal'
		}));

		setBattleLog(prev => [...prev, `Used ${strategy}: ${damage} damage!`]);

		if (strategy === 'error-boundary') {
			setErrorBoundaryActive(true);
		}

		// Update monitoring
		setMonitoringData({
			errorRate: Math.max(0, 100 - bossBug.health),
			responseTime: 200 + (bossBug.health * 3),
			activeUsers: Math.floor(Math.random() * 1000) + 500
		});
	};

	// Simulate boss behaviors
	useEffect(() => {
		if (bossBug.health > 0 && bossBug.health < 50) {
			const interval = setInterval(() => {
				setBossBug(prev => ({
					...prev,
					form: ['memory-leak', 'race-condition', 'state-corruption'][Math.floor(Math.random() * 3)]
				}));
			}, 2000);
			return () => clearInterval(interval);
		}
	}, [bossBug.health]);

	const debuggingStrategies = [
		{ id: 'error-boundary', name: 'Error Boundaries', description: 'Contain the damage' },
		{ id: 'logging', name: 'Strategic Logging', description: 'Track bug behavior' },
		{ id: 'monitoring', name: 'Real-time Monitoring', description: 'Observe patterns' },
		{ id: 'user-reports', name: 'User Error Reports', description: 'Gather intelligence' }
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Production Bug Boss
			</h2>

			<div className='chapter-bridge'>
				With stack trace mastery achieved, Aria faced the ultimate challenge...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the deepest chamber of the Debug Dungeon, they encountered the Production 
					Bug - a massive, shape-shifting creature that behaved differently than any 
					bug in development.
				</p>

				<p className='story-paragraph'>
					"This is why we need more than just debugging skills," Logsworth declared, 
					raising his staff. "We need error boundaries to contain it, monitoring to 
					track it, and logging to understand its patterns!"
				</p>

				<p className='story-paragraph'>
					The bug shifted forms - sometimes a memory leak growing larger, sometimes 
					a race condition flickering in and out of existence, sometimes corrupting 
					state in impossible ways.
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> stepped forward confidently. "I've learned from the 
					Testing Tower and navigated your labyrinth. This bug may shift, but I have 
					tools for every form it takes!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Boss Battle Arena</h3>
				
				<div className='bug-boss-arena'>
					<div className='bug-boss'>
						{bossBug.form === 'normal' && '🐛'}
						{bossBug.form === 'shapeshifted' && '👾'}
						{bossBug.form === 'memory-leak' && '💧'}
						{bossBug.form === 'race-condition' && '🏃'}
						{bossBug.form === 'state-corruption' && '🔥'}
					</div>
					
					<div className='boss-status'>
						<h4>Production Bug Boss</h4>
						<div className='health-bar'>
							<div 
								className='health-fill' 
								style={{ width: `${bossBug.health}%` }}
							/>
						</div>
						<p>Form: {bossBug.form} | Health: {bossBug.health}%</p>
						<p>Behaviors: {bossBug.behaviors.join(', ')}</p>
					</div>
				</div>

				<div className='debugging-strategies'>
					<h4>Choose Your Strategy</h4>
					<div className='strategy-grid'>
						{debuggingStrategies.map(strategy => (
							<button
								key={strategy.id}
								className='strategy-button'
								onClick={() => attackBoss(strategy.id)}>
								<strong>{strategy.name}</strong>
								<span>{strategy.description}</span>
							</button>
						))}
					</div>
				</div>

				{errorBoundaryActive && (
					<div className='error-boundary-demo'>
						<h4>Error Boundary Active!</h4>
						<div className='error-caught'>
							<div className='error-message'>
								Error Contained: ProductionBugError
							</div>
							<div className='error-stack'>
								The bug tried to crash the app but was caught!
								Fallback UI rendered instead.
							</div>
						</div>
					</div>
				)}

				<div className='monitoring-dashboard'>
					<h4>Production Monitoring</h4>
					<div className='metrics-grid'>
						<div className='metric'>
							<span className='metric-label'>Error Rate</span>
							<span className='metric-value'>{monitoringData.errorRate}%</span>
						</div>
						<div className='metric'>
							<span className='metric-label'>Response Time</span>
							<span className='metric-value'>{monitoringData.responseTime}ms</span>
						</div>
						<div className='metric'>
							<span className='metric-label'>Active Users</span>
							<span className='metric-value'>{monitoringData.activeUsers}</span>
						</div>
					</div>
				</div>

				{battleLog.length > 0 && (
					<div className='battle-log'>
						<h4>Debug Battle Log</h4>
						{battleLog.map((entry, index) => (
							<div key={index} className='log-entry'>→ {entry}</div>
						))}
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Production Defense Systems</span>
					<div className='code-actions'>
						<button onClick={() => attackBoss('monitoring')}>Deploy All Defenses</button>
					</div>
				</div>
				<div className='code-example'>
					<pre>{`// Error Boundary Implementation
class ProductionErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    errorReporter.captureException(error, {
      extra: errorInfo,
      tags: {
        component: 'production_boundary'
      },
      user: getCurrentUser(),
      context: {
        ...errorInfo,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <FallbackComponent
          onReset={() => this.setState({ hasError: false })}
          error={this.state.error}
        />
      );
    }
    return this.props.children;
  }
}

// Comprehensive Logging Strategy
const logger = {
  error: (message, context = {}) => {
    const logEntry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      ...context,
      stackTrace: new Error().stack,
      sessionId: getSessionId(),
      userId: getCurrentUserId()
    };
    
    // Send to logging service
    if (process.env.NODE_ENV === 'production') {
      loggingService.send(logEntry);
    }
    console.error(message, logEntry);
  },
  
  // Track user actions for debugging
  trackAction: (action, data) => {
    window.__DEBUG_TRAIL__ = window.__DEBUG_TRAIL__ || [];
    window.__DEBUG_TRAIL__.push({
      action,
      data,
      timestamp: Date.now()
    });
    
    // Keep only last 50 actions
    if (window.__DEBUG_TRAIL__.length > 50) {
      window.__DEBUG_TRAIL__.shift();
    }
  }
};

// Real-time Monitoring Setup
const setupMonitoring = () => {
  // Performance monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        logger.warn('Slow operation detected', {
          name: entry.name,
          duration: entry.duration,
          type: entry.entryType
        });
      }
    }
  });
  observer.observe({ entryTypes: ['measure', 'navigation'] });
  
  // Memory monitoring
  if (performance.memory) {
    setInterval(() => {
      const memoryUsage = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
      
      if (memoryUsage.usedJSHeapSize > memoryUsage.jsHeapSizeLimit * 0.9) {
        logger.error('Memory usage critical', memoryUsage);
      }
    }, 30000);
  }
};

// User Error Reporting
const UserErrorReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>
        Report Issue
      </FloatingButton>
      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h3>Help us fix this issue</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What were you trying to do?"
              name="description"
            />
            <button type="submit">Send Report</button>
          </form>
          <p>Debug info will be included automatically</p>
        </Modal>
      )}
    </>
  );
};`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Master Strategy:</strong> "The Production Bug Boss cannot be defeated 
					by debugging alone. You need a complete defense system: boundaries to contain, 
					logging to understand, monitoring to track, and user reports to gather intelligence."
				</div>
			</div>

			{bossBug.health === 0 && (
				<div className='debug-achievement'>
					<div className='achievement-icon'>🏆</div>
					<h3>Production Bug Boss Defeated!</h3>
					<p>You've mastered the art of production debugging!</p>
					<ul>
						<li>Error boundaries contain failures</li>
						<li>Logging provides visibility</li>
						<li>Monitoring tracks health</li>
						<li>User reports gather intelligence</li>
					</ul>
				</div>
			)}

			<div className='lesson-insight'>
				<h3>The Production Debugging Lesson:</h3>
				<p>
					Production debugging isn't about finding and fixing individual bugs - it's 
					about building systems that make bugs visible, contained, and understood. 
					Error boundaries prevent cascading failures, logging creates an audit trail, 
					monitoring provides real-time health metrics, and user reporting closes the 
					feedback loop.
				</p>
				<p>
					The ultimate insight: In production, you can't attach a debugger and step 
					through code. Instead, you must be proactive - instrument your code with 
					the tools that will help you when things go wrong. The best time to add 
					debugging capabilities is before you need them.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Production Resilience</h3>
				<p>
					<strong>How do error boundaries change user experience?</strong> Consider 
					the difference between an entire app crashing versus a single component 
					showing an error message. How does graceful degradation build user trust?
				</p>
				<p>
					<strong>Why is proactive monitoring better than reactive debugging?</strong> 
					Think about discovering issues before users report them versus scrambling 
					to fix problems after complaints. How does this change your development 
					approach?
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As the Production Bug Boss dissolved into error logs, Logsworth placed a 
					hand on Aria's shoulder. "You've conquered the Debug Dungeon, but debugging 
					is only half of quality. At the Integration Inn, you'll learn how components 
					must work together. Innkeeper Cypress awaits with new challenges..."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;