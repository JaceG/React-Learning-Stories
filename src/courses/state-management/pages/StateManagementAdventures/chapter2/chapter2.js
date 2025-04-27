const ChapterTwo = ({ storeState, dispatchAction }) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Legendary Redux Empire
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Beyond the realm of Complexia lay the vast Empire of{' '}
					<strong>Redux</strong>, a mighty kingdom known for its
					uncompromising principles of immutability, predictability,
					and centralized state management. For many years, it was the
					most powerful force in the land of React.
				</p>

				<div className='empire-illustration'>
					<div className='central-store'>
						<div className='store-banner'>The Central Store</div>
						<div className='store-vault'>
							<pre className='store-contents'>
								{`{
  game: {
    score: ${storeState.game.score},
    level: ${storeState.game.level},
    lives: ${storeState.game.lives}
  },
  player: {
    name: "${storeState.player.name}",
    powerUps: [${storeState.player.powerUps.map((p) => `"${p}"`).join(', ')}]
  },
  ui: {
    theme: "${storeState.ui.theme}",
    soundEnabled: ${storeState.ui.soundEnabled ? 'true' : 'false'}
  }
}`}
							</pre>
						</div>
					</div>
					<div className='empire-provinces'>
						<div className='province'>
							<div className='province-name'>Game Module</div>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'game/scorePoints',
										payload: 10,
									})
								}>
								Score Points
							</button>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'game/levelUp',
									})
								}>
								Level Up
							</button>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'game/loseLife',
									})
								}>
								Lose Life
							</button>
						</div>
						<div className='province'>
							<div className='province-name'>Player Module</div>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'player/changeName',
										payload:
											storeState.player.name === 'Hero'
												? 'Champion'
												: 'Hero',
									})
								}>
								Change Name
							</button>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'player/addPowerUp',
										payload: 'Super Speed',
									})
								}>
								Add Power-Up
							</button>
						</div>
						<div className='province'>
							<div className='province-name'>UI Module</div>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'ui/toggleTheme',
									})
								}>
								Toggle Theme
							</button>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'ui/toggleSound',
									})
								}>
								Toggle Sound
							</button>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"In the Redux Empire," the historians explained, "all state
					changes follow the same rigid path: Actions are dispatched
					to a central Store, then processed by pure Reducer functions
					that produce a new immutable state. This creates an unbroken
					chain of events that can be tracked, debugged, and even
					time-traveled."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Redux Empire
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience the Redux pattern by using the buttons
							above to dispatch actions to the central store.
							Watch how each province (slice) handles specific
							actions while maintaining a single source of truth.
						</strong>
					</p>
				</div>

				<div className='redux-flow-diagram'>
					<div className='redux-component component'>
						<div className='component-title'>React Component</div>
						<div className='component-action'>
							Dispatches Action
						</div>
						<div className='arrow down'>↓</div>
					</div>
					<div className='redux-action action'>
						<div className='action-title'>Action</div>
						<div className='action-example'>
							<pre>
								{`{
  type: 'game/scorePoints',
  payload: 10
}`}
							</pre>
						</div>
						<div className='arrow down'>↓</div>
					</div>
					<div className='redux-reducer reducer'>
						<div className='reducer-title'>Reducer</div>
						<div className='reducer-example'>
							<pre>
								{`function gameReducer(state, action) {
  switch(action.type) {
    case 'game/scorePoints':
      return {
        ...state,
        score: state.score + action.payload
      };
    // other cases
    default:
      return state;
  }
}`}
							</pre>
						</div>
						<div className='arrow down'>↓</div>
					</div>
					<div className='redux-store store'>
						<div className='store-title'>Store</div>
						<div className='store-description'>
							New immutable state
						</div>
						<div className='arrow curved'>↺</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<h3>Redux Architecture:</h3>
				<pre className='redux-code'>
					{`// 1. Define Action Types (recommended approach uses "domain/event" format)
const SCORE_POINTS = 'game/scorePoints';
const LEVEL_UP = 'game/levelUp';
const LOSE_LIFE = 'game/loseLife';

// 2. Create Action Creators (functions that return action objects)
function scorePoints(amount) {
  return {
    type: SCORE_POINTS,
    payload: amount
  };
}

function levelUp() {
  return {
    type: LEVEL_UP
  };
}

function loseLife() {
  return {
    type: LOSE_LIFE
  };
}

// 3. Define an initial state for this slice
const initialGameState = {
  score: 0,
  level: 1,
  lives: 3
};

// 4. Create a reducer function (pure function that takes state and action)
function gameReducer(state = initialGameState, action) {
  switch(action.type) {
    case SCORE_POINTS:
      return {
        ...state,
        score: state.score + action.payload
      };
      
    case LEVEL_UP:
      return {
        ...state,
        level: state.level + 1
      };
      
    case LOSE_LIFE:
      return {
        ...state,
        lives: state.lives - 1
      };
      
    default:
      return state;
  }
}

// 5. Combine multiple reducers into a root reducer
const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  ui: uiReducer
});

// 6. Create the store
const store = createStore(rootReducer);

// 7. Dispatch actions
store.dispatch(scorePoints(10));
store.dispatch(levelUp());`}
				</pre>
			</div>

			<div className='redux-tools'>
				<h3>Modern Redux Tools:</h3>
				<div className='tool'>
					<h4>Redux Toolkit (RTK)</h4>
					<p>
						Redux Toolkit is the official, opinionated,
						batteries-included toolset for efficient Redux
						development. It simplifies store setup, reducer
						creation, and immutable update logic.
					</p>
					<pre className='tool-code'>
						{`// Using Redux Toolkit (much less boilerplate)
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    level: 1,
    lives: 3
  },
  reducers: {
    // RTK uses Immer internally so you can "mutate" state
    scorePoints: (state, action) => {
      state.score += action.payload;
    },
    levelUp: (state) => {
      state.level += 1;
    },
    loseLife: (state) => {
      state.lives -= 1;
    }
  }
});

// Action creators are generated automatically
export const { scorePoints, levelUp, loseLife } = gameSlice.actions;

// The reducer is ready to use in your store
export default gameSlice.reducer;`}
					</pre>
				</div>
			</div>

			<div className='redux-patterns'>
				<h3>Common Redux Patterns:</h3>
				<div className='pattern'>
					<h4>1. Normalized State Structure</h4>
					<pre className='pattern-code'>
						{`// Instead of nested arrays
{
  posts: [
    { id: 1, title: "First Post", author: { id: 1, name: "User 1" } },
    { id: 2, title: "Second Post", author: { id: 2, name: "User 2" } }
  ]
}

// Use normalized structure with IDs as references
{
  posts: {
    byId: {
      "1": { id: 1, title: "First Post", authorId: 1 },
      "2": { id: 2, title: "Second Post", authorId: 2 }
    },
    allIds: ["1", "2"]
  },
  users: {
    byId: {
      "1": { id: 1, name: "User 1" },
      "2": { id: 2, name: "User 2" }
    },
    allIds: ["1", "2"]
  }
}`}
					</pre>
				</div>
				<div className='pattern'>
					<h4>2. Async Logic with Thunks</h4>
					<pre className='pattern-code'>
						{`// Action creator that returns a function instead of an action object
function fetchPosts() {
  // Redux Thunk middleware allows returning functions
  return async function(dispatch) {
    dispatch({ type: 'posts/loading' });
    
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      dispatch({ type: 'posts/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'posts/error', payload: error.message });
    }
  };
}

// Usage
dispatch(fetchPosts());`}
					</pre>
				</div>
			</div>

			<div className='when-to-use'>
				<h3>When to Use Redux:</h3>
				<ul>
					<li>
						Complex state logic that spans across multiple
						components
					</li>
					<li>
						Application state needed in many places throughout the
						app
					</li>
					<li>
						Frequent state updates following complex business logic
					</li>
					<li>
						Medium to large-sized codebases with many developers
					</li>
					<li>Need for robust debugging and development tools</li>
				</ul>
				<p>
					For smaller applications or simpler state needs, useReducer
					+ Context is often sufficient.
				</p>
			</div>

			<div className='lesson-insight'>
				<h3>The Redux Lesson:</h3>
				<p>
					Redux is a predictable state container for JavaScript
					applications based on three fundamental principles:
				</p>
				<ul>
					<li>
						<strong>Single Source of Truth:</strong> The entire
						application state is stored in a single object tree
						within a single store.
					</li>
					<li>
						<strong>State is Read-Only:</strong> The only way to
						change state is to emit an action, an object describing
						what happened.
					</li>
					<li>
						<strong>Changes are Made with Pure Functions:</strong>{' '}
						Reducers are pure functions that take the previous state
						and an action, and return the next state.
					</li>
				</ul>
				<p>
					These principles create a predictable, traceable flow of
					data that makes applications easier to debug, test, and
					reason about.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the empire metaphor help you understand the
					architecture and principles of Redux?
				</p>
				<p>
					Consider the Redux data flow: Action → Reducer → Store →
					Component. How does this unidirectional flow contribute to
					predictability in applications?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
