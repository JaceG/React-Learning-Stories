import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const { 
		playingInstruments,
		playInstrument,
		eventLog,
		logEvent,
		updateMetric
	} = useOutletContext();

	const instruments = [
		{ name: 'Click', icon: '🥁', sound: 'Boom!', type: 'percussion' },
		{ name: 'KeyPress', icon: '🎹', sound: 'Pling!', type: 'keyboard' },
		{ name: 'MouseMove', icon: '🎻', sound: 'Swoosh!', type: 'string' },
		{ name: 'Focus', icon: '🎺', sound: 'Toot!', type: 'brass' },
		{ name: 'Blur', icon: '🎷', sound: 'Wahh!', type: 'woodwind' },
		{ name: 'Change', icon: '🎸', sound: 'Strum!', type: 'string' }
	];

	const handleInstrumentClick = (instrument) => {
		playInstrument(instrument.name);
		logEvent({
			type: 'onClick',
			instrument: instrument.name,
			sound: instrument.sound
		});
		updateMetric('clicks');
	};

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Symphony Hall Invitation</h2>
			
			<div className='chapter-bridge'>
				<p>The Event Symphony Hall stood as a magnificent structure in the heart of the 
				Western Quarter, its crystalline walls pulsing with the rhythm of countless user 
				interactions. Aria and Binary arrived to find chaos - events firing randomly, 
				handlers conflicting, and the grand orchestra in complete disarray.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"<strong>Hook Craftmaster Aria!</strong>" A distinguished figure in a conductor's 
					coat rushed forward, his baton crackling with event energy. "<strong>Conductor Eventus</strong> 
					at your service. Thank the React gods you're here! Our symphony has become a cacophony!"
				</p>
				
				<p className='story-paragraph'>
					Binary's sensors immediately began analyzing the chaos, projecting waveforms and 
					event flows in the air. "Detecting multiple event propagation conflicts, cross-browser 
					inconsistencies, and memory leaks from improper handler management."
				</p>
				
				<p className='story-paragraph'>
					Aria surveyed the scene with experienced eyes. "I see the problem. You're fighting 
					React's synthetic event system instead of working with it. Let me show you how 
					events should flow - like a well-conducted symphony."
				</p>
				
				<p className='story-paragraph'>
					Eventus's eyes widened with hope. "You understand the synthetic event wrapper? 
					Most developers just attach handlers without grasping the underlying harmony!"
				</p>

				<div className='aria-demonstrates'>
					<h3>Aria's Event Symphony Demonstration</h3>
					<p className='story-paragraph'>
						"Think of each user interaction as an instrument," Aria explained, gesturing 
						to the orchestra pit. "React doesn't just pass raw browser events - it wraps 
						them in SyntheticEvents for consistency and performance. Watch..."
					</p>
				</div>

				<div className='concert-hall'>
					<h3>The React Event Orchestra</h3>
					<p className='conductor-instruction'>
						Conductor Eventus hands you the baton: "Try conducting these instruments!"
					</p>
					<div className='orchestra-section'>
						{instruments.map((instrument) => (
							<div
								key={instrument.name}
								className={`instrument ${instrument.type} ${playingInstruments.includes(instrument.name) ? 'playing' : ''}`}
								onClick={() => handleInstrumentClick(instrument)}
								onMouseEnter={() => {
									if (instrument.name === 'MouseMove') {
										playInstrument(instrument.name);
										logEvent({
											type: 'onMouseEnter',
											instrument: instrument.name,
											sound: instrument.sound
										});
										updateMetric('mouseMoves');
									}
								}}>
								<div className='instrument-icon'>{instrument.icon}</div>
								<h4>{instrument.name}</h4>
								<p className='instrument-sound'>{instrument.sound}</p>
								<div className={`sound-wave ${playingInstruments.includes(instrument.name) ? 'active' : ''}`}></div>
							</div>
						))}
					</div>
				</div>

				<div className='conductor-podium'>
					<h3>Binary's Event Analysis</h3>
					<div className='event-display'>
						{eventLog.length === 0 ? (
							<p className='binary-waiting'>Binary: "Awaiting event data streams..."</p>
						) : (
							eventLog.map((event, index) => (
								<div key={index} className='event-log-entry'>
									<span className='timestamp'>[{event.timestamp}]</span> 
									<span className='event-type'>{event.type}</span> - 
									<span className='instrument-name'>{event.instrument}</span>: 
									<span className='sound-effect'>{event.sound}</span>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			<div className='aria-teaches-synthetic'>
				<h3>Understanding React's Synthetic Events</h3>
				<p className='story-paragraph'>
					"The brilliance of React's event system," Aria explained while Binary projected 
					code examples, "is that it normalizes all browser differences. Just like a 
					conductor ensures every musician plays in harmony, React ensures every event 
					behaves consistently."
				</p>
				
				<pre className='magical-code'>{`// Aria demonstrates the pattern
function EventOrchestra() {
  // React wraps native events in SyntheticEvents
  const handleClick = (e) => {
    // 'e' is a SyntheticBaseEvent, not a raw DOM event
    console.log(e.type);           // Always normalized
    console.log(e.target);         // Always consistent
    console.log(e.currentTarget);  // Always reliable
    
    // These methods work identically across all browsers
    e.preventDefault();   // No browser quirks
    e.stopPropagation(); // Predictable behavior
  };

  // Event handlers follow React's conventions
  return (
    <div
      onClick={handleClick}        // camelCase, not onclick
      onMouseEnter={handleHover}   // Synthetic wrapper applied
      onChange={handleChange}      // Automatic cleanup
    >
      <p>Every event is orchestrated by React!</p>
    </div>
  );
}`}</pre>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Conducting the Event Symphony
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Help Conductor Eventus restore harmony to the Event Symphony Hall 
							by properly handling different event types!
						</strong>
					</p>
				</div>

				<div className='sheet-music'>
					<h4>🎼 Compose Your Event Symphony</h4>
					<p>Try these interactions to see how React orchestrates events:</p>
					<ul>
						<li>Click the drums (🥁) to trigger onClick events</li>
						<li>Hover over the violin (🎻) for onMouseEnter</li>
						<li>Type in the input below for onChange and onKeyPress</li>
						<li>Focus and blur the button to see focus events</li>
					</ul>

					<div className='event-playground'>
						<input
							type='text'
							placeholder='Type here to play the piano...'
							onChange={(e) => {
								playInstrument('KeyPress');
								logEvent({
									type: 'onChange',
									instrument: 'KeyPress',
									sound: 'Pling!',
									value: e.target.value
								});
							}}
							onKeyPress={() => updateMetric('keyPresses')}
							className='piano-input'
						/>

						<button
							onFocus={() => {
								playInstrument('Focus');
								logEvent({
									type: 'onFocus',
									instrument: 'Focus',
									sound: 'Toot!'
								});
							}}
							onBlur={() => {
								playInstrument('Blur');
								logEvent({
									type: 'onBlur',
									instrument: 'Blur',
									sound: 'Wahh!'
								});
							}}
							className='focus-button'>
							Focus/Blur Me (Brass Section)
						</button>
					</div>
				</div>
			</div>

			<div className='eventus-revelation'>
				<p className='story-paragraph'>
					Conductor Eventus watched in amazement as the chaotic events began forming 
					patterns under Aria's guidance. "I see it now! Each synthetic event is like 
					a musical note that React has perfectly tuned!"
				</p>
				
				<p className='story-paragraph'>
					"Exactly," Aria confirmed. "And just like you learned with custom hooks, we 
					can compose these events into more complex patterns. But first, you must 
					master the basics of event flow."
				</p>
				
				<p className='story-paragraph'>
					Binary added cheerfully, "Event handling efficiency improved by 67%! No more 
					browser-specific workarounds detected!"
				</p>
			</div>

			<div className='synthetic-event-comparison'>
				<h3>The Two Worlds of Events</h3>
				<div className='event-worlds'>
					<div className='synthetic-world'>
						<h4>🎭 React's Synthetic Events</h4>
						<ul>
							<li>Cross-browser harmony</li>
							<li>Automatic memory management</li>
							<li>Consistent API (camelCase)</li>
							<li>Performance optimized (event pooling)</li>
							<li>Prevents common mistakes</li>
						</ul>
						<div className='aria-note'>
							"Like a universal sheet music that works for any orchestra!"
						</div>
					</div>
					<div className='native-world'>
						<h4>🌐 Native DOM Events</h4>
						<ul>
							<li>Browser-specific behaviors</li>
							<li>Manual cleanup required</li>
							<li>Inconsistent APIs (lowercase)</li>
							<li>Direct but dangerous</li>
							<li>Legacy compatibility issues</li>
						</ul>
						<div className='eventus-note'>
							"The chaos we faced before React's harmony!"
						</div>
					</div>
				</div>
			</div>

			<div className='practical-application'>
				<h3>Common Event Patterns in the Symphony</h3>
				<div className='pattern-cards'>
					<div className='pattern-card'>
						<h4>🎵 Event Delegation</h4>
						<pre className='mini-code'>{`// Handle events at parent level
<div onClick={(e) => {
  if (e.target.tagName === 'BUTTON') {
    handleButtonClick(e.target.id);
  }
}}>
  <button id="play">▶️</button>
  <button id="pause">⏸️</button>
</div>`}</pre>
					</div>
					<div className='pattern-card'>
						<h4>🎶 Preventing Defaults</h4>
						<pre className='mini-code'>{`// Stop form submission
<form onSubmit={(e) => {
  e.preventDefault();
  handleCustomSubmit();
}}>
  <input />
  <button>Submit</button>
</form>`}</pre>
					</div>
					<div className='pattern-card'>
						<h4>🎼 Stop Propagation</h4>
						<pre className='mini-code'>{`// Prevent event bubbling
<div onClick={parentHandler}>
  <button onClick={(e) => {
    e.stopPropagation();
    childHandler();
  }}>
    Child Only
  </button>
</div>`}</pre>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Character Introduction</h4>
					<p><strong>Conductor Eventus</strong> - The Western Quarter's master of event 
					orchestration. His passion for perfect event harmony is matched only by his 
					frustration when events don't behave as expected. Years of dealing with browser 
					inconsistencies have made him grateful for React's synthetic event system. His 
					conductor's baton can visualize event flow and propagation paths.</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Symphony's First Movement:</h3>
				<p>
					React's synthetic event system orchestrates all browser events into a harmonious 
					symphony. By wrapping native events, React ensures consistent behavior across all 
					browsers and provides automatic cleanup. Event handlers in React follow camelCase 
					conventions and receive SyntheticEvent objects that normalize browser differences. 
					This abstraction allows developers to write event handling code once and trust it 
					will work everywhere - the foundation of any great interactive symphony.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does Aria's hook mastery help her understand event handling patterns?
				</p>
				<p className='story-paragraph'>
					Why is React's synthetic event system like a universal conductor for all browsers?
				</p>
				<p className='story-paragraph'>
					What event handling chaos have you experienced that React's system could solve?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterOne;