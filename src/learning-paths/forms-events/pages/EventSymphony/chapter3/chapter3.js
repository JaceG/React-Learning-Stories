import React, { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
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

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Grand Performance</h2>
			
			<div className='chapter-bridge'>
				<p>The finale approached. Conductor Eventus gathered all the musicians for the grand 
				performance, but something was wrong. The symphony stuttered, handlers fired too 
				rapidly, and memory consumption spiraled out of control.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"This is exactly what I feared," Eventus said, his baton trembling. "Without 
					optimization, even the most beautiful symphony becomes chaos."
				</p>
				
				<p className='story-paragraph'>
					Aria stepped forward confidently. "I've seen this before. You need performance 
					optimization techniques I learned in the Hook Mastery realm. Let me show you 
					throttling, debouncing, and memoization."
				</p>
				
				<p className='story-paragraph'>
					Binary's processors whirred excitedly. "Optimization protocols ready! Current 
					performance metrics: {performanceMetrics.clicks} clicks, {performanceMetrics.keyPresses} key 
					presses, {performanceMetrics.mouseMoves} mouse moves. Let's improve these numbers!"
				</p>

				<div className='aria-teaches-optimization'>
					<h3>Aria's Performance Optimization Masterclass</h3>
					<p className='story-paragraph'>
						"Think of it like this," Aria explained, drawing patterns in the air. "Throttling 
						is like a metronome - it ensures events fire at a steady rate. Debouncing is like 
						waiting for the audience to stop applauding before continuing. And memoization? 
						That's like having your sheet music memorized instead of reading it every time."
					</p>
				</div>

				<div className='performance-metrics'>
					<h3>Symphony Performance Metrics</h3>
					<div className='metrics-grid'>
						<div className='metric-card'>
							<h4>Total Clicks</h4>
							<div className='metric-value'>{performanceMetrics.clicks}</div>
							<div className='metric-label'>Raw Events</div>
						</div>
						<div className='metric-card'>
							<h4>Key Presses</h4>
							<div className='metric-value'>{performanceMetrics.keyPresses}</div>
							<div className='metric-label'>Keyboard Events</div>
						</div>
						<div className='metric-card'>
							<h4>Mouse Moves</h4>
							<div className='metric-value'>{performanceMetrics.mouseMoves}</div>
							<div className='metric-label'>Movement Events</div>
						</div>
						<div className='metric-card optimized'>
							<h4>Optimized Clicks</h4>
							<div className='metric-value'>{optimizedClicks}</div>
							<div className='metric-label'>Memoized Handlers</div>
						</div>
					</div>
				</div>
			</div>

			<div className='aria-advanced-patterns'>
				<h3>The Three Pillars of Event Optimization</h3>
				<pre className='magical-code'>{`// Aria's Event Optimization Patterns

// 1. Memoization - Remember the handler
const MemoizedOrchestra = () => {
  // This handler is created once and reused
  const handleInstrumentClick = useCallback((instrument) => {
    playSound(instrument);
    logPerformance(instrument);
  }, []); // Empty deps = stable reference

  return instruments.map(inst => (
    <Instrument 
      key={inst.id}
      onClick={() => handleInstrumentClick(inst)}
    />
  ));
};

// 2. Throttling - Control the tempo
const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// 3. Debouncing - Wait for silence
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};`}</pre>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Grand Performance
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Help Aria optimize the Event Symphony Hall's grand performance 
							using advanced event handling techniques!
						</strong>
					</p>
				</div>

				<div className='event-composition'>
					<h4>🎼 Event Composition Studio</h4>
					<p className='studio-description'>
						Record a sequence of events and play them back at different speeds!
					</p>
					
					<div className='composition-controls'>
						<button
							onClick={() => {
								setIsRecording(!isRecording);
								if (!isRecording) {
									setComposition([]);
								}
							}}
							className={`record-button ${isRecording ? 'recording' : ''}`}>
							{isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
						</button>
						
						<button
							onClick={playbackComposition}
							disabled={composition.length === 0}
							className='playback-button'>
							▶ Play Composition ({composition.length} events)
						</button>
					</div>

					<div className='speed-control'>
						<label>Playback Speed: {playbackSpeed}x</label>
						<input
							type='range'
							min='0.5'
							max='2'
							step='0.1'
							value={playbackSpeed}
							onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
							className='speed-slider'
						/>
					</div>

					{isRecording && (
						<div className='recording-interface'>
							<p className='recording-hint'>Click notes to record your symphony!</p>
							<div className='note-buttons'>
								{['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'].map(note => (
									<button
										key={note}
										onClick={() => {
											handleOptimizedClick(note);
											recordEvent('Note', note);
											updateMetric('clicks');
										}}
										className='musical-note recorded'>
										{note}
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				<div className='optimization-demos'>
					<h4>🎛️ Event Handler Optimization Lab</h4>
					
					<div className='throttle-demo'>
						<h5>⏱️ Throttled Input (500ms intervals)</h5>
						<p className='demo-explanation'>
							"Like a metronome," Aria explained, "throttling ensures consistent timing."
						</p>
						<input
							type='text'
							placeholder='Type rapidly - updates every 500ms'
							onChange={(e) => handleThrottledInput(e.target.value)}
							className='optimization-input'
						/>
						<div className='value-display'>
							<span>Throttled Value:</span>
							<span className='value'>{throttledValue || '...'}</span>
						</div>
					</div>

					<div className='debounce-demo'>
						<h5>⏸️ Debounced Input (1000ms delay)</h5>
						<p className='demo-explanation'>
							"Like waiting for applause to end," Aria noted, "debouncing waits for quiet."
						</p>
						<input
							type='text'
							placeholder='Type and pause - updates after 1s of silence'
							onChange={(e) => handleDebouncedInput(e.target.value)}
							className='optimization-input'
						/>
						<div className='value-display'>
							<span>Debounced Value:</span>
							<span className='value'>{debouncedValue || '...'}</span>
						</div>
					</div>
				</div>
			</div>

			<div className='eventus-revelation'>
				<p className='story-paragraph'>
					Conductor Eventus watched in awe as the performance transformed. "The stuttering 
					is gone! The memory usage is stable! How did you achieve this miracle?"
				</p>
				
				<p className='story-paragraph'>
					"By combining all my React knowledge," Aria replied. "Memoization from the Hook 
					Council prevents handler recreation. Throttling and debouncing control event flow. 
					Event delegation reduces handler count. It's all connected!"
				</p>
				
				<p className='story-paragraph'>
					Binary projected the results: "Performance optimization complete! Handler recreation 
					reduced by 95%. Event processing efficiency increased by 78%. Memory usage stable. 
					The symphony is perfect!"
				</p>
			</div>

			<div className='advanced-patterns'>
				<h3>Advanced Performance Patterns</h3>
				<div className='pattern-grid'>
					<div className='pattern-card'>
						<h4>🎯 Smart Event Delegation</h4>
						<pre className='mini-code'>{`// Delegate with data attributes
<div onClick={(e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  
  if (action) {
    handlers[action](id);
  }
}}>
  <button data-action="play" data-id="1">▶️</button>
  <button data-action="pause" data-id="1">⏸️</button>
</div>`}</pre>
					</div>
					<div className='pattern-card'>
						<h4>🔄 Async Event Handling</h4>
						<pre className='mini-code'>{`// Handle async operations properly
const handleAsync = useCallback(async (e) => {
  e.persist(); // Keep synthetic event
  setLoading(true);
  
  try {
    await performAction(e.target.value);
  } finally {
    setLoading(false);
  }
}, []);`}</pre>
					</div>
					<div className='pattern-card'>
						<h4>📊 Event Batching</h4>
						<pre className='mini-code'>{`// Batch multiple events
const batchedUpdate = unstable_batchedUpdates(() => {
  setCount(c => c + 1);
  setTotal(t => t + 1);
  logEvent('batched');
});`}</pre>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 20 (Evening)</h4>
					<p>What a finale! Combined everything I've learned into a performance optimization 
					masterpiece. Showed Eventus how memoization (from Hook Council) prevents handler 
					recreation, how throttling/debouncing (like Pattern Weaver's techniques) control 
					event flow, and how delegation (from form alchemy) reduces overhead. Binary tracked 
					a 95% reduction in unnecessary renders! The Event Symphony Hall is now a model of 
					efficiency. Eventus said orchestras from across the kingdom will study our patterns. 
					Tomorrow we visit the Validation Fortress - I hear Guardian Commander Validus has 
					some interesting challenges...</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Grand Performance Mastery:</h3>
				<p>
					Event optimization transforms chaotic interactions into smooth symphonies. Memoize 
					handlers with useCallback to prevent recreation on every render. Throttle rapidly-firing 
					events (scroll, resize) to control frequency. Debounce user input to wait for typing 
					to finish. Combine with event delegation for ultimate efficiency. These patterns, 
					learned across Aria's journey, unite to create performant, responsive applications. 
					Remember: optimization isn't premature when it enhances user experience. Conduct 
					your events wisely, and your application will sing.
				</p>
			</div>
			
			<div className='chapter-finale'>
				<p className='story-paragraph'>
					As the final notes of the optimized symphony faded, the entire Event Symphony Hall 
					erupted in applause. Musicians who had struggled with performance issues now played 
					in perfect harmony.
				</p>
				<p className='story-paragraph'>
					Conductor Eventus bowed deeply to Aria. "You've transformed our understanding of 
					event handling. The Western Quarter will never forget this performance."
				</p>
				<p className='story-paragraph'>
					"The next challenge awaits," Aria said, looking toward the distant Validation Fortress. 
					"I hear Commander Validus needs help with defensive strategies."
				</p>
				<p className='story-paragraph'>
					Binary displayed a map route. "Validation patterns detected. Shall we proceed to 
					the fortress?"
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do optimization techniques mirror a conductor's role in managing tempo and timing?
				</p>
				<p className='story-paragraph'>
					Why is combining multiple optimization strategies more powerful than using them individually?
				</p>
				<p className='story-paragraph'>
					What performance issues in your own applications could benefit from these patterns?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterThree;