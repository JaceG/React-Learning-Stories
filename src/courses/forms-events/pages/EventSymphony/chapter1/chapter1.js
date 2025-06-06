import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		playingInstruments,
		playInstrument,
		eventLog,
		logEvent,
		updateMetric
	} = useOutletContext();

	const instruments = [
		{ name: 'Click', icon: '🥁', sound: 'Boom!' },
		{ name: 'KeyPress', icon: '🎹', sound: 'Pling!' },
		{ name: 'MouseMove', icon: '🎻', sound: 'Swoosh!' },
		{ name: 'Focus', icon: '🎺', sound: 'Toot!' },
		{ name: 'Blur', icon: '🎷', sound: 'Wahh!' },
		{ name: 'Change', icon: '🎸', sound: 'Strum!' }
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

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Orchestra of Events
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the grand Concert Hall of React, a young conductor named Eva 
					discovered that every user interaction was like a musical note. 
					Clicks were drums, key presses were pianos, and mouse movements 
					were violins - all playing together in perfect harmony.
				</p>

				<div className='concert-hall'>
					<h3>The React Orchestra</h3>
					<div className='orchestra-section'>
						{instruments.map((instrument) => (
							<div
								key={instrument.name}
								className={`instrument ${playingInstruments.includes(instrument.name) ? 'playing' : ''}`}
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
								<p>{instrument.sound}</p>
								<div className={`sound-wave ${playingInstruments.includes(instrument.name) ? 'active' : ''}`}></div>
							</div>
						))}
					</div>
				</div>

				<div className='conductor-podium'>
					<h3>Event Log (Conductor's Notes)</h3>
					<div className='event-display'>
						{eventLog.length === 0 ? (
							<p>Interact with the instruments to see events...</p>
						) : (
							eventLog.map((event, index) => (
								<div key={index}>
									<span style={{ color: '#95a5a6' }}>[{event.timestamp}]</span> {event.type} - {event.instrument}: {event.sound}
								</div>
							))
						)}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Event Listener
				</h3>

				<div className='sheet-music'>
					<h4>Compose Your Event Symphony</h4>
					<p>Try these interactions:</p>
					<ul>
						<li>Click the drums (🥁) to hear onClick events</li>
						<li>Hover over the violin (🎻) to trigger onMouseEnter</li>
						<li>Type in the input below to trigger onChange</li>
					</ul>

					<div style={{ marginTop: '1rem' }}>
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
							style={{
								width: '100%',
								padding: '0.75rem',
								fontSize: '1rem',
								borderRadius: '4px',
								border: '1px solid #ddd'
							}}
						/>
					</div>

					<div style={{ marginTop: '1rem' }}>
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
							style={{
								padding: '0.75rem 1.5rem',
								fontSize: '1rem',
								borderRadius: '4px',
								border: 'none',
								background: '#3498db',
								color: 'white',
								cursor: 'pointer'
							}}>
							Focus/Blur Me
						</button>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// React's Synthetic Event System
function EventOrchestra() {
  // React wraps native browser events in SyntheticEvents
  const handleClick = (e) => {
    console.log(e); // SyntheticBaseEvent
    console.log(e.nativeEvent); // Native DOM event
    
    // All event properties are normalized across browsers
    e.preventDefault(); // Works consistently
    e.stopPropagation(); // Works consistently
  };

  // Event handlers are camelCase in React
  return (
    <div
      onClick={handleClick}        // not onclick
      onMouseEnter={handleHover}   // not onmouseenter
      onChange={handleChange}      // not onchange
    >
      <input
        onFocus={(e) => console.log('Focused!')}
        onBlur={(e) => console.log('Blurred!')}
        onKeyPress={(e) => console.log('Key:', e.key)}
      />
    </div>
  );
}

// Common React Events:
// Mouse: onClick, onDoubleClick, onMouseEnter, onMouseLeave
// Keyboard: onKeyDown, onKeyPress, onKeyUp
// Focus: onFocus, onBlur
// Form: onChange, onSubmit, onInput
// Touch: onTouchStart, onTouchEnd, onTouchMove`}</pre>
			</div>

			<div className='synthetic-event-demo'>
				<h4>React's Synthetic Events vs Native Events</h4>
				<div className='event-comparison'>
					<div className='event-type'>
						<h5>🎭 Synthetic Events</h5>
						<ul>
							<li>Cross-browser compatible</li>
							<li>Pooled for performance</li>
							<li>Automatically cleaned up</li>
							<li>camelCase naming</li>
						</ul>
					</div>
					<div className='event-type'>
						<h5>🌐 Native Events</h5>
						<ul>
							<li>Browser-specific quirks</li>
							<li>Manual memory management</li>
							<li>lowercase naming</li>
							<li>Direct DOM access</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Symphony Lesson:</h3>
				<p>
					React's event system is like a well-conducted orchestra. Every 
					event is wrapped in a SyntheticEvent that ensures consistent 
					behavior across all browsers. This means you can write your event 
					handlers once and trust they'll work everywhere - just like how 
					sheet music works for any orchestra.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does thinking of events as musical instruments help you 
					understand their role in user interaction?
				</p>
				<p>
					Why is it valuable that React "conducts" all events through 
					its synthetic event system?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;