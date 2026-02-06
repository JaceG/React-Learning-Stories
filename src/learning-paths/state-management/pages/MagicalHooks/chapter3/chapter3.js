import { useState, useMemo } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [renderCount, setRenderCount] = useState(0);
	const [baseNumber, setBaseNumber] = useState(42);

	const memoizedValue = useMemo(() => {
		return `Computed: ${baseNumber * 2}`;
	}, [baseNumber]);

	const toggleRender = () => {
		setRenderCount((prev) => prev + 1);
	};

	return (
		<div className='chapter'>
		<ChapterIntro
			chapterNumber={3}
			title="The Specialized Tools"
			bridge="As the afternoon sun filtered through the forge's crystalline windows, Master Hooke led Aria to a special vault containing the most specialized hooks - tools designed for specific challenges that React developers face."
		/>

		<StorySection
			paragraphs={[
				<>"These are our precision instruments," Master Hooke said, opening an ornate chest. "Not every component needs them, but when you do, they're invaluable. Meet <strong>useRef</strong>, the memory crystal; <strong>useMemo</strong>, the calculation cache; and <strong>useCallback</strong>, the function preserver."</>,
				`Aria examined each tool carefully. "They look powerful, but when would I need them instead of useState or useEffect?"`
			]}
		/>

		<div className='artifacts-illustration'>
					<div className='artifact-container'>
						<div className='artifact ref-crystal'>
							<div className='artifact-label'>useRef</div>
							<div className='artifact-text'>
								Persists Without Re-renders
							</div>
						</div>
						<div className='artifact memo-potion'>
							<div className='artifact-label'>useMemo</div>
							<div className='memo-value'>{memoizedValue}</div>
						</div>
						<div className='artifact callback-scroll'>
							<div className='artifact-label'>useCallback</div>
							<div className='artifact-text'>
								Stable Function Identity
							</div>
						</div>
					</div>
					<div className='render-counter'>
						Component Renders:{' '}
						<span className='render-count'>{renderCount}</span>
				</div>
			</div>

		<StorySection
			paragraphs={[
				<>"Excellent question!" Master Hooke beamed. "useRef is like a secret pocket - it holds values that persist between renders but <em>don't</em> trigger re-renders when changed. Perfect for DOM references or storing previous values."</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Performance Workshop
				</h3>
				<InstructionBox character="Master Hooke activates a demonstration.">
					"Click the button to force a re-render. Notice how the memoized 
					value doesn't recalculate unless its dependency (baseNumber) changes. 
					This saves computation time!"
				</InstructionBox>

				<div className='optimization-controls'>
					<button className='render-button' onClick={toggleRender}>
						Force Re-render (No Recalculation)
					</button>
					<button 
						className='render-button' 
						onClick={() => setBaseNumber(prev => prev + 1)}>
						Change Base Number (Triggers Recalculation)
					</button>
				</div>

				<CodeExample
					title="The Three Specialized Hooks"
					discoveredBy="Master Hooke's Vault"
					code={`// useRef - The Memory Crystal
function TimerComponent() {
  const intervalRef = useRef(null);  // Persists without re-renders
  const [seconds, setSeconds] = useState(0);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);  // Access stored value
  };
  
  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// useMemo - The Calculation Cache
function DataProcessor({ data, filter }) {
  // Only recalculates when data or filter changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return data.filter(item => item.includes(filter))
                .map(item => item.toUpperCase());
  }, [data, filter]);
  
  return <div>{processedData.join(', ')}</div>;
}

// useCallback - The Function Preserver
function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // Preserves function identity unless query changes
  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <OptimizedButton onClick={handleSearch} />
    </div>
  );
}`}
				/>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					Binary projected a holographic comparison chart. "Look, Aria! Each 
					hook solves a specific problem. useRef for mutable values that 
					shouldn't cause renders, useMemo for expensive calculations, and 
					useCallback for stable function references."
				</p>

				<p className='story-paragraph'>
					"But remember," Master Hooke cautioned, "these are optimization tools. 
					Don't use them everywhere - only when you've identified an actual 
					performance issue. Premature optimization can make your code harder 
					to understand without providing real benefits."
				</p>
			</div>

			<div className='comparison-section'>
				<h3>When to Use Each Specialized Hook:</h3>
				<div className='comparison-table'>
					<div className='comparison-row header'>
						<div className='comparison-cell'>Hook</div>
						<div className='comparison-cell'>Purpose</div>
						<div className='comparison-cell'>Use When</div>
						<div className='comparison-cell'>Hook Forge Example</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useRef</div>
						<div className='comparison-cell'>
							Store mutable values that persist without re-renders
						</div>
						<div className='comparison-cell'>
							Accessing DOM elements, storing timer IDs, keeping 
							previous values, or any mutable value that shouldn't 
							trigger updates
						</div>
						<div className='comparison-cell'>
							Storing forge temperature readings without re-rendering 
							the entire workshop display
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useMemo</div>
						<div className='comparison-cell'>
							Cache expensive computation results
						</div>
						<div className='comparison-cell'>
							Complex calculations, data transformations, or any 
							computation that's expensive and has clear dependencies
						</div>
						<div className='comparison-cell'>
							Calculating optimal forge temperatures based on metal 
							type and desired hook properties
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useCallback</div>
						<div className='comparison-cell'>
							Preserve function identity across renders
						</div>
						<div className='comparison-cell'>
							Passing callbacks to optimized child components or 
							including functions in dependency arrays
						</div>
						<div className='comparison-cell'>
							Hammer strike functions passed to apprentice components 
							that shouldn't re-render unnecessarily
						</div>
					</div>
				</div>
			</div>

			<div className='character-guidance'>
				<h3>Master Hooke's Best Practices:</h3>
				<ul>
					<li>
						<strong>Profile First:</strong> Use React DevTools to identify 
						real performance issues before reaching for these hooks.
					</li>
					<li>
						<strong>Dependencies Matter:</strong> Always include all dependencies 
						in useMemo and useCallback arrays to avoid stale closures.
					</li>
					<li>
						<strong>useRef is Versatile:</strong> It's not just for DOM refs - 
						use it for any value that needs to persist without causing renders.
					</li>
					<li>
						<strong>Avoid Overuse:</strong> These hooks add complexity. Use them 
						only when there's a measurable benefit.
					</li>
				</ul>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Master Hooke's Final Wisdom:",
					content: "These specialized hooks are like precision tools in a master craftsman's workshop. You won't need them for every project, but when you do, they're essential. useRef gives you a way to step outside React's render cycle, useMemo and useCallback help you optimize performance by preventing unnecessary work. Master these, and you'll have the complete toolkit for building efficient React applications. But remember - clarity and simplicity often trump premature optimization!"
				}}
				reflectionQuestions={[
					'How does thinking of useRef as a "secret pocket" help you understand when to use it instead of useState?',
					'Why is it important to measure performance before applying optimization hooks like useMemo and useCallback?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 9 (Afternoon)",
					content: "The specialized hooks are fascinating! useRef is like having a notebook that React doesn't watch - I can write in it without causing updates. useMemo and useCallback are about efficiency - they prevent unnecessary work by remembering results and function references. Master Hooke says they're powerful but warns against overusing them."
				}}
				lessonEnding={[
					"As the forge's closing bell rang, Master Hooke handed Aria a small leather pouch. \"These are hook samples for practice. Tomorrow, you'll meet the Context Keepers in the Grand Hall. They'll teach you how to share state across your entire component kingdom.\"",
					"Binary's lights danced with excitement. \"The Grand Context! That's where components can share memories without passing them hand-to-hand!\"",
					"Aria carefully tucked the pouch into her satchel, her mind buzzing with new knowledge. useState, useEffect, useRef, useMemo, useCallback - each hook a tool with its own purpose. She was beginning to see how they all fit together in the grand tapestry of React development."
				]}
			/>
		</div>
	);
};

export default ChapterThree;