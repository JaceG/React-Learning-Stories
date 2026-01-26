import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		visitedWorkshops,
		visitWorkshop,
		currentApproach,
		styleDebate,
		setDebateStance,
		evolve
	} = useOutletContext();

	const [selectedRepresentative, setSelectedRepresentative] = useState(null);
	const [debateIntensity, setDebateIntensity] = useState(0);

	// Style representatives at the symposium
	const styleRepresentatives = [
		{
			id: 'css-in-js',
			name: 'CSS-in-JS Champion',
			icon: '💅',
			philosophy: 'Styles belong with components!',
			argument: 'Component-scoped styles with JavaScript power',
			color: '#e056fd'
		},
		{
			id: 'css-modules',
			name: 'CSS Modules Defender',
			icon: '📦',
			philosophy: 'Separation of concerns!',
			argument: 'Traditional CSS with local scope',
			color: '#0984e3'
		},
		{
			id: 'utility-first',
			name: 'Utility-First Advocate',
			icon: '🎨',
			philosophy: 'Composition over custom styles!',
			argument: 'Build designs with utility classes',
			color: '#00b894'
		},
		{
			id: 'styled-components',
			name: 'Styled Components Artist',
			icon: '🎭',
			philosophy: 'Components should be stylish by default!',
			argument: 'Tagged template literals for the win',
			color: '#fdcb6e'
		},
		{
			id: 'vanilla-css',
			name: 'Traditional CSS Guardian',
			icon: '📜',
			philosophy: 'Keep it simple and standard!',
			argument: 'Pure CSS with modern features',
			color: '#6c5ce7'
		}
	];

	// Styling approaches overview
	const stylingApproaches = [
		{
			name: 'Traditional CSS',
			pros: ['Standard', 'No build step', 'Cached separately'],
			cons: ['Global scope', 'Naming conflicts', 'Dead code'],
			useCase: 'Simple projects, static sites'
		},
		{
			name: 'CSS Modules',
			pros: ['Local scope', 'Traditional syntax', 'CSS features'],
			cons: ['Build step required', 'Class composition complexity'],
			useCase: 'Medium to large apps wanting CSS separation'
		},
		{
			name: 'CSS-in-JS',
			pros: ['Dynamic styles', 'Component scope', 'JavaScript power'],
			cons: ['Runtime cost', 'Learning curve', 'Bundle size'],
			useCase: 'Component libraries, dynamic theming'
		},
		{
			name: 'Utility-First (Tailwind)',
			pros: ['Rapid development', 'Consistent design', 'Small CSS'],
			cons: ['Verbose HTML', 'Learning curve', 'Customization limits'],
			useCase: 'Rapid prototyping, design systems'
		},
		{
			name: 'Zero-Runtime',
			pros: ['No runtime cost', 'Type safety', 'Build-time optimization'],
			cons: ['Limited dynamism', 'Build complexity'],
			useCase: 'Performance-critical applications'
		}
	];

	// Handle representative selection
	const selectRepresentative = (rep) => {
		setSelectedRepresentative(rep);
		setDebateStance(rep.id);
		setDebateIntensity(debateIntensity + 20);
		if (debateIntensity >= 60) {
			evolve('heated');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Style Symposium`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Great Style Symposium convened, where representatives from different 
					styling philosophies gathered. <strong>Moderator Stylus</strong> welcomed 
					Aria: "Ambassador, the styling kingdoms are... passionate about their 
					approaches."
				</p>

				<p className='story-paragraph'>
					Representatives argued loudly:
				</p>
				<ul style={{ marginLeft: '20px' }}>
					<li><strong>CSS-in-JS Champion</strong>: "Styles belong with components!"</li>
					<li><strong>CSS Modules Defender</strong>: "Separation of concerns!"</li>
					<li><strong>Utility-First Advocate</strong>: "Composition over custom styles!"</li>
					<li><strong>Styled Components Artist</strong>: "Components should be stylish by default!"</li>
				</ul>

				<p className='story-paragraph'>
					<strong>Binary</strong> calculated rapidly. "So many approaches to the 
					same problem! How do we choose?"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> observed the heated debate. "Each approach 
					optimizes for different values - developer experience, performance, or 
					maintainability."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: The Great Style Debate</h3>
				
				<InstructionBox character={`Moderator Stylus opens the debate floor.`}>
					Click on each representative to hear their arguments. Explore the styling 
					approaches comparison to understand the trade-offs between each philosophy!
				</InstructionBox>
				
				<div className='style-symposium'>
					<h4 style={{ color: 'white', marginTop: 0 }}>Choose Your Champion</h4>
					
					<div className='debate-arena'>
						<div className='debate-representatives'>
							{styleRepresentatives.map(rep => (
								<div
									key={rep.id}
									className={`representative-card ${
										selectedRepresentative?.id === rep.id ? 'selected' : ''
									} ${styleDebate === rep.id ? 'arguing' : ''}`}
									onClick={() => selectRepresentative(rep)}
									style={{ '--workshop-color': rep.color }}>
									<span className='rep-icon'>{rep.icon}</span>
									<div className='rep-name'>{rep.name}</div>
									<div className='rep-philosophy'>"{rep.philosophy}"</div>
									{selectedRepresentative?.id === rep.id && (
										<div style={{ 
											marginTop: '10px', 
											fontSize: '0.9em',
											color: '#ecf0f1' 
										}}>
											{rep.argument}
										</div>
									)}
								</div>
							))}
						</div>

						{debateIntensity > 0 && (
							<div style={{ 
								textAlign: 'center', 
								marginTop: '20px',
								color: '#ecf0f1' 
							}}>
								<div>Debate Intensity: {debateIntensity}%</div>
								<div style={{
									background: 'rgba(255,255,255,0.2)',
									height: '10px',
									borderRadius: '5px',
									overflow: 'hidden',
									marginTop: '10px'
								}}>
									<div style={{
										background: debateIntensity > 60 ? '#e74c3c' : '#f39c12',
										width: `${debateIntensity}%`,
										height: '100%',
										transition: 'width 0.5s ease'
									}} />
								</div>
							</div>
						)}
					</div>
				</div>

				<div className='approach-comparison'>
					<h4>Styling Approaches Overview</h4>
					<table className='comparison-table'>
						<thead>
							<tr>
								<th>Approach</th>
								<th>Pros</th>
								<th>Cons</th>
								<th>Best For</th>
							</tr>
						</thead>
						<tbody>
							{stylingApproaches.map((approach, index) => (
								<tr key={index}>
									<td><strong>{approach.name}</strong></td>
									<td>{approach.pros.join(', ')}</td>
									<td>{approach.cons.join(', ')}</td>
									<td style={{ fontStyle: 'italic' }}>{approach.useCase}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='interactive-style-demo'>
					<h4>Same Component, Different Styles</h4>
					<div className='demo-component'>
						<p>This is a demo component. Click the approaches above to see 
						how each one would style me!</p>
						{selectedRepresentative && (
							<div style={{ 
								marginTop: '20px',
								padding: '15px',
								background: selectedRepresentative.color,
								color: 'white',
								borderRadius: '5px'
							}}>
								Styled with {selectedRepresentative.name}'s approach!
							</div>
						)}
					</div>
				</div>
			</div>

			<CodeExample
				title={`Styling Approaches Overview`}
				discoveredBy={`Moderator's Wisdom`}
				code={`// React Styling Approaches Comparison

// 1. Traditional CSS - import './styles.css';
<button className="button">{children}</button>

// 2. CSS Modules - Scoped by default
import styles from './Button.module.css';
<button className={styles.button}>{children}</button>

// 3. CSS-in-JS (Emotion)
const buttonStyle = css\`background: #3498db; &:hover { background: #2980b9; }\`;
<button css={buttonStyle}>{children}</button>

// 4. Styled Components - Dynamic props
const StyledButton = styled.button\`background: \${p => p.primary ? '#3498db' : '#95a5a6'}\`;

// 5. Tailwind CSS - Utility-first
<button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded">

// 6. Vanilla Extract - Zero-runtime, type-safe
export const button = style({ backgroundColor: '#3498db', ':hover': { backgroundColor: '#2980b9' } });

// Performance Trade-offs:
// Traditional CSS: ✅ Cached ❌ Global scope
// CSS Modules: ✅ Local scope ❌ Build step
// CSS-in-JS: ✅ Dynamic ❌ Runtime cost
// Tailwind: ✅ Tiny CSS ❌ Verbose HTML
// Zero-Runtime: ✅ Type-safe ❌ Limited dynamism`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Moderator Stylus`,
						description: `The diplomatic mediator of the Style Symposium. Their wisdom: "There's no universally correct styling solution - only the right solution for your specific needs. Understanding trade-offs is key."`
					}
				]}
				lessonInsight={{
					title: `The Styling Insight:`,
					content: `The styling debate in React isn't about finding a winner - it's about understanding trade-offs. Each approach optimizes for different values: developer experience, performance, maintainability, or team scalability. The key is matching the solution to your needs.`
				}}
				reflectionQuestions={[
					`What matters most in your project - DX, bundle size, runtime performance, or maintainability?`,
					`How does team size affect styling choices?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 39 (Morning)`,
					content: `The Great Style Symposium was intense! Representatives argued passionately: CSS-in-JS Champion (💅 "Styles belong with components!"), CSS Modules Defender (📦 "Separation of concerns!"), Utility-First Advocate (🎨 "Composition over custom styles!"), and Styled Components Artist (🎭 "Components should be stylish by default!"). Moderator Stylus wisely noted each approach optimizes for different values. Traditional CSS = simple but global scope. CSS Modules = local scope with familiar syntax. CSS-in-JS = dynamic but runtime cost. Utility-First = fast development but learning curve. Debate Intensity: ${debateIntensity}%!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;