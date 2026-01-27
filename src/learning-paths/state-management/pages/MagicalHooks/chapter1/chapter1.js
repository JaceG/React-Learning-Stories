import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const [currentState, setCurrentState] = useState(5);
	const [showAdvanced, setShowAdvanced] = useState(false);

	const handleStateChange = (newValue) => {
		setCurrentState(newValue);
	};

	return (
		<div className='chapter'>
		<ChapterIntro
			chapterNumber={1}
			title="The Hook Forge Masters"
		/>

		<StorySection
			paragraphs={[
				`The Hook Forge was unlike anything Aria had seen before. Glowing anvils rang with the sound of hooks being shaped, while crystalline tubes carried pure React energy to each workstation.`,
				<>"Welcome to the Hook Forge!" called out a sturdy figure in a leather apron, sparks flying from the hook she was crafting. "I'm <strong>Forge Master Hooke</strong>. Memnon sent word of your arrival."</>,
				`Binary chirped excitedly. "Master Hooke makes the most powerful hooks in all of React Kingdom! Each one grants unique abilities to functional components!"`,
				<>"You've already met my most popular creation," Hooke said with pride, holding up a gleaming hook. "The <strong>useState</strong> hook! But let me show you its full potential..."</>
			]}
		/>

		<div className='potion-illustration'>
					<div className='potion-bottle'>
						<div
							className='potion-liquid'
							style={{ height: `${currentState * 10}%` }}>
							<span className='potion-value'>{currentState}</span>
						</div>
						<div className='potion-label'>Hook Energy Level</div>
				</div>
			</div>

		<StorySection
			paragraphs={[
				`She led Aria to a workbench where a crystalline apparatus glowed softly. "useState can hold any type of value - numbers, strings, objects, arrays. Watch how it preserves the value between renders and triggers updates when changed!"`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Energy Calibrator
				</h3>
				<InstructionBox character="Master Hooke points to a glowing energy meter.">
					"Every hook needs the right amount of React energy to function. 
					Try calibrating this meter - notice how useState remembers the 
					value and triggers updates!"
				</InstructionBox>

				<div className='magic-controls'>
					<button
						className='magic-button decrease'
						onClick={() => handleStateChange(currentState - 1)}
						disabled={currentState <= 0}>
						Decrease Energy
					</button>
					<div className='current-state'>
						Current Energy:{' '}
						<span className='state-value'>{currentState}</span>
					</div>
					<button
						className='magic-button increase'
						onClick={() => handleStateChange(currentState + 1)}
						disabled={currentState >= 10}>
						Increase Energy
					</button>
				</div>

				<CodeExample
					title="Energy Calibrator Implementation"
					discoveredBy="Hook Forge Blueprint"
					code={`// This is how the energy calibrator works
function EnergyCalibrator() {
  // Declare state with initial energy level of ${currentState}
  const [energy, setEnergy] = useState(${currentState});

  // Functions to adjust energy
  const increaseEnergy = () => {
    setEnergy(energy + 1);  // Triggers re-render!
  };

  const decreaseEnergy = () => {
    setEnergy(energy - 1);  // Also triggers re-render!
  };

  // Component re-renders when energy changes
  return (
    <div>
      <h2>Energy Level: {energy}</h2>
      <button onClick={decreaseEnergy}>Decrease</button>
      <button onClick={increaseEnergy}>Increase</button>
    </div>
  );
}`}
				/>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"The beauty of useState," Master Hooke explained, "is its 
					simplicity. It gives functional components memory - something 
					only class components could do before hooks were invented!"
				</p>

				<button 
					className='toggle-code-button'
					onClick={() => setShowAdvanced(!showAdvanced)}>
					{showAdvanced ? 'Hide' : 'Show'} Advanced Patterns
				</button>

				{showAdvanced && (
					<CodeExample
						title="Advanced useState Patterns"
						discoveredBy="Master Hooke's Collection"
						code={`// Multiple state values
function ComponentForge() {
  const [temperature, setTemperature] = useState(0);
  const [metal, setMetal] = useState('iron');
  const [isForging, setIsForging] = useState(false);
  
  // State with object
  const [forgeStatus, setForgeStatus] = useState({
    itemsCreated: 0,
    currentProject: 'hook',
    efficiency: 100
  });
  
  // Functional updates for complex logic
  const increaseTemp = () => {
    setTemperature(prev => Math.min(prev + 10, 100));
  };
}`}
					/>
				)}

			</div>

			<div className='practical-application'>
				<h3>Common useState Applications in the Forge:</h3>
				<div className='usage-pattern'>
					<h4>1. Toggle Forge Furnace</h4>
					<pre className='example-code'>
						{`function ForgeFurnace() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      Furnace: {isOn ? "ACTIVE 🔥" : "IDLE"}
    </button>
  );
}`}
					</pre>
				</div>
				<div className='usage-pattern'>
					<h4>2. Track Crafter's Name</h4>
					<pre className='example-code'>
						{`function CrafterRegistry() {
  const [name, setName] = useState("");
  
  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)}
      placeholder="Enter crafter name" 
    />
  );
}`}
					</pre>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Master Hooke's Wisdom:",
					content: "The useState hook is the foundation of interactive components. It's simple yet powerful - give it an initial value, and it returns the current value and a setter function. Every time you call the setter, React knows to re-render with the new value. Remember: always use functional updates when the new state depends on the previous state! This ensures your updates work correctly even when multiple updates happen quickly."
				}}
				reflectionQuestions={[
					'How does the Hook Forge metaphor help you understand the purpose of React hooks?',
					'Why do you think functional updates (using the previous state) are important when multiple updates might happen quickly?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 9 (Morning)",
					content: "The Hook Forge is incredible! I'm starting to understand that hooks are like magical tools - each one designed for a specific purpose. useState isn't just for simple values; it can handle complex data structures too. Master Hooke showed me how to use functional updates when the new state depends on the previous state. So much more to learn!"
				}}
			/>
		</div>
	);
};

export default ChapterOne;