import { useState, useCallback, memo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const { optimizationLevel, applyOptimization, memoizedComponents } =
		useOutletContext();

	const [clickCounts, setClickCounts] = useState({});
	const [selectedItems, setSelectedItems] = useState(new Set());
	const [lagMonsterDefeated, setLagMonsterDefeated] = useState(false);

	// Without useCallback - creates new function every render
	const handleClickBad = (id) => {
		setClickCounts((prev) => ({
			...prev,
			[id]: (prev[id] || 0) + 1,
		}));
	};

	// With useCallback - stable function reference
	const handleClickGood = useCallback((id) => {
		setClickCounts((prev) => ({
			...prev,
			[id]: (prev[id] || 0) + 1,
		}));
	}, []);

	// Toggle selection with useCallback
	const toggleSelection = useCallback((id) => {
		setSelectedItems((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	}, []);

	// Memoized child component
	const SanctumCrystal = memo(({ id, name, onClick, isSelected }) => {
		console.log(`Rendering crystal: ${name}`);

		return (
			<div
				className={`crystal ${isSelected ? 'active' : ''}`}
				onClick={() => onClick(id)}
				style={{ cursor: 'pointer', margin: '10px' }}>
				<div>{name}</div>
				<div style={{ fontSize: '0.8em' }}>
					Clicks: {clickCounts[id] || 0}
				</div>
			</div>
		);
	});

	const crystals = [
		{ id: 1, name: 'Memory Crystal' },
		{ id: 2, name: 'Speed Crystal' },
		{ id: 3, name: 'Power Crystal' },
	];

	const defeatLagMonster = () => {
		if (optimizationLevel >= 2) {
			setLagMonsterDefeated(true);
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title="The Sanctum's Secret Techniques"
				bridge='"You&apos;ve mastered component and computation memoization," Master Velocity said, leading Aria to the inner sanctum&apos;s final chamber. "But there&apos;s one more crucial technique that completes the Trinity of Optimization - useCallback, the stabilizer of function references."'
			/>

			<StorySection
				paragraphs={[
					<>
						"You've mastered component and computation memoization,"
						Master Velocity said, leading Aria to the inner sanctum.
						"But there's one more crucial technique:{' '}
						<strong>useCallback</strong>."
					</>,
					<>
						He pointed to a wall of interconnected crystals. "Watch
						what happens when I touch one." As he touched a crystal,
						all the others flickered and re-rendered. "Without
						stable function references, every parent update cascades
						to all children."
					</>,
					<>
						<strong>Aria</strong> understood immediately. "Even if
						we memoize child components, passing new function
						instances as props defeats the optimization!"
					</>,
					<>
						"Exactly!" Master Velocity beamed. "useCallback ensures
						function stability across renders. Combined with
						React.memo and useMemo, it forms the{' '}
						<strong>Trinity of Optimization</strong>."
					</>,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Final Optimization
				</h3>
				<InstructionBox character='Master Velocity gestures to the interconnected crystals.'>
					Click the crystals and watch the console. Apply useCallback
					to see how stable function references prevent unnecessary
					re-renders!
				</InstructionBox>

				<div className='optimization-showcase'>
					<div className='optimization-badges'>
						<div
							className={`opt-badge ${
								memoizedComponents.includes('useCallback')
									? 'earned'
									: ''
							}`}>
							{memoizedComponents.includes('useCallback') ? (
								'✅ useCallback Applied'
							) : (
								<button
									onClick={() =>
										applyOptimization('useCallback')
									}>
									Apply useCallback
								</button>
							)}
						</div>
					</div>

					<div
						className='performance-crystals'
						style={{ justifyContent: 'center', marginTop: '20px' }}>
						{crystals.map((crystal) => (
							<SanctumCrystal
								key={crystal.id}
								id={crystal.id}
								name={crystal.name}
								onClick={
									memoizedComponents.includes('useCallback')
										? handleClickGood
										: handleClickBad
								}
								isSelected={selectedItems.has(crystal.id)}
							/>
						))}
					</div>

					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<p style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
							{memoizedComponents.includes('useCallback')
								? '🟢 Crystals only re-render when clicked!'
								: '🔴 All crystals re-render on any click!'}
						</p>
					</div>

					{optimizationLevel >= 2 && !lagMonsterDefeated && (
						<div style={{ textAlign: 'center', marginTop: '30px' }}>
							<button
								className='preview-button'
								onClick={defeatLagMonster}>
								Challenge the Lag Monster!
							</button>
						</div>
					)}

					{lagMonsterDefeated && (
						<div className='lag-monster-container'>
							<div className='lag-monster defeated'>👾</div>
							<h3 style={{ color: '#27ae60' }}>Victory!</h3>
							<p>
								The Lag Monster has been defeated by the Trinity
								of Optimization!
							</p>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title='Ancient Scroll of useCallback'
				discoveredBy='The Final Secret of the Sanctum'
				code={`// useCallback - Memoize function references
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // ❌ Without useCallback - new function every render
  const handleClickBad = () => {
    console.log('Clicked!');
  };
  
  // ✅ With useCallback - stable reference
  const handleClickGood = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty deps = never changes
  
  // Function that depends on state
  const handleSubmit = useCallback(() => {
    submitData(text);
  }, [text]); // Recreated only when text changes
  
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* MemoizedChild won't re-render with handleClickGood */}
      <MemoizedChild onClick={handleClickGood} />
    </>
  );
}

// The complete optimization pattern
const OptimizedList = memo(({ items, onItemClick }) => {
  // Memoize expensive filtering
  const filteredItems = useMemo(() => 
    items.filter(item => item.active),
    [items]
  );
  
  // Stable click handler
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return filteredItems.map(item => (
    <Item key={item.id} {...item} onClick={handleClick} />
  ));
});`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: "Master Velocity's Wisdom:",
					content:
						'The Trinity of Optimization - React.memo, useMemo, and useCallback - work in harmony to defeat performance problems. But remember: premature optimization is the root of all evil. Always profile first, identify real bottlenecks, then apply these techniques strategically. The goal is not to optimize everything, but to optimize what matters.',
				}}
				reflectionQuestions={[
					'Aria has learned all three optimization techniques and defeated the Lag Monster. But Master Velocity\'s final wisdom rings true: "The greatest optimization is often better architecture."',
					'In your applications, how might you restructure components to avoid performance problems in the first place? When is optimization necessary, and when is it better to rethink your approach?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 25 (Evening)",
					content:
						"The Trinity of Optimization is complete! Master Velocity taught me useCallback - the stabilizer of function references. Without it, even memoized child components re-render because they receive new function instances as props each time the parent renders. Together, React.memo (component memoization), useMemo (computation memoization), and useCallback (function memoization) defeated the Lag Monster! But Master Velocity's final wisdom resonates: 'Premature optimization is the root of all evil.' Profile first, identify real bottlenecks, then apply strategically. Tomorrow I travel to the Memory Monastery to learn about memory leaks!",
				}}
				lessonEnding={[
					"With the Lag Monster defeated, the React Kingdom's performance was restored. Aria had mastered the optimization arts, but her journey was far from over. The Memory Monastery awaited, where even deeper performance secrets lay hidden...",
				]}
			/>
		</div>
	);
};

export default ChapterThree;
