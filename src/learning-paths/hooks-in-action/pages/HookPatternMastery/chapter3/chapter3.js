import React, { useState, useMemo, useCallback, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	// State for the interactive demo
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('name');
	const [showExpensive, setShowExpensive] = useState(false);
	const [selectedSpells, setSelectedSpells] = useState([]);
	const [renderCount, setRenderCount] = useState(0);
	const [memoizedRenderCount, setMemoizedRenderCount] = useState(0);

	// Track renders when state actually changes
	useEffect(() => {
		setRenderCount(count => count + 1);
	}, [searchTerm, sortBy, showExpensive, selectedSpells]);

	// Expensive computation simulation
	const calculateSpellPower = (spell, multiplier) => {
		// Simulate expensive calculation
		let result = 0;
		for (let i = 0; i < 1000000; i++) {
			result += Math.sqrt(spell.power * multiplier);
		}
		return Math.floor(result / 1000000);
	};

	// Mock data
	const allSpells = [
		{ id: 1, name: 'Fireball', power: 75, mana: 30, type: 'attack' },
		{ id: 2, name: 'Healing Light', power: 50, mana: 20, type: 'heal' },
		{ id: 3, name: 'Lightning Bolt', power: 85, mana: 40, type: 'attack' },
		{ id: 4, name: 'Shield', power: 60, mana: 25, type: 'defense' },
		{ id: 5, name: 'Teleport', power: 40, mana: 50, type: 'utility' },
		{ id: 6, name: 'Ice Storm', power: 80, mana: 35, type: 'attack' },
		{ id: 7, name: 'Invisibility', power: 30, mana: 45, type: 'utility' },
		{ id: 8, name: 'Earth Quake', power: 90, mana: 60, type: 'attack' }
	];

	// Without optimization - recalculates on every render
	const unoptimizedSpells = allSpells
		.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (sortBy === 'name') return a.name.localeCompare(b.name);
			if (sortBy === 'power') return b.power - a.power;
			return a.mana - b.mana;
		})
		.map(spell => ({
			...spell,
			calculatedPower: showExpensive ? calculateSpellPower(spell, 1.5) : spell.power
		}));

	// With useMemo - only recalculates when dependencies change
	const optimizedSpells = useMemo(() => {
		setMemoizedRenderCount(count => count + 1);
		
		return allSpells
			.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => {
				if (sortBy === 'name') return a.name.localeCompare(b.name);
				if (sortBy === 'power') return b.power - a.power;
				return a.mana - b.mana;
			})
			.map(spell => ({
				...spell,
				calculatedPower: showExpensive ? calculateSpellPower(spell, 1.5) : spell.power
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, sortBy, showExpensive]);

	// Without useCallback - creates new function on every render
	const unoptimizedToggleSpell = (spellId) => {
		setSelectedSpells(prev => 
			prev.includes(spellId)
				? prev.filter(id => id !== spellId)
				: [...prev, spellId]
		);
	};

	// With useCallback - reuses the same function reference
	const optimizedToggleSpell = useCallback((spellId) => {
		setSelectedSpells(prev => 
			prev.includes(spellId)
				? prev.filter(id => id !== spellId)
				: [...prev, spellId]
		);
	}, []);

	// Complex calculation with useMemo
	const spellStatistics = useMemo(() => {
		const stats = {
			totalPower: 0,
			averageMana: 0,
			typeDistribution: {}
		};

		optimizedSpells.forEach(spell => {
			stats.totalPower += spell.calculatedPower;
			stats.averageMana += spell.mana;
			
			if (!stats.typeDistribution[spell.type]) {
				stats.typeDistribution[spell.type] = 0;
			}
			stats.typeDistribution[spell.type]++;
		});

		stats.averageMana = Math.round(stats.averageMana / optimizedSpells.length) || 0;

		return stats;
	}, [optimizedSpells]);

	// Expensive component that benefits from React.memo
	const SpellCard = React.memo(({ spell, isSelected, onToggle }) => {
		const [animationCount, setAnimationCount] = useState(0);

		useEffect(() => {
			setAnimationCount(count => count + 1);
		}, [spell.id, spell.calculatedPower, isSelected]); // Only count when these change

		return (
			<div className={`spell-card ${isSelected ? 'selected' : ''}`}>
				<div className='spell-header'>
					<h5>{spell.name}</h5>
					<span className='render-badge'>Renders: {animationCount}</span>
				</div>
				<div className='spell-stats'>
					<span>Power: {spell.calculatedPower}</span>
					<span>Mana: {spell.mana}</span>
					<span>Type: {spell.type}</span>
				</div>
				<button onClick={() => onToggle(spell.id)} className='select-button'>
					{isSelected ? 'Deselect' : 'Select'}
				</button>
			</div>
		);
	}, (prevProps, nextProps) => {
		// Custom comparison function
		return prevProps.spell.id === nextProps.spell.id &&
			   prevProps.spell.calculatedPower === nextProps.spell.calculatedPower &&
			   prevProps.isSelected === nextProps.isSelected;
	});

	const content = (
		<>
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='The Performance Sanctuary - Mastering Optimization'
				bridge='The final chamber of the Integration Sanctum was different - calmer, more refined. Here, the energy streams moved with perfect efficiency, each one following optimal paths that wasted no motion, no power.'
			/>

			<StorySection
				paragraphs={[
					<>"Welcome to the Performance Sanctuary," Synthesis said, their voice taking on a more serious tone. "Here, we address the final challenge of hook mastery - <strong>optimization</strong>. All the patterns you've learned mean nothing if they consume too much power."</>,
					`Binary's efficiency processors lit up, immediately analyzing the streamlined energy flows. It projected calculations showing wasted cycles versus optimized patterns.`,
					`"In React, every render has a cost," Synthesis explained, gesturing to a visualization of component renders cascading like waterfalls. "Without proper optimization, even simple changes can trigger expensive recalculations throughout your entire application tree."`,
					`"So we need to be selective about what recalculates?" Aria asked, studying the patterns.`,
					<>"Exactly! Meet your optimization allies," Synthesis waved their hand, and three glowing symbols appeared: "<strong>useMemo</strong> preserves calculation results, <strong>useCallback</strong> preserves function references, and <strong>React.memo</strong> preserves entire components. Together, they form the Trinity of Performance!"</>
				]}
			/>

			<div className='optimization-visualization'>
				<div className='performance-trinity'>
					<div className='trinity-member'>
						<div className='member-icon'>🧠</div>
						<div className='member-name'>useMemo</div>
						<div className='member-role'>Calculation Memory</div>
					</div>
					<div className='trinity-member'>
						<div className='member-icon'>🔄</div>
						<div className='member-name'>useCallback</div>
						<div className='member-role'>Function Stability</div>
					</div>
					<div className='trinity-member'>
						<div className='member-icon'>⚡</div>
						<div className='member-name'>React.memo</div>
						<div className='member-role'>Component Shield</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Optimization Laboratory
				</h3>
				<InstructionBox character='Compare optimized and unoptimized performance in real-time!'>
					Watch how memoization prevents unnecessary recalculations and re-renders as you interact.
				</InstructionBox>

				<div className='performance-dashboard'>
					<div className='render-counters'>
						<div className='counter-card'>
							<h4>Component Renders</h4>
							<div className='counter-value'>{renderCount}</div>
						</div>
						<div className='counter-card'>
							<h4>Memoized Calculations</h4>
							<div className='counter-value'>{memoizedRenderCount}</div>
						</div>
						<div className='counter-card'>
							<h4>Performance Gain</h4>
							<div className='counter-value'>
								{renderCount > 0 ? Math.round((1 - memoizedRenderCount / renderCount) * 100) : 0}%
							</div>
						</div>
					</div>

					<div className='controls-section'>
						<div className='control-group'>
							<label>Search Spells:</label>
							<input
								type='text'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder='Search by name...'
								className='search-input'
							/>
						</div>
						
						<div className='control-group'>
							<label>Sort By:</label>
							<select 
								value={sortBy} 
								onChange={(e) => setSortBy(e.target.value)}
								className='sort-select'>
								<option value='name'>Name</option>
								<option value='power'>Power</option>
								<option value='mana'>Mana Cost</option>
							</select>
						</div>

						<div className='control-group'>
							<label className='checkbox-label'>
								<input
									type='checkbox'
									checked={showExpensive}
									onChange={(e) => setShowExpensive(e.target.checked)}
								/>
								Enable Expensive Calculations
								{showExpensive && <span className='warning'> ⚠️ Performance Impact!</span>}
							</label>
						</div>
					</div>

					<div className='spell-statistics'>
						<h4>Spell Statistics (Memoized)</h4>
						<div className='stats-grid'>
							<div className='stat'>
								<span>Total Power:</span>
								<strong>{spellStatistics.totalPower}</strong>
							</div>
							<div className='stat'>
								<span>Average Mana:</span>
								<strong>{spellStatistics.averageMana}</strong>
							</div>
							<div className='stat'>
								<span>Type Distribution:</span>
								<strong>{Object.entries(spellStatistics.typeDistribution)
									.map(([type, count]) => `${type}: ${count}`)
									.join(', ')}</strong>
							</div>
						</div>
					</div>

					<div className='spells-grid'>
						{optimizedSpells.map(spell => (
							<SpellCard
								key={spell.id}
								spell={spell}
								isSelected={selectedSpells.includes(spell.id)}
								onToggle={optimizedToggleSpell}
							/>
						))}
					</div>
				</div>

				<div className='code-visualization'>
					<h4>The Performance Trinity in Action</h4>
					<pre className='magical-code'>
						{`// useMemo - Memoize expensive calculations
const expensiveResult = useMemo(() => {
  // This only runs when dependencies change
  return performExpensiveCalculation(data);
}, [data]); // Dependencies array

// useCallback - Memoize function references
const handleClick = useCallback((id) => {
  // This function reference stays the same across renders
  // unless dependencies change
  setSelectedItems(prev => [...prev, id]);
}, []); // Empty deps = function never changes

// React.memo - Memoize entire components
const OptimizedComponent = React.memo(({ data, onAction }) => {
  return <div>{/* Component content */}</div>;
}, (prevProps, nextProps) => {
  // Optional: Custom comparison function
  // Return true if props are equal (skip re-render)
  return prevProps.data.id === nextProps.data.id;
});

// Combining optimizations for maximum performance
function PerformantList({ items }) {
  // Memoize filtered and sorted list
  const processedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => b.priority - a.priority);
  }, [items]);

  // Memoize event handler
  const handleItemClick = useCallback((itemId) => {
    console.log('Clicked:', itemId);
  }, []);

  return (
    <div>
      {processedItems.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='practical-application'>
				<h3>The Optimization Decision Tree:</h3>
				<div className='pattern-showcase'>
					<div className='pattern-example'>
						<h4>When to use useMemo</h4>
						<ul>
							<li>Expensive calculations (sorting, filtering large arrays)</li>
							<li>Creating new objects/arrays that cause child re-renders</li>
							<li>Complex data transformations</li>
							<li>Computed values used in multiple places</li>
						</ul>
						<pre className='mini-code'>
							{`const expensiveValue = useMemo(() => {
  return data.filter(item => item.active)
    .reduce((sum, item) => sum + item.value, 0);
}, [data]);`}
						</pre>
					</div>
					<div className='pattern-example'>
						<h4>When to use useCallback</h4>
						<ul>
							<li>Event handlers passed to memoized children</li>
							<li>Functions in useEffect dependencies</li>
							<li>Callbacks creating closures over state</li>
							<li>Functions passed to multiple children</li>
						</ul>
						<pre className='mini-code'>
							{`const handleUpdate = useCallback((id, value) => {
  setItems(prev => prev.map(item => 
    item.id === id ? {...item, value} : item
  ));
}, []); // Stable reference`}
						</pre>
					</div>
					<div className='pattern-example'>
						<h4>When to use React.memo</h4>
						<ul>
							<li>Pure components with expensive renders</li>
							<li>Components receiving same props frequently</li>
							<li>List items in large lists</li>
							<li>Components with complex UI calculations</li>
						</ul>
						<pre className='mini-code'>
							{`const ExpensiveChild = React.memo(
  ({ data, onUpdate }) => {
    // Complex rendering logic
    return <ComplexUI data={data} />;
  },
  (prev, next) => prev.data.id === next.data.id
);`}
						</pre>
					</div>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'Performance Pattern Mastery:',
					content: "Master the art of strategic optimization with the Performance Trinity. UseMemo caches expensive calculations, preventing redundant work when inputs haven't changed. UseCallback preserves function identity across renders, crucial for preventing child re-renders and maintaining referential equality. React.memo wraps components in a shallow prop comparison shield. Use these tools when you have measured performance issues, not preemptively. Common scenarios: large lists, expensive calculations, frequently re-rendering trees. Remember: premature optimization is the root of all evil - profile first with React DevTools!"
				}}
				reflectionQuestions={[
					'How does the Performance Trinity work together to create efficient applications?',
					'When have you encountered performance issues that these patterns could solve?',
					'Why is it important to measure before optimizing?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 19 (Evening)",
					content: "The Performance Sanctuary completed my hook pattern education! Synthesis revealed the Trinity of Performance: useMemo (preserves expensive calculations), useCallback (maintains stable function references), and React.memo (shields components from unnecessary re-renders). The key insight: optimization is about being strategic, not obsessive. I watched render counts drop dramatically when using these tools correctly. The spell example was perfect - without memoization, every keystroke recalculated everything! But with proper optimization, only what changed was recalculated. Remember: measure first, optimize second. Not every calculation needs memoization - sometimes the cure is worse than the disease!"
				}}
				chapterEnding={[
					'As the demonstration concluded, Synthesis led Aria and Binary to the center of the Integration Sanctum. All the patterns they\'d learned - orchestration, state management, and optimization - swirled around them in perfect harmony.',
					'"You\'ve completed your training," Synthesis announced proudly. "You now understand not just individual hooks, but how to weave them into powerful, efficient patterns. You are ready for any React challenge!"',
					'Aria looked at the swirling patterns with new understanding. "It\'s all connected - from basic hooks to complex systems, everything builds on everything else."',
					'Binary projected a beautiful visualization of all their learned patterns, from useState to performance optimization. Its display showed: "HOOK MASTERY: COMPLETE"',
					'"Your next destination awaits," Synthesis smiled, pointing toward a distant tower. "The Form Citadel, where you\'ll learn to capture and validate user input with the same mastery you\'ve shown here. May your hooks always be optimized!"'
				]}
			/>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterThree;