import React, { useReducer } from 'react';

// Initial state for our adventure
const initialState = {
	gold: 10,
	items: {
		potions: 2,
		weapons: [{ name: 'Training Staff', power: 5 }],
	},
	status: 'Ready for the challenge',
};

// Our reducer function
function inventoryReducer(state, action) {
	switch (action.type) {
		case 'ADD_GOLD':
			return {
				...state,
				gold: state.gold + action.payload,
			};
		case 'BUY_POTION':
			if (state.gold < action.payload.cost) {
				return state;
			}
			return {
				...state,
				gold: state.gold - action.payload.cost,
				items: {
					...state.items,
					potions: state.items.potions + 1,
				},
				status: 'Potion acquired!',
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
			if (state.items.potions <= 0) {
				return state;
			}
			return {
				...state,
				items: {
					...state.items,
					potions: state.items.potions - 1,
				},
				status: 'Restored by potion!',
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}

const ChapterOne = () => {
	const [state, dispatch] = useReducer(inventoryReducer, initialState);
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [loadingAction, setLoadingAction] = React.useState(null);

	// Handle actions with visual feedback
	const handleAction = async (action, actionName = null) => {
		if (actionName) {
			setLoadingAction(actionName);
		}
		setIsUpdating(true);

		// Simulate async action
		await new Promise((resolve) => setTimeout(resolve, 300));

		dispatch(action);

		// Show update animation
		setTimeout(() => {
			setIsUpdating(false);
			setLoadingAction(null);

			// Show success animation for certain actions
			if (action.type === 'ADD_GOLD' || action.type === 'ADD_WEAPON') {
				const button = document.querySelector(
					`.action-button:nth-child(${
						actionName === 'gold'
							? 1
							: actionName === 'weapon'
							? 3
							: 0
					})`
				);
				if (button) {
					button.classList.add('success');
					setTimeout(() => button.classList.remove('success'), 1000);
				}
			}
		}, 500);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Reducer's Challenge</h2>

			<div className='chapter-bridge'>
				<p>The State Management Citadel's grand entrance led to a vast chamber 
				where an elderly figure sat meditating. His robes bore patterns that 
				shifted like flowing data, and his eyes held the wisdom of countless 
				state transformations.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Welcome, Aria," the figure spoke without opening his eyes. "I am 
					<strong>Grand Reducer</strong>, keeper of predictable state transformations. 
					You've learned to manage simple state, but what happens when state becomes 
					complex, interconnected, and governed by intricate rules?"
				</p>

				<p className='story-paragraph'>
					Binary whirred thoughtfully. "Simple useState would get messy with all 
					those connections!"
				</p>

				<p className='story-paragraph'>
					"Precisely," Grand Reducer smiled. "That's why we use the reducer pattern. 
					Instead of many separate state updates, we channel all changes through a 
					single, pure function. Watch and learn."
				</p>

				<div className='character-intro'>
					<h4>Grand Reducer</h4>
					<p>Master of predictable state transformations. He teaches that complex 
					state changes should flow through a single, pure function that takes the 
					current state and an action, always returning a new state.</p>
				</div>

				<div className='realm-illustration'>
					<div className='state-castle'>
						<div className='castle-banner'>Current State</div>
						<div
							className={`state-display ${
								isUpdating ? 'updating' : ''
							}`}>
							<pre>{`${JSON.stringify(state, null, 2)}`}</pre>
						</div>
					</div>
					<div className='action-path'></div>
					<div className='reducer-temple'>
						<div className='temple-banner'>Reducer Function</div>
						<div className='temple-inscription'>
							(state, action) =&gt; newState
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Your first challenge," Grand Reducer announced, "is to manage an 
					adventurer's inventory. Multiple items, different actions, complex 
					rules - all flowing through one reducer function. This is how real 
					applications handle sophisticated state!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Challenge: The Inventory Management Trial
				</h3>
				<p className='instruction'>
					<strong>👉 Grand Reducer gestures to a glowing interface.</strong>
					"Manage this inventory using different actions. Notice how the reducer 
					maintains consistency and predictability, no matter how complex the 
					state becomes!"
				</p>

				<div className='inventory-controls'>
					<div className='inventory-display'>
						<h4>Aria's Trial Inventory</h4>
						<div className='inventory-stats'>
							<div className={`stat ${isUpdating && 'updating'}`}>
								Gold: {state.gold}
							</div>
							<div className={`stat ${isUpdating && 'updating'}`}>
								Health Potions: {state.items.potions}
							</div>
							<div className={`stat ${isUpdating && 'updating'}`}>
								Weapons: {state.items.weapons.length}
							</div>
							<div className={`stat ${isUpdating && 'updating'}`}>
								Status: {state.status}
							</div>
						</div>
					</div>

					<div className='action-buttons'>
						<button
							className={`action-button ${
								loadingAction === 'gold' ? 'loading' : ''
							}`}
							onClick={() =>
								handleAction(
									{ type: 'ADD_GOLD', payload: 10 },
									'gold'
								)
							}
							disabled={loadingAction !== null}>
							Find Gold (+10)
						</button>
						<button
							className={`action-button ${
								loadingAction === 'potion' ? 'loading' : ''
							}`}
							onClick={() =>
								handleAction(
									{
										type: 'BUY_POTION',
										payload: { cost: 5 },
									},
									'potion'
								)
							}
							disabled={state.gold < 5 || loadingAction !== null}>
							Buy Potion (Cost: 5 Gold)
						</button>
						<button
							className={`action-button ${
								loadingAction === 'weapon' ? 'loading' : ''
							}`}
							onClick={() =>
								handleAction(
									{
										type: 'ADD_WEAPON',
										payload: {
											name: 'Enchanted Blade',
											power: 15,
										},
									},
									'weapon'
								)
							}
							disabled={loadingAction !== null}>
							Find Enchanted Blade
						</button>
						<button
							className={`action-button ${
								loadingAction === 'use' ? 'loading' : ''
							}`}
							onClick={() =>
								handleAction({ type: 'USE_POTION' }, 'use')
							}
							disabled={
								state.items.potions <= 0 ||
								loadingAction !== null
							}>
							Use Health Potion
						</button>
						<button
							className={`action-button danger ${
								loadingAction === 'reset' ? 'loading' : ''
							}`}
							onClick={() =>
								handleAction({ type: 'RESET' }, 'reset')
							}>
							Reset Inventory
						</button>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"See how each action flows through the reducer?" Grand Reducer explained 
					as Aria experimented. "The reducer examines the action type and payload, 
					then returns a new state. It never modifies the existing state - always 
					creates new!"
				</p>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>The Reducer Pattern</span>
					<span className='discovered-by'>Grand Reducer's Teachings</span>
				</div>
				<pre>
					{`// useReducer: When state logic becomes complex
import React, { useReducer } from 'react';

// Define initial state structure
const initialState = {
  gold: 0,
  items: {
    potions: 0,
    weapons: []
  },
  status: 'Starting adventure'
};

// The reducer function - pure and predictable
function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_GOLD':
      return { 
        ...state, 
        gold: state.gold + action.payload 
      };
      
    case 'BUY_POTION':
      // Business logic lives in the reducer
      if (state.gold < action.payload.cost) return state;
      
      return {
        ...state,
        gold: state.gold - action.payload.cost,
        items: { 
          ...state.items, 
          potions: state.items.potions + 1 
        }
      };
      
    case 'ADD_WEAPON':
      return {
        ...state,
        items: {
          ...state.items,
          weapons: [...state.items.weapons, action.payload]
        }
      };
      
    default:
      return state; // Always return current state for unknown actions
  }
}

// Using the reducer in a component
function InventoryManager() {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  
  return (
    <div>
      <p>Gold: {state.gold}</p>
      <p>Potions: {state.items.potions}</p>
      
      {/* Dispatch actions to trigger state changes */}
      <button onClick={() => dispatch({ type: 'ADD_GOLD', payload: 10 })}>
        Find Gold
      </button>
      
      <button 
        onClick={() => dispatch({ 
          type: 'BUY_POTION', 
          payload: { cost: 5 } 
        })}
        disabled={state.gold < 5}
      >
        Buy Potion
      </button>
    </div>
  );
}`}
				</pre>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 11 (Morning)</h4>
					<p>The reducer pattern is brilliant! Instead of managing multiple 
					useState calls that could conflict, everything flows through one 
					function. It's like having a wise sage who knows all the rules and 
					ensures every state change follows them perfectly. Grand Reducer 
					showed me how this prevents bugs and makes complex state predictable!</p>
				</div>
			</div>

			<div className='common-patterns'>
				<h3>Grand Reducer's Advanced Patterns:</h3>
				<div className='pattern'>
					<h4>1. Action Creators for Cleaner Code</h4>
					<pre className='pattern-code'>
						{`// Instead of inline action objects:
dispatch({ type: 'ADD_GOLD', payload: 10 });

// Create action creator functions:
const actions = {
  addGold: (amount) => ({ type: 'ADD_GOLD', payload: amount }),
  buyPotion: (cost) => ({ type: 'BUY_POTION', payload: { cost } }),
  addWeapon: (weapon) => ({ type: 'ADD_WEAPON', payload: weapon })
};

// Clean usage:
dispatch(actions.addGold(10));
dispatch(actions.buyPotion(5));`}
					</pre>
				</div>
				<div className='pattern'>
					<h4>2. Combining Multiple Reducers</h4>
					<pre className='pattern-code'>
						{`// Split complex reducers into focused ones
function itemsReducer(state = {}, action) {
  // Handle only item-related actions
}

function statsReducer(state = {}, action) {
  // Handle only stat-related actions
}

// Combine them manually
function rootReducer(state = {}, action) {
  return {
    items: itemsReducer(state.items, action),
    stats: statsReducer(state.stats, action)
  };
}`}
					</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>Grand Reducer's Wisdom:</h3>
				<p>
					The useReducer hook shines when your state logic becomes complex. 
					Unlike useState, which is perfect for independent values, useReducer 
					excels when state updates depend on multiple values or follow complex 
					business rules. The key benefits are predictability (same action always 
					produces same result), testability (reducers are pure functions), and 
					maintainability (all state logic in one place). Use it when your 
					component feels like it has too many useState calls or when state 
					updates have intricate dependencies.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does channeling all state changes through a single reducer 
					function help manage complexity?
				</p>
				<p>
					Can you think of an application feature that would benefit from 
					the predictability of the reducer pattern?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;