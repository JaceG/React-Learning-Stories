import { useReducer, createContext, useContext, useState } from 'react';

// Create contexts
const StateContext = createContext();
const DispatchContext = createContext();

// Action types
const ACTIONS = {
	ADD_KNIGHT: 'ADD_KNIGHT',
	REMOVE_KNIGHT: 'REMOVE_KNIGHT',
	LEVEL_UP_KNIGHT: 'LEVEL_UP_KNIGHT',
	ASSIGN_QUEST: 'ASSIGN_QUEST',
	COMPLETE_QUEST: 'COMPLETE_QUEST',
	SET_KINGDOM_GOLD: 'SET_KINGDOM_GOLD',
	RESET_KINGDOM: 'RESET_KINGDOM'
};

// Reducer function
const kingdomReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD_KNIGHT:
			return {
				...state,
				knights: [...state.knights, action.payload],
				totalKnights: state.totalKnights + 1
			};
		
		case ACTIONS.REMOVE_KNIGHT:
			return {
				...state,
				knights: state.knights.filter(knight => knight.id !== action.payload),
				totalKnights: state.totalKnights - 1
			};
		
		case ACTIONS.LEVEL_UP_KNIGHT:
			return {
				...state,
				knights: state.knights.map(knight =>
					knight.id === action.payload
						? { ...knight, level: knight.level + 1 }
						: knight
				)
			};
		
		case ACTIONS.ASSIGN_QUEST:
			return {
				...state,
				knights: state.knights.map(knight =>
					knight.id === action.payload.knightId
						? { ...knight, quest: action.payload.quest, onQuest: true }
						: knight
				),
				activeQuests: state.activeQuests + 1
			};
		
		case ACTIONS.COMPLETE_QUEST:
			const knight = state.knights.find(k => k.id === action.payload);
			const goldReward = knight?.quest?.reward || 0;
			
			return {
				...state,
				knights: state.knights.map(k =>
					k.id === action.payload
						? { ...k, quest: null, onQuest: false, questsCompleted: k.questsCompleted + 1 }
						: k
				),
				gold: state.gold + goldReward,
				activeQuests: state.activeQuests - 1,
				completedQuests: state.completedQuests + 1
			};
		
		case ACTIONS.SET_KINGDOM_GOLD:
			return {
				...state,
				gold: action.payload
			};
		
		case ACTIONS.RESET_KINGDOM:
			return {
				knights: [
					{ id: 1, name: 'Sir Lancelot', level: 5, onQuest: false, quest: null, questsCompleted: 3 },
					{ id: 2, name: 'Sir Gawain', level: 3, onQuest: false, quest: null, questsCompleted: 1 }
				],
				gold: 1000,
				totalKnights: 2,
				activeQuests: 0,
				completedQuests: 4
			};
		
		default:
			return state;
	}
};

// Provider component
const KingdomProvider = ({ children }) => {
	const [state, dispatch] = useReducer(kingdomReducer, {
		knights: [
			{ id: 1, name: 'Sir Lancelot', level: 5, onQuest: false, quest: null, questsCompleted: 3 },
			{ id: 2, name: 'Sir Gawain', level: 3, onQuest: false, quest: null, questsCompleted: 1 }
		],
		gold: 1000,
		totalKnights: 2,
		activeQuests: 0,
		completedQuests: 4
	});

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

// Custom hooks for using the context
const useKingdomState = () => {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error('useKingdomState must be used within KingdomProvider');
	}
	return context;
};

const useKingdomDispatch = () => {
	const context = useContext(DispatchContext);
	if (!context) {
		throw new Error('useKingdomDispatch must be used within KingdomProvider');
	}
	return context;
};

// Hook that combines state and actions
const useKingdom = () => {
	const state = useKingdomState();
	const dispatch = useKingdomDispatch();

	const actions = {
		addKnight: (knight) => dispatch({ type: ACTIONS.ADD_KNIGHT, payload: knight }),
		removeKnight: (id) => dispatch({ type: ACTIONS.REMOVE_KNIGHT, payload: id }),
		levelUpKnight: (id) => dispatch({ type: ACTIONS.LEVEL_UP_KNIGHT, payload: id }),
		assignQuest: (knightId, quest) => dispatch({ 
			type: ACTIONS.ASSIGN_QUEST, 
			payload: { knightId, quest } 
		}),
		completeQuest: (knightId) => dispatch({ type: ACTIONS.COMPLETE_QUEST, payload: knightId }),
		setGold: (amount) => dispatch({ type: ACTIONS.SET_KINGDOM_GOLD, payload: amount }),
		resetKingdom: () => dispatch({ type: ACTIONS.RESET_KINGDOM })
	};

	return { ...state, ...actions };
};

const ChapterTwo = () => {
	const [newKnightName, setNewKnightName] = useState('');

	// Component that uses the kingdom state
	const KingdomDashboard = () => {
		const kingdom = useKingdom();

		const availableQuests = [
			{ name: 'Dragon Slaying', reward: 500, difficulty: 'Hard' },
			{ name: 'Rescue Princess', reward: 300, difficulty: 'Medium' },
			{ name: 'Find Holy Grail', reward: 1000, difficulty: 'Legendary' }
		];

		const handleAddKnight = () => {
			if (newKnightName.trim()) {
				const newKnight = {
					id: Date.now(),
					name: newKnightName,
					level: 1,
					onQuest: false,
					quest: null,
					questsCompleted: 0
				};
				kingdom.addKnight(newKnight);
				setNewKnightName('');
			}
		};

		return (
			<div className='kingdom-dashboard'>
				<div className='kingdom-stats'>
					<div className='stat-card gold'>
						<h4>Kingdom Treasury</h4>
						<div className='stat-value'>💰 {kingdom.gold} Gold</div>
					</div>
					<div className='stat-card knights'>
						<h4>Total Knights</h4>
						<div className='stat-value'>⚔️ {kingdom.totalKnights}</div>
					</div>
					<div className='stat-card quests'>
						<h4>Active Quests</h4>
						<div className='stat-value'>📜 {kingdom.activeQuests}</div>
					</div>
					<div className='stat-card completed'>
						<h4>Completed Quests</h4>
						<div className='stat-value'>✅ {kingdom.completedQuests}</div>
					</div>
				</div>

				<div className='knight-management'>
					<h4>Knight Roster</h4>
					<div className='add-knight-form'>
						<input
							type='text'
							value={newKnightName}
							onChange={(e) => setNewKnightName(e.target.value)}
							placeholder='Enter knight name'
							className='knight-input'
						/>
						<button onClick={handleAddKnight} className='add-button'>
							Add Knight
						</button>
					</div>

					<div className='knights-list'>
						{kingdom.knights.map(knight => (
							<div key={knight.id} className='knight-card'>
								<div className='knight-info'>
									<h5>{knight.name}</h5>
									<div className='knight-stats'>
										<span>Level: {knight.level}</span>
										<span>Quests: {knight.questsCompleted}</span>
									</div>
								</div>
								
								<div className='knight-actions'>
									{!knight.onQuest ? (
										<>
											<button 
												onClick={() => kingdom.levelUpKnight(knight.id)}
												className='action-button level-up'>
												Level Up
											</button>
											<select 
												onChange={(e) => {
													const quest = availableQuests[e.target.value];
													if (quest) {
														kingdom.assignQuest(knight.id, quest);
													}
												}}
												className='quest-select'>
												<option value=''>Assign Quest</option>
												{availableQuests.map((quest, idx) => (
													<option key={idx} value={idx}>
														{quest.name} ({quest.reward}g)
													</option>
												))}
											</select>
										</>
									) : (
										<div className='quest-info'>
											<span>On Quest: {knight.quest.name}</span>
											<button 
												onClick={() => kingdom.completeQuest(knight.id)}
												className='action-button complete'>
												Complete Quest
											</button>
										</div>
									)}
									<button 
										onClick={() => kingdom.removeKnight(knight.id)}
										className='action-button remove'>
										Dismiss
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div style={{textAlign: 'center', marginTop: '30px'}}>
					<button 
						className='reset-button'
						onClick={() => {
							kingdom.resetKingdom();
							setNewKnightName('');
						}}
					>
						Reset Kingdom
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: State Management Patterns - The Kingdom's Grand Registry
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the heart of React Kingdom stood the <strong>Grand Registry</strong>, 
					a magical tower where all the kingdom's state was managed. The wise 
					<strong>Chancellor Redux</strong> had long overseen this registry, but 
					recently, two new advisors had arrived: <strong>useReducer</strong> and 
					<strong>Context</strong>, bringing new patterns of state management that 
					were both powerful and elegant.
				</p>

				<div className='registry-visualization'>
					<div className='registry-tower'>
						<div className='tower-level'>Context Provider</div>
						<div className='tower-level'>useReducer</div>
						<div className='tower-level'>State & Dispatch</div>
						<div className='tower-level'>Components</div>
					</div>
					<div className='data-flow'>
						<span className='flow-arrow'>↓</span>
						<span className='flow-label'>State flows down</span>
						<span className='flow-arrow'>↑</span>
						<span className='flow-label'>Actions flow up</span>
					</div>
				</div>

				<p className='story-paragraph'>
					"Behold," proclaimed Chancellor Redux, "with useReducer, we can manage 
					complex state transitions through actions and reducers. When combined with 
					Context, this pattern allows any component in the kingdom to access and 
					modify the state, creating a unified system of governance!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Kingdom Management System
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience a mini state management system using useReducer and Context 
							to manage the kingdom's knights, quests, and treasury!
						</strong>
					</p>
				</div>

				<KingdomProvider>
					<KingdomDashboard />
				</KingdomProvider>

				<div className='code-visualization'>
					<h4>The State Management Architecture</h4>
					<pre className='magical-code'>
						{`// Define action types
const ACTIONS = {
  ADD_KNIGHT: 'ADD_KNIGHT',
  LEVEL_UP_KNIGHT: 'LEVEL_UP_KNIGHT',
  ASSIGN_QUEST: 'ASSIGN_QUEST',
  COMPLETE_QUEST: 'COMPLETE_QUEST'
};

// Create the reducer
function kingdomReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_KNIGHT:
      return {
        ...state,
        knights: [...state.knights, action.payload],
        totalKnights: state.totalKnights + 1
      };
    
    case ACTIONS.COMPLETE_QUEST:
      const knight = state.knights.find(k => k.id === action.payload);
      const reward = knight?.quest?.reward || 0;
      
      return {
        ...state,
        knights: state.knights.map(k =>
          k.id === action.payload
            ? { ...k, quest: null, onQuest: false }
            : k
        ),
        gold: state.gold + reward,
        activeQuests: state.activeQuests - 1
      };
    
    default:
      return state;
  }
}

// Create contexts for state and dispatch
const StateContext = createContext();
const DispatchContext = createContext();

// Provider component
function KingdomProvider({ children }) {
  const [state, dispatch] = useReducer(kingdomReducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hook for easy access
function useKingdom() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  
  // Create action creators
  const actions = {
    addKnight: (knight) => 
      dispatch({ type: ACTIONS.ADD_KNIGHT, payload: knight }),
    completeQuest: (knightId) => 
      dispatch({ type: ACTIONS.COMPLETE_QUEST, payload: knightId })
  };
  
  return { ...state, ...actions };
}`}
					</pre>
				</div>
			</div>

			<div className='practical-application'>
				<h3>Advanced State Patterns:</h3>
				<div className='pattern-examples'>
					<div className='pattern-card'>
						<h4>1. Split Contexts Pattern</h4>
						<p>Separate state and dispatch contexts to optimize re-renders</p>
						<pre className='example-code'>
							{`// Components that only dispatch don't re-render
const Button = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(action)}>Click</button>;
};`}
						</pre>
					</div>
					<div className='pattern-card'>
						<h4>2. Action Creators Pattern</h4>
						<p>Encapsulate action creation logic</p>
						<pre className='example-code'>
							{`const useActions = () => {
  const dispatch = useDispatch();
  return {
    addItem: (item) => dispatch({ type: 'ADD', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE', payload: id })
  };
};`}
						</pre>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The State Management Lesson:</h3>
				<p>
					The combination of useReducer and Context provides a powerful pattern 
					for managing complex application state without external libraries. 
					useReducer excels at handling state with multiple sub-values and complex 
					update logic, while Context makes this state accessible throughout your 
					component tree. This pattern scales well for medium-sized applications 
					and provides predictable state updates through actions, making debugging 
					easier and state changes more traceable.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the Grand Registry metaphor help you understand centralized 
					state management? Consider how actions flow up and state flows down 
					in this pattern.
				</p>
				<p>
					When would you choose this pattern over simpler state management 
					solutions? Think about the trade-offs between complexity and power.
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;