import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		cacheStore,
		cacheHits,
		cacheMisses,
		hitRate,
		invalidationQueue,
		cacheMetrics,
		clearAllCache
	} = useOutletContext();

	const [architectureView, setArchitectureView] = useState('overview');
	const [cacheNodes] = useState([
		{ id: 'primary', name: 'Primary Cache', type: 'Memory', size: cacheStore.size },
		{ id: 'secondary', name: 'Secondary Cache', type: 'Redis', size: 42 },
		{ id: 'cdn', name: 'CDN Cache', type: 'Edge', size: 128 }
	]);

	const architectureComponents = {
		overview: {
			title: 'Complete Cache Architecture',
			description: 'A comprehensive caching system with multiple layers'
		},
		layers: {
			title: 'Cache Layers',
			description: 'Browser → Memory → Redis → Database'
		},
		policies: {
			title: 'Cache Policies',
			description: 'LRU, LFU, TTL-based eviction strategies'
		},
		monitoring: {
			title: 'Cache Monitoring',
			description: 'Real-time metrics and alerting'
		}
	};

	const calculateCacheSize = () => {
		let totalSize = 0;
		cacheStore.forEach(value => {
			totalSize += JSON.stringify(value).length;
		});
		return (totalSize / 1024).toFixed(2); // KB
	};

	const getCacheHealth = () => {
		if (hitRate > 80) return { status: 'Excellent', color: '#27ae60' };
		if (hitRate > 60) return { status: 'Good', color: '#3498db' };
		if (hitRate > 40) return { status: 'Fair', color: '#f39c12' };
		return { status: 'Poor', color: '#e74c3c' };
	};

	const health = getCacheHealth();

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Optimized Kingdom`}
				bridge={`"You've mastered strategies and invalidation," Cache Lord Redux said, ascending to the highest tower. "Now it's time to architect a complete caching system. Multiple layers, intelligent TTL, automatic optimization - the Optimized Kingdom awaits!"`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Aria</strong> designed a comprehensive caching system. Data flowed efficiently, users experienced instant responses, and the servers breathed easier.</>,
				<>"You've learned the balance," <strong>Cache Lord Redux</strong> approved. "Fresh when needed, cached when possible."</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Cache Architecture Overview</h3>
				
				<InstructionBox character={`Cache Lord Redux unveils the complete architecture.`}>
					Explore the complete caching architecture of the optimized kingdom!
				</InstructionBox>

				<div style={{
					display: 'flex',
					gap: '10px',
					marginBottom: '20px',
					flexWrap: 'wrap'
				}}>
					{Object.entries(architectureComponents).map(([key, component]) => (
						<button
							key={key}
							className={`cache-button ${architectureView === key ? 'warm' : ''}`}
							onClick={() => setArchitectureView(key)}
							style={{
								background: architectureView === key ? '#3498db' : '#95a5a6'
							}}>
							{component.title}
						</button>
					))}
				</div>

				<div style={{
					background: '#f8f9fa',
					padding: '20px',
					borderRadius: '8px',
					marginBottom: '20px'
				}}>
					<h4>{architectureComponents[architectureView].title}</h4>
					<p>{architectureComponents[architectureView].description}</p>
					
					{architectureView === 'overview' && (
						<div className='distributed-cache'>
							{cacheNodes.map((node, index) => (
								<React.Fragment key={node.id}>
									<div className={`cache-node ${node.id === 'primary' ? 'primary' : ''}`}>
										<div className='cache-node-icon'>
											{node.type === 'Memory' ? '🧠' : node.type === 'Redis' ? '💾' : '🌐'}
										</div>
										<div className='cache-node-label'>{node.name}</div>
										<div className='cache-node-status'>
											{node.id === 'primary' ? cacheStore.size : node.size} items
										</div>
									</div>
									{index < cacheNodes.length - 1 && (
										<div className='sync-arrow'>→</div>
									)}
								</React.Fragment>
							))}
						</div>
					)}
					
					{architectureView === 'layers' && (
						<div style={{textAlign: 'center', padding: '20px'}}>
							<div style={{
								display: 'inline-flex',
								flexDirection: 'column',
								gap: '20px'
							}}>
								<div style={{
									padding: '15px 30px',
									background: '#3498db',
									color: 'white',
									borderRadius: '8px'
								}}>
									Browser Cache (Service Worker)
								</div>
								<div>↓</div>
								<div style={{
									padding: '15px 30px',
									background: '#2ecc71',
									color: 'white',
									borderRadius: '8px'
								}}>
									Application Memory Cache
								</div>
								<div>↓</div>
								<div style={{
									padding: '15px 30px',
									background: '#e74c3c',
									color: 'white',
									borderRadius: '8px'
								}}>
									Redis/Memcached
								</div>
								<div>↓</div>
								<div style={{
									padding: '15px 30px',
									background: '#95a5a6',
									color: 'white',
									borderRadius: '8px'
								}}>
									Database
								</div>
							</div>
						</div>
					)}
					
					{architectureView === 'policies' && (
						<div>
							<h5>Eviction Policies</h5>
							<ul style={{marginLeft: '20px'}}>
								<li><strong>LRU (Least Recently Used)</strong>: Remove oldest accessed items</li>
								<li><strong>LFU (Least Frequently Used)</strong>: Remove least popular items</li>
								<li><strong>TTL-based</strong>: Remove expired items automatically</li>
								<li><strong>Size-based</strong>: Maintain maximum cache size</li>
							</ul>
						</div>
					)}
					
					{architectureView === 'monitoring' && (
						<div>
							<h5>Real-time Monitoring</h5>
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '15px',
								marginTop: '15px'
							}}>
								<div style={{
									padding: '10px',
									background: 'white',
									borderRadius: '5px',
									textAlign: 'center'
								}}>
									<div style={{fontSize: '1.5em', color: health.color}}>
										{health.status}
									</div>
									<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
										Cache Health
									</div>
								</div>
								<div style={{
									padding: '10px',
									background: 'white',
									borderRadius: '5px',
									textAlign: 'center'
								}}>
									<div style={{fontSize: '1.5em'}}>
										{calculateCacheSize()} KB
									</div>
									<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
										Cache Size
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<h3 className='section-title'>Kingdom Cache Dashboard</h3>
				<div className='cache-dashboard'>
					<h4 style={{marginBottom: '20px'}}>Overall System Performance</h4>
					
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '20px',
						marginBottom: '20px'
					}}>
						<div style={{
							background: 'white',
							padding: '20px',
							borderRadius: '8px',
							textAlign: 'center'
						}}>
							<h5>Total Requests</h5>
							<div style={{fontSize: '2em', color: '#3498db'}}>
								{cacheHits + cacheMisses}
							</div>
						</div>
						<div style={{
							background: 'white',
							padding: '20px',
							borderRadius: '8px',
							textAlign: 'center'
						}}>
							<h5>Cache Efficiency</h5>
							<div style={{fontSize: '2em', color: health.color}}>
								{hitRate}%
							</div>
						</div>
					</div>
					
					<div style={{
						background: 'white',
						padding: '20px',
						borderRadius: '8px'
					}}>
						<h5>Performance Impact</h5>
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: '15px'
						}}>
							<div>
								<div style={{fontSize: '1.2em', color: '#27ae60'}}>
									{Math.round(cacheHits * 100)}ms
								</div>
								<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
									Time Saved
								</div>
							</div>
							<div>
								<div style={{fontSize: '1.2em', color: '#3498db'}}>
									{Math.round(cacheHits * 0.05)}MB
								</div>
								<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
									Bandwidth Saved
								</div>
							</div>
							<div>
								<div style={{fontSize: '1.2em', color: '#e74c3c'}}>
									{cacheMisses}
								</div>
								<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
									Server Requests
								</div>
							</div>
						</div>
					</div>
				</div>

				<h3 className='section-title'>Cache Management Center</h3>
				<div style={{
					background: 'white',
					padding: '20px',
					borderRadius: '8px',
					textAlign: 'center'
				}}>
					<p style={{marginBottom: '15px'}}>
						Current cache contains <strong>{cacheStore.size}</strong> items 
						totaling <strong>{calculateCacheSize()} KB</strong>
					</p>
					<button 
						className='cache-button clear'
						onClick={clearAllCache}>
						🗑️ Clear All Caches
					</button>
				</div>

				<h3 className='section-title'>Recent Activity</h3>
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '20px'
				}}>
					<div>
						<h5>Cache Activity</h5>
						<div className='cache-timeline' style={{maxHeight: '150px'}}>
							{cacheMetrics.slice(-5).map((event, index) => (
								<div key={index} className={`timeline-event ${event.type}`}>
									<span className='timeline-icon'>
										{event.type === 'hit' ? '✅' : '❌'}
									</span>
									<span className='timeline-key'>{event.key}</span>
								</div>
							))}
						</div>
					</div>
					
					<div>
						<h5>Invalidations</h5>
						<div className='cache-timeline' style={{maxHeight: '150px'}}>
							{invalidationQueue.slice(-5).map((item, index) => (
								<div key={index} className='timeline-event miss'>
									<span className='timeline-icon'>🗑️</span>
									<span className='timeline-key'>{item.key}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Production Cache Architecture`}
				discoveredBy={`The Optimized Kingdom Blueprint`}
				code={`// Multi-Layer Cache System
class CacheSystem {
  constructor(config = {}) {
    this.layers = {
      l1: new MemoryCache({ maxSize: 100 }),
      l2: new RedisCache({ connection: config.redis }),
      l3: new CDNCache({ provider: config.cdn })
    };
    this.metrics = new CacheMetrics();
  }
  
  async get(key) {
    for (const [layerName, layer] of Object.entries(this.layers)) {
      const cached = await layer.get(key);
      if (cached) {
        this.metrics.recordHit(layerName);
        if (layerName !== 'l1') this.promote(key, cached);
        return cached;
      }
    }
    this.metrics.recordMiss(key);
    return null;
  }
}

// React Integration
function useCacheSystem() {
  const cache = useRef(new CacheSystem());
  
  const cachedFetch = useCallback(async (url) => {
    const cached = await cache.current.get(url);
    if (cached) return cached;
    
    const data = await fetch(url).then(r => r.json());
    await cache.current.set(url, data);
    return data;
  }, []);
  
  return { cachedFetch };
}

// Usage
function OptimizedKingdom() {
  const { cachedFetch } = useCacheSystem();
  useEffect(() => {
    cachedFetch('/api/kingdoms').then(setKingdoms);
  }, [cachedFetch]);
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Optimization Insight:`,
					content: `A complete caching architecture involves multiple layers (Memory → Redis → CDN), intelligent TTL calculation, automatic optimization, and comprehensive monitoring. Modern applications can achieve sub-millisecond response times while reducing server load by orders of magnitude.`
				}}
				reflectionQuestions={[
					`How do multiple cache layers improve resilience?`,
					`What metrics are most important for cache optimization?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 43 (Evening)`,
					content: `The complete caching system is incredible! Built a multi-layer architecture: L1 Memory (🧠) for speed, L2 Redis (💾) for persistence, L3 CDN (🌐) for global distribution. Binary displayed amazing metrics: 97% cache hit rate, sub-millisecond latency, 80% server load reduction! Cache Lord's final wisdom: "You've built more than a cache - you've created a living system that adapts and optimizes itself." Next: the GraphQL Gateway!`
				}}
				lessonEnding={[
					`Standing atop the Caching Castle, Aria surveyed the optimized kingdom. "Every request flows through our intelligent cache layers. The servers can finally rest!"`,
					`Cache Lord Redux nodded with pride. "You've built more than a cache - you've created a living system that adapts and optimizes itself."`,
					`Binary displayed the metrics. "97% cache hit rate, sub-millisecond latency, 80% reduction in server load. Maximum efficiency achieved!"`,
					`Master Aurelius appeared once more. "Excellent work! You've mastered traditional data patterns. But there's a new paradigm awaiting - the GraphQL Gateway, where queries become conversations..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;