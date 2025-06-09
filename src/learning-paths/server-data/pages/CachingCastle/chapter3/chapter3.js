import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 3: The Optimized Kingdom</h2>

			<div className='chapter-bridge'>
				<p>With caching strategies mastered and invalidation patterns understood, 
				it was time to architect a complete caching system for the React Kingdom.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> designed a comprehensive caching system. Data flowed 
					efficiently, users experienced instant responses, and the servers breathed 
					easier.
				</p>

				<p className='story-paragraph'>
					"You've learned the balance," <strong>Cache Lord Redux</strong> approved. 
					"Fresh when needed, cached when possible."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Cache Architecture Overview</h3>
				<p className='instruction'>
					<strong>👉 Explore the complete caching architecture of the optimized kingdom!</strong>
				</p>

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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Production Cache Architecture</span>
					<span className='discovered-by'>The Optimized Kingdom Blueprint</span>
				</div>
				<pre>
{`// Complete Cache System - The Castle's Architecture
class CacheSystem {
  constructor(config = {}) {
    // Multi-layer cache setup
    this.layers = {
      l1: new MemoryCache({ maxSize: config.l1Size || 100 }),
      l2: new RedisCache({ connection: config.redis }),
      l3: new CDNCache({ provider: config.cdn })
    };
    
    // Monitoring and metrics
    this.metrics = new CacheMetrics();
    this.monitor = new CacheMonitor(this.metrics);
    
    // Policies
    this.evictionPolicy = config.evictionPolicy || 'LRU';
    this.ttlStrategy = config.ttlStrategy || 'adaptive';
  }
  
  async get(key, options = {}) {
    const startTime = Date.now();
    
    // Try each layer
    for (const [layerName, layer] of Object.entries(this.layers)) {
      const cached = await layer.get(key);
      
      if (cached) {
        this.metrics.recordHit(layerName, Date.now() - startTime);
        
        // Promote to higher layers
        if (layerName !== 'l1') {
          this.promote(key, cached, layerName);
        }
        
        return cached;
      }
    }
    
    this.metrics.recordMiss(key);
    return null;
  }
  
  async set(key, value, options = {}) {
    const ttl = this.calculateTTL(key, value, options);
    
    // Write-through strategy
    const promises = Object.entries(this.layers).map(
      ([name, layer]) => layer.set(key, value, { ttl })
    );
    
    await Promise.all(promises);
    this.metrics.recordWrite(key);
  }
  
  calculateTTL(key, value, options) {
    if (this.ttlStrategy === 'adaptive') {
      // Use access patterns to determine TTL
      const accessFrequency = this.metrics.getAccessFrequency(key);
      const dataVolatility = this.estimateVolatility(key);
      
      return Math.min(
        300000, // 5 minutes max
        Math.max(
          10000,  // 10 seconds min
          60000 / (accessFrequency * dataVolatility)
        )
      );
    }
    
    return options.ttl || 60000;
  }
}

// React Integration - Aria's Implementation
function useCacheSystem() {
  const cacheSystem = useRef(null);
  const [metrics, setMetrics] = useState({
    hitRate: 0,
    avgLatency: 0,
    cacheSize: 0
  });
  
  useEffect(() => {
    cacheSystem.current = new CacheSystem({
      l1Size: 100,
      redis: process.env.REACT_APP_REDIS_URL,
      cdn: process.env.REACT_APP_CDN_CONFIG
    });
    
    // Monitor metrics
    const interval = setInterval(() => {
      setMetrics(cacheSystem.current.metrics.getSummary());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const cachedFetch = useCallback(async (url, options = {}) => {
    const cacheKey = \`fetch:\${url}\`;
    
    // Check cache first
    const cached = await cacheSystem.current.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Fetch and cache
    const response = await fetch(url, options);
    const data = await response.json();
    
    await cacheSystem.current.set(cacheKey, data, {
      ttl: options.cacheTTL
    });
    
    return data;
  }, []);
  
  return { cachedFetch, metrics };
}

// Performance Monitoring - Binary's Dashboard
class CacheMonitor {
  constructor(metrics) {
    this.metrics = metrics;
    this.alerts = [];
    this.thresholds = {
      hitRate: 0.7,      // Alert if below 70%
      latency: 100,      // Alert if above 100ms
      errorRate: 0.05    // Alert if above 5%
    };
  }
  
  startMonitoring() {
    setInterval(() => {
      const summary = this.metrics.getSummary();
      
      // Check thresholds
      if (summary.hitRate < this.thresholds.hitRate) {
        this.alert('LOW_HIT_RATE', \`Hit rate: \${summary.hitRate}\`);
      }
      
      if (summary.avgLatency > this.thresholds.latency) {
        this.alert('HIGH_LATENCY', \`Latency: \${summary.avgLatency}ms\`);
      }
      
      // Auto-optimization
      if (summary.hitRate < 0.5) {
        this.optimizeCache();
      }
    }, 60000); // Check every minute
  }
  
  optimizeCache() {
    // Analyze patterns and adjust
    const patterns = this.metrics.getAccessPatterns();
    
    patterns.forEach(pattern => {
      if (pattern.frequency > 10 && pattern.hitRate < 0.8) {
        // Pre-warm frequently accessed keys
        this.warmKey(pattern.key);
      }
    });
  }
}

// The Complete System - Cache Lord's Gift
function OptimizedKingdom() {
  const { cachedFetch, metrics } = useCacheSystem();
  const [kingdoms, setKingdoms] = useState([]);
  
  useEffect(() => {
    // All API calls automatically cached
    cachedFetch('/api/kingdoms').then(setKingdoms);
  }, [cachedFetch]);
  
  return (
    <div className="optimized-kingdom">
      <CacheDashboard metrics={metrics} />
      <KingdomList kingdoms={kingdoms} />
    </div>
  );
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Optimization Insight:</h3>
				<p>
					A complete caching architecture involves multiple layers, intelligent 
					TTL calculation, automatic optimization, and comprehensive monitoring. 
					By combining memory caches, distributed caches, and CDN layers, modern 
					applications can achieve sub-millisecond response times while reducing 
					server load by orders of magnitude.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Cache Architecture</h3>
				<p>
					<strong>How do multiple cache layers improve resilience?</strong> 
					Consider how each layer provides fallback options and reduces single 
					points of failure.
				</p>
				<p>
					<strong>What metrics are most important for cache optimization?</strong> 
					Think about the balance between hit rate, latency, and resource usage.
				</p>
			</div>

			<div className='character-intro'>
				<h4>Aria's Journal - Caching Castle Day 3</h4>
				<p>
					The complete caching system is incredible! Multiple layers work together 
					seamlessly, data flows efficiently, and users get instant responses. 
					Cache Lord Redux taught me that caching isn't just about storage - it's 
					about creating a smart, adaptive system that learns and improves over time.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					Standing atop the Caching Castle, <strong>Aria</strong> surveyed the 
					optimized kingdom. "Every request flows through our intelligent cache 
					layers. The servers can finally rest!"
				</p>
				<p>
					<strong>Cache Lord Redux</strong> nodded with pride. "You've built more 
					than a cache - you've created a living system that adapts and optimizes 
					itself."
				</p>
				<p>
					<strong>Binary</strong> displayed the metrics. "97% cache hit rate, 
					sub-millisecond latency, 80% reduction in server load. Maximum efficiency 
					achieved!"
				</p>
				<p>
					<strong>Debuggora</strong> added, "And with proper monitoring, we can 
					prevent issues before they impact users."
				</p>
				<p>
					Master Aurelius appeared once more. "Excellent work! You've mastered 
					traditional data patterns. But there's a new paradigm awaiting - the 
					GraphQL Gateway, where queries become conversations..."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;