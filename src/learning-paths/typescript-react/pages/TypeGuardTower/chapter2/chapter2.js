import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
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

	const [selectedAdvancedGuard, setSelectedAdvancedGuard] = useState(null);
	const [complexPatternsMastered, setComplexPatternsMastered] = useState([]);
	const [complexGuardMastery, setComplexGuardMastery] = useState(0);

	// Advanced guard patterns
	const advancedGuards = [
		{
			id: 'exhaustive-checks',
			name: 'Exhaustive Checking',
			icon: '🔐',
			description: 'Ensure all cases are handled',
			power: 'Complete type coverage',
			difficulty: 'Advanced'
		},
		{
			id: 'nested-guards',
			name: 'Nested Object Guards',
			icon: '🏗️',
			description: 'Deep type validation',
			power: 'Recursive type safety',
			difficulty: 'Expert'
		},
		{
			id: 'generic-guards',
			name: 'Generic Type Guards',
			icon: '🧬',
			description: 'Reusable guard patterns',
			power: 'Universal protection',
			difficulty: 'Master'
		},
		{
			id: 'branded-types',
			name: 'Branded Type Guards',
			icon: '🏷️',
			description: 'Nominal type checking',
			power: 'Type uniqueness',
			difficulty: 'Expert'
		}
	];

	// Complex scenarios
	const complexScenarios = [
		{
			id: 'json-validator',
			name: 'JSON Schema Validator',
			description: 'Validate complex JSON structures',
			challenge: 'Deep nesting'
		},
		{
			id: 'form-validator',
			name: 'Advanced Form Validation',
			description: 'Multi-step form with complex rules',
			challenge: 'Conditional fields'
		},
		{
			id: 'api-contract',
			name: 'API Contract Guard',
			description: 'Ensure API responses match contracts',
			challenge: 'Version handling'
		}
	];

	// Master advanced guard
	const masterAdvancedGuard = (guard) => {
		setSelectedAdvancedGuard(guard);
		if (!complexPatternsMastered.includes(guard.id)) {
			setComplexPatternsMastered([...complexPatternsMastered, guard.id]);
			setGuardStrength(prev => Math.min(100, prev + 15));
			setComplexGuardMastery(prev => Math.min(100, prev + 25));
		}
		
		if (complexPatternsMastered.length >= 2 && towerLevel === 'sentinel') {
			levelUp('guardian');
		}
	};

	// Complete complex scenario
	const completeComplexScenario = (scenario) => {
		createGuard({
			id: Date.now(),
			name: scenario.name,
			type: 'advanced',
			challenge: scenario.challenge
		});
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`Advanced Guard Patterns`}
				bridge={`Commander Guardia led Aria deeper into the tower's strategic command center. "You've mastered the foundations," she acknowledged, "but real applications demand more sophisticated defenses. Basic guards protect against simple threats - now we forge guards that handle complexity."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The walls displayed intricate type hierarchies and nested structures. 
					"Advanced guards," Guardia explained, "handle the reality of modern 
					applications - deep objects, conditional types, and complex validations."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the patterns. "These guards can validate 
					entire data structures recursively! No malformed data can slip through."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> traced the validation flows. "With exhaustive 
					checking, we catch every edge case. The compiler becomes our ally!"
				</p>

				<p className='story-paragraph'>
					"Master these patterns," Guardia commanded, "and you'll guard against 
					the most insidious type errors - the ones that hide in complexity."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Guard Patterns</h3>

				<InstructionBox character={`Commander Guardia reveals four advanced guard patterns, each glowing with increasing intensity.`}>
					{`"These patterns handle real-world complexity. Master each one to unlock Advanced Guardian status, then prove your skills against the complex scenarios below."`}
				</InstructionBox>
				
				<div className="progress-tracker" style={{ 
					background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1))', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(52, 152, 219, 0.3)',
					position: 'relative',
					overflow: 'hidden'
				}}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', gap: '30px' }}>
							<div>
								<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Current Level: </span>
								<span style={{ color: '#3498db', fontWeight: 'bold' }}>{towerLevel}</span>
							</div>
							<div>
								<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Complex Guards: </span>
								<span style={{ color: '#2980b9', fontWeight: 'bold' }}>{complexPatternsMastered.length}/4</span>
							</div>
						</div>
						{complexGuardMastery >= 75 && (
							<div style={{ color: '#27ae60', fontWeight: 'bold' }}>
								🛡️ Advanced Guardian Status
							</div>
						)}
					</div>
				</div>
				
				<div className='guard-workshop'>
					{advancedGuards.map(guard => (
						<div
							key={guard.id}
							className={`guard-pattern ${
								selectedAdvancedGuard?.id === guard.id ? 'selected' : ''
							} ${
								complexPatternsMastered.includes(guard.id) ? 'guarded' : ''
							}`}
							onClick={() => masterAdvancedGuard(guard)}>
							<div className='pattern-header'>
								<span className='pattern-icon'>{guard.icon}</span>
								<div className='pattern-name'>{guard.name}</div>
							</div>
							<div className='pattern-description'>{guard.description}</div>
							<div style={{
								marginTop: '15px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<span style={{
									padding: '5px 10px',
									background: guard.difficulty === 'Master'
										? 'rgba(255, 0, 0, 0.2)'
										: guard.difficulty === 'Expert'
										? 'rgba(255, 107, 0, 0.2)'
										: 'rgba(52, 73, 94, 0.2)',
									borderRadius: '15px',
									fontSize: '0.85em'
								}}>
									{guard.difficulty}
								</span>
								{complexPatternsMastered.includes(guard.id) && (
									<span style={{ color: '#27ae60' }}>✓ Mastered</span>
								)}
							</div>
							{selectedAdvancedGuard?.id === guard.id && (
								<div style={{
									marginTop: '15px',
									padding: '10px',
									background: 'rgba(52, 73, 94, 0.1)',
									borderRadius: '5px',
									fontSize: '0.9em'
								}}>
									<strong>Power:</strong> {guard.power}
								</div>
							)}
						</div>
					))}
				</div>

				<div className='complex-scenarios' style={{ marginTop: '40px' }}>
					<h4>Complex Guard Challenges</h4>
					{complexScenarios.map(scenario => (
						<div
							key={scenario.id}
							className='guard-item'
							onClick={() => completeComplexScenario(scenario)}
							style={{
								background: guardedTypes.find(g => g.name === scenario.name)
									? 'rgba(39, 174, 96, 0.1)'
									: 'rgba(52, 73, 94, 0.08)'
							}}>
							<h5>{scenario.name}</h5>
							<p>{scenario.description}</p>
							<div style={{
								marginTop: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<span style={{
									color: '#e74c3c',
									fontSize: '0.9em'
								}}>
									Challenge: {scenario.challenge}
								</span>
								{guardedTypes.find(g => g.name === scenario.name) && (
									<span style={{ color: '#27ae60' }}>✓ Completed</span>
								)}
							</div>
						</div>
					))}
				</div>

				<div className='type-narrowing'>
					<h4>Type Narrowing in Action</h4>
					<div className='narrowing-step'>
						<div className='step-number'>1</div>
						<span>Start with union type: A | B | C</span>
					</div>
					<div className='narrowing-step'>
						<div className='step-number'>2</div>
						<span>Apply guard: if (isA(value))</span>
					</div>
					<div className='narrowing-step'>
						<div className='step-number'>3</div>
						<span>Inside block: value is A</span>
					</div>
					<div className='narrowing-step'>
						<div className='step-number'>4</div>
						<span>Else block: value is B | C</span>
					</div>
				</div>

				<div className='tower-levels' style={{ marginTop: '30px' }}>
					<div className={`level-indicator ${towerLevel === 'watchman' ? 'active' : ''}`}>
						<span className='level-icon'>👁️</span>
						<span className='level-name'>Watchman</span>
					</div>
					<div className={`level-indicator ${towerLevel === 'sentinel' ? 'active' : ''}`}>
						<span className='level-icon'>⚔️</span>
						<span className='level-name'>Sentinel</span>
					</div>
					<div className={`level-indicator ${towerLevel === 'guardian' ? 'active' : ''}`}>
						<span className='level-icon'>🛡️</span>
						<span className='level-name'>Guardian</span>
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Advanced Type Guard Patterns</span>
				</div>
				<CodeExample
					title={`Advanced Type Guard Patterns`}
					discoveredBy={`Transcribed by Aria in the Strategic Command Center`}
					code={`// Advanced TypeScript Type Guard Patterns

// 1. Exhaustive Checking with Never
type Color = 'red' | 'green' | 'blue';

function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function getColorHex(color: Color): string {
  switch (color) {
    case 'red':
      return '#FF0000';
    case 'green':
      return '#00FF00';
    case 'blue':
      return '#0000FF';
    default:
      // If we miss a case, TypeScript will error here
      return assertNever(color);
  }
}

// 2. Nested Object Guards
interface User {
  id: string;
  profile: {
    name: string;
    email: string;
    preferences?: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
}

function hasCompleteProfile(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'profile' in value &&
    typeof value.profile === 'object' &&
    value.profile !== null &&
    'name' in value.profile &&
    typeof value.profile.name === 'string' &&
    'email' in value.profile &&
    typeof value.profile.email === 'string'
  );
}

// More elegant with a validation library pattern
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function validateUser(value: unknown): value is User {
  if (!isObject(value)) return false;
  if (typeof value.id !== 'string') return false;
  
  if (!isObject(value.profile)) return false;
  const profile = value.profile;
  
  if (typeof profile.name !== 'string') return false;
  if (typeof profile.email !== 'string') return false;
  
  if (profile.preferences !== undefined) {
    if (!isObject(profile.preferences)) return false;
    const prefs = profile.preferences;
    
    if (!['light', 'dark'].includes(prefs.theme as string)) return false;
    if (typeof prefs.notifications !== 'boolean') return false;
  }
  
  return true;
}

// 3. Generic Type Guards
function isArray<T>(
  value: unknown,
  itemGuard: (item: unknown) => item is T
): value is T[] {
  return (
    Array.isArray(value) &&
    value.every(item => itemGuard(item))
  );
}

function isRecord<K extends string | number | symbol, V>(
  value: unknown,
  keyGuard: (key: unknown) => key is K,
  valueGuard: (value: unknown) => value is V
): value is Record<K, V> {
  if (!isObject(value)) return false;
  
  return Object.entries(value).every(([key, val]) =>
    keyGuard(key) && valueGuard(val)
  );
}

// Usage
const isStringArray = (value: unknown): value is string[] =>
  isArray(value, (item): item is string => typeof item === 'string');

const isNumberRecord = (value: unknown): value is Record<string, number> =>
  isRecord(
    value,
    (key): key is string => typeof key === 'string',
    (val): val is number => typeof val === 'number'
  );

// 4. Branded Types and Guards
type UserId = string & { readonly brand: unique symbol };
type PostId = string & { readonly brand: unique symbol };

function isUserId(value: string): value is UserId {
  // Validate format
  return /^user_[a-zA-Z0-9]{8}$/.test(value);
}

function isPostId(value: string): value is PostId {
  // Validate format
  return /^post_[a-zA-Z0-9]{8}$/.test(value);
}

function createUserId(id: string): UserId {
  if (!isUserId(id)) {
    throw new Error('Invalid user ID format');
  }
  return id as UserId;
}

// 5. Discriminated Union with Multiple Discriminators
interface VideoContent {
  type: 'video';
  format: 'mp4' | 'webm';
  url: string;
  duration: number;
}

interface AudioContent {
  type: 'audio';
  format: 'mp3' | 'wav';
  url: string;
  duration: number;
}

interface ImageContent {
  type: 'image';
  format: 'jpg' | 'png' | 'webp';
  url: string;
  dimensions: { width: number; height: number };
}

type MediaContent = VideoContent | AudioContent | ImageContent;

function isVideoContent(content: MediaContent): content is VideoContent {
  return content.type === 'video' && 
         ['mp4', 'webm'].includes(content.format);
}

function processMedia(content: MediaContent) {
  // First level discrimination
  switch (content.type) {
    case 'video':
    case 'audio':
      // Both have duration
      console.log(\`Duration: \${content.duration}s\`);
      
      // Second level discrimination
      if (content.type === 'video' && content.format === 'mp4') {
        // Specific handling for MP4 videos
      }
      break;
      
    case 'image':
      console.log(\`Size: \${content.dimensions.width}x\${content.dimensions.height}\`);
      break;
  }
}

// 6. Async Type Guards
async function isValidUser(id: string): Promise<boolean> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.ok;
  } catch {
    return false;
  }
}

// Type guard with side effects
class ValidationCache {
  private cache = new Map<string, boolean>();
  
  async isValid<T>(
    value: T,
    validator: (val: T) => Promise<boolean>
  ): Promise<boolean> {
    const key = JSON.stringify(value);
    
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    
    const result = await validator(value);
    this.cache.set(key, result);
    return result;
  }
}

// 7. Complex Form Validation Guards
interface FormField<T> {
  value: T;
  touched: boolean;
  errors: string[];
}

interface LoginForm {
  email: FormField<string>;
  password: FormField<string>;
  rememberMe: FormField<boolean>;
}

function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function isValidLoginForm(form: unknown): form is LoginForm {
  if (!isObject(form)) return false;
  
  // Check structure
  const hasValidStructure = 
    'email' in form && isObject(form.email) &&
    'password' in form && isObject(form.password) &&
    'rememberMe' in form && isObject(form.rememberMe);
    
  if (!hasValidStructure) return false;
  
  // Type cast for easier access
  const typedForm = form as LoginForm;
  
  // Validate email field
  if (typeof typedForm.email.value !== 'string') return false;
  if (typeof typedForm.email.touched !== 'boolean') return false;
  if (!Array.isArray(typedForm.email.errors)) return false;
  
  // Validate content
  if (typedForm.email.touched && !isValidEmail(typedForm.email.value)) {
    return false;
  }
  
  return true;
}

// 8. Recursive Type Guards
type NestedArray<T> = T | NestedArray<T>[];

function flattenArray<T>(
  arr: NestedArray<T>[],
  itemGuard: (item: unknown) => item is T
): T[] {
  const result: T[] = [];
  
  function flatten(item: NestedArray<T>): void {
    if (Array.isArray(item)) {
      item.forEach(flatten);
    } else if (itemGuard(item)) {
      result.push(item);
    }
  }
  
  arr.forEach(flatten);
  return result;
}

// 9. Union Type Refinement
type Result<T, E> = 
  | { success: true; data: T }
  | { success: false; error: E };

function isSuccess<T, E>(
  result: Result<T, E>
): result is { success: true; data: T } {
  return result.success === true;
}

function isError<T, E>(
  result: Result<T, E>
): result is { success: false; error: E } {
  return result.success === false;
}

// Advanced pattern matching
function matchResult<T, E, R>(
  result: Result<T, E>,
  patterns: {
    success: (data: T) => R;
    error: (error: E) => R;
  }
): R {
  if (isSuccess(result)) {
    return patterns.success(result.data);
  } else {
    return patterns.error(result.error);
  }
}

// 10. Schema Validation Pattern
interface Schema<T> {
  validate(value: unknown): value is T;
  parse(value: unknown): T;
}

class StringSchema implements Schema<string> {
  constructor(
    private minLength?: number,
    private maxLength?: number,
    private pattern?: RegExp
  ) {}
  
  validate(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    if (this.minLength && value.length < this.minLength) return false;
    if (this.maxLength && value.length > this.maxLength) return false;
    if (this.pattern && !this.pattern.test(value)) return false;
    return true;
  }
  
  parse(value: unknown): string {
    if (!this.validate(value)) {
      throw new Error('Invalid string value');
    }
    return value;
  }
}

// Composable schemas
class ObjectSchema<T extends Record<string, unknown>> 
  implements Schema<T> {
  constructor(
    private shape: { [K in keyof T]: Schema<T[K]> }
  ) {}
  
  validate(value: unknown): value is T {
    if (!isObject(value)) return false;
    
    for (const [key, schema] of Object.entries(this.shape)) {
      if (!schema.validate(value[key])) return false;
    }
    
    return true;
  }
  
  parse(value: unknown): T {
    if (!this.validate(value)) {
      throw new Error('Invalid object value');
    }
    return value;
  }
}`}
				/>
				<div className='code-tooltip'>
					<strong>Commander Guardia's Advanced Teaching:</strong> "These patterns 
					handle the complexity of real-world applications. Exhaustive checking ensures 
					no case is missed. Nested guards validate deep structures. Generic guards 
					create reusable patterns. Branded types add nominal typing to TypeScript. 
					Master these, and no type complexity will breach your defenses."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Advanced Guard Insight:`,
					content: `Advanced type guards go beyond simple type checking to handle complex, real-world scenarios. They validate nested structures, ensure exhaustive handling, and create reusable patterns that scale with your application. The power lies in composition - building complex guards from simple ones, creating validation schemas that mirror your domain logic, and ensuring that your runtime checks perfectly align with your compile-time types.`
				}}
				reflectionQuestions={[
					`How do exhaustive checks prevent future bugs? Consider how the compiler becomes your ally in catching missed cases.`,
					`When is a generic guard better than specific ones? Think about reusability and the DRY principle in type checking.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 48 (Afternoon)`,
					content: `Commander Guardia brought me to the tower's strategic command center this afternoon. The complexity here is staggering - intricate type hierarchies and nested structures cover every surface. I learned four advanced patterns: exhaustive checking (using 'never' to catch missed cases), nested object guards (deep validation), generic type guards (reusable patterns), and branded types (nominal type checking). Binary analyzed everything excitedly: "Recursive validation! No malformed data can slip through!" Complex guard mastery: 100%. Guardia's teaching: "The power lies in composition - building complex guards from simple ones." Advanced Guardian status achieved!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
