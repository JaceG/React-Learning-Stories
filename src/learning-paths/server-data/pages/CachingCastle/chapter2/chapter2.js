import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 2: The Invalidation Rituals</h2>

			<div className='chapter-bridge'>
				<p>With the memory vaults established, Cache Lord Redux revealed the most 
				challenging aspect of caching - knowing when to let go.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"The hardest problem in caching," <strong>Cache Lord Redux</strong> intoned, 
					"is knowing when to let go." Aria learned cache invalidation - the art of 
					knowing when data was no longer fresh.
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> calculated probabilities. "Based on usage patterns, 
					we can predict when to refresh!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Invalidation Patterns</h3>
				<p className='instruction'>
					<strong>👉 Master the art of cache invalidation through smart patterns!</strong>
				</p>

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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Advanced Caching Patterns</span>
					<span className='discovered-by'>Binary's Predictive Algorithms</span>
				</div>
				<pre>
{`// Smart Invalidation - Pattern-Based Clearing
class SmartCache {
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern);
    const keysToInvalidate = [];
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToInvalidate.push(key);
      }
    }
    
    // Batch invalidation
    keysToInvalidate.forEach(key => {
      this.cache.delete(key);
      this.emit('invalidated', { key, pattern });
    });
    
    return keysToInvalidate.length;
  }
  
  // Invalidate related data
  invalidateCascade(key) {
    const dependencies = this.getDependencies(key);
    
    dependencies.forEach(dep => {
      this.cache.delete(dep);
      this.invalidateCascade(dep); // Recursive
    });
  }
}

// Partial Updates - Surgical Cache Surgery
async function updateCachePartially(key, updates) {
  const cached = cache.get(key);
  
  if (!cached) {
    return null; // Nothing to update
  }
  
  // Merge updates with existing data
  const updated = {
    ...cached.data,
    ...updates,
    _partial_update: true,
    _update_timestamp: Date.now()
  };
  
  // Preserve original TTL
  cache.set(key, updated, {
    ttl: cached.ttl - cached.age
  });
  
  return updated;
}

// Cache Warming - Proactive Loading
class CacheWarmer {
  constructor(cache, endpoints) {
    this.cache = cache;
    this.endpoints = endpoints;
    this.warmingInterval = null;
  }
  
  async warmCache() {
    const promises = this.endpoints.map(async endpoint => {
      try {
        const data = await fetch(endpoint.url).then(r => r.json());
        this.cache.set(endpoint.key, data, {
          ttl: endpoint.ttl || 300000
        });
        return { success: true, key: endpoint.key };
      } catch (error) {
        return { success: false, key: endpoint.key, error };
      }
    });
    
    const results = await Promise.allSettled(promises);
    return results;
  }
  
  startAutoWarming(interval = 300000) {
    this.warmingInterval = setInterval(() => {
      this.warmCache();
    }, interval);
  }
}

// Distributed Cache Sync - Binary's Pattern
class DistributedCache {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.localCache = new Map();
    this.peerNodes = new Set();
  }
  
  // Broadcast invalidation to peers
  async invalidateAcrossNodes(key) {
    // Local invalidation
    this.localCache.delete(key);
    
    // Notify peers
    const invalidationMessage = {
      type: 'INVALIDATE',
      key,
      origin: this.nodeId,
      timestamp: Date.now()
    };
    
    await this.broadcast(invalidationMessage);
  }
  
  // Sync state with peers
  async syncWithPeers() {
    const localState = this.getLocalState();
    
    for (const peer of this.peerNodes) {
      const peerState = await this.fetchPeerState(peer);
      const merged = this.mergeStates(localState, peerState);
      this.applyState(merged);
    }
  }
}

// Offline Strategy - Debuggora's Resilience
class OfflineCache {
  constructor() {
    this.storage = window.localStorage;
    this.memory = new Map();
  }
  
  async get(key) {
    // Try memory first
    if (this.memory.has(key)) {
      return this.memory.get(key);
    }
    
    // Try localStorage
    const stored = this.storage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!this.isExpired(parsed)) {
        this.memory.set(key, parsed); // Promote to memory
        return parsed.data;
      }
    }
    
    return null;
  }
  
  set(key, data, options = {}) {
    const entry = {
      data,
      timestamp: Date.now(),
      ttl: options.ttl || 3600000,
      offline: options.offline !== false
    };
    
    // Always set in memory
    this.memory.set(key, entry);
    
    // Persist if offline enabled
    if (entry.offline) {
      this.storage.setItem(key, JSON.stringify(entry));
    }
  }
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Invalidation Insight:</h3>
				<p>
					Cache invalidation is indeed one of the hardest problems in computer science. 
					Smart invalidation strategies include pattern-based clearing, cascade 
					invalidation for dependent data, and predictive refresh based on usage 
					patterns. The key is balancing cache efficiency with data consistency.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Cache Management</h3>
				<p>
					<strong>How do you decide the right TTL for different data types?</strong> 
					Consider how frequently data changes and how critical freshness is for 
					each use case.
				</p>
				<p>
					<strong>What are the risks of aggressive cache warming?</strong> 
					Think about resource usage and the possibility of warming data that 
					won't be used.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> mastered the invalidation rituals, watching as 
					stale data vanished and fresh data took its place. "It's like maintaining 
					a living library!"
				</p>
				<p>
					<strong>Binary</strong> displayed probability charts. "With proper 
					patterns, we can achieve 95% cache efficiency while maintaining data 
					integrity!"
				</p>
				<p>
					<strong>Cache Lord Redux</strong> smiled. "You've learned to balance 
					storage and freshness. Now, ready to architect a complete caching system?"
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;