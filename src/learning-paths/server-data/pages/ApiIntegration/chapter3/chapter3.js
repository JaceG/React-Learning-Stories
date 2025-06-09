import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		cacheEnabled,
		toggleCache,
		retryCount,
		handleRetry,
		interceptors
	} = useOutletContext();

	const [embassyEstablished, setEmbassyEstablished] = useState(false);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [loadingStates, setLoadingStates] = useState({
		global: false,
		component1: false,
		component2: false
	});

	const productionPatterns = [
		{
			id: 'global-error',
			name: 'Global Error Boundary',
			icon: '🛡️',
			description: 'Centralized error handling for all API calls'
		},
		{
			id: 'loading-manager',
			name: 'Loading State Manager',
			icon: '⏳',
			description: 'Coordinated loading states across components'
		},
		{
			id: 'optimistic-update',
			name: 'Optimistic Updates',
			icon: '🚀',
			description: 'Update UI before server confirms'
		},
		{
			id: 'request-queue',
			name: 'Request Queue',
			icon: '📦',
			description: 'Manage concurrent requests and rate limiting'
		}
	];

	const embassyFeatures = [
		{ name: 'Request Deduplication', active: interceptors.length > 2 },
		{ name: 'Automatic Retries', active: retryCount > 0 },
		{ name: 'Response Caching', active: cacheEnabled },
		{ name: 'Global Error Handling', active: selectedPattern === 'global-error' }
	];

	const establishEmbassy = () => {
		const allFeaturesActive = embassyFeatures.every(f => f.active);
		if (allFeaturesActive) {
			setEmbassyEstablished(true);
		}
	};

	const simulateGlobalLoading = () => {
		setLoadingStates({ global: true, component1: true, component2: true });
		setTimeout(() => {
			setLoadingStates({ global: false, component1: false, component2: false });
		}, 2000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Data Embassy</h2>

			<div className='chapter-bridge'>
				<p>With protocols mastered and patterns understood, it was time to 
				establish a permanent diplomatic presence. The highest tower of the 
				Cloud Citadel awaited - the Data Embassy.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Data Embassy was established - a permanent connection between the 
					React Kingdom and external servers. <strong>Cloud Keeper Axios</strong> 
					showed Aria the grand architecture.
				</p>

				<p className='story-paragraph'>
					"This embassy will handle all diplomatic relations with servers," 
					Axios explained. "Global error handling, coordinated loading states, 
					optimistic updates - everything needed for production."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> implemented sophisticated data fetching patterns, 
					combining her custom hook knowledge with API calls. "It's like creating 
					a permanent embassy between our kingdom and the server!"
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> optimized the communication channels. "Request 
					deduplication, caching, automatic retries - efficiency at every level!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> ensured reliability. "Error boundaries, 
					fallback strategies, graceful degradation. The embassy must never 
					fail completely."
				</p>

				<p className='story-paragraph'>
					"You've done well," Axios praised. "But remember, with great data 
					comes great responsibility. Always validate, always handle errors, 
					always consider loading states."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Production Patterns Workshop</h3>
				<p className='instruction'>
					<strong>👉 Build your Data Embassy with production-ready patterns!</strong>
					Select each pattern to understand how it strengthens your server communication infrastructure.
				</p>
				
				<div className='protocol-chambers'>
					{productionPatterns.map(pattern => (
						<div
							key={pattern.id}
							className={`protocol-room ${selectedPattern === pattern.id ? 'active' : ''}`}
							onClick={() => {
								setSelectedPattern(pattern.id);
								establishEmbassy();
							}}>
							<div className='protocol-icon'>{pattern.icon}</div>
							<div className='protocol-name'>{pattern.name}</div>
							<div className='protocol-description'>{pattern.description}</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Embassy Features</h3>
				<div className='embassy-features'>
					{embassyFeatures.map((feature, index) => (
						<div key={index} className='feature-status'>
							<span>{feature.name}</span>
							<span className={feature.active ? 'active' : 'inactive'}>
								{feature.active ? '✅' : '⭕'}
							</span>
						</div>
					))}
				</div>

				<h3 className='section-title'>Loading State Coordinator</h3>
				<div className='loading-demo'>
					<button 
						className='send-request-button'
						onClick={simulateGlobalLoading}>
						Simulate Multiple Requests
					</button>
					
					<div className='loading-indicators'>
						<div className={`component-loader ${loadingStates.global ? 'loading' : ''}`}>
							Global Loader {loadingStates.global && '⏳'}
						</div>
						<div className={`component-loader ${loadingStates.component1 ? 'loading' : ''}`}>
							Component 1 {loadingStates.component1 && '⏳'}
						</div>
						<div className={`component-loader ${loadingStates.component2 ? 'loading' : ''}`}>
							Component 2 {loadingStates.component2 && '⏳'}
						</div>
					</div>
				</div>

				<h3 className='section-title'>Embassy Controls</h3>
				<div className='embassy-controls'>
					<div className='cache-control'>
						<span>Response Cache:</span>
						<button 
							className={`cache-indicator ${cacheEnabled ? '' : 'disabled'}`}
							onClick={toggleCache}>
							{cacheEnabled ? '🟢 Enabled' : '🔴 Disabled'}
						</button>
					</div>
					
					<div className='retry-counter'>
						<span>Retry Attempts:</span>
						<span className='retry-count'>{retryCount}</span>
						<button onClick={handleRetry}>Test Retry</button>
					</div>
				</div>

				{embassyEstablished && (
					<div className='embassy-achievement'>
						<h3>🏛️ Data Embassy Established!</h3>
						<p>
							You've created a robust, production-ready connection between 
							client and server! Your embassy handles errors gracefully, manages 
							loading states intelligently, and optimizes performance automatically.
						</p>
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Production API Architecture</span>
					<span className='discovered-by'>The Embassy's Master Blueprint</span>
				</div>
				<pre>
{`// The Complete Data Embassy - Production-Ready API Client
class DataEmbassy {
  constructor(config = {}) {
    this.baseURL = config.baseURL || '/api';
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.loadingManager = new LoadingStateManager();
    this.errorBoundary = new GlobalErrorHandler();
  }
  
  // Request with deduplication
  async request(endpoint, options = {}) {
    const requestKey = this.getRequestKey(endpoint, options);
    
    // Check for pending identical request
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }
    
    // Check cache
    if (options.cache && this.cache.has(requestKey)) {
      const cached = this.cache.get(requestKey);
      if (Date.now() - cached.timestamp < options.cacheTTL) {
        return Promise.resolve(cached.data);
      }
    }
    
    // Create new request
    const requestPromise = this.executeRequest(endpoint, options);
    this.pendingRequests.set(requestKey, requestPromise);
    
    try {
      const result = await requestPromise;
      
      // Cache successful responses
      if (options.cache) {
        this.cache.set(requestKey, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      return result;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }
  
  async executeRequest(endpoint, options) {
    this.loadingManager.start(endpoint);
    
    try {
      const response = await fetchWithRetry(
        this.baseURL + endpoint,
        options
      );
      
      if (!response.ok) {
        throw new ApiError(response.status, response.statusText);
      }
      
      return await response.json();
    } catch (error) {
      this.errorBoundary.handle(error);
      throw error;
    } finally {
      this.loadingManager.stop(endpoint);
    }
  }
}

// Global Loading State Manager - Coordinated UI States
class LoadingStateManager {
  constructor() {
    this.activeRequests = new Set();
    this.listeners = new Set();
  }
  
  start(key) {
    this.activeRequests.add(key);
    this.notify();
  }
  
  stop(key) {
    this.activeRequests.delete(key);
    this.notify();
  }
  
  isLoading() {
    return this.activeRequests.size > 0;
  }
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  notify() {
    const loading = this.isLoading();
    this.listeners.forEach(listener => listener(loading));
  }
}

// Hook for global loading state
function useGlobalLoading() {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const unsubscribe = loadingManager.subscribe(setIsLoading);
    return unsubscribe;
  }, []);
  
  return isLoading;
}

// Optimistic Update Pattern - Ambassador's Confidence
function useOptimisticUpdate(initialData, updateFn) {
  const [data, setData] = useState(initialData);
  const [rollbackData, setRollbackData] = useState(null);
  
  const optimisticUpdate = async (newData) => {
    // Store current state for rollback
    setRollbackData(data);
    
    // Apply optimistic update immediately
    setData(newData);
    
    try {
      // Attempt server update
      const confirmed = await updateFn(newData);
      setData(confirmed);
      setRollbackData(null);
    } catch (error) {
      // Rollback on failure
      setData(rollbackData);
      setRollbackData(null);
      throw error;
    }
  };
  
  return [data, optimisticUpdate];
}

// Usage Example - The Embassy in Action
function KingdomManager() {
  const embassy = new DataEmbassy({ 
    baseURL: 'https://api.reactkingdom.com' 
  });
  
  const { data: kingdoms, loading, error } = useApiData(
    () => embassy.request('/kingdoms', { cache: true })
  );
  
  const [selectedKingdom, updateKingdom] = useOptimisticUpdate(
    null,
    async (kingdom) => {
      return embassy.request(\`/kingdoms/\${kingdom.id}\`, {
        method: 'PUT',
        body: JSON.stringify(kingdom)
      });
    }
  );
  
  const globalLoading = useGlobalLoading();
  
  if (globalLoading) {
    return <div>The Embassy is processing requests...</div>;
  }
  
  return (
    <div>
      {/* Your kingdom management UI */}
    </div>
  );
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Embassy Insight:</h3>
				<p>
					Building a production-ready API layer requires thinking beyond individual 
					requests. It's about creating a robust system that handles the 
					complexities of distributed communication: network failures, concurrent 
					requests, authentication flows, and performance optimization.
				</p>
				<p>
					The Data Embassy represents a mature approach to server communication - 
					centralized, resilient, and efficient. By establishing proper patterns 
					from the start, you create a foundation that scales with your 
					application's growth.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Production Architecture</h3>
				<p>
					<strong>How does centralized API management improve maintainability?</strong> 
					Consider how changes to authentication, error handling, or caching can 
					be made in one place rather than scattered throughout components.
				</p>
				<p>
					<strong>What role does optimistic updating play in user experience?</strong> 
					Think about how immediate UI feedback affects perceived performance, 
					even when network operations take time.
				</p>
			</div>

			<div className='character-intro'>
				<h4>Aria's Journal - Cloud Citadel Day 3</h4>
				<p>
					The Data Embassy is complete! I've learned so much - from basic fetch calls 
					to production architectures. Request deduplication, caching, global error 
					handling... it's like building a real diplomatic infrastructure. Cloud Keeper 
					Axios says I'm ready for the next challenge. What could be more advanced than this?
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					Standing atop the completed Data Embassy, <strong>Aria</strong> surveyed 
					her achievement. "We've built more than just API calls - we've created 
					a robust communication infrastructure."
				</p>
				<p>
					<strong>Cloud Keeper Axios</strong> nodded with approval. "The embassy 
					will serve the React Kingdom well. Errors are handled gracefully, 
					performance is optimized, and the user experience remains smooth."
				</p>
				<p>
					<strong>Binary</strong> compiled the statistics. "Request deduplication 
					reduced API calls by 40%. Caching improved response times by 60%. 
					Impressive efficiency gains!"
				</p>
				<p>
					<strong>Debuggora</strong> added, "And with proper error boundaries, 
					no single failure can bring down the entire application."
				</p>
				<p>
					Master Aurelius appeared at the embassy entrance. "Excellent work, 
					Ambassador. But static requests are just the beginning. Are you ready 
					to explore real-time connections? The Living Streams await..."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;