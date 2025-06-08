import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		renderDelegations,
		logicProviders,
		presentationConsumers,
		flexibilityLevel,
		tradeoffBalance,
		resetPatterns
	} = useOutletContext();

	const [comparisonMode, setComparisonMode] = useState(false);
	const [masterExample, setMasterExample] = useState('modal');
	const [patternShowcase, setPatternShowcase] = useState(false);

	// Pattern comparison data
	const patternComparison = [
		{
			pattern: 'Compound Components',
			flexibility: 40,
			simplicity: 80,
			useCase: 'Component families with fixed relationships'
		},
		{
			pattern: 'Render Props',
			flexibility: 90,
			simplicity: 30,
			useCase: 'Maximum UI flexibility with shared logic'
		},
		{
			pattern: 'Hooks',
			flexibility: 70,
			simplicity: 70,
			useCase: 'Modern React with composition'
		}
	];

	// Complete examples
	const completeExamples = [
		{
			id: 'modal',
			name: 'Flexible Modal',
			icon: '🎭',
			description: 'Modal with customizable everything'
		},
		{
			id: 'autocomplete',
			name: 'Autocomplete',
			icon: '🔍',
			description: 'Search with custom result rendering'
		},
		{
			id: 'animation',
			name: 'Animation Controller',
			icon: '🎬',
			description: 'Animate anything with shared logic'
		},
		{
			id: 'data-fetcher',
			name: 'Data Fetcher',
			icon: '📊',
			description: 'Fetch data, render any UI'
		}
	];

	// Start pattern showcase
	const startShowcase = () => {
		setPatternShowcase(true);
		let delay = 0;
		
		completeExamples.forEach(example => {
			setTimeout(() => {
				setMasterExample(example.id);
			}, delay);
			delay += 2000;
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Render Mastery
			</h2>

			<div className='chapter-bridge'>
				Time to see render props in their full glory...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Pattern Master Renderius</strong> gathered all the delegation 
					examples. "You understand the trade-offs. Compound components for intuitive 
					APIs, render props for maximum flexibility. Both have their place in the 
					architect's toolkit."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> demonstrated her mastery by creating components that 
					supported both patterns. "I can provide a default UI with compound components, 
					but allow render prop overrides for customization!"
				</p>

				<p className='story-paragraph'>
					"Brilliant!" Renderius exclaimed. "You're thinking like a true architect - 
					not choosing between patterns, but combining them purposefully."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> displayed the statistics: "Render props: maximum 
					flexibility, higher complexity. Compound components: intuitive API, less 
					flexible. The choice depends on your users' needs."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Render Props Mastery Showcase</h3>
				
				<div className='render-delegation-chamber'>
					<h4>Complete Render Prop Examples</h4>
					
					<div className='render-patterns'>
						{completeExamples.map(example => (
							<div
								key={example.id}
								className={`render-pattern-card ${masterExample === example.id ? 'selected' : ''}`}
								onClick={() => setMasterExample(example.id)}>
								<span className='pattern-icon'>{example.icon}</span>
								<div className='pattern-name'>{example.name}</div>
								<div className='pattern-description'>{example.description}</div>
							</div>
						))}
					</div>
					
					{!patternShowcase && (
						<button 
							className='showcase-button'
							onClick={startShowcase}
							style={{
								display: 'block',
								margin: '20px auto',
								padding: '12px 24px',
								fontSize: '18px',
								background: '#fd79a8',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer'
							}}>
							🎨 Start Render Props Showcase
						</button>
					)}
				</div>

				<div className='pattern-comparison'>
					<h4>Pattern Comparison</h4>
					<button 
						className='comparison-toggle'
						onClick={() => setComparisonMode(!comparisonMode)}>
						{comparisonMode ? 'Hide' : 'Show'} Pattern Comparison
					</button>
					
					{comparisonMode && (
						<div className='comparison-grid'>
							{patternComparison.map(item => (
								<div key={item.pattern} className='comparison-item'>
									<h5>{item.pattern}</h5>
									<div className='comparison-bars'>
										<div className='bar-item'>
											<span>Flexibility</span>
											<div className='bar'>
												<div 
													className='bar-fill flexibility'
													style={{ width: `${item.flexibility}%` }}
												/>
											</div>
										</div>
										<div className='bar-item'>
											<span>Simplicity</span>
											<div className='bar'>
												<div 
													className='bar-fill simplicity'
													style={{ width: `${item.simplicity}%` }}
												/>
											</div>
										</div>
									</div>
									<p className='use-case'>{item.useCase}</p>
								</div>
							))}
						</div>
					)}
				</div>

				{patternShowcase && (
					<div className='mastery-summary'>
						<h4>Render Props Mastery Summary</h4>
						<ul>
							<li>✓ {renderDelegations.length} delegation patterns learned</li>
							<li>✓ {logicProviders.length} logic providers created</li>
							<li>✓ Maximum flexibility achieved: {flexibilityLevel}%</li>
							<li>✓ Trade-offs understood and balanced</li>
						</ul>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Production Render Props Examples</span>
				</div>
				<div className='code-example'>
					<pre>{`// Production-Ready Render Props Components

// 1. Flexible Modal with Render Props
function Modal({ 
  isOpen, 
  onClose, 
  renderHeader, 
  renderContent, 
  renderFooter,
  children 
}) {
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const previousActive = document.activeElement;
      return () => {
        document.body.style.overflow = '';
        previousActive?.focus();
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Support both render props and children function
  const content = children || renderContent;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true">
        {renderHeader && (
          <div className="modal-header">
            {renderHeader({ onClose })}
          </div>
        )}
        
        <div className="modal-content">
          {typeof content === 'function' 
            ? content({ onClose })
            : content
          }
        </div>
        
        {renderFooter && (
          <div className="modal-footer">
            {renderFooter({ onClose })}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// Usage - Maximum flexibility
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  renderHeader={({ onClose }) => (
    <>
      <h2>Custom Header</h2>
      <button onClick={onClose}>×</button>
    </>
  )}
  renderFooter={({ onClose }) => (
    <>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  )}>
  {({ onClose }) => (
    <div>
      <p>Fully custom modal content!</p>
      <button onClick={onClose}>Close from content</button>
    </div>
  )}
</Modal>

// 2. Autocomplete with Render Props
function Autocomplete({ 
  items, 
  onSelect,
  filterItems = defaultFilter,
  renderInput,
  renderItem,
  renderNoResults
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const filteredItems = filterItems(items, query);
  
  const getInputProps = () => ({
    value: query,
    onChange: (e) => {
      setQuery(e.target.value);
      setIsOpen(true);
    },
    onKeyDown: (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(i => 
            Math.min(i + 1, filteredItems.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(i => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[highlightedIndex]) {
            handleSelect(filteredItems[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    },
    onFocus: () => setIsOpen(true),
    onBlur: () => setTimeout(() => setIsOpen(false), 200)
  });
  
  const getItemProps = (item, index) => ({
    onClick: () => handleSelect(item),
    onMouseEnter: () => setHighlightedIndex(index),
    className: highlightedIndex === index ? 'highlighted' : ''
  });
  
  const handleSelect = (item) => {
    onSelect(item);
    setQuery(item.label || '');
    setIsOpen(false);
  };
  
  return (
    <div className="autocomplete">
      {renderInput({ getInputProps })}
      
      {isOpen && (
        <div className="autocomplete-dropdown">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={item.id} {...getItemProps(item, index)}>
                {renderItem 
                  ? renderItem(item, { highlighted: index === highlightedIndex })
                  : item.label
                }
              </div>
            ))
          ) : (
            renderNoResults ? renderNoResults(query) : (
              <div className="no-results">No results for "{query}"</div>
            )
          )}
        </div>
      )}
    </div>
  );
}

// 3. Animation Controller
function SpringAnimation({ 
  from, 
  to, 
  config = { tension: 170, friction: 26 },
  children 
}) {
  const [value, setValue] = useState(from);
  
  useEffect(() => {
    let animationId;
    let velocity = 0;
    
    const animate = () => {
      const distance = to - value;
      const acceleration = distance * config.tension / 1000;
      velocity += acceleration;
      velocity *= 1 - config.friction / 1000;
      
      const newValue = value + velocity;
      
      if (Math.abs(distance) > 0.01 || Math.abs(velocity) > 0.01) {
        setValue(newValue);
        animationId = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [to, config.tension, config.friction]);
  
  // Delegate rendering with animated value
  return children({ value, progress: (value - from) / (to - from) });
}

// Usage - Animate anything!
<SpringAnimation from={0} to={100}>
  {({ value, progress }) => (
    <div 
      style={{
        transform: \`translateX(\${value}px)\`,
        opacity: progress
      }}>
      Animated content!
    </div>
  )}
</SpringAnimation>

// 4. Combining Patterns - Best of Both Worlds
function Toggle({ on: controlledOn, onChange, children }) {
  const [uncontrolledOn, setUncontrolledOn] = useState(false);
  const on = controlledOn ?? uncontrolledOn;
  
  const toggle = () => {
    if (controlledOn === undefined) {
      setUncontrolledOn(!on);
    }
    onChange?.(!on);
  };
  
  const getTogglerProps = (props = {}) => ({
    ...props,
    onClick: (...args) => {
      props.onClick?.(...args);
      toggle();
    },
    'aria-pressed': on
  });
  
  // Support multiple API styles
  if (typeof children === 'function') {
    // Render prop API
    return children({ on, toggle, getTogglerProps });
  }
  
  // Compound component API
  return (
    <ToggleContext.Provider value={{ on, toggle, getTogglerProps }}>
      {children}
    </ToggleContext.Provider>
  );
}

// Static compound components
Toggle.Button = function ToggleButton({ children, ...props }) {
  const { on, getTogglerProps } = useContext(ToggleContext);
  return (
    <button {...getTogglerProps(props)}>
      {children || (on ? 'ON' : 'OFF')}
    </button>
  );
};

Toggle.Display = function ToggleDisplay({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Mastery Achievement:</strong> "These examples show production patterns. 
					Notice how they handle edge cases, provide multiple APIs, and combine patterns. 
					True mastery is knowing when to use each approach."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Render Props Mastery:</h3>
				<p>
					Render props shine when you need maximum flexibility. They're perfect for 
					libraries where you can't predict how consumers will want to render UI. 
					The pattern trades simplicity for power - a worthwhile trade when flexibility 
					is paramount.
				</p>
				<p>
					Modern React often uses hooks instead of render props for sharing logic, 
					but render props remain valuable for components that need to delegate 
					rendering control. The best architects know both patterns and choose 
					based on the specific need.
				</p>
			</div>

			{flexibilityLevel >= 80 && (
				<div className='achievement-banner'>
					<h4>🎨 Render Props Mastery Achieved! 🎨</h4>
					<p>You've mastered the art of delegation!</p>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li>✓ Basic render props understood</li>
						<li>✓ Advanced patterns mastered</li>
						<li>✓ Trade-offs balanced</li>
						<li>✓ Production examples implemented</li>
						<li>✓ Flexibility Level: {flexibilityLevel}%</li>
					</ul>
				</div>
			)}

			<div className='chapter-ending'>
				<p>
					Pattern Master Renderius applauded as Aria demonstrated her mastery. "You've 
					learned when to hold control and when to delegate it. Render props are powerful, 
					but they're not the only pattern for sharing behavior. Forge Master Enhance 
					awaits to teach you about Higher-Order Components..."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;