import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
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

	const [selectedHook, setSelectedHook] = useState(null);
	const [hookMastery, setHookMastery] = useState(0);
	const [customHooks, setCustomHooks] = useState([]);

	// TypeScript hook patterns
	const hookPatterns = [
		{
			id: 'useState-typed',
			name: 'Typed useState',
			icon: '🎣',
			description: 'State with explicit type definitions',
			complexity: 'Basic',
			example: 'useState<Type>(initialValue)'
		},
		{
			id: 'useReducer-typed',
			name: 'Typed useReducer',
			icon: '⚖️',
			description: 'Complex state with action types',
			complexity: 'Advanced',
			example: 'useReducer<State, Action>(reducer, initial)'
		},
		{
			id: 'useContext-typed',
			name: 'Typed Context',
			icon: '🌐',
			description: 'Strongly typed context values',
			complexity: 'Intermediate',
			example: 'createContext<ContextType>(defaultValue)'
		},
		{
			id: 'custom-hooks',
			name: 'Custom Hook Types',
			icon: '🔧',
			description: 'Type-safe custom hooks',
			complexity: 'Advanced',
			example: 'useCustomHook<T>(): ReturnType'
		}
	];

	// Hook forge scenarios
	const forgeScenarios = [
		{
			id: 'form-hook',
			name: 'Form Management Hook',
			description: 'Type-safe form state and validation'
		},
		{
			id: 'fetch-hook',
			name: 'Data Fetching Hook',
			description: 'Generic hook for API calls'
		},
		{
			id: 'storage-hook',
			name: 'Local Storage Hook',
			description: 'Typed persistent state'
		},
		{
			id: 'animation-hook',
			name: 'Animation Hook',
			description: 'Type-safe animation controls'
		}
	];

	// Master a hook pattern
	const masterHook = (hook) => {
		setSelectedHook(hook);
		setHookMastery(prev => Math.min(100, prev + 25));
		setTypeStrength(prev => Math.min(100, prev + 10));
		
		if (hookMastery >= 50) {
			levelUp('master');
		}
	};

	// Forge custom hook
	const forgeCustomHook = (scenario) => {
		const newHook = {
			id: Date.now(),
			name: scenario.name,
			type: scenario.id,
			timestamp: new Date().toISOString()
		};
		
		setCustomHooks([...customHooks, newHook]);
		forgeComponent(newHook);
		setTypeStrength(prev => Math.min(100, prev + 15));
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Hook Forge
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Deep within the armory, <strong>Master Typhos</strong> led Aria to the 
					Hook Forge, where ethereal chains of logic hung suspended in blue flame.
				</p>

				<p className='story-paragraph'>
					"Hooks are the soul of modern components," Typhos explained, lifting a 
					glowing useState chain. "But untyped hooks are like untested weapons - 
					they may fail when you need them most."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> interfaced with the forge controls. "These type 
					parameters... they ensure hook reliability across all usage patterns!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> examined the hook templates. "I see how types 
					flow through the hook lifecycle. No more mysterious 'undefined' values!"
				</p>

				<p className='story-paragraph'>
					"Each hook requires specific type armor," Typhos demonstrated. "Master 
					these patterns, and your components will wield hooks with precision."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Hook Type Mastery</h3>
				
				<div className='hook-forge'>
					<h4>Essential Hook Patterns</h4>
					<div className='pattern-grid'>
						{hookPatterns.map(hook => (
							<div
								key={hook.id}
								className={`pattern-card ${
									selectedHook?.id === hook.id ? 'selected' : ''
								}`}
								onClick={() => masterHook(hook)}
								style={{ cursor: 'pointer' }}>
								<div style={{ 
									display: 'flex', 
									alignItems: 'center', 
									gap: '10px',
									marginBottom: '10px'
								}}>
									<span style={{ fontSize: '2em' }}>{hook.icon}</span>
									<div className='pattern-title'>{hook.name}</div>
								</div>
								<div className='pattern-description'>{hook.description}</div>
								<div style={{ 
									marginTop: '10px',
									padding: '5px 10px',
									background: 'rgba(0, 132, 255, 0.2)',
									borderRadius: '15px',
									display: 'inline-block',
									fontSize: '0.9em'
								}}>
									{hook.complexity}
								</div>
								{selectedHook?.id === hook.id && (
									<code style={{
										display: 'block',
										marginTop: '15px',
										padding: '10px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '5px'
									}}>
										{hook.example}
									</code>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='custom-hook-forge' style={{ marginTop: '40px' }}>
					<h4>Forge Custom Hooks</h4>
					<div className='forge-scenarios'>
						{forgeScenarios.map(scenario => (
							<div
								key={scenario.id}
								className='forge-card'
								style={{
									background: 'rgba(255, 255, 255, 0.1)',
									padding: '20px',
									borderRadius: '8px',
									marginBottom: '15px',
									cursor: 'pointer',
									transition: 'all 0.3s ease'
								}}
								onClick={() => forgeCustomHook(scenario)}>
								<h5>{scenario.name}</h5>
								<p>{scenario.description}</p>
								<button className='forge-button' style={{ marginTop: '10px' }}>
									Forge This Hook
								</button>
							</div>
						))}
					</div>
				</div>

				<div className='hook-mastery-meter' style={{ marginTop: '30px' }}>
					<h4>Hook Mastery Level</h4>
					<div className='strength-bar'>
						<div 
							className='strength-fill'
							style={{ width: `${hookMastery}%` }}>
							{hookMastery}%
						</div>
					</div>
					<p style={{ marginTop: '10px', textAlign: 'center' }}>
						{hookMastery < 50 
							? 'Apprentice Hook Smith'
							: hookMastery < 100
							? 'Journeyman Hook Forger'
							: 'Master Hook Architect'}
					</p>
				</div>

				<div className='forged-hooks' style={{ marginTop: '30px' }}>
					<h4>Your Forged Hooks</h4>
					<div className='components-list'>
						{customHooks.map(hook => (
							<div key={hook.id} className='component-item'>
								<strong>{hook.name}</strong>
								<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
									Type: {hook.type}
								</div>
							</div>
						))}
						{customHooks.length === 0 && (
							<p style={{ color: '#7f8c8d' }}>
								No custom hooks forged yet. Select scenarios above!
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>TypeScript Hook Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// Advanced TypeScript Hook Patterns

// 1. Typed useState Patterns
// Basic typed state
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// Complex state with type inference
interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

const [form, setForm] = useState<FormState>({
  values: {},
  errors: {},
  touched: {}
});

// State with discriminated unions
type LoadingState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function useAsync<T>() {
  const [state, setState] = useState<LoadingState<T>>({ status: 'idle' });
  
  const execute = async (promise: Promise<T>) => {
    setState({ status: 'loading' });
    try {
      const data = await promise;
      setState({ status: 'success', data });
    } catch (error) {
      setState({ status: 'error', error: error as Error });
    }
  };
  
  return { state, execute };
}

// 2. Typed useReducer Patterns
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: TodoState['filter'] } };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now().toString(),
          text: action.payload.text,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter
      };
    default:
      return state;
  }
};

// Usage with type safety
const [state, dispatch] = useReducer(todoReducer, initialState);
dispatch({ type: 'ADD_TODO', payload: { text: 'Learn TypeScript' } });

// 3. Typed Context Pattern
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for using context with type safety
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const colors = theme === 'light' ? lightColors : darkColors;
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Generic Custom Hook Pattern
// Fetch hook with generic type
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [url]);
  
  return { data, loading, error, refetch: fetchData };
}

// Usage with type inference
const { data: users, loading, error } = useFetch<User[]>('/api/users');

// 5. Form Hook with Full Type Safety
interface UseFormConfig<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (name: keyof T) => () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isValid: boolean;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormConfig<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleBlur = (name: keyof T) => () => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[name]) {
        setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
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
  
  const isValid = Object.keys(errors).length === 0;
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid
  };
}

// 6. Local Storage Hook with Type Safety
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}"\`, error);
      return initialValue;
    }
  };
  
  const [storedValue, setStoredValue] = useState<T>(readValue);
  
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}"\`, error);
    }
  };
  
  return [storedValue, setValue];
}

// 7. Debounced Value Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Master Typhos's Teaching:</strong> "Hooks are the lifeblood of 
					modern React. With TypeScript, we ensure that blood flows pure and strong. 
					Generic hooks adapt to any data type, discriminated unions handle complex 
					states, and custom hooks encapsulate reusable logic with full type safety."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Hook Forge Insight:</h3>
				<p>
					TypeScript transforms React hooks from flexible utilities into precision 
					instruments. By properly typing state, reducers, and custom hooks, we 
					create a development experience where errors are caught immediately and 
					autocomplete guides us to correct usage.
				</p>
				<p>
					The power of generic hooks cannot be overstated - they allow us to write 
					reusable logic that maintains type safety across different data types. This 
					is the true strength of TypeScript: write once, use safely everywhere.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Hook Architecture</h3>
				<p>
					<strong>How do typed hooks change your approach to state management?</strong> 
					Consider how knowing exact types at every step prevents bugs and improves 
					developer confidence.
				</p>
				<p>
					<strong>When should you create a custom hook versus inline logic?</strong> 
					Think about reusability, testability, and separation of concerns.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The forge flames dimmed as the day's work concluded. <strong>Typhos</strong> 
					examined the hooks Aria had crafted. "Excellent work. These hooks will serve 
					you well in battle."
				</p>
				<p>
					<strong>Aria</strong> felt the power of typed hooks coursing through her 
					components. "Each hook knows exactly what it expects and what it returns."
				</p>
				<p>
					<strong>Binary</strong> optimized the type definitions. "Zero runtime errors 
					detected. Type safety at 95%!"
				</p>
				<p>
					"Tomorrow," Typhos promised, "we'll explore the ultimate challenge: advanced 
					patterns that push TypeScript to its limits..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;