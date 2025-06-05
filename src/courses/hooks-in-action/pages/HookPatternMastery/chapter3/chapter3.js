import React, { useState, useMemo, useCallback, useEffect } from 'react';

const ChapterThree = () => {
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

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Performance Mastery - The Art of Optimization
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the ancient <strong>Library of Efficient Spells</strong>, the Grand 
					Wizard <strong>Optimus</strong> taught the most sacred art of all: 
					performance optimization. "Young mages," he said, his voice echoing through 
					the halls, "raw power means nothing without efficiency. Today, you will 
					learn the twin arts of <strong>useMemo</strong> and <strong>useCallback</strong> - 
					spells that prevent wasteful recalculations and preserve the essence of 
					your magic across renders."
				</p>

				<div className='optimization-visualization'>
					<div className='performance-meters'>
						<div className='meter unoptimized'>
							<div className='meter-label'>Without Optimization</div>
							<div className='meter-bar high-usage'></div>
							<span>High CPU Usage</span>
						</div>
						<div className='meter optimized'>
							<div className='meter-label'>With useMemo/useCallback</div>
							<div className='meter-bar low-usage'></div>
							<span>Low CPU Usage</span>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Watch closely," Optimus continued, waving his staff over a crystal orb. 
					"Without memoization, every small change forces all spells to recalculate 
					their power. But with these optimization enchantments, calculations happen 
					only when truly necessary, preserving your magical energy for what matters most!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Spell Optimization Chamber
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Compare optimized and unoptimized performance. Notice the render 
							counts and enable expensive calculations to see the difference!
						</strong>
					</p>
				</div>

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
					<h4>Optimization Patterns</h4>
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
				<h3>When to Use Each Optimization:</h3>
				<div className='optimization-guide'>
					<div className='guide-card'>
						<h4>useMemo</h4>
						<ul>
							<li>Expensive calculations</li>
							<li>Complex object transformations</li>
							<li>Filtering/sorting large lists</li>
							<li>Creating new objects/arrays that cause child re-renders</li>
						</ul>
					</div>
					<div className='guide-card'>
						<h4>useCallback</h4>
						<ul>
							<li>Event handlers passed to memoized children</li>
							<li>Functions used in useEffect dependencies</li>
							<li>Callbacks that create closures over state</li>
							<li>Functions passed to multiple children</li>
						</ul>
					</div>
					<div className='guide-card'>
						<h4>React.memo</h4>
						<ul>
							<li>Pure components with expensive renders</li>
							<li>Components that receive same props frequently</li>
							<li>List items in large lists</li>
							<li>Components with complex UI calculations</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Performance Lesson:</h3>
				<p>
					Performance optimization in React is about being strategic, not premature. 
					useMemo and useCallback are powerful tools that prevent unnecessary 
					recalculations and maintain referential equality. However, they come with 
					their own overhead, so use them when you have actual performance problems 
					or when preventing re-renders of expensive child components. Remember: 
					measure first, optimize second. The React DevTools Profiler is your best 
					friend for identifying performance bottlenecks.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the wizard's library metaphor help you understand the importance 
					of caching and memoization? Think about how preserving calculations is 
					like storing spell formulas for reuse.
				</p>
				<p>
					When have you encountered performance issues in React applications? 
					How might these optimization techniques have helped? Consider the 
					balance between code complexity and performance gains.
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;