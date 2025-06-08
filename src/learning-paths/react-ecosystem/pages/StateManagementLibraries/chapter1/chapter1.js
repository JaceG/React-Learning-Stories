import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		exploredKingdoms,
		exploreKingdom,
		currentKingdom,
		startComparison,
		diplomaticRelations,
		evolve
	} = useOutletContext();

	const [selectedKingdom, setSelectedKingdom] = useState(null);
	const [mapExpanded, setMapExpanded] = useState(false);

	// State management kingdoms
	const stateKingdoms = [
		{
			id: 'redux',
			name: 'Redux Empire',
			flag: '🏛️',
			philosophy: 'Predictable state container',
			ruler: 'Emperor Dispatcher',
			strengths: ['Time travel debugging', 'Predictability', 'Ecosystem'],
			population: 'Large'
		},
		{
			id: 'mobx',
			name: 'MobX Territory',
			flag: '🔮',
			philosophy: 'Simple, scalable state management',
			ruler: 'Chief Observer',
			strengths: ['Reactive programming', 'Less boilerplate', 'Automatic tracking'],
			population: 'Medium'
		},
		{
			id: 'zustand',
			name: 'Zustand Settlements',
			flag: '🐻',
			philosophy: 'Small, fast and scalable',
			ruler: 'Elder Simplicity',
			strengths: ['Minimal API', 'No providers', 'TypeScript ready'],
			population: 'Growing'
		},
		{
			id: 'recoil',
			name: 'Recoil Regions',
			flag: '⚛️',
			philosophy: 'Experimental state management',
			ruler: 'Atom Master',
			strengths: ['Atom-based', 'React Suspense', 'Graph structure'],
			population: 'Emerging'
		},
		{
			id: 'jotai',
			name: 'Jotai Archipelago',
			flag: '👻',
			philosophy: 'Primitive and flexible',
			ruler: 'Spirit Guide',
			strengths: ['Bottom-up approach', 'React Suspense', 'No providers'],
			population: 'Small'
		}
	];

	// Handle kingdom selection
	const selectKingdom = (kingdom) => {
		setSelectedKingdom(kingdom);
		exploreKingdom(kingdom.id);
		if (exploredKingdoms.length === 0) {
			evolve('explorer');
		}
	};

	// Philosophy principles
	const philosophyPrinciples = [
		{
			title: 'Single Source of Truth',
			description: 'All state lives in one predictable place',
			kingdoms: ['redux', 'zustand']
		},
		{
			title: 'Reactive Updates',
			description: 'Components automatically react to changes',
			kingdoms: ['mobx', 'recoil', 'jotai']
		},
		{
			title: 'Developer Experience',
			description: 'Simple APIs and good debugging tools',
			kingdoms: ['zustand', 'redux']
		},
		{
			title: 'Performance First',
			description: 'Minimal re-renders and optimized updates',
			kingdoms: ['jotai', 'recoil', 'mobx']
		}
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Ambassador's Mission
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Master Aurelius</strong> summoned Aria to the Great Council 
					Chamber. "Guide Aria, you've mastered React's internal arts. Now, we 
					need you as an ambassador to the Allied Kingdoms - each with their 
					own approach to state management."
				</p>

				<p className='story-paragraph'>
					A magical map unfurled, showing kingdoms beyond React's borders: The 
					Redux Empire, MobX Territory, Zustand Settlements, Recoil Regions, 
					and the Jotai Archipelago.
				</p>

				<p className='story-paragraph'>
					"Each kingdom has developed its own state management philosophy," 
					Aurelius explained. "As our ambassador, you'll learn their ways and 
					bring back wisdom to strengthen our own kingdom."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> upgraded his translation modules. "I'm ready 
					to interpret different state management dialects!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> spread her wings. "And I'll help you see 
					through the different patterns to their core principles."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>State Kingdom Explorer</h3>
				
				<div className='kingdom-map'>
					<h4 style={{ color: 'white', marginTop: 0 }}>The Allied Kingdoms Map</h4>
					
					<button
						onClick={() => setMapExpanded(!mapExpanded)}
						style={{
							position: 'absolute',
							top: '20px',
							right: '20px',
							background: 'white',
							color: '#5f27cd',
							border: 'none',
							padding: '10px 20px',
							borderRadius: '5px',
							cursor: 'pointer'
						}}>
						{mapExpanded ? 'Collapse Map' : 'Expand Map'} 🗺️
					</button>

					<div className='state-kingdoms'>
						{stateKingdoms.map(kingdom => (
							<div
								key={kingdom.id}
								className={`kingdom-card ${
									exploredKingdoms.includes(kingdom.id) ? 'explored' : ''
								} ${currentKingdom === kingdom.id ? 'current' : ''}`}
								onClick={() => selectKingdom(kingdom)}>
								<div className='kingdom-banner'>
									<span className='kingdom-flag'>{kingdom.flag}</span>
									<div>
										<div className='kingdom-name'>{kingdom.name}</div>
										<div className='kingdom-philosophy'>{kingdom.philosophy}</div>
									</div>
								</div>
								<div className='kingdom-stats'>
									<span>Ruler: {kingdom.ruler}</span>
									<span>Pop: {kingdom.population}</span>
								</div>
								{selectedKingdom?.id === kingdom.id && (
									<div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ecf0f1' }}>
										<strong>Strengths:</strong>
										<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
											{kingdom.strengths.map((strength, i) => (
												<li key={i} style={{ fontSize: '0.9em' }}>{strength}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}
					</div>

					{exploredKingdoms.length >= 2 && (
						<button
							onClick={startComparison}
							style={{
								display: 'block',
								margin: '20px auto',
								padding: '12px 24px',
								background: 'white',
								color: '#5f27cd',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer',
								fontWeight: 'bold'
							}}>
							Compare Kingdoms 🔍
						</button>
					)}
				</div>

				<div className='philosophy-cards'>
					<h4>Core State Management Philosophies</h4>
					{philosophyPrinciples.map((principle, index) => (
						<div key={index} className='philosophy-card'>
							<div className='philosophy-title'>{principle.title}</div>
							<div className='philosophy-description'>{principle.description}</div>
							<div style={{ marginTop: '10px', fontSize: '0.9em', color: '#7f8c8d' }}>
								Found in: {principle.kingdoms.map(k => 
									stateKingdoms.find(sk => sk.id === k)?.flag
								).join(' ')}
							</div>
						</div>
					))}
				</div>

				<div className='diplomatic-status'>
					<h4>Diplomatic Relations</h4>
					<div className='relations-grid'>
						{stateKingdoms.map(kingdom => (
							<div
								key={kingdom.id}
								className={`relation-badge ${
									diplomaticRelations[kingdom.id] || 'neutral'
								}`}>
								{kingdom.flag} {diplomaticRelations[kingdom.id] || 'Neutral'}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>State Management Overview</span>
				</div>
				<div className='code-example'>
					<pre>{`// State Management Libraries Overview

// 1. React's Built-in State Management
// Context API - Good for simple global state
const ThemeContext = React.createContext();
const AuthContext = React.createContext();

// useReducer - Good for complex local state
const [state, dispatch] = useReducer(reducer, initialState);

// When you need more...

// 2. Redux - The Predictable State Container
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Redux principles:
// - Single source of truth
// - State is read-only
// - Changes made with pure functions

const store = createStore(rootReducer);

// 3. MobX - Simple, Scalable State Management
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// MobX principles:
// - Anything that can be derived, should be
// - All derivations update automatically
// - Until needed, derivations are not computed

class TodoStore {
  todos = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addTodo(text) {
    this.todos.push({ text, done: false });
  }
}

// 4. Zustand - Bear Necessities
import { create } from 'zustand';

// Zustand principles:
// - Small bundle size
// - No providers needed
// - Simple API

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}));

// 5. Recoil - Experimental State Management
import { atom, selector, useRecoilState } from 'recoil';

// Recoil principles:
// - Atoms are units of state
// - Selectors derive state
// - Components subscribe to atoms

const todoListState = atom({
  key: 'todoListState',
  default: []
});

// 6. Jotai - Primitive and Flexible
import { atom, useAtom } from 'jotai';

// Jotai principles:
// - Bottom-up approach
// - No providers by default
// - React Suspense integration

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

// Choosing the Right Solution

// Use Context/useReducer when:
// - State is simple and localized
// - You don't need time-travel debugging
// - Performance is not critical

// Use Redux when:
// - Large team needs predictable patterns
// - Complex state logic
// - Need extensive debugging tools
// - Large ecosystem of middleware

// Use MobX when:
// - You prefer OOP style
// - Want minimal boilerplate
// - Like reactive programming

// Use Zustand when:
// - Want simplicity
// - Small to medium apps
// - Don't need complex patterns

// Use Recoil/Jotai when:
// - Need fine-grained reactivity
// - Working with React Suspense
// - Want experimental features

// Migration Strategies

// From Context to Redux:
// 1. Identify global state
// 2. Create Redux store
// 3. Replace Context Providers
// 4. Update components

// From Redux to Zustand:
// 1. Map reducers to store actions
// 2. Replace Provider with Zustand hook
// 3. Simplify component connections

// Performance Considerations

// Context: Re-renders all consumers
// Redux: Connect specific slices
// MobX: Automatic optimization
// Zustand: Selective subscriptions
// Recoil/Jotai: Atom-level updates`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Ambassador's Note:</strong> "Each kingdom offers unique advantages. 
					The key is not finding the 'best' solution, but the right solution for your 
					specific needs. Consider team size, application complexity, performance 
					requirements, and developer experience when choosing."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Ecosystem Lesson:</h3>
				<p>
					Every state management library solves the same core problems differently. 
					Master Aurelius teaches that understanding multiple approaches makes you 
					a better architect, even if you only use one.
				</p>
				<p>
					The React ecosystem thrives because of this diversity. Each solution 
					pushes others to improve, and developers benefit from having choices 
					that match their specific needs.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on State Philosophy</h3>
				<p>
					<strong>Why might different applications need different state management 
					solutions?</strong> Consider factors like team size, application complexity, 
					performance needs, and developer preferences.
				</p>
				<p>
					<strong>How does learning multiple approaches improve your architectural 
					decisions?</strong> Think about how understanding various patterns helps 
					you recognize the trade-offs in your chosen solution.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As the magical map glowed with the explored kingdoms, <strong>Master 
					Aurelius</strong> smiled. "You've taken your first steps as an ambassador, 
					Aria. Each kingdom you've touched represents a different philosophy."
				</p>
				<p>
					<strong>Binary</strong> processed the data. "So many approaches to the 
					same problem! How do we choose?"
				</p>
				<p>
					"That's what you'll discover in your diplomatic visits," Aurelius replied. 
					"Tomorrow, you'll visit the Redux Empire and learn their ways..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;