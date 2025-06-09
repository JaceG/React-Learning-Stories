import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
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

	const [selectedPattern, setSelectedPattern] = useState(null);
	const [practiceComplete, setPracticeComplete] = useState(false);

	// Basic generic patterns
	const basicPatterns = [
		{
			id: 'basic-function',
			name: 'Generic Function',
			icon: '⚡',
			description: 'Functions that work with any type',
			example: 'function identity<T>(arg: T): T { return arg; }',
			difficulty: 'Beginner'
		},
		{
			id: 'generic-interface',
			name: 'Generic Interface',
			icon: '📐',
			description: 'Interfaces that adapt to different types',
			example: 'interface Box<T> { value: T; }',
			difficulty: 'Beginner'
		},
		{
			id: 'generic-component',
			name: 'Generic Component',
			icon: '🧩',
			description: 'React components that handle any data type',
			example: 'function List<T>({ items }: { items: T[] })',
			difficulty: 'Intermediate'
		},
		{
			id: 'multiple-params',
			name: 'Multiple Type Parameters',
			icon: '🔀',
			description: 'Using multiple generic parameters',
			example: 'function pair<T, U>(first: T, second: U)',
			difficulty: 'Intermediate'
		}
	];

	// Forge scenarios
	const forgeScenarios = [
		{
			id: 'list-component',
			name: 'Generic List Component',
			description: 'A reusable list that can display any type of data',
			reward: 'Flexibility Master'
		},
		{
			id: 'form-field',
			name: 'Generic Form Field',
			description: 'Form inputs that work with any value type',
			reward: 'Type Safety Guardian'
		},
		{
			id: 'data-table',
			name: 'Generic Data Table',
			description: 'Table component for any data structure',
			reward: 'Data Architect'
		}
	];

	// Learn a pattern
	const learnPattern = (pattern) => {
		setSelectedPattern(pattern);
		setGenericMastery(prev => Math.min(100, prev + 20));
		
		if (genericMastery >= 40 && forgeLevel === 'apprentice') {
			levelUp('journeyman');
		}
	};

	// Complete forge scenario
	const completeScenario = (scenario) => {
		forgeGeneric({
			id: Date.now(),
			name: scenario.name,
			type: 'basic',
			reward: scenario.reward
		});
		
		if (forgedGenerics.length >= 2) {
			setPracticeComplete(true);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Foundations of Generics
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Generic Forge glowed with an otherworldly light as <strong>Master Typhos</strong> 
					began the lesson. "Generics," he intoned, "are the key to true reusability. 
					They allow components to adapt without losing type safety."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> watched as Typhos demonstrated, creating a component 
					that could handle any data type while maintaining perfect type checking. "It's 
					like having a universal key that still only opens the right doors!"
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the patterns. "Fascinating! The type parameter 
					acts as a placeholder until the component is used, then TypeScript fills in 
					the exact type needed."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> perched on a type anvil. "No more 'any' types 
					everywhere! These generics catch type mismatches while staying flexible."
				</p>

				<p className='story-paragraph'>
					"Begin with the basics," Typhos instructed. "Master simple generics before 
					attempting complex constraints. Each pattern builds upon the last."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Basic Generic Patterns</h3>
				
				<div className='forge-workshop'>
					{basicPatterns.map(pattern => (
						<div
							key={pattern.id}
							className={`generic-pattern ${
								selectedPattern?.id === pattern.id ? 'selected' : ''
							}`}
							onClick={() => learnPattern(pattern)}>
							<div className='pattern-header'>
								<span className='pattern-icon'>{pattern.icon}</span>
								<div className='pattern-name'>{pattern.name}</div>
							</div>
							<div className='pattern-description'>{pattern.description}</div>
							<div style={{
								marginTop: '10px',
								padding: '5px 10px',
								background: pattern.difficulty === 'Beginner' 
									? 'rgba(39, 174, 96, 0.2)' 
									: 'rgba(255, 107, 0, 0.2)',
								borderRadius: '15px',
								display: 'inline-block',
								fontSize: '0.85em'
							}}>
								{pattern.difficulty}
							</div>
							{selectedPattern?.id === pattern.id && (
								<div className='pattern-example'>
									<code>{pattern.example}</code>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='forge-scenarios' style={{ marginTop: '40px' }}>
					<h3>Forge Your First Generics</h3>
					<div className='scenario-grid'>
						{forgeScenarios.map(scenario => (
							<div
								key={scenario.id}
								className='forge-item'
								onClick={() => completeScenario(scenario)}>
								<h4>{scenario.name}</h4>
								<p>{scenario.description}</p>
								<div style={{
									marginTop: '15px',
									color: '#ff9a00',
									fontStyle: 'italic',
									fontSize: '0.9em'
								}}>
									Reward: {scenario.reward}
								</div>
								{forgedGenerics.find(g => g.name === scenario.name) && (
									<div style={{ 
										marginTop: '10px', 
										color: '#27ae60',
										fontWeight: 'bold'
									}}>
										✓ Forged
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='mastery-progress' style={{ marginTop: '40px' }}>
					<h4>Generic Understanding</h4>
					<div className='type-params'>
						<span className='type-param'>T</span>
						<span className='type-param'>U</span>
						<span className='type-param'>K extends keyof T</span>
					</div>
					<p style={{ marginTop: '15px', color: '#bdc3c7' }}>
						{genericMastery < 40 
							? 'You are beginning to understand the power of generics...'
							: genericMastery < 80
							? 'Your generic skills are growing stronger!'
							: 'You have grasped the fundamentals of generic programming!'}
					</p>
				</div>

				{practiceComplete && (
					<div className='achievement-unlocked'>
						<h4>🎉 Foundation Complete!</h4>
						<p>
							You've learned the basic patterns of generic programming. 
							These building blocks will serve you well in creating 
							flexible, reusable components!
						</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Basic Generic Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// TypeScript Generic Foundations

// 1. Basic Generic Function
function identity<T>(arg: T): T {
  return arg;
}

// Usage - TypeScript infers the type
const num = identity(42);        // type: number
const str = identity("hello");   // type: string
const obj = identity({ id: 1 }); // type: { id: number }

// Explicit type argument
const explicit = identity<string>("world");

// 2. Generic Interface
interface Container<T> {
  value: T;
  getValue: () => T;
  setValue: (newValue: T) => void;
}

// Implementation
class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
  
  setValue(newValue: T): void {
    this.value = newValue;
  }
}

// Usage
const numberBox = new Box<number>(123);
const stringBox = new Box<string>("TypeScript");

// 3. Generic React Component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemClick?: (item: T) => void;
}

function List<T>({ items, renderItem, onItemClick }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li 
          key={index}
          onClick={() => onItemClick?.(item)}
          style={{ cursor: onItemClick ? 'pointer' : 'default' }}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage with different types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

// User List
<List<User>
  items={users}
  renderItem={(user) => (
    <div>
      <strong>{user.name}</strong>
      <span>{user.email}</span>
    </div>
  )}
  onItemClick={(user) => console.log('Selected user:', user.id)}
/>

// Product List - Same component, different type!
<List<Product>
  items={products}
  renderItem={(product) => (
    <div>
      <h4>{product.title}</h4>
      <span>$\{product.price}</span>
    </div>
  )}
  onItemClick={(product) => console.log('Add to cart:', product.id)}
/>

// 4. Multiple Type Parameters
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Usage
const pair1 = createPair("hello", 42);        // [string, number]
const pair2 = createPair(true, { id: 1 });    // [boolean, { id: number }]

// React component with multiple generics
interface TableProps<TData, TKey extends keyof TData> {
  data: TData[];
  columns: {
    key: TKey;
    header: string;
    render?: (value: TData[TKey]) => React.ReactNode;
  }[];
}

function DataTable<TData, TKey extends keyof TData>({ 
  data, 
  columns 
}: TableProps<TData, TKey>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render 
                  ? col.render(row[col.key])
                  : String(row[col.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 5. Generic Hooks
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Usage with type inference
const [user, setUser] = useLocalStorage('user', { name: '', id: 0 });
const [theme, setTheme] = useLocalStorage('theme', 'light');

// 6. Generic with Default Type
interface Response<T = unknown> {
  data: T;
  status: number;
  message: string;
}

// Can be used with or without specifying type
const response1: Response = { 
  data: "anything", 
  status: 200, 
  message: "OK" 
};

const response2: Response<User> = { 
  data: { id: 1, name: "John", email: "john@example.com" }, 
  status: 200, 
  message: "OK" 
};

// 7. Array Method Generics
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function mapArray<T, U>(
  arr: T[], 
  transform: (item: T) => U
): U[] {
  return arr.map(transform);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, n => n * 2);  // number[]
const strings = mapArray(numbers, n => n.toString()); // string[]

// 8. Generic Type Aliases
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type AsyncData<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

// Usage
const userName: Nullable<string> = null;
const userAge: Optional<number> = undefined;
const userData: AsyncData<User> = {
  loading: false,
  error: null,
  data: { id: 1, name: "Alice", email: "alice@example.com" }
};`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Master Typhos's Teaching:</strong> "These patterns form the foundation 
					of generic programming. Identity functions preserve types. Generic interfaces 
					define flexible contracts. Components and hooks become reusable across any 
					data type. Master these basics, and advanced patterns will follow naturally."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Forge Insight:</h3>
				<p>
					Generics are TypeScript's way of writing code once and using it safely 
					with any type. They provide the perfect balance between flexibility and 
					type safety, allowing you to create truly reusable components without 
					sacrificing the benefits of static typing.
				</p>
				<p>
					The key to understanding generics is to think of them as "type variables" - 
					placeholders that get filled in when the code is used. Just as a function 
					parameter can accept different values, a type parameter can accept different types.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Generic Foundations</h3>
				<p>
					<strong>How do generics improve code reusability?</strong> Consider how 
					one List component can handle users, products, or any other data type 
					without modification.
				</p>
				<p>
					<strong>When should you use generics versus specific types?</strong> Think 
					about the balance between flexibility and simplicity in your components.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The forge cooled as the first lesson concluded. <strong>Master Typhos</strong> 
					examined the generic patterns Aria had practiced. "Well done. You've grasped 
					the basics of generic forging."
				</p>
				<p>
					<strong>Aria</strong> felt the power of flexible types flowing through her 
					code. "One component to handle them all... this changes everything!"
				</p>
				<p>
					<strong>Binary</strong> calculated the efficiency gains. "Code reuse up 300%. 
					Type safety maintained at 100%. Optimal results!"
				</p>
				<p>
					"Tomorrow," Typhos promised, "we'll explore constraints and bounds - teaching 
					your generics to be selective in what they accept..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;