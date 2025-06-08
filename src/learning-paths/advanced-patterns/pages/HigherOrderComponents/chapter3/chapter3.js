import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		forgedComponents,
		enhancementLayers,
		debuggingDepth,
		forgeTemperature,
		evolutionStage,
		evolve
	} = useOutletContext();

	const [selectedComparison, setSelectedComparison] = useState(null);
	const [wisdomRevealed, setWisdomRevealed] = useState(false);

	// HOC vs Hooks comparison data
	const comparisons = [
		{
			id: 'logic-sharing',
			aspect: 'Logic Sharing',
			hoc: {
				approach: 'Wraps component',
				pros: ['Works with classes', 'Props manipulation'],
				cons: ['Wrapper hell', 'Static composition']
			},
			hooks: {
				approach: 'Inside component',
				pros: ['Dynamic usage', 'Cleaner composition'],
				cons: ['Only function components', 'No render hijacking']
			}
		},
		{
			id: 'debugging',
			aspect: 'Debugging',
			hoc: {
				approach: 'Component tree',
				pros: ['Visible in DevTools', 'Clear hierarchy'],
				cons: ['Deep nesting', 'Props tracing']
			},
			hooks: {
				approach: 'Component internals',
				pros: ['Direct state access', 'Simpler stack traces'],
				cons: ['Less visible', 'Hook order matters']
			}
		},
		{
			id: 'performance',
			aspect: 'Performance',
			hoc: {
				approach: 'Extra components',
				pros: ['Can prevent renders', 'Memoization points'],
				cons: ['More components', 'Props passing overhead']
			},
			hooks: {
				approach: 'Same component',
				pros: ['Less overhead', 'Direct optimization'],
				cons: ['Careful dependency management', 'Re-render risks']
			}
		}
	];

	// When to use HOCs
	const hocUseCases = [
		{
			id: 'third-party',
			title: 'Third-Party Integration',
			description: 'When libraries expect HOCs (e.g., Redux connect)',
			icon: '🔌'
		},
		{
			id: 'props-manipulation',
			title: 'Props Manipulation',
			description: 'When you need to intercept or modify props',
			icon: '🎯'
		},
		{
			id: 'conditional-rendering',
			title: 'Conditional Rendering',
			description: 'When controlling if a component renders',
			icon: '🚦'
		},
		{
			id: 'legacy-code',
			title: 'Legacy Codebases',
			description: 'When working with class components',
			icon: '📚'
		}
	];

	// Modern alternatives
	const modernAlternatives = [
		{
			pattern: 'Custom Hooks',
			replaces: 'Logic-sharing HOCs',
			example: 'useAuth instead of withAuth'
		},
		{
			pattern: 'Render Props',
			replaces: 'Render-hijacking HOCs',
			example: '<Mouse render={...} /> pattern'
		},
		{
			pattern: 'Context API',
			replaces: 'Props-injection HOCs',
			example: 'useContext instead of withTheme'
		},
		{
			pattern: 'Component Composition',
			replaces: 'Wrapper HOCs',
			example: 'Children patterns'
		}
	];

	// Handle comparison selection
	const selectComparison = (comparison) => {
		setSelectedComparison(comparison);
		if (!wisdomRevealed && comparisons.indexOf(comparison) === comparisons.length - 1) {
			setWisdomRevealed(true);
			evolve('master');
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Pattern Evolution
			</h2>

			<div className='chapter-bridge'>
				As mastery approached, it was time to understand when HOCs remain the right choice...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"You've learned the techniques," <strong>Forge Master Enhance</strong> said, 
					examining the layered components. "Now for the wisdom: knowing when to use them."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> studied her forged components. "They're powerful, but 
					hooks seem simpler for many cases."
				</p>

				<p className='story-paragraph'>
					"Precisely!" the Forge Master smiled. "HOCs were React's first pattern for 
					logic reuse. They remain valuable for specific scenarios, but modern React 
					offers alternatives. Let me show you when each approach shines."
				</p>

				<p className='story-paragraph'>
					He revealed a comparison chart. "HOCs excel at props manipulation, conditional 
					rendering, and working with legacy code. Hooks dominate for state logic, side 
					effects, and composition. Neither is universally superior - context determines 
					the choice."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> processed the patterns. "So HOCs aren't obsolete, just 
					specialized?" 
				</p>

				<p className='story-paragraph'>
					"Exactly. Like any tool, they have their place. Master them, but reach for 
					them judiciously."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Pattern Evolution Timeline</h3>
				
				<div className='evolution-timeline'>
					<h4>React Pattern History</h4>
					<div className='timeline-stages'>
						<div className={`evolution-stage ${evolutionStage === 'learning' || evolutionStage === 'understanding' || evolutionStage === 'advanced' || evolutionStage === 'master' ? 'completed' : ''}`}>
							Mixins
							<span style={{ fontSize: '12px', display: 'block' }}>2013</span>
						</div>
						<div className={`evolution-stage ${evolutionStage === 'understanding' || evolutionStage === 'advanced' || evolutionStage === 'master' ? 'completed' : ''}`}>
							HOCs
							<span style={{ fontSize: '12px', display: 'block' }}>2015</span>
						</div>
						<div className={`evolution-stage ${evolutionStage === 'advanced' || evolutionStage === 'master' ? 'completed' : ''}`}>
							Render Props
							<span style={{ fontSize: '12px', display: 'block' }}>2017</span>
						</div>
						<div className={`evolution-stage ${evolutionStage === 'master' ? 'completed' : ''} ${evolutionStage === 'advanced' ? 'active' : ''}`}>
							Hooks
							<span style={{ fontSize: '12px', display: 'block' }}>2019</span>
						</div>
					</div>
				</div>

				<div className='comparison-grid'>
					<h4>HOCs vs Hooks Comparison</h4>
					{comparisons.map(comp => (
						<div
							key={comp.id}
							className={`comparison-card ${selectedComparison?.id === comp.id ? 'selected' : ''}`}
							onClick={() => selectComparison(comp)}>
							<h5>{comp.aspect}</h5>
							{selectedComparison?.id === comp.id && (
								<div className='comparison-details'>
									<div className='comparison-side hoc-side'>
										<h6>HOCs</h6>
										<p>Approach: {comp.hoc.approach}</p>
										<div>
											<strong>Pros:</strong>
											<ul>
												{comp.hoc.pros.map((pro, i) => (
													<li key={i}>{pro}</li>
												))}
											</ul>
										</div>
										<div>
											<strong>Cons:</strong>
											<ul>
												{comp.hoc.cons.map((con, i) => (
													<li key={i}>{con}</li>
												))}
											</ul>
										</div>
									</div>
									<div className='comparison-side hooks-side'>
										<h6>Hooks</h6>
										<p>Approach: {comp.hooks.approach}</p>
										<div>
											<strong>Pros:</strong>
											<ul>
												{comp.hooks.pros.map((pro, i) => (
													<li key={i}>{pro}</li>
												))}
											</ul>
										</div>
										<div>
											<strong>Cons:</strong>
											<ul>
												{comp.hooks.cons.map((con, i) => (
													<li key={i}>{con}</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='use-cases'>
					<h4>When to Still Use HOCs</h4>
					<div className='use-case-grid'>
						{hocUseCases.map(useCase => (
							<div key={useCase.id} className='use-case-card'>
								<span className='use-case-icon'>{useCase.icon}</span>
								<h5>{useCase.title}</h5>
								<p>{useCase.description}</p>
							</div>
						))}
					</div>
				</div>

				<div className='modern-alternatives'>
					<h4>Modern Pattern Alternatives</h4>
					<div className='alternatives-list'>
						{modernAlternatives.map((alt, index) => (
							<div key={index} className='alternative-item'>
								<div className='alternative-arrow'>
									<div className='old-pattern'>{alt.replaces}</div>
									<span>→</span>
									<div className='new-pattern'>{alt.pattern}</div>
								</div>
								<div className='alternative-example'>{alt.example}</div>
							</div>
						))}
					</div>
				</div>

				{forgeTemperature > 80 && (
					<div className='achievement-banner'>
						<h4>🔥 Master Forger Achievement Unlocked!</h4>
						<p>You've explored all HOC patterns and understand their place in modern React!</p>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>HOC Best Practices & Migration</span>
				</div>
				<div className='code-example'>
					<pre>{`// HOC Best Practices

// 1. Always preserve static methods
function withEnhancement(WrappedComponent) {
  class Enhanced extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  
  // Copy static methods
  hoistNonReactStatics(Enhanced, WrappedComponent);
  
  return Enhanced;
}

// 2. Pass through refs properly
function withRefForwarding(WrappedComponent) {
  const WithRef = React.forwardRef((props, ref) => {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  });
  
  WithRef.displayName = \`withRef(\${getDisplayName(WrappedComponent)})\`;
  
  return WithRef;
}

// 3. Preserve display names for debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// 4. Don't mutate the original component
// BAD
function withBadEnhancement(WrappedComponent) {
  WrappedComponent.prototype.componentDidUpdate = function() {
    // Mutating original!
  };
  return WrappedComponent;
}

// GOOD
function withGoodEnhancement(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate() {
      // New component, no mutation
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Migration Examples: HOC to Hooks

// OLD: Authentication HOC
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      checkAuth().then(setUser).finally(() => setLoading(false));
    }, []);
    
    if (loading) return <LoadingSpinner />;
    if (!user) return <LoginRedirect />;
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// NEW: Authentication Hook
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);
  
  return { user, loading };
}

// Usage comparison
// OLD
const ProtectedComponent = withAuth(MyComponent);

// NEW
function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <LoginRedirect />;
  
  // Component logic here
}

// When HOCs are Still Better

// 1. Third-party library integration
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

// 2. Route-level authentication
<Route 
  path="/admin" 
  component={withAuth(AdminPanel)} 
/>

// 3. Error boundaries (class components only)
const SafeComponent = withErrorBoundary(
  RiskyComponent,
  ErrorFallback
);

// 4. Performance optimization with class components
const OptimizedComponent = withShouldUpdate(
  (prevProps, nextProps) => prevProps.id === nextProps.id
)(ExpensiveComponent);

// Modern Patterns Replacing HOCs

// 1. Compound Components (instead of prop injection)
<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content One</TabPanel>
    <TabPanel>Content Two</TabPanel>
  </TabPanels>
</Tabs>

// 2. Render Props (flexible rendering)
<DataProvider
  render={({ data, loading }) => 
    loading ? <Spinner /> : <DataDisplay data={data} />
  }
/>

// 3. Custom Hooks (logic extraction)
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// 4. Context for cross-cutting concerns
const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponents />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  // Use theme directly
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Evolution Wisdom:</strong> "HOCs paved the way for better patterns. 
					Understanding them helps you appreciate React's evolution and choose the right 
					tool for each situation. Sometimes the old ways are still the best ways."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Mastery Insight:</h3>
				<p>
					Higher-Order Components represent a crucial chapter in React's history. While 
					hooks have largely replaced them for logic sharing, HOCs remain relevant for 
					specific use cases: third-party integrations, props manipulation, and legacy 
					codebases.
				</p>
				<p>
					The key to mastery isn't just knowing how to use HOCs, but understanding when 
					they're the right choice. In modern React, prefer hooks for most logic sharing, 
					reach for HOCs when their unique capabilities are needed, and always consider 
					the debugging and maintenance implications of your architectural choices.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Pattern Evolution</h3>
				<p>
					<strong>How has React's approach to logic sharing evolved?</strong> Consider 
					the journey from mixins to HOCs to hooks, and what each transition taught us.
				</p>
				<p>
					<strong>What patterns from HOCs influenced modern React?</strong> Think about 
					how concepts like composition and enhancement shaped today's best practices.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The forge cooled as <strong>Aria</strong> completed her final enhancement. 
					"You understand now," <strong>Forge Master Enhance</strong> said proudly. 
					"HOCs are not obsolete, but specialized. Use them wisely, and they'll serve 
					you well."
				</p>
				<p>
					<strong>Binary</strong> compiled the patterns. "Each tool has its purpose. 
					The art is in choosing correctly."
				</p>
				<p>
					As they left the Enhancement Forge, Aria felt the weight of knowledge. She 
					had mastered not just a pattern, but understood its place in React's grand 
					tapestry. The Architect's Academy held one more lesson - the mysteries of 
					Portals and Refs awaited...
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;