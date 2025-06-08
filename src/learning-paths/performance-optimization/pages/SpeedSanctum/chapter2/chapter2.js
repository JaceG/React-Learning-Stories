import { useState, useMemo, memo } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		optimizationLevel,
		applyOptimization,
		memoizedComponents,
		renderCount,
		incrementRender
	} = useOutletContext();

	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [showComparison, setShowComparison] = useState(false);

	// Sample data for demonstration
	const spells = [
		{ id: 1, name: 'Fireball', power: 85, mana: 30 },
		{ id: 2, name: 'Lightning Bolt', power: 90, mana: 35 },
		{ id: 3, name: 'Frost Nova', power: 70, mana: 25 },
		{ id: 4, name: 'Meteor Strike', power: 100, mana: 50 },
		{ id: 5, name: 'Ice Shard', power: 60, mana: 20 }
	];

	// Expensive computation WITHOUT useMemo (for comparison)
	const unoptimizedFilterAndSort = () => {
		console.log('🔴 Unoptimized: Computing filtered and sorted spells');
		incrementRender();
		
		return spells
			.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => {
				return sortOrder === 'asc' ? a.power - b.power : b.power - a.power;
			});
	};

	// Expensive computation WITH useMemo
	const optimizedFilterAndSort = useMemo(() => {
		console.log('🟢 Optimized: Computing filtered and sorted spells (memoized)');
		
		return spells
			.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => {
				return sortOrder === 'asc' ? a.power - b.power : b.power - a.power;
			});
	}, [searchTerm, sortOrder]);

	// Component without React.memo
	const SpellCard = ({ spell }) => {
		console.log(`Rendering SpellCard: ${spell.name}`);
		return (
			<div className='demo-component'>
				<h4>{spell.name}</h4>
				<p>Power: {spell.power}</p>
				<p>Mana: {spell.mana}</p>
			</div>
		);
	};

	// Component with React.memo
	const OptimizedSpellCard = memo(({ spell }) => {
		console.log(`Rendering OptimizedSpellCard: ${spell.name}`);
		return (
			<div className='demo-component optimized'>
				<h4>{spell.name}</h4>
				<p>Power: {spell.power}</p>
				<p>Mana: {spell.mana}</p>
				<span className='opt-badge earned'>Memoized</span>
			</div>
		);
	});

	const displayedSpells = memoizedComponents.includes('useMemo') 
		? optimizedFilterAndSort 
		: unoptimizedFilterAndSort();

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Art of Memoization
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Master Velocity led Aria deeper into the sanctum, where ancient optimization 
					crystals lined the walls. "Now that you can see the Lag Monster's attacks, 
					it's time to learn our first defense: <strong>Memoization</strong>."
				</p>

				<p className='story-paragraph'>
					He pulled out two glowing scrolls. "These are React's memoization spells - 
					<strong>React.memo</strong> for components and <strong>useMemo</strong> for 
					expensive calculations. They create a shield of memory around your work."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> studied the scrolls intently. "So instead of repeating 
					the same calculations or renders, we remember the results?"
				</p>

				<p className='story-paragraph'>
					"Precisely!" Master Velocity smiled. "But beware - memoization itself has a 
					cost. Use it wisely, only where the benefit outweighs the overhead."
				</p>

				<div className='memoization-diagram'>
					<h3>The Memoization Flow</h3>
					<div className='memo-flow'>
						<div className='flow-item'>Input</div>
						<div className='flow-arrow'>→</div>
						<div className='flow-item'>Check Cache</div>
						<div className='flow-arrow'>→</div>
						<div className='flow-item'>Return Cached or Compute</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Memoization Spellcasting
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Filter and sort the spell list. Watch the console to see how many times 
							calculations run with and without memoization!
						</strong>
					</p>
				</div>

				<div className='optimization-showcase'>
					<div style={{ marginBottom: '20px' }}>
						<input
							type='text'
							placeholder='Search spells...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{ marginRight: '10px', padding: '8px' }}
						/>
						<select 
							value={sortOrder} 
							onChange={(e) => setSortOrder(e.target.value)}
							style={{ padding: '8px' }}>
							<option value='asc'>Power: Low to High</option>
							<option value='desc'>Power: High to Low</option>
						</select>
					</div>

					<div className='optimization-badges'>
						<button 
							className={`opt-badge ${memoizedComponents.includes('useMemo') ? 'earned' : ''}`}
							onClick={() => applyOptimization('useMemo')}>
							Apply useMemo
						</button>
						<button 
							className={`opt-badge ${memoizedComponents.includes('React.memo') ? 'earned' : ''}`}
							onClick={() => applyOptimization('React.memo')}>
							Apply React.memo
						</button>
					</div>

					<div className='optimization-demo'>
						{displayedSpells.map(spell => 
							memoizedComponents.includes('React.memo') ? (
								<OptimizedSpellCard key={spell.id} spell={spell} />
							) : (
								<SpellCard key={spell.id} spell={spell} />
							)
						)}
					</div>

					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<p>Render Count: <span className='metric-value'>{renderCount}</span></p>
						<p style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
							Open your browser console to see the rendering logs!
						</p>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='code-scroll'>
					<div className='scroll-header'>
						<span>Ancient Scroll of Memoization</span>
						<span className='discovered-by'>Master Velocity's Personal Collection</span>
					</div>
					<pre>{`// React.memo - Prevent unnecessary component re-renders
const ExpensiveComponent = memo(({ data, title }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      <h3>{title}</h3>
      {/* Complex rendering logic */}
    </div>
  );
});

// Custom comparison function for complex props
const OptimizedComponent = memo(
  ({ user, settings }) => {
    return <UserProfile user={user} settings={settings} />;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id &&
           prevProps.settings.theme === nextProps.settings.theme;
  }
);

// useMemo - Cache expensive computations
function DataProcessor({ items, filter }) {
  // Only recalculate when items or filter change
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item => item.category === filter)
      .map(item => expensiveTransform(item))
      .sort((a, b) => b.value - a.value);
  }, [items, filter]);
  
  return <DataList data={processedData} />;
}`}</pre>
				</div>
			</div>

			<div className='character-intro-card'>
				<h4>Aria's Memoization Insight</h4>
				<p>"I see now! It's like keeping a journal of calculations. If someone asks the same 
				question, I don't need to figure it out again - I just check my notes! But keeping 
				too many notes could slow me down too..."</p>
			</div>

			<div className='lesson-insight'>
				<h3>The Memoization Lesson:</h3>
				<p>
					Memoization is selective memory. React.memo prevents component re-renders when props 
					haven't changed, while useMemo caches the results of expensive calculations. But 
					remember: memoization has its own cost. Profile first, then memoize only the 
					components and calculations that truly benefit from it.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Master Velocity has shown Aria the power of memoization. In your own applications, 
					where might you have components that re-render unnecessarily? What expensive 
					calculations run on every render that could be memoized?
				</p>
				<p>
					Consider the trade-off: Is the cost of checking the memoization cache worth 
					avoiding the re-render or recalculation? How would you decide?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;