import React, { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	const { performanceMetrics, updateMetric, logEvent } = useOutletContext();

	const [composition, setComposition] = useState([]);
	const [isRecording, setIsRecording] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [optimizedClicks, setOptimizedClicks] = useState(0);
	const [throttledValue, setThrottledValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	// Memoized event handler using Academy training
	const handleOptimizedClick = useCallback(
		(note) => {
			setOptimizedClicks((prev) => prev + 1);
			logEvent({
				type: 'Academy-Optimized Handler',
				detail: `Memoized handler for ${note}`,
			});
		},
		[logEvent]
	);

	// Throttle function (Academy performance pattern)
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

	// Debounce function (Academy performance pattern)
	const debounce = (func, delay) => {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	};

	// Throttled handler using Academy patterns
	const handleThrottledInput = useCallback(
		throttle((value) => {
			setThrottledValue(value);
			logEvent({
				type: 'Academy Throttled Event',
				detail: `Updated to: ${value}`,
			});
		}, 500),
		[logEvent]
	);

	// Debounced handler using Academy patterns
	const handleDebouncedInput = useCallback(
		debounce((value) => {
			setDebouncedValue(value);
			logEvent({
				type: 'Academy Debounced Event',
				detail: `Final value: ${value}`,
			});
		}, 1000),
		[logEvent]
	);

	const recordEvent = (type, detail) => {
		if (isRecording) {
			const event = {
				type,
				detail,
				timestamp: Date.now(),
			};
			setComposition([...composition, event]);
		}
	};

	const playbackComposition = async () => {
		logEvent({
			type: 'Playback Started',
			detail: `Playing ${composition.length} events at ${playbackSpeed}x speed`,
		});

		for (let i = 0; i < composition.length; i++) {
			const event = composition[i];
			const nextEvent = composition[i + 1];

			logEvent(event);

			if (nextEvent) {
				const delay =
					(nextEvent.timestamp - event.timestamp) / playbackSpeed;
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		logEvent({
			type: 'Playback Complete',
			detail: 'Symphony finished!',
		});
	};

	const content = (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Grand Performance</h2>

			<div className='chapter-bridge'>
				<p>
					The finale approached. Conductor Eventus gathered all the
					musicians for the grand performance, but something was
					wrong. The symphony stuttered, handlers fired too rapidly,
					and memory consumption spiraled out of control. "This is
					exactly what the Academy teaches us to avoid!" Aria
					observed.
				</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"This is exactly what I feared," Eventus said, his baton
					trembling. "Without optimization, even the most beautiful
					symphony becomes chaos."
				</p>

				<p className='story-paragraph'>
					Aria stepped forward confidently. "I've seen this pattern at
					the Academy's Performance Sanctuary. You need the
					optimization techniques I learned - throttling, debouncing,
					and memoization applied to event handling."
				</p>

				<p className='story-paragraph'>
					Binary's processors whirred excitedly, applying Academy
					analysis protocols. "Academy optimization patterns ready!
					Current performance metrics: {performanceMetrics.clicks}{' '}
					clicks, {performanceMetrics.keyPresses} key presses,{' '}
					{performanceMetrics.mouseMoves} mouse moves. Let's apply
					Academy training to improve these numbers!"
				</p>

				<div className='aria-teaches-optimization'>
					<h3>Aria's Academy Performance Masterclass</h3>
					<p className='story-paragraph'>
						"Think of it like this," Aria explained, drawing on her
						Academy training. "Throttling is like a metronome - it
						ensures events fire at a steady rate, just like the
						Performance Sanctuary taught. Debouncing is like waiting
						for the audience to stop applauding before continuing.
						And memoization? That's like having your sheet music
						memorized instead of reading it every time."
					</p>
				</div>

				<div className='performance-metrics'>
					<h3>Academy-Enhanced Performance Metrics</h3>
					<div className='metrics-grid'>
						<div className='metric-card'>
							<h4>Total Clicks</h4>
							<div className='metric-value'>
								{performanceMetrics.clicks}
							</div>
							<div className='metric-label'>Raw Events</div>
						</div>
						<div className='metric-card'>
							<h4>Key Presses</h4>
							<div className='metric-value'>
								{performanceMetrics.keyPresses}
							</div>
							<div className='metric-label'>Keyboard Events</div>
						</div>
						<div className='metric-card'>
							<h4>Mouse Moves</h4>
							<div className='metric-value'>
								{performanceMetrics.mouseMoves}
							</div>
							<div className='metric-label'>Movement Events</div>
						</div>
						<div className='metric-card optimized'>
							<h4>Academy-Optimized Clicks</h4>
							<div className='metric-value'>
								{optimizedClicks}
							</div>
							<div className='metric-label'>
								Memoized Handlers
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='aria-advanced-patterns'>
				<h3>Academy Training Applied to Events</h3>
				<pre className='magical-code'>{`// Aria's Academy Event Optimization Patterns

// 1. Memoization - Remember the handler (Performance Sanctuary)
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

// 2. Throttling - Control the tempo (Academy patterns)
const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// 3. Debouncing - Wait for silence (Academy patterns)
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
					Interactive Exercise: The Academy-Enhanced Performance
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Help Aria demonstrate how Academy optimization
							patterns transform event handling performance!
						</strong>
					</p>
				</div>

				<div className='event-composition'>
					<h4>🎼 Academy Event Composition Studio</h4>
					<p className='studio-description'>
						Record a sequence of events and play them back at
						different speeds using Academy patterns!
					</p>

					<div className='composition-controls'>
						<button
							onClick={() => {
								setIsRecording(!isRecording);
								if (!isRecording) {
									setComposition([]);
								}
							}}
							className={`record-button ${
								isRecording ? 'recording' : ''
							}`}>
							{isRecording
								? '⏹ Stop Recording'
								: '⏺ Start Recording'}
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
							onChange={(e) =>
								setPlaybackSpeed(Number(e.target.value))
							}
							className='speed-slider'
						/>
					</div>

					{isRecording && (
						<div className='recording-interface'>
							<p className='recording-hint'>
								Click notes to record your symphony!
							</p>
							<div className='note-buttons'>
								{[
									'Do',
									'Re',
									'Mi',
									'Fa',
									'Sol',
									'La',
									'Ti',
								].map((note) => (
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
					<h4>🎛️ Academy Event Handler Optimization Lab</h4>

					<div className='throttle-demo'>
						<h5>⏱️ Throttled Input (500ms intervals)</h5>
						<p className='demo-explanation'>
							"Like a metronome," Aria explained, "throttling
							ensures consistent timing using Academy patterns."
						</p>
						<input
							type='text'
							placeholder='Type rapidly - updates every 500ms'
							onChange={(e) =>
								handleThrottledInput(e.target.value)
							}
							className='optimization-input'
						/>
						<div className='value-display'>
							<span>Throttled Value:</span>
							<span className='value'>
								{throttledValue || '...'}
							</span>
						</div>
					</div>

					<div className='debounce-demo'>
						<h5>⏸️ Debounced Input (1000ms delay)</h5>
						<p className='demo-explanation'>
							"Like waiting for applause to end," Aria noted,
							"debouncing waits for quiet using Academy
							techniques."
						</p>
						<input
							type='text'
							placeholder='Type and pause - updates after 1s of silence'
							onChange={(e) =>
								handleDebouncedInput(e.target.value)
							}
							className='optimization-input'
						/>
						<div className='value-display'>
							<span>Debounced Value:</span>
							<span className='value'>
								{debouncedValue || '...'}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='eventus-revelation'>
				<p className='story-paragraph'>
					Conductor Eventus watched in awe as Aria's Academy training
					transformed the performance. "The stuttering is gone! The
					memory usage is stable! How did you achieve this miracle?"
				</p>

				<p className='story-paragraph'>
					"By applying all my Academy training," Aria replied.
					"Memoization from the Performance Sanctuary prevents handler
					recreation. Throttling and debouncing patterns control event
					flow. Event delegation reduces handler count. It's all the
					optimization patterns I learned, applied to events!"
				</p>

				<p className='story-paragraph'>
					Binary projected the results: "Academy optimization
					complete! Handler recreation reduced by 95% using
					useCallback patterns. Event processing efficiency increased
					by 78% using Performance Sanctuary techniques. Memory usage
					stable. The symphony is perfect!"
				</p>
			</div>

			<div className='advanced-patterns'>
				<h3>Academy Performance Patterns Applied</h3>
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
					<p>
						What a finale! Applied everything I learned at the
						Academy to create an event performance optimization
						masterpiece. Showed Eventus how memoization (from
						Performance Sanctuary) prevents handler recreation, how
						throttling/debouncing (Academy efficiency patterns)
						control event flow, and how delegation reduces overhead
						using the optimization techniques Pattern Weaver taught
						me. Binary tracked a 95% reduction in unnecessary
						renders using Academy methods! The Event Symphony Hall
						is now a model of efficiency. Eventus said orchestras
						from across the kingdom will study our Academy-enhanced
						patterns. Tomorrow we visit the Validation Fortress - I
						hear Guardian Commander Validus has some interesting
						challenges that might benefit from Academy training...
					</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Grand Performance Mastery:</h3>
				<p>
					Event optimization transforms chaotic interactions into
					smooth symphonies using Academy-trained patterns. Memoize
					handlers with useCallback to prevent recreation on every
					render (Performance Sanctuary training). Throttle
					rapidly-firing events (scroll, resize) to control frequency.
					Debounce user input to wait for typing to finish. Combine
					with event delegation for ultimate efficiency. These
					patterns, learned at the Academy and applied here, unite to
					create performant, responsive applications. Remember:
					optimization isn't premature when it enhances user
					experience. Conduct your events with Academy wisdom, and
					your application will sing.
				</p>
			</div>

			<div className='chapter-finale'>
				<p className='story-paragraph'>
					As the final notes of the Academy-optimized symphony faded,
					the entire Event Symphony Hall erupted in applause.
					Musicians who had struggled with performance issues now
					played in perfect harmony using optimized patterns.
				</p>
				<p className='story-paragraph'>
					Conductor Eventus bowed deeply to Aria. "You've transformed
					our understanding of event handling by applying Academy
					optimization training. The Western Quarter will never forget
					this performance."
				</p>
				<p className='story-paragraph'>
					"The next challenge awaits," Aria said, looking toward the
					distant Validation Fortress. "I hear Commander Validus needs
					help with defensive strategies that might benefit from
					Academy patterns."
				</p>
				<p className='story-paragraph'>
					Binary displayed a map route. "Validation patterns detected.
					Academy training applicable. Shall we proceed to the
					fortress?"
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do Academy optimization techniques mirror a conductor's
					role in managing tempo and timing?
				</p>
				<p className='story-paragraph'>
					Why is combining multiple Academy patterns more powerful
					than using them individually?
				</p>
				<p className='story-paragraph'>
					What performance issues in your own applications could
					benefit from these Academy-trained patterns?
				</p>
			</div>
		</div>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
