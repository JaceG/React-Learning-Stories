import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		errorSpells,
		capturedErrors,
		errorBoundaries,
		fallbackStrategies,
		errorLogbook,
		logError,
		recoverFromError,
		protectionLevel
	} = useOutletContext();

	const [monitoringActive, setMonitoringActive] = useState(false);
	const [errorMetrics, setErrorMetrics] = useState({
		total: 0,
		handled: 0,
		recovered: 0,
		critical: 0
	});
	const [productionMode, setProductionMode] = useState(false);
	const [recoveryStrategy, setRecoveryStrategy] = useState(null);

	// Simulate production errors
	const productionErrors = [
		{
			id: 1,
			type: 'NetworkError',
			message: 'Failed to fetch user data',
			severity: 'high',
			frequency: 45,
			impact: 'User profiles unavailable'
		},
		{
			id: 2,
			type: 'ChunkLoadError',
			message: 'Loading chunk 4 failed',
			severity: 'critical',
			frequency: 12,
			impact: 'Feature completely broken'
		},
		{
			id: 3,
			type: 'StateError',
			message: 'Cannot read property of undefined',
			severity: 'medium',
			frequency: 78,
			impact: 'UI partially broken'
		},
		{
			id: 4,
			type: 'ThirdPartyError',
			message: 'Analytics script failed',
			severity: 'low',
			frequency: 156,
			impact: 'Metrics not tracked'
		}
	];

	// Start production monitoring
	const startMonitoring = () => {
		setMonitoringActive(true);
		setProductionMode(true);
		
		// Simulate error stream
		const interval = setInterval(() => {
			if (Math.random() > 0.7) {
				const randomError = productionErrors[Math.floor(Math.random() * productionErrors.length)];
				logError({
					id: Date.now(),
					error: {
						type: randomError.type,
						message: randomError.message,
						severity: randomError.severity
					},
					timestamp: new Date().toISOString(),
					handled: Math.random() > 0.3
				});
				
				setErrorMetrics(prev => ({
					total: prev.total + 1,
					handled: prev.handled + (Math.random() > 0.3 ? 1 : 0),
					recovered: prev.recovered + (Math.random() > 0.5 ? 1 : 0),
					critical: prev.critical + (randomError.severity === 'critical' ? 1 : 0)
				}));
			}
		}, 2000);

		// Clean up after 10 seconds
		setTimeout(() => {
			clearInterval(interval);
			setMonitoringActive(false);
		}, 10000);
	};

	// Apply recovery strategy
	const applyRecovery = (strategy) => {
		setRecoveryStrategy(strategy);
		// Recover recent errors
		capturedErrors.slice(-3).forEach(error => {
			recoverFromError(error.id);
		});
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`Production Error Mastery`}
				bridge={`The final chamber of the Error Enchantments sanctuary glowed with monitors showing live production data. "This is where theory meets reality," Safiya gestured to the displays. "Production errors are different beasts - unpredictable, varied, and often silent. The key is not preventing all errors, but graceful degradation and quick recovery."`}
			/>

			<StorySection
				paragraphs={[
					<>The final chamber of the Error Enchantments sanctuary glowed with monitors showing live production data. <strong>Safiya</strong> gestured to the displays. "This is where theory meets reality. Production errors are different beasts - unpredictable, varied, and often silent."</>,
					<><strong>Aria</strong> watched as error patterns flowed across the screens. Some errors appeared frequently but had low impact. Others were rare but catastrophic. "The key," Safiya explained, "is not preventing all errors - that's impossible. It's about graceful degradation and quick recovery."</>,
					<><strong>Debuggora</strong> pointed to a particularly nasty ChunkLoadError. "In production, users have different networks, devices, and browsers. Errors you never saw in development will emerge. Your enchantments must be adaptive."</>,
					`"Remember," Safiya concluded, "error handling is about user experience. A well-handled error that lets users continue is better than a perfect app that crashes completely."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Production Error Command Center</h3>
				
				<div className='monitoring-dashboard'>
					<h4>
						<span className='service-icon'>📊</span>
						Live Error Monitoring
					</h4>
					
					{!monitoringActive ? (
						<div className='monitoring-start'>
							<p>Activate production monitoring to see live error data</p>
							<button 
								className='mock-button'
								style={{ marginTop: '20px', fontSize: '18px', padding: '12px 24px' }}
								onClick={startMonitoring}>
								Start Production Monitoring
							</button>
						</div>
					) : (
						<div className='monitoring-active'>
							<div className='monitoring-stats'>
								<div className='stat-card'>
									<div className='stat-value'>{errorMetrics.total}</div>
									<div className='stat-label'>Total Errors</div>
								</div>
								<div className='stat-card'>
									<div className='stat-value'>{errorMetrics.handled}</div>
									<div className='stat-label'>Handled</div>
								</div>
								<div className='stat-card'>
									<div className='stat-value'>{errorMetrics.recovered}</div>
									<div className='stat-label'>Recovered</div>
								</div>
								<div className='stat-card'>
									<div className='stat-value'>{errorMetrics.critical}</div>
									<div className='stat-label'>Critical</div>
								</div>
							</div>
							<p style={{ textAlign: 'center', color: '#3498db', marginTop: '10px' }}>
								Monitoring active... Detecting errors in real-time
							</p>
						</div>
					)}
				</div>

				<div className='error-recovery-panel'>
					<h4>Error Recovery Strategies</h4>
					
					<div className='recovery-options'>
						<div 
							className={`recovery-option ${recoveryStrategy === 'retry' ? 'selected' : ''}`}
							onClick={() => applyRecovery('retry')}>
							<div style={{ fontSize: '24px' }}>🔄</div>
							<div>Automatic Retry</div>
							<small>Retry failed operations</small>
						</div>
						<div 
							className={`recovery-option ${recoveryStrategy === 'fallback' ? 'selected' : ''}`}
							onClick={() => applyRecovery('fallback')}>
							<div style={{ fontSize: '24px' }}>🔀</div>
							<div>Fallback Mode</div>
							<small>Use cached/default data</small>
						</div>
						<div 
							className={`recovery-option ${recoveryStrategy === 'degrade' ? 'selected' : ''}`}
							onClick={() => applyRecovery('degrade')}>
							<div style={{ fontSize: '24px' }}>⚡</div>
							<div>Graceful Degradation</div>
							<small>Disable non-critical features</small>
						</div>
						<div 
							className={`recovery-option ${recoveryStrategy === 'notify' ? 'selected' : ''}`}
							onClick={() => applyRecovery('notify')}>
							<div style={{ fontSize: '24px' }}>📢</div>
							<div>User Notification</div>
							<small>Inform and guide users</small>
						</div>
					</div>
				</div>

				{productionMode && (
					<div className='production-insights'>
						<h4>Production Error Insights</h4>
						{productionErrors.map(error => (
							<div key={error.id} className='error-insight'>
								<div className='insight-header'>
									<span className={`severity-badge ${error.severity}`}>
										{error.severity}
									</span>
									<span className='error-type'>{error.type}</span>
								</div>
								<div className='insight-details'>
									<div>Frequency: {error.frequency} times/day</div>
									<div>Impact: {error.impact}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Production Error Handling Strategies</span>
					<div className='code-actions'>
						<button onClick={() => setProductionMode(!productionMode)}>
							Toggle Production View
						</button>
					</div>
				</div>
				<CodeExample
					title={`Production Error Handling Strategies`}
					discoveredBy={`Transcribed by Aria`}
					code={`// Production-Ready Error Handling

// 1. Comprehensive Error Monitoring
class ErrorMonitor {
  constructor() {
    this.setupGlobalHandlers();
    this.errorQueue = [];
    this.setupPeriodicFlush();
  }
  
  setupGlobalHandlers() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
        type: 'uncaught-error'
      });
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        error: event.reason,
        type: 'unhandled-rejection'
      });
    });
    
    // React Error Boundary integration
    this.reactErrorHandler = (error, errorInfo) => {
      this.logError({
        message: error.toString(),
        componentStack: errorInfo.componentStack,
        type: 'react-error'
      });
    };
  }
  
  logError(errorData) {
    // Enrich with context
    const enrichedError = {
      ...errorData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      release: process.env.REACT_APP_VERSION
    };
    
    // Add to queue for batching
    this.errorQueue.push(enrichedError);
    
    // Immediate send for critical errors
    if (this.isCritical(errorData)) {
      this.sendErrors([enrichedError]);
    }
  }
  
  setupPeriodicFlush() {
    setInterval(() => {
      if (this.errorQueue.length > 0) {
        this.sendErrors(this.errorQueue);
        this.errorQueue = [];
      }
    }, 30000); // Every 30 seconds
  }
  
  sendErrors(errors) {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errors })
    }).catch(err => {
      // Fallback to localStorage if API fails
      const stored = localStorage.getItem('error-queue') || '[]';
      const queue = JSON.parse(stored);
      localStorage.setItem(
        'error-queue', 
        JSON.stringify([...queue, ...errors])
      );
    });
  }
}

// 2. Smart Retry Logic
function useSmartRetry() {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  const retryWithBackoff = async (fn, options = {}) => {
    try {
      return await fn();
    } catch (error) {
      if (retryCount >= maxRetries) {
        throw new Error(\`Failed after \${maxRetries} attempts: \${error.message}\`);
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      setRetryCount(prev => prev + 1);
      return retryWithBackoff(fn, options);
    }
  };
  
  return { retryWithBackoff, retryCount, resetRetries: () => setRetryCount(0) };
}

// 3. Graceful Degradation Component
function GracefulFeature({ feature, fallback, children }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check feature availability
    checkFeatureHealth(feature)
      .then(() => setIsAvailable(true))
      .catch(err => {
        setIsAvailable(false);
        setError(err);
        // Log to monitoring
        ErrorMonitor.logError({
          type: 'feature-unavailable',
          feature,
          error: err
        });
      });
  }, [feature]);
  
  if (!isAvailable) {
    // Render fallback UI
    return fallback || (
      <div className="feature-unavailable">
        <p>This feature is temporarily unavailable</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  return children;
}

// 4. Network Error Recovery
function useNetworkRecovery() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkError, setNetworkError] = useState(null);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const fetchWithRecovery = async (url, options = {}) => {
    if (!isOnline) {
      // Try to get from cache
      const cached = await getCachedResponse(url);
      if (cached) return cached;
      
      throw new Error('No network connection');
    }
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      // Cache successful response
      cacheResponse(url, response.clone());
      
      return response;
    } catch (error) {
      setNetworkError(error);
      
      // Try cache as fallback
      const cached = await getCachedResponse(url);
      if (cached) {
        console.warn('Using cached response due to network error');
        return cached;
      }
      
      throw error;
    }
  };
  
  return { isOnline, networkError, fetchWithRecovery };
}

// 5. Production Error Recovery Manager
class ProductionErrorRecovery {
  static strategies = {
    RELOAD: 'reload',
    RETRY: 'retry',
    FALLBACK: 'fallback',
    IGNORE: 'ignore'
  };
  
  static async handleError(error, context) {
    const strategy = this.determineStrategy(error);
    
    switch (strategy) {
      case this.strategies.RELOAD:
        // For chunk load errors
        if (error.name === 'ChunkLoadError') {
          // Clear module cache and reload
          if ('caches' in window) {
            await caches.keys().then(names => {
              names.forEach(name => caches.delete(name));
            });
          }
          window.location.reload();
        }
        break;
        
      case this.strategies.RETRY:
        // Retry the operation
        return context.retry();
        
      case this.strategies.FALLBACK:
        // Use fallback data/component
        return context.fallback();
        
      case this.strategies.IGNORE:
        // Log and continue
        console.warn('Ignoring non-critical error:', error);
        break;
    }
  }
  
  static determineStrategy(error) {
    // Chunk loading errors - reload
    if (error.name === 'ChunkLoadError') {
      return this.strategies.RELOAD;
    }
    
    // Network errors - retry
    if (error.name === 'NetworkError') {
      return this.strategies.RETRY;
    }
    
    // Non-critical errors - ignore
    if (this.isNonCritical(error)) {
      return this.strategies.IGNORE;
    }
    
    // Default to fallback
    return this.strategies.FALLBACK;
  }
}`}
				/>
				<div className='code-tooltip'>
					<strong>Production Wisdom:</strong> "In production, expect the unexpected. Monitor 
					everything, batch error reports, implement smart retries, and always have a fallback. 
					Remember: users don't care about perfect code - they care about working features."
				</div>
			</div>

			{protectionLevel >= 80 && (
				<div className='achievement-banner'>
					<h4>🎓 Error Mastery Achieved! 🎓</h4>
					<p>The Error Enchantments sanctuary is fully protected!</p>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li>✓ All error types understood</li>
						<li>✓ Error boundaries implemented</li>
						<li>✓ Production strategies mastered</li>
						<li>✓ Recovery patterns learned</li>
						<li>✓ Sanctuary Protection: {protectionLevel}%</li>
					</ul>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: `The Production Mastery Lesson:`,
					content: (
						<>
							<p>
								Production error handling is about resilience, not perfection. It's impossible to 
								prevent all errors, but you can control how your application responds to them. The 
								goal is to maintain functionality and user trust even when things go wrong.
							</p>
							<p>
								Effective production error handling combines proactive monitoring, intelligent recovery 
								strategies, and graceful degradation. By expecting failures and planning for them, 
								you create applications that users can rely on, even in imperfect conditions.
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					`How do you balance error reporting with performance? Consider the trade-offs between detailed error tracking and application speed. What information is essential versus nice-to-have?`,
					`What makes a good error recovery strategy? Think about user experience - when should you retry automatically versus asking the user? How do you communicate errors without causing panic?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 32 (Evening)`,
					content: `Production Error Mastery! The final chamber glowed with live monitoring displays. Safiya: "Production errors are different beasts - unpredictable and often silent." Four production error types: NetworkError (45/day, high severity), ChunkLoadError (12/day, critical!), StateError (78/day, medium), ThirdPartyError (156/day, low). Four recovery strategies: Automatic Retry (🔄), Fallback Mode (🔀 cached data), Graceful Degradation (⚡ disable non-critical features), User Notification (📢). I built an ErrorMonitor class with global handlers, error queuing, and periodic flush. Sanctuary Protection reached 80%! My Testing & Debugging training is complete - from unit tests to production errors, I can build truly resilient applications!`
				}}
				chapterEnding={[
					`As the sanctuary's protection reached full strength, Safiya placed a hand on Aria's shoulder. "You've completed your training in Testing & Debugging. From unit tests in the Tower to production errors here, you now possess the knowledge to build truly resilient React applications. Your journey in Act III continues..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;