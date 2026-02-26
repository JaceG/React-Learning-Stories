import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		forgedComponents,
		forgeComponent,
		selectedArmor,
		selectArmor,
		armoryLevel,
		levelUp,
		typeStrength,
		setTypeStrength
	} = useOutletContext();

	const [masteredPatterns, setMasteredPatterns] = useState([]);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [armoryComplete, setArmoryComplete] = useState(false);

	// Advanced TypeScript patterns
	const advancedPatterns = [
		{
			id: 'conditional-types',
			name: 'Conditional Type Armor',
			icon: '🔀',
			description: 'Components that adapt based on props',
			difficulty: 'Master',
			example: 'T extends U ? X : Y'
		},
		{
			id: 'mapped-types',
			name: 'Mapped Type Chainmail',
			icon: '🗺️',
			description: 'Transform all properties of a type',
			difficulty: 'Expert',
			example: '{ [K in keyof T]: T[K] }'
		},
		{
			id: 'utility-types',
			name: 'Utility Type Arsenal',
			icon: '🛠️',
			description: 'Leverage built-in type helpers',
			difficulty: 'Advanced',
			example: 'Partial, Required, Pick, Omit'
		},
		{
			id: 'type-guards',
			name: 'Type Guard Shield',
			icon: '🛡️',
			description: 'Runtime type checking with compile-time benefits',
			difficulty: 'Expert',
			example: 'value is Type'
		}
	];

	// Real-world challenges
	const realWorldChallenges = [
		{
			id: 'polymorphic',
			name: 'Polymorphic Component',
			description: 'Component that can render as any HTML element',
			reward: 'Ultimate Flexibility'
		},
		{
			id: 'form-library',
			name: 'Type-Safe Form Library',
			description: 'Build a mini form library with full type inference',
			reward: 'Form Mastery'
		},
		{
			id: 'design-system',
			name: 'Design System Types',
			description: 'Create a type-safe component library',
			reward: 'System Architect'
		},
		{
			id: 'api-layer',
			name: 'API Integration Layer',
			description: 'Type-safe data fetching and state management',
			reward: 'Data Guardian'
		}
	];

	// Master a pattern
	const masterPattern = (pattern) => {
		if (!masteredPatterns.find(p => p.id === pattern.id)) {
			setMasteredPatterns([...masteredPatterns, pattern]);
			setTypeStrength(prev => Math.min(100, prev + 10));
			
			if (masteredPatterns.length >= 3) {
				levelUp('grandmaster');
			}
		}
	};

	// Complete challenge
	const completeChallenge = (challenge) => {
		setSelectedChallenge(challenge);
		forgeComponent({
			id: Date.now(),
			name: challenge.name,
			type: 'advanced',
			reward: challenge.reward
		});
		
		if (forgedComponents.length >= 10 && typeStrength >= 90) {
			setArmoryComplete(true);
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Master's Chamber`}
				bridge={`"You've mastered hooks with precision," Master Typhos said as he led Aria to a sealed door deep within the armory. "Now witness patterns that bend reality itself—the advanced techniques that separate journeymen from masters." The door opened to reveal the Master's Chamber, its walls lined with glowing type definitions.`}
			/>

		<StorySection
			paragraphs={[
				<>In the deepest sanctum of the Component Armory, <strong>Master Typhos</strong> revealed the most powerful type patterns known to the TypeScript realm.</>,
				`"You've learned the basics," he said, gesturing to walls lined with glowing type definitions. "Now witness patterns that bend reality itself - types that think, adapt, and transform."`,
				<><strong>Binary</strong> scanned the complex type signatures. "These patterns... they're like meta-programming! Types that generate other types!"</>,
				<><strong>Debuggora</strong> studied the intricate type flows. "With these, we can catch errors I didn't even know were possible to detect at compile time."</>,
				`"The ultimate test," Typhos announced, "is not just knowing these patterns, but knowing when and how to wield them. Power without wisdom is chaos."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Master Type Patterns</h3>
				
				<InstructionBox character={`Master Typhos reveals the advanced armory.`}>
					Click on each advanced pattern to add it to your mastery. These are the patterns that separate beginners from masters.
				</InstructionBox>

				<div className='advanced-patterns'>
					<h4>Advanced Type Armory</h4>
					<div className='pattern-grid'>
						{advancedPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`pattern-card ${
									masteredPatterns.find(p => p.id === pattern.id) ? 'mastered' : ''
								}`}
								onClick={() => masterPattern(pattern)}
								style={{ cursor: 'pointer' }}>
								<div style={{ 
									display: 'flex', 
									alignItems: 'center', 
									gap: '10px',
									marginBottom: '10px'
								}}>
									<span style={{ fontSize: '2em' }}>{pattern.icon}</span>
									<div className='pattern-title'>{pattern.name}</div>
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
										background: pattern.difficulty === 'Master' 
											? 'rgba(255, 0, 0, 0.2)' 
											: 'rgba(0, 132, 255, 0.2)',
										borderRadius: '15px',
										fontSize: '0.9em'
									}}>
										{pattern.difficulty}
									</span>
									{masteredPatterns.find(p => p.id === pattern.id) && (
										<span style={{ color: '#27ae60' }}>✓ Mastered</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='real-world-challenges' style={{ marginTop: '40px' }}>
					<h4>Real-World Challenges</h4>
					<InstructionBox character={`Typhos presents the ultimate tests.`}>
						Complete these real-world challenges to prove your mastery. Each challenge rewards you with a powerful new capability.
					</InstructionBox>
					<div className='challenge-grid'>
						{realWorldChallenges.map(challenge => (
							<div
								key={challenge.id}
								className='challenge-card'
								style={{
									background: selectedChallenge?.id === challenge.id 
										? 'rgba(0, 132, 255, 0.2)' 
										: 'rgba(255, 255, 255, 0.1)',
									padding: '20px',
									borderRadius: '8px',
									marginBottom: '15px',
									cursor: 'pointer',
									border: '1px solid rgba(0, 132, 255, 0.3)'
								}}
								onClick={() => completeChallenge(challenge)}>
								<h5>{challenge.name}</h5>
								<p>{challenge.description}</p>
								<div style={{ 
									marginTop: '10px',
									color: '#0084ff',
									fontStyle: 'italic'
								}}>
									Reward: {challenge.reward}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='mastery-progress' style={{ marginTop: '40px' }}>
					<h4>Armory Mastery</h4>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
						gap: '20px',
						textAlign: 'center'
					}}>
						<div>
							<div style={{ fontSize: '2em', color: '#0084ff' }}>
								{forgedComponents.length}
							</div>
							<div>Components Forged</div>
						</div>
						<div>
							<div style={{ fontSize: '2em', color: '#27ae60' }}>
								{masteredPatterns.length}
							</div>
							<div>Patterns Mastered</div>
						</div>
						<div>
							<div style={{ fontSize: '2em', color: '#f39c12' }}>
								{typeStrength}%
							</div>
							<div>Type Strength</div>
						</div>
					</div>
				</div>

				{armoryComplete && (
					<div className='mastery-achievement'>
						<h4>🎉 Component Armory Mastered!</h4>
						<p>
							You have forged unbreakable components with the power of TypeScript. 
							Your type definitions are legendary, your components invincible!
						</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Advanced TypeScript Patterns</span>
				</div>
				<CodeExample
					title={`Master-Level TypeScript React Patterns`}
					discoveredBy={`Transcribed by Aria in the Master's Chamber`}
					code={`// Master-Level TypeScript React Patterns

// 1. Polymorphic Component Pattern
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> = 
  React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// Implementation
type ButtonProps<C extends React.ElementType> = 
  PolymorphicComponentPropWithRef<C, {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
  }>;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    { as, variant = 'primary', size = 'medium', ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
    return (
      <Component
        ref={ref}
        className={\`btn btn-\${variant} btn-\${size}\`}
        {...props}
      />
    );
  }
);

// Usage - TypeScript infers correct props!
<Button onClick={() => {}} />  // button props
<Button as="a" href="/home" />  // anchor props
<Button as={Link} to="/about" /> // Link component props

// 2. Conditional Types for Props
type ConditionalProps<T> = T extends 'async'
  ? {
      mode: T;
      onLoad: () => Promise<void>;
      onError: (error: Error) => void;
    }
  : T extends 'sync'
  ? {
      mode: T;
      onComplete: () => void;
    }
  : never;

type DataFetcherProps<T extends 'sync' | 'async'> = {
  url: string;
} & ConditionalProps<T>;

function DataFetcher<T extends 'sync' | 'async'>(
  props: DataFetcherProps<T>
) {
  if (props.mode === 'async') {
    // TypeScript knows props has onLoad and onError
    props.onLoad().catch(props.onError);
  } else {
    // TypeScript knows props has onComplete
    props.onComplete();
  }
}

// 3. Template Literal Types for CSS Props
type CSSUnits = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';
type CSSValue<U extends CSSUnits> = \`\${number}\${U}\`;

interface StyledBoxProps {
  width?: CSSValue<CSSUnits>;
  height?: CSSValue<CSSUnits>;
  margin?: CSSValue<CSSUnits> | \`\${CSSValue<CSSUnits>} \${CSSValue<CSSUnits>}\`;
  padding?: CSSValue<CSSUnits>;
}

const StyledBox: React.FC<StyledBoxProps> = ({ width, height, margin, padding, children }) => {
  return (
    <div style={{ width, height, margin, padding }}>
      {children}
    </div>
  );
};

// Usage with type checking
<StyledBox 
  width="100px"      // ✅
  height="50vh"      // ✅
  margin="10px 20px" // ✅
  padding="invalid"  // ❌ Type error!
/>

// 4. Discriminated Union for Component States
interface IdleState {
  status: 'idle';
}

interface LoadingState {
  status: 'loading';
  progress: number;
}

interface SuccessState<T> {
  status: 'success';
  data: T;
}

interface ErrorState {
  status: 'error';
  error: Error;
}

type ComponentState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

function AsyncComponent<T>() {
  const [state, setState] = useState<ComponentState<T>>({ status: 'idle' });
  
  switch (state.status) {
    case 'idle':
      return <button onClick={load}>Start Loading</button>;
    case 'loading':
      return <progress value={state.progress} max={100} />;
    case 'success':
      return <DisplayData data={state.data} />;
    case 'error':
      return <ErrorDisplay error={state.error} />;
    // No default needed - TypeScript ensures exhaustive check
  }
}

// 5. Builder Pattern with Fluent Interface
class ComponentBuilder<T extends Record<string, any> = {}> {
  private props: T = {} as T;
  
  withProp<K extends string, V>(
    key: K,
    value: V
  ): ComponentBuilder<T & Record<K, V>> {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      { props: { ...this.props, [key]: value } }
    );
  }
  
  build(): T {
    return this.props;
  }
}

// Usage with type inference
const props = new ComponentBuilder()
  .withProp('name', 'John')
  .withProp('age', 30)
  .withProp('email', 'john@example.com')
  .build();
// Type: { name: string; age: number; email: string }

// 6. Type-Safe Event System
type EventMap = {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  dataUpdate: { id: string; changes: Record<string, any> };
};

type EventKey = keyof EventMap;
type EventHandler<K extends EventKey> = (payload: EventMap[K]) => void;

class TypedEventEmitter {
  private handlers: {
    [K in EventKey]?: EventHandler<K>[];
  } = {};
  
  on<K extends EventKey>(event: K, handler: EventHandler<K>) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }
  
  emit<K extends EventKey>(event: K, payload: EventMap[K]) {
    this.handlers[event]?.forEach(handler => handler(payload));
  }
}

// 7. Type-Safe Form with Inference
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type FormFields<T> = {
  [K in keyof T]: FormField<T[K]>;
};

type FormConfig<T> = {
  [K in keyof T]: {
    initial: T[K];
    validate?: (value: T[K]) => string | undefined;
  };
};

function createForm<T extends Record<string, any>>(config: FormConfig<T>) {
  type Fields = FormFields<T>;
  type Values = T;
  
  const [fields, setFields] = useState<Fields>(() => {
    const initial = {} as Fields;
    for (const key in config) {
      initial[key] = {
        value: config[key].initial,
        touched: false
      };
    }
    return initial;
  });
  
  const getValues = (): Values => {
    const values = {} as Values;
    for (const key in fields) {
      values[key] = fields[key].value;
    }
    return values;
  };
  
  const setFieldValue = <K extends keyof T>(key: K, value: T[K]) => {
    setFields(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
        error: config[key].validate?.(value)
      }
    }));
  };
  
  return { fields, getValues, setFieldValue };
}

// Usage with full type inference
const form = createForm({
  username: {
    initial: '',
    validate: (value) => value.length < 3 ? 'Too short' : undefined
  },
  age: {
    initial: 0,
    validate: (value) => value < 18 ? 'Too young' : undefined
  }
});

// TypeScript knows the exact shape!
form.setFieldValue('username', 'john'); // ✅
form.setFieldValue('age', 25);          // ✅
form.setFieldValue('invalid', 'test');  // ❌ Type error!`}
				/>
				<div className='code-tooltip'>
					<strong>Master Typhos's Final Wisdom:</strong> "These patterns represent 
					the pinnacle of TypeScript mastery. Polymorphic components adapt to any 
					use case. Conditional types create dynamic APIs. Template literals enforce 
					CSS correctness. Master these, and no type challenge will defeat you."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Master's Insight:`,
					content: `Advanced TypeScript patterns transform React development from a craft into an art. These patterns don't just catch errors—they guide development, enforce architectural decisions, and create APIs that are a joy to use. The true mastery lies not in using every pattern, but in knowing which pattern serves your specific need. Sometimes a simple interface suffices; other times, only a complex conditional type will do. Wisdom is knowing the difference.`
				}}
				reflectionQuestions={[
					`How do advanced types change your approach to API design? Consider how types can guide users toward correct usage and prevent entire categories of errors.`,
					`When is complexity justified in type definitions? Think about the balance between type safety, developer experience, and maintainability.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 46 (Evening)`,
					content: `Master Typhos took me to the Master's Chamber today—the deepest sanctum of the Component Armory. I learned the most powerful type patterns: Conditional Type Armor that adapts based on props, Mapped Type Chainmail that transforms properties, Utility Types like Partial and Pick, and Type Guard Shields for runtime checking. The real-world challenges pushed me to create Polymorphic Components, Type-Safe Form Libraries, and Design System Types. Binary called it "meta-programming—types that generate other types!" Debuggora noted these catch errors she didn't know were possible to detect. Typhos's final wisdom: "Power without wisdom is chaos." My Type Strength reached 100%—I've mastered the Component Armory!`
				}}
				lessonEnding={[
					`Master Typhos stood before the completed armory. "You have proven yourself worthy. These type patterns are now yours to wield."`,
					`Aria examined her arsenal of type-safe components. "I understand now. Types aren't constraints—they're superpowers."`,
					`Binary compiled the final statistics. "100% type coverage achieved. Zero runtime type errors possible. Mission complete!"`,
					`Debuggora smiled. "With these patterns, debugging becomes almost unnecessary. The types catch everything!"`,
					`"Your training here is complete," Typhos declared. "But the realm of types holds deeper secrets still. In the Generic Forge, you'll learn to create components that adapt to any data type—true type flexibility without sacrificing safety..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;
