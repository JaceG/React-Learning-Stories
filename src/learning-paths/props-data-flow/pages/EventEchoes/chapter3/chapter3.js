import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	const [symphony, setSymphony] = useState([]);
	const [activeInstruments, setActiveInstruments] = useState(new Set());
	const [propagationPath, setPropagationPath] = useState([]);
	// Removed unused noteRefs

	const instruments = [
		{ id: 'drums', name: 'Drums', note: '🥁', sound: 'boom' },
		{ id: 'flute', name: 'Flute', note: '🎵', sound: 'tweet' },
		{ id: 'harp', name: 'Harp', note: '🎶', sound: 'pling' },
		{ id: 'bell', name: 'Bell', note: '🔔', sound: 'ding' },
	];

	const playInstrument = (instrument) => {
		// Add to symphony
		const newNote = {
			id: Date.now(),
			instrument: instrument.id,
			note: instrument.note,
			sound: instrument.sound,
			timestamp: new Date().toLocaleTimeString(),
		};
		setSymphony([...symphony, newNote]);

		// Animate instrument
		const newActive = new Set(activeInstruments);
		newActive.add(instrument.id);
		setActiveInstruments(newActive);

		setTimeout(() => {
			const updated = new Set(activeInstruments);
			updated.delete(instrument.id);
			setActiveInstruments(updated);
		}, 500);

		// Create floating note
		createFloatingNote(instrument.note);
	};

	const createFloatingNote = (note) => {
		const stage = document.querySelector('.symphony-stage');
		if (stage) {
			const noteEl = document.createElement('div');
			noteEl.className = 'note';
			noteEl.textContent = note;
			noteEl.style.left = `${Math.random() * 80 + 10}%`;
			noteEl.style.bottom = '20px';
			stage.appendChild(noteEl);
			setTimeout(() => noteEl.remove(), 2000);
		}
	};

	const demonstratePropagation = () => {
		const nodes = ['child', 'parent', 'grandparent'];
		setPropagationPath([]);

		nodes.forEach((node, index) => {
			setTimeout(() => {
				setPropagationPath((prev) => [...prev, node]);
			}, index * 500);
		});

		setTimeout(() => {
			setPropagationPath([]);
		}, 2000);
	};

	const resetSymphony = () => {
		setSymphony([]);
		setActiveInstruments(new Set());
		setPropagationPath([]);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title="Symphony of Events"
					bridge="At the heart of the Echo Caves lay the Grand Symphony Hall, a natural amphitheater where thousands of stalactites formed a stone organ. The acoustics were perfect - every sound resonated with crystalline clarity. Aria and Binary entered to find Callback standing at a conductor's podium."
				/>

			<StorySection
				paragraphs={[
					`"Welcome to your final lesson!" Callback announced, raising a baton that sparkled with captured echoes. "You've learned how individual components communicate, but real applications require orchestration!"`,
					`Binary's eyes widened as it scanned the cavern, detecting complex acoustic patterns bouncing between formations.`,
					`"In complex applications," Callback explained, "events don't just echo between parent and child. They create symphonies - coordinated patterns where multiple components work in harmony, all conducted by their shared parent."`,
					`She gestured to the stone formations. "Each stalactite is like a component. Alone, they make simple sounds. But when coordinated..." She tapped her baton, and the entire cavern rang with harmonious tones.`,
					`"The parent component becomes the conductor," Aria realized. "Receiving signals from multiple children and orchestrating their interactions!"`,
					`"Exactly! Watch as I demonstrate the Symphony Pattern - the ultimate expression of event coordination in React!"`
				]}
			/>

				<div className='interactive-section'>
					<h3>The Component Orchestra</h3>
					<p>Click instruments to add notes to the symphony:</p>

					<div className='symphony-stage'>
						<h4
							style={{
								color: 'white',
								textAlign: 'center',
								marginBottom: '20px',
							}}>
							Symphony Stage
						</h4>

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}>
							{instruments.map((instrument) => (
								<div
									key={instrument.id}
									className={`instrument ${
										activeInstruments.has(instrument.id)
											? 'playing'
											: ''
									}`}
									onClick={() => playInstrument(instrument)}>
									<div style={{ fontSize: '30px' }}>
										{instrument.note}
									</div>
									<div>{instrument.name}</div>
									<small>{instrument.sound}</small>
								</div>
							))}
						</div>

						{symphony.length > 0 && (
							<div
								style={{
									marginTop: '30px',
									padding: '20px',
									background: 'rgba(255,255,255,0.1)',
									borderRadius: '8px',
								}}>
								<h5
									style={{
										color: 'white',
										marginBottom: '10px',
									}}>
									Symphony Score:
								</h5>
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: '5px',
									}}>
									{symphony.slice(-20).map((note) => (
										<span
											key={note.id}
											className='sound-signal'
											style={{ background: '#a29bfe' }}>
											{note.note} {note.sound}
										</span>
									))}
								</div>
								<div
									style={{
										display: 'flex',
										gap: '10px',
										justifyContent: 'center',
										marginTop: '15px',
									}}>
									<button
										className='reset-button'
										onClick={resetSymphony}
										disabled={symphony.length === 0}>
										Reset Symphony
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

			<StorySection
				paragraphs={[
					`"Beautiful!" Aria exclaimed as the symphony grew. "Each component plays its part, but they're all synchronized through the parent!"`,
					`Callback nodded approvingly. "Now observe event propagation." She traced glowing paths in the air. "In the DOM, events bubble naturally upward. But in React, we control the flow explicitly through our callback chains."`,
					`Binary projected a visualization showing events flowing through component trees, each callback creating a deliberate path for information to travel.`,
					`"Sometimes," Callback continued, "a single action triggers cascading effects. A drum beat might cue the strings, which signal the brass. The parent conductor receives each event and orchestrates the response, maintaining perfect harmony."`,
					`"It's like a living system," Aria marveled. "Each part aware of its role, all coordinated through careful event management."`,
					`"You've grasped the essence!" Callback smiled. "But remember - as symphonies grow complex, so do the callback patterns. When coordination becomes overwhelming, consider advanced patterns like Context or state management libraries. They're like hiring assistant conductors for different sections of your orchestra."`
				]}
			/>

				<div className='interactive-section'>
					<h3>Propagation Visualizer</h3>
					<p>See how events propagate through component trees:</p>

					<div
						style={{
							display: 'flex',
							gap: '10px',
							justifyContent: 'center',
							marginBottom: '20px',
						}}>
						<button
							className='echo-button'
							onClick={demonstratePropagation}>
							Demonstrate Event Propagation
						</button>
						<button
							className='reset-button'
							onClick={() => setPropagationPath([])}
							disabled={propagationPath.length === 0}>
							Reset Propagation
						</button>
					</div>

					<div className='propagation-visualizer'>
						<div
							className={`propagation-node ${
								propagationPath.includes('child')
									? 'active'
									: ''
							}`}>
							<h5>Child</h5>
							<p>Initiates Event</p>
						</div>
						<div
							className={`propagation-node ${
								propagationPath.includes('parent')
									? 'active'
									: ''
							}`}>
							<h5>Parent</h5>
							<p>Processes Event</p>
						</div>
						<div
							className={`propagation-node ${
								propagationPath.includes('grandparent')
									? 'active'
									: ''
							}`}>
							<h5>Grandparent</h5>
							<p>Final Handler</p>
						</div>
					</div>
				</div>

				<CodeExample
					title="Complex Event Coordination - Symphony Pattern"
					code={`// Complex event coordination - Symphony pattern
function Orchestra() {
  const [performance, setPerformance] = useState({
    tempo: 120,
    volume: 50,
    playing: false,
    sections: {
      strings: { active: false, notes: [] },
      brass: { active: false, notes: [] },
      percussion: { active: false, notes: [] }
    }
  });
  
  // Conductor methods - coordinate all sections
  const startPerformance = () => {
    setPerformance(prev => ({ ...prev, playing: true }));
    // Notify all sections to prepare
  };
  
  const changeTempo = (newTempo) => {
    setPerformance(prev => ({ ...prev, tempo: newTempo }));
    // All sections adjust to new tempo
  };
  
  // Section callbacks - each section reports to conductor
  const handleSectionPlay = (section, note) => {
    setPerformance(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          active: true,
          notes: [...prev.sections[section].notes, note]
        }
      }
    }));
    
    // Coordinate with other sections
    if (section === 'percussion' && note === 'cymbal') {
      // Trigger brass section to play fanfare
      triggerBrassFantare();
    }
  };
  
  const handleSectionStop = (section) => {
    setPerformance(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: { ...prev.sections[section], active: false }
      }
    }));
  };
  
  return (
    <div>
      <ConductorControls 
        onStart={startPerformance}
        onTempoChange={changeTempo}
        tempo={performance.tempo}
      />
      
      <StringSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('strings', note)}
        onStop={() => handleSectionStop('strings')}
      />
      
      <BrassSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('brass', note)}
        onStop={() => handleSectionStop('brass')}
      />
      
      <PercussionSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('percussion', note)}
        onStop={() => handleSectionStop('percussion')}
      />
    </div>
  );
}

// Event delegation pattern
function ListWithDelegation({ items, onItemAction }) {
  // Single handler for all items
  const handleClick = (event) => {
    const itemId = event.target.dataset.itemId;
    const action = event.target.dataset.action;
    
    if (itemId && action) {
      onItemAction(itemId, action);
    }
  };
  
  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button data-item-id={item.id} data-action="edit">
            Edit
          </button>
          <button data-item-id={item.id} data-action="delete">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}`}
				/>

				<ChapterSummary
					lessonInsight={{
						title: "Symphony Master's Final Wisdom:",
						content: "Master event coordination by thinking of parent components as conductors orchestrating their children's interactions. The Symphony Pattern coordinates complex multi-component behaviors through centralized event handling. Use event delegation to reduce callback proliferation, handling multiple related actions through single handlers. As complexity grows, recognize when to introduce Context or state management - they're assistant conductors for your growing orchestra. Remember: harmony emerges from well-structured event flow."
					}}
					reflectionQuestions={[
						"How does the symphony metaphor illuminate complex event coordination?",
						"What signs indicate you need \"assistant conductors\" (Context/state management)?",
						"How do props (sheet music) and events (performed notes) create React's harmony?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 15 (Evening)",
						content: "The Symphony Hall revealed the ultimate event pattern! Parent components are conductors, orchestrating complex interactions between their children. Events from one child can trigger cascading updates across siblings, all coordinated through the parent's callbacks. The Symphony Pattern shows how individual components create harmony when properly conducted. Event delegation reduces callback proliferation by handling related events through single handlers. As complexity grows, patterns like Context become assistant conductors. The complete cycle is now clear: props flow down like sheet music, events echo up like performed notes, creating React's beautiful symphony!"
					}}
					chapterEnding={[
						"As the final echoes faded, Callback lowered her baton with a satisfied smile. \"You've completed your journey through Props and Data Flow, Aria. From caravans to rivers, from forges to echoes - you understand the complete cycle.\"",
						"Aria felt the weight of knowledge settling into place. \"Props descend like gifts from parents to children, while events ascend like messages back up. It's a continuous conversation!\"",
						"\"And you've mastered both directions,\" Callback said proudly. \"The Echo Caves have revealed their secrets to you.\"",
						"Binary displayed a holographic summary of their journey - props flowing down, events echoing up, creating endless cycles of communication.",
						"\"Where will your journey take you next?\" Callback asked.",
						"Aria consulted her map, eyes bright with anticipation. \"The Hooks Academy awaits. After mastering state and data flow, it's time to learn React's most powerful spells!\"",
						"\"Then may your callbacks always find their targets, and your events echo true!\" Callback called as they departed. The Echo Caves rang with a final, harmonious chord - a symphony of components bidding farewell to their newest master."
					]}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterThree;
