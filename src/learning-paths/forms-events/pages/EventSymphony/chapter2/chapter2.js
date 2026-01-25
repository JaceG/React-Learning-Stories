import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterTwo() {
	const {
		capturedCells,
		handleCellCapture,
		bubbledCells,
		handleCellBubble,
		logEvent,
		currentTempo,
		setCurrentTempo,
	} = useOutletContext();

	const [eventFlow, setEventFlow] = useState([]);
	const [preventedEvents, setPreventedEvents] = useState([]);

	const handleHarmonyClick = (index, phase) => {
		const eventInfo = {
			cell: index,
			phase: phase,
			timestamp: Date.now(),
		};

		if (phase === 'capture') {
			handleCellCapture(index);
			logEvent({
				type: 'Capture Phase',
				detail: `Cell ${index} captured the event going down`,
			});
		} else {
			handleCellBubble(index);
			logEvent({
				type: 'Bubble Phase',
				detail: `Cell ${index} bubbled the event going up`,
			});
		}

		setEventFlow([...eventFlow.slice(-5), eventInfo]);
	};

	const demonstrateEventPropagation = (e, location) => {
		logEvent({
			type: 'Event Propagation',
			detail: `${location} received the event`,
			phase: e.eventPhase === 1 ? 'Capture' : 'Bubble',
		});
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='The Harmony of Event Flow'
					bridge={`Conductor Eventus led Aria to the grand amphitheater where the event propagation patterns were visualized as flowing streams of light. "Here's where many developers struggle," he explained. "They don't understand how events travel through the component tree."`}
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						Aria watched the light patterns with recognition from
						her Academy training. "This reminds me of the Data
						Rivers I learned about! Events flow like data, but in
						two phases - capture down, bubble up."
					</p>

					<p className='story-paragraph'>
						"Precisely!" Eventus exclaimed. "Your Academy background
						serves you well. But we have a performance challenge.
						Many developers place handlers inefficiently, causing
						event conflicts and unnecessary re-renders."
					</p>

					<p className='story-paragraph'>
						Binary's scanners tracked the event flows, applying
						Academy optimization knowledge. "Detecting inefficient
						event attachment patterns. Multiple handlers where one
						delegated handler would suffice. Classic Academy
						optimization opportunity!"
					</p>

					<p className='story-paragraph'>
						"This is fascinating!" Aria exclaimed, studying the
						patterns. "I can see connections to the optimization
						patterns I learned at the Academy. Could you show me how
						event delegation works?"
					</p>

					<div className='aria-applies-training'>
						<h3>Aria Applies Academy Event Patterns</h3>
						<p className='story-paragraph'>
							"Excellent observation!" Eventus praised. "Your
							Academy training in optimization helps you see the
							potential. Let me demonstrate event delegation -
							it's a powerful pattern that combines useCallback
							with smart event handling..."
						</p>
					</div>

					<div className='event-flow-visualization'>
						<h3>The Propagation Symphony</h3>
						<div className='flow-phases'>
							<div
								className={`event-stage capture-stage ${
									eventFlow.some((e) => e.phase === 'capture')
										? 'active'
										: ''
								}`}>
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
							<div
								className={`event-stage bubble-stage ${
									eventFlow.some((e) => e.phase === 'bubble')
										? 'active'
										: ''
								}`}>
								<h4>📤 Bubble Phase</h4>
								<p>Events ascend to root</p>
								<div className='flow-direction'>↑↑↑</div>
							</div>
						</div>
					</div>

					<div className='event-composition'>
						<h3>Interactive Event Propagation Grid</h3>
						<p className='eventus-instruction'>
							"Click the cells below to see how events propagate
							through the component tree!"
						</p>
						<div
							className='harmony-grid'
							onClickCapture={(e) =>
								demonstrateEventPropagation(
									e,
									'Parent (Capture)'
								)
							}>
							{[...Array(9)].map((_, index) => (
								<div
									key={index}
									className={`harmony-cell ${
										capturedCells.includes(index)
											? 'captured'
											: ''
									} ${
										bubbledCells.includes(index)
											? 'bubbled'
											: ''
									}`}
									onClickCapture={() =>
										handleHarmonyClick(index, 'capture')
									}
									onClick={() =>
										handleHarmonyClick(index, 'bubble')
									}>
									<span className='cell-number'>
										{index + 1}
									</span>
									{capturedCells.includes(index) && (
										<span className='phase-indicator capture'>
											↓
										</span>
									)}
									{bubbledCells.includes(index) && (
										<span className='phase-indicator bubble'>
											↑
										</span>
									)}
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
					<h3>Aria Applies Academy Optimization Patterns</h3>
					<p className='story-paragraph'>
						"Watch this," Aria said, applying her Academy training.
						"Instead of attaching handlers to each element, we use
						event delegation - a pattern I can optimize with the
						useCallback techniques I learned from the Performance
						Sanctuary."
					</p>

					<CodeExample
						title="Academy-Trained Event Delegation"
						discoveredBy="Applied by Aria"
						code={`// Aria's Academy-trained event delegation
const useEventDelegation = (selector, handler) => {
  // Using useCallback from Academy training
  return useCallback((e) => {
    // Check if the clicked element matches our selector
    const target = e.target.closest(selector);
    if (target) {
      handler(e, target);
    }
  }, [selector, handler]);
};

// Applying the Academy pattern
function OptimizedKeyboard() {
  // One handler for all keys - Academy efficiency!
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
}`}
					/>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Mastering Event Flow
					</h3>
					<InstructionBox character="Eventus gestures to the propagation visualization.">
						Help Aria apply her Academy optimization training to demonstrate advanced event propagation control!
					</InstructionBox>

					<div className='tempo-control'>
						<h4>🎼 Academy-Optimized Event Delegation</h4>
						<p>Adjust the tempo to change event handling speed:</p>
						<input
							type='range'
							min='60'
							max='180'
							value={currentTempo}
							onChange={(e) =>
								setCurrentTempo(Number(e.target.value))
							}
							className='tempo-slider'
						/>
						<p className='tempo-display'>
							Tempo: {currentTempo} BPM
						</p>

						<div className='delegation-demo'>
							<h5>One Conductor, Many Instruments</h5>
							<p className='aria-explanation'>
								"See how one optimized event handler manages all
								instruments - just like the efficiency patterns
								I learned at the Academy!"
							</p>
							<div
								className='instrument-keys'
								onClick={(e) => {
									if (
										e.target.classList.contains(
											'musical-note'
										)
									) {
										const note = e.target.dataset.note;
										logEvent({
											type: 'Delegated Event',
											detail: `Note ${note} at ${currentTempo} BPM`,
											instrument: 'Keyboard',
										});
									}
								}}>
								{['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(
									(note) => (
										<button
											key={note}
											data-note={note}
											className='musical-note'>
											{note}
										</button>
									)
								)}
							</div>
						</div>
					</div>

					<div className='propagation-control'>
						<h4>🛡️ Controlling the Symphony</h4>
						<div className='control-buttons'>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setPreventedEvents([
										...preventedEvents,
										'stopPropagation',
									]);
									logEvent({
										type: 'Propagation Stopped',
										detail: 'Event halted - no bubbling!',
										technique: 'stopPropagation()',
									});
								}}
								className='control-button stop'>
								Stop Propagation
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									setPreventedEvents([
										...preventedEvents,
										'preventDefault',
									]);
									logEvent({
										type: 'Default Prevented',
										detail: 'Browser default action blocked',
										technique: 'preventDefault()',
									});
								}}
								className='control-button prevent'>
								Prevent Default
							</button>
						</div>
						{preventedEvents.length > 0 && (
							<div className='prevented-display'>
								<p>
									Techniques used:{' '}
									{preventedEvents.join(', ')}
								</p>
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
						Conductor Eventus watched as Aria applied Academy
						optimization patterns to event handling. "Your
						Academy-trained approach to event delegation is
						excellent! You've learned how one optimized handler can
						manage many elements efficiently!"
					</p>

					<p className='story-paragraph'>
						"It's a pattern I learned from the Performance
						Sanctuary," Aria explained. "Combine it with proper
						phase understanding, and you can create incredibly
						efficient event systems."
					</p>

					<p className='story-paragraph'>
						Binary displayed performance metrics: "Event handler
						count reduced by 89%. Memory usage optimized using
						Academy patterns. Event flow conflicts eliminated!"
					</p>
				</div>

				<div className='advanced-patterns'>
					<h3>Academy-Enhanced Event Flow Patterns</h3>
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

				<ChapterSummary
					lessonInsight={{
						title: 'The Harmony of Event Flow:',
						content:
							'Event propagation in React follows the W3C standard: capture phase descends from root to target, then bubble phase ascends back to root. Understanding this flow enables powerful patterns like event delegation, where one optimized handler manages many elements using Academy-trained performance techniques. Use stopPropagation() to halt event flow and preventDefault() to stop default browser actions. Strategic placement of handlers in capture vs bubble phase gives fine-grained control over event processing. Master the flow with Academy optimization patterns, and you master interaction efficiency.',
					}}
					reflectionQuestions={[
						"How does event delegation relate to Aria's Academy training in optimization patterns?",
						'Why is understanding both phases of event flow crucial for complex applications?',
						'What performance benefits come from applying Academy techniques to event handling?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 18 (Afternoon)",
						content:
							"Event propagation is fascinating when viewed through Academy optimization training! Conductor Eventus taught me how event delegation reduces handler overhead using the efficiency patterns I learned - instead of n handlers for n elements, use one intelligent handler optimized with useCallback. The capture/bubble phases are like the data flow patterns I learned in Props & Data Flow, but bidirectional. Binary calculated how Academy patterns apply to event optimization. I'm starting to see how one optimized handler could manage an entire keyboard of notes. Eventus mentioned something about async event patterns next...",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
