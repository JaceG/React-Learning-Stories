import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
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

	const [selectedPattern, setSelectedPattern] = useState(null);
	const [understandingLevel, setUnderstandingLevel] = useState(0);

	// Component armor types
	const armorTypes = [
		{
			id: 'functional',
			name: 'Functional Component Armor',
			icon: '⚔️',
			description: 'Lightweight and flexible type armor',
			example: 'FC<Props> or React.FC<Props>',
			strength: 'Implicit children, simpler syntax'
		},
		{
			id: 'class',
			name: 'Class Component Plate',
			icon: '🛡️',
			description: 'Heavy-duty type protection',
			example: 'Component<Props, State>',
			strength: 'Lifecycle type safety, state management'
		},
		{
			id: 'generic',
			name: 'Generic Component Mail',
			icon: '🔗',
			description: 'Flexible, reusable type chains',
			example: '<T extends BaseType>',
			strength: 'Adaptable to any data type'
		},
		{
			id: 'strict',
			name: 'Strict Type Helm',
			icon: '⛑️',
			description: 'Maximum type protection',
			example: 'Exact types, no implicit any',
			strength: 'Catches all type errors'
		}
	];

	// Component patterns
	const componentPatterns = [
		{
			id: 'props-interface',
			name: 'Props Interface Pattern',
			description: 'Define component props with interfaces'
		},
		{
			id: 'children-types',
			name: 'Children Type Pattern',
			description: 'Properly type component children'
		},
		{
			id: 'event-handlers',
			name: 'Event Handler Pattern',
			description: 'Type-safe event handling'
		},
		{
			id: 'ref-forwarding',
			name: 'Ref Forwarding Pattern',
			description: 'Type-safe ref forwarding'
		}
	];

	// Select armor
	const chooseArmor = (armor) => {
		selectArmor(armor);
		setTypeStrength(prev => Math.min(100, prev + 15));
		if (forgedComponents.length >= 2) {
			levelUp('journeyman');
		}
	};

	// Learn pattern
	const learnPattern = (pattern) => {
		setSelectedPattern(pattern);
		setUnderstandingLevel(prev => Math.min(100, prev + 25));
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Component Forge
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Master Forger Typhos</strong> stood before the great Component 
					Forge, its blue flames casting dancing shadows. "Welcome, Aria, to where 
					components are armored with type safety."
				</p>

				<p className='story-paragraph'>
					The forge displayed various component templates, each glowing with 
					TypeScript's protective aura. "In JavaScript," Typhos explained, "components 
					are naked, vulnerable to prop misuse and type errors."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> examined the forge's blueprints. "These type 
					definitions... they're like armor specifications!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> perched on a type anvil. "With proper typing, 
					errors are caught during forging, not in battle—I mean, production."
				</p>

				<p className='story-paragraph'>
					Typhos lifted a glowing component template. "Each piece of armor serves 
					a purpose. Choose wisely, for your components will face many challenges."
				</p>

				<div className='character-intro-card'>
					<h4>Master Forger Typhos</h4>
					<p>The legendary component smith of the TypeScript realm. His motto: 
					"A well-typed component is worth a thousand runtime checks. Forge with 
					precision, deploy with confidence."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Choose Your Component Armor</h3>
				
				<div className='armory-workshop'>
					<div className='component-forge'>
						{armorTypes.map(armor => (
							<div
								key={armor.id}
								className={`armor-piece ${
									selectedArmor?.id === armor.id ? 'selected' : ''
								}`}
								onClick={() => chooseArmor(armor)}>
								<span className='armor-icon'>{armor.icon}</span>
								<div className='armor-name'>{armor.name}</div>
								<div className='armor-description'>{armor.description}</div>
								{selectedArmor?.id === armor.id && (
									<div style={{ marginTop: '15px' }}>
										<code style={{ 
											background: 'rgba(0, 132, 255, 0.1)',
											padding: '10px',
											borderRadius: '5px',
											display: 'block'
										}}>
											{armor.example}
										</code>
										<p style={{ marginTop: '10px', fontSize: '0.9em' }}>
											<strong>Strength:</strong> {armor.strength}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='pattern-showcase' style={{ marginTop: '40px' }}>
					<h3>Essential Component Patterns</h3>
					<div className='pattern-grid'>
						{componentPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`pattern-card ${
									selectedPattern?.id === pattern.id ? 'selected' : ''
								}`}
								onClick={() => learnPattern(pattern)}>
								<div className='pattern-title'>{pattern.name}</div>
								<div className='pattern-description'>{pattern.description}</div>
							</div>
						))}
					</div>
				</div>

				<div className='type-strength-meter'>
					<h4>Type Safety Strength</h4>
					<div className='strength-bar'>
						<div 
							className='strength-fill'
							style={{ width: `${typeStrength}%` }}>
							{typeStrength}%
						</div>
					</div>
					<p style={{ marginTop: '10px' }}>
						{typeStrength < 50 
							? 'Your armor is still weak. Choose more patterns!'
							: typeStrength < 100
							? 'Growing stronger! Your components gain protection.'
							: 'Maximum protection achieved! Your components are fortress-strong!'}
					</p>
				</div>

				<div className='understanding-meter' style={{ marginTop: '30px' }}>
					<h4>Pattern Understanding</h4>
					<div style={{
						background: 'rgba(255, 255, 255, 0.1)',
						height: '20px',
						borderRadius: '10px',
						overflow: 'hidden'
					}}>
						<div style={{
							width: `${understandingLevel}%`,
							height: '100%',
							background: 'linear-gradient(90deg, #0084ff, #00a8ff)',
							transition: 'width 0.5s ease'
						}} />
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Component Type Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// TypeScript React Component Patterns

// 1. Functional Component with Props Interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Using React.FC (includes children implicitly)
const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false,
  icon
}) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
};

// Without React.FC (more explicit)
const ButtonExplicit = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false,
  children
}: ButtonProps & { children?: React.ReactNode }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
};

// 2. Component with Complex Children Types
interface CardProps {
  title: string;
  // Specific children types
  children: React.ReactElement<CardSectionProps> | React.ReactElement<CardSectionProps>[];
}

interface CardSectionProps {
  heading?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};

const CardSection: React.FC<CardSectionProps> = ({ heading, children }) => {
  return (
    <section className="card-section">
      {heading && <h3>{heading}</h3>}
      {children}
    </section>
  );
};

// 3. Event Handler Types
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange?: (field: string, value: string) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, onChange }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    onChange?.(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {/* More fields... */}
    </form>
  );
};

// 4. Generic Component Pattern
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor = (_, index) => index,
  emptyMessage = "No items"
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

const UserList = () => {
  const users: User[] = [/* ... */];
  
  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => (
        <div>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      )}
    />
  );
};

// 5. Ref Forwarding with Types
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        <label>{label}</label>
        <input ref={ref} {...props} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// 6. Class Component Types
interface ClockState {
  time: Date;
}

interface ClockProps {
  format?: '12h' | '24h';
  timezone?: string;
}

class Clock extends React.Component<ClockProps, ClockState> {
  private timerID?: NodeJS.Timeout;

  state: ClockState = {
    time: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  tick = () => {
    this.setState({ time: new Date() });
  };

  render() {
    const { format = '24h' } = this.props;
    const { time } = this.state;
    
    return (
      <div className="clock">
        {format === '12h' 
          ? time.toLocaleTimeString('en-US')
          : time.toLocaleTimeString('en-GB')}
      </div>
    );
  }
}

// 7. Higher-Order Component Types
function withAuth<P extends object>(
  Component: React.ComponentType<P & { user: User }>
): React.ComponentType<P> {
  return (props: P) => {
    const user = useAuth(); // Custom hook
    
    if (!user) {
      return <div>Please log in</div>;
    }
    
    return <Component {...props} user={user} />;
  };
}

// 8. Compound Component Pattern
interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = React.createContext<TabContextType | undefined>(undefined);

const Tabs: React.FC<TabsProps> & {
  Tab: React.FC<TabProps>;
  Panel: React.FC<PanelProps>;
} = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
};

interface TabProps {
  id: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ id, children }) => {
  const context = useContext(TabContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  return (
    <button
      className={\`tab \${context.activeTab === id ? 'active' : ''}\`}
      onClick={() => context.setActiveTab(id)}
    >
      {children}
    </button>
  );
};

interface PanelProps {
  id: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ id, children }) => {
  const context = useContext(TabContext);
  if (!context) throw new Error('Panel must be used within Tabs');
  
  if (context.activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Master Typhos's Wisdom:</strong> "Each pattern serves a purpose. 
					Props interfaces define your component's contract. Generic components adapt 
					to any data type. Event handlers ensure type-safe interactions. Master these 
					patterns, and your components will be unbreakable."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Forging Insight:</h3>
				<p>
					TypeScript transforms React components from flexible but fragile constructs 
					into armored, type-safe fortresses. By defining explicit interfaces for props, 
					properly typing event handlers, and leveraging generic patterns, we catch 
					errors at compile time rather than runtime.
				</p>
				<p>
					The key is balance: enough type safety to catch errors, but not so much 
					that it hinders development. Start with prop interfaces, add event handler 
					types, then explore advanced patterns like generics and compound components.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Component Architecture</h3>
				<p>
					<strong>How do types change the way you design components?</strong> Consider 
					how explicit contracts make components more predictable and reusable.
				</p>
				<p>
					<strong>When might strict typing become a hindrance?</strong> Think about 
					the balance between type safety and development velocity.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					Master Typhos examined the components Aria had begun forging. "Good start, 
					but armor is only as strong as its weakest joint. Tomorrow, we'll explore 
					advanced patterns."
				</p>
				<p>
					<strong>Aria</strong> felt the weight of type safety settling around her 
					components like protective mail. "These types... they're like promises 
					between components."
				</p>
				<p>
					<strong>Binary</strong> calculated type coverage. "87% type safety achieved. 
					Excellent protection metrics!"
				</p>
				<p>
					"Rest well," Typhos advised. "Tomorrow, we forge hooks with type precision..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;