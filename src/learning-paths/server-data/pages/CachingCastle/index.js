import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './CachingCastle.css';

function CachingCastle() {
	const [cacheStore, setCacheStore] = useState(new Map());
	const [cacheHits, setCacheHits] = useState(0);
	const [cacheMisses, setCacheMisses] = useState(0);
	const [selectedStrategy, setSelectedStrategy] = useState('cache-first');
	const [ttlSettings, setTtlSettings] = useState({ default: 60000, api: 30000, static: 300000 });
	const [invalidationQueue, setInvalidationQueue] = useState([]);
	const [cacheMetrics, setCacheMetrics] = useState([]);
	const [isWarmingCache, setIsWarmingCache] = useState(false);
	const cacheTimers = useRef(new Map());

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Cache operations
	const getFromCache = (key) => {
		const cached = cacheStore.get(key);
		if (cached && Date.now() - cached.timestamp < cached.ttl) {
			setCacheHits(prev => prev + 1);
			setCacheMetrics(prev => [...prev, { type: 'hit', key, timestamp: Date.now() }].slice(-20));
			return cached.data;
		}
		setCacheMisses(prev => prev + 1);
		setCacheMetrics(prev => [...prev, { type: 'miss', key, timestamp: Date.now() }].slice(-20));
		return null;
	};

	const setInCache = (key, data, ttl = ttlSettings.default) => {
		const newCache = new Map(cacheStore);
		newCache.set(key, {
			data,
			timestamp: Date.now(),
			ttl,
			hits: 0
		});
		setCacheStore(newCache);
		
		// Set invalidation timer
		if (cacheTimers.current.has(key)) {
			clearTimeout(cacheTimers.current.get(key));
		}
		const timer = setTimeout(() => {
			invalidateCache(key);
		}, ttl);
		cacheTimers.current.set(key, timer);
	};

	const invalidateCache = (key) => {
		const newCache = new Map(cacheStore);
		newCache.delete(key);
		setCacheStore(newCache);
		setInvalidationQueue(prev => [...prev, { key, timestamp: Date.now() }].slice(-10));
		
		if (cacheTimers.current.has(key)) {
			clearTimeout(cacheTimers.current.get(key));
			cacheTimers.current.delete(key);
		}
	};

	const clearAllCache = () => {
		setCacheStore(new Map());
		cacheTimers.current.forEach(timer => clearTimeout(timer));
		cacheTimers.current.clear();
		setCacheHits(0);
		setCacheMisses(0);
		setCacheMetrics([]);
	};

	// Cache warming
	const warmCache = async () => {
		setIsWarmingCache(true);
		// Simulate warming critical data
		const criticalEndpoints = ['/api/user', '/api/config', '/api/featured'];
		
		for (const endpoint of criticalEndpoints) {
			await new Promise(resolve => setTimeout(resolve, 500));
			setInCache(endpoint, { warmed: true, endpoint }, ttlSettings.api);
		}
		
		setIsWarmingCache(false);
	};

	// Calculate cache hit rate
	const hitRate = cacheHits + cacheMisses > 0 
		? Math.round((cacheHits / (cacheHits + cacheMisses)) * 100)
		: 0;

	// Cleanup on unmount
	useEffect(() => {
		const timers = cacheTimers.current;
		return () => {
			timers.forEach(timer => clearTimeout(timer));
		};
	}, []);

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Caching Castle</h1>
			<p className='lesson-subtitle'>
				Master the art of storing and serving data efficiently
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
			<Outlet
				context={{
					cacheStore,
					cacheHits,
					cacheMisses,
					hitRate,
					selectedStrategy,
					setSelectedStrategy,
					ttlSettings,
					setTtlSettings,
					invalidationQueue,
					cacheMetrics,
					isWarmingCache,
					getFromCache,
					setInCache,
					invalidateCache,
					clearAllCache,
					warmCache
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='server-data'
				lessonId='caching-castle'
			/>
		</div>
	);
}

export default CachingCastle;