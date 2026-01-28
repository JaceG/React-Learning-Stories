import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [expressionType, setExpressionType] = useState('text');
	const [visitorName, setVisitorName] = useState('Traveler');
	const [userRole, setUserRole] = useState('guest');
	const [messageCount, setMessageCount] = useState(3);
	const [items, setItems] = useState([
		{ id: 1, name: 'Potion', quantity: 5 },
		{ id: 2, name: 'Sword', quantity: 1 },
		{ id: 3, name: 'Shield', quantity: 1 },
	]);
	const [newItemName, setNewItemName] = useState('');
	const [newItemQuantity, setNewItemQuantity] = useState(1);
	const [buttonStyle, setButtonStyle] = useState('primary');

	const addItem = () => {
		if (newItemName.trim() !== '') {
			const newItem = {
				id:
					items.length > 0
						? Math.max(...items.map((item) => item.id)) + 1
						: 1,
				name: newItemName,
				quantity: newItemQuantity,
			};
			setItems([...items, newItem]);
			setNewItemName('');
			setNewItemQuantity(1);
		}
	};

	const removeItem = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	// Generate the current time greeting
	const getCurrentGreeting = () => {
		const currentTime = new Date().getHours();
		if (currentTime < 12) {
			return 'Good morning';
		} else if (currentTime < 18) {
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
	};

	// Format a date for display
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='Embedding Magic Spells'
				bridge='Having learned the basics of JSX syntax, Aria was eager to discover its true power. Professor Syntaxis led her deeper into the academy to the Expression Chamber.'
			/>

			<StorySection
				paragraphs={[
					<>
						"The real magic of JSX," Professor Syntaxis explained,
						"comes from its ability to embed JavaScript expressions
						directly within the markup. Watch as I demonstrate the{' '}
						<strong>Curly Brace Incantation</strong>!"
					</>,
					`The professor waved his wand, and curly braces began to glow around various parts of a component spell. "These braces act as portals between the markup realm and the JavaScript realm. Anything inside them is evaluated as pure JavaScript!"`,
					<>
						Aria watched in fascination as a small sprite named{' '}
						<strong>Binary</strong> appeared. "I help evaluate
						expressions!" Binary chirped. "When I see curly braces,
						I know it's time to run JavaScript calculations!"
					</>,
				]}
			/>

			<CodeExample
				title='Expression Magic Demonstration'
				discoveredBy="Binary's favorite example"
				code={`// Aria practices embedding expressions
function Greeter(props) {
const currentTime = new Date().getHours();
let greeting;

if (currentTime < 12) {
greeting = "Good morning";
} else if (currentTime < 18) {
greeting = "Good afternoon";
} else {
greeting = "Good evening";
}

return (
<div className="greeter">
<h2>{greeting}, {props.name}!</h2>
<p>The time is {new Date().toLocaleTimeString()}</p>
<p>You have {props.messages.length} new messages.</p>
{props.messages.length > 0 && (
<button>View Messages</button>
)}
</div>
);
}`}
			/>

			<StorySection
				paragraphs={[
					`"By the scrolls!" Aria gasped. "We can put any JavaScript expression inside those curly braces - variables, function calls, even conditional logic!"`,
					`"Indeed," Syntaxis nodded. "This fusion of markup and logic is what makes React components so powerful. Now, let Binary guide you through the Expression Playground..."`,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Binary's Expression Playground
				</h3>
				<InstructionBox character='Binary invites you to explore the Expression Playground.'>
					Select different expression types from the dropdown to see
					how JavaScript expressions work inside JSX curly braces.
				</InstructionBox>

				<div className='expression-selector'>
					<label>Try different JSX expression types: </label>
					<select
						value={expressionType}
						onChange={(e) => setExpressionType(e.target.value)}
						style={{ marginLeft: '10px', padding: '5px' }}>
						<option value='text'>Text Expressions</option>
						<option value='attribute'>Attribute Expressions</option>
						<option value='conditional'>
							Conditional Rendering
						</option>
						<option value='array'>Array Mapping</option>
						<option value='ternary'>Ternary Operators</option>
						<option value='function'>Function Calls</option>
					</select>
				</div>

				<div
					className='expression-playground'
					style={{
						marginTop: '20px',
						border: '1px solid #ccc',
						padding: '20px',
						borderRadius: '5px',
					}}>
					{expressionType === 'text' && (
						<div className='playground-section'>
							<h4>
								Text Expressions: Embedding variables in content
							</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<label>
									Visitor Name:
									<input
										type='text'
										value={visitorName}
										onChange={(e) =>
											setVisitorName(e.target.value)
										}
										style={{
											marginLeft: '10px',
											padding: '5px',
										}}
									/>
								</label>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='visitor-greeting'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<h2>
										{getCurrentGreeting()}, {visitorName}!
									</h2>
									<p>Today is {formatDate(new Date())}</p>
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`<h2>{getCurrentGreeting()}, {visitorName}!</h2>
<p>Today is {formatDate(new Date())}</p>`}</pre>
								</div>
							</div>
						</div>
					)}

					{expressionType === 'attribute' && (
						<div className='playground-section'>
							<h4>
								Attribute Expressions: Dynamic props and
								attributes
							</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<label>
									Button Style:
									<select
										value={buttonStyle}
										onChange={(e) =>
											setButtonStyle(e.target.value)
										}
										style={{
											marginLeft: '10px',
											padding: '5px',
										}}>
										<option value='primary'>Primary</option>
										<option value='secondary'>
											Secondary
										</option>
										<option value='danger'>Danger</option>
										<option value='success'>Success</option>
									</select>
								</label>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='button-display'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<button
										style={{
											backgroundColor:
												buttonStyle === 'primary'
													? '#0066cc'
													: buttonStyle ===
														  'secondary'
														? '#6c757d'
														: buttonStyle ===
															  'danger'
															? '#dc3545'
															: buttonStyle ===
																  'success'
																? '#28a745'
																: '#0066cc',
											color: 'white',
											padding: '10px 15px',
											border: 'none',
											borderRadius: '5px',
											cursor: 'pointer',
										}}>
										{buttonStyle.charAt(0).toUpperCase() +
											buttonStyle.slice(1)}{' '}
										Button
									</button>
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`<button
  style={{
    backgroundColor: 
      buttonStyle === 'primary' ? '#0066cc' :
      buttonStyle === 'secondary' ? '#6c757d' :
      buttonStyle === 'danger' ? '#dc3545' :
      buttonStyle === 'success' ? '#28a745' : '#0066cc',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px'
  }}
>
  {buttonStyle.charAt(0).toUpperCase() + buttonStyle.slice(1)} Button
</button>`}</pre>
								</div>
							</div>
						</div>
					)}

					{expressionType === 'conditional' && (
						<div className='playground-section'>
							<h4>
								Conditional Rendering: Show elements based on
								conditions
							</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<label>
									Message Count:
									<input
										type='number'
										min='0'
										max='10'
										value={messageCount}
										onChange={(e) =>
											setMessageCount(
												parseInt(e.target.value) || 0
											)
										}
										style={{
											marginLeft: '10px',
											padding: '5px',
											width: '60px',
										}}
									/>
								</label>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='message-display'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<p>
										You have {messageCount} new message
										{messageCount !== 1 ? 's' : ''}.
									</p>
									{messageCount > 0 && (
										<button
											style={{
												backgroundColor: '#0066cc',
												color: 'white',
												padding: '8px 12px',
												border: 'none',
												borderRadius: '4px',
											}}>
											View Message
											{messageCount !== 1 ? 's' : ''}
										</button>
									)}
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`<p>You have {messageCount} new message{messageCount !== 1 ? 's' : ''}.</p>
{messageCount > 0 && (
  <button>
    View Message{messageCount !== 1 ? 's' : ''}
  </button>
)}`}</pre>
								</div>
							</div>
						</div>
					)}

					{expressionType === 'array' && (
						<div className='playground-section'>
							<h4>Array Mapping: Render lists from data</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<div
									className='add-item-form'
									style={{
										display: 'flex',
										gap: '10px',
										marginBottom: '10px',
									}}>
									<input
										type='text'
										placeholder='Item name'
										value={newItemName}
										onChange={(e) =>
											setNewItemName(e.target.value)
										}
										style={{ padding: '5px', flex: '2' }}
									/>
									<input
										type='number'
										placeholder='Quantity'
										min='1'
										value={newItemQuantity}
										onChange={(e) =>
											setNewItemQuantity(
												parseInt(e.target.value) || 1
											)
										}
										style={{
											padding: '5px',
											width: '70px',
										}}
									/>
									<button
										onClick={addItem}
										style={{
											backgroundColor: '#28a745',
											color: 'white',
											border: 'none',
											padding: '5px 10px',
											borderRadius: '4px',
										}}>
										Add Item
									</button>
								</div>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='inventory-display'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<h3>Adventurer's Inventory</h3>
									<ul
										style={{
											listStyleType: 'none',
											padding: '0',
										}}>
										{items.map((item) => (
											<li
												key={item.id}
												style={{
													display: 'flex',
													justifyContent:
														'space-between',
													padding: '8px',
													margin: '5px 0',
													backgroundColor: '#efe6ff',
													borderRadius: '4px',
												}}>
												<span>
													{item.name} x{item.quantity}
												</span>
												<button
													onClick={() =>
														removeItem(item.id)
													}
													style={{
														backgroundColor:
															'#dc3545',
														color: 'white',
														border: 'none',
														padding: '2px 5px',
														borderRadius: '3px',
													}}>
													Remove
												</button>
											</li>
										))}
									</ul>
									{items.length === 0 && (
										<p>Your inventory is empty.</p>
									)}
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`<h3>Adventurer's Inventory</h3>
<ul>
  {items.map(item => (
    <li key={item.id}>
      <span>{item.name} x{item.quantity}</span>
      <button onClick={() => removeItem(item.id)}>
        Remove
      </button>
    </li>
  ))}
</ul>
{items.length === 0 && <p>Your inventory is empty.</p>}`}</pre>
								</div>
							</div>
						</div>
					)}

					{expressionType === 'ternary' && (
						<div className='playground-section'>
							<h4>
								Ternary Operators: Choose between alternatives
							</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<label>
									User Role:
									<select
										value={userRole}
										onChange={(e) =>
											setUserRole(e.target.value)
										}
										style={{
											marginLeft: '10px',
											padding: '5px',
										}}>
										<option value='guest'>Guest</option>
										<option value='member'>Member</option>
										<option value='admin'>Admin</option>
									</select>
								</label>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='role-display'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<div style={{ marginBottom: '15px' }}>
										{userRole === 'admin' ? (
											<div
												style={{
													backgroundColor: '#dc3545',
													color: 'white',
													padding: '10px',
													borderRadius: '5px',
												}}>
												<h3>Admin Dashboard</h3>
												<p>
													Welcome to the admin panel.
													You have full control.
												</p>
											</div>
										) : userRole === 'member' ? (
											<div
												style={{
													backgroundColor: '#28a745',
													color: 'white',
													padding: '10px',
													borderRadius: '5px',
												}}>
												<h3>Member Area</h3>
												<p>
													Welcome back to the members
													area.
												</p>
											</div>
										) : (
											<div
												style={{
													backgroundColor: '#6c757d',
													color: 'white',
													padding: '10px',
													borderRadius: '5px',
												}}>
												<h3>Guest Access</h3>
												<p>
													Limited access. Please sign
													up for more features.
												</p>
											</div>
										)}
									</div>
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`{userRole === 'admin' ? (
  <div className="admin-panel">
    <h3>Admin Dashboard</h3>
    <p>Welcome to the admin panel. You have full control.</p>
  </div>
) : userRole === 'member' ? (
  <div className="member-area">
    <h3>Member Area</h3>
    <p>Welcome back to the members area.</p>
  </div>
) : (
  <div className="guest-access">
    <h3>Guest Access</h3>
    <p>Limited access. Please sign up for more features.</p>
  </div>
)}`}</pre>
								</div>
							</div>
						</div>
					)}

					{expressionType === 'function' && (
						<div className='playground-section'>
							<h4>
								Function Calls: Transforming data with
								JavaScript functions
							</h4>
							<div
								className='control-panel'
								style={{ marginBottom: '15px' }}>
								<p>
									Functions can transform data before
									displaying it in JSX.
								</p>
							</div>
							<div
								className='result-panel'
								style={{
									backgroundColor: '#f9f9f9',
									padding: '15px',
									borderRadius: '5px',
								}}>
								<h3>JSX Output:</h3>
								<div
									className='function-examples'
									style={{
										border: '2px dashed #8a2be2',
										padding: '10px',
										borderRadius: '5px',
									}}>
									<div style={{ marginBottom: '15px' }}>
										<h4>Date Formatting</h4>
										<p>Raw date: {new Date().toString()}</p>
										<p>
											Formatted date:{' '}
											{formatDate(new Date())}
										</p>
									</div>
									<div style={{ marginBottom: '15px' }}>
										<h4>Time-Based Greeting</h4>
										<p>
											Current greeting:{' '}
											<strong>
												{getCurrentGreeting()}
											</strong>
										</p>
										<p className='note'>
											This function checks the current
											hour and returns an appropriate
											greeting.
										</p>
									</div>
									<div>
										<h4>String Manipulation</h4>
										<p>Original: "adventurer"</p>
										<p>
											Capitalized: "
											{'adventurer'
												.charAt(0)
												.toUpperCase() +
												'adventurer'.slice(1)}
											"
										</p>
									</div>
								</div>
								<div
									className='code-display'
									style={{ marginTop: '15px' }}>
									<h4>Code:</h4>
									<pre>{`// Date formatting function
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Time-based greeting function
function getCurrentGreeting() {
  const currentTime = new Date().getHours();
  if (currentTime < 12) return 'Good morning';
  else if (currentTime < 18) return 'Good afternoon';
  else return 'Good evening';
}

// In JSX:
<p>Raw date: {new Date().toString()}</p>
<p>Formatted date: {formatDate(new Date())}</p>
<p>Current greeting: <strong>{getCurrentGreeting()}</strong></p>
<p>Capitalized: "{'adventurer'.charAt(0).toUpperCase() + 'adventurer'.slice(1)}"</p>`}</pre>
								</div>
							</div>
						</div>
					)}
				</div>

				<div
					className='expression-cards'
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '10px',
						marginTop: '20px',
					}}>
					<button
						className={`expression-card ${
							expressionType === 'text' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('text')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'text'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'text' ? 'white' : 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Text Expressions
					</button>
					<button
						className={`expression-card ${
							expressionType === 'attribute' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('attribute')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'attribute'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'attribute'
									? 'white'
									: 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Attribute Expressions
					</button>
					<button
						className={`expression-card ${
							expressionType === 'conditional' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('conditional')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'conditional'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'conditional'
									? 'white'
									: 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Conditional Rendering
					</button>
					<button
						className={`expression-card ${
							expressionType === 'array' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('array')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'array'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'array' ? 'white' : 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Array Mapping
					</button>
					<button
						className={`expression-card ${
							expressionType === 'ternary' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('ternary')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'ternary'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'ternary'
									? 'white'
									: 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Ternary Operators
					</button>
					<button
						className={`expression-card ${
							expressionType === 'function' ? 'active' : ''
						}`}
						onClick={() => setExpressionType('function')}
						style={{
							padding: '10px 15px',
							backgroundColor:
								expressionType === 'function'
									? '#0066cc'
									: '#f0f0f0',
							color:
								expressionType === 'function'
									? 'white'
									: 'black',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}>
						Function Calls
					</button>
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: `Binary`,
						description: `A helpful sprite who evaluates expressions and assists with JSX magic. Binary's lights flicker with excitement when processing JavaScript calculations, guiding learners through the portal between markup and logic. "I help evaluate expressions! When I see curly braces, I know it's time to run JavaScript calculations!"`,
					},
				]}
				lessonInsight={{
					title: 'The Expression Lesson:',
					content:
						'You can embed any valid JavaScript expression inside JSX using curly braces. This allows you to display dynamic content, compute values, and call functions directly within your UI code. Mastering expressions in JSX is key to building interactive and data-driven React components. Binary reminds us: "If it\'s valid JavaScript, it can go in curly braces!"',
				}}
				reflectionQuestions={[
					"How does Binary's role as an expression evaluator help you understand what happens inside curly braces?",
					'Which type of expression (text, conditional, array mapping, etc.) do you think would be most useful in real applications?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 6 (Afternoon)",
					content:
						'Binary the sprite is adorable! He showed me six different ways to use expressions in JSX. I never realized how flexible this system is - we can embed text, attributes, conditions, arrays, ternaries, and even function calls. The curly braces are like magical portals that let JavaScript flow into our markup!',
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
