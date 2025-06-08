import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		forgedComponents,
		forgeComponent,
		selectedEnhancement,
		selectEnhancement,
		forgeTemperature,
		evolve
	} = useOutletContext();

	const [selectedBase, setSelectedBase] = useState(null);
	const [forgeActive, setForgeActive] = useState(false);

	// HOC patterns to explore
	const hocPatterns = [
		{
			id: 'withAuth',
			name: 'Authentication HOC',
			icon: '🔐',
			capability: 'Adds auth checking'
		},
		{
			id: 'withLogging',
			name: 'Logging HOC',
			icon: '📝',
			capability: 'Tracks component usage'
		},
		{
			id: 'withData',
			name: 'Data Fetching HOC',
			icon: '📊',
			capability: 'Provides data loading'
		},
		{
			id: 'withTheme',
			name: 'Theme HOC',
			icon: '🎨',
			capability: 'Injects theme props'
		}
	];

	// Base components to enhance
	const baseComponents = [
		{ id: 'UserProfile', name: 'User Profile', icon: '👤' },
		{ id: 'Dashboard', name: 'Dashboard', icon: '📈' },
		{ id: 'Settings', name: 'Settings', icon: '⚙️' }
	];

	// Handle forging process
	const startForging = () => {
		if (selectedBase && selectedEnhancement) {
			setForgeActive(true);
			
			setTimeout(() => {
				forgeComponent(selectedBase, selectedEnhancement);
				setForgeActive(false);
				evolve('understanding');
			}, 2000);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Enhancement Forge
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Enhancement Forge glowed with transformative energy. <strong>Forge Master 
					Enhance</strong> explained: "Higher-Order Components are component factories. 
					They take a component and return an enhanced version."
				</p>

				<p className='story-paragraph'>
					"Like my custom hooks," <strong>Aria</strong> said, "but for components 
					instead of logic?"
				</p>

				<p className='story-paragraph'>
					"Similar principle, different application. HOCs were the original pattern 
					for sharing behavior. Let me show you their power and their limitations."
				</p>

				<p className='story-paragraph'>
					The forge blazed brighter as Enhance demonstrated. "Watch as I take a simple 
					component and enhance it with authentication checking, logging, and more. 
					Each enhancement wraps the original, adding new capabilities."
				</p>

				<div className='character-intro-card'>
					<h4>Forge Master Enhance</h4>
					<p>Keeper of enhancement patterns and component transformation. His philosophy: 
					"HOCs are like armor for components - each layer adds protection and capability, 
					but too many layers make movement difficult. Choose your enhancements wisely."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Enhancement Forge</h3>
				
				<div className='enhancement-forge'>
					<h4>Component Enhancement Workshop</h4>
					
					<div className='forge-workshop'>
						<div className='forge-controls'>
							<div className='base-component'>
								<h5>Base Component</h5>
								<select 
									value={selectedBase?.id || ''}
									onChange={(e) => {
										const component = baseComponents.find(c => c.id === e.target.value);
										setSelectedBase(component);
									}}>
									<option value="">Select component...</option>
									{baseComponents.map(comp => (
										<option key={comp.id} value={comp.id}>
											{comp.icon} {comp.name}
										</option>
									))}
								</select>
								<div className='forge-arrow'>→</div>
							</div>
							
							<div className={`enhancement-slot ${selectedEnhancement ? 'filled' : ''}`}>
								<h5>Enhancement</h5>
								{selectedEnhancement ? (
									<div>{selectedEnhancement} Applied</div>
								) : (
									<div>Select enhancement below</div>
								)}
							</div>
						</div>
						
						{selectedBase && selectedEnhancement && !forgeActive && (
							<button 
								className='forge-button'
								onClick={startForging}
								style={{
									display: 'block',
									margin: '20px auto',
									padding: '10px 20px',
									background: '#e74c3c',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									cursor: 'pointer',
									fontSize: '16px'
								}}>
								🔨 Forge Enhanced Component
							</button>
						)}
						
						{forgeActive && (
							<div style={{ textAlign: 'center', marginTop: '20px' }}>
								<div style={{ fontSize: '48px', animation: 'pulse 1s infinite' }}>🔥</div>
								<p>Forging in progress...</p>
							</div>
						)}
					</div>
				</div>

				<div className='hoc-patterns'>
					{hocPatterns.map(pattern => (
						<div
							key={pattern.id}
							className={`hoc-pattern-card ${selectedEnhancement === pattern.id ? 'selected' : ''}`}
							onClick={() => selectEnhancement(pattern.id)}>
							<span className='pattern-icon'>{pattern.icon}</span>
							<div className='pattern-name'>{pattern.name}</div>
							<div className='pattern-capability'>{pattern.capability}</div>
						</div>
					))}
				</div>

				{forgedComponents.length > 0 && (
					<div className='forged-results'>
						<h4>Forged Components</h4>
						<div className='results-list'>
							{forgedComponents.map(comp => (
								<div key={comp.id} className='forged-component'>
									{comp.enhancement}({comp.base.name})
								</div>
							))}
						</div>
					</div>
				)}

				<div className='forge-temperature'>
					<h4>Forge Temperature</h4>
					<div className='temperature-bar'>
						<div 
							className='temperature-fill' 
							style={{ width: `${Math.min(forgeTemperature, 100)}%` }}>
							<span>{forgeTemperature}°</span>
						</div>
					</div>
					<p>Higher temperature = More enhancements!</p>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>HOC Fundamentals</span>
				</div>
				<div className='code-example'>
					<pre>{`// Higher-Order Components - The Original Pattern

// 1. Basic HOC Pattern
function withAuth(WrappedComponent) {
  // Return a new component
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Check authentication
      checkAuth()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false))
        .finally(() => setLoading(false));
    }, []);
    
    if (loading) return <LoadingSpinner />;
    if (!isAuthenticated) return <LoginRedirect />;
    
    // Pass through all props to wrapped component
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(UserProfile);

// 2. HOC with Configuration
function withLogging(WrappedComponent, componentName) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(\`\${componentName} mounted\`);
      return () => console.log(\`\${componentName} unmounted\`);
    }, []);
    
    const loggedProps = Object.keys(props).reduce((acc, key) => {
      acc[key] = (...args) => {
        if (typeof props[key] === 'function') {
          console.log(\`\${componentName}.\${key} called\`);
          return props[key](...args);
        }
        return props[key];
      };
      return acc;
    }, {});
    
    return <WrappedComponent {...loggedProps} />;
  };
}

// Usage with configuration
const LoggedButton = withLogging(Button, 'Button');

// 3. Data Fetching HOC
function withData(WrappedComponent, dataSource) {
  return function DataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      setLoading(true);
      fetch(dataSource)
        .then(res => res.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [dataSource]);
    
    return (
      <WrappedComponent 
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  };
}

// 4. Theme Injection HOC
function withTheme(WrappedComponent) {
  return function ThemedComponent(props) {
    const theme = useContext(ThemeContext);
    
    // Inject theme as prop
    return <WrappedComponent {...props} theme={theme} />;
  };
}

// 5. Performance Monitoring HOC
function withPerformance(WrappedComponent) {
  return function PerformanceComponent(props) {
    const renderStart = performance.now();
    
    useEffect(() => {
      const renderEnd = performance.now();
      const renderTime = renderEnd - renderStart;
      
      if (renderTime > 16) { // Longer than one frame
        console.warn(
          \`Slow render detected: \${renderTime.toFixed(2)}ms\`
        );
      }
    });
    
    return <WrappedComponent {...props} />;
  };
}

// Composing multiple HOCs
const EnhancedDashboard = withAuth(
  withLogging(
    withData(
      withTheme(Dashboard),
      '/api/dashboard'
    ),
    'Dashboard'
  )
);

// Or with compose utility
const enhance = compose(
  withAuth,
  withLogging('Dashboard'),
  withData('/api/dashboard'),
  withTheme
);

const EnhancedDashboard = enhance(Dashboard);

// Benefits of HOCs:
// - Reusable logic across components
// - Separation of concerns
// - Props manipulation
// - Conditional rendering

// Limitations:
// - Wrapper hell (deep nesting)
// - Props collision
// - Static composition
// - Harder debugging`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Forge Master's Wisdom:</strong> "See how each HOC wraps the component, 
					adding a layer of functionality? It's powerful but can become unwieldy. Modern 
					React often prefers hooks, but HOCs remain valuable for certain patterns."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Enhancement Lesson:</h3>
				<p>
					Higher-Order Components represent React's original solution for logic reuse. 
					They follow the factory pattern - taking a component as input and returning 
					an enhanced version as output.
				</p>
				<p>
					While hooks have largely replaced HOCs for logic sharing, understanding HOCs 
					is crucial for maintaining existing codebases and recognizing patterns that 
					influenced React's evolution.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Component Enhancement</h3>
				<p>
					<strong>How are HOCs similar to and different from hooks?</strong> Consider 
					the patterns of logic reuse and the trade-offs of each approach.
				</p>
				<p>
					<strong>When might HOCs still be the best solution?</strong> Think about 
					scenarios involving props manipulation, conditional rendering, or working 
					with class components.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As the forge cooled, Aria examined her enhanced components. "Each layer adds 
					capability," she observed, "but the nesting gets deep." Forge Master Enhance 
					nodded. "Tomorrow, we'll explore advanced enhancement patterns and learn to 
					manage complexity..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;