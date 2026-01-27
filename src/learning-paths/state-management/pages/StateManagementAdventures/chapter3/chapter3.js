import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [activeLibrary, setActiveLibrary] = useState('zustand');
	const [stateCount, setStateCount] = useState(5);

	const switchLibrary = (library) => setActiveLibrary(library);
	const updateState = (value) => setStateCount(value);

	return (
		<div className='chapter'>
		<ChapterIntro
			chapterNumber={3}
			title="The New State Management Frontiers"
			bridge="As the afternoon sun filtered through the Citadel's crystalline windows, Grand Reducer led Aria to a chamber filled with glowing portals. Each shimmered with different colors and patterns, pulsing with the energy of innovation."
		/>

		<StorySection
			paragraphs={[
				`"The Redux Archives taught you the classical approach," Grand Reducer said, his robes shifting to display constellations of data flow. "But React Kingdom evolves constantly. New pioneers have charted territories that solve state management differently."`,
				`Binary's circuits sparkled with curiosity. "Different from Redux? But that seemed so complete!"`,
				`"Redux is powerful," Aria reflected, "but it can be complex for smaller applications. What alternatives exist?"`,
				`Grand Reducer smiled. "Wise observation. Each portal before you leads to a different approach. Some prize simplicity, others performance. Let's explore these modern frontiers together."`
			]}
		/>

		<div className='frontier-illustration'>
					<div className='state-map'>
						<div className='map-regions'>
							<div
								className={`map-region ${
									activeLibrary === 'zustand' ? 'active' : ''
								}`}
								onClick={() => switchLibrary('zustand')}>
								<div className='region-name'>Zustand</div>
								<div className='region-motto'>
									Simple, unopinionated state-management
								</div>
							</div>
							<div
								className={`map-region ${
									activeLibrary === 'jotai' ? 'active' : ''
								}`}
								onClick={() => switchLibrary('jotai')}>
								<div className='region-name'>Jotai</div>
								<div className='region-motto'>
									Primitive and flexible state management
								</div>
							</div>
							<div
								className={`map-region ${
									activeLibrary === 'recoil' ? 'active' : ''
								}`}
								onClick={() => switchLibrary('recoil')}>
								<div className='region-name'>Recoil</div>
								<div className='region-motto'>
									Atomic state management
								</div>
							</div>
							<div
								className={`map-region ${
									activeLibrary === 'mobx' ? 'active' : ''
								}`}
								onClick={() => switchLibrary('mobx')}>
								<div className='region-name'>MobX</div>
								<div className='region-motto'>
									Simple, scalable state management
								</div>
							</div>
						</div>
						<div className='state-counter'>
							<div className='counter-value'>{stateCount}</div>
							<div className='counter-buttons'>
								<button
									onClick={() => updateState(stateCount - 1)}>
									-
								</button>
								<button
									onClick={() => updateState(stateCount + 1)}>
									+
								</button>
							</div>
						</div>
				</div>
			</div>

		<StorySection
			paragraphs={[
				`"Each portal represents a modern solution," Grand Reducer explained, gesturing to the shimmering gateways. "Touch them to witness their power. Remember, young apprentice - the best tool depends on your quest's needs, not on following trends."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Portal: The Modern State Libraries
				</h3>
				<InstructionBox character="Grand Reducer waves his hand, activating the portals.">
					"Step through each portal to experience how different libraries 
					handle the same state challenge. Notice their unique approaches!"
				</InstructionBox>

				{activeLibrary === 'zustand' && (
					<div className='library-example'>
						<h4>Zustand - Bear Necessities of State Management</h4>
						<pre className='library-code'>
							{`// Create a store
import create from 'zustand'

// Create a store with an initial state and actions
const useStore = create((set) => ({
  count: ${stateCount},
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))

// Use it in a component
function Counter() {
  // Subscribe to only what you need
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}`}
						</pre>
						<div className='library-benefits'>
							<strong>Benefits:</strong>
							<ul>
								<li>Tiny bundle size (less than 1KB)</li>
								<li>No boilerplate compared to Redux</li>
								<li>No providers needed</li>
								<li>Built-in selector optimization</li>
								<li>Compatible with React concurrent mode</li>
							</ul>
						</div>
					</div>
				)}

				{activeLibrary === 'jotai' && (
					<div className='library-example'>
						<h4>Jotai - Primitive and Flexible State</h4>
						<pre className='library-code'>
							{`import { atom, useAtom } from 'jotai'

// Create an atom (a piece of state)
const countAtom = atom(${stateCount})

// Derived atoms can be created from other atoms
const doubledCountAtom = atom(
  (get) => get(countAtom) * 2
)

// Atoms with write functions
const countWithActionsAtom = atom(
  (get) => get(countAtom),
  (_get, set, action) => {
    if (action === 'increment') {
      set(countAtom, (c) => c + 1)
    } else if (action === 'decrement') {
      set(countAtom, (c) => c - 1)
    }
  }
)

// Use it in a component
function Counter() {
  const [count, dispatch] = useAtom(countWithActionsAtom)
  const [doubledCount] = useAtom(doubledCountAtom)
  
  return (
    <div>
      <p>Count: {count} (Doubled: {doubledCount})</p>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}`}
						</pre>
						<div className='library-benefits'>
							<strong>Benefits:</strong>
							<ul>
								<li>
									Atomic model - small, focused pieces of
									state
								</li>
								<li>
									No context providers needed for most cases
								</li>
								<li>Derived state is simple and automatic</li>
								<li>Great TypeScript support</li>
								<li>Small bundle size and good performance</li>
							</ul>
						</div>
					</div>
				)}

				{activeLibrary === 'recoil' && (
					<div className='library-example'>
						<h4>Recoil - Facebook's Atomic State Management</h4>
						<pre className='library-code'>
							{`import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

// Define an atom - a unit of state
const countState = atom({
  key: 'countState', // unique ID
  default: ${stateCount}, // default value
})

// Define a selector - derived state
const doubledCountState = selector({
  key: 'doubledCountState',
  get: ({get}) => {
    const count = get(countState)
    return count * 2
  },
})

// You need a RecoilRoot provider at the app root
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}

// Use it in a component
function Counter() {
  const [count, setCount] = useRecoilState(countState)
  const doubledCount = useRecoilValue(doubledCountState)
  
  return (
    <div>
      <p>Count: {count} (Doubled: {doubledCount})</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}`}
						</pre>
						<div className='library-benefits'>
							<strong>Benefits:</strong>
							<ul>
								<li>
									Family of related atoms for complex state
								</li>
								<li>Excellent code-splitting support</li>
								<li>Time-travel debugging</li>
								<li>Developed and used by Facebook</li>
								<li>
									Handles async and derived state elegantly
								</li>
							</ul>
						</div>
					</div>
				)}

				{activeLibrary === 'mobx' && (
					<div className='library-example'>
						<h4>MobX - Simple, Scalable State Management</h4>
						<pre className='library-code'>
							{`import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

// Create a class-based store
class CounterStore {
  count = ${stateCount}
  
  constructor() {
    // Make all properties observable
    makeAutoObservable(this)
  }
  
  increment() {
    this.count += 1
  }
  
  decrement() {
    this.count -= 1
  }
  
  get doubled() {
    return this.count * 2
  }
}

// Create a store instance
const counterStore = new CounterStore()

// Use it in a component - must use observer to react to changes
const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count} (Doubled: {counterStore.doubled})</p>
      <button onClick={() => counterStore.decrement()}>-</button>
      <button onClick={() => counterStore.increment()}>+</button>
    </div>
  )
})`}
						</pre>
						<div className='library-benefits'>
							<strong>Benefits:</strong>
							<ul>
								<li>
									Minimal boilerplate with powerful
									abstractions
								</li>
								<li>
									Automatically tracks observables and
									re-renders
								</li>
								<li>
									Computed values with excellent memoization
								</li>
								<li>
									Works well with classes and object-oriented
									programming
								</li>
								<li>
									Great for complex domains with lots of
									relations
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>

			<div className='comparison-section'>
				<h3>Comparing State Management Solutions:</h3>
				<div className='comparison-table'>
					<div className='comparison-row header'>
						<div className='comparison-cell'>Library</div>
						<div className='comparison-cell'>Philosophy</div>
						<div className='comparison-cell'>Bundle Size</div>
						<div className='comparison-cell'>Learning Curve</div>
						<div className='comparison-cell'>Best For</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>React Context</div>
						<div className='comparison-cell'>
							Built-in React state sharing
						</div>
						<div className='comparison-cell'>
							0 KB (built into React)
						</div>
						<div className='comparison-cell'>Low</div>
						<div className='comparison-cell'>
							Simple shared state, theme/auth
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>Redux</div>
						<div className='comparison-cell'>
							Predictable state container
						</div>
						<div className='comparison-cell'>~15 KB (with RTK)</div>
						<div className='comparison-cell'>Medium-High</div>
						<div className='comparison-cell'>
							Large apps, complex state logic
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>Zustand</div>
						<div className='comparison-cell'>
							Minimal bear necessities
						</div>
						<div className='comparison-cell'>~1 KB</div>
						<div className='comparison-cell'>Low</div>
						<div className='comparison-cell'>
							Simple global state, Redux alternative
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>Jotai</div>
						<div className='comparison-cell'>
							Atomic, bottom-up approach
						</div>
						<div className='comparison-cell'>~3 KB</div>
						<div className='comparison-cell'>Low-Medium</div>
						<div className='comparison-cell'>
							Form state, atoms that compose together
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>Recoil</div>
						<div className='comparison-cell'>
							Atomic state for React
						</div>
						<div className='comparison-cell'>~20 KB</div>
						<div className='comparison-cell'>Medium</div>
						<div className='comparison-cell'>
							Complex state trees, code splitting
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>MobX</div>
						<div className='comparison-cell'>
							Make state management simple
						</div>
						<div className='comparison-cell'>~16 KB</div>
						<div className='comparison-cell'>Medium</div>
						<div className='comparison-cell'>
							OOP, complex domain objects
						</div>
					</div>
				</div>
			</div>

			<div className='decision-making'>
				<h3>Choosing the Right Tool:</h3>
				<p>
					State management is not one-size-fits-all. Consider these
					factors when choosing a library:
				</p>
				<div className='decision-factors'>
					<div className='decision-factor'>
						<h4>Application Size</h4>
						<p>
							<strong>Small Apps:</strong> Built-in React state or
							Context
							<br />
							<strong>Medium Apps:</strong> Zustand, Jotai
							<br />
							<strong>Large Apps:</strong> Redux, Recoil, MobX
						</p>
					</div>
					<div className='decision-factor'>
						<h4>Team Experience</h4>
						<p>
							<strong>Beginner React Teams:</strong> React
							Context, Zustand
							<br />
							<strong>Experienced Teams:</strong> Any option based
							on project needs
							<br />
							<strong>Teams with Redux Experience:</strong>{' '}
							Consider sticking with Redux Toolkit
						</p>
					</div>
					<div className='decision-factor'>
						<h4>State Complexity</h4>
						<p>
							<strong>Simple Shared State:</strong> Context,
							Zustand
							<br />
							<strong>Derived/Computed State:</strong> Recoil,
							MobX, Jotai
							<br />
							<strong>Complex State Relations:</strong> MobX,
							Redux, Recoil
						</p>
					</div>
					<div className='decision-factor'>
						<h4>Performance Needs</h4>
						<p>
							<strong>Fine-grained Updates:</strong> MobX, Jotai,
							Recoil
							<br />
							<strong>Minimal Re-renders:</strong> Zustand, Jotai
							<br />
							<strong>Large State Trees:</strong> Redux with
							selectors, Recoil
						</p>
					</div>
				</div>
			</div>

			<div className='future-trends'>
				<h3>Future Trends in State Management:</h3>
				<ul>
					<li>
						<strong>Atomic State:</strong> Breaking state into
						smaller, composable units (Jotai, Recoil)
					</li>
					<li>
						<strong>Minimalist APIs:</strong> Simpler interfaces
						with less boilerplate
					</li>
					<li>
						<strong>React Integration:</strong> Libraries designed
						specifically for React patterns
					</li>
					<li>
						<strong>Persistent State:</strong> Built-in persistence
						and synchronization
					</li>
					<li>
						<strong>Performance Optimizations:</strong> Automatic
						fine-grained updates
					</li>
				</ul>
			</div>

			<div className='character-guidance'>
				<h3>Universal State Management Best Practices:</h3>
				<ol>
					<li>
						<strong>Start simple:</strong> Don't reach for complex
						solutions until needed
					</li>
					<li>
						<strong>Colocate state:</strong> Keep state as close as
						possible to where it's used
					</li>
					<li>
						<strong>Divide by concern:</strong> Split state into
						logical domains
					</li>
					<li>
						<strong>Document patterns:</strong> Establish consistent
						patterns for your team
					</li>
					<li>
						<strong>Consider devtools:</strong> Debugging
						capabilities matter for complex state
					</li>
					<li>
						<strong>Evaluate bundle size:</strong> State libraries
						add to your app's weight
					</li>
					<li>
						<strong>Mix and match:</strong> Use different solutions
						for different problems
					</li>
				</ol>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Grand Reducer's Final Wisdom:",
					content: (
						<>
							<p>
								"You've witnessed the evolution of state management," Grand 
								Reducer proclaimed. "From simple useState to complex Redux, 
								from Context's sharing to modern libraries' innovations. Each 
								tool has its place in React Kingdom."
							</p>
							<p>
								"Remember, Aria - the greatest developers don't chase the newest 
								library. They understand the principles, evaluate tradeoffs, and 
								choose wisely. Your journey through the State Management Citadel 
								has given you this wisdom."
							</p>
							<p>
								"Now go forth! Apply these patterns where they serve best. Mix 
								approaches when needed. Most importantly, always consider your 
								application's actual needs over popular opinion. May your state 
								flow predictably and your components render efficiently!"
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					'How does understanding multiple state management approaches make you a more versatile React developer?',
					'What criteria would you use to choose between Redux, Context, or one of the modern libraries for your next project?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 11 (Evening)",
					content: "My mind is expanding! Each modern library solves state differently. Zustand's simplicity reminds me of useState but with global reach. Jotai's atoms compose like building blocks. Recoil brings Facebook's expertise. MobX feels magical with its automatic tracking. The key lesson: choose based on your needs, not trends. Sometimes mixing approaches - useState for UI, Context for themes, specialized libraries for complex state - creates the perfect solution!"
				}}
				chapterEnding={[
					"As the sun set behind the State Management Citadel, Aria stood transformed. She had entered as a student of basic state, but now understood the full spectrum - from component state to global patterns, from classical Redux to modern innovations.",
					"\"You've completed your training here,\" Grand Reducer said, his form beginning to fade back into the Citadel's architecture. \"But remember - mastery comes from practice. Use these tools wisely, and React Kingdom will flourish under your care.\"",
					"Binary chirped proudly. \"We did it, Aria! We understand all the state patterns!\"",
					"Aria smiled, feeling the weight of knowledge and responsibility. \"Yes, Binary. But this is just the beginning. Let's see what other mysteries React Kingdom holds for us!\""
				]}
			/>
		</div>
	);
};

export default ChapterThree;
