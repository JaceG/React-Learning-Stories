import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { 
		capturedCells,
		handleCellCapture,
		bubbledCells,
		handleCellBubble,
		logEvent,
		currentTempo,
		setCurrentTempo
	} = useOutletContext();

	const [eventFlow, setEventFlow] = useState([]);
	const [preventedEvents, setPreventedEvents] = useState([]);

	const handleHarmonyClick = (index, phase) => {
		const eventInfo = {
			cell: index,
			phase: phase,
			timestamp: Date.now()
		};

		if (phase === 'capture') {
			handleCellCapture(index);
			logEvent({
				type: 'Capture Phase',
				detail: `Cell ${index} captured the event going down`
			});
		} else {
			handleCellBubble(index);
			logEvent({
				type: 'Bubble Phase',
				detail: `Cell ${index} bubbled the event going up`
			});
		}

		setEventFlow([...eventFlow.slice(-5), eventInfo]);
	};

	const demonstrateEventPropagation = (e, location) => {
		logEvent({
			type: 'Event Propagation',
			detail: `${location} received the event`,
			phase: e.eventPhase === 1 ? 'Capture' : 'Bubble'
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Harmony of Event Flow
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Eva learned that events in the React Symphony didn't just play 
					once - they flowed through the component tree like a musical 
					wave, first diving down (capture phase) and then bubbling up 
					(bubble phase), creating beautiful harmonies along the way.
				</p>

				<div className='event-flow'>
					<div className={`event-stage ${eventFlow.some(e => e.phase === 'capture') ? 'active' : ''}`}>
						<h4>Capture Phase</h4>
						<p>↓ Going Down ↓</p>
					</div>
					<div className='flow-arrow'>→</div>
					<div className='event-stage'>
						<h4>Target</h4>
						<p>🎯 Event Origin</p>
					</div>
					<div className='flow-arrow'>→</div>
					<div className={`event-stage ${eventFlow.some(e => e.phase === 'bubble') ? 'active' : ''}`}>
						<h4>Bubble Phase</h4>
						<p>↑ Going Up ↑</p>
					</div>
				</div>

				<div className='event-composition'>
					<h3>The Propagation Symphony</h3>
					<div 
						className='harmony-grid'
						onClickCapture={(e) => demonstrateEventPropagation(e, 'Parent (Capture)')}>
						{[...Array(9)].map((_, index) => (
							<div
								key={index}
								className={`harmony-cell ${capturedCells.includes(index) ? 'captured' : ''} ${bubbledCells.includes(index) ? 'bubbled' : ''}`}
								onClickCapture={() => handleHarmonyClick(index, 'capture')}
								onClick={() => handleHarmonyClick(index, 'bubble')}>
								{index + 1}
								{capturedCells.includes(index) && <span> ↓</span>}
								{bubbledCells.includes(index) && <span> ↑</span>}
							</div>
						))}
					</div>
					<p style={{ textAlign: 'center', color: '#95a5a6' }}>
						Click cells to see capture (↓) and bubble (↑) phases
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Controlling the Flow
				</h3>

				<div className='tempo-control'>
					<h4>Event Delegation Tempo</h4>
					<p>Adjust the tempo to see how event delegation works:</p>
					<input
						type='range'
						min='60'
						max='180'
						value={currentTempo}
						onChange={(e) => setCurrentTempo(Number(e.target.value))}
						className='tempo-slider'
					/>
					<p>Current Tempo: {currentTempo} BPM</p>

					<div style={{ marginTop: '2rem' }}>
						<h5>Delegation Demo - One Handler, Many Buttons</h5>
						<div 
							onClick={(e) => {
								if (e.target.tagName === 'BUTTON') {
									const note = e.target.dataset.note;
									logEvent({
										type: 'Delegated Click',
										detail: `Played note: ${note}`,
										tempo: currentTempo
									});
								}
							}}
							style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
							{['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(note => (
								<button
									key={note}
									data-note={note}
									className='musical-note'>
									{note}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className='synthetic-event-demo'>
					<h4>Stopping the Symphony</h4>
					<div>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setPreventedEvents([...preventedEvents, 'stopPropagation']);
								logEvent({
									type: 'Event Stopped',
									detail: 'Propagation halted - no bubbling!'
								});
							}}
							style={{ marginRight: '1rem' }}>
							Stop Propagation
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setPreventedEvents([...preventedEvents, 'preventDefault']);
								logEvent({
									type: 'Default Prevented',
									detail: 'Default browser behavior blocked'
								});
							}}>
							Prevent Default
						</button>
					</div>
					{preventedEvents.length > 0 && (
						<p style={{ marginTop: '1rem' }}>
							Prevented: {preventedEvents.join(', ')}
						</p>
					)}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Event Propagation in React
function EventHarmony() {
  // Event Bubbling (default)
  const handleBubble = (e) => {
    console.log('Bubble phase:', e.currentTarget);
  };

  // Event Capturing
  const handleCapture = (e) => {
    console.log('Capture phase:', e.currentTarget);
  };

  return (
    <div 
      onClickCapture={handleCapture}  // Fires during capture
      onClick={handleBubble}           // Fires during bubble
    >
      <button onClick={(e) => {
        console.log('Button clicked');
        
        // Stop the event from bubbling up
        e.stopPropagation();
        
        // Prevent default action (form submit, link navigation)
        e.preventDefault();
      }}>
        Click Me
      </button>
    </div>
  );
}

// Event Delegation Pattern
function MusicKeyboard() {
  // One handler for all keys
  const playNote = (e) => {
    // Check if clicked element is a key
    if (e.target.classList.contains('key')) {
      const note = e.target.dataset.note;
      console.log('Playing:', note);
    }
  };

  return (
    <div className="keyboard" onClick={playNote}>
      <div className="key" data-note="C">C</div>
      <div className="key" data-note="D">D</div>
      <div className="key" data-note="E">E</div>
      {/* One handler manages all keys! */}
    </div>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Flow Lesson:</h3>
				<p>
					Event propagation in React follows the same capture and bubble 
					phases as native DOM events. Understanding this flow lets you 
					place event handlers strategically - use delegation to handle 
					many elements with one handler, or stop propagation to prevent 
					events from traveling further. It's like conducting different 
					sections of an orchestra to play at just the right moments.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How is event propagation like a wave traveling through an 
					orchestra, affecting different sections as it passes?
				</p>
				<p>
					When might you want to "stop" an event mid-performance, 
					and when would you let it flow naturally?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;