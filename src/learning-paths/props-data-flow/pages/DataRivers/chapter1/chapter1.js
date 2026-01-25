import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	const [riverFlowing, setRiverFlowing] = useState(false);
	const [dataDrops, setDataDrops] = useState([]);

	const startRiverFlow = () => {
		setRiverFlowing(true);
		const drops = [
			'name: "River"',
			'depth: 10',
			'speed: "fast"',
			'clear: true',
		];
		setDataDrops(drops);
	};

	const resetRiverFlow = () => {
		setRiverFlowing(false);
		setDataDrops([]);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title="The River's Law"
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						The Cascade District was breathtaking. Data rivers
						cascaded down terraced waterfalls, each stream glowing
						with the soft blue light of information flowing from
						higher to lower components.
					</p>
					<p className='story-paragraph'>
						"Magnificent, isn't it?" A voice called from the
						observation platform. Aria turned to see a figure in
						flowing blue robes, patterns shifting like water across
						the fabric. "I am
						<strong>River Master Flux</strong>, keeper of the data
						streams."
					</p>
					<p className='story-paragraph'>
						"It's beautiful!" Aria breathed. "But these aren't
						normal rivers, are they?"
					</p>
					<p className='story-paragraph'>
						Flux smiled knowingly. "Indeed not. These rivers carry
						data, not water. And they obey an ancient law - they
						flow in one direction only, from the mountain peaks of
						parent components down to the valleys of their
						children."
					</p>
					<p className='story-paragraph'>
						Binary projected a small waterfall hologram.
						"Unidirectional flow! That's why props are read-only!"
					</p>
					<p className='story-paragraph'>
						"Precisely, little one," Flux nodded. "Just as water
						cannot flow uphill without magical pumps, data cannot
						flow upstream through props. This law keeps our
						kingdom's data flow predictable and pure. Come, let me
						show you the source."
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>The River's Source</h3>
					<p>Click to release data from the mountain source:</p>

					<div
						style={{
							display: 'flex',
							gap: '10px',
							justifyContent: 'center',
							marginBottom: '20px',
						}}>
						<button
							className='action-button'
							onClick={startRiverFlow}>
							Open the Source
						</button>
						<button
							className='reset-button'
							onClick={resetRiverFlow}
							disabled={!riverFlowing}>
							Reset River
						</button>
					</div>

					<div className='river-visualization'>
						<div className='river-source'>
							Parent Component
							<div style={{ fontSize: '12px', marginTop: '5px' }}>
								(Mountain Source)
							</div>
						</div>

						{riverFlowing && (
							<>
								<div className='river-flow'></div>

								<div className='river-branch left level-1'>
									<h4>Child A</h4>
									{dataDrops.slice(0, 2).map((drop, idx) => (
										<div key={idx} className='water-drop'>
											{drop}
										</div>
									))}
								</div>

								<div className='river-branch right level-1'>
									<h4>Child B</h4>
									{dataDrops.slice(2, 4).map((drop, idx) => (
										<div key={idx} className='water-drop'>
											{drop}
										</div>
									))}
								</div>

								<div className='river-branch left level-2'>
									<h4>Grandchild A1</h4>
									{dataDrops.slice(0, 1).map((drop, idx) => (
										<div key={idx} className='water-drop'>
											{drop}
										</div>
									))}
								</div>

								<div className='river-branch right level-2'>
									<h4>Grandchild B1</h4>
									{dataDrops.slice(2, 3).map((drop, idx) => (
										<div key={idx} className='water-drop'>
											{drop}
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						As they walked along the crystalline riverbank, Flux
						explained the wisdom behind the law. "Imagine if water
						could flow in any direction - chaos! Rivers would
						collide, pools would overflow, and no one could predict
						where the water would go."
					</p>
					<p className='story-paragraph'>
						She touched a control crystal, and the data flow
						shifted. "Watch - when I change the source, every
						downstream component instantly receives the update.
						Perfect synchronization! This is why React applications
						are so reliable."
					</p>
					<p className='story-paragraph'>
						Aria observed the elegant cascade. "So parent components
						are like mountain springs, and their children are the
						streams below?"
					</p>
					<p className='story-paragraph'>
						"Exactly! And just as a stream cannot change its source,
						a child component cannot modify the props it receives.
						It can only use them, pass them further downstream, or
						trigger callbacks to request changes from above."
					</p>
				</div>

				<CodeExample
					title="Data Flows Downward Like a River"
					code={`// Data flows downward like a river
function MountainSource() {
  // The source of our data river
  const [waterLevel, setWaterLevel] = useState(100);
  const [temperature, setTemperature] = useState(15);
  
  return (
    <>
      <ValleyComponent 
        waterLevel={waterLevel}      // Flows down
        temperature={temperature}    // Flows down
      />
      <StreamComponent 
        waterLevel={waterLevel}      // Same data, different branch
      />
    </>
  );
}

function ValleyComponent({ waterLevel, temperature }) {
  // Receives data from upstream
  // Cannot send data back up through props!
  return (
    <div>
      <p>Water Level: {waterLevel}m</p>
      <p>Temperature: {temperature}°C</p>
      <PondComponent waterLevel={waterLevel} />
    </div>
  );
}

function PondComponent({ waterLevel }) {
  // Even further downstream
  return <p>Pond depth: {waterLevel / 10}m</p>;
}`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>Flow Direction Visualizer</h3>
					<div className='data-packet'>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}>
							<div style={{ textAlign: 'center' }}>
								<div
									className='flow-component parent'
									style={{
										position: 'static',
										marginBottom: '10px',
									}}>
									<strong>Parent</strong>
									<div style={{ fontSize: '12px' }}>
										Has State
									</div>
								</div>
							</div>

							<div className='flow-indicator'>↓</div>

							<div style={{ textAlign: 'center' }}>
								<div
									className='flow-component'
									style={{
										position: 'static',
										marginBottom: '10px',
									}}>
									<strong>Child</strong>
									<div style={{ fontSize: '12px' }}>
										Receives Props
									</div>
								</div>
							</div>

							<div className='flow-indicator'>↓</div>

							<div style={{ textAlign: 'center' }}>
								<div
									className='flow-component'
									style={{
										position: 'static',
										marginBottom: '10px',
									}}>
									<strong>Grandchild</strong>
									<div style={{ fontSize: '12px' }}>
										Inherits Props
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "River Master Flux's Wisdom:",
						content: "React enforces unidirectional data flow - data moves exclusively from parent to child through props, never the reverse. This one-way river ensures predictability, prevents circular dependencies, and makes debugging straightforward. When state changes at the source, all downstream components re-render with fresh data automatically. Props are read-only at each level, maintaining data integrity throughout the component tree. Remember: data flows down, events bubble up."
					}}
					reflectionQuestions={[
						"How does the river metaphor help you understand React's data flow principles?",
						"Why might two-way data binding (water flowing uphill) cause problems?",
						"What advantages does unidirectional flow provide when tracking down bugs?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 13 (Morning)",
						content: "The Data Rivers have revealed a fundamental truth about React! Data flows like water - always downward, never up. River Master Flux showed me how this unidirectional flow creates order and predictability. When a parent component (the source) changes, every child downstream automatically receives the update. No confusion, no conflicts, no circular dependencies. The elegance is in the simplicity - by restricting flow to one direction, React ensures our applications remain understandable and debuggable. Props truly are read-only for a reason!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterOne;
