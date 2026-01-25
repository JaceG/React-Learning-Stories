import React, { useReducer, createContext, useContext, useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';

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

function ChapterTwo() {
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

	const content = (
		<>
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The Symphony Conductor - Advanced State Orchestration'
				bridge='Pattern Weaver Synthesis led Aria deeper into the Integration Sanctum, where the energy streams formed even more intricate patterns. Here, massive crystalline structures pulsed with synchronized data flows, each one representing a different state management pattern.'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"You've mastered individual hook orchestration," Synthesis began, gesturing 
					to a particularly complex crystal formation. "Now witness how we manage 
					state across entire applications. This is the <strong>Grand Symphony 
					Pattern</strong>!"
				</p>
				
				<p className='story-paragraph'>
					Binary's processors whirred with anticipation, detecting the familiar patterns 
					of useReducer combined with Context in ways it had never seen before.
				</p>
				
				<p className='story-paragraph'>
					"When your application grows beyond simple state," Synthesis explained, 
					weaving energy streams together, "you need patterns that scale. UseReducer 
					brings predictable state updates through actions, while Context distributes 
					that state throughout your component tree."
				</p>
				
				<p className='story-paragraph'>
					"Like a conductor managing an entire orchestra?" Aria suggested, seeing 
					the pattern emerge.
				</p>
				
				<p className='story-paragraph'>
					"Exactly! Each section plays its part," Synthesis smiled, "but they all 
					follow the conductor's lead. Let me show you the Kingdom Management System - 
					a perfect demonstration of this pattern!"
				</p>

				<div className='symphony-visualization'>
					<div className='orchestra-layout'>
						<div className='conductor-podium'>
							<div className='conductor'>🎼 useReducer</div>
							<div className='baton'>Actions & Dispatch</div>
						</div>
						<div className='orchestra-sections'>
							<div className='section'>🎻 State Context</div>
							<div className='section'>🎺 Dispatch Context</div>
							<div className='section'>🥁 Components</div>
						</div>
					</div>
				</div>

			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Kingdom Management Symphony
				</h3>
				<InstructionBox character='Experience how useReducer and Context work together to orchestrate complex state management across an entire kingdom!'>
					Add knights, assign quests, and watch the kingdom treasury grow.
				</InstructionBox>

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
				<h3>Symphony Patterns in Practice:</h3>
				<div className='pattern-showcase'>
					<div className='pattern-example'>
						<h4>1. Split Context Pattern</h4>
						<p>Optimize performance by separating state and dispatch</p>
						<pre className='mini-code'>
							{`// State Context for reading
const StateContext = createContext();
// Dispatch Context for updating
const DispatchContext = createContext();

// Components using only dispatch don't re-render
const ActionButton = () => {
  const dispatch = useContext(DispatchContext);
  return <button onClick={() => dispatch(action)}>Act</button>;
};`}
						</pre>
					</div>
					<div className='pattern-example'>
						<h4>2. Action Creators Pattern</h4>
						<p>Encapsulate complex action logic</p>
						<pre className='mini-code'>
							{`const useKingdomActions = () => {
  const dispatch = useContext(DispatchContext);
  
  return {
    addKnight: (knight) => 
      dispatch({ type: 'ADD_KNIGHT', payload: knight }),
    levelUp: (id) => 
      dispatch({ type: 'LEVEL_UP', payload: id })
  };
};`}
						</pre>
					</div>
					<div className='pattern-example'>
						<h4>3. Middleware Pattern</h4>
						<p>Add logging, async handling, or validation</p>
						<pre className='mini-code'>
							{`const enhancedDispatch = (action) => {
  console.log('Action:', action);
  const newState = reducer(state, action);
  console.log('New State:', newState);
  return dispatch(action);
};`}
						</pre>
					</div>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'Symphony Pattern Mastery:',
					content: "Master complex state orchestration with useReducer + Context. This pattern excels when state has multiple sub-values, complex update logic, or when many components need access. UseReducer provides predictable updates through actions (like Redux but built-in), while Context eliminates prop drilling. Split contexts optimize performance - components reading state use StateContext, those dispatching use DispatchContext. Action creators encapsulate business logic. This scales to medium-large apps without external dependencies. Remember: actions describe \"what happened,\" reducers determine \"how state changes.\""
				}}
				reflectionQuestions={[
					'How does the orchestra metaphor illuminate the relationship between useReducer and Context?',
					'What makes actions more predictable than direct state mutations?',
					'When would this pattern be overkill versus necessary?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 19 (Afternoon)",
					content: "The Symphony Pattern revealed how to manage complex state at scale! Synthesis showed me the Kingdom Management System - useReducer acts as the conductor, processing actions into state changes with perfect predictability. Context distributes this state throughout the component tree like sheet music to orchestra sections. The split context pattern was brilliant: separate contexts for state and dispatch prevent unnecessary re-renders. Components that only dispatch actions don't re-render when state changes! This pattern scales beautifully - from managing a few knights to entire kingdoms. The key: think in actions, not setState calls!"
				}}
			/>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterTwo;