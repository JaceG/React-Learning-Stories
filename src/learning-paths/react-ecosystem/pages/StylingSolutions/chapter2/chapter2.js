import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		visitedWorkshops,
		visitWorkshop,
		currentApproach,
		implementedStyles,
		implementStyle,
		performanceMetrics,
		evolve
	} = useOutletContext();

	const [activeDemo, setActiveDemo] = useState('styled-components');
	const [comparisonMode, setComparisonMode] = useState('code');
	const [themeColor, setThemeColor] = useState('#3498db');

	// Styling workshops with detailed examples
	const stylingWorkshops = [
		{
			id: 'styled-components',
			name: 'Styled Components Atelier',
			icon: '🎨',
			color: '#db7093',
			description: 'Component-centric styling with tagged templates',
			features: ['Automatic critical CSS', 'Dynamic props', 'Theming', 'SSR support'],
			example: 'const Button = styled.button`...`'
		},
		{
			id: 'tailwind',
			name: 'Tailwind Factory',
			icon: '🏭',
			color: '#38bdf8',
			description: 'Utility-first CSS framework',
			features: ['Rapid prototyping', 'Consistent design', 'PurgeCSS', 'JIT mode'],
			example: 'className="bg-blue-500 hover:bg-blue-600"'
		},
		{
			id: 'css-modules',
			name: 'CSS Modules Academy',
			icon: '🎓',
			color: '#ff6347',
			description: 'Traditional CSS with local scope',
			features: ['Local scope', 'CSS features', 'PostCSS', 'Composition'],
			example: 'import styles from "./Button.module.css"'
		},
		{
			id: 'emotion',
			name: 'Emotion Laboratory',
			icon: '🧪',
			color: '#c678dd',
			description: 'Performant and flexible CSS-in-JS',
			features: ['Small bundle', 'css prop', 'SSR', 'Source maps'],
			example: 'css={css`color: hotpink;`}'
		},
		{
			id: 'vanilla-extract',
			name: 'Zero-Runtime Workshop',
			icon: '⚡',
			color: '#facc15',
			description: 'Type-safe styles at build time',
			features: ['Zero runtime', 'TypeScript', 'Variants API', 'Sprinkles'],
			example: 'const button = style({...})'
		}
	];

	// Visit a workshop
	const exploreWorkshop = (workshop) => {
		visitWorkshop(workshop.id);
		setActiveDemo(workshop.id);
		implementStyle(workshop.id, workshop.example);
		if (visitedWorkshops.length >= 3) {
			evolve('experienced');
		}
	};

	// Demo components for each approach
	const StyleDemos = {
		'styled-components': {
			code: `import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? props.theme.primary : '#95a5a6'};
  color: white;
  font-size: 1em;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
\`;

const Container = styled.div\`
  display: flex;
  gap: 10px;
  padding: 20px;
  background: \${props => props.theme.background};
\`;

// Usage with theme
<ThemeProvider theme={{ primary: '${themeColor}', background: '#f0f0f0' }}>
  <Container>
    <Button primary>Primary</Button>
    <Button>Default</Button>
  </Container>
</ThemeProvider>`,
			demo: (
				<div style={{ display: 'flex', gap: '10px', padding: '20px', background: '#f0f0f0' }}>
					<button style={{
						background: themeColor,
						color: 'white',
						fontSize: '1em',
						padding: '0.75em 1.5em',
						border: 'none',
						borderRadius: '5px',
						cursor: 'pointer'
					}}>Primary</button>
					<button style={{
						background: '#95a5a6',
						color: 'white',
						fontSize: '1em',
						padding: '0.75em 1.5em',
						border: 'none',
						borderRadius: '5px',
						cursor: 'pointer'
					}}>Default</button>
				</div>
			)
		},
		'tailwind': {
			code: `// Tailwind CSS Utility Classes
<div className="flex gap-2.5 p-5 bg-gray-100">
  <button className="
    bg-blue-500 hover:bg-blue-600 
    text-white font-medium 
    py-3 px-6 
    rounded 
    transition-all duration-300 
    hover:-translate-y-0.5 
    hover:shadow-lg
    disabled:opacity-60 
    disabled:cursor-not-allowed
  ">
    Primary
  </button>
  
  <button className="
    bg-gray-500 hover:bg-gray-600 
    text-white font-medium 
    py-3 px-6 
    rounded 
    transition-all duration-300
  ">
    Default
  </button>
</div>

// With custom utilities
@layer components {
  .btn {
    @apply py-3 px-6 rounded font-medium transition-all duration-300;
  }
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white;
  }
}`,
			demo: (
				<div className="flex gap-2.5 p-5 bg-gray-100" style={{ display: 'flex', gap: '10px', padding: '20px', background: '#f3f4f6' }}>
					<button style={{
						background: '#3b82f6',
						color: 'white',
						fontWeight: '500',
						padding: '12px 24px',
						borderRadius: '4px',
						border: 'none',
						cursor: 'pointer'
					}}>Primary</button>
					<button style={{
						background: '#6b7280',
						color: 'white',
						fontWeight: '500',
						padding: '12px 24px',
						borderRadius: '4px',
						border: 'none',
						cursor: 'pointer'
					}}>Default</button>
				</div>
			)
		},
		'emotion': {
			code: `import { css } from '@emotion/react';

const buttonStyle = (primary, theme) => css\`
  background: \${primary ? theme.colors.primary : '#95a5a6'};
  color: white;
  font-size: 1em;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
\`;

// Object styles
const containerStyle = {
  display: 'flex',
  gap: 10,
  padding: 20,
  background: '#f0f0f0'
};

// Usage
<div css={containerStyle}>
  <button css={buttonStyle(true, theme)}>Primary</button>
  <button css={buttonStyle(false, theme)}>Default</button>
</div>`,
			demo: (
				<div style={{ display: 'flex', gap: '10px', padding: '20px', background: '#f0f0f0' }}>
					<button style={{
						background: themeColor,
						color: 'white',
						fontSize: '1em',
						padding: '0.75em 1.5em',
						border: 'none',
						borderRadius: '5px',
						cursor: 'pointer'
					}}>Primary</button>
					<button style={{
						background: '#95a5a6',
						color: 'white',
						fontSize: '1em',
						padding: '0.75em 1.5em',
						border: 'none',
						borderRadius: '5px',
						cursor: 'pointer'
					}}>Default</button>
				</div>
			)
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Styling Workshops
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> visited each styling workshop:
				</p>

				<p className='story-paragraph'>
					At the <strong>Styled Components Atelier</strong>, she learned 
					component-centric styling: "Your Button component IS the style," 
					the artist explained.
				</p>

				<p className='story-paragraph'>
					The <strong>Tailwind Factory</strong> showed composition: "Why write 
					custom CSS? Compose utilities!"
				</p>

				<p className='story-paragraph'>
					The <strong>CSS Modules Academy</strong> emphasized tradition with 
					safety: "Keep CSS separate but scoped."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed each approach. "Different philosophies, 
					different trade-offs. Performance, developer experience, maintainability 
					- each optimizes differently."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Styling Workshop Tour</h3>
				
				<div className='styling-workshops'>
					{stylingWorkshops.map(workshop => (
						<div
							key={workshop.id}
							className={`workshop-card ${
								visitedWorkshops.includes(workshop.id) ? 'visited' : ''
							}`}
							onClick={() => exploreWorkshop(workshop)}
							style={{ '--workshop-color': workshop.color }}>
							<div className='workshop-header'>
								<span className='workshop-icon'>{workshop.icon}</span>
								<div className='workshop-title'>{workshop.name}</div>
							</div>
							<div className='workshop-description'>{workshop.description}</div>
							<div className='workshop-features'>
								{workshop.features.map((feature, i) => (
									<span key={i} className='feature-tag'>{feature}</span>
								))}
							</div>
							{currentApproach === workshop.id && (
								<div style={{
									marginTop: '15px',
									padding: '10px',
									background: workshop.color,
									color: 'white',
									borderRadius: '5px',
									textAlign: 'center'
								}}>
									Currently Exploring
								</div>
							)}
						</div>
					))}
				</div>

				<div className='code-comparison'>
					<h4>Workshop Demonstrations</h4>
					<div className='comparison-tabs'>
						<button
							className={`comparison-tab ${comparisonMode === 'code' ? 'active' : ''}`}
							onClick={() => setComparisonMode('code')}>
							Code Examples
						</button>
						<button
							className={`comparison-tab ${comparisonMode === 'demo' ? 'active' : ''}`}
							onClick={() => setComparisonMode('demo')}>
							Live Demo
						</button>
						<button
							className={`comparison-tab ${comparisonMode === 'metrics' ? 'active' : ''}`}
							onClick={() => setComparisonMode('metrics')}>
							Performance
						</button>
					</div>

					{comparisonMode === 'code' && StyleDemos[activeDemo] && (
						<div className='code-example' style={{ marginTop: '20px' }}>
							<pre>{StyleDemos[activeDemo].code}</pre>
						</div>
					)}

					{comparisonMode === 'demo' && StyleDemos[activeDemo] && (
						<div style={{ marginTop: '20px' }}>
							<div style={{ marginBottom: '10px' }}>
								<label>Theme Color: </label>
								<input
									type="color"
									value={themeColor}
									onChange={(e) => setThemeColor(e.target.value)}
									style={{ marginLeft: '10px' }}
								/>
							</div>
							{StyleDemos[activeDemo].demo}
						</div>
					)}

					{comparisonMode === 'metrics' && (
						<div className='performance-metrics'>
							<h5>Performance Comparison</h5>
							<div className='metrics-grid'>
								{Object.entries(performanceMetrics).map(([approach, metrics]) => (
									<div key={approach} className='metric-card'>
										<div className='metric-label'>{approach.toUpperCase()}</div>
										<div className='metric-value'>
											{metrics.bundleSize?.toFixed(1)}kb
										</div>
										<div className='metric-bar'>
											<div 
												className='metric-fill'
												style={{ width: `${(50 - metrics.bundleSize) * 2}%` }}
											/>
										</div>
										<div style={{ fontSize: '0.8em', marginTop: '5px' }}>
											Runtime: {metrics.runtime?.toFixed(1)}ms
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div className='implementation-showcase'>
					<h4>Your Styling Journey</h4>
					<div className='implementations-timeline'>
						{implementedStyles.map((impl, index) => (
							<div key={impl.id} className='implementation-entry'>
								<strong>{impl.approach}</strong>
								<div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
									{impl.example}
								</div>
							</div>
						))}
						{implementedStyles.length === 0 && (
							<p style={{ color: '#7f8c8d' }}>
								Visit workshops to see your implementations here
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Advanced Styling Patterns</span>
				</div>
				<div className='code-example'>
					<pre>{`// Advanced Styling Implementation Examples

// 1. Styled Components - Advanced Patterns
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Global styles
const GlobalStyle = createGlobalStyle\`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: \${props => props.theme.background};
    color: \${props => props.theme.text};
  }
\`;

// Theme definition
const theme = {
  light: {
    background: '#ffffff',
    text: '#333333',
    primary: '#3498db',
    secondary: '#2ecc71'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#2980b9',
    secondary: '#27ae60'
  }
};

// Component with variants
const Button = styled.button\`
  \${({ theme, variant, size }) => css\`
    background: \${theme[variant] || theme.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: \${size === 'large' ? '1.2em' : '1em'};
    padding: \${size === 'large' ? '12px 24px' : '8px 16px'};
    
    &:hover {
      filter: brightness(0.9);
    }
  \`}
\`;

// 2. Tailwind - Component Patterns
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3498db',
          DEFAULT: '#2980b9',
          dark: '#21618c'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    }
  }
};

// Component with Tailwind
function Card({ children, elevated }) {
  return (
    <div className={\`
      bg-white rounded-lg p-6
      \${elevated ? 'shadow-lg' : 'shadow'}
      hover:shadow-xl transition-shadow duration-300
      dark:bg-gray-800 dark:text-white
    \`}>
      {children}
    </div>
  );
}

// 3. CSS Modules - Advanced Usage
// Button.module.css
.button {
  composes: reset from './reset.module.css';
  background: var(--color-primary);
  color: white;
  padding: 0.75em 1.5em;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.primary {
  composes: button;
  background: var(--color-primary);
}

.secondary {
  composes: button;
  background: var(--color-secondary);
}

// Button.js
import styles from './Button.module.css';
import cn from 'classnames';

function Button({ variant = 'primary', className, ...props }) {
  return (
    <button 
      className={cn(styles[variant], className)} 
      {...props} 
    />
  );
}

// 4. Emotion - Advanced Features
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Keyframe animations
const bounce = keyframes\`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
\`;

// Dynamic styles with props
const dynamicStyle = props => css\`
  color: \${props.color};
  font-size: \${props.fontSize}px;
  animation: \${props.animate ? bounce : 'none'} 1s ease infinite;
\`;

// Composition
const baseButton = css\`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
\`;

const primaryButton = css\`
  \${baseButton}
  background: #3498db;
  color: white;
\`;

// 5. Zero-Runtime CSS (Vanilla Extract)
// styles.css.ts
import { style, styleVariants, createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: '#3498db',
    text: '#333333',
    background: '#ffffff'
  },
  space: {
    small: '4px',
    medium: '8px',
    large: '16px'
  }
});

export const button = style({
  padding: vars.space.medium,
  background: vars.color.brand,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  ':hover': {
    transform: 'translateY(-2px)'
  }
});

export const buttonVariants = styleVariants({
  primary: [button, { background: vars.color.brand }],
  secondary: [button, { background: '#95a5a6' }]
});

// Performance Optimization Tips

// 1. Critical CSS extraction
// 2. CSS-in-JS code splitting
// 3. PurgeCSS for Tailwind
// 4. CSS Module tree shaking
// 5. Runtime vs build-time trade-offs`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Workshop Wisdom:</strong> "Each styling solution has matured to 
					handle complex scenarios. Styled Components excels at component-based 
					theming. Tailwind shines in rapid prototyping. CSS Modules maintains 
					familiarity with safety. Emotion balances features and performance. 
					Zero-runtime solutions optimize for production. Master one deeply, but 
					understand all."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Workshop Insight:</h3>
				<p>
					Each styling workshop revealed different strengths. Styled Components 
					brings styling into the component world. Tailwind accelerates development 
					through utility composition. CSS Modules preserves traditional workflows 
					with modern safety. The key is understanding which approach aligns with 
					your project's goals.
				</p>
				<p>
					Performance varies significantly between approaches. CSS-in-JS solutions 
					add runtime overhead but provide dynamic capabilities. Utility-first CSS 
					creates small production bundles but larger development builds. Zero-runtime 
					solutions optimize performance but limit dynamic styling.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Styling Practice</h3>
				<p>
					<strong>How does your styling choice affect your development workflow?</strong> 
					Consider how each approach changes the way you think about and write styles.
				</p>
				<p>
					<strong>What role does performance play in your styling decisions?</strong> 
					Think about the trade-offs between developer experience and runtime performance.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					After visiting all the workshops, <strong>Aria</strong> gathered her 
					findings. Each approach had passionate advocates and valid use cases.
				</p>
				<p>
					<strong>Binary</strong> computed the data. "No clear winner, but clear 
					trade-offs. Developer experience versus bundle size. Dynamic capabilities 
					versus runtime cost."
				</p>
				<p>
					<strong>Debuggora</strong> observed, "The best developers understand 
					multiple approaches and choose based on context, not dogma."
				</p>
				<p>
					"Time to report back to the symposium," Aria decided. "Let's see if we 
					can bring harmony to this passionate debate..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;