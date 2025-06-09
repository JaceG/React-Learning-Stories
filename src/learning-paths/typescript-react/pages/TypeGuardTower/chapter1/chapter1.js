import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
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

	const [selectedPattern, setSelectedPattern] = useState(null);
	const [practiceComplete, setPracticeComplete] = useState(false);

	// Basic type guard patterns
	const basicGuards = [
		{
			id: 'typeof-guard',
			name: 'Typeof Guards',
			icon: '🔍',
			description: 'Check primitive types at runtime',
			example: 'typeof value === "string"',
			type: 'Primitive'
		},
		{
			id: 'instanceof-guard',
			name: 'Instanceof Guards',
			icon: '🏷️',
			description: 'Verify class instances',
			example: 'value instanceof Date',
			type: 'Object'
		},
		{
			id: 'in-operator',
			name: 'In Operator Guards',
			icon: '🔑',
			description: 'Check for property existence',
			example: '"property" in object',
			type: 'Property'
		},
		{
			id: 'custom-predicates',
			name: 'Custom Type Predicates',
			icon: '✨',
			description: 'User-defined type guards',
			example: 'value is Type',
			type: 'Custom'
		}
	];

	// Guard scenarios
	const guardScenarios = [
		{
			id: 'api-response',
			name: 'API Response Guard',
			description: 'Validate data from external APIs',
			reward: 'Data Defender'
		},
		{
			id: 'user-input',
			name: 'User Input Guard',
			description: 'Ensure form data is correctly typed',
			reward: 'Input Validator'
		},
		{
			id: 'mixed-arrays',
			name: 'Mixed Array Guard',
			description: 'Handle arrays with multiple types',
			reward: 'Array Guardian'
		}
	];

	// Learn a guard pattern
	const learnGuard = (guard) => {
		setSelectedPattern(guard);
		setGuardStrength(prev => Math.min(100, prev + 20));
		
		if (guardStrength >= 40 && towerLevel === 'watchman') {
			levelUp('sentinel');
		}
	};

	// Complete scenario
	const completeScenario = (scenario) => {
		createGuard({
			id: Date.now(),
			name: scenario.name,
			type: 'basic',
			reward: scenario.reward
		});
		
		if (guardedTypes.length >= 2) {
			setPracticeComplete(true);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Foundation Guards
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					High atop the Type Guard Tower, <strong>Commander Guardia</strong> stood 
					watch over the TypeScript realm. "Welcome, Aria. Here we bridge the gap 
					between compile-time safety and runtime reality."
				</p>

				<p className='story-paragraph'>
					The tower's walls displayed glowing type signatures, each protected by 
					vigilant guards. "In JavaScript," Guardia explained, "data can be anything. 
					Type guards ensure it's what we expect."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> scanned the defensive patterns. "These guards... 
					they're like sentries that check types at runtime and inform the compiler!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> perched on a battlement. "No more runtime type 
					errors sneaking past our defenses. These guards catch them all!"
				</p>

				<p className='story-paragraph'>
					"Begin with the basic guards," Guardia instructed. "Master these, and no 
					type uncertainty will breach your defenses."
				</p>

				<div className='character-intro-card'>
					<h4>Commander Guardia</h4>
					<p>The eternal sentinel of the Type Guard Tower. Her philosophy: 
					"Trust nothing at runtime. Verify everything. A well-placed guard 
					saves a thousand runtime errors."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Basic Guard Patterns</h3>
				
				<div style={{ 
					background: 'rgba(52, 152, 219, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					border: '1px solid rgba(52, 152, 219, 0.3)'
				}}>
					<div style={{ display: 'flex', gap: '30px' }}>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Tower Level: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{towerLevel}</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Guards Created: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{guardedTypes.length}</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Defense Strength: </span>
							<span style={{ color: '#2980b9', fontWeight: 'bold' }}>{guardStrength}%</span>
						</div>
					</div>
				</div>
				
				<div className='guard-workshop'>
					{basicGuards.map(guard => (
						<div
							key={guard.id}
							className={`guard-pattern ${
								selectedPattern?.id === guard.id ? 'selected' : ''
							}`}
							onClick={() => learnGuard(guard)}>
							<div className='pattern-header'>
								<span className='pattern-icon'>{guard.icon}</span>
								<div className='pattern-name'>{guard.name}</div>
							</div>
							<div className='pattern-description'>{guard.description}</div>
							<div style={{
								marginTop: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<span className='pattern-type'>{guard.type}</span>
								{selectedPattern?.id === guard.id && (
									<code style={{
										padding: '5px 10px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '5px',
										fontSize: '0.9em'
									}}>
										{guard.example}
									</code>
								)}
							</div>
						</div>
					))}
				</div>

				<div className='guard-scenarios' style={{ marginTop: '40px' }}>
					<h3>Guard Training Scenarios</h3>
					<div className='scenario-grid'>
						{guardScenarios.map(scenario => (
							<div
								key={scenario.id}
								className='guard-item'
								onClick={() => completeScenario(scenario)}>
								<h4>{scenario.name}</h4>
								<p>{scenario.description}</p>
								<div style={{
									marginTop: '15px',
									color: '#5d6d7e',
									fontStyle: 'italic',
									fontSize: '0.9em'
								}}>
									Reward: {scenario.reward}
								</div>
								{guardedTypes.find(g => g.name === scenario.name) && (
									<div style={{ 
										marginTop: '10px', 
										color: '#27ae60',
										fontWeight: 'bold'
									}}>
										✓ Completed
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='guard-visualization'>
					<h4>Type Guard Flow</h4>
					<div className='guard-flow'>
						<div className='flow-item'>Unknown Type</div>
						<span className='flow-arrow'>→</span>
						<div className='flow-item'>Type Guard</div>
						<span className='flow-arrow'>→</span>
						<div className='flow-item'>Known Type</div>
					</div>
					<p style={{ marginTop: '20px', color: '#bdc3c7' }}>
						Guards narrow types from broad to specific
					</p>
				</div>

				<div className='guard-strength-meter' style={{ marginTop: '30px' }}>
					<h4>Defense Strength</h4>
					<p style={{ marginTop: '15px', color: '#bdc3c7' }}>
						{guardStrength < 40 
							? 'Your defenses are still forming...'
							: guardStrength < 80
							? 'Your guard skills strengthen!'
							: 'Your type defenses are impenetrable!'}
					</p>
				</div>

				{practiceComplete && (
					<div className='achievement-unlocked'>
						<h4>🎉 Foundation Guards Mastered!</h4>
						<p>
							You've learned the basic patterns of type guarding. 
							These foundational skills will protect your code from 
							runtime type errors!
						</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Basic Type Guard Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// TypeScript Type Guard Foundations

// 1. Typeof Guards for Primitives
function processValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
    console.log(value.length);
  } else if (typeof value === 'number') {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
    console.log(value * 2);
  } else {
    // TypeScript knows value is boolean here
    console.log(value ? 'TRUE' : 'FALSE');
  }
}

// 2. Instanceof Guards for Objects
class User {
  constructor(public name: string) {}
  greet() { return \`Hello, I'm \${this.name}\`; }
}

class Admin extends User {
  constructor(name: string, public permissions: string[]) {
    super(name);
  }
  grantAccess() { return 'Access granted'; }
}

function handlePerson(person: User | Admin) {
  console.log(person.greet()); // Available on both
  
  if (person instanceof Admin) {
    // TypeScript knows person is Admin here
    console.log(person.permissions);
    console.log(person.grantAccess());
  }
}

// 3. In Operator Guards
interface Cat {
  meow: () => void;
  purr: () => void;
}

interface Dog {
  bark: () => void;
  wagTail: () => void;
}

function handlePet(pet: Cat | Dog) {
  if ('meow' in pet) {
    // TypeScript knows pet is Cat
    pet.meow();
    pet.purr();
  } else {
    // TypeScript knows pet is Dog
    pet.bark();
    pet.wagTail();
  }
}

// 4. Custom Type Predicates
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

// Custom type guard function
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}

function isSquare(shape: Shape): shape is Square {
  return shape.kind === 'square';
}

function calculateArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  } else if (isSquare(shape)) {
    return shape.sideLength ** 2;
  } else {
    // TypeScript knows shape is Triangle
    return (shape.base * shape.height) / 2;
  }
}

// 5. Array Type Guards
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && 
         value.every(item => typeof item === 'string');
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && 
         value.every(item => typeof item === 'number');
}

function processArray(data: unknown) {
  if (isStringArray(data)) {
    // TypeScript knows data is string[]
    console.log(data.join(', '));
    console.log(data.map(s => s.toUpperCase()));
  } else if (isNumberArray(data)) {
    // TypeScript knows data is number[]
    console.log(data.reduce((a, b) => a + b, 0));
    console.log(Math.max(...data));
  }
}

// 6. Null/Undefined Guards
function processOptional(value: string | null | undefined) {
  // Guard against null/undefined
  if (value != null) {
    // TypeScript knows value is string here
    console.log(value.length);
    console.log(value.toUpperCase());
  }
  
  // More explicit check
  if (value !== null && value !== undefined) {
    // Also narrows to string
    console.log(value.charAt(0));
  }
}

// 7. Discriminated Union Guards
interface LoadingState {
  status: 'loading';
}

interface SuccessState<T> {
  status: 'success';
  data: T;
}

interface ErrorState {
  status: 'error';
  error: Error;
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleAsyncState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      // TypeScript knows state.data exists
      console.log('Data:', state.data);
      break;
    case 'error':
      // TypeScript knows state.error exists
      console.error('Error:', state.error.message);
      break;
    // No default needed - TypeScript ensures exhaustiveness
  }
}

// 8. React Component Type Guards
import React from 'react';

function isReactElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}

function isComponent<P = {}>(
  value: unknown
): value is React.ComponentType<P> {
  return (
    typeof value === 'function' &&
    (value.prototype?.isReactComponent || 
     typeof value === 'function')
  );
}

// 9. Combining Guards
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && 
         response.status < 300 && 
         response.data !== undefined;
}

function isErrorResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { error: string } {
  return response.status >= 400 && 
         response.error !== undefined;
}

async function fetchUser(id: string) {
  const response: ApiResponse<User> = await api.get(\`/users/\${id}\`);
  
  if (isSuccessResponse(response)) {
    // TypeScript knows response.data exists
    console.log('User:', response.data.name);
  } else if (isErrorResponse(response)) {
    // TypeScript knows response.error exists
    console.error('Error:', response.error);
  }
}

// 10. Assertion Functions (TypeScript 3.7+)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value must be a string');
  }
}

function assertIsDefined<T>(
  value: T | null | undefined
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Value must be defined');
  }
}

function processUserInput(input: unknown) {
  assertIsString(input);
  // TypeScript knows input is string after assertion
  console.log(input.toUpperCase());
  
  const user = getUserById(input);
  assertIsDefined(user);
  // TypeScript knows user is not null/undefined
  console.log(user.name);
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Commander Guardia's Wisdom:</strong> "These guards form your first 
					line of defense against runtime type errors. Typeof guards check primitives. 
					Instanceof verifies object types. In operator tests properties. Custom 
					predicates handle complex cases. Master these patterns, and your code 
					becomes a fortress against type uncertainty."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Guard Insight:</h3>
				<p>
					Type guards are TypeScript's bridge between the dynamic nature of 
					JavaScript and the static safety of types. They allow you to narrow 
					types at runtime while informing the compiler about those narrowings, 
					creating code that's both safe and flexible.
				</p>
				<p>
					The key is understanding that type guards don't just check types - 
					they teach TypeScript about your runtime checks, enabling better 
					type inference and catching potential errors before they happen.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Type Guards</h3>
				<p>
					<strong>How do type guards improve code reliability?</strong> Consider 
					how runtime checks combined with compile-time awareness prevent entire 
					categories of errors.
				</p>
				<p>
					<strong>When should you create custom type guards?</strong> Think about 
					complex data structures and external data sources that need validation.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The sun set over the Type Guard Tower as the first lesson concluded. 
					<strong>Commander Guardia</strong> surveyed the new defenses. "Well done. 
					You've established your first line of defense."
				</p>
				<p>
					<strong>Aria</strong> felt the security of proper type guards. "It's like 
					having sentries that never sleep, always watching for type mismatches!"
				</p>
				<p>
					<strong>Binary</strong> calculated the coverage. "Type safety increased by 
					85%. Runtime errors reduced to near zero. Excellent defensive metrics!"
				</p>
				<p>
					"Tomorrow," Guardia announced, "we'll explore advanced patterns - guards 
					that handle the most complex type scenarios..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;