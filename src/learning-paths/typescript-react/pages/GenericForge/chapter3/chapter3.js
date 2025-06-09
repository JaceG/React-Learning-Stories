import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		forgedGenerics,
		forgeGeneric,
		selectedGeneric,
		selectGeneric,
		forgeLevel,
		levelUp,
		genericMastery,
		setGenericMastery
	} = useOutletContext();

	const [masteredCompositions, setMasteredCompositions] = useState([]);
	const [selectedComposition, setSelectedComposition] = useState(null);
	const [forgeComplete, setForgeComplete] = useState(false);

	// Advanced composition patterns
	const compositionPatterns = [
		{
			id: 'higher-order-generics',
			name: 'Higher-Order Generics',
			icon: '🎭',
			description: 'Generics that create other generics',
			complexity: 'Master',
			example: 'type Factory<T> = <U>() => T<U>'
		},
		{
			id: 'generic-builders',
			name: 'Generic Builder Pattern',
			icon: '🏗️',
			description: 'Fluent APIs with type inference',
			complexity: 'Expert',
			example: 'Builder<T>().with(K, V).build()'
		},
		{
			id: 'type-predicates',
			name: 'Generic Type Guards',
			icon: '🛡️',
			description: 'Runtime checks with compile-time benefits',
			complexity: 'Advanced',
			example: 'function is<T>(value: unknown): value is T'
		},
		{
			id: 'generic-factories',
			name: 'Factory Functions',
			icon: '🏭',
			description: 'Create typed instances dynamically',
			complexity: 'Master',
			example: 'createInstance<T>(Class: new() => T)'
		}
	];

	// Master challenges
	const masterChallenges = [
		{
			id: 'type-safe-store',
			name: 'Type-Safe State Store',
			description: 'Build a Redux-like store with perfect type inference',
			reward: 'State Architect'
		},
		{
			id: 'query-builder',
			name: 'Generic Query Builder',
			description: 'Create a type-safe database query builder',
			reward: 'Query Master'
		},
		{
			id: 'validation-framework',
			name: 'Validation Framework',
			description: 'Build a generic validation system with type inference',
			reward: 'Validation Sage'
		},
		{
			id: 'event-system',
			name: 'Type-Safe Event System',
			description: 'Create an event emitter with full type safety',
			reward: 'Event Orchestrator'
		}
	];

	// Master a composition
	const masterComposition = (composition) => {
		if (!masteredCompositions.find(c => c.id === composition.id)) {
			setMasteredCompositions([...masteredCompositions, composition]);
			setSelectedComposition(composition);
			setGenericMastery(100);
			
			if (masteredCompositions.length >= 2) {
				levelUp('master');
			}
		}
	};

	// Complete master challenge
	const completeMasterChallenge = (challenge) => {
		forgeGeneric({
			id: Date.now(),
			name: challenge.name,
			type: 'master',
			reward: challenge.reward
		});
		
		if (forgedGenerics.filter(g => g.type === 'master').length >= 3) {
			setForgeComplete(true);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Generic Mastery
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the heart of the Generic Forge, <strong>Master Typhos</strong> revealed 
					the most powerful patterns. "You've learned the basics and constraints. Now, 
					witness the true art of generic composition."
				</p>

				<p className='story-paragraph'>
					The forge erupted with complex type patterns, each more intricate than the 
					last. "These patterns," Typhos explained, "combine everything you've learned 
					into systems that seem almost magical in their flexibility."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the type flows. "These compositions... they're 
					creating entire type systems! The inference chains are incredible!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> traced through the generic transformations. "With 
					these patterns, we can build frameworks that are both incredibly flexible 
					and completely type-safe!"
				</p>

				<p className='story-paragraph'>
					"The ultimate test," Typhos declared, "is not just understanding these 
					patterns, but knowing when and how to apply them. Power without wisdom is chaos."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Master Generic Patterns</h3>
				
				<div className='composition-patterns'>
					<h4>Advanced Compositions</h4>
					<div className='pattern-grid'>
						{compositionPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`generic-pattern ${
									masteredCompositions.find(c => c.id === pattern.id) ? 'forged' : ''
								}`}
								onClick={() => masterComposition(pattern)}>
								<div className='pattern-header'>
									<span className='pattern-icon'>{pattern.icon}</span>
									<div className='pattern-name'>{pattern.name}</div>
								</div>
								<div className='pattern-description'>{pattern.description}</div>
								<div style={{
									marginTop: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<span style={{
										padding: '5px 10px',
										background: pattern.complexity === 'Master'
											? 'rgba(255, 0, 0, 0.2)'
											: pattern.complexity === 'Expert'
											? 'rgba(255, 107, 0, 0.2)'
											: 'rgba(0, 132, 255, 0.2)',
										borderRadius: '15px',
										fontSize: '0.85em'
									}}>
										{pattern.complexity}
									</span>
									{masteredCompositions.find(c => c.id === pattern.id) && (
										<span style={{ color: '#27ae60' }}>✓ Mastered</span>
									)}
								</div>
								{selectedComposition?.id === pattern.id && (
									<code style={{
										display: 'block',
										marginTop: '15px',
										padding: '10px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '5px',
										fontSize: '0.9em'
									}}>
										{pattern.example}
									</code>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='master-challenges' style={{ marginTop: '40px' }}>
					<h4>Master Forge Challenges</h4>
					<div style={{ 
						display: 'grid', 
						gap: '20px',
						marginTop: '20px' 
					}}>
						{masterChallenges.map(challenge => (
							<div
								key={challenge.id}
								className='forge-item'
								style={{
									background: forgedGenerics.find(g => g.name === challenge.name)
										? 'rgba(39, 174, 96, 0.1)'
										: 'rgba(255, 107, 0, 0.08)',
									cursor: 'pointer'
								}}
								onClick={() => completeMasterChallenge(challenge)}>
								<h5>{challenge.name}</h5>
								<p>{challenge.description}</p>
								<div style={{
									marginTop: '15px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<span style={{
										color: '#ff9a00',
										fontStyle: 'italic',
										fontSize: '0.9em'
									}}>
										Reward: {challenge.reward}
									</span>
									{forgedGenerics.find(g => g.name === challenge.name) && (
										<span style={{ color: '#27ae60', fontWeight: 'bold' }}>
											✓ Completed
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='generic-achievements' style={{ marginTop: '40px' }}>
					<h4>Forge Achievements</h4>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
						gap: '20px',
						marginTop: '20px'
					}}>
						<div className={`achievement-badge ${forgedGenerics.length >= 5 ? 'earned' : ''}`}>
							<div className='achievement-icon'>🔨</div>
							<div className='achievement-name'>Prolific Forger</div>
						</div>
						<div className={`achievement-badge ${genericMastery === 100 ? 'earned' : ''}`}>
							<div className='achievement-icon'>🎯</div>
							<div className='achievement-name'>Perfect Mastery</div>
						</div>
						<div className={`achievement-badge ${forgeLevel === 'master' ? 'earned' : ''}`}>
							<div className='achievement-icon'>👑</div>
							<div className='achievement-name'>Forge Master</div>
						</div>
						<div className={`achievement-badge ${forgeComplete ? 'earned' : ''}`}>
							<div className='achievement-icon'>🏆</div>
							<div className='achievement-name'>Generic Legend</div>
						</div>
					</div>
				</div>

				{forgeComplete && (
					<div className='mastery-achievement'>
						<h4>🎉 Generic Forge Mastered!</h4>
						<p>
							You have become a true master of generic programming. Your types 
							flow like water, adapting to any shape while maintaining perfect 
							safety. The TypeScript realm celebrates your achievement!
						</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Master Generic Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// Master-Level Generic Patterns

// 1. Higher-Order Generic Types
type Wrapper<T> = {
  value: T;
  map: <U>(fn: (value: T) => U) => Wrapper<U>;
  flatMap: <U>(fn: (value: T) => Wrapper<U>) => Wrapper<U>;
};

function wrap<T>(value: T): Wrapper<T> {
  return {
    value,
    map: <U>(fn: (value: T) => U) => wrap(fn(value)),
    flatMap: <U>(fn: (value: T) => Wrapper<U>) => fn(value)
  };
}

// Usage with perfect type inference
const result = wrap(5)
  .map(n => n * 2)
  .map(n => n.toString())
  .map(s => s.split(''))
  .value; // string[]

// 2. Generic Builder Pattern with Fluent API
class Builder<T extends Record<string, any> = {}> {
  private data: T;
  
  constructor(initial: T = {} as T) {
    this.data = initial;
  }
  
  set<K extends string, V>(
    key: K,
    value: V
  ): Builder<T & Record<K, V>> {
    return new Builder({
      ...this.data,
      [key]: value
    } as T & Record<K, V>);
  }
  
  setIf<K extends string, V>(
    condition: boolean,
    key: K,
    value: V
  ): Builder<T & Record<K, V>> | Builder<T> {
    return condition ? this.set(key, value) : this;
  }
  
  update<K extends keyof T>(
    key: K,
    updater: (current: T[K]) => T[K]
  ): Builder<T> {
    return new Builder({
      ...this.data,
      [key]: updater(this.data[key])
    });
  }
  
  build(): T {
    return this.data;
  }
}

// Usage with type inference
const user = new Builder()
  .set('name', 'Alice')
  .set('age', 30)
  .setIf(true, 'admin', true)
  .set('email', 'alice@example.com')
  .build();
// Type: { name: string; age: number; admin: boolean; email: string }

// 3. Type-Safe Event Emitter
type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): void;
  off<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): void;
  emit<K extends EventKey<T>>(
    eventName: K,
    params: T[K]
  ): void;
}

class EventEmitter<T extends EventMap> implements Emitter<T> {
  private emitter = new Map<EventKey<T>, Set<EventReceiver<any>>>();
  
  on<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): void {
    if (!this.emitter.has(eventName)) {
      this.emitter.set(eventName, new Set());
    }
    this.emitter.get(eventName)!.add(fn);
  }
  
  off<K extends EventKey<T>>(
    eventName: K,
    fn: EventReceiver<T[K]>
  ): void {
    this.emitter.get(eventName)?.delete(fn);
  }
  
  emit<K extends EventKey<T>>(
    eventName: K,
    params: T[K]
  ): void {
    this.emitter.get(eventName)?.forEach(fn => fn(params));
  }
}

// Define your events
interface AppEvents {
  login: { user: string; timestamp: Date };
  logout: { user: string };
  data: { id: string; value: any };
}

// Usage with full type safety
const events = new EventEmitter<AppEvents>();

events.on('login', ({ user, timestamp }) => {
  console.log(\`\${user} logged in at \${timestamp}\`);
});

events.emit('login', { 
  user: 'Alice', 
  timestamp: new Date() 
}); // Type checked!

// 4. Generic Type Guards with Inference
type Constructor<T = {}> = new (...args: any[]) => T;

function isInstanceOf<T>(
  ctor: Constructor<T>
): (value: unknown) => value is T {
  return (value): value is T => value instanceof ctor;
}

function hasProperty<K extends string>(
  key: K
): <T>(obj: T) => obj is T & Record<K, unknown> {
  return (obj): obj is T & Record<K, unknown> =>
    typeof obj === 'object' && obj !== null && key in obj;
}

// Combine guards
function isUserWithEmail(value: unknown): value is User & { email: string } {
  return isInstanceOf(User)(value) && hasProperty('email')(value);
}

// 5. Type-Safe State Machine
interface StateMachine<S extends string, E extends string> {
  state: S;
  transitions: Record<S, Partial<Record<E, S>>>;
}

class TypedStateMachine<S extends string, E extends string> {
  constructor(
    private machine: StateMachine<S, E>
  ) {}
  
  get state(): S {
    return this.machine.state;
  }
  
  can(event: E): boolean {
    const transitions = this.machine.transitions[this.machine.state];
    return transitions ? event in transitions : false;
  }
  
  transition(event: E): S {
    const transitions = this.machine.transitions[this.machine.state];
    const nextState = transitions?.[event];
    
    if (!nextState) {
      throw new Error(\`Invalid transition: \${event} from \${this.machine.state}\`);
    }
    
    this.machine.state = nextState;
    return nextState;
  }
}

// Define states and events
type OrderState = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
type OrderEvent = 'pay' | 'ship' | 'deliver' | 'cancel';

const orderMachine = new TypedStateMachine<OrderState, OrderEvent>({
  state: 'pending',
  transitions: {
    pending: { pay: 'paid', cancel: 'cancelled' },
    paid: { ship: 'shipped', cancel: 'cancelled' },
    shipped: { deliver: 'delivered' },
    delivered: {},
    cancelled: {}
  }
});

// 6. Generic Factory Pattern
interface Factory<T> {
  create(): T;
  createMany(count: number): T[];
}

class GenericFactory<T> implements Factory<T> {
  constructor(
    private generator: () => T
  ) {}
  
  create(): T {
    return this.generator();
  }
  
  createMany(count: number): T[] {
    return Array.from({ length: count }, () => this.create());
  }
  
  map<U>(transform: (item: T) => U): GenericFactory<U> {
    return new GenericFactory(() => transform(this.create()));
  }
  
  filter(predicate: (item: T) => boolean): GenericFactory<T | null> {
    return new GenericFactory(() => {
      const item = this.create();
      return predicate(item) ? item : null;
    });
  }
}

// 7. Type-Safe Query Builder
interface Query<T> {
  select<K extends keyof T>(...keys: K[]): Query<Pick<T, K>>;
  where<K extends keyof T>(
    key: K,
    operator: '=' | '!=' | '>' | '<',
    value: T[K]
  ): Query<T>;
  orderBy<K extends keyof T>(key: K, direction?: 'asc' | 'desc'): Query<T>;
  limit(count: number): Query<T>;
  execute(): Promise<T[]>;
}

class QueryBuilder<T> implements Query<T> {
  private selections: (keyof T)[] = [];
  private conditions: Array<{
    key: keyof T;
    operator: string;
    value: any;
  }> = [];
  private ordering?: { key: keyof T; direction: 'asc' | 'desc' };
  private limitCount?: number;
  
  select<K extends keyof T>(...keys: K[]): Query<Pick<T, K>> {
    this.selections.push(...keys);
    return this as any;
  }
  
  where<K extends keyof T>(
    key: K,
    operator: '=' | '!=' | '>' | '<',
    value: T[K]
  ): Query<T> {
    this.conditions.push({ key, operator, value });
    return this;
  }
  
  orderBy<K extends keyof T>(
    key: K,
    direction: 'asc' | 'desc' = 'asc'
  ): Query<T> {
    this.ordering = { key, direction };
    return this;
  }
  
  limit(count: number): Query<T> {
    this.limitCount = count;
    return this;
  }
  
  async execute(): Promise<T[]> {
    // Implementation would execute actual query
    return [];
  }
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const query = new QueryBuilder<User>()
  .select('id', 'name', 'email')
  .where('age', '>', 18)
  .orderBy('name')
  .limit(10);

// 8. Generic Validation Framework
type Validator<T> = (value: T) => string | null;

class ValidationBuilder<T> {
  private validators: Validator<T>[] = [];
  
  add(validator: Validator<T>): this {
    this.validators.push(validator);
    return this;
  }
  
  required(message = 'Required'): this {
    return this.add(value => 
      value === null || value === undefined ? message : null
    );
  }
  
  validate(value: T): string[] {
    return this.validators
      .map(v => v(value))
      .filter((error): error is string => error !== null);
  }
  
  isValid(value: T): boolean {
    return this.validate(value).length === 0;
  }
}

// String-specific validator
class StringValidator extends ValidationBuilder<string> {
  minLength(min: number, message?: string): this {
    return this.add(value => 
      value.length < min 
        ? message || \`Minimum length is \${min}\` 
        : null
    );
  }
  
  matches(pattern: RegExp, message?: string): this {
    return this.add(value =>
      pattern.test(value) 
        ? null 
        : message || 'Invalid format'
    );
  }
}

// Usage
const emailValidator = new StringValidator()
  .required()
  .minLength(5)
  .matches(/^[\\w-]+@[\\w-]+\\.[\\w-]+$/);

const errors = emailValidator.validate('bad');
// ["Minimum length is 5", "Invalid format"]`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Master Typhos's Final Teaching:</strong> "These patterns represent 
					the pinnacle of generic mastery. Higher-order generics create types that 
					generate other types. Builders provide fluent APIs with perfect inference. 
					Type guards bridge runtime and compile-time safety. Master these patterns, 
					and you can build any type-safe system imaginable."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Master's Insight:</h3>
				<p>
					Master-level generic patterns go beyond simple type parameters. They 
					create entire type systems that guide development, prevent errors, and 
					make complex operations feel natural. These patterns form the backbone 
					of modern TypeScript libraries and frameworks.
				</p>
				<p>
					The key to mastery is not memorizing every pattern, but understanding 
					the principles behind them. Once you grasp how types flow through your 
					system, you can create new patterns tailored to your specific needs.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Generic Mastery</h3>
				<p>
					<strong>How do these patterns change your approach to system design?</strong> 
					Consider how type-safe builders and factories can shape entire architectures.
				</p>
				<p>
					<strong>What makes a generic pattern worth the complexity?</strong> Think 
					about the balance between flexibility, safety, and developer experience.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The Generic Forge blazed with the light of a thousand type transformations. 
					<strong>Master Typhos</strong> stood before his students, pride evident in 
					his stance. "You have completed your training. The forge is now yours."
				</p>
				<p>
					<strong>Aria</strong> held a perfectly typed component, its generics flowing 
					seamlessly. "I understand now. Generics aren't just about reuse - they're 
					about creating languages within the language."
				</p>
				<p>
					<strong>Binary</strong> calculated the final metrics. "Type safety: Absolute. 
					Code reuse: Maximized. Developer experience: Optimal. Mission accomplished!"
				</p>
				<p>
					<strong>Debuggora</strong> smiled. "With these patterns, bugs don't stand 
					a chance. The types catch everything!"
				</p>
				<p>
					"Go forth," Typhos commanded, "and forge components that will stand the 
					test of time. Remember: with great generic power comes great type responsibility."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;