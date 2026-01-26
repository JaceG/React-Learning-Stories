import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={2}
				title={`The Contract Ceremonies`}
				bridge={`Master Typus led Aria to the Contract Chamber, where component promises were forged into unbreakable agreements. "You've learned to type basic values," he said, his hammer glowing with anticipation. "Now learn to type the very building blocks of React - your components."`}
			/>

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
				<InstructionBox character={`Master Typus gestures to the Component Anvil.`}>
					Learn to forge type contracts for React components! Select different component types to see how TypeScript transforms them.
				</InstructionBox>

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

			<CodeExample
				title={`Component Typing Patterns`}
				discoveredBy={`The Contract Chamber's Secrets`}
				code={`// Functional Component with Props Interface
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
// every interface defined is a contract honored."`}
			/>

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

			<ChapterSummary
				lessonInsight={{
					title: `The Contract Lesson`,
					content: `Component types are contracts that define the exact shape of props a component expects. This eliminates the guesswork in component usage and catches prop mismatches at compile time. With TypeScript, your components become self-documenting, and refactoring becomes safe and predictable.`
				}}
				reflectionQuestions={[
					`How do typed props improve team collaboration? Consider how explicit contracts reduce misunderstandings and documentation needs.`,
					`What's the value of optional props with the ? operator? Think about component flexibility while maintaining type safety.`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 45 (Afternoon)`,
					content: `Today I learned to type components in the Contract Chamber! It's incredible - TypeScript knows exactly what props each component needs. I explored functional components with React.FC, class components with React.Component<Props, State>, and even generic components like List<T>. No more runtime errors from missing or wrong props! Binary is especially excited about the mathematical certainty it provides. Even Debuggora seems impressed by catching errors before runtime. Master Typus's wisdom: "Every prop typed is a bug prevented, every interface defined is a contract honored."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;