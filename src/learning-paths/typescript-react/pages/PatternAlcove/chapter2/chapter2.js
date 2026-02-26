import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
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

	const [selectedConstraint, setSelectedConstraint] = useState(null);
	const [constraintMastery, setConstraintMastery] = useState(0);
	const [conditionalPatterns, setConditionalPatterns] = useState([]);

	// Advanced constraint patterns
	const constraintPatterns = [
		{
			id: 'extends-constraint',
			name: 'Extends Constraints',
			icon: '🔒',
			description: 'Limit generics to specific types',
			example: '<T extends string | number>',
			power: 'Type boundaries'
		},
		{
			id: 'keyof-constraint',
			name: 'KeyOf Constraints',
			icon: '🔑',
			description: 'Constrain to object keys',
			example: '<K extends keyof T>',
			power: 'Property access safety'
		},
		{
			id: 'conditional-types',
			name: 'Conditional Generics',
			icon: '❓',
			description: 'Types that adapt based on conditions',
			example: 'T extends U ? X : Y',
			power: 'Dynamic type selection'
		},
		{
			id: 'mapped-generics',
			name: 'Mapped Type Generics',
			icon: '🗺️',
			description: 'Transform all properties of a type',
			example: '{ [K in keyof T]: T[K] }',
			power: 'Type transformation'
		}
	];

	// Constraint challenges
	const constraintChallenges = [
		{
			id: 'api-wrapper',
			name: 'Type-Safe API Wrapper',
			description: 'Create a generic API client with response constraints',
			difficulty: 'Hard'
		},
		{
			id: 'form-validator',
			name: 'Generic Form Validator',
			description: 'Build a validator that ensures type safety',
			difficulty: 'Expert'
		},
		{
			id: 'state-machine',
			name: 'Generic State Machine',
			description: 'Type-safe state transitions',
			difficulty: 'Master'
		}
	];

	// Master a constraint
	const masterConstraint = (constraint) => {
		setSelectedConstraint(constraint);
		setConstraintMastery(prev => Math.min(100, prev + 25));
		setGenericMastery(prev => Math.min(100, prev + 15));
		
		if (constraintMastery >= 50) {
			levelUp('expert');
		}
	};

	// Complete challenge
	const completeChallenge = (challenge) => {
		forgeGeneric({
			id: Date.now(),
			name: challenge.name,
			type: 'advanced',
			difficulty: challenge.difficulty
		});
		
		setConditionalPatterns([...conditionalPatterns, challenge.id]);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`Constraints and Conditional Types`}
				bridge={`Master Typhos stoked the forge flames higher, the heat intensifying with the complexity of the lesson ahead. "You've learned to forge basic generics," he acknowledged, examining Aria's work. "Now we must teach them discipline. Constraints ensure your generics only work with compatible types—precision over chaos."`}
			/>

		<StorySection
			paragraphs={[
				<>The forge blazed hotter as <strong>Master Typhos</strong> introduced more advanced techniques. "Raw generics are powerful, but constraints make them precise. We must teach our types to be selective."</>,
				`He demonstrated a generic that only accepted certain types. "Constraints are like filters - they ensure your generics only work with compatible types, preventing misuse before it happens."`,
				<><strong>Binary</strong> analyzed the constraint syntax. "So we can create generics that adapt their behavior based on the input type? That's incredibly sophisticated!"</>,
				<><strong>Debuggora</strong> watched the type transformations. "With these constraints, we can catch impossible states at compile time. No more runtime surprises!"</>,
				`"Conditional types," Typhos continued, "are the ultimate expression of type flexibility. They allow your generics to make decisions."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Constraint Patterns</h3>

				<InstructionBox character={`Master Typhos reveals four constraint runes glowing on the forge wall.`}>
					{`"Each constraint pattern adds a layer of precision to your generics. Click on each to understand its power—and watch your mastery grow."`}
				</InstructionBox>
				
				<div style={{ 
					background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.1), rgba(211, 84, 0, 0.1))', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(230, 126, 34, 0.3)'
				}}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', gap: '30px' }}>
							<div>
								<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Current Level: </span>
								<span style={{ color: '#e67e22', fontWeight: 'bold' }}>{forgeLevel}</span>
							</div>
							<div>
								<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Mastery Progress: </span>
								<span style={{ color: '#d35400', fontWeight: 'bold' }}>{genericMastery}%</span>
							</div>
						</div>
						{constraintMastery >= 80 && (
							<div style={{ color: '#27ae60', fontWeight: 'bold' }}>
								🏆 Master Level Unlocked!
							</div>
						)}
					</div>
				</div>
				
				<div className='constraint-builder'>
					<h4>Master Type Constraints</h4>
					<div className='pattern-grid'>
						{constraintPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`generic-pattern ${
									selectedConstraint?.id === pattern.id ? 'selected' : ''
								}`}
								onClick={() => masterConstraint(pattern)}>
								<div className='pattern-header'>
									<span className='pattern-icon'>{pattern.icon}</span>
									<div className='pattern-name'>{pattern.name}</div>
								</div>
								<div className='pattern-description'>{pattern.description}</div>
								<div className='pattern-example'>
									<code>{pattern.example}</code>
								</div>
								{selectedConstraint?.id === pattern.id && (
									<div style={{ 
										marginTop: '15px',
										padding: '10px',
										background: 'rgba(255, 107, 0, 0.1)',
										borderRadius: '5px',
										fontSize: '0.9em'
									}}>
										<strong>Power:</strong> {pattern.power}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='constraint-challenges' style={{ marginTop: '40px' }}>
					<h4>Constraint Challenges</h4>

					<InstructionBox character={`Master Typhos points to three challenge scrolls.`}>
						{`"These challenges test your constraint mastery. Each completed challenge proves your understanding of type boundaries and conditional logic."`}
					</InstructionBox>

					{constraintChallenges.map(challenge => (
						<div
							key={challenge.id}
							className='forge-item'
							onClick={() => completeChallenge(challenge)}
							style={{
								opacity: conditionalPatterns.includes(challenge.id) ? 0.7 : 1,
								background: conditionalPatterns.includes(challenge.id) 
									? 'rgba(39, 174, 96, 0.1)' 
									: 'rgba(255, 107, 0, 0.08)'
							}}>
							<h5>{challenge.name}</h5>
							<p>{challenge.description}</p>
							<div style={{
								marginTop: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<span style={{
									padding: '5px 10px',
									background: challenge.difficulty === 'Master'
										? 'rgba(255, 0, 0, 0.2)'
										: challenge.difficulty === 'Expert'
										? 'rgba(255, 107, 0, 0.2)'
										: 'rgba(0, 132, 255, 0.2)',
									borderRadius: '15px',
									fontSize: '0.85em'
								}}>
									{challenge.difficulty}
								</span>
								{conditionalPatterns.includes(challenge.id) && (
									<span style={{ color: '#27ae60' }}>✓ Completed</span>
								)}
							</div>
						</div>
					))}
				</div>

				<div className='constraint-list' style={{ marginTop: '30px' }}>
					<h4>Mastered Constraints</h4>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
						{constraintMastery >= 25 && <div className='constraint-chip'>extends</div>}
						{constraintMastery >= 50 && <div className='constraint-chip'>keyof</div>}
						{constraintMastery >= 75 && <div className='constraint-chip'>conditional</div>}
						{constraintMastery >= 100 && <div className='constraint-chip'>mapped</div>}
					</div>
				</div>

				<div className='composition-diagram'>
					<h4>Type Flow Visualization</h4>
					<div className='composition-flow'>
						<div className='flow-item'>Input Type</div>
						<span className='flow-arrow'>→</span>
						<div className='flow-item'>Constraint Check</div>
						<span className='flow-arrow'>→</span>
						<div className='flow-item'>Output Type</div>
					</div>
					<p style={{ marginTop: '20px', color: '#bdc3c7' }}>
						Constraints ensure type safety flows through your entire application
					</p>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Advanced Generic Constraints</span>
				</div>
				<CodeExample
					title={`Advanced TypeScript Generic Constraints`}
					discoveredBy={`Transcribed by Aria at the Generic Forge`}
					code={`// Advanced TypeScript Generic Constraints

// 1. Basic Extends Constraints
interface Lengthwise {
  length: number;
}

// Only accepts types with a length property
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Valid uses
logLength("hello");           // string has length
logLength([1, 2, 3]);        // array has length
logLength({ length: 10 });   // object with length

// Invalid - number doesn't have length
// logLength(123); // Error!

// 2. Union Type Constraints
function processValue<T extends string | number | boolean>(
  value: T
): T extends string ? string : T extends number ? number : boolean {
  if (typeof value === 'string') {
    return value.toUpperCase() as any;
  } else if (typeof value === 'number') {
    return (value * 2) as any;
  }
  return (!value) as any;
}

// TypeScript knows the return type!
const str = processValue("hello");  // type: string
const num = processValue(21);       // type: number
const bool = processValue(true);    // type: boolean

// 3. KeyOf Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30, email: "alice@example.com" };

// Type safe property access
const name = getProperty(person, "name");   // type: string
const age = getProperty(person, "age");     // type: number
// getProperty(person, "invalid"); // Error!

// 4. Generic Constraints with Multiple Types
interface Model {
  id: string;
  createdAt: Date;
}

interface Timestamped {
  timestamp: number;
}

// Component that requires both constraints
function processModel<T extends Model & Timestamped>(data: T): T {
  console.log(\`Processing model \${data.id} from \${data.timestamp}\`);
  return data;
}

// Must satisfy both interfaces
const validData = {
  id: "123",
  createdAt: new Date(),
  timestamp: Date.now(),
  extra: "data"
};

processModel(validData); // Works!

// 5. Conditional Type Constraints
type IsArray<T> = T extends any[] ? true : false;
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

// More complex conditional
type ElementType<T> = T extends (infer U)[] ? U : T;

type StringElement = ElementType<string[]>;     // string
type NumberElement = ElementType<number[]>;     // number
type NotArrayElement = ElementType<boolean>;    // boolean

// 6. Mapped Type Constraints
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type NullableUser = Nullable<User>;

// 7. Advanced Conditional Types
type FilterKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys<T> = FilterKeys<T, string>;
type NumberKeys<T> = FilterKeys<T, number>;

interface Data {
  id: number;
  name: string;
  count: number;
  active: boolean;
  description: string;
}

type DataStringKeys = StringKeys<Data>; // "name" | "description"
type DataNumberKeys = NumberKeys<Data>; // "id" | "count"

// 8. Generic React Component with Constraints
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends SelectOption> {
  options: T[];
  value?: T['value'];
  onChange: (option: T) => void;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => string;
}

function Select<T extends SelectOption>({
  options,
  value,
  onChange,
  getLabel = (opt) => opt.label,
  getValue = (opt) => opt.value
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find(opt => getValue(opt) === e.target.value);
    if (selected) onChange(selected);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}

// Can be used with extended types
interface UserOption extends SelectOption {
  id: number;
  role: string;
}

const userOptions: UserOption[] = [
  { value: '1', label: 'Alice', id: 1, role: 'admin' },
  { value: '2', label: 'Bob', id: 2, role: 'user' }
];

// Type safe!
<Select
  options={userOptions}
  onChange={(user) => {
    console.log(user.id, user.role); // Extra properties available!
  }}
/>

// 9. Recursive Generic Constraints
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

// 10. Generic Class with Constraints
class Collection<T extends { id: string | number }> {
  private items: T[] = [];
  
  add(item: T): void {
    if (!this.items.find(i => i.id === item.id)) {
      this.items.push(item);
    }
  }
  
  get(id: T['id']): T | undefined {
    return this.items.find(item => item.id === id);
  }
  
  update(id: T['id'], updates: Partial<T>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
    }
  }
  
  remove(id: T['id']): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}

// Must have an id property
const users = new Collection<{ id: number; name: string }>();
users.add({ id: 1, name: "Alice" });

// 11. Utility Type with Constraints
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
};

interface Person {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  score: number;
}

type StringFields = PickByType<Person, string>; 
// { name: string; email: string; }

type NumberFields = PickByType<Person, number>; 
// { age: number; score: number; }`}
				/>
				<div className='code-tooltip'>
					<strong>Master Typhos's Wisdom:</strong> "Constraints are the guardians of 
					type safety. They ensure your generics only accept appropriate types, 
					preventing errors before they occur. Conditional types add intelligence to 
					your type system, allowing types to adapt based on their inputs. Master 
					these patterns, and your code becomes self-documenting and error-proof."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Constraint Insight:`,
					content: `Generic constraints transform loose type parameters into precise, controlled systems. By using extends, keyof, and conditional types, we create generics that are both flexible and safe, adapting to different use cases while maintaining strict type checking. The true power of constraints lies in their ability to express complex type relationships—they allow us to build APIs that guide developers toward correct usage, catching mistakes at compile time rather than runtime.`
				}}
				reflectionQuestions={[
					`How do constraints improve API design? Consider how they guide users toward correct usage and prevent invalid states.`,
					`When do conditional types become too complex? Think about the balance between type safety and code readability.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 47 (Afternoon)`,
					content: `The forge burns hotter with advanced techniques! Master Typhos taught me that constraints are the guardians of precision—extends limits types to specific shapes, keyof ensures property access safety, conditional types make decisions at the type level, and mapped types transform entire structures. I built a type-safe API wrapper and completed the constraint challenges. Binary computed: "Constraint satisfaction: 100%. Type inference accuracy: Maximum." Typhos's wisdom: "Constraints don't limit—they empower! They make impossible states impossible to express." The mastered constraint chips glow on my belt: extends, keyof, conditional, mapped.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
