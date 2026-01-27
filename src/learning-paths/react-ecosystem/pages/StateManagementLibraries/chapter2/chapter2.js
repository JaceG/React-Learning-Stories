import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		exploredKingdoms,
		exploreKingdom,
		implementedSolutions,
		implementSolution,
		updateDiplomaticRelations,
		evolve
	} = useOutletContext();

	const [currentDemo, setCurrentDemo] = useState('redux');
	const [demoState, setDemoState] = useState({ count: 0, todos: [] });
	const [codeExample, setCodeExample] = useState('basic');

	// Redux patterns demonstration
	const reduxPatterns = [
		{
			id: 'basic',
			name: 'Basic Redux',
			description: 'Actions, reducers, and store'
		},
		{
			id: 'toolkit',
			name: 'Redux Toolkit',
			description: 'Modern Redux with less boilerplate'
		},
		{
			id: 'middleware',
			name: 'Middleware',
			description: 'Async actions and side effects'
		}
	];

	// Simulate Redux action
	const dispatchReduxAction = (action) => {
		switch (action.type) {
			case 'INCREMENT':
				setDemoState({ ...demoState, count: demoState.count + 1 });
				break;
			case 'ADD_TODO':
				setDemoState({
					...demoState,
					todos: [...demoState.todos, action.payload]
				});
				break;
			case 'RESET':
				setDemoState({ count: 0, todos: [] });
				break;
			default:
				break;
		}
		implementSolution('redux', action.type);
	};

	// Demo different library implementations
	const libraryDemos = {
		redux: {
			name: 'Redux Empire',
			icon: '🏛️',
			demo: () => (
				<div>
					<h5>Redux Demo</h5>
					<p>Count: {demoState.count}</p>
					<div className='demo-controls'>
						<button 
							className='demo-button'
							onClick={() => dispatchReduxAction({ type: 'INCREMENT' })}>
							Dispatch INCREMENT
						</button>
						<button 
							className='demo-button'
							onClick={() => dispatchReduxAction({ 
								type: 'ADD_TODO', 
								payload: `Todo ${demoState.todos.length + 1}` 
							})}>
							Add Todo
						</button>
						<button 
							className='demo-button'
							onClick={() => dispatchReduxAction({ type: 'RESET' })}>
							Reset State
						</button>
					</div>
					<div className='demo-output'>
						<strong>State:</strong>
						<pre>{JSON.stringify(demoState, null, 2)}</pre>
					</div>
				</div>
			)
		},
		mobx: {
			name: 'MobX Territory',
			icon: '🔮',
			demo: () => (
				<div>
					<h5>MobX Demo</h5>
					<p>Reactive state updates automatically</p>
					<div className='demo-controls'>
						<button 
							className='demo-button'
							onClick={() => {
								setDemoState({ ...demoState, count: demoState.count + 1 });
								implementSolution('mobx', 'observable update');
							}}>
							Update Observable
						</button>
					</div>
					<div className='demo-output'>
						Observable count: {demoState.count} (updates automatically)
					</div>
				</div>
			)
		},
		zustand: {
			name: 'Zustand Settlements',
			icon: '🐻',
			demo: () => (
				<div>
					<h5>Zustand Demo</h5>
					<p>Simple and lightweight</p>
					<div className='demo-controls'>
						<button 
							className='demo-button'
							onClick={() => {
								setDemoState({ ...demoState, count: demoState.count + 1 });
								implementSolution('zustand', 'set state');
							}}>
							Update Bears: {demoState.count} 🐻
						</button>
					</div>
					<div className='demo-output'>
						No providers needed! Just hooks.
					</div>
				</div>
			)
		}
	};

	// Visit a kingdom
	const visitKingdom = (kingdom) => {
		setCurrentDemo(kingdom);
		exploreKingdom(kingdom);
		updateDiplomaticRelations(kingdom, 'allied');
		if (exploredKingdoms.length >= 2) {
			evolve('diplomatic');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Redux Empire`}
				bridge={`With the map of Allied Kingdoms studied, Aria set out on her first diplomatic visit. "The Redux Empire is the largest and most established," Master Aurelius advised. "Their patterns have influenced many, including our own useReducer. Learn their ways carefully."`}
			/>

			<StorySection
				paragraphs={[
					<>Aria's first stop was the mighty Redux Empire, where <strong>Emperor Dispatcher</strong> ruled with predictable state updates. The empire's three principles were carved in stone: Single source of truth, State is read-only, Changes via pure functions.</>,
					`"Welcome, Ambassador Aria," Emperor Dispatcher greeted. "Our empire runs on actions and reducers. Every state change is documented, traceable, and predictable."`,
					<><strong>Aria</strong> studied their patterns. "It's like a more formal version of useReducer," she observed.</>,
					`"Indeed! We inspired React's useReducer. But we offer more: middleware, DevTools, and ecosystem. Let me show you..."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: State Kingdom Workshops</h3>
				
				<InstructionBox character={`Emperor Dispatcher demonstrates the Redux patterns.`}>
					Explore Basic Redux, Redux Toolkit, and Middleware patterns. Try the live 
					state management demos to see actions and reducers in action!
				</InstructionBox>
				
				<div className='pattern-comparison'>
					<h4>Redux Pattern Explorer</h4>
					<div className='comparison-grid'>
						{reduxPatterns.map(pattern => (
							<div 
								key={pattern.id}
								className={`comparison-panel ${codeExample === pattern.id ? 'active' : ''}`}
								onClick={() => setCodeExample(pattern.id)}>
								<div className='library-header'>
									<span className='library-logo'>📋</span>
									<div>
										<div className='library-name'>{pattern.name}</div>
										<div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
											{pattern.description}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='interactive-demo'>
					<h4>Live State Management Demo</h4>
					<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
						{Object.entries(libraryDemos).map(([key, lib]) => (
							<button
								key={key}
								className={`demo-button ${currentDemo === key ? 'active' : ''}`}
								onClick={() => visitKingdom(key)}
								style={{
									background: currentDemo === key ? '#2c3e50' : '#0984e3'
								}}>
								{lib.icon} {lib.name}
							</button>
						))}
					</div>
					
					{libraryDemos[currentDemo] && libraryDemos[currentDemo].demo()}
				</div>

				<div className='implementation-showcase'>
					<h4>Implemented Solutions</h4>
					<div className='implementations-grid'>
						{implementedSolutions.map(impl => (
							<div key={impl.id} className='implementation-card'>
								<div className='implementation-library'>
									{impl.library.toUpperCase()}
								</div>
								<div className='implementation-solution'>
									{impl.solution}
								</div>
							</div>
						))}
						{implementedSolutions.length === 0 && (
							<p style={{ color: '#7f8c8d', textAlign: 'center', gridColumn: '1 / -1' }}>
								Implement solutions to see them here
							</p>
						)}
					</div>
				</div>

				<div className='library-features'>
					<h4>Redux Deep Dive Features</h4>
					<div className='feature-list'>
						<div className='feature-item'>
							<span className='feature-icon'>⏰</span>
							<span>Time-travel debugging</span>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>🔍</span>
							<span>Redux DevTools</span>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>🔄</span>
							<span>Middleware system</span>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>📦</span>
							<span>Predictable state</span>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>🧪</span>
							<span>Easy testing</span>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>🌍</span>
							<span>Large ecosystem</span>
						</div>
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Redux Patterns Deep Dive</span>
				</div>
				<div className='code-example'>
					<pre>{`${codeExample === 'basic' ? `// Basic Redux Pattern

// 1. Define Action Types
const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_FILTER: 'SET_FILTER'
};

// 2. Action Creators
const increment = () => ({ type: ActionTypes.INCREMENT });
const decrement = () => ({ type: ActionTypes.DECREMENT });
const addTodo = (text) => ({
  type: ActionTypes.ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});
const toggleTodo = (id) => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: id
});

// 3. Reducers
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, action.payload];
    case ActionTypes.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

// 4. Combine Reducers
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer
});

// 5. Create Store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 6. React Integration
import { Provider, useSelector, useDispatch } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <TodoList />
    </Provider>
  );
}

function Counter() {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}` : codeExample === 'toolkit' ? `// Redux Toolkit - Modern Redux

import { createSlice, configureStore } from '@reduxjs/toolkit';

// 1. Create Slices (combines actions & reducers)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      // Immer allows "mutating" syntax
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (text) => {
        return {
          payload: {
            id: Date.now(),
            text,
            completed: false
          }
        };
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// 2. Export actions (automatically generated)
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { addTodo, toggleTodo } = todosSlice.actions;

// 3. Create Store with Slices
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todos: todosSlice.reducer
  }
});

// 4. Async Actions with createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// 5. Handle async actions in slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(action.payload);
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = 'idle';
      });
  }
});

// 6. RTK Query for Data Fetching
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos'
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      })
    })
  })
});

export const { useGetTodosQuery, useAddTodoMutation } = apiSlice;` : `// Redux Middleware & Advanced Patterns

// 1. Custom Middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  console.log('Previous State:', store.getState());
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// 2. Async Middleware (Redux Thunk)
const fetchTodos = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_TODOS_START' });
    
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        payload: todos
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_TODOS_ERROR',
        payload: error.message
      });
    }
  };
};

// 3. Redux Saga Pattern
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchTodosSaga() {
  try {
    const todos = yield call(fetch, '/api/todos');
    yield put({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
  } catch (error) {
    yield put({ type: 'FETCH_TODOS_ERROR', payload: error.message });
  }
}

function* watchFetchTodos() {
  yield takeEvery('FETCH_TODOS_REQUEST', fetchTodosSaga);
}

// 4. Selectors & Reselect
import { createSelector } from 'reselect';

const selectTodos = state => state.todos;
const selectFilter = state => state.filter;

const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
);

// 5. Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'preferences'] // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 6. Redux DevTools Integration
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, loggerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ 
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

// 7. Normalized State Shape
const normalizedState = {
  entities: {
    users: {
      byId: {
        '1': { id: '1', name: 'Alice' },
        '2': { id: '2', name: 'Bob' }
      },
      allIds: ['1', '2']
    },
    posts: {
      byId: {
        '101': { id: '101', title: 'Hello', authorId: '1' }
      },
      allIds: ['101']
    }
  },
  ui: {
    selectedUserId: '1',
    isLoading: false
  }
};

// 8. Action Pattern Standards
// FSA (Flux Standard Action)
const action = {
  type: 'ADD_TODO',
  payload: { text: 'Learn Redux' },
  meta: { timestamp: Date.now() },
  error: false
};`}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Emperor's Wisdom:</strong> "Redux may seem ceremonious, but this 
					ceremony brings order to chaos. Every action is intentional, every state 
					change is traceable, and every bug can be hunted through time. Modern 
					Redux Toolkit reduces the ceremony while keeping the power."
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: `Emperor Dispatcher`,
						description: `Ruler of the Redux Empire, guardian of predictable state updates. His philosophy: "Every action has a reaction, every state change has a reason, and every bug has a time-traveling solution."`
					}
				]}
				lessonInsight={{
					title: `The Redux Insight:`,
					content: `Redux's strength lies in its predictability and debugging capabilities. While it requires more setup than simpler solutions, it provides unmatched visibility into your application's state changes. The ecosystem around Redux - middleware, DevTools, and patterns - makes it suitable for large applications with complex state logic.`
				}}
				reflectionQuestions={[
					`When is Redux's ceremony worth it?`,
					`How does Redux Toolkit change the Redux experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 37 (Afternoon)`,
					content: `Visited the Redux Empire where Emperor Dispatcher rules with predictable state updates! The empire's three principles are carved in stone: Single source of truth, State is read-only, Changes via pure functions. I explored Basic Redux patterns, Redux Toolkit (modern with less boilerplate), and Middleware for async actions. The DevTools are remarkable - time-traveling through state changes! Binary noted: "The debugging power is impressive, but the setup is extensive." The Emperor's wisdom: "Redux may seem ceremonious, but this ceremony brings order to chaos." ${implementedSolutions.length} solutions implemented!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;