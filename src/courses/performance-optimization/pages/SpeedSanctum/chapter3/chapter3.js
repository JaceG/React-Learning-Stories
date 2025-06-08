import { useState, useCallback, memo } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>
				Chapter 3: The Sanctum's Secret Techniques
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"You've mastered component and computation memoization,"
					Master Velocity said, leading Aria to the inner sanctum.
					"But there's one more crucial technique:
					<strong>useCallback</strong>."
				</p>

				<p className='story-paragraph'>
					He pointed to a wall of interconnected crystals. "Watch what
					happens when I touch one." As he touched a crystal, all the
					others flickered and re-rendered. "Without stable function
					references, every parent update cascades to all children."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> understood immediately. "Even if we
					memoize child components, passing new function instances as
					props defeats the optimization!"
				</p>

				<p className='story-paragraph'>
					"Exactly!" Master Velocity beamed. "useCallback ensures
					function stability across renders. Combined with React.memo
					and useMemo, it forms the{' '}
					<strong>Trinity of Optimization</strong>."
				</p>

				<div className='character-intro-card'>
					<h4>The Trinity of Optimization</h4>
					<p>
						⚛️ <strong>React.memo</strong>: Guards components from
						unnecessary renders
						<br />
						🧮 <strong>useMemo</strong>: Caches expensive
						computations
						<br />
						📞 <strong>useCallback</strong>: Stabilizes function
						references
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Final Optimization
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Click the crystals and watch the console. Apply
							useCallback to see how stable function references
							prevent unnecessary re-renders!
						</strong>
					</p>
				</div>

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

			<div className='code-example'>
				<div className='code-scroll'>
					<div className='scroll-header'>
						<span>Ancient Scroll of useCallback</span>
						<span className='discovered-by'>
							The Final Secret of the Sanctum
						</span>
					</div>
					<pre>{`// useCallback - Memoize function references
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
});`}</pre>
				</div>
			</div>

			<div className='character-intro-card'>
				<h4>Aria's Mastery Moment</h4>
				<p>
					"I understand now! Performance optimization isn't about
					using these tools everywhere - it's about identifying
					bottlenecks with the Profiler, then applying the right
					optimization technique. The Trinity works together: memo
					prevents renders, useMemo caches calculations, and
					useCallback stabilizes functions."
				</p>
			</div>

			<div className='lesson-insight'>
				<h3>The Optimization Lesson:</h3>
				<p>
					The Trinity of Optimization - React.memo, useMemo, and
					useCallback - work in harmony to defeat performance
					problems. But remember: premature optimization is the root
					of all evil. Always profile first, identify real
					bottlenecks, then apply these techniques strategically. The
					goal is not to optimize everything, but to optimize what
					matters.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Aria has learned all three optimization techniques and
					defeated the Lag Monster. But Master Velocity's final wisdom
					rings true: "The greatest optimization is often better
					architecture."
				</p>
				<p>
					In your applications, how might you restructure components
					to avoid performance problems in the first place? When is
					optimization necessary, and when is it better to rethink
					your approach?
				</p>
			</div>

			{lagMonsterDefeated && (
				<div className='chapter-ending'>
					<h3>Chapter Complete!</h3>
					<p>
						With the Lag Monster defeated, the React Kingdom's
						performance was restored. Aria had mastered the
						optimization arts, but her journey was far from over.
						The Memory Monastery awaited, where even deeper
						performance secrets lay hidden...
					</p>
				</div>
			)}
		</div>
	);
};

export default ChapterThree;
