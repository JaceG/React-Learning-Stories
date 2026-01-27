import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		guardedTypes,
		createGuard,
		selectedGuard,
		selectGuard,
		towerLevel,
		levelUp,
		guardStrength,
		setGuardStrength
	} = useOutletContext();

	const [migrationStrategies, setMigrationStrategies] = useState([]);
	const [selectedStrategy, setSelectedStrategy] = useState(null);
	const [towerComplete, setTowerComplete] = useState(false);
	const [migrationProgress, setMigrationProgress] = useState(0);

	// Migration patterns
	const migrationPatterns = [
		{
			id: 'gradual-migration',
			name: 'Gradual Migration',
			icon: '🔄',
			description: 'Convert file by file with allowJs',
			approach: 'Low risk, steady progress',
			difficulty: 'Beginner'
		},
		{
			id: 'strict-boundaries',
			name: 'Strict Boundaries',
			icon: '🚧',
			description: 'Type boundaries between JS and TS',
			approach: 'Clear separation, type safety',
			difficulty: 'Intermediate'
		},
		{
			id: 'declaration-files',
			name: 'Declaration Files',
			icon: '📜',
			description: 'Type existing JavaScript libraries',
			approach: 'Maintain compatibility',
			difficulty: 'Advanced'
		},
		{
			id: 'codemod-automation',
			name: 'Automated Codemods',
			icon: '🤖',
			description: 'Tool-assisted migration',
			approach: 'Fast transformation',
			difficulty: 'Expert'
		}
	];

	// Real-world challenges
	const migrationChallenges = [
		{
			id: 'legacy-codebase',
			name: 'Legacy React App',
			description: 'Migrate a 5-year-old React codebase to TypeScript',
			size: 'Large',
			reward: 'Migration Master'
		},
		{
			id: 'third-party-libs',
			name: 'Untyped Dependencies',
			description: 'Handle libraries without type definitions',
			size: 'Medium',
			reward: 'Type Author'
		},
		{
			id: 'dynamic-patterns',
			name: 'Dynamic JavaScript',
			description: 'Type highly dynamic JavaScript patterns',
			size: 'Complex',
			reward: 'Pattern Transformer'
		},
		{
			id: 'team-migration',
			name: 'Team Migration Strategy',
			description: 'Migrate with a team of varying TS experience',
			size: 'Organization',
			reward: 'Migration Leader'
		}
	];

	// Learn migration strategy
	const learnStrategy = (strategy) => {
		if (!migrationStrategies.find(s => s.id === strategy.id)) {
			setMigrationStrategies([...migrationStrategies, strategy]);
			setSelectedStrategy(strategy);
			setGuardStrength(100);
			setMigrationProgress(prev => Math.min(100, prev + 25));
			
			if (migrationStrategies.length >= 2) {
				levelUp('commander');
			}
		}
	};

	// Complete migration challenge
	const completeMigrationChallenge = (challenge) => {
		createGuard({
			id: Date.now(),
			name: challenge.name,
			type: 'migration',
			reward: challenge.reward
		});
		
		if (guardedTypes.filter(g => g.type === 'migration').length >= 3) {
			setTowerComplete(true);
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`Migration Mastery`}
				bridge={`Commander Guardia led Aria to the tower's pinnacle, where the entire TypeScript realm spread before them. "You've mastered both foundation and advanced guards," she said proudly. "Now comes the ultimate challenge - not protecting new code, but transforming the old. Many kingdoms still speak JavaScript. Your mission: guide them to safety."`}
			/>

		<StorySection
			paragraphs={[
				`The chamber displayed countless JavaScript codebases, each representing a different migration challenge. "Migration," Guardia explained, "is not just about adding types. It's about transformation without breaking trust."`,
				<><strong>Binary</strong> calculated the scope. "Millions of lines of JavaScript... but with the right strategy, we can type them all safely!"</>,
				<><strong>Debuggora</strong> studied the migration paths. "Each codebase needs its own approach. There's no one-size-fits-all solution."</>,
				`"The true test of a Type Guard," Guardia declared, "is not just protecting new code, but safely transforming the old. Master this, and you become a true guardian of type safety."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Migration Strategies</h3>

				<InstructionBox character={`Commander Guardia presents four migration strategies, each suited to different scenarios.`}>
					{`"Every JavaScript codebase is unique. Learn each strategy, then prove your mastery against real-world migration challenges. Complete three challenges to become a Tower Legend!"`}
				</InstructionBox>
				
				<div style={{ 
					background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1))', 
					padding: '20px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(155, 89, 182, 0.3)',
					textAlign: 'center'
				}}>
					{towerLevel === 'commander' ? (
						<div>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>
								🏰 <strong style={{ color: '#9b59b6' }}>Master Guardian</strong> 🏰
							</div>
							<p style={{ color: '#8e44ad' }}>
								You've reached the tower's pinnacle! Lead the migration of JavaScript realms to TypeScript safety.
							</p>
							<div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
								<div>
									<span style={{ color: '#7f8c8d' }}>Total Guards: </span>
									<span style={{ color: '#9b59b6', fontWeight: 'bold' }}>{guardedTypes.length}</span>
								</div>
								<div>
									<span style={{ color: '#7f8c8d' }}>Defense: </span>
									<span style={{ color: '#8e44ad', fontWeight: 'bold' }}>{guardStrength}%</span>
								</div>
							</div>
						</div>
					) : (
						<div>
							<p style={{ color: '#9b59b6' }}>
								Master the migration patterns to achieve Commander rank!
							</p>
							<div style={{ marginTop: '10px' }}>
								<span style={{ color: '#7f8c8d' }}>Progress: </span>
								<span style={{ color: '#8e44ad', fontWeight: 'bold' }}>{migrationProgress}% Complete</span>
							</div>
						</div>
					)}
				</div>
				
				<div className='migration-tools'>
					{migrationPatterns.map(pattern => (
						<div
							key={pattern.id}
							className={`migration-tool ${
								migrationStrategies.find(s => s.id === pattern.id) ? 'active' : ''
							}`}
							onClick={() => learnStrategy(pattern)}>
							<div className='tool-icon'>{pattern.icon}</div>
							<div className='tool-name'>{pattern.name}</div>
							<p>{pattern.description}</p>
							<div style={{
								marginTop: '15px',
								padding: '10px',
								background: 'rgba(0, 0, 0, 0.2)',
								borderRadius: '5px',
								fontSize: '0.9em'
							}}>
								<strong>Approach:</strong> {pattern.approach}
							</div>
							<span style={{
								display: 'inline-block',
								marginTop: '10px',
								padding: '5px 10px',
								background: pattern.difficulty === 'Expert'
									? 'rgba(255, 0, 0, 0.2)'
									: pattern.difficulty === 'Advanced'
									? 'rgba(255, 107, 0, 0.2)'
									: pattern.difficulty === 'Intermediate'
									? 'rgba(52, 73, 94, 0.2)'
									: 'rgba(39, 174, 96, 0.2)',
								borderRadius: '15px',
								fontSize: '0.85em'
							}}>
								{pattern.difficulty}
							</span>
						</div>
					))}
				</div>

				<div className='migration-challenges' style={{ marginTop: '40px' }}>
					<h4>Real-World Migration Challenges</h4>
					<div style={{ 
						display: 'grid', 
						gap: '20px',
						marginTop: '20px' 
					}}>
						{migrationChallenges.map(challenge => (
							<div
								key={challenge.id}
								className='guard-item'
								style={{
									background: guardedTypes.find(g => g.name === challenge.name)
										? 'rgba(39, 174, 96, 0.1)'
										: 'rgba(52, 73, 94, 0.08)',
									cursor: 'pointer'
								}}
								onClick={() => completeMigrationChallenge(challenge)}>
								<h5>{challenge.name}</h5>
								<p>{challenge.description}</p>
								<div style={{
									marginTop: '15px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<span style={{
										padding: '5px 10px',
										background: 'rgba(255, 107, 0, 0.2)',
										borderRadius: '15px',
										fontSize: '0.85em'
									}}>
										Size: {challenge.size}
									</span>
									<span style={{
										color: '#5d6d7e',
										fontStyle: 'italic',
										fontSize: '0.9em'
									}}>
										Reward: {challenge.reward}
									</span>
								</div>
								{guardedTypes.find(g => g.name === challenge.name) && (
									<div style={{ 
										marginTop: '10px', 
										color: '#27ae60',
										fontWeight: 'bold',
										textAlign: 'center'
									}}>
										✓ Completed
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='guard-achievements' style={{ marginTop: '40px' }}>
					<h4>Tower Achievements</h4>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
						gap: '20px',
						marginTop: '20px'
					}}>
						<div className={`achievement-badge ${guardedTypes.length >= 10 ? 'earned' : ''}`}>
							<div className='achievement-icon'>🛡️</div>
							<div className='achievement-name'>Type Defender</div>
						</div>
						<div className={`achievement-badge ${guardStrength === 100 ? 'earned' : ''}`}>
							<div className='achievement-icon'>💯</div>
							<div className='achievement-name'>Perfect Guard</div>
						</div>
						<div className={`achievement-badge ${towerLevel === 'master' ? 'earned' : ''}`}>
							<div className='achievement-icon'>👑</div>
							<div className='achievement-name'>Guard Master</div>
						</div>
						<div className={`achievement-badge ${towerComplete ? 'earned' : ''}`}>
							<div className='achievement-icon'>🏰</div>
							<div className='achievement-name'>Tower Legend</div>
						</div>
					</div>
				</div>

				{towerComplete && (
					<div className='mastery-achievement'>
						<h4>🎉 Type Guard Tower Mastered!</h4>
						<p>
							You have become the ultimate guardian of type safety. From basic 
							runtime checks to complex migrations, you've mastered every aspect 
							of TypeScript's type guard system. The realm is safe under your watch!
						</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Migration Patterns & Strategies</span>
				</div>
				<CodeExample
					title={`Migration Patterns & Strategies`}
					discoveredBy={`Transcribed by Aria at the Tower's Pinnacle`}
					code={`// TypeScript Migration Patterns

// 1. Gradual Migration Setup
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,                    // Allow .js files
    "checkJs": false,                   // Don't type-check .js files
    "strict": false,                    // Start loose, tighten later
    "noImplicitAny": false,            // Allow implicit any initially
    "strictNullChecks": false,         // Add later
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// 2. File-by-File Migration Pattern
// Step 1: Add basic types to a .js file
// Before: utils.js
export function formatDate(date) {
  return date.toLocaleDateString();
}

// Step 2: Rename to .ts and add types
// After: utils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Step 3: Handle edge cases
export function formatDate(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }
  return dateObj.toLocaleDateString();
}

// 3. Type Boundaries Pattern
// Create typed wrappers for untyped code
// api-wrapper.ts
import { untypedApi } from './legacy-api.js';

interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export async function getUser(id: string): Promise<ApiResponse<User>> {
  try {
    const result = await untypedApi.fetchUser(id);
    
    // Type guard to ensure data shape
    if (!isValidUser(result)) {
      throw new Error('Invalid user data');
    }
    
    return {
      data: result,
      error: null,
      status: 200
    };
  } catch (error) {
    return {
      data: null as any,
      error: error.message,
      status: 500
    };
  }
}

function isValidUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string'
  );
}

// 4. Declaration Files for Libraries
// types/legacy-lib.d.ts
declare module 'legacy-lib' {
  export interface Config {
    apiKey: string;
    endpoint: string;
    timeout?: number;
  }
  
  export class Client {
    constructor(config: Config);
    
    get<T = any>(path: string): Promise<T>;
    post<T = any>(path: string, data: any): Promise<T>;
    
    on(event: 'error', handler: (error: Error) => void): void;
    on(event: 'ready', handler: () => void): void;
  }
  
  export function createClient(config: Config): Client;
}

// 5. JSDoc to TypeScript Migration
// Before: component.jsx with JSDoc
/**
 * @typedef {Object} ButtonProps
 * @property {string} label - Button text
 * @property {() => void} onClick - Click handler
 * @property {'primary' | 'secondary'} [variant='primary'] - Button style
 * @property {boolean} [disabled=false] - Disabled state
 */

/**
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
function Button({ label, onClick, variant = 'primary', disabled = false }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// After: component.tsx with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// 6. Handling Dynamic Patterns
// Before: Dynamic property access
const configs = {
  dev: { api: 'http://localhost:3000' },
  prod: { api: 'https://api.example.com' }
};

function getConfig(env) {
  return configs[env] || configs.dev;
}

// After: Type-safe with guards
type Environment = 'dev' | 'prod';

interface Config {
  api: string;
}

const configs: Record<Environment, Config> = {
  dev: { api: 'http://localhost:3000' },
  prod: { api: 'https://api.example.com' }
};

function isValidEnvironment(env: string): env is Environment {
  return env === 'dev' || env === 'prod';
}

function getConfig(env: string): Config {
  if (isValidEnvironment(env)) {
    return configs[env];
  }
  return configs.dev;
}

// 7. Incremental Strictness Strategy
// Phase 1: Basic types
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "strictNullChecks": false
  }
}

// Phase 2: No implicit any
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": false
  }
}

// Phase 3: Strict null checks
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// Phase 4: Full strict mode
{
  "compilerOptions": {
    "strict": true
  }
}

// 8. Codemod Example
// Simple codemod to add return types
// Before
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Codemod transformation
export function calculateTotal(items: Array<{price: number}>): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// 9. Team Migration Patterns
// Shared types in central location
// types/shared.ts
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Type utilities for common patterns
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncData<T> = {
  loading: boolean;
  data: Nullable<T>;
  error: Nullable<ApiError>;
};

// 10. Migration Testing Strategy
// Type tests to ensure migration correctness
// __tests__/types.test.ts
import { expectType } from 'tsd';

// Test that migrated functions maintain compatibility
expectType<string>(formatDate(new Date()));
expectType<string>(formatDate('2023-01-01'));
expectType<string>(formatDate(Date.now()));

// Test that invalid inputs are caught
// @ts-expect-error
formatDate(null);

// @ts-expect-error
formatDate(undefined);

// Runtime tests for type guards
describe('Type Guards', () => {
  test('isValidUser correctly validates user objects', () => {
    expect(isValidUser({ id: '1', name: 'John', email: 'john@example.com' }))
      .toBe(true);
    
    expect(isValidUser({ id: '1', name: 'John' }))
      .toBe(false);
    
    expect(isValidUser(null))
      .toBe(false);
  });
});

// 11. Progressive Enhancement Pattern
// Start with loose types, progressively tighten
// v1: Basic function types
type Handler = (event: any) => void;

// v2: Generic handler
type Handler<T = any> = (event: T) => void;

// v3: Specific event types
type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

// v4: Discriminated unions for all events
type EventHandler<T extends HTMLElement = HTMLElement> = 
  | { type: 'click'; handler: (event: React.MouseEvent<T>) => void }
  | { type: 'change'; handler: (event: React.ChangeEvent<T>) => void }
  | { type: 'focus'; handler: (event: React.FocusEvent<T>) => void };

// 12. Documentation During Migration
/**
 * @deprecated Use typed version from './user.ts'
 * Migration status: In progress
 * Owner: @teamMember
 * Target completion: 2024-Q1
 */
export function getLegacyUser(id) {
  // Legacy implementation
}

// New typed version
export function getUser(id: string): Promise<User> {
  // Type-safe implementation
}`}
				/>
				<div className='code-tooltip'>
					<strong>Commander Guardia's Final Wisdom:</strong> "Migration is the ultimate 
					test of type guard mastery. Start gradually with allowJs. Create boundaries 
					between typed and untyped code. Write declaration files for dependencies. 
					Use codemods for scale. Most importantly, bring your team along - migration 
					is a journey, not a destination. With these patterns, you can transform any 
					JavaScript codebase into a type-safe TypeScript fortress."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Migration Master's Insight:`,
					content: `Successful TypeScript migration isn't about converting everything at once. It's about creating a sustainable path that maintains productivity while gradually improving type safety. Each codebase requires its own strategy, balancing risk, team capability, and business needs. The key is to start where it hurts most - the bugs, the confusion points, the areas where types would provide immediate value. From there, expand outward, creating islands of type safety that eventually connect into a fully typed application.`
				}}
				reflectionQuestions={[
					`What makes a migration successful? Consider not just technical completeness, but team adoption and maintained velocity.`,
					`How do you balance strictness with productivity? Think about the gradual path from loose to strict typing.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 48 (Evening)`,
					content: `From the tower's pinnacle, I can see the entire TypeScript realm - and beyond it, countless JavaScript kingdoms awaiting transformation. Commander Guardia taught me the four migration strategies: gradual migration (allowJs), strict boundaries (typed wrappers), declaration files (for untyped libraries), and automated codemods (for scale). I completed real-world challenges: Legacy React App migration, untyped dependencies, dynamic JavaScript patterns, and team migration strategies. Tower Legend status achieved! Guardia's final wisdom: "The true test isn't protecting new code - it's safely transforming the old. We don't conquer JavaScript; we guide it to safety, one type at a time."`
				}}
				chapterEnding={[
					`From the tower's peak, the entire TypeScript realm spread before them. Commander Guardia placed a hand on Aria's shoulder. "You are now a true Type Guard. The realm's safety is in capable hands."`,
					`Aria looked out at the mixed landscape of JavaScript and TypeScript. "I understand now. We don't conquer JavaScript - we guide it to safety, one type at a time."`,
					`Binary projected the final statistics. "TypeScript mastery: Complete. Type safety: Maximum. Developer confidence: Unprecedented!"`,
					`Debuggora smiled knowingly. "The best guard isn't the one that blocks everything, but the one that helps others cross safely."`,
					`Commander Guardia stepped back, pride evident in her bearing. "Your journey through the TypeScript React realm is complete, Aria. You've mastered the Type Forge, learned Generic patterns, explored the Component Armory, and now commanded the Type Guard Tower. Every type narrowing, every generic constraint, every migration pattern - they're all part of you now."`,
					`Aria felt the weight of her accomplishment. From her first tentative steps with basic types to standing atop the Type Guard Tower, she had transformed from curious student to confident guardian.`,
					`"What comes next?" she asked, gazing at the horizon where new technologies sparkled like distant stars.`,
					`Binary computed the possibilities. "The Allied Kingdoms await - new frameworks, new patterns, new adventures. But wherever we go, the TypeScript foundations will guide us."`,
					`Guardia nodded. "Go forth, Guardian. Spread type safety throughout the land. Remember: every JavaScript file typed is a future bug prevented. You are the bridge between chaos and order."`,
					`As the sun set over the TypeScript realm, Aria descended from the tower, ready for whatever adventures lay ahead. The TypeScript React path had ended, but her journey as a developer had only just begun.`
				]}
			/>
		</div>
	);
};

export default ChapterThree;
