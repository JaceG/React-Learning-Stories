import { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const { 
		performanceMetrics,
		updateMetric,
		logEvent
	} = useOutletContext();

	const [composition, setComposition] = useState([]);
	const [isRecording, setIsRecording] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [optimizedClicks, setOptimizedClicks] = useState(0);
	const [throttledValue, setThrottledValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	// Memoized event handler
	const handleOptimizedClick = useCallback((note) => {
		setOptimizedClicks(prev => prev + 1);
		logEvent({
			type: 'Optimized Handler',
			detail: `Memoized handler for ${note}`
		});
	}, [logEvent]);

	// Throttle function
	const throttle = (func, delay) => {
		let lastCall = 0;
		return (...args) => {
			const now = Date.now();
			if (now - lastCall >= delay) {
				lastCall = now;
				func(...args);
			}
		};
	};

	// Debounce function
	const debounce = (func, delay) => {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	};

	// Throttled handler
	const handleThrottledInput = useCallback(
		throttle((value) => {
			setThrottledValue(value);
			logEvent({
				type: 'Throttled Event',
				detail: `Updated to: ${value}`
			});
		}, 500),
		[logEvent]
	);

	// Debounced handler  
	const handleDebouncedInput = useCallback(
		debounce((value) => {
			setDebouncedValue(value);
			logEvent({
				type: 'Debounced Event',
				detail: `Final value: ${value}`
			});
		}, 1000),
		[logEvent]
	);

	const recordEvent = (type, detail) => {
		if (isRecording) {
			const event = {
				type,
				detail,
				timestamp: Date.now()
			};
			setComposition([...composition, event]);
		}
	};

	const playbackComposition = async () => {
		logEvent({
			type: 'Playback Started',
			detail: `Playing ${composition.length} events at ${playbackSpeed}x speed`
		});

		for (let i = 0; i < composition.length; i++) {
			const event = composition[i];
			const nextEvent = composition[i + 1];
			
			logEvent(event);
			
			if (nextEvent) {
				const delay = (nextEvent.timestamp - event.timestamp) / playbackSpeed;
				await new Promise(resolve => setTimeout(resolve, delay));
			}
		}

		logEvent({
			type: 'Playback Complete',
			detail: 'Symphony finished!'
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Grand Performance
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					For the grand finale, Eva had to conduct a flawless performance. 
					She learned advanced techniques - memoizing her gestures for 
					efficiency, throttling rapid movements, and debouncing the 
					finale for perfect timing. Every optimization made the 
					symphony more beautiful and responsive.
				</p>

				<div className='performance-metrics'>
					<div className='metric-card'>
						<h4>Total Clicks</h4>
						<div className='metric-value'>{performanceMetrics.clicks}</div>
					</div>
					<div className='metric-card'>
						<h4>Key Presses</h4>
						<div className='metric-value'>{performanceMetrics.keyPresses}</div>
					</div>
					<div className='metric-card'>
						<h4>Mouse Moves</h4>
						<div className='metric-value'>{performanceMetrics.mouseMoves}</div>
					</div>
					<div className='metric-card'>
						<h4>Optimized Clicks</h4>
						<div className='metric-value'>{optimizedClicks}</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Performance Optimization
				</h3>

				<div className='event-composition'>
					<h4>🎼 Event Composition Studio</h4>
					
					<div style={{ marginBottom: '2rem' }}>
						<button
							onClick={() => {
								setIsRecording(!isRecording);
								if (!isRecording) {
									setComposition([]);
								}
							}}
							style={{
								background: isRecording ? '#e74c3c' : '#2ecc71',
								color: 'white',
								border: 'none',
								padding: '0.75rem 1.5rem',
								borderRadius: '4px',
								marginRight: '1rem'
							}}>
							{isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
						</button>
						
						<button
							onClick={playbackComposition}
							disabled={composition.length === 0}
							style={{
								background: '#3498db',
								color: 'white',
								border: 'none',
								padding: '0.75rem 1.5rem',
								borderRadius: '4px',
								opacity: composition.length === 0 ? 0.5 : 1
							}}>
							▶ Play Composition ({composition.length} events)
						</button>
					</div>

					<div style={{ marginBottom: '2rem' }}>
						<label>Playback Speed: {playbackSpeed}x</label>
						<input
							type='range'
							min='0.5'
							max='2'
							step='0.1'
							value={playbackSpeed}
							onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
							style={{ width: '100%', marginTop: '0.5rem' }}
						/>
					</div>

					{isRecording && (
						<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
							{['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'].map(note => (
								<button
									key={note}
									onClick={() => {
										handleOptimizedClick(note);
										recordEvent('Note', note);
										updateMetric('clicks');
									}}
									className='musical-note'>
									{note}
								</button>
							))}
						</div>
					)}
				</div>

				<div className='synthetic-event-demo'>
					<h4>🎛️ Event Handler Optimization</h4>
					
					<div style={{ marginBottom: '2rem' }}>
						<h5>Throttled Input (500ms)</h5>
						<input
							type='text'
							placeholder='Type rapidly - updates throttled'
							onChange={(e) => handleThrottledInput(e.target.value)}
							style={{
								width: '100%',
								padding: '0.5rem',
								marginBottom: '0.5rem'
							}}
						/>
						<p>Throttled Value: {throttledValue}</p>
					</div>

					<div>
						<h5>Debounced Input (1000ms)</h5>
						<input
							type='text'
							placeholder='Type and pause - updates after you stop'
							onChange={(e) => handleDebouncedInput(e.target.value)}
							style={{
								width: '100%',
								padding: '0.5rem',
								marginBottom: '0.5rem'
							}}
						/>
						<p>Debounced Value: {debouncedValue}</p>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Advanced Event Handling Patterns

// 1. Memoized Event Handlers
function OptimizedComponent() {
  // Handler is only recreated if dependencies change
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []); // Empty deps = never recreates

  return items.map(item => (
    <Item 
      key={item.id} 
      onClick={() => handleClick(item.id)} 
    />
  ));
}

// 2. Event Delegation for Dynamic Lists
function DynamicList() {
  const handleListClick = (e) => {
    // Only one handler for entire list
    const li = e.target.closest('li');
    if (li) {
      const id = li.dataset.id;
      handleItemClick(id);
    }
  };

  return (
    <ul onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// 3. Throttling for Performance
const throttledScroll = throttle((scrollY) => {
  console.log('Scroll position:', scrollY);
}, 100);

window.addEventListener('scroll', () => {
  throttledScroll(window.scrollY);
});

// 4. Debouncing for User Input
const SearchInput = () => {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      performSearch(searchTerm);
    }, 500),
    []
  );

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
    />
  );
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Performance Lesson:</h3>
				<p>
					A masterful event symphony requires optimization. Use memoization 
					to prevent unnecessary handler recreations, throttling to limit 
					rapid-fire events, and debouncing to wait for user input to 
					settle. Event delegation lets one conductor (handler) manage an 
					entire section, rather than having individual handlers for each 
					musician. These patterns create a smooth, responsive performance 
					that delights your audience (users).
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do optimization techniques like throttling and debouncing 
					relate to a conductor controlling the tempo of a performance?
				</p>
				<p>
					Why is it important to "rehearse" (optimize) event handlers 
					before the grand performance (production)?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;