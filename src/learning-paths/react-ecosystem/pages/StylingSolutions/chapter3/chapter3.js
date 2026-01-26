import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		visitedWorkshops,
		implementedStyles,
		performanceMetrics,
		harmonyLevel,
		symposiumStage,
		evolve
	} = useOutletContext();

	const [selectedScenario, setSelectedScenario] = useState(null);
	const [harmonyAchieved, setHarmonyAchieved] = useState(false);

	// Project scenarios for styling decisions
	const projectScenarios = [
		{
			id: 'startup',
			name: 'Rapid Startup MVP',
			icon: '🚀',
			requirements: ['Fast development', 'Consistent design', 'Easy onboarding'],
			recommendation: 'Tailwind CSS',
			reasoning: 'Utility classes enable rapid prototyping with consistent design tokens'
		},
		{
			id: 'enterprise',
			name: 'Enterprise Application',
			icon: '🏢',
			requirements: ['Type safety', 'Maintainability', 'Team scalability'],
			recommendation: 'CSS Modules + TypeScript',
			reasoning: 'Separation of concerns with type safety for large teams'
		},
		{
			id: 'component-library',
			name: 'Component Library',
			icon: '📚',
			requirements: ['Theming', 'Isolation', 'Distribution'],
			recommendation: 'Styled Components / Emotion',
			reasoning: 'Component-scoped styles with powerful theming capabilities'
		},
		{
			id: 'marketing',
			name: 'Marketing Website',
			icon: '🎯',
			requirements: ['Performance', 'SEO', 'Visual polish'],
			recommendation: 'Vanilla Extract / CSS Modules',
			reasoning: 'Zero runtime cost with full CSS capabilities'
		},
		{
			id: 'dashboard',
			name: 'Data Dashboard',
			icon: '📊',
			requirements: ['Dynamic styles', 'Data visualization', 'Responsive'],
			recommendation: 'CSS-in-JS (Emotion)',
			reasoning: 'Dynamic styling based on data with good performance'
		}
	];

	// Styling decision matrix
	const decisionFactors = [
		{
			factor: 'Bundle Size',
			importance: 'High for public sites',
			winners: ['CSS Modules', 'Vanilla Extract', 'Tailwind (purged)']
		},
		{
			factor: 'Runtime Performance',
			importance: 'Critical for complex UIs',
			winners: ['CSS Modules', 'Vanilla Extract', 'Traditional CSS']
		},
		{
			factor: 'Developer Experience',
			importance: 'Key for productivity',
			winners: ['Styled Components', 'Tailwind', 'Emotion']
		},
		{
			factor: 'Type Safety',
			importance: 'Important for large teams',
			winners: ['Vanilla Extract', 'CSS Modules + TS', 'Styled Components']
		},
		{
			factor: 'Dynamic Styling',
			importance: 'Needed for theming',
			winners: ['Styled Components', 'Emotion', 'CSS Variables']
		}
	];

	// Calculate harmony
	const checkHarmony = () => {
		if (visitedWorkshops.length >= 4 && implementedStyles.length >= 3) {
			setHarmonyAchieved(true);
			evolve('harmonious');
		}
	};

	// Select a project scenario
	const selectScenario = (scenario) => {
		setSelectedScenario(scenario);
		checkHarmony();
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Styled Harmony`}
				bridge={`After experiencing each styling approach firsthand, Aria gathered the representatives. "Each approach has its merits," she observed. Moderator Stylus smiled. "You're beginning to see the truth. Let's find harmony - not by declaring a winner, but by understanding when each approach shines."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Moderator Stylus</strong> concluded: "Aria has shown us that 
					each approach serves different needs. The key is choosing based on 
					your project's requirements, not dogma."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> summarized: "Component libraries might prefer 
					styled-components. Rapid prototypes love Tailwind. Large teams might 
					choose CSS Modules. There's no single answer."
				</p>

				<p className='story-paragraph'>
					The representatives, once argumentative, began to nod in understanding. 
					<strong>CSS-in-JS Champion</strong> admitted, "For a marketing site, 
					I'd actually recommend CSS Modules for performance."
				</p>

				<p className='story-paragraph'>
					<strong>Utility-First Advocate</strong> agreed, "And I'd use Styled 
					Components for a complex component library needing theming."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> calculated happily. "Harmony through understanding! 
					Each tool has its optimal use case."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Finding Your Styling Solution</h3>
				
				<InstructionBox character={`Moderator Stylus presents the Harmony Chamber.`}>
					Match project requirements to styling solutions. Build a Harmony Matrix 
					to find the right approach for your specific needs!
				</InstructionBox>
				
				<div className='approach-comparison'>
					<h4>Project Scenario Analyzer</h4>
					<div className='styling-workshops'>
						{projectScenarios.map(scenario => (
							<div
								key={scenario.id}
								className={`workshop-card ${
									selectedScenario?.id === scenario.id ? 'visited' : ''
								}`}
								onClick={() => selectScenario(scenario)}
								style={{ cursor: 'pointer' }}>
								<div className='workshop-header'>
									<span className='workshop-icon'>{scenario.icon}</span>
									<div className='workshop-title'>{scenario.name}</div>
								</div>
								<div className='workshop-description'>
									<strong>Requirements:</strong>
									<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
										{scenario.requirements.map((req, i) => (
											<li key={i}>{req}</li>
										))}
									</ul>
								</div>
								{selectedScenario?.id === scenario.id && (
									<div style={{
										marginTop: '15px',
										padding: '15px',
										background: '#3498db',
										color: 'white',
										borderRadius: '5px'
									}}>
										<strong>Recommendation:</strong> {scenario.recommendation}
										<p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
											{scenario.reasoning}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='decision-matrix' style={{ marginTop: '30px' }}>
					<h4>Styling Decision Matrix</h4>
					<table className='comparison-table'>
						<thead>
							<tr>
								<th>Factor</th>
								<th>When It Matters</th>
								<th>Best Solutions</th>
							</tr>
						</thead>
						<tbody>
							{decisionFactors.map((item, index) => (
								<tr key={index}>
									<td><strong>{item.factor}</strong></td>
									<td>{item.importance}</td>
									<td>{item.winners.join(', ')}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='harmony-meter'>
					<h4>Styling Harmony Level</h4>
					<p>Understanding across all approaches</p>
					<div className='harmony-bar'>
						<div 
							className='harmony-fill'
							style={{ width: `${harmonyLevel}%` }}>
							{harmonyLevel}%
						</div>
					</div>
					<p style={{ marginTop: '10px' }}>
						Workshops visited: {visitedWorkshops.length}/5 | 
						Implementations: {implementedStyles.length}
					</p>
				</div>

				{harmonyAchieved && (
					<div className='achievement-banner'>
						<h4>🎨 Styling Harmony Achievement!</h4>
						<p>You've transcended the styling wars! You understand that each 
						approach has its place, and the key is matching the solution to 
						the problem.</p>
					</div>
				)}

				<div className='style-battle'>
					<h4>The Great Reconciliation</h4>
					<div className='battle-grid'>
						<div className='battle-contestant'>
							<h5>Team CSS-in-JS</h5>
							<p>"We excel at component isolation and dynamic theming!"</p>
						</div>
						<div className='vs-divider'>🤝</div>
						<div className='battle-contestant'>
							<h5>Team Utility-First</h5>
							<p>"We enable rapid development with consistent design!"</p>
						</div>
					</div>
					<p style={{ textAlign: 'center', marginTop: '20px', color: '#ecf0f1' }}>
						"Why fight when we can coexist? Use the right tool for the job!"
					</p>
				</div>
			</div>

			<CodeExample
				title={`Choosing Your Styling Strategy`}
				discoveredBy={`Harmony Wisdom`}
				code={`// Styling Strategy Decision Guide

// 1. Project Type Analysis
const stylingDecisionTree = {
  // Static Marketing Site
  marketingSite: {
    requirements: ['SEO', 'Performance', 'Quick loading'],
    avoid: ['Large CSS-in-JS libraries'],
    consider: {
      primary: 'CSS Modules',
      alternative: 'Vanilla Extract',
      ifNeeded: 'Tailwind (with PurgeCSS)'
    }
  },
  
  // Complex Web Application
  webApp: {
    requirements: ['Maintainable', 'Themeable', 'Component-based'],
    avoid: ['Global CSS'],
    consider: {
      primary: 'Styled Components / Emotion',
      alternative: 'CSS Modules + CSS Variables',
      ifNeeded: 'Tailwind + Component Classes'
    }
  },
  
  // Component Library
  componentLibrary: {
    requirements: ['Isolation', 'Theming', 'Distribution'],
    avoid: ['Build-time only solutions'],
    consider: {
      primary: 'Styled Components',
      alternative: 'Emotion',
      ifNeeded: 'CSS-in-JS with zero-runtime fallback'
    }
  },
  
  // Rapid Prototype
  prototype: {
    requirements: ['Speed', 'Iteration', 'Consistency'],
    avoid: ['Complex setup'],
    consider: {
      primary: 'Tailwind CSS',
      alternative: 'CSS Framework (Bootstrap, etc)',
      ifNeeded: 'Inline styles (temporary)'
    }
  }
};

// 2. Migration Strategies
// From CSS to CSS Modules
// Step 1: Move global styles to modules
// Step 2: Update imports
// Step 3: Handle composition

// From CSS Modules to CSS-in-JS
const migrateToStyledComponents = \`
  // Before (CSS Module)
  import styles from './Button.module.css';
  <button className={styles.button}>Click</button>
  
  // After (Styled Components)
  const Button = styled.button\\\`...styles...\\\`;
  <Button>Click</Button>
\`;

// From CSS-in-JS to Tailwind
const migrateToTailwind = \`
  // Before (Styled Components)
  const Button = styled.button\\\`
    background: blue;
    color: white;
    padding: 10px 20px;
  \\\`;
  
  // After (Tailwind)
  <button className="bg-blue-500 text-white px-5 py-2.5">
\`;

// 3. Performance Optimization by Approach

// CSS Modules - Optimization
{
  test: /\\.module\\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[hash:base64:5]' // Shorter classes
        }
      }
    },
    'postcss-loader' // For optimizations
  ]
}

// Styled Components - Optimization
import { ServerStyleSheet } from 'styled-components';

// SSR critical CSS extraction
const sheet = new ServerStyleSheet();
const html = renderToString(
  sheet.collectStyles(<App />)
);
const styleTags = sheet.getStyleTags();

// Tailwind - Optimization
// tailwind.config.js
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    options: {
      safelist: [
        /^bg-/,  // Keep dynamic classes
        /^text-/,
      ]
    }
  }
};

// 4. Team Considerations

// Large Team Setup
const largeTeamStyling = {
  approach: 'CSS Modules + Style Guide',
  benefits: [
    'Clear separation of concerns',
    'Easy onboarding',
    'Predictable styles',
    'Git-friendly'
  ],
  tooling: [
    'Stylelint for consistency',
    'PostCSS for features',
    'Design tokens for theming'
  ]
};

// Small Team / Startup
const startupStyling = {
  approach: 'Tailwind CSS',
  benefits: [
    'Rapid development',
    'Consistent by default',
    'No naming debates',
    'Small production CSS'
  ],
  tooling: [
    'Tailwind UI for components',
    'HeadlessUI for behavior',
    'Tailwind CSS IntelliSense'
  ]
};

// 5. Hybrid Approaches

// CSS Modules + Tailwind
<div className={cn(styles.card, 'hover:shadow-lg transition-shadow')}>
  Combining local styles with utility classes
</div>

// Styled Components + Tailwind
const Card = styled.div.attrs({
  className: 'hover:shadow-lg transition-shadow'
})\`
  background: white;
  border-radius: 8px;
  padding: 20px;
\`;

// 6. Future-Proofing Your Choice

const futureConsiderations = {
  cssInJs: {
    trend: 'Moving toward zero-runtime',
    prepare: 'Use CSS variables for theming'
  },
  utilityFirst: {
    trend: 'Growing adoption',
    prepare: 'Learn composition patterns'
  },
  cssModules: {
    trend: 'Stable and mature',
    prepare: 'Adopt CSS custom properties'
  },
  vanilla: {
    trend: 'Container queries, cascade layers',
    prepare: 'Stay updated with CSS specs'
  }
};`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Harmony Insight:`,
					content: `The great styling debate resolves not through victory, but through understanding. Each approach represents different priorities: developer experience, performance, maintainability, or rapid development. The key is context-aware decision making - a startup needs different tools than an enterprise maintaining a five-year-old application.`
				}}
				reflectionQuestions={[
					`How do project requirements drive styling decisions?`,
					`What's more important: consistency or optimization?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 39 (Evening)`,
					content: `The Style Symposium found harmony! Not by declaring a winner, but by understanding when each approach shines. Decision matrix: For component libraries = CSS-in-JS. For rapid prototyping = Tailwind. For large teams = CSS Modules. For performance-critical = Zero-runtime. Hybrid approaches work too - CSS Modules + Tailwind utilities! Harmony Level: ${harmonyLevel}%. Future trends: CSS-in-JS moving toward zero-runtime, Tailwind growing, CSS Modules stable, and vanilla CSS gaining container queries! Moderator Stylus's wisdom: "Choose based on your project's needs, team's strengths, and performance requirements."`
				}}
				chapterEnding={[
					`The Style Symposium ended not with winners and losers, but with mutual respect. Moderator Stylus smiled at the transformation.`,
					`"You see? When we stop defending our territories and start understanding use cases, we all win. Ambassador Aria, you've brought wisdom to our passionate community."`,
					`Aria reflected on her journey. "Every styling solution tells a story of problems it was designed to solve. Understanding those stories is the key to making wise choices."`,
					`Binary compiled the final analysis. "Next stop: the Motion Monastery! Time to learn animation libraries..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;