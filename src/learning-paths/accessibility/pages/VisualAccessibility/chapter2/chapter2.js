import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [textColor, setTextColor] = useState('#333333');
	const [bgColor, setBgColor] = useState('#FFFFFF');
	const [fontSize, setFontSize] = useState('normal');
	const [fontWeight, setFontWeight] = useState('normal');
	const [contrastRatio, setContrastRatio] = useState(0);
	const [complianceLevel, setComplianceLevel] = useState({ AA: false, AAA: false });
	const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
	const [commonPairs, setCommonPairs] = useState([
		{ text: '#000000', bg: '#FFFFFF', name: 'Pure Black on White' },
		{ text: '#767676', bg: '#FFFFFF', name: 'WCAG AA Minimum' },
		{ text: '#595959', bg: '#FFFFFF', name: 'WCAG AAA Minimum' },
		{ text: '#FFFFFF', bg: '#0066CC', name: 'White on Blue' },
		{ text: '#333333', bg: '#F5F5F5', name: 'Dark Gray on Light' }
	]);
	
	const { 
		contrastLevel,
		setContrastLevel,
		calculateContrastRatio,
		checkContrastCompliance,
		darkModeSupport,
		setDarkModeSupport,
		highContrastMode,
		setHighContrastMode
	} = useOutletContext();

	// Calculate relative luminance
	const getLuminance = (hex) => {
		const rgb = parseInt(hex.slice(1), 16);
		const r = (rgb >> 16) & 0xff;
		const g = (rgb >> 8) & 0xff;
		const b = rgb & 0xff;
		
		const rsRGB = r / 255;
		const gsRGB = g / 255;
		const bsRGB = b / 255;
		
		const rL = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
		const gL = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
		const bL = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
		
		return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
	};

	// Calculate contrast ratio
	const calculateRatio = (color1, color2) => {
		const l1 = getLuminance(color1);
		const l2 = getLuminance(color2);
		const lighter = Math.max(l1, l2);
		const darker = Math.min(l1, l2);
		return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
	};

	// Update contrast when colors change
	useEffect(() => {
		const ratio = calculateRatio(textColor, bgColor);
		setContrastRatio(ratio);
		
		// Check compliance
		const isLargeText = fontSize === 'large' || fontWeight === 'bold';
		const aaThreshold = isLargeText ? 3.0 : 4.5;
		const aaaThreshold = isLargeText ? 4.5 : 7.0;
		
		setComplianceLevel({
			AA: parseFloat(ratio) >= aaThreshold,
			AAA: parseFloat(ratio) >= aaaThreshold
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textColor, bgColor, fontSize, fontWeight]);

	const textSizeExamples = [
		{ 
			size: 'small', 
			css: '14px', 
			requirement: '4.5:1 (AA) / 7:1 (AAA)',
			example: 'Small body text needs higher contrast'
		},
		{ 
			size: 'normal', 
			css: '16px', 
			requirement: '4.5:1 (AA) / 7:1 (AAA)',
			example: 'Standard paragraph text'
		},
		{ 
			size: 'large', 
			css: '18px', 
			requirement: '3:1 (AA) / 4.5:1 (AAA)',
			example: 'Large text (18px+ or 14px+ bold)'
		},
		{ 
			size: 'xlarge', 
			css: '24px', 
			requirement: '3:1 (AA) / 4.5:1 (AAA)',
			example: 'Headings and display text'
		}
	];

	const uiElementExamples = [
		{ 
			name: 'Form Inputs',
			requirement: '3:1',
			good: { border: '#767676', bg: '#FFFFFF' },
			bad: { border: '#CCCCCC', bg: '#FFFFFF' }
		},
		{ 
			name: 'Focus Indicators',
			requirement: '3:1',
			good: { outline: '#0066CC', bg: '#FFFFFF' },
			bad: { outline: '#ADD8E6', bg: '#FFFFFF' }
		},
		{ 
			name: 'Disabled States',
			requirement: 'No requirement',
			good: { text: '#767676', bg: '#E0E0E0' },
			bad: { text: '#CCCCCC', bg: '#F5F5F5' }
		}
	];

	const swapColors = () => {
		const temp = textColor;
		setTextColor(bgColor);
		setBgColor(temp);
	};

	const applyColorPair = (pair) => {
		setTextColor(pair.text);
		setBgColor(pair.bg);
	};

	return (
		<div className='chapter visual-accessibility'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Contrast Citadel`}
				bridge={`Guardian Spectrum led Aria from the Color Conservatory to a towering fortress of black and white marble. "Color alone is not enough," they explained. "Here in the Contrast Citadel, you will learn the mathematics of visibility itself."`}
			/>

			<StorySection
				paragraphs={[
					`At the Contrast Citadel, Aria learned about visual clarity. "4.5:1 for normal text, 3:1 for large text, 3:1 for UI elements," Guardian Spectrum recited.`,
					`Binary calculated contrasts instantly. "Many of our color combinations fail!"`,
					`"Pretty isn't always accessible. But accessible can be beautiful."`,
					`Debuggora analyzed the patterns. "Low contrast equals invisible content for many users. It's not just preference - it's perception!"`,
					`Guardian Spectrum demonstrated. "Contrast ensures readability across different vision abilities, devices, and environments. Bright sunlight, aging eyes, poor screens - contrast conquers all."`,
					`"Beauty and accessibility aren't opposites," the Guardian concluded. "They're partners in excellent design."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Contrast Checker Laboratory</h3>

				<InstructionBox character={`Guardian Spectrum activates the Contrast Calculator.`}>
					{`"Test your color combinations here. Remember: 4.5:1 for normal text, 3:1 for large text and UI elements."`}
				</InstructionBox>
				
				<div className='contrast-citadel'>
					<div className='contrast-checker'>
						<div className='color-picker-section'>
							<div className='color-input-group'>
								<label>Text Color</label>
								<div className='color-picker'>
									<input
										type="color"
										value={textColor}
										onChange={(e) => setTextColor(e.target.value)}
									/>
									<input
										type="text"
										value={textColor}
										onChange={(e) => setTextColor(e.target.value)}
										placeholder="#000000"
									/>
								</div>
							</div>
							
							<div className='color-input-group'>
								<label>Background Color</label>
								<div className='color-picker'>
									<input
										type="color"
										value={bgColor}
										onChange={(e) => setBgColor(e.target.value)}
									/>
									<input
										type="text"
										value={bgColor}
										onChange={(e) => setBgColor(e.target.value)}
										placeholder="#FFFFFF"
									/>
								</div>
							</div>
						</div>

						<button
							onClick={swapColors}
							style={{
								margin: '20px auto',
								display: 'block',
								padding: '10px 25px',
								background: 'rgba(123, 104, 238, 0.2)',
								border: '1px solid #7B68EE',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							⇄ Swap Colors
						</button>

						<div 
							className='contrast-preview'
							style={{
								backgroundColor: bgColor,
								color: textColor,
								border: '2px solid rgba(123, 104, 238, 0.3)'
							}}
						>
							<p style={{ margin: 0, fontSize: fontSize === 'large' ? '24px' : '16px' }}>
								{previewText}
							</p>
						</div>

						<div className='contrast-ratio-display'>
							<div>
								<div className='ratio-value'>{contrastRatio}:1</div>
								<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>Contrast Ratio</div>
							</div>
							
							<div className='compliance-badges'>
								<div className={`compliance-badge ${complianceLevel.AA ? 'pass' : 'fail'}`}>
									WCAG AA {complianceLevel.AA ? '✓' : '✗'}
								</div>
								<div className={`compliance-badge ${complianceLevel.AAA ? 'pass' : 'fail'}`}>
									WCAG AAA {complianceLevel.AAA ? '✓' : '✗'}
								</div>
							</div>
						</div>

						<div style={{
							marginTop: '20px',
							display: 'flex',
							gap: '10px',
							justifyContent: 'center'
						}}>
							<button
								onClick={() => setFontSize(fontSize === 'large' ? 'normal' : 'large')}
								style={{
									padding: '8px 20px',
									background: fontSize === 'large' ? '#7B68EE' : 'rgba(123, 104, 238, 0.2)',
									border: '1px solid #7B68EE',
									borderRadius: '15px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								{fontSize === 'large' ? 'Large Text' : 'Normal Text'}
							</button>
							<button
								onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
								style={{
									padding: '8px 20px',
									background: fontWeight === 'bold' ? '#7B68EE' : 'rgba(123, 104, 238, 0.2)',
									border: '1px solid #7B68EE',
									borderRadius: '15px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								{fontWeight === 'bold' ? 'Bold' : 'Regular'}
							</button>
						</div>
					</div>

					<h4 style={{ marginTop: '40px', marginBottom: '20px' }}>Common Color Combinations</h4>
					<div style={{ display: 'grid', gap: '10px' }}>
						{commonPairs.map((pair, index) => {
							const ratio = calculateRatio(pair.text, pair.bg);
							return (
								<div
									key={index}
									onClick={() => applyColorPair(pair)}
									style={{
										display: 'grid',
										gridTemplateColumns: '1fr auto auto',
										alignItems: 'center',
										padding: '15px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '8px',
										cursor: 'pointer',
										transition: 'all 0.3s ease'
									}}
								>
									<div>
										<div style={{ fontWeight: 'bold' }}>{pair.name}</div>
										<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
											{pair.text} on {pair.bg}
										</div>
									</div>
									<div style={{
										padding: '5px 15px',
										background: pair.bg,
										color: pair.text,
										borderRadius: '5px',
										marginRight: '15px'
									}}>
										Sample
									</div>
									<div style={{ 
										fontWeight: 'bold',
										color: parseFloat(ratio) >= 4.5 ? '#32CD32' : '#DC143C'
									}}>
										{ratio}:1
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Text Size Requirements</h3>
				
				<div className='text-size-examples'>
					{textSizeExamples.map((example) => (
						<div key={example.size} className={`text-example ${example.size}`}>
							<div style={{ 
								display: 'flex', 
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '10px'
							}}>
								<div>
									<strong>{example.css}</strong>
									<span style={{ marginLeft: '15px', color: '#bdc3c7' }}>
										{example.requirement}
									</span>
								</div>
							</div>
							<p style={{ 
								fontSize: example.css,
								margin: 0,
								fontWeight: example.size === 'normal' && fontWeight === 'bold' ? 'bold' : 'normal'
							}}>
								{example.example}
							</p>
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>UI Element Contrast</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					<p style={{ marginBottom: '20px' }}>
						Interactive elements need 3:1 contrast against adjacent colors:
					</p>
					
					<div style={{ display: 'grid', gap: '20px' }}>
						{uiElementExamples.map((example) => (
							<div key={example.name}>
								<h4 style={{ marginBottom: '15px' }}>{example.name}</h4>
								<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
									<div>
										<div style={{ marginBottom: '10px', color: '#DC143C' }}>
											❌ Poor Contrast
										</div>
										<div style={{
											padding: '15px',
											background: example.bad.bg,
											border: `2px solid ${example.bad.border || 'transparent'}`,
											borderRadius: '5px',
											color: example.bad.text || '#333'
										}}>
											{example.bad.outline && (
												<div style={{
													padding: '10px',
													outline: `3px solid ${example.bad.outline}`,
													outlineOffset: '2px'
												}}>
													Focus State
												</div>
											)}
											{!example.bad.outline && 'Sample Element'}
										</div>
									</div>
									
									<div>
										<div style={{ marginBottom: '10px', color: '#32CD32' }}>
											✓ Good Contrast
										</div>
										<div style={{
											padding: '15px',
											background: example.good.bg,
											border: `2px solid ${example.good.border || 'transparent'}`,
											borderRadius: '5px',
											color: example.good.text || '#333'
										}}>
											{example.good.outline && (
												<div style={{
													padding: '10px',
													outline: `3px solid ${example.good.outline}`,
													outlineOffset: '2px'
												}}>
													Focus State
												</div>
											)}
											{!example.good.outline && 'Sample Element'}
										</div>
									</div>
								</div>
								<div style={{ 
									marginTop: '10px', 
									fontSize: '0.9em', 
									color: '#bdc3c7' 
								}}>
									Requirement: {example.requirement}
								</div>
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Theme Support</h3>
				
				<div className='dark-mode-toggle'>
					<p style={{ marginBottom: '20px' }}>
						Supporting different color modes improves accessibility:
					</p>
					
					<div className='theme-switcher'>
						<div 
							className={`theme-option ${!darkModeSupport && !highContrastMode ? 'active' : ''}`}
							onClick={() => {
								setDarkModeSupport(false);
								setHighContrastMode(false);
							}}
						>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>☀️</div>
							<div>Light Mode</div>
						</div>
						
						<div 
							className={`theme-option ${darkModeSupport ? 'active' : ''}`}
							onClick={() => {
								setDarkModeSupport(true);
								setHighContrastMode(false);
							}}
						>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>🌙</div>
							<div>Dark Mode</div>
						</div>
						
						<div 
							className={`theme-option ${highContrastMode ? 'active' : ''}`}
							onClick={() => {
								setHighContrastMode(true);
								setDarkModeSupport(false);
							}}
						>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>⚡</div>
							<div>High Contrast</div>
						</div>
					</div>
					
					<div style={{
						marginTop: '20px',
						padding: '20px',
						background: darkModeSupport ? '#1a1a1a' : highContrastMode ? '#000' : '#fff',
						color: darkModeSupport ? '#e0e0e0' : highContrastMode ? '#fff' : '#333',
						borderRadius: '10px',
						border: highContrastMode ? '2px solid #fff' : '2px solid rgba(123, 104, 238, 0.3)'
					}}>
						<h5 style={{ marginBottom: '10px' }}>Theme Preview</h5>
						<p style={{ margin: '10px 0' }}>
							This is how your content appears in {
								highContrastMode ? 'high contrast' : 
								darkModeSupport ? 'dark' : 'light'
							} mode.
						</p>
						<button style={{
							padding: '8px 20px',
							background: highContrastMode ? '#fff' : darkModeSupport ? '#4A5568' : '#7B68EE',
							color: highContrastMode ? '#000' : '#fff',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}>
							Sample Button
						</button>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Contrast Best Practices`}
				discoveredBy={`Guardian Spectrum's formulas`}
				code={`# WCAG Contrast Requirements
// Guardian Spectrum: "Clarity is kindness to your users' eyes!"

# Understanding Contrast Ratios

## Calculating Contrast
// Binary: "Mathematics of visibility!"

function calculateContrastRatio(color1, color2) {
  // Get relative luminance
  function getLuminance(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    
    // Convert to sRGB
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 
        ? c / 12.92 
        : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    // Calculate relative luminance
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  // Contrast ratio formula
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

# WCAG Success Criteria

## Text Contrast (1.4.3 - Level AA)
// Normal text: 4.5:1 minimum
// Large text: 3:1 minimum

const textStyles = {
  // Normal text (< 18px or < 14px bold)
  body: {
    fontSize: '16px',
    color: '#595959', // 7:1 with white
    background: '#FFFFFF'
  },
  
  // Large text (≥ 18px or ≥ 14px bold)  
  heading: {
    fontSize: '24px',
    color: '#767676', // 4.5:1 with white
    background: '#FFFFFF'
  },
  
  // Bold text counts as large at 14px+
  boldText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#767676', // Only needs 3:1
    background: '#FFFFFF'
  }
};

## Enhanced Contrast (1.4.6 - Level AAA)
// Normal text: 7:1 minimum
// Large text: 4.5:1 minimum

const enhancedTextStyles = {
  body: {
    color: '#2B2B2B', // 15:1 with white
    background: '#FFFFFF'
  },
  
  heading: {
    fontSize: '24px',
    color: '#595959', // 7:1 with white
    background: '#FFFFFF'
  }
};

# Non-Text Contrast (1.4.11 - Level AA)
// UI components: 3:1 minimum
// Graphics: 3:1 minimum

## Form Controls
// Debuggora: "Invisible inputs = frustrated users!"

// Bad - Insufficient contrast
.input-bad {
  border: 1px solid #DEDEDE; // 1.5:1 - FAIL
  background: #FFFFFF;
}

// Good - Meets requirements
.input-good {
  border: 1px solid #767676; // 4.5:1 - PASS
  background: #FFFFFF;
}

// Focus states need contrast too!
.input-good:focus {
  outline: 3px solid #0066CC; // 3.5:1 - PASS
  outline-offset: 2px;
}

## Interactive Elements
function AccessibleButton({ variant, children }) {
  const styles = {
    primary: {
      background: '#0066CC', // 3.5:1 with white text
      color: '#FFFFFF',
      border: 'none'
    },
    secondary: {
      background: '#FFFFFF',
      color: '#0066CC', // 3.5:1 with white bg
      border: '2px solid #0066CC'
    },
    disabled: {
      background: '#E0E0E0',
      color: '#9E9E9E', // No requirement for disabled
      cursor: 'not-allowed'
    }
  };
  
  return (
    <button style={styles[variant]}>
      {children}
    </button>
  );
}

# Real-World Patterns

## Accessible Color Palettes
// Aria: "Test every combination!"

const palette = {
  // Primary colors
  primary: {
    50: '#E3F2FD',  // Use with primary.900
    100: '#BBDEFB', // Use with primary.900
    500: '#2196F3', // Use with white
    700: '#1976D2', // Use with white
    900: '#0D47A1'  // Use with white or primary.50
  },
  
  // Grays for text
  gray: {
    50: '#FAFAFA',  // Background only
    300: '#E0E0E0', // Borders with gray.700
    600: '#757575', // AA compliant on white
    700: '#616161', // AA compliant on white
    900: '#212121'  // AAA compliant on white
  }
};

## Dark Mode Considerations
// Different requirements for dark backgrounds

function useContrastPairs(isDarkMode) {
  return isDarkMode ? {
    // Dark mode pairs
    text: {
      primary: '#FFFFFF',   // 21:1 on black
      secondary: '#B0B0B0', // 5.3:1 on black
      disabled: '#616161'   // 2.7:1 (no requirement)
    },
    background: {
      primary: '#121212',
      surface: '#1E1E1E',
      elevated: '#2C2C2C'
    }
  } : {
    // Light mode pairs
    text: {
      primary: '#212121',   // 16:1 on white
      secondary: '#616161', // 5.9:1 on white
      disabled: '#9E9E9E'   // 2.7:1 (no requirement)
    },
    background: {
      primary: '#FFFFFF',
      surface: '#F5F5F5',
      elevated: '#FFFFFF'
    }
  };
}

# Testing Strategies

## Automated Testing
// Check contrast in CI/CD
import { test, expect } from '@testing-library/react';
import { toHaveAccessibleContrast } from 'jest-axe';

test('button has sufficient contrast', async () => {
  const { getByRole } = render(<Button>Click me</Button>);
  const button = getByRole('button');
  
  await expect(button).toHaveAccessibleContrast();
});

## Design Tokens for Contrast
// Enforce contrast through design system

const contrastTokens = {
  // Guaranteed AA compliant pairs
  text: {
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onSurface: '#212121',
    onError: '#FFFFFF'
  },
  
  // Surface colors
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    inverse: '#212121'
  }
};

## Browser DevTools Testing
// Chrome DevTools
1. Inspect element
2. Click color square in styles
3. View contrast ratio
4. See AA/AAA pass lines

// Firefox Accessibility Inspector
1. Right-click element
2. Inspect Accessibility Properties
3. Check contrast ratio

# Common Pitfalls

## Placeholder Text
// Bad - Insufficient contrast
<input placeholder="Enter email" />
// Default placeholder: #9E9E9E on white = 2.7:1 FAIL

// Good - Darker placeholder
input::placeholder {
  color: #616161; // 5.9:1 PASS
  opacity: 1; // Prevent browser dimming
}

## Links in Text
// Ensure links are distinguishable
p {
  color: #212121;
}

a {
  color: #0066CC; // 3.5:1 with white
  text-decoration: underline; // Non-color indicator
}

a:visited {
  color: #551A8B; // 5.5:1 with white
}

## State Changes
// Maintain contrast across all states
.button {
  background: #0066CC;
  color: white;
  
  &:hover {
    background: #0052A3; // Still 4.3:1
  }
  
  &:active {
    background: #003D7A; // Still 5.9:1
  }
  
  &:disabled {
    background: #CCCCCC;
    color: #666666; // No requirement
  }
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Contrast Lesson:`,
					content: `The Contrast Citadel teaches us that sufficient contrast isn't just about meeting standards - it's about ensuring your content is perceivable by everyone. From bright sunlight to aging eyes, from cheap monitors to high-end displays, good contrast ensures your message gets through. Remember: 4.5:1 for normal text, 3:1 for large text and UI elements. When in doubt, test with real tools and real users. Beautiful design and accessible contrast are not mutually exclusive - they enhance each other.`
				}}
				reflectionQuestions={[
					`How does understanding the mathematics behind contrast ratios change your approach to choosing colors?`,
					`Why might someone need higher contrast than the minimum standards, and how can we design for these users without compromising aesthetics?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 42 (Afternoon)`,
					content: `The Contrast Citadel is a fortress of mathematics and visibility! Guardian Spectrum taught me the sacred ratios: 4.5:1 for normal text, 3:1 for large text and UI components. Binary calculated our color combinations instantly - many of them failed! The Guardian's words struck deep: "Pretty isn't always accessible. But accessible can be beautiful." I experimented with the Contrast Checker Laboratory, testing text colors against backgrounds. Dark mode, light mode, high contrast mode - each serves users differently. Contrast conquers all obstacles: bright sunlight, aging eyes, poor screens.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;