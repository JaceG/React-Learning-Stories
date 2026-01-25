import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={2}
				title={`The Reference Scrolls`}
				bridge={`"And sometimes," Portal Keeper Escapius continued, unveiling the Reference Scrolls, "React's abstraction isn't enough. You need direct DOM access." Aria handled them carefully. "Master Aurelius warned about refs in my early training. Direct manipulation breaks React's declarative model." Escapius nodded. "Used wisely, they're powerful. Used carelessly, they're dangerous."`}
			/>

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
				<h3 className='section-title'>Interactive Exercise: Reference Management Laboratory</h3>
				
				<InstructionBox character={`Escapius hands you the Reference Scrolls.`}>
					Explore DOM element refs, component refs, callback refs, and forwarded refs. 
					Try the focus trap demonstration and imperative component API!
				</InstructionBox>
				
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

			<CodeExample
				title={`Ref Mastery`}
				discoveredBy={`Transcribed by Aria`}
				code={`// React Refs - Direct DOM and Component Access
import { useRef, forwardRef, useImperativeHandle } from 'react';

// 1. Basic DOM Ref
function TextInput() {
  const inputRef = useRef(null);
  const focusInput = () => {
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

// 2. Forwarding Refs
const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">{props.children}</button>
));

// 3. Imperative Handle - Custom Ref API
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    shake: () => {
      inputRef.current.classList.add('shake');
      setTimeout(() => inputRef.current.classList.remove('shake'), 500);
    },
    get value() { return inputRef.current.value; }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// 4. Focus Trap for Modals
function FocusTrap({ children, active }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const focusableElements = containerRef.current.querySelectorAll(
      'button, input, select, textarea, a[href]'
    );
    // Trap focus within container
  }, [active]);
  return <div ref={containerRef}>{children}</div>;
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Reference Insight:`,
					content: `Refs provide direct access to DOM elements and component instances, enabling imperative operations when declarative approaches fall short. Essential for focus management, integrating with non-React libraries, and accessing browser APIs. The key is understanding when React's declarative model isn't sufficient.`
				}}
				reflectionQuestions={[
					`When are refs truly necessary?`,
					`How do imperative handles improve component APIs?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 36 (Afternoon)`,
					content: `Escapius unveiled the Reference Scrolls - the bridge to the imperative world! I learned DOM refs for direct element access, forwardRef to pass refs through components, and useImperativeHandle for custom ref APIs. The focus trap demonstration was impressive - trapping keyboard navigation within a modal. Binary computed: "Each ref is a bridge between React's virtual world and the browser's reality. Too many bridges and the abstraction collapses." ${refs.length} refs bound, ${imperativeHandles.length} imperative handles created!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;