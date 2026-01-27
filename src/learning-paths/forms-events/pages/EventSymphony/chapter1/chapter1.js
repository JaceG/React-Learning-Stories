import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterOne() {
	const {
		playingInstruments,
		playInstrument,
		eventLog,
		logEvent,
		updateMetric,
	} = useOutletContext();

	const instruments = [
		{ name: 'Click', icon: '🥁', sound: 'Boom!', type: 'percussion' },
		{ name: 'KeyPress', icon: '🎹', sound: 'Pling!', type: 'keyboard' },
		{ name: 'MouseMove', icon: '🎻', sound: 'Swoosh!', type: 'string' },
		{ name: 'Focus', icon: '🎺', sound: 'Toot!', type: 'brass' },
		{ name: 'Blur', icon: '🎷', sound: 'Wahh!', type: 'woodwind' },
		{ name: 'Change', icon: '🎸', sound: 'Strum!', type: 'string' },
	];

	const handleInstrumentClick = (instrument) => {
		playInstrument(instrument.name);
		logEvent({
			type: 'onClick',
			instrument: instrument.name,
			sound: instrument.sound,
		});
		updateMetric('clicks');
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='The Symphony Hall Invitation'
				/>

	<StorySection paragraphs={[
		`The Event Symphony Hall stood as a magnificent structure in the heart of the Western Quarter, its crystalline walls pulsing with the rhythm of countless user interactions. Aria and Binary arrived to find controlled chaos - events firing in patterns, handlers coordinating responses, but something seemed... unoptimized.`,
		<><strong>Academy graduate Aria!</strong>{" A distinguished figure in a conductor's coat rushed forward, his baton crackling with event energy. "} <strong>Conductor Eventus</strong>{" at your service. Master Formeus wrote of your progress in form alchemy. Welcome to the Symphony Hall - I'm excited to teach you about React's event system!"}</>,
		`Binary's sensors immediately began analyzing the event flows, projecting waveforms and interaction patterns in the air. "Detecting event propagation patterns, but performance could be optimized using Academy techniques!"`,
		`Aria surveyed the scene with her Academy-trained eyes. "I can see event handling happening, but I'm curious how React's event system works under the hood. At the Academy, we focused on hooks and state - this is my first deep dive into event management."`,
		`Eventus's eyes lit up with excitement. "Excellent! I can see your Academy training will help you understand these concepts quickly. Let me show you how React's event system works - it's like a well-conducted symphony where every interaction is orchestrated."`
	]} />

					<div className='aria-demonstrates'>
						<h3>Learning React's Event System</h3>
						<p className='story-paragraph'>
							"Think of each user interaction as an instrument,"
							Eventus explained, gesturing to the orchestra pit.
							"React doesn't just pass raw browser events - it
							wraps them in SyntheticEvents for consistency and
							performance. Watch as I demonstrate..."
						</p>
					</div>

					<div className='concert-hall'>
						<h3>The React Event Orchestra</h3>
						<p className='conductor-instruction'>
							Conductor Eventus hands you the baton: "Try
							conducting these instruments to learn how React
							handles events!"
						</p>
						<div className='orchestra-section'>
							{instruments.map((instrument) => (
								<div
									key={instrument.name}
									className={`instrument ${instrument.type} ${
										playingInstruments.includes(
											instrument.name
										)
											? 'playing'
											: ''
									}`}
									onClick={() =>
										handleInstrumentClick(instrument)
									}
									onMouseEnter={() => {
										if (instrument.name === 'MouseMove') {
											playInstrument(instrument.name);
											logEvent({
												type: 'onMouseEnter',
												instrument: instrument.name,
												sound: instrument.sound,
											});
											updateMetric('mouseMoves');
										}
									}}>
									<div className='instrument-icon'>
										{instrument.icon}
									</div>
									<h4>{instrument.name}</h4>
									<p className='instrument-sound'>
										{instrument.sound}
									</p>
									<div
										className={`sound-wave ${
											playingInstruments.includes(
												instrument.name
											)
												? 'active'
												: ''
										}`}></div>
								</div>
							))}
						</div>
					</div>

					<div className='conductor-podium'>
						<h3>Binary's Event Analysis</h3>
						<div className='event-display'>
							{eventLog.length === 0 ? (
								<p className='binary-waiting'>
									Binary: "Analyzing event data streams..."
								</p>
							) : (
								eventLog.map((event, index) => (
									<div
										key={index}
										className='event-log-entry'>
										<span className='timestamp'>
											[{event.timestamp}]
										</span>
										<span className='event-type'>
											{event.type}
										</span>{' '}
										-
										<span className='instrument-name'>
											{event.instrument}
										</span>
										:
										<span className='sound-effect'>
											{event.sound}
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>

				<div className='aria-learns-synthetic'>
					<h3>Learning React's Synthetic Events</h3>
					<p className='story-paragraph'>
						"The brilliance of React's event system," Eventus
						explained while Binary projected code examples, "is that
						it normalizes all browser differences. Just like a
						conductor ensures every musician plays in harmony, React
						ensures every event behaves consistently."
					</p>

					<CodeExample
						title="React's Synthetic Event System"
						discoveredBy="Demonstrated by Conductor Eventus"
						code={`// Aria learns the event pattern
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
}`}
					/>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Learning Event Orchestration
					</h3>
					<InstructionBox character="Conductor Eventus raises his baton.">
						Help Aria learn how React orchestrates events by trying different interactions with the instruments above!
					</InstructionBox>

					<div className='sheet-music'>
						<h4>🎼 Compose Your Event Learning</h4>
						<p>
							Try these interactions to see how React orchestrates
							events:
						</p>
						<ul>
							<li>
								Click the drums (🥁) to trigger onClick events
							</li>
							<li>Hover over the violin (🎻) for onMouseEnter</li>
							<li>
								Type in the input below for onChange and
								onKeyPress
							</li>
							<li>
								Focus and blur the button to see focus events
							</li>
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
										value: e.target.value,
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
										sound: 'Toot!',
									});
								}}
								onBlur={() => {
									playInstrument('Blur');
									logEvent({
										type: 'onBlur',
										instrument: 'Blur',
										sound: 'Wahh!',
									});
								}}
								className='focus-button'>
								Focus/Blur Me (Brass Section)
							</button>
						</div>
					</div>
				</div>

			<StorySection paragraphs={[
				`Conductor Eventus watched as Aria experimented with the event patterns, her Academy training helping her quickly grasp the concepts. "I see you understand the fundamentals! React's synthetic events are like musical notes that have been perfectly tuned for consistency."`,
				`"Exactly like the patterns I learned at the Academy," Aria confirmed, connecting the concepts. "Just like useState provides consistent state management, React's event system provides consistent event handling across all browsers."`,
				`Binary added cheerfully, "Event handling consistency improved! No browser-specific workarounds detected in React's system!"`
			]} />

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
								"Like the hook patterns I learned - consistent
								and optimized!"
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
								"The chaos React's system prevents!"
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

				<ChapterSummary
					lessonInsight={{
						title: "The Symphony's First Movement:",
						content:
							"React's synthetic event system orchestrates all browser events into a harmonious symphony. By wrapping native events, React ensures consistent behavior across all browsers and provides automatic cleanup. Event handlers in React follow camelCase conventions and receive SyntheticEvent objects that normalize browser differences. This abstraction allows developers to write event handling code once and trust it will work everywhere - the foundation of any great interactive symphony.",
					}}
					reflectionQuestions={[
						"How does Aria's Academy training in consistent patterns help her understand event handling?",
						"Why is React's synthetic event system like a universal conductor for all browsers?",
						"What event handling chaos have you experienced that React's system could solve?",
					]}
					journalEntry={{
						title: "Aria's Journal - Day 18 (Morning)",
						content:
							"The Event Symphony Hall is magnificent! Conductor Eventus welcomed me warmly after hearing about my progress with Form Alchemy. Today I learned about React's synthetic event system - it wraps native browser events to provide consistent behavior everywhere. onClick instead of onclick, onMouseEnter, onChange - all normalized! Binary was fascinated by how React handles the complexity behind the scenes. The synthetic events have methods like preventDefault() and stopPropagation() that work identically across all browsers. Eventus says this foundation is crucial before we dive into event propagation patterns this afternoon!",
					}}
				/>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
