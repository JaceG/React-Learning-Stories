import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		exploredKingdoms,
		comparisonActive,
		implementedSolutions,
		simulateMigration,
		migrationProgress,
		diplomaticRelations,
		wisdomLevel,
		evolve
	} = useOutletContext();

	const [comparisonMode, setComparisonMode] = useState('features');
	const [selectedLibraries, setSelectedLibraries] = useState(['redux', 'zustand']);
	const [migrationFrom, setMigrationFrom] = useState('');
	const [migrationTo, setMigrationTo] = useState('');

	// Library comparison data
	const libraryComparisons = {
		redux: {
			name: 'Redux',
			icon: '🏛️',
			pros: ['Predictable', 'Great DevTools', 'Large ecosystem', 'Time-travel'],
			cons: ['Boilerplate', 'Learning curve', 'Verbose'],
			bestFor: 'Large teams, complex apps',
			performance: 7,
			simplicity: 5,
			ecosystem: 10
		},
		mobx: {
			name: 'MobX',
			icon: '🔮',
			pros: ['Reactive', 'Less boilerplate', 'OOP friendly', 'Auto-optimization'],
			cons: ['Magic behavior', 'Debugging harder', 'Less predictable'],
			bestFor: 'Reactive programming fans',
			performance: 9,
			simplicity: 7,
			ecosystem: 7
		},
		zustand: {
			name: 'Zustand',
			icon: '🐻',
			pros: ['Simple API', 'No providers', 'Small size', 'TypeScript'],
			cons: ['Less ecosystem', 'Fewer patterns', 'Less tooling'],
			bestFor: 'Small to medium apps',
			performance: 9,
			simplicity: 10,
			ecosystem: 5
		},
		recoil: {
			name: 'Recoil',
			icon: '⚛️',
			pros: ['Fine-grained', 'React Suspense', 'Graph-based', 'Concurrent'],
			cons: ['Experimental', 'Facebook-specific', 'Complex mental model'],
			bestFor: 'Modern React apps',
			performance: 8,
			simplicity: 6,
			ecosystem: 4
		},
		jotai: {
			name: 'Jotai',
			icon: '👻',
			pros: ['Atomic', 'No providers', 'React Suspense', 'Simple'],
			cons: ['New library', 'Small community', 'Less patterns'],
			bestFor: 'Modern minimalist apps',
			performance: 9,
			simplicity: 8,
			ecosystem: 3
		}
	};

	// Start migration simulation
	const startMigration = () => {
		if (!migrationFrom || !migrationTo) return;
		
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			simulateMigration(migrationFrom, migrationTo, progress);
			
			if (progress >= 100) {
				clearInterval(interval);
				evolve('master');
			}
		}, 500);
	};

	// Toggle library selection for comparison
	const toggleLibrary = (lib) => {
		if (selectedLibraries.includes(lib)) {
			setSelectedLibraries(selectedLibraries.filter(l => l !== lib));
		} else if (selectedLibraries.length < 3) {
			setSelectedLibraries([...selectedLibraries, lib]);
		}
	};

	// Calculate wisdom message
	const getWisdomMessage = () => {
		if (exploredKingdoms.length === 0) return "Begin your journey";
		if (exploredKingdoms.length < 3) return "Continue exploring";
		if (implementedSolutions.length < 5) return "Practice implementations";
		return "You've gained deep wisdom!";
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The State Alliance`}
				bridge={`Having studied the Redux Empire's patterns, Aria set out to visit the remaining kingdoms. "Each has developed unique approaches," Emperor Dispatcher advised. "MobX embraces reactivity, Zustand champions simplicity, and the atomic kingdoms - Recoil and Jotai - focus on fine-grained updates. Learn from all of them."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> traveled swiftly through the allied territories:
				</p>

				<p className='story-paragraph'>
					In <strong>MobX Territory</strong>, Chief Observer showed her reactive 
					programming: "We make state observable. Components react automatically 
					to changes."
				</p>

				<p className='story-paragraph'>
					The <strong>Zustand Settlements</strong> demonstrated simplicity: "Why 
					complicate? Small store, simple API, powerful results," explained Elder 
					Simplicity.
				</p>

				<p className='story-paragraph'>
					<strong>Recoil Regions</strong> revealed atomic state: "Each piece of 
					state is an atom. Components subscribe to exactly what they need," 
					taught Atom Master.
				</p>

				<p className='story-paragraph'>
					The <strong>Jotai Archipelago</strong> showed similar patterns with 
					different philosophy: "We're like Recoil, but with React Suspense at 
					our core."
				</p>

				<p className='story-paragraph'>
					Returning to React Kingdom, Aria presented her findings to the Council. 
					"Each approach has its place. Redux for large teams needing structure. 
					MobX for reactive programming fans. Zustand for simplicity. Recoil and 
					Jotai for fine-grained reactivity."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: The Grand State Comparison</h3>
				
				<InstructionBox character={`Master Aurelius presents the Grand Comparison Chamber.`}>
					Compare state management libraries by features, metrics, or code examples. 
					Try the migration simulator to understand how to move between libraries!
				</InstructionBox>
				
				<div className='pattern-comparison'>
					<h4>Library Comparison Mode</h4>
					<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
						<button
							className={`demo-button ${comparisonMode === 'features' ? 'active' : ''}`}
							onClick={() => setComparisonMode('features')}
							style={{ background: comparisonMode === 'features' ? '#2c3e50' : '#0984e3' }}>
							Features
						</button>
						<button
							className={`demo-button ${comparisonMode === 'metrics' ? 'active' : ''}`}
							onClick={() => setComparisonMode('metrics')}
							style={{ background: comparisonMode === 'metrics' ? '#2c3e50' : '#0984e3' }}>
							Metrics
						</button>
						<button
							className={`demo-button ${comparisonMode === 'code' ? 'active' : ''}`}
							onClick={() => setComparisonMode('code')}
							style={{ background: comparisonMode === 'code' ? '#2c3e50' : '#0984e3' }}>
							Code Examples
						</button>
					</div>

					{comparisonMode === 'features' && (
						<div className='comparison-grid'>
							{Object.entries(libraryComparisons).map(([key, lib]) => (
								<div
									key={key}
									className={`comparison-panel ${selectedLibraries.includes(key) ? 'active' : ''}`}
									onClick={() => toggleLibrary(key)}>
									<div className='library-header'>
										<span className='library-logo'>{lib.icon}</span>
										<span className='library-name'>{lib.name}</span>
									</div>
									<div style={{ marginTop: '15px' }}>
										<strong style={{ color: '#27ae60' }}>Pros:</strong>
										<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
											{lib.pros.map((pro, i) => (
												<li key={i} style={{ fontSize: '0.9em' }}>{pro}</li>
											))}
										</ul>
										<strong style={{ color: '#e74c3c' }}>Cons:</strong>
										<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
											{lib.cons.map((con, i) => (
												<li key={i} style={{ fontSize: '0.9em' }}>{con}</li>
											))}
										</ul>
										<p style={{ marginTop: '10px', fontSize: '0.9em', fontStyle: 'italic' }}>
											<strong>Best for:</strong> {lib.bestFor}
										</p>
									</div>
								</div>
							))}
						</div>
					)}

					{comparisonMode === 'metrics' && (
						<div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
							<h5>Performance & Characteristics</h5>
							{selectedLibraries.map(lib => {
								const data = libraryComparisons[lib];
								return (
									<div key={lib} style={{ marginBottom: '20px' }}>
										<h6>{data.icon} {data.name}</h6>
										<div style={{ marginBottom: '10px' }}>
											<div>Performance: {data.performance}/10</div>
											<div style={{
												background: '#ecf0f1',
												height: '10px',
												borderRadius: '5px',
												overflow: 'hidden'
											}}>
												<div style={{
													background: '#3498db',
													width: `${data.performance * 10}%`,
													height: '100%'
												}} />
											</div>
										</div>
										<div style={{ marginBottom: '10px' }}>
											<div>Simplicity: {data.simplicity}/10</div>
											<div style={{
												background: '#ecf0f1',
												height: '10px',
												borderRadius: '5px',
												overflow: 'hidden'
											}}>
												<div style={{
													background: '#2ecc71',
													width: `${data.simplicity * 10}%`,
													height: '100%'
												}} />
											</div>
										</div>
										<div style={{ marginBottom: '10px' }}>
											<div>Ecosystem: {data.ecosystem}/10</div>
											<div style={{
												background: '#ecf0f1',
												height: '10px',
												borderRadius: '5px',
												overflow: 'hidden'
											}}>
												<div style={{
													background: '#9b59b6',
													width: `${data.ecosystem * 10}%`,
													height: '100%'
												}} />
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				<div className='migration-simulator'>
					<h4>State Migration Simulator</h4>
					<div className='migration-path'>
						<div className='migration-source'>
							<h5>From:</h5>
							<select 
								value={migrationFrom}
								onChange={(e) => setMigrationFrom(e.target.value)}
								style={{
									padding: '8px',
									borderRadius: '4px',
									border: '1px solid #7f8c8d',
									background: '#34495e',
									color: 'white'
								}}>
								<option value="">Select...</option>
								{Object.keys(libraryComparisons).map(lib => (
									<option key={lib} value={lib}>
										{libraryComparisons[lib].name}
									</option>
								))}
							</select>
						</div>
						<div className='migration-arrow'>→</div>
						<div className='migration-target'>
							<h5>To:</h5>
							<select 
								value={migrationTo}
								onChange={(e) => setMigrationTo(e.target.value)}
								style={{
									padding: '8px',
									borderRadius: '4px',
									border: '1px solid #7f8c8d',
									background: '#34495e',
									color: 'white'
								}}>
								<option value="">Select...</option>
								{Object.keys(libraryComparisons).map(lib => (
									<option key={lib} value={lib}>
										{libraryComparisons[lib].name}
									</option>
								))}
							</select>
						</div>
					</div>
					
					{migrationFrom && migrationTo && migrationFrom !== migrationTo && (
						<>
							<button
								onClick={startMigration}
								className='demo-button'
								style={{
									display: 'block',
									margin: '20px auto',
									background: '#e74c3c'
								}}>
								Start Migration
							</button>
							<div className='migration-progress'>
								<div 
									className='migration-fill'
									style={{ width: `${migrationProgress}%` }}>
									{migrationProgress}%
								</div>
							</div>
						</>
					)}
				</div>

				<div className='wisdom-indicator'>
					<h4>State Management Wisdom</h4>
					<div className='wisdom-levels'>
						<div className={`wisdom-level ${wisdomLevel === 'novice' ? 'active' : ''}`}>
							Novice
						</div>
						<div className={`wisdom-level ${wisdomLevel === 'explorer' ? 'active' : ''}`}>
							Explorer
						</div>
						<div className={`wisdom-level ${wisdomLevel === 'diplomatic' ? 'active' : ''}`}>
							Diplomatic
						</div>
						<div className={`wisdom-level ${wisdomLevel === 'experienced' ? 'active' : ''}`}>
							Experienced
						</div>
						<div className={`wisdom-level ${wisdomLevel === 'master' ? 'active' : ''}`}>
							Master
						</div>
					</div>
					<p style={{ marginTop: '20px' }}>{getWisdomMessage()}</p>
				</div>

				{wisdomLevel === 'master' && (
					<div className='achievement-banner'>
						<h4>🏆 State Ambassador Achievement!</h4>
						<p>You've mastered the art of state management diplomacy! You understand 
						not just how each library works, but when and why to use each one.</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>State Library Comparison</span>
				</div>
				<div className='code-example'>
					<pre>{`// Same App, Different Libraries

// 1. Redux Implementation
// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, done: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

export const store = configureStore({
  reducer: { todos: todoSlice.reducer }
});

// App.js
import { Provider, useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './store';

function TodoApp() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(addTodo('New Todo'))}>
        Add Todo
      </button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.text} - {todo.done ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
}

// 2. MobX Implementation
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class TodoStore {
  todos = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addTodo(text) {
    this.todos.push({ id: Date.now(), text, done: false });
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }
}

const todoStore = new TodoStore();

const TodoApp = observer(() => {
  return (
    <div>
      <button onClick={() => todoStore.addTodo('New Todo')}>
        Add Todo
      </button>
      {todoStore.todos.map(todo => (
        <div key={todo.id} onClick={() => todoStore.toggleTodo(todo.id)}>
          {todo.text} - {todo.done ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
});

// 3. Zustand Implementation
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, done: false }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }))
}));

function TodoApp() {
  const { todos, addTodo, toggleTodo } = useTodoStore();
  
  return (
    <div>
      <button onClick={() => addTodo('New Todo')}>
        Add Todo
      </button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text} - {todo.done ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
}

// 4. Recoil Implementation
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const todoListState = atom({
  key: 'todoListState',
  default: []
});

const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.done).length;
    return { totalNum, totalCompletedNum };
  }
});

function TodoApp() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const stats = useRecoilValue(todoListStatsState);
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  
  return (
    <div>
      <div>Total: {stats.totalNum}, Completed: {stats.totalCompletedNum}</div>
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text} - {todo.done ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
}

// 5. Jotai Implementation
import { atom, useAtom } from 'jotai';

const todosAtom = atom([]);
const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    total: todos.length,
    completed: todos.filter(t => t.done).length
  };
});

function TodoApp() {
  const [todos, setTodos] = useAtom(todosAtom);
  const stats = useAtom(todoStatsAtom)[0];
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  
  return (
    <div>
      <div>Total: {stats.total}, Completed: {stats.completed}</div>
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text} - {todo.done ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
}

// Migration Strategies

// Context to Redux
// 1. Map Context state to Redux state shape
// 2. Convert Context actions to Redux actions
// 3. Replace useContext with useSelector/useDispatch
// 4. Remove Context Providers, add Redux Provider

// Redux to Zustand
// 1. Combine reducers into Zustand store
// 2. Convert action creators to store methods
// 3. Replace useSelector with store hook
// 4. Remove Redux Provider

// Any to MobX
// 1. Create observable classes for state domains
// 2. Convert state updates to class methods
// 3. Wrap components with observer
// 4. Use MobX DevTools for debugging`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Alliance Wisdom:</strong> "Each state management library optimizes 
					for different values. Redux for predictability and debugging. MobX for 
					reactivity and less code. Zustand for simplicity. Recoil/Jotai for 
					fine-grained updates. Choose based on your kingdom's needs, not trends."
				</div>
			</div>

			{wisdomLevel === 'master' && (
				<div className='achievement-banner'>
					<h4>🏆 State Ambassador Achievement!</h4>
					<p>You've mastered the art of state management diplomacy!</p>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: `The Alliance Insight:`,
					content: `State management isn't about finding the "best" library - it's about finding the right fit for your project. Each solution represents different trade-offs between simplicity, power, debugging, and ecosystem. Understanding multiple approaches makes you a better architect.`
				}}
				reflectionQuestions={[
					`How do you choose between simplicity and power?`,
					`What role does ecosystem play in your decision?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 37 (Evening)`,
					content: `Completed my tour of all Allied Kingdoms! In MobX Territory, Chief Observer showed reactive programming - components react automatically to changes. The Zustand Settlements demonstrated simplicity with Elder Simplicity: "Small store, simple API, powerful results." Recoil Regions revealed atomic state, and Jotai Archipelago showed similar patterns with React Suspense integration. Wisdom Level: ${wisdomLevel}. The Alliance Insight: each kingdom's approach reflects their values - Redux values predictability, MobX values reactivity, Zustand values simplicity. Knowing when to use each is true wisdom!`
				}}
				chapterEnding={[
					`Master Aurelius listened to Aria's report with pride. "You've done well, Ambassador. You've shown that React's strength isn't in having one way, but in supporting many ways."`,
					`Binary compiled the insights. "Each kingdom's approach reflects their values. Redux values predictability, MobX values reactivity, Zustand values simplicity."`,
					`"Your next diplomatic mission awaits," Aurelius announced. "The Form Architects have gathered. Managing form state is... complex. We need your diplomatic skills there too..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;