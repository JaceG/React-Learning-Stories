import { useState, useEffect } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const [effectCount, setEffectCount] = useState(0);
	const [effectDependency, setEffectDependency] = useState(false);

	const toggleDependency = () => {
		setEffectDependency((prev) => !prev);
	};

	useEffect(() => {
		setEffectCount((prev) => prev + 1);
	}, [effectDependency]);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title="The Consequence Hook"
				bridge="Master Hooke led Aria deeper into the forge, where the air shimmered with uncontained magical energy. Here, apprentices worked on hooks that could reach beyond the component boundaries, affecting the world outside."
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Now for something more advanced," Master Hooke announced, 
					approaching a workstation surrounded by glowing runes. "The 
					<strong>useEffect</strong> hook - perhaps the most powerful 
					and dangerous tool we craft here."
				</p>

				<p className='story-paragraph'>
					Binary's lights flickered nervously. "Dangerous? But Aria just 
					started learning!"
				</p>

				<p className='story-paragraph'>
					"Not dangerous if used wisely," Hooke reassured them. "useEffect 
					is the hook of <strong>consequences</strong>. It lets components 
					reach out and affect the world beyond their boundaries - fetching 
					data, subscribing to services, or synchronizing with external systems."
				</p>

				<div className='spell-illustration'>
					<div className='spell-circle'>
						<div className='spell-core'>
							<div
								className='dependency-orb'
								onClick={toggleDependency}>
								{effectDependency ? 'Active' : 'Inactive'}
							</div>
						</div>
						<div
							className='spell-aura'
							style={{ opacity: effectCount * 0.2 }}>
							<div className='effect-count'>
								Effects: {effectCount}
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Watch this demonstration," Master Hooke said, activating the runes. 
					"Every time the dependency changes, the effect fires. The key is 
					the dependency array - it controls when your effects activate."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Effect Forge
				</h3>
				<InstructionBox character="Master Hooke gestures to the glowing orb.">
					"Click the dependency orb to change its state. Notice how the 
					effect counter increases each time the dependency changes. This 
					is useEffect responding to state changes!"
				</InstructionBox>

				<div className='effect-controls'>
					<div className='effect-info'>
						<div className='info-box'>
							<h4>Effect Triggered</h4>
							<div className='count-display'>
								{effectCount} times
							</div>
						</div>
						<div className='info-box'>
							<h4>Dependency State</h4>
							<div className='dependency-display'>
								{effectDependency ? 'True' : 'False'}
							</div>
						</div>
					</div>

					<button className='spell-button' onClick={toggleDependency}>
						Toggle Dependency
					</button>
				</div>

				<CodeExample
					title="useEffect Implementation"
					discoveredBy="Hook Forge Archives"
					code={`// How useEffect responds to changes
function EffectForge() {
  // State that will trigger effects
  const [isActive, setIsActive] = useState(${effectDependency});
  const [effectCount, setEffectCount] = useState(${effectCount});
  
  // Effect runs after render when dependencies change
  useEffect(() => {
    // The "effect" - code that runs after render
    console.log("Effect forge activated!");
    setEffectCount(prevCount => prevCount + 1);
    
    // Cleanup function (optional) - runs before next effect
    return () => {
      console.log("Cleaning up previous effect");
    };
  }, [isActive]); // Dependency array - controls when effect runs
  
  return (
    <button onClick={() => setIsActive(!isActive)}>
      {isActive ? "Deactivate" : "Activate"} Forge
    </button>
  );
}`}
				/>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"The dependency array is crucial," Master Hooke emphasized, pointing 
					to the code. "An empty array means the effect runs once after mount. 
					No array means it runs after every render. And specific dependencies 
					mean it runs when those values change."
				</p>
			</div>

			<div className='effect-cautions'>
				<h3>Master Hooke's Safety Guidelines:</h3>
				<ul>
					<li>
						<strong>Complete Dependencies:</strong> Always include all 
						variables from component scope that are used inside the effect. 
						The linter will help catch missing ones.
					</li>
					<li>
						<strong>Avoid Infinite Loops:</strong> Never update state 
						unconditionally inside an effect that depends on that state.
					</li>
					<li>
						<strong>Cleanup is Crucial:</strong> Return a cleanup function 
						to cancel subscriptions, clear timers, or undo any setup.
					</li>
					<li>
						<strong>Separate Concerns:</strong> Use multiple useEffect hooks 
						for unrelated logic rather than combining everything.
					</li>
				</ul>
			</div>

			<CodeExample
				title="Common useEffect Patterns"
				discoveredBy="Forge Best Practices"
				code={`// Run once on mount
useEffect(() => {
  console.log("Component mounted!");
  return () => console.log("Component unmounting!");
}, []); // Empty dependency array

// Run when specific values change
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Timer fired!");
  }, 1000);
  
  return () => clearTimeout(timer); // Cleanup
}, [someValue]); // Runs when someValue changes

// Data fetching pattern
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  }
  
  fetchData();
}, []); // Fetch once on mount`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: "Master Hooke's Wisdom:",
					content: "useEffect is the bridge between your component's inner world and the vast ecosystem beyond. It handles \"side effects\" - operations that affect things outside the component. The effect runs after the render is committed to the screen, ensuring the DOM is ready. Master this hook, and you can synchronize your components with any external system, from APIs to browser APIs to third-party libraries."
				}}
				reflectionQuestions={[
					'How does thinking of useEffect as the "hook of consequences" help you understand when to use it?',
					'Why is the cleanup function important for preventing memory leaks and unexpected behavior?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 9 (Midday)",
					content: "useEffect is fascinating but tricky! It's like casting a spell that echoes into the future. The dependency array is the key - it's like telling the spell exactly when to activate. Master Hooke warned about infinite loops if you're not careful with dependencies. I need to practice this more!"
				}}
			/>
		</div>
	);
};

export default ChapterTwo;