import React, { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
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

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: The Harmony of Event Flow</h2>
			
			<div className='chapter-bridge'>
				<p>Conductor Eventus led Aria to the grand amphitheater where the event propagation 
				patterns were visualized as flowing streams of light. "Here's where many developers 
				struggle," he explained. "They don't understand how events travel through the component tree."</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					Aria watched the light patterns with recognition. "This reminds me of the Data Rivers 
					in the Trade Quarter! Events flow like data, but in two phases - capture down, bubble up."
				</p>
				
				<p className='story-paragraph'>
					"Precisely!" Eventus exclaimed. "But we have a problem. Junior conductors keep placing 
					handlers at the wrong phase, causing event conflicts and performance issues."
				</p>
				
				<p className='story-paragraph'>
					Binary's scanners tracked the event flows. "Detecting inefficient event attachment patterns. 
					Multiple handlers where one delegated handler would suffice. Classic optimization opportunity!"
				</p>
				
				<p className='story-paragraph'>
					"Show me your most complex propagation challenge," Aria requested, already seeing 
					solutions from her experience with useCallback and event memoization.
				</p>

				<div className='aria-diagnosis'>
					<h3>Aria's Event Flow Analysis</h3>
					<p className='story-paragraph'>
						"The issue isn't the events themselves," Aria explained, projecting her own 
						visualization. "It's understanding when to intercept them. Let me show you a 
						pattern I developed combining useCallback with event delegation..."
					</p>
				</div>

				<div className='event-flow-visualization'>
					<h3>The Propagation Symphony</h3>
					<div className='flow-phases'>
						<div className={`event-stage capture-stage ${eventFlow.some(e => e.phase === 'capture') ? 'active' : ''}`}>
							<h4>📥 Capture Phase</h4>
							<p>Events descend from root</p>
							<div className='flow-direction'>↓↓↓</div>
						</div>
						<div className='flow-arrow'>→</div>
						<div className='event-stage target-stage'>
							<h4>🎯 Target Element</h4>
							<p>Event reaches destination</p>
						</div>
						<div className='flow-arrow'>→</div>
						<div className={`event-stage bubble-stage ${eventFlow.some(e => e.phase === 'bubble') ? 'active' : ''}`}>
							<h4>📤 Bubble Phase</h4>
							<p>Events ascend to root</p>
							<div className='flow-direction'>↑↑↑</div>
						</div>
					</div>
				</div>

				<div className='event-composition'>
					<h3>Interactive Event Propagation Grid</h3>
					<p className='eventus-instruction'>
						"Click the cells below to see how events propagate through the component tree!"
					</p>
					<div 
						className='harmony-grid'
						onClickCapture={(e) => demonstrateEventPropagation(e, 'Parent (Capture)')}>
						{[...Array(9)].map((_, index) => (
							<div
								key={index}
								className={`harmony-cell ${capturedCells.includes(index) ? 'captured' : ''} ${bubbledCells.includes(index) ? 'bubbled' : ''}`}
								onClickCapture={() => handleHarmonyClick(index, 'capture')}
								onClick={() => handleHarmonyClick(index, 'bubble')}>
								<span className='cell-number'>{index + 1}</span>
								{capturedCells.includes(index) && <span className='phase-indicator capture'>↓</span>}
								{bubbledCells.includes(index) && <span className='phase-indicator bubble'>↑</span>}
							</div>
						))}
					</div>
					<div className='propagation-legend'>
						<span>↓ = Capture Phase</span>
						<span>↑ = Bubble Phase</span>
					</div>
				</div>
			</div>

			<div className='aria-optimization'>
				<h3>Aria's Event Delegation Pattern</h3>
				<p className='story-paragraph'>
					"Watch this," Aria said, her fingers dancing across Binary's holographic keyboard. 
					"Instead of attaching handlers to each element, we use event delegation - a pattern 
					I perfected while working with large component trees."
				</p>
				
				<pre className='magical-code'>{`// Aria's optimized event delegation
const useEventDelegation = (selector, handler) => {
  return useCallback((e) => {
    // Check if the clicked element matches our selector
    const target = e.target.closest(selector);
    if (target) {
      handler(e, target);
    }
  }, [selector, handler]);
};

// Using the pattern
function OptimizedKeyboard() {
  // One handler for all keys!
  const handleKeyPress = useEventDelegation('.key', (e, key) => {
    const note = key.dataset.note;
    playSound(note);
  });
  
  return (
    <div className="keyboard" onClick={handleKeyPress}>
      {notes.map(note => (
        <div key={note} className="key" data-note={note}>
          {note}
        </div>
      ))}
    </div>
  );
}`}</pre>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Mastering Event Flow
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Help Aria demonstrate advanced event propagation control to the Symphony Hall students!
						</strong>
					</p>
				</div>

				<div className='tempo-control'>
					<h4>🎼 Event Delegation Orchestra</h4>
					<p>Adjust the tempo to change event handling speed:</p>
					<input
						type='range'
						min='60'
						max='180'
						value={currentTempo}
						onChange={(e) => setCurrentTempo(Number(e.target.value))}
						className='tempo-slider'
					/>
					<p className='tempo-display'>Tempo: {currentTempo} BPM</p>

					<div className='delegation-demo'>
						<h5>One Conductor, Many Instruments</h5>
						<p className='aria-explanation'>
							"See how one event handler manages all instruments - just like Conductor Eventus 
							manages the entire orchestra!"
						</p>
						<div 
							className='instrument-keys'
							onClick={(e) => {
								if (e.target.classList.contains('musical-note')) {
									const note = e.target.dataset.note;
									logEvent({
										type: 'Delegated Event',
										detail: `Note ${note} at ${currentTempo} BPM`,
										instrument: 'Keyboard'
									});
								}
							}}>
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

				<div className='propagation-control'>
					<h4>🛡️ Controlling the Symphony</h4>
					<div className='control-buttons'>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setPreventedEvents([...preventedEvents, 'stopPropagation']);
								logEvent({
									type: 'Propagation Stopped',
									detail: 'Event halted - no bubbling!',
									technique: 'stopPropagation()'
								});
							}}
							className='control-button stop'>
							Stop Propagation
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setPreventedEvents([...preventedEvents, 'preventDefault']);
								logEvent({
									type: 'Default Prevented',
									detail: 'Browser default action blocked',
									technique: 'preventDefault()'
								});
							}}
							className='control-button prevent'>
							Prevent Default
						</button>
					</div>
					{preventedEvents.length > 0 && (
						<div className='prevented-display'>
							<p>Techniques used: {preventedEvents.join(', ')}</p>
							<button 
								onClick={() => setPreventedEvents([])}
								className='reset-button'>
								Reset
							</button>
						</div>
					)}
				</div>
			</div>

			<div className='eventus-amazement'>
				<p className='story-paragraph'>
					Conductor Eventus watched as his students began understanding the patterns. "Your 
					event delegation approach is revolutionary! We've been creating individual handlers 
					for each instrument when one conductor could manage them all!"
				</p>
				
				<p className='story-paragraph'>
					"It's a pattern I refined in the Echo Tower," Aria explained. "Combine it with 
					proper phase understanding, and you can create incredibly efficient event systems."
				</p>
				
				<p className='story-paragraph'>
					Binary displayed performance metrics: "Event handler count reduced by 89%. Memory 
					usage optimized. Event flow conflicts eliminated!"
				</p>
			</div>

			<div className='advanced-patterns'>
				<h3>Advanced Event Flow Patterns</h3>
				<div className='pattern-showcase'>
					<div className='pattern-example'>
						<h4>🎭 Phase-Specific Handling</h4>
						<pre className='mini-code'>{`// Capture for early interception
<div onClickCapture={logCapture}>
  <button onClick={logBubble}>
    Capture fires first!
  </button>
</div>`}</pre>
					</div>
					<div className='pattern-example'>
						<h4>🎪 Event Delegation</h4>
						<pre className='mini-code'>{`// One handler, many targets
<ul onClick={(e) => {
  if (e.target.tagName === 'LI') {
    handleItem(e.target.id);
  }
}}>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>`}</pre>
					</div>
					<div className='pattern-example'>
						<h4>🚫 Conditional Propagation</h4>
						<pre className='mini-code'>{`// Stop events conditionally
onClick={(e) => {
  if (shouldStop) {
    e.stopPropagation();
  }
  handleClick();
}}`}</pre>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 20 (Late Afternoon)</h4>
					<p>Event propagation is fascinating when viewed through the lens of optimization! 
					Showed Conductor Eventus how event delegation reduces handler overhead - instead 
					of n handlers for n elements, use one intelligent handler. The capture/bubble 
					phases are like the data flow patterns I learned in the Trade Quarter, but 
					bidirectional. Binary calculated massive performance improvements. The Symphony 
					Hall students were amazed when I demonstrated how one handler could manage an 
					entire keyboard of notes. useCallback ensures the handler reference stays stable 
					too. Eventus mentioned something about async event patterns next...</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Harmony of Event Flow:</h3>
				<p>
					Event propagation in React follows the W3C standard: capture phase descends from 
					root to target, then bubble phase ascends back to root. Understanding this flow 
					enables powerful patterns like event delegation, where one handler manages many 
					elements. Use stopPropagation() to halt event flow and preventDefault() to stop 
					default browser actions. Strategic placement of handlers in capture vs bubble phase 
					gives fine-grained control over event processing. Master the flow, and you master 
					interaction efficiency.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does event delegation relate to Aria's previous learning about optimization?
				</p>
				<p className='story-paragraph'>
					Why is understanding both phases of event flow crucial for complex applications?
				</p>
				<p className='story-paragraph'>
					What performance benefits come from reducing event handler count?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterTwo;