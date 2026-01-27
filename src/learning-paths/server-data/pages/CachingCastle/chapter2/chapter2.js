import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		cacheStore,
		invalidationQueue,
		cacheMetrics,
		ttlSettings,
		setTtlSettings,
		invalidateCache,
		setInCache,
		warmCache,
		isWarmingCache
	} = useOutletContext();

	const [invalidationPattern, setInvalidationPattern] = useState('');
	const [showPrediction, setShowPrediction] = useState(false);

	// Simulate usage pattern analysis
	const analyzeUsagePatterns = () => {
		const patterns = cacheMetrics.reduce((acc, metric) => {
			if (!acc[metric.key]) {
				acc[metric.key] = { hits: 0, misses: 0, lastAccess: 0 };
			}
			if (metric.type === 'hit') acc[metric.key].hits++;
			if (metric.type === 'miss') acc[metric.key].misses++;
			acc[metric.key].lastAccess = metric.timestamp;
			return acc;
		}, {});
		
		return Object.entries(patterns).map(([key, stats]) => ({
			key,
			...stats,
			hitRate: stats.hits / (stats.hits + stats.misses) || 0,
			accessFrequency: (stats.hits + stats.misses) / (Date.now() - stats.lastAccess) * 1000
		}));
	};

	const handleSmartInvalidation = () => {
		if (!invalidationPattern) return;
		
		// Invalidate matching keys
		Array.from(cacheStore.keys()).forEach(key => {
			if (key.includes(invalidationPattern)) {
				invalidateCache(key);
			}
		});
	};

	const handleTTLUpdate = (type, value) => {
		setTtlSettings(prev => ({
			...prev,
			[type]: value
		}));
	};

	// Partial update simulation
	const handlePartialUpdate = (key) => {
		const cached = cacheStore.get(key);
		if (cached) {
			const updated = {
				...cached,
				data: JSON.stringify({
					...JSON.parse(cached.data || '{}'),
					lastUpdated: new Date().toISOString()
				})
			};
			setInCache(key, updated.data, cached.ttl);
		}
	};

	const usagePatterns = analyzeUsagePatterns();

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Invalidation Rituals`}
				bridge={`"You've mastered storing data," Cache Lord Redux said, leading Aria to the Invalidation Chamber. "But the hardest problem in caching is knowing when to let go. Stale data is sometimes acceptable, but serving truly outdated information can mislead your users."`}
			/>

		<StorySection
			paragraphs={[
				<>"The hardest problem in caching," <strong>Cache Lord Redux</strong> intoned, "is knowing when to let go." Aria learned cache invalidation - the art of knowing when data was no longer fresh.</>,
				<><strong>Binary</strong> calculated probabilities. "Based on usage patterns, we can predict when to refresh!"</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Invalidation Patterns</h3>
				
				<InstructionBox character={`Cache Lord Redux demonstrates the Invalidation Rituals.`}>
					Master the art of cache invalidation through smart patterns!
				</InstructionBox>

				<div style={{
					background: 'white',
					padding: '20px',
					borderRadius: '8px',
					marginBottom: '20px'
				}}>
					<h4>Smart Invalidation</h4>
					<div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
						<input
							type='text'
							placeholder='Enter pattern (e.g., "user", "api/products")'
							value={invalidationPattern}
							onChange={(e) => setInvalidationPattern(e.target.value)}
							style={{
								flex: 1,
								padding: '8px',
								border: '1px solid #e0e0e0',
								borderRadius: '5px'
							}}
						/>
						<button 
							className='cache-button clear'
							onClick={handleSmartInvalidation}>
							🎯 Invalidate Pattern
						</button>
					</div>
					
					<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
						Current cache keys: {Array.from(cacheStore.keys()).join(', ') || 'None'}
					</div>
				</div>

				<h3 className='section-title'>TTL Management</h3>
				<div className='ttl-settings'>
					<div className='ttl-control'>
						<div className='ttl-label'>Default TTL:</div>
						<div className='ttl-slider'>
							<div 
								className='ttl-slider-fill' 
								style={{width: `${(ttlSettings.default / 300000) * 100}%`}}
							/>
						</div>
						<div className='ttl-value'>{ttlSettings.default / 1000}s</div>
						<button onClick={() => handleTTLUpdate('default', ttlSettings.default + 10000)}>+</button>
						<button onClick={() => handleTTLUpdate('default', Math.max(10000, ttlSettings.default - 10000))}>-</button>
					</div>
					
					<div className='ttl-control'>
						<div className='ttl-label'>API TTL:</div>
						<div className='ttl-slider'>
							<div 
								className='ttl-slider-fill' 
								style={{width: `${(ttlSettings.api / 300000) * 100}%`}}
							/>
						</div>
						<div className='ttl-value'>{ttlSettings.api / 1000}s</div>
						<button onClick={() => handleTTLUpdate('api', ttlSettings.api + 10000)}>+</button>
						<button onClick={() => handleTTLUpdate('api', Math.max(10000, ttlSettings.api - 10000))}>-</button>
					</div>
					
					<div className='ttl-control'>
						<div className='ttl-label'>Static TTL:</div>
						<div className='ttl-slider'>
							<div 
								className='ttl-slider-fill' 
								style={{width: `${(ttlSettings.static / 300000) * 100}%`}}
							/>
						</div>
						<div className='ttl-value'>{ttlSettings.static / 1000}s</div>
						<button onClick={() => handleTTLUpdate('static', ttlSettings.static + 10000)}>+</button>
						<button onClick={() => handleTTLUpdate('static', Math.max(10000, ttlSettings.static - 10000))}>-</button>
					</div>
				</div>

				<h3 className='section-title'>Usage Pattern Analysis</h3>
				<div style={{
					background: '#f8f9fa',
					padding: '20px',
					borderRadius: '8px',
					marginBottom: '20px'
				}}>
					<button 
						className='cache-button warm'
						onClick={() => setShowPrediction(!showPrediction)}
						style={{marginBottom: '15px'}}>
						🔮 {showPrediction ? 'Hide' : 'Show'} Binary's Predictions
					</button>
					
					{showPrediction && usagePatterns.length > 0 && (
						<div>
							<h4>Cache Usage Patterns</h4>
							{usagePatterns.map(pattern => (
								<div key={pattern.key} style={{
									marginBottom: '10px',
									padding: '10px',
									background: 'white',
									borderRadius: '5px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<strong>{pattern.key}</strong>
										<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
											Hit Rate: {Math.round(pattern.hitRate * 100)}%
										</div>
									</div>
									<button 
										onClick={() => handlePartialUpdate(pattern.key)}
										style={{
											padding: '5px 10px',
											background: '#3498db',
											color: 'white',
											border: 'none',
											borderRadius: '3px',
											cursor: 'pointer'
										}}>
										Partial Update
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<h3 className='section-title'>Cache Warming Chamber</h3>
				<div className='cache-warming'>
					{isWarmingCache ? (
						<>
							<div className='warming-spinner'></div>
							<div className='warming-status'>Warming critical paths...</div>
						</>
					) : (
						<>
							<p>Pre-load critical data for instant access</p>
							<button 
								className='cache-button warm'
								onClick={warmCache}>
								🔥 Warm Cache
							</button>
						</>
					)}
				</div>

				<h3 className='section-title'>Invalidation Queue</h3>
				{invalidationQueue.length > 0 && (
					<div className='invalidation-queue'>
						<div className='invalidation-header'>
							<div className='invalidation-title'>Recent Invalidations</div>
							<div>{invalidationQueue.length} items</div>
						</div>
						<div className='invalidation-list'>
							{invalidationQueue.map((item, index) => (
								<div key={index} className='invalidation-item'>
									<span>{item.key}</span>
									<span>{new Date(item.timestamp).toLocaleTimeString()}</span>
								</div>
							))}
						</div>
					</div>
				)}

				<h3 className='section-title'>Cache Timeline</h3>
				<div className='cache-timeline'>
					{cacheMetrics.length === 0 ? (
						<p style={{color: '#95a5a6', textAlign: 'center'}}>
							No cache activity yet. Try some operations!
						</p>
					) : (
						cacheMetrics.map((event, index) => (
							<div key={index} className={`timeline-event ${event.type}`}>
								<span className='timeline-icon'>
									{event.type === 'hit' ? '✅' : '❌'}
								</span>
								<span className='timeline-key'>{event.key}</span>
								<span className='timeline-time'>
									{new Date(event.timestamp).toLocaleTimeString()}
								</span>
							</div>
						))
					)}
				</div>
			</div>

			<CodeExample
				title={`Advanced Caching Patterns`}
				discoveredBy={`Binary's Predictive Algorithms`}
				code={`// Pattern-Based Invalidation
class SmartCache {
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        this.emit('invalidated', { key, pattern });
      }
    }
  }
  
  // Cascade invalidation for dependent data
  invalidateCascade(key) {
    const dependencies = this.getDependencies(key);
    dependencies.forEach(dep => {
      this.cache.delete(dep);
      this.invalidateCascade(dep); // Recursive
    });
  }
}

// Cache Warming - Proactive Loading
class CacheWarmer {
  async warmCache() {
    const promises = this.endpoints.map(async endpoint => {
      const data = await fetch(endpoint.url).then(r => r.json());
      this.cache.set(endpoint.key, data, { ttl: endpoint.ttl });
      return { success: true, key: endpoint.key };
    });
    return Promise.allSettled(promises);
  }
}

// Partial Updates - Surgical Cache Surgery
async function updateCachePartially(key, updates) {
  const cached = cache.get(key);
  if (!cached) return null;
  const updated = { ...cached.data, ...updates };
  cache.set(key, updated, { ttl: cached.ttl - cached.age });
  return updated;
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Invalidation Insight:`,
					content: `Cache invalidation is one of the hardest problems in computer science. Smart strategies include pattern-based clearing, cascade invalidation for dependent data, partial updates for surgical changes, and cache warming for proactive loading. The key is balancing efficiency with consistency.`
				}}
				reflectionQuestions={[
					`How do you decide the right TTL for different data types?`,
					`What are the risks of aggressive cache warming?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 43 (Afternoon)`,
					content: `The Invalidation Rituals are tricky! "Knowing when to let go is the true challenge," Cache Lord said. Learned pattern-based invalidation (🎯), cascade invalidation for dependent data, and cache warming (🔥) for proactive loading. Binary displayed probability charts: "With proper patterns, we can achieve 95% efficiency while maintaining integrity!" Also learned partial updates - surgical changes without full refetch. The hardest part: predicting when data becomes stale.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;