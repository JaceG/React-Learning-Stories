import React, { useState } from 'react';

const initialStoreState = {
	game: { score: 0, level: 1, lives: 3 },
	player: { name: 'Aria', powerUps: [] },
	ui: { theme: 'light', soundEnabled: true },
};

const ChapterTwo = () => {
	const [storeState, setStoreState] = useState(initialStoreState);

	const dispatchAction = (action) => {
		switch (action.type) {
			case 'game/scorePoints':
				setStoreState((prev) => ({
					...prev,
					game: {
						...prev.game,
						score: prev.game.score + action.payload,
					},
				}));
				break;
			case 'game/levelUp':
				setStoreState((prev) => ({
					...prev,
					game: {
						...prev.game,
						level: prev.game.level + 1,
					},
				}));
				break;
			case 'game/loseLife':
				setStoreState((prev) => ({
					...prev,
					game: {
						...prev.game,
						lives: Math.max(0, prev.game.lives - 1),
					},
				}));
				break;
			case 'player/changeName':
				setStoreState((prev) => ({
					...prev,
					player: {
						...prev.player,
						name: action.payload,
					},
				}));
				break;
			case 'player/addPowerUp':
				setStoreState((prev) => ({
					...prev,
					player: {
						...prev.player,
						powerUps: [...prev.player.powerUps, action.payload],
					},
				}));
				break;
			case 'ui/toggleTheme':
				setStoreState((prev) => ({
					...prev,
					ui: {
						...prev.ui,
						theme: prev.ui.theme === 'light' ? 'dark' : 'light',
					},
				}));
				break;
			case 'ui/toggleSound':
				setStoreState((prev) => ({
					...prev,
					ui: {
						...prev.ui,
						soundEnabled: !prev.ui.soundEnabled,
					},
				}));
				break;
			default:
				break;
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Redux Archives
			</h2>

			<div className='chapter-bridge'>
				<p>Grand Reducer led Aria through a massive doorway into a library 
				that seemed to stretch infinitely upward. Ancient tomes lined the 
				walls, each glowing with the accumulated wisdom of state management 
				patterns from across the ages.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Before we continue," Grand Reducer said, pulling a massive, 
					leather-bound book from a pedestal, "you must understand the 
					history of our craft. This is the <strong>Redux Codex</strong> - 
					the most influential state management pattern ever created."
				</p>

				<p className='story-paragraph'>
					Binary's lights flickered with recognition. "Redux! I've heard 
					stories about its power - a single source of truth for entire 
					applications!"
				</p>

				<p className='story-paragraph'>
					"Indeed," Grand Reducer nodded. "Redux took the reducer pattern 
					you just learned and expanded it to manage an entire application's 
					state. Watch as I demonstrate its principles."
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
							<div className='province-name'>Game Domain</div>
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
							<div className='province-name'>Player Domain</div>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'player/changeName',
										payload:
											storeState.player.name === 'Aria'
												? 'Master Aria'
												: 'Aria',
									})
								}>
								Change Title
							</button>
							<button
								className='province-action'
								onClick={() =>
									dispatchAction({
										type: 'player/addPowerUp',
										payload: 'Time Control',
									})
								}>
								Add Power-Up
							</button>
						</div>
						<div className='province'>
							<div className='province-name'>UI Domain</div>
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
					"Redux operates on three sacred principles," Grand Reducer explained. 
					"First, a <strong>single source of truth</strong> - all state lives 
					in one store. Second, <strong>state is read-only</strong> - the only 
					way to change it is through actions. Third, <strong>changes are made 
					with pure functions</strong> - reducers that never mutate state."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Challenge: The Redux Flow
				</h3>
				<p className='instruction'>
					<strong>👉 Grand Reducer gestures to the control panels.</strong>
					"Try dispatching actions to different domains. Notice how each domain 
					manages its own slice of state, but everything flows through the same 
					predictable pattern!"
				</p>

				<div className='redux-flow-diagram'>
					<div className='redux-component component'>
						<div className='component-title'>Component (You)</div>
						<div className='component-action'>
							Dispatch Action
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
								{`(state, action) => {
  switch(action.type) {
    case 'game/scorePoints':
      return {
        ...state,
        score: state.score + action.payload
      };
  }
}`}
							</pre>
						</div>
						<div className='arrow down'>↓</div>
					</div>
					<div className='redux-store store'>
						<div className='store-title'>Store</div>
						<div className='store-description'>
							New State → Re-render
						</div>
						<div className='arrow curved'>↺</div>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 11 (Midday)</h4>
					<p>Redux is like useReducer on a grand scale! Instead of managing 
					state in individual components, Redux creates a central store for 
					the entire application. Every change follows the same path: 
					Action → Reducer → New State → Re-render. It's incredibly powerful 
					for large applications where many components need access to the 
					same data. The predictability is amazing - you can track every 
					state change!</p>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Redux Architecture</span>
					<span className='discovered-by'>The Redux Codex</span>
				</div>
				<pre className='redux-code'>
					{`// Redux follows a strict architectural pattern

// 1. Actions describe what happened
const scorePoints = (amount) => ({
  type: 'game/scorePoints',
  payload: amount
});

// 2. Reducers specify how state changes
const initialGameState = {
  score: 0,
  level: 1,
  lives: 3
};

function gameReducer(state = initialGameState, action) {
  switch(action.type) {
    case 'game/scorePoints':
      return {
        ...state,
        score: state.score + action.payload
      };
    case 'game/levelUp':
      return {
        ...state,
        level: state.level + 1
      };
    default:
      return state;
  }
}

// 3. Store holds the entire application state
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  ui: uiReducer
});

const store = createStore(rootReducer);

// 4. Components dispatch actions to update state
store.dispatch(scorePoints(10));

// 5. Components subscribe to state changes
store.subscribe(() => {
  console.log('State updated:', store.getState());
});`}
				</pre>
			</div>

			<div className='redux-tools'>
				<h3>Modern Redux: Redux Toolkit</h3>
				<div className='tool'>
					<h4>The Evolution of Redux</h4>
					<p>
						"Redux evolved over time," Grand Reducer explained. "Redux Toolkit 
						emerged to simplify the patterns and reduce boilerplate. It's now 
						the recommended way to write Redux."
					</p>
					<pre className='tool-code'>
						{`// Redux Toolkit - Modern Redux with less code
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice (combines actions & reducer)
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    level: 1,
    lives: 3
  },
  reducers: {
    // RTK uses Immer - write "mutating" logic safely
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

// Actions are generated automatically
export const { scorePoints, levelUp, loseLife } = gameSlice.actions;

// Configure store with slices
const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    player: playerSlice.reducer,
    ui: uiSlice.reducer
  }
});`}
					</pre>
				</div>
			</div>

			<div className='when-to-use'>
				<h3>Grand Reducer's Guidance: When to Use Redux</h3>
				<ul>
					<li>Large applications with complex state shared across many components</li>
					<li>State that needs to be accessed from deeply nested components</li>
					<li>Applications requiring robust debugging and time-travel capabilities</li>
					<li>Teams that benefit from enforced patterns and predictability</li>
					<li>When Context + useReducer becomes insufficient</li>
				</ul>
				<p className='warning'>
					⚠️ Remember: Redux adds complexity. For smaller apps, Context + useReducer 
					or even just Context might be enough!
				</p>
			</div>

			<div className='lesson-insight'>
				<h3>Grand Reducer's Wisdom:</h3>
				<p>
					Redux revolutionized state management by taking the reducer pattern 
					and scaling it to entire applications. Its three principles - single 
					source of truth, read-only state, and pure function changes - create 
					a predictable, debuggable system. While it adds complexity, Redux 
					shines in large applications where multiple components need access 
					to the same state and where tracking state changes is crucial. 
					Modern Redux Toolkit makes it much easier to use while maintaining 
					all the benefits.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does Redux's "single source of truth" principle help manage 
					complexity in large applications?
				</p>
				<p>
					Why might the strict action → reducer → store flow be beneficial 
					for team development and debugging?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;