import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		enhancementLayers,
		addEnhancementLayer,
		compositionChain,
		addToCompositionChain,
		clearCompositionChain,
		debuggingDepth,
		evolve
	} = useOutletContext();

	const [selectedPattern, setSelectedPattern] = useState(null);
	const [compositionMode, setCompositionMode] = useState(false);
	const [displayNamePreserved, setDisplayNamePreserved] = useState(false);

	// Advanced HOC patterns
	const advancedPatterns = [
		{
			id: 'props-proxy',
			name: 'Props Proxy',
			description: 'Manipulate props before passing',
			icon: '🔄'
		},
		{
			id: 'inheritance-inversion',
			name: 'Inheritance Inversion',
			description: 'Access component internals',
			icon: '🔍'
		},
		{
			id: 'conditional-rendering',
			name: 'Conditional Rendering',
			description: 'Control when component renders',
			icon: '🎭'
		},
		{
			id: 'state-abstraction',
			name: 'State Abstraction',
			description: 'Extract and manage state',
			icon: '📦'
		}
	];

	// Available HOCs for composition
	const availableHOCs = [
		{ id: 'withAuth', name: 'withAuth', color: '#e74c3c' },
		{ id: 'withRouter', name: 'withRouter', color: '#3498db' },
		{ id: 'withTheme', name: 'withTheme', color: '#9b59b6' },
		{ id: 'withData', name: 'withData', color: '#f39c12' },
		{ id: 'withErrorBoundary', name: 'withErrorBoundary', color: '#27ae60' }
	];

	// Handle pattern exploration
	const explorePattern = (pattern) => {
		setSelectedPattern(pattern);
		addEnhancementLayer({
			id: Date.now(),
			pattern: pattern.name,
			type: pattern.id
		});
		
		if (pattern.id === 'inheritance-inversion') {
			evolve('advanced');
		}
	};

	// Toggle composition mode
	const toggleComposition = () => {
		setCompositionMode(!compositionMode);
		if (!compositionMode) {
			clearCompositionChain();
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Enhancement Layers
			</h2>

			<div className='chapter-bridge'>
				With basic HOCs understood, it was time to explore advanced patterns...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> learned to layer enhancements. "Each HOC adds a 
					capability," <strong>Forge Master Enhance</strong> demonstrated. 
					"Authentication, logging, performance tracking - all through composition."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the component tree. "The nesting gets deep, 
					Aria. This could affect debugging."
				</p>

				<p className='story-paragraph'>
					"An astute observation," the Forge Master acknowledged. "HOCs are powerful 
					but can obscure component hierarchy. Modern React often prefers hooks, but 
					HOCs remain valuable for certain patterns."
				</p>

				<p className='story-paragraph'>
					He showed her advanced techniques: "Props proxy for manipulation, inheritance 
					inversion for deep access, proper display name preservation. Master these, 
					and HOCs become surgical tools rather than blunt instruments."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Enhancement Laboratory</h3>
				
				<div className='enhancement-layers'>
					<h4>Enhancement Layer Stack</h4>
					<div className='layer-stack'>
						{enhancementLayers.map((layer, index) => (
							<div key={layer.id} className='enhancement-layer'>
								<div className='layer-number'>{index + 1}</div>
								<strong>{layer.pattern}</strong>
								<span style={{ marginLeft: '10px', color: '#7f8c8d' }}>
									Type: {layer.type}
								</span>
							</div>
						))}
						{enhancementLayers.length === 0 && (
							<p style={{ textAlign: 'center', color: '#95a5a6' }}>
								Explore patterns to add enhancement layers
							</p>
						)}
					</div>
				</div>

				<div className='hoc-patterns'>
					{advancedPatterns.map(pattern => (
						<div
							key={pattern.id}
							className={`hoc-pattern-card ${selectedPattern?.id === pattern.id ? 'selected' : ''}`}
							onClick={() => explorePattern(pattern)}>
							<span className='pattern-icon'>{pattern.icon}</span>
							<div className='pattern-name'>{pattern.name}</div>
							<div className='pattern-description'>{pattern.description}</div>
						</div>
					))}
				</div>

				<div className='composition-chain'>
					<h4>HOC Composition Chain</h4>
					<button 
						className='composition-toggle'
						onClick={toggleComposition}
						style={{
							padding: '8px 16px',
							background: compositionMode ? '#e74c3c' : '#3498db',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							marginBottom: '20px'
						}}>
						{compositionMode ? 'Exit' : 'Enter'} Composition Mode
					</button>
					
					{compositionMode && (
						<>
							<div className='available-hocs'>
								{availableHOCs.map(hoc => (
									<button
										key={hoc.id}
										onClick={() => addToCompositionChain(hoc)}
										style={{
											margin: '5px',
											padding: '5px 10px',
											background: hoc.color,
											color: 'white',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer'
										}}>
										{hoc.name}
									</button>
								))}
							</div>
							
							<div className='chain-visualization'>
								{compositionChain.map((hoc, index) => (
									<div 
										key={`${hoc.id}-${index}`} 
										className='chain-link'
										style={{ background: hoc.color }}>
										{hoc.name}
									</div>
								))}
								{compositionChain.length > 0 && (
									<div className='chain-result'>
										Enhanced Component
									</div>
								)}
							</div>
							
							{compositionChain.length > 3 && (
								<p style={{ 
									color: '#e74c3c', 
									textAlign: 'center',
									marginTop: '10px' 
								}}>
									⚠️ Deep nesting detected! Consider refactoring
								</p>
							)}
						</>
					)}
				</div>

				<div className='debugging-depth'>
					<h4>Debugging Complexity</h4>
					<div className='depth-visualization'>
						{[1, 2, 3, 4, 5].map(level => (
							<div 
								key={level}
								className={`depth-level ${debuggingDepth >= level ? 'active' : ''}`}>
								{level}
							</div>
						))}
					</div>
					<p>Current depth: {debuggingDepth} layers</p>
					{debuggingDepth > 3 && (
						<p style={{ color: '#e74c3c' }}>
							High complexity - debugging will be challenging!
						</p>
					)}
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Advanced HOC Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// Advanced HOC Patterns

// 1. Props Proxy Pattern
function withExtraProps(WrappedComponent) {
  return function WithExtraPropsComponent(props) {
    // Add or modify props
    const enhancedProps = {
      ...props,
      extraProp: 'added by HOC',
      // Override existing prop
      onClick: (...args) => {
        console.log('Click intercepted by HOC');
        props.onClick?.(...args);
      }
    };
    
    return <WrappedComponent {...enhancedProps} />;
  };
}

// 2. Inheritance Inversion Pattern
function withInheritanceInversion(WrappedComponent) {
  return class extends WrappedComponent {
    // Access component lifecycle and state
    componentDidMount() {
      console.log('HOC: Component mounted');
      // Access component state
      console.log('State:', this.state);
      super.componentDidMount?.();
    }
    
    render() {
      // Can modify render output
      const elementTree = super.render();
      
      // Conditionally render
      if (this.state.error) {
        return <ErrorDisplay error={this.state.error} />;
      }
      
      // Modify element tree
      return React.cloneElement(elementTree, {
        className: \`\${elementTree.props.className} enhanced\`
      });
    }
  };
}

// 3. Conditional Rendering HOC
function withConditionalRendering(
  WrappedComponent,
  condition,
  FallbackComponent = () => null
) {
  return function ConditionalComponent(props) {
    // Evaluate condition
    const shouldRender = typeof condition === 'function' 
      ? condition(props) 
      : condition;
    
    return shouldRender 
      ? <WrappedComponent {...props} />
      : <FallbackComponent {...props} />;
  };
}

// Usage
const OnlyForAdmins = withConditionalRendering(
  AdminPanel,
  (props) => props.user?.role === 'admin',
  () => <div>Access Denied</div>
);

// 4. State Abstraction HOC
function withToggle(WrappedComponent) {
  return function WithToggleComponent(props) {
    const [on, setOn] = useState(false);
    const toggle = () => setOn(!on);
    
    return (
      <WrappedComponent 
        {...props}
        on={on}
        toggle={toggle}
      />
    );
  };
}

// 5. HOC Composition with Display Names
function compose(...hocs) {
  return function(WrappedComponent) {
    return hocs.reduceRight((acc, hoc) => {
      const Enhanced = hoc(acc);
      // Preserve display names for debugging
      Enhanced.displayName = \`\${hoc.name}(\${
        acc.displayName || acc.name || 'Component'
      })\`;
      return Enhanced;
    }, WrappedComponent);
  };
}

// Proper display name preservation
function withDisplayName(hocName) {
  return function(WrappedComponent) {
    const WithHOC = (props) => {
      // HOC logic here
      return <WrappedComponent {...props} />;
    };
    
    WithHOC.displayName = \`\${hocName}(\${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })\`;
    
    return WithHOC;
  };
}

// 6. HOC with Ref Forwarding
function withRefForwarding(WrappedComponent) {
  const WithRef = React.forwardRef((props, ref) => {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  });
  
  WithRef.displayName = \`withRef(\${
    WrappedComponent.displayName || WrappedComponent.name
  })\`;
  
  return WithRef;
}

// 7. Performance Optimized HOC
function withMemo(WrappedComponent) {
  const MemoizedComponent = React.memo(WrappedComponent);
  
  return function WithMemoComponent(props) {
    // Can add additional logic here
    return <MemoizedComponent {...props} />;
  };
}

// 8. Error Boundary HOC
function withErrorBoundary(WrappedComponent, FallbackComponent) {
  return class extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
    }
    
    render() {
      if (this.state.hasError) {
        return <FallbackComponent error={this.state.error} />;
      }
      
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Complete example with all patterns
const enhance = compose(
  withErrorBoundary(ErrorFallback),
  withAuth,
  withExtraProps,
  withToggle,
  withMemo,
  withDisplayName('FullyEnhanced')
);

const EnhancedComponent = enhance(BaseComponent);`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Layer Management:</strong> "Each pattern serves a purpose. Props proxy 
					for simple enhancements, inheritance inversion for deep control. But remember - 
					with each layer, debugging becomes harder. Choose wisely."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Layering Insight:</h3>
				<p>
					Advanced HOC patterns provide powerful capabilities but come with complexity 
					costs. Props proxy is the safest pattern, while inheritance inversion gives 
					maximum control at the cost of tight coupling.
				</p>
				<p>
					The key to HOC mastery is knowing when to stop. Each layer adds indirection, 
					making debugging and testing more difficult. Modern React's hooks often provide 
					cleaner alternatives, but these patterns remain relevant for specific use cases.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Pattern Complexity</h3>
				<p>
					<strong>How deep is too deep for HOC composition?</strong> Consider the 
					debugging experience and cognitive load on other developers.
				</p>
				<p>
					<strong>When would inheritance inversion be justified?</strong> Think about 
					the trade-offs of accessing component internals versus maintaining loose coupling.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As enhancement layers piled up, Binary's circuits sparked with concern. 
					"The component tree is becoming a component forest!" Forge Master Enhance 
					nodded solemnly. "You've seen the power and the peril. Tomorrow, we'll 
					discuss when to use HOCs and when to choose alternatives..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;