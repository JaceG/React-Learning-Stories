import React, { useReducer } from 'react';

// Initial state for our adventure
const initialState = {
	gold: 10,
	items: {
		potions: 2,
		weapons: [{ name: 'Wooden Sword', power: 5 }],
	},
	status: 'Ready for adventure',
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
			if (state.items.potions <= 0) {
				return state;
			}
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

const ChapterOne = () => {
	const [state, dispatch] = useReducer(inventoryReducer, initialState);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Reducer's Quest</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the land of Complexia, a realm of interconnected villages
					and intricate state machines, there lived a wise elder named{' '}
					<strong>Reducer</strong>. Unlike the simple useState wizards
					of neighboring lands, Reducer had mastered a powerful
					technique for managing complex state transformations through
					pure, predictable actions.
				</p>

				<div className='realm-illustration'>
					<div className='state-castle'>
						<div className='castle-banner'>Current State</div>
						<div className='state-display'>
							<pre>{`${JSON.stringify(state, null, 2)}`}</pre>
						</div>
					</div>
					<div className='action-path'></div>
					<div className='reducer-temple'>
						<div className='temple-banner'>Reducer</div>
						<div className='temple-inscription'>
							(state, action) =&gt; newState
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"State changes can become chaotic and unpredictable," warned
					Elder <strong>Reducer</strong>. "But by channeling all
					changes through a single, pure function that takes the
					current state and an action, we can create a system that is
					both powerful and predictable."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Treasure Inventory
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Manage the adventurer's inventory using the reducer
							pattern! Try different actions to see how the
							reducer maintains a predictable state based on each
							action.
						</strong>
					</p>
				</div>

				<div className='inventory-controls'>
					<div className='inventory-display'>
						<h4>Adventurer's Inventory</h4>
						<div className='inventory-stats'>
							<div className='stat'>Gold: {state.gold}</div>
							<div className='stat'>
								Health Potions: {state.items.potions}
							</div>
							<div className='stat'>
								Weapons: {state.items.weapons.length}
							</div>
							<div className='stat'>Status: {state.status}</div>
						</div>
					</div>

					<div className='action-buttons'>
						<button
							className='action-button'
							onClick={() =>
								dispatch({ type: 'ADD_GOLD', payload: 10 })
							}>
							Find Gold (+10)
						</button>
						<button
							className='action-button'
							onClick={() =>
								dispatch({
									type: 'BUY_POTION',
									payload: { cost: 5 },
								})
							}
							disabled={state.gold < 5}>
							Buy Potion (Cost: 5 Gold)
						</button>
						<button
							className='action-button'
							onClick={() =>
								dispatch({
									type: 'ADD_WEAPON',
									payload: { name: 'Magic Sword', power: 15 },
								})
							}>
							Find Magic Sword
						</button>
						<button
							className='action-button'
							onClick={() => dispatch({ type: 'USE_POTION' })}
							disabled={state.items.potions <= 0}>
							Use Health Potion
						</button>
						<button
							className='action-button danger'
							onClick={() => dispatch({ type: 'RESET' })}>
							Reset Adventure
						</button>
					</div>
				</div>

				<div className='action-log'>
					<h4>Reducer in Action</h4>
					<pre className='reducer-code'>
						{`// This is our reducer function
function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_GOLD':
      return {
        ...state,
        gold: state.gold + action.payload
      };
      
    case 'BUY_POTION':
      // Only allow purchase if enough gold
      if (state.gold < action.payload.cost) {
        return state;
      }
      return {
        ...state,
        gold: state.gold - action.payload.cost,
        items: {
          ...state.items,
          potions: state.items.potions + 1
        },
        status: 'Ready for adventure!'
      };
      
    case 'ADD_WEAPON':
      return {
        ...state,
        items: {
          ...state.items,
          weapons: [...state.items.weapons, action.payload]
        }
      };
      
    case 'USE_POTION':
      // Only allow usage if potions are available
      if (state.items.potions <= 0) {
        return state;
      }
      return {
        ...state,
        items: {
          ...state.items,
          potions: state.items.potions - 1
        },
        status: 'Feeling healthy!'
      };
      
    case 'RESET':
      return {
        gold: 0,
        items: {
          potions: 0,
          weapons: []
        },
        status: 'Beginning new adventure'
      };
      
    default:
      return state;
  }
}`}
					</pre>
				</div>
			</div>

			<div className='code-example'>
				<h3>Using useReducer in a Component:</h3>
				<pre className='component-code'>
					{`import React, { useReducer } from 'react';

// Initial state for our adventure
const initialState = {
  gold: 0,
  items: {
    potions: 0,
    weapons: []
  },
  status: 'Beginning new adventure'
};

// Our reducer function (simplified version)
function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_GOLD':
      return { ...state, gold: state.gold + action.payload };
    case 'BUY_POTION':
      if (state.gold < action.payload.cost) return state;
      return {
        ...state,
        gold: state.gold - action.payload.cost,
        items: { ...state.items, potions: state.items.potions + 1 }
      };
    // ... other cases
    default:
      return state;
  }
}

function AdventurerInventory() {
  // Set up the reducer with initial state
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  
  return (
    <div>
      <h2>Adventurer's Inventory</h2>
      <p>Gold: {state.gold}</p>
      <p>Potions: {state.items.potions}</p>
      
      <button 
        onClick={() => dispatch({ type: 'ADD_GOLD', payload: 10 })}
      >
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

			<div className='common-patterns'>
				<h3>Common Reducer Patterns:</h3>
				<div className='pattern'>
					<h4>1. Action Creators</h4>
					<pre className='pattern-code'>
						{`// Instead of dispatching action objects directly:
dispatch({ type: 'ADD_GOLD', payload: 10 });

// Create functions that return action objects:
function addGold(amount) {
  return { type: 'ADD_GOLD', payload: amount };
}

// Then use them:
dispatch(addGold(10));`}
					</pre>
				</div>
				<div className='pattern'>
					<h4>2. Multiple Reducers with combineReducers</h4>
					<pre className='pattern-code'>
						{`// Split large reducers into smaller ones
function itemsReducer(state = initialItemsState, action) {
  // Handle only item-related actions
}

function goldReducer(state = initialGoldState, action) {
  // Handle only gold-related actions
}

// Combine them
function rootReducer(state = {}, action) {
  return {
    items: itemsReducer(state.items, action),
    gold: goldReducer(state.gold, action)
  };
}`}
					</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Reducer Lesson:</h3>
				<p>
					A reducer is a pure function that takes the current state
					and an action, and returns a new state. This pattern makes
					state transitions explicit and predictable, which is
					especially valuable for complex state logic.
				</p>
				<p>
					The useReducer hook is built into React and provides an
					alternative to useState when you have complex state logic.
					It's particularly useful when:
				</p>
				<ul>
					<li>Next state depends on previous state</li>
					<li>State contains multiple sub-values</li>
					<li>State transitions follow complex business logic</li>
					<li>Actions need to trigger multiple state changes</li>
				</ul>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the adventure inventory metaphor help you
					understand the concept of reducers in React?
				</p>
				<p>
					Can you think of a real-world application where using a
					reducer would be better than simple useState hooks?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
