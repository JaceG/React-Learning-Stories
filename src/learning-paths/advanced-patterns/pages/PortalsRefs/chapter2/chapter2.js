import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		refs,
		createRef,
		focusManagement,
		addFocusEvent,
		imperativeHandles,
		addImperativeHandle,
		bridgeStrength,
		evolve
	} = useOutletContext();

	const [refDemo, setRefDemo] = useState('');
	const [focusTrapActive, setFocusTrapActive] = useState(false);
	const [customInputValue, setCustomInputValue] = useState('');

	// Ref examples
	const inputRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const customComponentRef = useRef(null);

	// Ref types demonstration
	const refTypes = [
		{
			id: 'dom',
			name: 'DOM Element Refs',
			icon: '🏷️',
			description: 'Direct DOM access'
		},
		{
			id: 'component',
			name: 'Component Refs',
			icon: '🧩',
			description: 'Component instance access'
		},
		{
			id: 'callback',
			name: 'Callback Refs',
			icon: '📞',
			description: 'Dynamic ref assignment'
		},
		{
			id: 'forward',
			name: 'Forwarded Refs',
			icon: '➡️',
			description: 'Pass refs through components'
		}
	];

	// Custom component with imperative handle
	const CustomInput = forwardRef((props, ref) => {
		const inputRef = useRef(null);
		const [hasFocus, setHasFocus] = useState(false);

		useImperativeHandle(ref, () => ({
			focus: () => {
				inputRef.current?.focus();
				setHasFocus(true);
			},
			clear: () => {
				if (inputRef.current) {
					inputRef.current.value = '';
					props.onChange?.('');
				}
			},
			shake: () => {
				if (inputRef.current) {
					inputRef.current.classList.add('shake');
					setTimeout(() => {
						inputRef.current?.classList.remove('shake');
					}, 500);
				}
			},
			getValue: () => inputRef.current?.value || '',
			isFocused: () => hasFocus
		}));

		return (
			<div style={{ position: 'relative' }}>
				<input
					ref={inputRef}
					type="text"
					value={props.value}
					onChange={(e) => props.onChange?.(e.target.value)}
					onFocus={() => setHasFocus(true)}
					onBlur={() => setHasFocus(false)}
					placeholder="Custom input with imperative API"
					style={{
						padding: '10px',
						borderRadius: '5px',
						border: `2px solid ${hasFocus ? '#3498db' : '#ddd'}`,
						width: '100%',
						transition: 'border-color 0.3s'
					}}
				/>
				{hasFocus && (
					<span style={{
						position: 'absolute',
						top: '-10px',
						left: '10px',
						background: 'white',
						padding: '0 5px',
						color: '#3498db',
						fontSize: '12px'
					}}>
						Focused!
					</span>
				)}
			</div>
		);
	});

	// Focus trap implementation
	const FocusTrap = ({ active, children }) => {
		const containerRef = useRef(null);

		useEffect(() => {
			if (!active || !containerRef.current) return;

			const container = containerRef.current;
			const focusableElements = container.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			// Focus first element when trap activates
			firstElement?.focus();
			addFocusEvent({ type: 'trap-activated', element: 'first' });

			const handleKeyDown = (e) => {
				if (e.key !== 'Tab') return;

				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement?.focus();
						addFocusEvent({ type: 'wrap-backward', element: 'last' });
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement?.focus();
						addFocusEvent({ type: 'wrap-forward', element: 'first' });
					}
				}
			};

			container.addEventListener('keydown', handleKeyDown);
			return () => container.removeEventListener('keydown', handleKeyDown);
		}, [active]);

		return (
			<div ref={containerRef} className={`focus-trap-demo ${active ? 'active' : ''}`}>
				{children}
			</div>
		);
	};

	// Demo ref operations
	const demonstrateRef = (type) => {
		setRefDemo(type);
		createRef(type, `${type}-element`);
		
		switch(type) {
			case 'dom':
				inputRef.current?.focus();
				evolve('understanding');
				break;
			case 'component':
				if (customComponentRef.current) {
					customComponentRef.current.shake();
					addImperativeHandle({ method: 'shake', component: 'CustomInput' });
				}
				break;
			case 'callback':
				// Callback ref demo
				break;
			case 'forward':
				// Forward ref demo
				break;
			default:
				break;
		}
	};

	// Canvas drawing demo
	useEffect(() => {
		if (canvasRef.current && refDemo === 'dom') {
			const ctx = canvasRef.current.getContext('2d');
			ctx.fillStyle = '#3498db';
			ctx.beginPath();
			ctx.arc(50, 50, 30, 0, Math.PI * 2);
			ctx.fill();
		}
	}, [refDemo]);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Reference Scrolls
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"And sometimes," <strong>Escapius</strong> continued, "React's 
					abstraction isn't enough. You need direct DOM access." He unveiled 
					the Reference Scrolls - refs in their purest form.
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> handled them carefully. "Master Aurelius warned 
					about refs in my early training. Direct manipulation breaks React's 
					declarative model."
				</p>

				<p className='story-paragraph'>
					"Used wisely, they're powerful. Used carelessly, they're dangerous. 
					Let me teach you wisdom." <strong>Escapius</strong> demonstrated 
					various ref patterns.
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the patterns. "Refs provide an escape 
					hatch when declarative approaches aren't sufficient. But they should 
					be the exception, not the rule."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Reference Management Laboratory</h3>
				
				<div className='ref-manager'>
					<h4>Ref Type Explorer</h4>
					
					<div className='ref-types'>
						{refTypes.map(type => (
							<div
								key={type.id}
								className={`ref-type-card ${refDemo === type.id ? 'active' : ''}`}
								onClick={() => demonstrateRef(type.id)}>
								<span className='use-case-icon'>{type.icon}</span>
								<div className='ref-type'>{type.name}</div>
								<div className='ref-status'>{type.description}</div>
							</div>
						))}
					</div>

					<div className='ref-bindings'>
						{refs.map(ref => (
							<div key={ref.id} className={`ref-binding ${ref.bound ? 'active' : ''}`}>
								<div className='ref-type'>Type: {ref.type}</div>
								<div className='ref-status'>
									Element: {ref.element} - {ref.bound ? 'Bound' : 'Unbound'}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='ref-demonstrations'>
					<h4>Ref Demonstrations</h4>
					
					<div style={{ marginBottom: '20px' }}>
						<h5>DOM Element Ref</h5>
						<input
							ref={inputRef}
							type="text"
							placeholder="Click 'DOM Element Refs' to focus me"
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '2px solid #ddd',
								width: '100%'
							}}
						/>
						<button
							onClick={() => {
								if (inputRef.current) {
									inputRef.current.value = 'Ref manipulated!';
									inputRef.current.style.border = '2px solid #e74c3c';
								}
							}}
							style={{
								marginTop: '10px',
								padding: '10px 20px',
								background: '#e74c3c',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer'
							}}>
							Manipulate via Ref
						</button>
					</div>

					<div style={{ marginBottom: '20px' }}>
						<h5>Canvas Ref (Direct Drawing)</h5>
						<canvas
							ref={canvasRef}
							width={100}
							height={100}
							style={{
								border: '2px solid #3498db',
								borderRadius: '5px'
							}}
						/>
					</div>

					<div style={{ marginBottom: '20px' }}>
						<h5>Imperative Component API</h5>
						<CustomInput
							ref={customComponentRef}
							value={customInputValue}
							onChange={setCustomInputValue}
						/>
						<div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
							<button
								onClick={() => customComponentRef.current?.focus()}
								className='handle-button'>
								Focus
							</button>
							<button
								onClick={() => customComponentRef.current?.clear()}
								className='handle-button'>
								Clear
							</button>
							<button
								onClick={() => customComponentRef.current?.shake()}
								className='handle-button'>
								Shake
							</button>
							<button
								onClick={() => {
									const value = customComponentRef.current?.getValue();
									alert(`Current value: ${value}`);
								}}
								className='handle-button'>
								Get Value
							</button>
						</div>
					</div>
				</div>

				<div className='focus-management'>
					<h4>Focus Management</h4>
					<button
						onClick={() => setFocusTrapActive(!focusTrapActive)}
						style={{
							padding: '10px 20px',
							background: focusTrapActive ? '#e74c3c' : '#3498db',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							marginBottom: '20px'
						}}>
						{focusTrapActive ? 'Deactivate' : 'Activate'} Focus Trap
					</button>

					<FocusTrap active={focusTrapActive}>
						<p>Tab through these elements when trap is active:</p>
						<button className='focusable-element'>First Button</button>
						<button className='focusable-element'>Second Button</button>
						<input
							type="text"
							placeholder="Trapped input"
							className='focusable-element'
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '2px solid #ddd'
							}}
						/>
						<button className='focusable-element'>Last Button</button>
					</FocusTrap>

					<div className='focus-events'>
						<h5>Focus Events Log</h5>
						<div style={{
							background: '#2d3436',
							color: 'white',
							padding: '10px',
							borderRadius: '5px',
							height: '100px',
							overflow: 'auto'
						}}>
							{focusManagement.map((event, i) => (
								<div key={event.id} style={{ fontSize: '12px' }}>
									{i + 1}. {event.type} - {event.element}
								</div>
							))}
						</div>
					</div>
				</div>

				{imperativeHandles.length > 0 && (
					<div className='imperative-showcase'>
						<h4>Imperative Handles Used</h4>
						<div className='handle-controls'>
							{imperativeHandles.map(handle => (
								<div key={handle.id} style={{
									background: 'white',
									padding: '10px',
									borderRadius: '5px',
									border: '2px solid #e84393'
								}}>
									{handle.component}.{handle.method}()
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Ref Mastery</span>
				</div>
				<div className='code-example'>
					<pre>{`// React Refs - Direct DOM and Component Access

import { useRef, forwardRef, useImperativeHandle } from 'react';

// 1. Basic DOM Ref
function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Direct DOM manipulation
    inputRef.current.focus();
    inputRef.current.select();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

// 2. Multiple Refs with Callback Pattern
function MultipleRefs() {
  const refs = useRef({});
  
  // Callback ref for dynamic assignment
  const setRef = (element, key) => {
    if (element) {
      refs.current[key] = element;
    }
  };
  
  const focusField = (key) => {
    refs.current[key]?.focus();
  };
  
  return (
    <>
      {['name', 'email', 'phone'].map(field => (
        <input
          key={field}
          ref={el => setRef(el, field)}
          placeholder={field}
        />
      ))}
      <button onClick={() => focusField('email')}>
        Focus Email
      </button>
    </>
  );
}

// 3. Component Refs (Class Components)
class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  getCount = () => this.state.count;
  
  render() {
    return <div>Count: {this.state.count}</div>;
  }
}

// Usage
function App() {
  const counterRef = useRef(null);
  
  return (
    <>
      <Counter ref={counterRef} />
      <button onClick={() => counterRef.current.increment()}>
        Increment from Parent
      </button>
    </>
  );
}

// 4. Forwarding Refs
const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">
    {props.children}
  </button>
));

// Usage
function Parent() {
  const buttonRef = useRef(null);
  
  return <FancyButton ref={buttonRef}>Click me!</FancyButton>;
}

// 5. Imperative Handle - Custom Ref API
const CustomTextInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const [isValid, setIsValid] = useState(true);
  
  useImperativeHandle(ref, () => ({
    // Expose custom methods
    focus: () => {
      inputRef.current.focus();
    },
    
    clear: () => {
      inputRef.current.value = '';
    },
    
    validate: () => {
      const valid = inputRef.current.value.length > 0;
      setIsValid(valid);
      return valid;
    },
    
    shake: () => {
      inputRef.current.classList.add('shake');
      setTimeout(() => {
        inputRef.current.classList.remove('shake');
      }, 500);
    },
    
    // Expose specific properties
    get value() {
      return inputRef.current.value;
    },
    
    set value(val) {
      inputRef.current.value = val;
    }
  }));
  
  return (
    <input
      ref={inputRef}
      style={{ borderColor: isValid ? 'green' : 'red' }}
      {...props}
    />
  );
});

// 6. Focus Management
function FocusTrap({ children, active }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!active) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement?.focus();
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    container.addEventListener('keydown', handleTab);
    
    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [active]);
  
  return <div ref={containerRef}>{children}</div>;
}

// 7. Measuring DOM Elements
function MeasuredComponent() {
  const [dimensions, setDimensions] = useState({});
  const elementRef = useRef(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    
    resizeObserver.observe(elementRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);
  
  return (
    <div ref={elementRef}>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}

// 8. Media Control
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const seek = (seconds) => {
    videoRef.current.currentTime += seconds;
  };
  
  return (
    <>
      <video ref={videoRef} src={src} />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => seek(-10)}>-10s</button>
      <button onClick={() => seek(10)}>+10s</button>
    </>
  );
}

// 9. Complex Ref Management Hook
function useRefMap() {
  const refs = useRef(new Map());
  
  const setRef = (key) => (element) => {
    if (element) {
      refs.current.set(key, element);
    } else {
      refs.current.delete(key);
    }
  };
  
  const getRef = (key) => refs.current.get(key);
  
  const focusRef = (key) => {
    getRef(key)?.focus();
  };
  
  return { setRef, getRef, focusRef };
}

// 10. Scroll Management
function ScrollManager() {
  const sectionsRef = useRef({});
  
  const scrollToSection = (sectionId) => {
    sectionsRef.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  return (
    <>
      <nav>
        {['intro', 'content', 'conclusion'].map(section => (
          <button key={section} onClick={() => scrollToSection(section)}>
            Go to {section}
          </button>
        ))}
      </nav>
      
      <div ref={el => sectionsRef.current.intro = el}>
        <h2>Introduction</h2>
      </div>
      <div ref={el => sectionsRef.current.content = el}>
        <h2>Content</h2>
      </div>
      <div ref={el => sectionsRef.current.conclusion = el}>
        <h2>Conclusion</h2>
      </div>
    </>
  );
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Ref Wisdom:</strong> "Refs are your bridge to the imperative world. 
					Use them for focus management, DOM measurements, media control, and integration 
					with third-party libraries. But remember - they're an escape hatch, not a 
					primary pattern. When you must break React's declarative model, do so 
					deliberately and document why."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Reference Insight:</h3>
				<p>
					Refs provide direct access to DOM elements and component instances, enabling 
					imperative operations when declarative approaches fall short. They're essential 
					for focus management, integrating with non-React libraries, and accessing 
					browser APIs.
				</p>
				<p>
					The key to using refs wisely is understanding when React's declarative model 
					isn't sufficient. Focus management, media playback, canvas drawing, and text 
					selection are valid use cases. Avoid refs for things that can be done 
					declaratively with state and props.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Reference Power</h3>
				<p>
					<strong>When are refs truly necessary?</strong> Consider scenarios where 
					React's declarative model cannot express what you need to accomplish.
				</p>
				<p>
					<strong>How do imperative handles improve component APIs?</strong> Think 
					about the balance between exposing implementation details and providing 
					useful methods.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> practiced the ref patterns, feeling the direct 
					connection to the DOM. "It's powerful, but I see why it should be used 
					sparingly."
				</p>
				<p>
					<strong>Binary</strong> computed the implications. "Each ref is a bridge 
					between React's virtual world and the browser's reality. Too many bridges 
					and the abstraction collapses."
				</p>
				<p>
					<strong>Portal Keeper Escapius</strong> nodded approvingly. "You understand 
					the balance. Tomorrow, we'll combine portals and refs to create truly 
					powerful architectural patterns..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;