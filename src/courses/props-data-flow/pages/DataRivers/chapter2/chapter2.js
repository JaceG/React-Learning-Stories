import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
	const [damGates, setDamGates] = useState({
		gate1: false,
		gate2: false,
		gate3: false,
	});

	const [flowRate, setFlowRate] = useState(0);

	const toggleGate = (gate) => {
		const newGates = { ...damGates, [gate]: !damGates[gate] };
		setDamGates(newGates);

		const openGates = Object.values(newGates).filter(
			(isOpen) => isOpen
		).length;
		setFlowRate(openGates * 33);
	};

	const resetGates = () => {
		setDamGates({
			gate1: false,
			gate2: false,
			gate3: false,
		});
		setFlowRate(0);
	};

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>Chapter 2: Dams and Bridges</h2>

				<div className='chapter-bridge'>
					<p>
						Flux led Aria upstream to where the data rivers
						converged at a massive dam complex. The sound of
						controlled waterfalls filled the air as data streams
						were carefully managed through an intricate system of
						gates and channels.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Ah, visitors!" A stocky figure emerged from the control
						house, water droplets glistening in his thick beard.
						"I'm <strong>Dam Master Gatekeeper</strong>, controller
						of the flows. River Master Flux, bringing another
						student?"
					</p>
					<p className='story-paragraph'>
						"Indeed, Gatekeeper. Aria needs to understand flow
						control," Flux replied.
					</p>
					<p className='story-paragraph'>
						Gatekeeper's eyes twinkled. "Perfect timing! You see,
						young Aria, while we cannot reverse the river's flow, we
						absolutely can control it." He gestured to the complex
						gate system. "These dams represent conditional rendering
						- deciding which data streams reach which components."
					</p>
					<p className='story-paragraph'>
						Binary scanned the controls. "So you filter data as it
						flows?"
					</p>
					<p className='story-paragraph'>
						"Filter, transform, redirect!" Gatekeeper boomed.
						"Sometimes sensitive data must be filtered out before
						flowing to public components. Other times, we transform
						raw data into exactly what downstream components need.
						Watch this!"
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Dam Control System</h3>
					<p>
						Open gates to control data flow (current flow:{' '}
						{flowRate}%)
					</p>

					<div className='dam-control'>
						<h4>Data Flow Gates</h4>
						<div>
							<div
								className={`dam-gate ${
									damGates.gate1 ? 'open' : ''
								}`}
								onClick={() => toggleGate('gate1')}>
								User Data Gate{' '}
								{damGates.gate1 ? '(Open)' : '(Closed)'}
							</div>
							<div
								className={`dam-gate ${
									damGates.gate2 ? 'open' : ''
								}`}
								onClick={() => toggleGate('gate2')}>
								Settings Gate{' '}
								{damGates.gate2 ? '(Open)' : '(Closed)'}
							</div>
							<div
								className={`dam-gate ${
									damGates.gate3 ? 'open' : ''
								}`}
								onClick={() => toggleGate('gate3')}>
								Permissions Gate{' '}
								{damGates.gate3 ? '(Open)' : '(Closed)'}
							</div>
						</div>

						<div
							style={{
								marginTop: '20px',
								fontSize: '14px',
								color: '#5d4037',
							}}>
							Flow Rate:{' '}
							{flowRate > 0
								? `${flowRate}% - River is flowing!`
								: 'No flow - All gates closed'}
						</div>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								justifyContent: 'center',
								marginTop: '15px',
							}}>
							<button
								className='reset-button'
								onClick={resetGates}
								disabled={flowRate === 0}>
								Reset All Gates
							</button>
						</div>
					</div>

					<div className='data-packet' style={{ marginTop: '20px' }}>
						<h4>Downstream Components Receive:</h4>
						{flowRate === 0 && (
							<p style={{ color: '#999' }}>No data flowing...</p>
						)}
						{damGates.gate1 && (
							<div className='water-drop'>
								User: {`{ name, email, role }`}
							</div>
						)}
						{damGates.gate2 && (
							<div className='water-drop'>
								Settings: {`{ theme, language }`}
							</div>
						)}
						{damGates.gate3 && (
							<div className='water-drop'>
								Permissions: {`{ canEdit, canDelete }`}
							</div>
						)}
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						After experimenting with the gates, Gatekeeper led them
						to an observation deck overlooking a network of bridges
						spanning the various river branches. "Now for the second
						lesson - data distribution!"
					</p>
					<p className='story-paragraph'>
						"See those bridges?" Flux pointed to the elegant
						structures. "They represent components that share data
						with multiple children. The data still flows downward,
						but bridges allow it to reach different branches of your
						component tree."
					</p>
					<p className='story-paragraph'>
						Aria studied the flow patterns. "So if multiple
						components need the same data..."
					</p>
					<p className='story-paragraph'>
						"You lift the source up!" Gatekeeper finished. "Place
						your data high enough that it can flow naturally to all
						components that need it. Like building a water tower on
						a hill to serve the entire village below."
					</p>
					<p className='story-paragraph'>
						"This prevents prop drilling," Flux added, "and ensures
						efficient data distribution. Remember - data should live
						at the lowest common ancestor of all components that use
						it."
					</p>
				</div>

				<div className='code-example'>
					<pre>{`// Controlling data flow with conditional rendering
function DataDam({ userData, settings, permissions, userRole }) {
  // Gate 1: Filter user data based on permissions
  const filteredUserData = permissions.canViewUsers 
    ? userData 
    : { name: userData.name }; // Only basic info
  
  // Gate 2: Transform settings based on user role
  const userSettings = {
    ...settings,
    advancedOptions: userRole === 'admin' ? settings.advanced : null
  };
  
  // Gate 3: Conditional rendering - some components only for certain roles
  return (
    <div>
      <UserProfile data={filteredUserData} />
      <SettingsPanel settings={userSettings} />
      
      {permissions.canEdit && (
        <EditControls />  // This component only renders if gate is open
      )}
      
      {permissions.canDelete && (
        <DeleteButton />  // Another conditional gate
      )}
    </div>
  );
}

// Transforming data as it flows
function DataTransformer({ rawData }) {
  // Transform the data before passing it down
  const processedData = {
    ...rawData,
    displayName: rawData.firstName + ' ' + rawData.lastName,
    formattedDate: new Date(rawData.timestamp).toLocaleDateString(),
    isActive: rawData.status === 'active'
  };
  
  return <DisplayComponent data={processedData} />;
}`}</pre>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Data Transformation Pipeline
					</h3>
					<div
						style={{
							background: '#f5f5f5',
							padding: '20px',
							borderRadius: '8px',
						}}>
						<div className='flow-control-panel'>
							<h4>Raw Data from Source:</h4>
							<code
								style={{
									display: 'block',
									background: '#fff',
									padding: '10px',
									borderRadius: '4px',
								}}>
								{`{ firstName: "River", lastName: "Guide", timestamp: 1234567890, status: "active" }`}
							</code>
						</div>

						<div
							style={{
								textAlign: 'center',
								fontSize: '24px',
								color: '#0288d1',
								margin: '10px 0',
							}}>
							↓ Transform ↓
						</div>

						<div className='flow-control-panel'>
							<h4>Processed Data to Children:</h4>
							<code
								style={{
									display: 'block',
									background: '#e3f2fd',
									padding: '10px',
									borderRadius: '4px',
								}}>
								{`{ displayName: "River Guide", formattedDate: "1/15/2009", isActive: true, ... }`}
							</code>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 13 (Afternoon)</h4>
						<p>
							The dam complex taught me crucial flow control!
							Gatekeeper showed how conditional rendering acts
							like dam gates - controlling which data reaches
							which components. We can filter sensitive
							information, transform raw data into useful formats,
							and use bridges (shared parents) to distribute data
							efficiently. The key insight: place data sources at
							the lowest common ancestor of components that need
							them. This prevents prop drilling while maintaining
							the sacred one-way flow. Data management is as much
							about what you don't pass as what you do!
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Gatekeeper's Flow Control Wisdom:</h3>
					<p>
						Master data flow through three techniques: conditional
						rendering (gates that control which components receive
						data), prop transformation (processing data into the
						exact shape children need), and strategic placement
						(positioning data sources high enough to serve all
						consumers). Like a well-designed dam system, your
						components should filter sensitive data, transform raw
						information into useful formats, and distribute
						efficiently without prop drilling. Remember: the best
						data flow is both secure and maintainable.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How do dams and bridges help you visualize data flow
						control?
					</p>
					<p>
						When might filtering data early (upstream) be better
						than filtering late?
					</p>
					<p>
						What signs indicate that your data source needs to be
						"lifted" higher?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
