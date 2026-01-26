import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={3}
				title={`The Data Embassy`}
				bridge={`With protocols mastered and patterns understood, Cloud Keeper Axios led Aria to the highest tower of the Cloud Citadel. "You're ready for the final challenge," Axios announced. "Here, you'll establish the Data Embassy - a permanent, production-ready connection between the React Kingdom and external servers."`}
			/>

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
				
				<InstructionBox character={`Cloud Keeper Axios presents the Embassy blueprints.`}>
					Build your Data Embassy with production-ready patterns!
					Select each pattern to understand how it strengthens your server communication infrastructure.
				</InstructionBox>
				
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

			<CodeExample
				title={`Production API Architecture`}
				discoveredBy={`The Embassy's Master Blueprint`}
				code={`// The Complete Data Embassy
class DataEmbassy {
  constructor(config = {}) {
    this.baseURL = config.baseURL || '/api';
    this.cache = new Map();
    this.pendingRequests = new Map();
  }
  
  async request(endpoint, options = {}) {
    const requestKey = this.getRequestKey(endpoint, options);
    
    // Deduplication - reuse pending identical requests
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }
    
    // Check cache first
    if (options.cache && this.cache.has(requestKey)) {
      const cached = this.cache.get(requestKey);
      if (Date.now() - cached.timestamp < options.cacheTTL) {
        return Promise.resolve(cached.data);
      }
    }
    
    const requestPromise = this.executeRequest(endpoint, options);
    this.pendingRequests.set(requestKey, requestPromise);
    
    try {
      const result = await requestPromise;
      if (options.cache) {
        this.cache.set(requestKey, { data: result, timestamp: Date.now() });
      }
      return result;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }
}

// Optimistic Updates - Instant UI feedback
function useOptimisticUpdate(initialData, updateFn) {
  const [data, setData] = useState(initialData);
  const [rollbackData, setRollbackData] = useState(null);
  
  const optimisticUpdate = async (newData) => {
    setRollbackData(data);
    setData(newData); // Apply immediately
    try {
      const confirmed = await updateFn(newData);
      setData(confirmed);
    } catch (error) {
      setData(rollbackData); // Rollback on failure
      throw error;
    }
  };
  return [data, optimisticUpdate];
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Embassy Insight:`,
					content: `Building a production-ready API layer requires thinking beyond individual requests. The Data Embassy represents a mature approach - centralized, resilient, and efficient. Request deduplication, caching, global error handling, and optimistic updates create a foundation that scales with your application's growth.`
				}}
				reflectionQuestions={[
					`How does centralized API management improve maintainability?`,
					`What role does optimistic updating play in user experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 41 (Evening)`,
					content: `The Data Embassy is complete! From basic fetch calls to production architecture - what a journey! Request deduplication reduced API calls by 40%, caching improved response times by 60%. I built a LoadingStateManager for coordinated UI states and learned optimistic updates for instant feedback. Cloud Keeper Axios's final wisdom: "The embassy will serve the React Kingdom well." Binary compiled impressive statistics while Debuggora ensured error boundaries protect against cascading failures. Master Aurelius appeared: "The Living Streams await..."`
				}}
				chapterEnding={[
					`Standing atop the completed Data Embassy, Aria surveyed her achievement. "We've built more than just API calls - we've created a robust communication infrastructure."`,
					`Cloud Keeper Axios nodded with approval. "The embassy will serve the React Kingdom well. Errors are handled gracefully, performance is optimized, and the user experience remains smooth."`,
					`Binary compiled the statistics. "Request deduplication reduced API calls by 40%. Caching improved response times by 60%. Impressive efficiency gains!"`,
					`Master Aurelius appeared at the embassy entrance. "Excellent work, Ambassador. But static requests are just the beginning. Are you ready to explore real-time connections? The Living Streams await..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;