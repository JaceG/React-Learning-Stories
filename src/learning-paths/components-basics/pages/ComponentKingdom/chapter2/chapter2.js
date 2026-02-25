import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';
import useNarrative from '../../../../../hooks/useNarrative';

const ChapterTwo = () => {
	const { narrative, loading } = useNarrative('components-basics', 'ComponentKingdom', 2);
	const [selectedProp, setSelectedProp] = useState(null);
	const [customLabel, setCustomLabel] = useState('');

	const handlePropClick = (name, value) => {
		setSelectedProp({ name, value });
	};

	if (loading || !narrative) return <div className="chapter loading">Loading...</div>;

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={narrative.title}
				bridge={narrative.bridge}
			/>

			<StorySection paragraphs={narrative.storySections[0]} />

			<div className='story-section'>
				<div className='messenger-illustration'>
					<div className='app-messenger'>
						<div className='messenger-label'>App</div>
						<div className='messenger-bag'>
							<div
								className='prop-item'
								onClick={() =>
									handlePropClick('label', 'Royal Decree')
								}>
								label: "Royal Decree"
							</div>
							<div
								className='prop-item'
								onClick={() =>
									handlePropClick(
										'onClick',
										'function() { alert("Hear ye!") }'
									)
								}>
								onClick: function() {'{}'}
							</div>
						</div>
						<div className='messenger-arrow'>→</div>
					</div>
					<div className='button-receiver'>
						<div className='receiver-label'>Button</div>
						<div id='button-output' className='receiver-output'>
							{selectedProp ? (
								<div className='prop-effect'>
									<div className='prop-name'>
										Receiving:{' '}
										<strong>{selectedProp.name}</strong>
									</div>
									<div className='prop-value'>
										Value: <code>{selectedProp.value}</code>
									</div>
									<div className='prop-result'>
										{selectedProp.name === 'label' ? (
											<button className='preview-button'>
												{selectedProp.value}
											</button>
										) : (
											<button
												className='preview-button'
												onClick={() =>
													alert('Hear ye!')
												}>
												Click to Trigger Function
											</button>
										)}
									</div>
								</div>
							) : (
								<div className='instruction-hint'>
									Click on a prop in the messenger bag
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<StorySection paragraphs={narrative.storySections[1]} />

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Prop Messenger
				</h3>
				<InstructionBox character='Click on different props in the messenger bag to see how they affect the Button component!' />

				<div className='prop-customizer'>
					<h4>Try Your Own Props</h4>
					<div className='prop-form'>
						<div className='prop-input-group'>
							<label>Button Label:</label>
							<input
								type='text'
								value={customLabel}
								onChange={(e) => setCustomLabel(e.target.value)}
								placeholder='Enter button text'
							/>
							<button
								className='apply-button'
								onClick={() =>
									handlePropClick('label', customLabel)
								}>
								Apply
							</button>
						</div>
					</div>
					<div className='prop-result-preview'>
						<h4>Result:</h4>
						<button className='preview-button'>
							{customLabel || 'Click Me'}
						</button>
					</div>
				</div>
			</div>

			<CodeExample
				title='Messenger Communication Patterns'
				discoveredBy='Transcribed by Aria at the Hub'
				code={`// Aria's Second Discovery: Props Flow
function App() {
  // Master Aurelius: "The App component orchestrates all communication"
  return (
    <div className="app-container">
      {/* Sending specific instructions to Button workshop */}
      <Button 
        label="Royal Decree" 
        onClick={() => alert('Hear ye, hear ye!')} 
      />
      
      {/* Different props for different purposes */}
      <Card 
        title="Kingdom News" 
        content="The annual Component Festival begins tomorrow!" 
      />
    </div>
  );
}

// The Button workshop receives and uses props
function Button(props) {
  // "props" is the messenger bag containing all instructions
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
}`}
			/>

			<StorySection paragraphs={narrative.storySections[2]} />

			<ChapterSummary
				characterIntros={narrative.characterIntros}
				lessonInsight={narrative.lessonInsight}
				reflectionQuestions={narrative.reflectionQuestions}
				journalEntry={narrative.journalEntry}
				lessonEnding={narrative.lessonEnding}
			/>
		</div>
	);
};

export default ChapterTwo;
