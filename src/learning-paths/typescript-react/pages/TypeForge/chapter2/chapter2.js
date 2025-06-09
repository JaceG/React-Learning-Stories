import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		forgeMode,
		setForgeMode,
		setTypeErrors,
		setCompileStatus
	} = useOutletContext();

	const [componentType, setComponentType] = useState('functional');
	const [propsInterface, setPropsInterface] = useState('');
	const [showTypeComparison, setShowTypeComparison] = useState(false);

	const componentExamples = {
		functional: {
			name: 'Button Component',
			untyped: `function Button(props) {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
}`,
			typed: `interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}`
		},
		class: {
			name: 'Card Component',
			untyped: `class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}`,
			typed: `interface CardProps {
  title: string;
  content: React.ReactNode;
  footer?: string;
}

class Card extends React.Component<CardProps> {
  render() {
    const { title, content, footer } = this.props;
    return (
      <div className="card">
        <h3>{title}</h3>
        <div>{content}</div>
        {footer && <footer>{footer}</footer>}
      </div>
    );
  }
}`
		},
		generic: {
			name: 'List Component',
			untyped: `function List(props) {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          {props.renderItem(item)}
        </li>
      ))}
    </ul>
  );
}`,
			typed: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}`
		}
	};

	const validateProps = () => {
		setCompileStatus('forging');
		
		setTimeout(() => {
			if (propsInterface.includes('interface') && propsInterface.includes('{')) {
				setCompileStatus('success');
				setTypeErrors([]);
			} else {
				setCompileStatus('error');
				setTypeErrors([{
					message: 'Invalid interface syntax. Make sure to use proper TypeScript interface format.',
					line: 1
				}]);
			}
		}, 1000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: The Contract Ceremonies</h2>

			<div className='chapter-bridge'>
				<p>Master Typus led Aria to the Contract Chamber, where component promises were forged into unbreakable agreements.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Master Typus</strong> led Aria to the Contract Chamber. "Every 
					component is a promise," he explained. "Props are the terms of that promise. 
					TypeScript makes promises unbreakable."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> watched as he demonstrated typing a component. "It's 
					like my Props Messengers, but with guarantees!"
				</p>

				<p className='story-paragraph'>
					"Exactly! No more wondering what props a component expects. The contract 
					is explicit, enforced by the Forge itself."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Component Contract Forge</h3>
				<p className='instruction'>
					<strong>👉 Learn to forge type contracts for React components!</strong>
				</p>

				<div className='type-controls'>
					<button 
						className={`type-button ${componentType === 'functional' ? 'active' : ''}`}
						onClick={() => setComponentType('functional')}>
						Functional Components
					</button>
					<button 
						className={`type-button ${componentType === 'class' ? 'active' : ''}`}
						onClick={() => setComponentType('class')}>
						Class Components
					</button>
					<button 
						className={`type-button ${componentType === 'generic' ? 'active' : ''}`}
						onClick={() => setComponentType('generic')}>
						Generic Components
					</button>
				</div>

				<div className='type-transformation'>
					<div className='code-before'>
						<h4>Without Types</h4>
						<pre>{componentExamples[componentType].untyped}</pre>
					</div>
					<div className='transform-arrow'>→</div>
					<div className='code-after'>
						<h4>With TypeScript</h4>
						<pre>{componentExamples[componentType].typed}</pre>
					</div>
				</div>

				<button 
					className='forge-button'
					onClick={() => setShowTypeComparison(!showTypeComparison)}
					style={{ margin: '20px auto', display: 'block' }}>
					{showTypeComparison ? 'Hide' : 'Show'} Type Benefits
				</button>

				{showTypeComparison && (
					<div className='type-workbench'>
						<h4>Benefits of Typed Components</h4>
						<div className='forge-metrics'>
							<div className='metric-card'>
								<div className='metric-value'>✓</div>
								<div className='metric-label'>Autocomplete</div>
							</div>
							<div className='metric-card'>
								<div className='metric-value'>✓</div>
								<div className='metric-label'>Error Prevention</div>
							</div>
							<div className='metric-card'>
								<div className='metric-value'>✓</div>
								<div className='metric-label'>Self-Documentation</div>
							</div>
							<div className='metric-card'>
								<div className='metric-value'>✓</div>
								<div className='metric-label'>Refactor Safety</div>
							</div>
						</div>
					</div>
				)}

				<div className='type-playground'>
					<h4>Try Writing Your Own Props Interface</h4>
					<textarea
						className='playground-input'
						placeholder={`interface MyComponentProps {
  // Add your prop types here
  title: string;
  count?: number;
}`}
						value={propsInterface}
						onChange={(e) => setPropsInterface(e.target.value)}
						style={{ height: '150px', fontFamily: 'monospace' }}
					/>
					<button 
						className='forge-button'
						onClick={validateProps}>
						Validate Interface
					</button>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Component Typing Patterns</span>
					<span className='discovered-by'>The Contract Chamber's Secrets</span>
				</div>
				<pre>{`// Functional Component with Props Interface
interface GreetingProps {
  name: string;
  age?: number; // Optional prop
  onGreet?: (message: string) => void; // Optional callback
}

const Greeting: React.FC<GreetingProps> = ({ name, age, onGreet }) => {
  const message = age 
    ? \`Hello, \${name}! You are \${age} years old.\`
    : \`Hello, \${name}!\`;
    
  return (
    <div>
      <h2>{message}</h2>
      {onGreet && (
        <button onClick={() => onGreet(message)}>
          Send Greeting
        </button>
      )}
    </div>
  );
};

// Children Types
interface ContainerProps {
  children: React.ReactNode; // Most flexible
  title: string;
}

const Container: React.FC<ContainerProps> = ({ children, title }) => (
  <div className="container">
    <h3>{title}</h3>
    {children}
  </div>
);

// Event Handler Types
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Component with State Types
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>('');
  
  const addTodo = () => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: input,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
        </div>
      ))}
    </div>
  );
};

// Advanced: Component with Ref Types
interface InputProps {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label }, ref) => (
    <label>
      {label}
      <input ref={ref} />
    </label>
  )
);

// Master Typus's wisdom: "Every prop typed is a bug prevented,
// every interface defined is a contract honored."`}</pre>
			</div>

			<div className='type-visualizer'>
				<h4>Component Type Hierarchy</h4>
				<div className='type-tree'>
					<div className='type-node'>React.ComponentType</div>
					<div className='type-children'>
						<div className='type-child'>React.FC&lt;Props&gt;</div>
						<div className='type-child'>React.Component&lt;Props, State&gt;</div>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Contract Lesson:</h3>
				<p>
					Component types are contracts that define the exact shape of props a 
					component expects. This eliminates the guesswork in component usage and 
					catches prop mismatches at compile time. With TypeScript, your components 
					become self-documenting, and refactoring becomes safe and predictable.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Component Contracts</h3>
				<p>
					<strong>How do typed props improve team collaboration?</strong> 
					Consider how explicit contracts reduce misunderstandings and documentation needs.
				</p>
				<p>
					<strong>What's the value of optional props with the ? operator?</strong> 
					Think about component flexibility while maintaining type safety.
				</p>
			</div>

			<div className='character-intro'>
				<h4>Aria's Journal - Type Forge Day 2</h4>
				<p>
					Today I learned to type components! It's incredible - TypeScript knows 
					exactly what props each component needs. No more runtime errors from 
					missing or wrong props. Binary is especially excited about the 
					mathematical certainty it provides. Even Debuggora seems impressed by 
					catching errors before runtime!
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> typed her first component, watching as potential 
					errors glowed red before she even ran the code. "It's like having 
					Debuggora's vision built into the editor!"
				</p>
				<p>
					<strong>Binary</strong> computed enthusiastically. "Prop validation at 
					compile time! Zero runtime overhead! Maximum efficiency!"
				</p>
				<p>
					<strong>Master Typus</strong> stroked his beard. "You've mastered basic 
					contracts. But what about advanced patterns? Union types, generics, 
					conditional types?"
				</p>
				<p>
					"Show me everything!" Aria exclaimed, eager to forge even stronger contracts.
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;