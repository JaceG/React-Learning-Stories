import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const [audioMode, setAudioMode] = useState(false);
	const [readingContent, setReadingContent] = useState('');
	const [labelExamples, setLabelExamples] = useState({
		button: false,
		image: false,
		form: false,
		region: false,
		dynamic: false
	});
	const [announceQueue, setAnnounceQueue] = useState([]);
	const [liveRegionType, setLiveRegionType] = useState('polite');
	const [formErrors, setFormErrors] = useState({});
	
	const { 
		screenReaderMode,
		setScreenReaderMode,
		announcements,
		addAnnouncement
	} = useOutletContext();

	const contentExamples = [
		{
			id: 'unlabeled',
			bad: '<button><img src="save.png" /></button>',
			good: '<button aria-label="Save document"><img src="save.png" alt="" /></button>',
			announcement: {
				bad: 'Button',
				good: 'Save document, button'
			}
		},
		{
			id: 'image',
			bad: '<img src="chart.png" />',
			good: '<img src="chart.png" alt="Sales increased 25% this quarter" />',
			announcement: {
				bad: 'Image',
				good: 'Sales increased 25% this quarter, image'
			}
		},
		{
			id: 'form',
			bad: '<input type="email" placeholder="Email" />',
			good: '<label>Email address <input type="email" /></label>',
			announcement: {
				bad: 'Edit text',
				good: 'Email address, edit text'
			}
		},
		{
			id: 'error',
			bad: '<input style="border: 2px solid red" />',
			good: '<input aria-invalid="true" aria-describedby="email-error" />',
			announcement: {
				bad: 'Edit text',
				good: 'Edit text, invalid entry, please enter a valid email address'
			}
		},
		{
			id: 'dynamic',
			bad: '<div>3 items in cart</div>',
			good: '<div role="status" aria-live="polite">3 items in cart</div>',
			announcement: {
				bad: '(silence - not announced)',
				good: '3 items in cart'
			}
		}
	];

	const landmarkRoles = [
		{ role: 'banner', label: 'Site header', example: '<header>' },
		{ role: 'navigation', label: 'Navigation', example: '<nav>' },
		{ role: 'main', label: 'Main content', example: '<main>' },
		{ role: 'complementary', label: 'Aside content', example: '<aside>' },
		{ role: 'contentinfo', label: 'Site footer', example: '<footer>' },
		{ role: 'search', label: 'Search', example: 'role="search"' }
	];

	const announceText = (text, priority = 'polite') => {
		const announcement = {
			text,
			priority,
			time: new Date().toLocaleTimeString()
		};
		setAnnounceQueue(prev => [...prev, announcement]);
		addAnnouncement(text);
		
		// Simulate speech
		if ('speechSynthesis' in window && audioMode) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 1.2;
			window.speechSynthesis.speak(utterance);
		}
	};

	const simulateScreenReader = (element) => {
		setReadingContent(element);
		const example = contentExamples.find(ex => ex.id === element);
		if (example) {
			announceText(example.announcement.good);
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get('email');
		const name = formData.get('name');
		
		const errors = {};
		if (!email || !email.includes('@')) {
			errors.email = 'Please enter a valid email address';
		}
		if (!name || name.length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}
		
		setFormErrors(errors);
		
		if (Object.keys(errors).length > 0) {
			announceText('Form contains errors. Please review and correct.', 'assertive');
		} else {
			announceText('Form submitted successfully', 'polite');
		}
	};

	const handleLiveUpdate = (message) => {
		announceText(message, liveRegionType);
	};

	return (
		<div className='chapter interaction-patterns'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Screen Reader Sanctuary`}
				bridge={`Having mastered keyboard navigation with Guardian Keyboard, Aria ventured deeper into the Accessibility Realm. "Keyboards open doors," Guardian Keyboard said in farewell, "but Guardian Audio will show you how to give voice to your interfaces." Through a crystalline archway, the Screen Reader Sanctuary awaited.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the Screen Reader Sanctuary, <strong>Guardian Audio</strong> demonstrated 
					how blind users experienced applications. "Close your eyes and listen," she 
					instructed.
				</p>
				
				<p className='story-paragraph'>
					Aria heard her app through a screen reader. "It's just saying 'button, 
					button, image, link' - no context!"
				</p>

				<p className='story-paragraph'>
					"Exactly. Labels, descriptions, and context are crucial. Your visual design 
					means nothing here - only structure and text matter."
				</p>

				<p className='story-paragraph'>
					Binary analyzed patterns. "Screen reader users: 2.2% of population, but 
					100% rely on proper labeling. Calculation: Critical feature!"
				</p>

				<p className='story-paragraph'>
					Debuggora listened intently. "I hear it now - without labels, it's like 
					trying to navigate in complete darkness with no landmarks."
				</p>

				<p className='story-paragraph'>
					Guardian Audio smiled. "The screen reader reveals truth - it strips away 
					visual decoration and shows if your content truly communicates."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Screen Reader Sanctuary</h3>
				
				<InstructionBox character={`Guardian Audio hands you enchanted headphones.`}>
					{`"Activate the screen reader and click on each example to hear how your interface speaks to those who cannot see. Compare the bad and good implementations!"`}
				</InstructionBox>

				<button
					onClick={() => {
						setScreenReaderMode(!screenReaderMode);
						setAudioMode(!screenReaderMode);
						if (!screenReaderMode) {
							announceText('Screen reader activated. Welcome to audio navigation mode.');
						}
					}}
					style={{
						padding: '12px 30px',
						background: screenReaderMode 
							? 'linear-gradient(135deg, #27AE60, #229954)' 
							: 'linear-gradient(135deg, #9333EA, #7C3AED)',
						border: 'none',
						borderRadius: '25px',
						color: 'white',
						fontSize: '1.1em',
						fontWeight: 'bold',
						cursor: 'pointer',
						marginBottom: '20px'
					}}
				>
					{screenReaderMode ? '🔊 Screen Reader Active' : '🔇 Activate Screen Reader'}
				</button>

				{screenReaderMode && (
					<div className='screen-reader-sanctuary'>
						{/* Label Examples */}
						<div style={{ marginBottom: '30px' }}>
							<h4 style={{ marginBottom: '20px' }}>Content Labeling Examples</h4>
							<div style={{ display: 'grid', gap: '20px' }}>
								{contentExamples.map((example) => (
									<div 
										key={example.id}
										style={{
											padding: '20px',
											background: 'rgba(0, 0, 0, 0.5)',
											borderRadius: '10px',
											border: `2px solid ${readingContent === example.id ? '#FCD34D' : 'transparent'}`,
											cursor: 'pointer',
											transition: 'all 0.3s ease'
										}}
										onClick={() => simulateScreenReader(example.id)}
									>
										<div style={{ 
											display: 'grid', 
											gridTemplateColumns: '1fr 1fr', 
											gap: '20px',
											marginBottom: '15px'
										}}>
											<div>
												<h5 style={{ color: '#E74C3C', marginBottom: '10px' }}>
													❌ Without Labels
												</h5>
												<code style={{ 
													display: 'block',
													padding: '10px',
													background: 'rgba(231, 76, 60, 0.1)',
													borderRadius: '5px',
													fontSize: '0.85em'
												}}>
													{example.bad}
												</code>
												<div style={{ 
													marginTop: '10px',
													fontSize: '0.9em',
													color: '#E74C3C'
												}}>
													Announces: "{example.announcement.bad}"
												</div>
											</div>
											<div>
												<h5 style={{ color: '#27AE60', marginBottom: '10px' }}>
													✓ With Labels
												</h5>
												<code style={{ 
													display: 'block',
													padding: '10px',
													background: 'rgba(39, 174, 96, 0.1)',
													borderRadius: '5px',
													fontSize: '0.85em'
												}}>
													{example.good}
												</code>
												<div style={{ 
													marginTop: '10px',
													fontSize: '0.9em',
													color: '#27AE60'
												}}>
													Announces: "{example.announcement.good}"
												</div>
											</div>
										</div>
										{!labelExamples[example.id] && (
											<button
												onClick={(e) => {
													e.stopPropagation();
													setLabelExamples(prev => ({
														...prev,
														[example.id]: true
													}));
													announceText(`Implemented proper labeling for ${example.id}`);
												}}
												style={{
													padding: '8px 20px',
													background: 'rgba(147, 51, 234, 0.2)',
													border: '1px solid #9333EA',
													borderRadius: '15px',
													color: 'white',
													cursor: 'pointer'
												}}
											>
												Implement Proper Labeling
											</button>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Screen Reader Output */}
						<div style={{ marginBottom: '30px' }}>
							<h4 style={{ marginBottom: '15px' }}>Screen Reader Output</h4>
							<div className='sr-announcement-log'>
								{announceQueue.length === 0 ? (
									<div style={{ color: '#080' }}>
										Waiting for screen reader announcements...
									</div>
								) : (
									announceQueue.slice(-10).map((announcement, index) => (
										<div key={index} className='sr-announcement'>
											<span className='sr-timestamp'>{announcement.time}</span>
											<span style={{ color: announcement.priority === 'assertive' ? '#f00' : '#0f0' }}>
												[{announcement.priority}]
											</span>
											<span style={{ marginLeft: '10px' }}>{announcement.text}</span>
										</div>
									))
								)}
							</div>
						</div>

						{/* Landmark Navigation */}
						<div style={{ marginBottom: '30px' }}>
							<h4 style={{ marginBottom: '20px' }}>Landmark Navigation</h4>
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
								gap: '15px'
							}}>
								{landmarkRoles.map((landmark) => (
									<div
										key={landmark.role}
										style={{
											padding: '15px',
											background: 'rgba(52, 152, 219, 0.1)',
											border: '1px solid rgba(52, 152, 219, 0.3)',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease'
										}}
										onClick={() => announceText(`${landmark.label} landmark`)}
									>
										<div style={{ 
											fontWeight: 'bold', 
											color: '#3498DB',
											marginBottom: '5px'
										}}>
											{landmark.label}
										</div>
										<code style={{ 
											fontSize: '0.85em', 
											color: '#FCD34D' 
										}}>
											{landmark.example}
										</code>
									</div>
								))}
							</div>
						</div>

						{/* Form with Errors */}
						<div style={{ marginBottom: '30px' }}>
							<h4 style={{ marginBottom: '20px' }}>Accessible Form Example</h4>
							<form 
								onSubmit={handleFormSubmit}
								style={{
									background: 'rgba(0, 0, 0, 0.3)',
									padding: '20px',
									borderRadius: '10px'
								}}
							>
								<div style={{ marginBottom: '15px' }}>
									<label 
										htmlFor="name"
										style={{ display: 'block', marginBottom: '5px' }}
									>
										Name (required)
									</label>
									<input
										id="name"
										name="name"
										type="text"
										aria-required="true"
										aria-invalid={formErrors.name ? 'true' : 'false'}
										aria-describedby={formErrors.name ? 'name-error' : undefined}
										style={{
											width: '100%',
											padding: '8px',
											background: 'rgba(255, 255, 255, 0.1)',
											border: `2px solid ${formErrors.name ? '#E74C3C' : 'rgba(255, 255, 255, 0.2)'}`,
											borderRadius: '5px',
											color: 'white'
										}}
									/>
									{formErrors.name && (
										<span 
											id="name-error" 
											role="alert"
											style={{ color: '#E74C3C', fontSize: '0.9em', marginTop: '5px' }}
										>
											{formErrors.name}
										</span>
									)}
								</div>

								<div style={{ marginBottom: '15px' }}>
									<label 
										htmlFor="email"
										style={{ display: 'block', marginBottom: '5px' }}
									>
										Email address (required)
									</label>
									<input
										id="email"
										name="email"
										type="email"
										aria-required="true"
										aria-invalid={formErrors.email ? 'true' : 'false'}
										aria-describedby={formErrors.email ? 'email-error' : 'email-help'}
										style={{
											width: '100%',
											padding: '8px',
											background: 'rgba(255, 255, 255, 0.1)',
											border: `2px solid ${formErrors.email ? '#E74C3C' : 'rgba(255, 255, 255, 0.2)'}`,
											borderRadius: '5px',
											color: 'white'
										}}
									/>
									<span 
										id="email-help"
										style={{ fontSize: '0.85em', color: '#bdc3c7' }}
									>
										We'll never share your email
									</span>
									{formErrors.email && (
										<span 
											id="email-error" 
											role="alert"
											style={{ color: '#E74C3C', fontSize: '0.9em', marginTop: '5px', display: 'block' }}
										>
											{formErrors.email}
										</span>
									)}
								</div>

								<button
									type="submit"
									style={{
										padding: '10px 25px',
										background: '#3498DB',
										border: 'none',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Submit Form
								</button>
							</form>
						</div>

						{/* Live Regions Demo */}
						<div>
							<h4 style={{ marginBottom: '20px' }}>Live Region Updates</h4>
							<div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
								<button
									onClick={() => setLiveRegionType('polite')}
									style={{
										padding: '8px 16px',
										background: liveRegionType === 'polite' ? '#3498DB' : 'rgba(52, 152, 219, 0.2)',
										border: '1px solid #3498DB',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Polite
								</button>
								<button
									onClick={() => setLiveRegionType('assertive')}
									style={{
										padding: '8px 16px',
										background: liveRegionType === 'assertive' ? '#E74C3C' : 'rgba(231, 76, 60, 0.2)',
										border: '1px solid #E74C3C',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Assertive
								</button>
							</div>
							<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
								<button
									onClick={() => handleLiveUpdate('Item added to cart')}
									style={{
										padding: '10px 20px',
										background: '#27AE60',
										border: 'none',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Add to Cart
								</button>
								<button
									onClick={() => handleLiveUpdate('Processing payment...')}
									style={{
										padding: '10px 20px',
										background: '#F39C12',
										border: 'none',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Process Payment
								</button>
								<button
									onClick={() => handleLiveUpdate('Error: Connection lost')}
									style={{
										padding: '10px 20px',
										background: '#E74C3C',
										border: 'none',
										borderRadius: '5px',
										color: 'white',
										cursor: 'pointer'
									}}
								>
									Trigger Error
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			<CodeExample
				title={`Screen Reader Optimization`}
				discoveredBy={`Guardian Audio's teachings`}
				code={`# Screen Reader Best Practices
// Guardian Audio: "If it doesn't announce properly, it doesn't exist!"

# Meaningful Labels

## Button Labels
// Bad - No context
<button>
  <Icon name="save" />
</button>
// Announces: "button"

// Good - Clear purpose
<button aria-label="Save document">
  <Icon name="save" aria-hidden="true" />
</button>
// Announces: "Save document, button"

// Also good - Visible text
<button>
  <Icon name="save" aria-hidden="true" />
  <span>Save</span>
</button>

## Image Alt Text
// Decorative images
<img src="decoration.png" alt="" /> // Empty alt for decorative

// Informative images
<img 
  src="chart.png" 
  alt="Sales increased 25% from Q1 to Q2"
/>

// Complex images
<img 
  src="complex-diagram.png" 
  alt="System architecture diagram"
  aria-describedby="diagram-description"
/>
<p id="diagram-description" className="sr-only">
  The system consists of three layers...
</p>

## Form Labels
// Binary: "87% of forms lack proper labels!"

// Bad - Placeholder only
<input type="email" placeholder="Email" />

// Good - Explicit label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// Also good - Implicit label
<label>
  Email address
  <input type="email" />
</label>

// With description
<label htmlFor="password">Password</label>
<input 
  id="password"
  type="password"
  aria-describedby="password-help"
/>
<span id="password-help">
  Must be at least 8 characters
</span>

# Live Regions

## Dynamic Content Updates
// Aria: "Users need to know when things change!"

// Status messages (polite)
<div role="status" aria-live="polite">
  {itemCount} items in cart
</div>

// Important alerts (assertive)
<div role="alert" aria-live="assertive">
  Error: Please fix the following fields
</div>

// Live region hook
function useLiveAnnounce() {
  const [announcement, setAnnouncement] = useState('');
  
  const announce = (message, priority = 'polite') => {
    setAnnouncement(''); // Clear first
    setTimeout(() => {
      setAnnouncement(message);
    }, 100);
  };
  
  return [
    <div 
      role={priority === 'assertive' ? 'alert' : 'status'}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>,
    announce
  ];
}

# Form Error Handling

// Accessible error messages
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  
  return (
    <form>
      <div>
        <label htmlFor="email">
          Email
          {errors.email && (
            <span className="error-indicator" aria-label="Error">
              *
            </span>
          )}
        </label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={
            errors.email ? 'email-error' : 'email-description'
          }
        />
        {errors.email ? (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        ) : (
          <span id="email-description">
            We'll never share your email
          </span>
        )}
      </div>
    </form>
  );
}

# Screen Reader Only Content

// Utility class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Usage
<span className="sr-only">
  (opens in new window)
</span>

<button>
  <Icon name="edit" aria-hidden="true" />
  <span className="sr-only">Edit profile</span>
</button>

# Table Accessibility

// Debuggora: "Tables need context!"

function DataTable({ data }) {
  return (
    <table>
      <caption>Monthly Sales Report</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Revenue</th>
          <th scope="col">Growth</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.month}>
            <th scope="row">{row.month}</th>
            <td>\${row.revenue}</td>
            <td>
              <span 
                className={row.growth > 0 ? 'positive' : 'negative'}
                aria-label={
                  row.growth > 0 
                    ? 'Increased ' + row.growth + '%'
                    : 'Decreased ' + Math.abs(row.growth) + '%'
                }
              >
                {row.growth > 0 ? '↑' : '↓'} {row.growth}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

# Common Patterns

## Loading States
function LoadingButton({ loading, children }) {
  return (
    <button 
      disabled={loading}
      aria-busy={loading}
      aria-label={loading ? 'Loading, please wait' : undefined}
    >
      {loading && <Spinner aria-hidden="true" />}
      <span aria-hidden={loading}>
        {children}
      </span>
      {loading && (
        <span className="sr-only">Loading, please wait</span>
      )}
    </button>
  );
}

## Icon Buttons
function IconButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} aria-label={label}>
      <Icon name={icon} aria-hidden="true" />
    </button>
  );
}

## Progress Indicators
<div role="progressbar" 
     aria-valuenow={currentStep} 
     aria-valuemin={1} 
     aria-valuemax={totalSteps}
     aria-label="Form progress"
>
  Step {currentStep} of {totalSteps}
</div>

# Testing with Screen Readers

// macOS VoiceOver
Cmd + F5: Toggle VoiceOver
VO + A: Read all
VO + Arrow keys: Navigate

// NVDA (Windows)
Insert + Space: Toggle modes
H: Next heading
K: Next link
F: Next form field
T: Next table

// Testing checklist
1. Can you understand content without visuals?
2. Are all interactive elements announced?
3. Do forms have clear labels?
4. Are errors announced?
5. Can you navigate by landmarks?
6. Do dynamic updates announce?`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Audio Lesson:`,
					content: `Guardian Audio teaches us that screen readers reveal the true structure of our applications. Without proper labels, descriptions, and semantic markup, users navigate in darkness. Every image needs appropriate alt text, every form input needs a label, and every dynamic change needs announcement. The screen reader strips away visual design and shows whether your content truly communicates. Remember: if it doesn't announce properly, it doesn't exist for screen reader users.`
				}}
				reflectionQuestions={[
					`How does experiencing an app through a screen reader change your perspective on what information is truly important?`,
					`Why are proper labels and descriptions more important than visual design for some users?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 43 (Afternoon)`,
					content: `Guardian Audio opened my ears to a whole new world in the Screen Reader Sanctuary! She had me close my eyes and listen to my app - it was just saying "button, button, image, link" with no context! Binary revealed that 2.2% of the population uses screen readers, but 100% rely on proper labeling. I learned about aria-label, aria-describedby, and live regions (polite vs assertive). The landmark navigation was brilliant - header, nav, main, aside, footer become way-points for non-visual navigation. Guardian Audio's truth: "The screen reader reveals truth - it strips away visual decoration and shows if your content truly communicates."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
