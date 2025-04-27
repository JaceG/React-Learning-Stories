import React, { useState, useReducer } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './StateManagementAdventures.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

// Initial state for reducer example in Chapter 1
const initialState = {
	gold: 10,
	items: {
		potions: 2,
		weapons: [{ name: 'Wooden Sword', power: 5 }],
	},
	status: 'Ready for adventure',
};

// Reducer function for Chapter 1
function inventoryReducer(state, action) {
	switch (action.type) {
		case 'ADD_GOLD':
			return {
				...state,
				gold: state.gold + action.payload,
			};
		case 'BUY_POTION':
			if (state.gold < action.payload.cost) return state;
			return {
				...state,
				gold: state.gold - action.payload.cost,
				items: {
					...state.items,
					potions: state.items.potions + 1,
				},
				status: 'Ready for adventure!',
			};
		case 'ADD_WEAPON':
			return {
				...state,
				items: {
					...state.items,
					weapons: [...state.items.weapons, action.payload],
				},
			};
		case 'USE_POTION':
			if (state.items.potions <= 0) return state;
			return {
				...state,
				items: {
					...state.items,
					potions: state.items.potions - 1,
				},
				status: 'Feeling healthy!',
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}

// Initial state for Redux store in Chapter 2
const initialStoreState = {
	game: { score: 0, level: 1, lives: 3 },
	player: { name: 'Hero', powerUps: [] },
	ui: { theme: 'light', soundEnabled: true },
};

function StateManagementAdventures() {
	const [currentChapter, setCurrentChapter] = useState(1);

	// State for useReducer demo in Chapter 1
	const [state, dispatch] = useReducer(inventoryReducer, initialState);

	// State for Redux demo in Chapter 2
	const [storeState, setStoreState] = useState(initialStoreState);

	// State for modern libraries demo in Chapter 3
	const [activeLibrary, setActiveLibrary] = useState('zustand');
	const [stateCount, setStateCount] = useState(5);

	// Handler for Redux actions in Chapter 2
	const dispatchAction = (action) => {
		// This simulates a Redux reducer
		switch (action.type) {
			case 'game/scorePoints':
				setStoreState({
					...storeState,
					game: {
						...storeState.game,
						score: storeState.game.score + action.payload,
					},
				});
				break;
			case 'game/levelUp':
				setStoreState({
					...storeState,
					game: {
						...storeState.game,
						level: storeState.game.level + 1,
					},
				});
				break;
			case 'game/loseLife':
				setStoreState({
					...storeState,
					game: {
						...storeState.game,
						lives: Math.max(0, storeState.game.lives - 1),
					},
				});
				break;
			case 'player/changeName':
				setStoreState({
					...storeState,
					player: {
						...storeState.player,
						name: action.payload,
					},
				});
				break;
			case 'player/addPowerUp':
				setStoreState({
					...storeState,
					player: {
						...storeState.player,
						powerUps: [
							...storeState.player.powerUps,
							action.payload,
						],
					},
				});
				break;
			case 'ui/toggleTheme':
				setStoreState({
					...storeState,
					ui: {
						...storeState.ui,
						theme:
							storeState.ui.theme === 'light' ? 'dark' : 'light',
					},
				});
				break;
			case 'ui/toggleSound':
				setStoreState({
					...storeState,
					ui: {
						...storeState.ui,
						soundEnabled: !storeState.ui.soundEnabled,
					},
				});
				break;
			default:
				break;
		}
	};

	// Handler for Chapter 3 library switching
	const switchLibrary = (library) => {
		setActiveLibrary(library);
	};

	// Handler for Chapter 3 state updating
	const updateState = (value) => {
		setStateCount(value);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>State Management Adventures</h1>
			<p className='lesson-subtitle'>
				Master advanced techniques for managing complex application
				state
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Chapter 1: The Reducer Pattern */}
			{currentChapter === 1 && (
				<ChapterOne state={state} dispatch={dispatch} />
			)}

			{/* Chapter 2: Redux */}
			{currentChapter === 2 && (
				<ChapterTwo
					storeState={storeState}
					dispatchAction={dispatchAction}
				/>
			)}

			{/* Chapter 3: Modern State Management */}
			{currentChapter === 3 && (
				<ChapterThree
					activeLibrary={activeLibrary}
					switchLibrary={switchLibrary}
					stateCount={stateCount}
					updateState={updateState}
				/>
			)}

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='state-management'
				lessonId='state-management-adventures'
			/>
		</div>
	);
}

export default StateManagementAdventures;
