import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		cacheStore,
		cacheHits,
		cacheMisses,
		hitRate,
		selectedStrategy,
		setSelectedStrategy,
		getFromCache,
		setInCache,
		ttlSettings
	} = useOutletContext();

	const [testKey, setTestKey] = useState('user-profile');
	const [testData, setTestData] = useState('{ "name": "Aria", "level": "Ambassador" }');

	const strategies = [
		{
			id: 'cache-first',
			name: 'Cache First',
			icon: '💾',
			description: 'Check cache before network'
		},
		{
			id: 'network-first',
			name: 'Network First',
			icon: '🌐',
			description: 'Fresh data, cache fallback'
		},
		{
			id: 'stale-while-revalidate',
			name: 'Stale While Revalidate',
			icon: '♻️',
			description: 'Serve stale, update behind'
		}
	];

	const simulateFetch = async (key) => {
		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 1000));
		return { data: testData, source: 'network' };
	};

	const handleCacheOperation = async () => {
		if (selectedStrategy === 'cache-first') {
			const cached = getFromCache(testKey);
			if (cached) {
				console.log('Cache hit!', cached);
			} else {
				const fetched = await simulateFetch(testKey);
				setInCache(testKey, fetched.data, ttlSettings.default);
			}
		} else if (selectedStrategy === 'network-first') {
			try {
				const fetched = await simulateFetch(testKey);
				setInCache(testKey, fetched.data, ttlSettings.default);
			} catch (error) {
				const cached = getFromCache(testKey);
				if (cached) {
					console.log('Network failed, using cache', cached);
				}
			}
		} else if (selectedStrategy === 'stale-while-revalidate') {
			const cached = getFromCache(testKey);
			if (cached) {
				console.log('Serving stale data', cached);
				// Revalidate in background
				simulateFetch(testKey).then(fetched => {
					setInCache(testKey, fetched.data, ttlSettings.default);
				});
			} else {
				const fetched = await simulateFetch(testKey);
				setInCache(testKey, fetched.data, ttlSettings.default);
			}
		}
	};

	// Get cache entries for visualization
	const cacheEntries = Array.from(cacheStore.entries()).map(([key, value]) => {
		const age = Date.now() - value.timestamp;
		const freshness = age < value.ttl * 0.3 ? 'fresh' : 
						 age < value.ttl * 0.7 ? 'stale' : 'expired';
		return { key, ...value, age, freshness };
	});

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Memory Vaults`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Caching Castle stored frequently used data. <strong>Cache Lord Redux</strong> 
					(a distant cousin of the Redux Empire's emperor) explained: "Why fetch what 
					you already have? The fastest request is the one you don't make."
				</p>

				<p className='story-paragraph'>
					The castle's vaults were organized by freshness. "Stale data is sometimes 
					acceptable," the Cache Lord explained. "It's about balance - freshness 
					versus performance."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Caching Castle</h3>
				<div className='castle-visualization'>
					<div className='castle-structure'>
						<div className='castle-towers'>
							<div className='tower'>
								<div className='tower-label'>Fresh Vault</div>
								<div className='tower-content'>
									{cacheEntries.filter(e => e.freshness === 'fresh').length} items
								</div>
							</div>
							<div className='tower'>
								<div className='tower-label'>Stale Vault</div>
								<div className='tower-content'>
									{cacheEntries.filter(e => e.freshness === 'stale').length} items
								</div>
							</div>
							<div className='tower'>
								<div className='tower-label'>Expired Vault</div>
								<div className='tower-content'>
									{cacheEntries.filter(e => e.freshness === 'expired').length} items
								</div>
							</div>
						</div>
						<div className='castle-base'>
							Cache Lord Redux's Domain
						</div>
					</div>
				</div>

				<h3 className='section-title'>Caching Strategies</h3>
				
				<InstructionBox character={`Cache Lord Redux presents three strategy scrolls.`}>
					Choose your caching strategy to see how data flows through the castle!
				</InstructionBox>
				
				<div className='strategy-selector'>
					{strategies.map(strategy => (
						<div
							key={strategy.id}
							className={`strategy-option ${selectedStrategy === strategy.id ? 'active' : ''}`}
							onClick={() => setSelectedStrategy(strategy.id)}>
							<div className='strategy-icon'>{strategy.icon}</div>
							<div className='strategy-name'>{strategy.name}</div>
							<div className='strategy-description'>{strategy.description}</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Cache Testing Chamber</h3>
				<div style={{
					background: 'white',
					padding: '20px',
					borderRadius: '8px',
					marginBottom: '20px'
				}}>
					<div style={{marginBottom: '15px'}}>
						<label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
							Cache Key:
						</label>
						<input
							type='text'
							value={testKey}
							onChange={(e) => setTestKey(e.target.value)}
							style={{
								width: '100%',
								padding: '8px',
								border: '1px solid #e0e0e0',
								borderRadius: '5px'
							}}
						/>
					</div>
					
					<div style={{marginBottom: '15px'}}>
						<label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
							Data to Cache:
						</label>
						<textarea
							value={testData}
							onChange={(e) => setTestData(e.target.value)}
							style={{
								width: '100%',
								padding: '8px',
								border: '1px solid #e0e0e0',
								borderRadius: '5px',
								minHeight: '60px',
								fontFamily: 'monospace'
							}}
						/>
					</div>
					
					<button 
						className='cache-button warm'
						onClick={handleCacheOperation}>
						🚀 Execute {selectedStrategy.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
					</button>
				</div>

				<h3 className='section-title'>Cache Metrics</h3>
				<div className='cache-dashboard'>
					<div className='metrics-grid'>
						<div className='metric-card'>
							<div className={`metric-value ${hitRate > 70 ? 'good' : hitRate > 40 ? 'warning' : 'bad'}`}>
								{hitRate}%
							</div>
							<div className='metric-label'>Hit Rate</div>
						</div>
						<div className='metric-card'>
							<div className='metric-value good'>{cacheHits}</div>
							<div className='metric-label'>Cache Hits</div>
						</div>
						<div className='metric-card'>
							<div className='metric-value bad'>{cacheMisses}</div>
							<div className='metric-label'>Cache Misses</div>
						</div>
						<div className='metric-card'>
							<div className='metric-value'>{cacheStore.size}</div>
							<div className='metric-label'>Cached Items</div>
						</div>
					</div>
					
					<div className='hit-rate-chart'>
						<div className='hit-rate-bar' style={{width: `${hitRate}%`}}></div>
						<div className='hit-rate-text'>Cache Efficiency: {hitRate}%</div>
					</div>
				</div>

				<h3 className='section-title'>Memory Vaults</h3>
				<div className='memory-vaults'>
					{cacheEntries.length === 0 ? (
						<p style={{gridColumn: '1 / -1', textAlign: 'center', color: '#7f8c8d'}}>
							The vaults are empty. Try caching some data!
						</p>
					) : (
						cacheEntries.map(entry => (
							<div key={entry.key} className={`vault-item ${entry.freshness}`}>
								<div className='vault-key'>{entry.key}</div>
								<div className='vault-age'>
									Age: {Math.round(entry.age / 1000)}s
								</div>
								<div className='vault-ttl'>
									TTL: {Math.round(entry.ttl / 1000)}s
								</div>
							</div>
						))
					)}
				</div>
			</div>

			<CodeExample
				title={`Caching Strategies`}
				discoveredBy={`The Memory Vault Codex`}
				code={`// Cache First - Speed Above All
async function cacheFirst(key, fetchFn) {
  const cached = cache.get(key);
  if (cached && !isExpired(cached)) return cached.data;
  const fresh = await fetchFn();
  cache.set(key, fresh, { ttl: 60000 });
  return fresh;
}

// Network First - Freshness Matters
async function networkFirst(key, fetchFn) {
  try {
    const fresh = await fetchFn();
    cache.set(key, fresh, { ttl: 60000 });
    return fresh;
  } catch (error) {
    const cached = cache.get(key);
    if (cached) return cached.data; // Fallback
    throw error;
  }
}

// Stale While Revalidate - Best of Both
async function staleWhileRevalidate(key, fetchFn) {
  const cached = cache.get(key);
  if (cached) {
    fetchFn().then(fresh => cache.set(key, fresh)); // Background update
    return cached.data; // Return immediately
  }
  const fresh = await fetchFn();
  cache.set(key, fresh, { ttl: 60000 });
  return fresh;
}

// TTL Management
class CacheEntry {
  get freshness() {
    const ratio = this.age / this.ttl;
    if (ratio < 0.3) return 'fresh';
    if (ratio < 0.7) return 'stale';
    return 'expired';
  }
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Cache Lord Redux`,
						description: `A distant cousin of the Redux Empire's emperor, guardian of the Memory Vaults. His wisdom: "The fastest request is the one you don't make. Caching is about balance - freshness versus performance."`
					}
				]}
				lessonInsight={{
					title: `The Memory Vault Lesson:`,
					content: `Caching is about intelligent trade-offs between freshness and performance. Cache-first maximizes speed but risks staleness. Network-first ensures freshness but sacrifices speed. Stale-while-revalidate offers the best of both, serving cached data immediately while updating in the background.`
				}}
				reflectionQuestions={[
					`When would you choose cache-first over network-first?`,
					`How does TTL affect user experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 43 (Morning)`,
					content: `The Caching Castle is magnificent! Cache Lord Redux taught me three strategies: Cache-First (💾) for speed, Network-First (🌐) for freshness, and Stale-While-Revalidate (♻️) for the best of both. The vaults are organized by freshness - Fresh, Stale, and Expired. TTL (Time To Live) determines when data transitions between states. Cache Lord's wisdom: "Storing is easy. Knowing when to forget is the true challenge." My first cache hit rate: 70%!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;