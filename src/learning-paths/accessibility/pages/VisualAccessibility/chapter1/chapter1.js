import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const [activeColorMode, setActiveColorMode] = useState('normal');
	const [selectedPalette, setSelectedPalette] = useState('default');
	const [nonColorEnabled, setNonColorEnabled] = useState({
		icons: false,
		patterns: false,
		labels: false,
		shapes: false
	});
	const [colorTestResults, setColorTestResults] = useState([]);
	const [demoState, setDemoState] = useState({
		error: false,
		success: false,
		warning: false,
		info: false
	});
	
	const { 
		colorMode,
		setColorMode,
		colorBlindMode,
		applyColorBlindFilter,
		nonColorIndicators,
		addNonColorIndicator
	} = useOutletContext();

	const colorVisionTypes = [
		{ id: 'normal', label: 'Normal Vision', description: 'Full color vision' },
		{ id: 'protanopia', label: 'Protanopia', description: 'Red-blind (1% of males)' },
		{ id: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (1% of males)' },
		{ id: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' },
		{ id: 'achromatopsia', label: 'Achromatopsia', description: 'Complete color blindness' }
	];

	const colorPalettes = [
		{ 
			id: 'default', 
			colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
			label: 'Default (Problematic)'
		},
		{ 
			id: 'accessible', 
			colors: ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2'],
			label: 'Accessible Palette'
		}
	];

	const stateExamples = [
		{ state: 'error', color: '#DC143C', icon: '❌', pattern: 'diagonal', label: 'Error' },
		{ state: 'success', color: '#32CD32', icon: '✓', pattern: 'checkmark', label: 'Success' },
		{ state: 'warning', color: '#FFA500', icon: '⚠️', pattern: 'stripes', label: 'Warning' },
		{ state: 'info', color: '#1E90FF', icon: 'ℹ️', pattern: 'dots', label: 'Information' }
	];

	const handleColorModeChange = (mode) => {
		setActiveColorMode(mode);
		applyColorBlindFilter(mode);
	};

	const toggleNonColorIndicator = (type) => {
		setNonColorEnabled(prev => ({
			...prev,
			[type]: !prev[type]
		}));
		if (!nonColorEnabled[type]) {
			addNonColorIndicator(type);
		}
	};

	const testColorAccessibility = () => {
		const results = stateExamples.map(example => ({
			state: example.state,
			colorOnly: false,
			withIndicators: nonColorEnabled.icons || nonColorEnabled.patterns || nonColorEnabled.labels
		}));
		setColorTestResults(results);
	};

	return (
		<div className='chapter visual-accessibility'>
			<h2 className='chapter-title'>
				Chapter 1: The Color Conservatory
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Guardian Spectrum</strong> managed the Color Conservatory. "Eight 
					percent of men have color vision differences. Never convey information 
					through color alone."
				</p>
				
				<p className='story-paragraph'>
					Aria's error states used only red. "But red means error!"
				</p>

				<p className='story-paragraph'>
					"To you. Add icons, text, patterns. Redundancy ensures everyone gets the message."
				</p>

				<p className='story-paragraph'>
					Binary analyzed the spectrum. "Color perception variance: 300 million 
					affected globally. Solution: Multi-modal indicators!"
				</p>

				<p className='story-paragraph'>
					Debuggora examined the patterns. "I see - color is enhancement, not 
					essential. Every color needs a non-color companion."
				</p>

				<p className='story-paragraph'>
					Guardian Spectrum smiled. "Color enriches for those who see it, but 
					information must never depend on it alone."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Color Vision Simulator</h3>
				
				<div className='color-conservatory'>
					<div className='vision-modes'>
						{colorVisionTypes.map((type) => (
							<button
								key={type.id}
								onClick={() => handleColorModeChange(type.id)}
								className={`vision-mode-button ${activeColorMode === type.id ? 'active' : ''}`}
							>
								{type.label}
							</button>
						))}
					</div>

					<div style={{ marginTop: '20px' }}>
						<h4 style={{ marginBottom: '15px' }}>Color Palette Comparison</h4>
						<div style={{ display: 'grid', gap: '20px' }}>
							{colorPalettes.map((palette) => (
								<div key={palette.id}>
									<h5 style={{ marginBottom: '10px', color: '#FCD34D' }}>
										{palette.label}
									</h5>
									<div className='color-sample-grid'>
										{palette.colors.map((color, index) => (
											<div
												key={index}
												className={`color-sample ${activeColorMode}`}
												style={{ backgroundColor: color }}
											>
												<span className='color-sample-label'>
													{color}
												</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div style={{ 
						marginTop: '30px',
						padding: '20px',
						background: 'rgba(255, 215, 0, 0.1)',
						borderRadius: '10px',
						border: '1px solid rgba(255, 215, 0, 0.3)'
					}}>
						<p style={{ margin: 0 }}>
							<strong>💡 Tip:</strong> Switch between vision modes to see how colors 
							appear to different users. Notice how some colors become indistinguishable!
						</p>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>State Indicators Without Color</h3>
				
				<div className='non-color-indicators'>
					<p style={{ marginBottom: '20px' }}>
						Never rely on color alone to convey state. Always provide additional indicators:
					</p>

					<div className='indicator-examples'>
						{Object.entries({
							icons: { label: 'Icons', symbol: '🎯' },
							patterns: { label: 'Patterns', symbol: '////' },
							labels: { label: 'Text Labels', symbol: 'Abc' },
							shapes: { label: 'Shapes', symbol: '■●▲' }
						}).map(([key, value]) => (
							<div
								key={key}
								className={`indicator-card ${nonColorEnabled[key] ? 'implemented' : ''}`}
								onClick={() => toggleNonColorIndicator(key)}
							>
								<div className='indicator-icon'>{value.symbol}</div>
								<div className='indicator-name'>{value.label}</div>
								<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									{nonColorEnabled[key] ? '✓ Enabled' : 'Click to enable'}
								</div>
							</div>
						))}
					</div>

					<div style={{ marginTop: '30px' }}>
						<h4 style={{ marginBottom: '20px' }}>State Examples</h4>
						<div style={{ display: 'grid', gap: '15px' }}>
							{stateExamples.map((example) => (
								<div
									key={example.state}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '20px',
										padding: '15px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '8px',
										border: `2px solid ${demoState[example.state] ? example.color : 'transparent'}`,
										transition: 'all 0.3s ease'
									}}
								>
									<button
										onClick={() => setDemoState(prev => ({
											...prev,
											[example.state]: !prev[example.state]
										}))}
										style={{
											padding: '8px 16px',
											background: example.color,
											border: 'none',
											borderRadius: '5px',
											color: 'white',
											cursor: 'pointer',
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
											minWidth: '120px'
										}}
									>
										{nonColorEnabled.icons && (
											<span>{example.icon}</span>
										)}
										{nonColorEnabled.labels && (
											<span>{example.label}</span>
										)}
										{!nonColorEnabled.icons && !nonColorEnabled.labels && (
											<span>State</span>
										)}
									</button>
									
									<div style={{ flex: 1 }}>
										<div style={{ marginBottom: '5px' }}>
											<strong>Color only:</strong> {demoState[example.state] ? 
												`This ${example.state} relies only on ${example.color}` : 
												'Click to see state'
											}
										</div>
										<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
											<strong>With indicators:</strong> 
											{nonColorEnabled.icons && ` ${example.icon} icon`}
											{nonColorEnabled.labels && ` "${example.label}" text`}
											{nonColorEnabled.patterns && ` ${example.pattern} pattern`}
											{!nonColorEnabled.icons && !nonColorEnabled.labels && !nonColorEnabled.patterns && 
												' No additional indicators'}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<button
						onClick={testColorAccessibility}
						style={{
							marginTop: '20px',
							padding: '12px 30px',
							background: 'linear-gradient(135deg, #7B68EE, #6A5ACD)',
							border: 'none',
							borderRadius: '25px',
							color: 'white',
							fontSize: '1.1em',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
					>
						Test Accessibility
					</button>

					{colorTestResults.length > 0 && (
						<div style={{
							marginTop: '20px',
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '10px'
						}}>
							<h5 style={{ marginBottom: '15px' }}>Test Results:</h5>
							{colorTestResults.map((result, index) => (
								<div key={index} style={{ marginBottom: '10px' }}>
									{result.withIndicators ? 
										<span style={{ color: '#32CD32' }}>✓ {result.state}: Accessible with indicators</span> :
										<span style={{ color: '#DC143C' }}>✗ {result.state}: Relies on color only</span>
									}
								</div>
							))}
						</div>
					)}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Real-World Examples</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					<div style={{ display: 'grid', gap: '20px' }}>
						{/* Form Validation Example */}
						<div>
							<h4 style={{ marginBottom: '15px' }}>Form Validation</h4>
							<div style={{ display: 'grid', gap: '10px' }}>
								<div style={{
									padding: '10px',
									background: 'rgba(220, 20, 60, 0.2)',
									border: '2px solid #DC143C',
									borderRadius: '5px'
								}}>
									<strong>Bad:</strong> Red border only
								</div>
								<div style={{
									padding: '10px',
									background: 'rgba(220, 20, 60, 0.2)',
									border: '2px solid #DC143C',
									borderRadius: '5px',
									display: 'flex',
									alignItems: 'center',
									gap: '10px'
								}}>
									<span>❌</span>
									<strong>Good:</strong> Red border + icon + error message
								</div>
							</div>
						</div>

						{/* Link States Example */}
						<div>
							<h4 style={{ marginBottom: '15px' }}>Link States</h4>
							<div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
								<div>
									<a href="#" style={{ color: '#1E90FF' }}>Unvisited link</a>
									<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>Blue only</div>
								</div>
								<div>
									<a href="#" style={{ color: '#800080' }}>Visited link</a>
									<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>Purple only</div>
								</div>
								<div>
									<a href="#" style={{ color: '#1E90FF', textDecoration: 'underline' }}>
										Better: Always underlined
									</a>
									<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>Color + underline</div>
								</div>
							</div>
						</div>

						{/* Data Visualization Example */}
						<div>
							<h4 style={{ marginBottom: '15px' }}>Charts & Graphs</h4>
							<div style={{ 
								display: 'flex', 
								gap: '20px',
								alignItems: 'center',
								flexWrap: 'wrap'
							}}>
								<div style={{ textAlign: 'center' }}>
									<div style={{ 
										width: '100px', 
										height: '100px',
										background: 'conic-gradient(#FF0000 0deg 90deg, #00FF00 90deg 180deg, #0000FF 180deg 270deg, #FFFF00 270deg)',
										borderRadius: '50%'
									}}></div>
									<div style={{ marginTop: '10px', fontSize: '0.9em' }}>Color only</div>
								</div>
								<div style={{ textAlign: 'center' }}>
									<div style={{ 
										width: '100px', 
										height: '100px',
										background: 'conic-gradient(#FF0000 0deg 90deg, #00FF00 90deg 180deg, #0000FF 180deg 270deg, #FFFF00 270deg)',
										borderRadius: '50%',
										position: 'relative'
									}}>
										<div style={{
											position: 'absolute',
											top: '25%',
											left: '25%',
											color: 'white',
											fontWeight: 'bold'
										}}>A</div>
										<div style={{
											position: 'absolute',
											top: '25%',
											right: '25%',
											color: 'white',
											fontWeight: 'bold'
										}}>B</div>
										<div style={{
											position: 'absolute',
											bottom: '25%',
											right: '25%',
											color: 'white',
											fontWeight: 'bold'
										}}>C</div>
										<div style={{
											position: 'absolute',
											bottom: '25%',
											left: '25%',
											color: 'black',
											fontWeight: 'bold'
										}}>D</div>
									</div>
									<div style={{ marginTop: '10px', fontSize: '0.9em' }}>With labels</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Color Accessibility Patterns</span>
					<span className='discovered-by'>Guardian Spectrum's teachings</span>
				</div>
				<pre>{`# Color Accessibility Best Practices
// Guardian Spectrum: "Color enhances, but never excludes!"

# Never Rely on Color Alone

## Form Validation
// Bad - Color only
<input 
  style=\\{\\{
    borderColor: hasError ? 'red' : 'green'
  \\}\\}
/>

// Good - Multiple indicators
<div className="field">
  <label htmlFor="email">
    Email
    \\{hasError && <span className="error-icon">❌</span>\\}
  </label>
  <input 
    id="email"
    aria-invalid=\\{hasError\\}
    aria-describedby=\\{hasError ? 'email-error' : undefined\\}
    style=\\{\\{
      borderColor: hasError ? '#DC143C' : '#ccc',
      borderWidth: hasError ? '2px' : '1px'
    \\}\\}
  />
  \\{hasError && (
    <span id="email-error" role="alert" className="error-message">
      Please enter a valid email address
    </span>
  )\\}
</div>

## Status Indicators
// Binary: "Multiple signals = 100% comprehension!"

// Bad - Color dots only
<span className=\\{status === 'online' ? 'green-dot' : 'red-dot'\\} />

// Good - Color + Icon + Text
function StatusIndicator(\\{ status \\}) {
  const statusConfig = {
    online: { color: '#32CD32', icon: '●', label: 'Online' },
    offline: { color: '#DC143C', icon: '○', label: 'Offline' },
    busy: { color: '#FFA500', icon: '◐', label: 'Busy' },
    away: { color: '#808080', icon: '◔', label: 'Away' }
  };
  
  const config = statusConfig[status];
  
  return (
    <span 
      className="status-indicator"
      style=\\{\\{ color: config.color \\}\\}
      aria-label=\\{config.label\\}
    >
      <span aria-hidden="true">\\{config.icon\\}</span>
      <span className="status-text">\\{config.label\\}</span>
    </span>
  );
}

# Accessible Color Palettes

## Color Blind Safe Palettes
// Avoid problematic combinations
const problematicPairs = [
  ['#FF0000', '#00FF00'], // Red-Green (most common issue)
  ['#FF7F00', '#008000'], // Orange-Green
  ['#8B4513', '#006400'], // Brown-Green
  ['#FF0000', '#8B4513'], // Red-Brown
];

// Use distinguishable colors
const accessiblePalette = [
  '#E69F00', // Orange
  '#56B4E9', // Sky Blue  
  '#009E73', // Bluish Green
  '#F0E442', // Yellow
  '#0072B2', // Blue
  '#D55E00', // Vermillion
  '#CC79A7', // Reddish Purple
  '#000000', // Black
];

// Tool: Check color combinations
function checkColorContrast(color1, color2) {
  // Implementation would calculate actual contrast
  // This is a simplified example
  const ratio = calculateContrastRatio(color1, color2);
  return {
    ratio,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7.0
  };
}

# Pattern and Texture Support

## CSS Patterns for Accessibility
// Add patterns to differentiate areas
.pattern-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.1) 10px,
    rgba(255, 255, 255, 0.1) 20px
  );
}

.pattern-dots {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
}

.pattern-crosshatch {
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.05) 10px,
      rgba(255, 255, 255, 0.05) 11px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.05) 10px,
      rgba(255, 255, 255, 0.05) 11px
    );
}

## Chart Accessibility
// Aria: "Every data point needs multiple ways to be understood!"

function AccessibleChart(\\{ data \\}) {
  return (
    <div className="chart-container">
      <svg viewBox="0 0 400 300" role="img" aria-label="Sales by region">
        \\{data.map((item, index) => (
          <g key=\\{item.label\\}>
            {/* Bar with color AND pattern */}
            <rect
              x=\\{index * 80 + 20\\}
              y=\\{300 - item.value\\}
              width="60"
              height=\\{item.value\\}
              fill=\\{item.color\\}
              className=\\{\\\`pattern-\\\${item.pattern}\\\`\\}
            />
            {/* Direct labeling */}
            <text
              x=\\{index * 80 + 50\\}
              y=\\{290 - item.value\\}
              textAnchor="middle"
              fill="white"
            >
              \\{item.value\\}%
            </text>
            {/* Legend with multiple indicators */}
            <text
              x=\\{index * 80 + 50\\}
              y="320"
              textAnchor="middle"
            >
              \\{item.label\\}
            </text>
          </g>
        ))\\}
      </svg>
      
      {/* Accessible data table alternative */}
      <details>
        <summary>View data as table</summary>
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Sales %</th>
            </tr>
          </thead>
          <tbody>
            \\{data.map(item => (
              <tr key=\\{item.label\\}>
                <td>\\{item.label\\}</td>
                <td>\\{item.value\\}%</td>
              </tr>
            ))\\}
          </tbody>
        </table>
      </details>
    </div>
  );
}

# Interactive States
// Debuggora: "Every state change needs multiple signals!"

## Buttons and Links
// Use multiple state indicators
.interactive-element {
  /* Default state */
  color: #0066cc;
  text-decoration: underline;
  border: 2px solid transparent;
  
  /* Hover - not just color */
  &:hover {
    color: #0052a3;
    background-color: rgba(0, 102, 204, 0.1);
    text-decoration: underline wavy;
  }
  
  /* Focus - high visibility */
  &:focus {
    outline: 3px solid #FFD700;
    outline-offset: 2px;
    text-decoration: underline;
  }
  
  /* Active */
  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  /* Visited - maintain underline */
  &:visited {
    color: #551a8b;
    text-decoration: underline;
  }
}

# Testing for Color Accessibility

## Automated Testing
// Use tools to catch issues
import { axe } from '@axe-core/react';

// Color contrast testing
const contrastErrors = await axe.run({
  rules: ['color-contrast']
});

## Manual Testing Checklist
1. Grayscale test - convert to B&W
2. Color blind simulators
3. Print in black and white
4. Ask: "If I remove all color, is it still usable?"

## Browser Tools
// Chrome DevTools
1. Rendering tab > Emulate vision deficiencies
2. CSS Overview > Contrast issues
3. Lighthouse > Accessibility audit

# Real World Examples

## Status Messages
<div role="status" aria-live="polite">
  <Icon name=\\{status.icon\\} aria-hidden="true" />
  <span>\\{status.message\\}</span>
  <span className="visually-hidden">\\{status.severity\\}</span>
</div>

## Progress Indicators
<div className="progress-bar">
  <div 
    className="progress-fill"
    style=\\{\\{ 
      width: \\\`\\\${progress}%\\\`,
      background: progressColor
    \\}\\}
  >
    <span className="progress-text">\\{progress\\}%</span>
  </div>
  <div className="progress-pattern" aria-hidden="true" />
</div>`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Color Lesson:</h3>
				<p>
					Guardian Spectrum teaches that color is a powerful enhancement, but never 
					essential information. Eight percent of men and many others experience color 
					differently than you might expect. By combining color with icons, patterns, 
					text, and other indicators, we ensure our interfaces communicate clearly to 
					everyone. Remember: if your interface only works in color, it doesn't work 
					for everyone.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does experiencing your interface through different color vision modes 
					change your perspective on design decisions?
				</p>
				<p>
					Why is redundancy in visual communication actually a strength rather than 
					unnecessary repetition?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;