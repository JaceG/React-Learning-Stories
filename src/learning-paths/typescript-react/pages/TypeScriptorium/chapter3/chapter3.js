import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		clearForge,
		setCompileStatus
	} = useOutletContext();

	const [advancedMode, setAdvancedMode] = useState('union');
	const [synthesisComplete, setSynthesisComplete] = useState(false);

	const advancedPatterns = {
		union: {
			title: 'Union Types',
			description: 'Multiple possible types',
			example: `// Union Types - Multiple Possibilities
type Status = 'loading' | 'success' | 'error';
type ID = string | number;

interface Response<T> {
  status: Status;
  data?: T;
  error?: string;
}

function handleResponse(response: Response<User>) {
  switch (response.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserProfile data={response.data!} />;
    case 'error':
      return <ErrorMessage message={response.error!} />;
  }
}`
		},
		intersection: {
			title: 'Intersection Types',
			description: 'Combining multiple types',
			example: `// Intersection Types - Combining Powers
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
}

// Combine both types
type TimestampedUser = User & Timestamped;

const user: TimestampedUser = {
  id: '123',
  name: 'Aria',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mixins Pattern
type WithLoading = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

type WithError = {
  error: Error | null;
  setError: (error: Error | null) => void;
};

type AsyncState = WithLoading & WithError;`
		},
		conditional: {
			title: 'Conditional Types',
			description: 'Types that depend on conditions',
			example: `// Conditional Types - Dynamic Type Resolution
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? true : false;

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : T;

type StringArray = ElementType<string[]>; // string
type NumberType = ElementType<number>; // number

// Conditional React Props
type ConditionalProps<T> = T extends { admin: true }
  ? { adminPanel: React.ReactNode }
  : { userPanel: React.ReactNode };

// Utility Types
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? ReadonlyDeep<T[P]> 
    : T[P];
};`
		},
		mapped: {
			title: 'Mapped Types',
			description: 'Transform properties of types',
			example: `// Mapped Types - Type Transformation
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Custom mapped type for form state
type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
};

interface LoginForm {
  username: string;
  password: string;
}

type LoginFormState = FormState<LoginForm>;
// Result:
// {
//   values: { username: string; password: string; }
//   errors: { username?: string; password?: string; }
//   touched: { username?: boolean; password?: boolean; }
// }`
		},
		template: {
			title: 'Template Literal Types',
			description: 'String manipulation in types',
			example: `// Template Literal Types - String Type Magic
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'

// Dynamic Event Handlers
type EventHandlers<T extends string> = {
  [K in EventName<T>]: (event: Event) => void;
};

type ButtonEvents = EventHandlers<'click' | 'hover' | 'focus'>;
// Result:
// {
//   onClick: (event: Event) => void;
//   onHover: (event: Event) => void;
//   onFocus: (event: Event) => void;
// }

// API Route Types
type APIRoute<T extends string> = \`/api/\${T}\`;
type UserRoute = APIRoute<'users'>; // '/api/users'
type PostRoute = APIRoute<'posts'>; // '/api/posts'`
		}
	};

	const completeSynthesis = () => {
		setCompileStatus('forging');
		setTimeout(() => {
			setSynthesisComplete(true);
			setCompileStatus('success');
		}, 2000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Type Synthesis`}
				bridge={`With component contracts mastered, Master Typus led Aria to the deepest chamber of the Type Forge. "You've learned to type values and components," he said, his eyes gleaming with ancient knowledge. "Now witness the deeper mysteries - advanced patterns that can shape reality itself."`}
			/>

		<StorySection
			paragraphs={[
				<>"Basic types are just the beginning," <strong>Master Typus</strong> revealed. "Watch as we forge union types, intersection types, and conditional types. Each adds flexibility while maintaining safety."</>,
				<><strong>Aria</strong> combined her state management knowledge with TypeScript. "Typed reducers! The actions know their own shapes!"</>,
				`"Now you see the power. Every dispatch, every state update, every prop - all guaranteed correct at compile time."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Type Synthesis</h3>
				<InstructionBox character={`Master Typus reveals the Synthesis Crystal.`}>
					Master the advanced patterns of the Type Forge! Select each type pattern to understand its power.
				</InstructionBox>

				<div className='type-controls'>
					{Object.entries(advancedPatterns).map(([key, pattern]) => (
						<button 
							key={key}
							className={`type-button ${advancedMode === key ? 'active' : ''}`}
							onClick={() => setAdvancedMode(key)}>
							{pattern.title}
						</button>
					))}
				</div>

				<div className='type-workbench'>
					<h4>{advancedPatterns[advancedMode].title}</h4>
					<p style={{ marginBottom: '20px', color: '#7f8c8d' }}>
						{advancedPatterns[advancedMode].description}
					</p>
					
					<div className='contract-display' style={{ fontSize: '0.9em' }}>
						<pre>{advancedPatterns[advancedMode].example}</pre>
					</div>
				</div>

				<div className='forge-illustration' style={{ marginTop: '30px' }}>
					<button 
						className='forge-button'
						onClick={completeSynthesis}
						disabled={synthesisComplete}
						style={{ width: '300px' }}>
						{synthesisComplete ? '✓ Synthesis Complete!' : '⚒️ Complete Type Synthesis'}
					</button>
				</div>

				{synthesisComplete && (
					<div className='type-workbench' style={{ 
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						color: 'white',
						marginTop: '20px'
					}}>
						<h4>🎉 Type Mastery Achieved!</h4>
						<p>You've learned to forge:</p>
						<ul style={{ textAlign: 'left', marginLeft: '20px' }}>
							<li>Basic type annotations and interfaces</li>
							<li>Component prop types and contracts</li>
							<li>Union and intersection types</li>
							<li>Conditional and mapped types</li>
							<li>Template literal types</li>
						</ul>
					</div>
				)}
			</div>

			<CodeExample
				title={`Complete TypeScript + React Architecture`}
				discoveredBy={`Master Typus's Final Teaching`}
				code={`// The Complete Type System - Aria's Implementation
import React, { useState, useReducer, useContext, createContext } from 'react';

// Domain Types
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  status: 'draft' | 'published' | 'archived';
}

// State Management with Types
type Action<T extends string, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };

type AppActions = 
  | Action<'SET_USER', User>
  | Action<'LOGOUT'>
  | Action<'ADD_POST', Post>
  | Action<'UPDATE_POST', { id: string; updates: Partial<Post> }>
  | Action<'DELETE_POST', string>;

interface AppState {
  user: User | null;
  posts: Post[];
  isLoading: boolean;
}

function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updates }
            : post
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      return state;
  }
}

// Typed Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom Hook with Types
function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// Generic Component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T) => string;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor,
  emptyMessage = 'No items'
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// HOC with Types
function withAuth<P extends object>(
  Component: React.ComponentType<P & { user: User }>
): React.FC<P> {
  return (props: P) => {
    const { state } = useAppContext();
    
    if (!state.user) {
      return <div>Please login to continue</div>;
    }
    
    return <Component {...props} user={state.user} />;
  };
}

// Utility Types in Action
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

type FormTouched<T> = {
  [K in keyof T]?: boolean;
};

// Advanced Form Handling
interface FormConfig<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: FormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = <K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  };
}

// Master Typus's Final Wisdom:
// "With TypeScript, you don't just write components - you forge contracts.
// You don't just manage state - you guarantee its shape.
// You don't just handle errors - you make them impossible.
// This is the true power of the Type Forge."`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Type Synthesis Insight`,
					content: `Advanced TypeScript patterns unlock the full potential of type safety. Union types model real-world alternatives, intersection types compose behaviors, conditional types adapt to circumstances, and mapped types transform entire structures. Together, they create a type system that's both flexible and bulletproof, catching errors at compile time while enabling powerful abstractions.`
				}}
				reflectionQuestions={[
					`How do union types help model real application states? Consider loading states, user roles, or response types.`,
					`When would you use conditional types over simple unions? Think about type relationships that depend on other types.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 45 (Evening)`,
					content: `The Type Forge has transformed how I think about code. Every type is a promise, every interface a contract. I mastered union types, intersection types, conditional types, mapped types, and even template literal types! With generics, I can create reusable patterns. With conditional types, I can make types that adapt. Binary is practically glowing with the mathematical precision, and even Debuggora admits she's never seen code this robust. Master Typus's final wisdom: "The Type Forge's greatest gift isn't catching errors - it's making entire categories of bugs impossible." Ready for the Component Armory!`
				}}
				lessonEnding={[
					`Aria successfully forged a complete type system. "Every component typed, every function safe, every prop guaranteed."`,
					`Binary glowed with new type-checking abilities. Debuggora could see potential errors in the very structure of code.`,
					`Master Typus smiled proudly. "You've learned to forge unbreakable code. Your components are now contracts, your functions are now guarantees."`,
					`"What's next?" Aria asked, her code now fortified with types.`,
					`Master Typus pointed upward. "The Component Armory awaits. You've learned to forge types - now learn to apply them to every React pattern you know!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;