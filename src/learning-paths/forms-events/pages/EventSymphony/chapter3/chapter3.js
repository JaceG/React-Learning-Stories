import React, { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={3}
				title='The Grand Performance'
				bridge='The finale approached. Conductor Eventus gathered all the musicians for the grand performance, but something was wrong. The symphony stuttered, handlers fired too rapidly, and memory consumption spiraled out of control. "This is exactly what the Academy teaches us to avoid!" Aria observed.'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"This is exactly what I feared," Eventus said, his baton
					trembling. "Without optimization, even the most beautiful
					symphony becomes chaos."
				</p>

				<p className='story-paragraph'>
					Aria studied the chaotic performance with concern. "This
					reminds me of performance issues I learned about at the
					Academy's Performance Sanctuary. Could the optimization
					techniques I learned help here?"
				</p>

				<p className='story-paragraph'>
					"Precisely what I was hoping you'd ask!" Eventus exclaimed.
					"Your Academy training in optimization is exactly what we
					need. Let me teach you how to apply those patterns to event
					handling."
				</p>

				<p className='story-paragraph'>
					Binary's processors whirred excitedly, ready to learn new
					applications. "Academy patterns detected! Ready to learn how
					they apply to event optimization!"
				</p>

				<div className='aria-teaches-optimization'>
					<h3>Aria's Academy Performance Masterclass</h3>
					<p className='story-paragraph'>
						"Think of it like this," Eventus explained, drawing on
						Aria's Academy knowledge. "Throttling is like a
						metronome - it ensures events fire at a steady rate,
						just like you learned at the Performance Sanctuary.
						Debouncing is like waiting for the audience to stop
						applauding before continuing. And memoization? That's
						like having your sheet music memorized instead of
						reading it every time."
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

			<CodeExample
				title="Academy Event Optimization Patterns"
				discoveredBy="Applied by Aria"
				code={`// Aria's Academy Event Optimization Patterns

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
};`}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Academy-Enhanced Performance
				</h3>
				<InstructionBox character="Eventus hands you the conductor's baton.">
					Help Aria demonstrate how Academy optimization patterns transform event handling performance!
				</InstructionBox>

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
					Conductor Eventus watched with satisfaction as the Academy
					patterns transformed the performance. "The stuttering is
					gone! The memory usage is stable! You've learned these
					optimization concepts very well!"
				</p>

				<p className='story-paragraph'>
					"By learning how to apply Academy training to events," Aria
					replied. "Eventus taught me how memoization from the
					Performance Sanctuary prevents handler recreation.
					Throttling and debouncing patterns control event flow. Event
					delegation reduces handler count. It's amazing how the
					optimization patterns I learned apply to events!"
				</p>

				<p className='story-paragraph'>
					Binary projected the results: "Academy patterns successfully
					applied to event optimization! Handler recreation reduced by
					95% using useCallback patterns. Event processing efficiency
					increased by 78% using Performance Sanctuary techniques.
					Memory usage stable. The symphony is perfect!"
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

			<ChapterSummary
				lessonInsight={{
					title: 'The Grand Performance Mastery:',
					content:
						"Event optimization transforms chaotic interactions into smooth symphonies using Academy-trained patterns. Memoize handlers with useCallback to prevent recreation on every render (Performance Sanctuary training). Throttle rapidly-firing events (scroll, resize) to control frequency. Debounce user input to wait for typing to finish. Combine with event delegation for ultimate efficiency. These patterns, learned at the Academy and applied here, unite to create performant, responsive applications. Remember: optimization isn't premature when it enhances user experience. Conduct your events with Academy wisdom, and your application will sing.",
				}}
				reflectionQuestions={[
					"How do Academy optimization techniques mirror a conductor's role in managing tempo and timing?",
					'Why is combining multiple Academy patterns more powerful than using them individually?',
					'What performance issues in your own applications could benefit from these Academy-trained patterns?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 18 (Evening)",
					content:
						"What a finale! Eventus taught me how to apply Academy patterns to event optimization. I learned how memoization (from Performance Sanctuary) prevents handler recreation, how throttling/debouncing (Academy efficiency patterns) control event flow, and how delegation reduces overhead using the optimization techniques Pattern Weaver taught me. Binary tracked the improvements as we applied Academy methods to event handling! The Event Symphony Hall now runs so much smoother. Eventus says the patterns we explored will be valuable for orchestras throughout the kingdom. Tomorrow we visit the Validation Fortress - I'm curious what Guardian Commander Validus will teach me!",
				}}
				chapterEnding={[
					'As the final notes of the Academy-optimized symphony faded, the entire Event Symphony Hall erupted in applause. Musicians who had struggled with performance issues now played in perfect harmony using optimized patterns.',
					'Conductor Eventus bowed deeply to Aria. "You\'ve transformed our understanding of event handling by applying Academy optimization training. The Western Quarter will never forget this performance."',
					'"The next challenge awaits," Aria said, looking toward the distant Validation Fortress. "I hear Commander Validus needs help with defensive strategies that might benefit from Academy patterns."',
					'Binary displayed a map route. "Validation patterns detected. Academy training applicable. Shall we proceed to the fortress?"',
				]}
			/>
		</div>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
