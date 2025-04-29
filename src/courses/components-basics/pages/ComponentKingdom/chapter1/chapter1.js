import { useState } from 'react';

const ChapterOne = () => {
	const [highlightedCard, setHighlightedCard] = useState(null);

	const handleWorkshopHover = (index) => {
		setHighlightedCard(index);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Village of Components
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the digital realm of Weblandia, there existed a kingdom
					called React where everything was built from magical
					building blocks known as <strong>Components</strong>. Unlike
					the static structures in neighboring kingdoms, these
					Components were alive and responsive.
				</p>

				<div className='kingdom-illustration'>
					<div className='castle'>
						<div className='castle-tower'>App</div>
						<div className='castle-body'>
							<div
								className={`workshop button-workshop ${
									highlightedCard === 0 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(0)}>
								Button Workshop
							</div>
							<div
								className={`workshop card-workshop ${
									highlightedCard === 1 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(1)}>
								Card Workshop
							</div>
							<div
								className={`workshop form-workshop ${
									highlightedCard === 2 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(2)}>
								Form Workshop
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					The master builder, <strong>App</strong>, lived in the
					tallest tower and was responsible for organizing all the
					craftsmen to work together. Every component in the kingdom
					had its own special purpose and design, but they all shared
					the ability to be reused throughout the realm.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Explorer
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Explore the Workshops! Move your cursor over each
							colored workshop above to discover what kind of
							components they create.
						</strong>
					</p>
				</div>

				<div className='component-showcase'>
					{highlightedCard === 0 && (
						<div className='showcase-item'>
							<h4>Button Component</h4>
							<div className='showcase-preview'>
								<button className='preview-button'>
									Click Me
								</button>
							</div>
							<div className='showcase-details'>
								<p>
									The Button workshop creates interactive
									buttons that can trigger actions when
									clicked.
								</p>
								<p>
									They receive props like:{' '}
									<code>
										label
										<div className='code-tooltip'>
											<div>
												The text to display on the
												button
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`label="Click me!"`}</pre>
												<br />
												The value{' '}
												<strong>{`"Click me!"`}</strong>{' '}
												is the text that will appear on
												your button.
											</div>
											<pre>{`<Button
  label="Click me!"
  onClick={() => alert('Hello!')}
/>`}</pre>
											<div className='explanation'>
												Use the{' '}
												<strong>{`label`}</strong> prop
												to make your button's purpose
												clear to users
											</div>
										</div>
									</code>
									,{' '}
									<code>
										onClick
										<div className='code-tooltip'>
											<div>
												Function to handle click events
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`onClick={() => alert('Hello!')}`}</pre>
												<br />
												The{' '}
												<strong>{`() => alert('Hello!')`}</strong>{' '}
												is the function that runs when
												the button is clicked.
											</div>
											<pre>{`<Button
  onClick={() => alert('Hello!')}
  label="Click me!"
/>`}</pre>
											<div className='explanation'>
												Use <strong>{`onClick`}</strong>{' '}
												to define what happens when
												users interact with the button
											</div>
										</div>
									</code>
									,{' '}
									<code>
										disabled
										<div className='code-tooltip'>
											<div>
												Boolean to control button state
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`disabled={isLoading}`}</pre>
												<br />
												The value{' '}
												<strong>{`isLoading`}</strong>{' '}
												is a boolean (true/false) that
												determines if the button can be
												clicked. When{' '}
												<strong>{`isLoading`}</strong>{' '}
												is true, the button will be
												disabled; when{' '}
												<strong>{`isLoading`}</strong>{' '}
												is false, the button will be
												enabled. Typically,{' '}
												<strong>{`isLoading`}</strong>{' '}
												is set to true when starting an
												async operation (like saving
												data or making an API call) and
												set back to false when the
												operation completes. These state
												changes usually happen in your{' '}
												<strong>{`onClick`}</strong>{' '}
												handler or a parent component's
												state management:{' '}
												<strong>{`setIsLoading(true)`}</strong>{' '}
												before the operation and{' '}
												<strong>{`setIsLoading(false)`}</strong>{' '}
												after it finishes. The state
												would be declared at the top of
												your component with{' '}
												<strong>{`const [isLoading, setIsLoading] = useState(false)`}</strong>
												, and the handler function would
												be defined before the return
												statement, or in a separate file
												like{' '}
												<strong>{`handlers.js`}</strong>{' '}
												or <strong>{`utils.js`}</strong>{' '}
												if it's complex or reused.
											</div>
											<pre>{`<Button
  disabled={isLoading}
  onClick={handleSubmit}
/>`}</pre>
											<div className='explanation'>
												Use{' '}
												<strong>{`disabled`}</strong> to
												prevent interactions while
												processing or validating
											</div>
										</div>
									</code>
								</p>
							</div>
						</div>
					)}

					{highlightedCard === 1 && (
						<div className='showcase-item'>
							<h4>Card Component</h4>
							<div className='showcase-preview'>
								<div className='preview-card'>
									<h4>Welcome to React</h4>
									<p>
										This is a card component displaying
										content.
									</p>
								</div>
							</div>
							<div className='showcase-details'>
								<p>
									The Card workshop creates containers that
									display organized information.
								</p>
								<p>
									They receive props like:{' '}
									<code>
										title
										<div className='code-tooltip'>
											<div>The card's header text</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`title="Welcome!"`}</pre>
												<br />
												The value{' '}
												<strong>{`"Welcome!"`}</strong>{' '}
												is the text that appears in the
												card's header.
											</div>
											<pre>{`<Card
  title="Welcome!"
  content="Start your journey here"
/>`}</pre>
											<div className='explanation'>
												Use <strong>{`title`}</strong>{' '}
												to give users a clear overview
												of the card's content
											</div>
										</div>
									</code>
									,{' '}
									<code>
										content
										<div className='code-tooltip'>
											<div>
												The main content of the card
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`content={<div>...</div>}`}</pre>
												<br />
												The{' '}
												<strong>{`<div>...</div>`}</strong>{' '}
												inside the curly braces becomes
												the main body of your card.
											</div>
											<pre>{`<Card
  title="User Profile"
  content={
    <div>
      <img src={avatar} />
      <p>{userBio}</p>
    </div>
  }
/>`}</pre>
											<div className='explanation'>
												<strong>{`content`}</strong> can
												be text, components, or any
												valid JSX
											</div>
										</div>
									</code>
									,{' '}
									<code>
										image
										<div className='code-tooltip'>
											<div>
												Optional image for the card
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`image="/path/to/image.jpg"`}</pre>
												<br />
												The{' '}
												<strong>{`"/path/to/image.jpg"`}</strong>{' '}
												specifies the location of the
												image to display.
											</div>
											<pre>{`<Card
  image="/path/to/image.jpg"
  imageAlt="Description"
  title="Photo Card"
/>`}</pre>
											<div className='explanation'>
												Add <strong>{`image`}</strong>{' '}
												to make your cards more visually
												engaging
											</div>
										</div>
									</code>
								</p>
							</div>
						</div>
					)}

					{highlightedCard === 2 && (
						<div className='showcase-item'>
							<h4>Form Component</h4>
							<div className='showcase-preview'>
								<div className='preview-form'>
									<div className='form-field'>
										<label>Username:</label>
										<input
											type='text'
											placeholder='Enter username'
										/>
									</div>
									<div className='form-field'>
										<label>Password:</label>
										<input
											type='password'
											placeholder='Enter password'
										/>
									</div>
									<button className='form-button'>
										Login
									</button>
								</div>
							</div>
							<div className='showcase-details'>
								<p>
									The Form workshop creates interactive forms
									for collecting user input.
								</p>
								<p>
									They receive props like:{' '}
									<code>
										fields
										<div className='code-tooltip'>
											<div>
												Array of form field
												configurations
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`fields={[{ name: 'email', type: 'email' }]}`}</pre>
												<br />
												The{' '}
												<strong>{`[{ name: 'email', type: 'email' }]`}</strong>{' '}
												defines each form field's
												properties. These properties (
												<strong>{`name`}</strong> and{' '}
												<strong>{`type`}</strong>) are
												properties you define in your
												Form component:
												<pre>{`// Inside your Form component
fields.map((field) => (
  <div key={field.name}>
    <label>{field.label}</label>
    <input
      name={field.name}     // becomes 'name'
      type={field.type}     // becomes 'text'
      value={formData[field.name]}
      onChange={(e) => handleChange(field.name, e.target.value)}
    />
  </div>
))`}</pre>
												to generate the HTML{' '}
												<strong>{`<input>`}</strong>{' '}
												elements. The{' '}
												<strong>{`type`}</strong>{' '}
												becomes the input's HTML type
												attribute, and{' '}
												<strong>{`name`}</strong> is
												used to identify the field in
												your form data. Here's how it
												works in the Form component's
												code:
											</div>
											<br />
											<pre>{`<Form
  fields={[
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password'
    }
  ]}
/>`}</pre>
											<div className='explanation'>
												Define your form structure with
												a <strong>{`fields`}</strong>{' '}
												array for flexibility
											</div>
										</div>
									</code>
									,{' '}
									<code>
										onSubmit
										<div className='code-tooltip'>
											<div>
												Handler for form submission
											</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`onSubmit={async (data) => { ... }}`}</pre>
												<br />
												The{' '}
												<strong>{`async (data) => { ... }`}</strong>{' '}
												processes the form data when
												submitted. Here,{' '}
												<strong>{`data`}</strong> is an
												object containing all your form
												values, like{' '}
												<strong>{`{ email: 'user@example.com', password: '123456' }`}</strong>
												. The <strong>{`...`}</strong>{' '}
												represents where your code would
												go to handle this data, for
												example:
												<pre>{`onSubmit={async (data) => {
  // data = { email: 'user@example.com', password: '123456' }
  try {
    await submitToServer(data);  // send to your API
    showSuccessMessage();        // show success to user
  } catch (error) {
    showErrorMessage(error);     // show error to user
  }
}}`}</pre>
											</div>
											<div className='explanation'>
												Let's see a complete example
												with error handling:
											</div>
											<pre>{`<Form
  onSubmit={async (data) => {
    try {
      await submitForm(data);
      showSuccess();
    } catch (error) {
      showError(error);
    }
  }}
/>`}</pre>
											<div className='explanation'>
												Handle form submission with{' '}
												<strong>{`onSubmit`}</strong>{' '}
												for validation and error
												handling
											</div>
										</div>
									</code>
									,{' '}
									<code>
										initialValues
										<div className='code-tooltip'>
											<div>Pre-fill form fields</div>
											<div className='explanation'>
												In:{' '}
												<pre>{`initialValues={{ name: user.name }}`}</pre>
												<br />
												The{' '}
												<strong>{`{ name: user.name }`}</strong>{' '}
												provides starting values for
												form fields. Here,{' '}
												<strong>{`user`}</strong> is an
												object (like a container of
												data) that has properties, and
												the <strong>{`.`}</strong> is
												used to access those properties.
												So{' '}
												<strong>{`user.name`}</strong>{' '}
												means "get the name property
												from the user object". For
												example:
												<pre>{`// In your React component
const user = {
  name: 'John',
  email: 'john@example.com'
};

// Later in your JSX
<Form
  initialValues={{
    name: user.name,        // will be 'John'
    email: user.email       // will be 'john@example.com'
  }}
  onSubmit={updateProfile}  // saves the form data
/>`}</pre>
												If{' '}
												<strong>{`user = { name: 'John', email: 'john@example.com' }`}</strong>
												, then{' '}
												<strong>{`user.name`}</strong>{' '}
												would be{' '}
												<strong>{`'John'`}</strong>.
												Here,{' '}
												<strong>{`updateProfile`}</strong>{' '}
												would be a function you define
												that receives the new form
												values and saves them, typically
												looking like this:
												<pre>{`const updateProfile = async (newData) => {
  // newData = { name: 'New Name', email: 'new@example.com' }
  try {
    await saveToDatabase(newData);  // save the new values
    setUser(newData);              // update local state
  } catch (error) {
    handleError(error);            // handle any errors
  }
}`}</pre>
											</div>
											<div className='explanation'>
												It's okay if that doesn't make
												sense yet.
												<br />
												<br />
												Now let's look at how to use
												initialValues in your form:
												<pre>{`<Form
  initialValues={{
    name: user.name,
    email: user.email
  }}
  onSubmit={updateProfile}
/>`}</pre>
											</div>
											<div className='explanation'>
												Use{' '}
												<strong>{`initialValues`}</strong>{' '}
												to edit forms or remember
												preferences.
											</div>
										</div>
									</code>
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// The Button Workshop creates buttons for the kingdom
function Button(props) {
return (
<button className="kingdom-button" onClick={props.onClick}>
{props.label}
</button>
);
}

// The Card Workshop builds display cards
function Card(props) {
return (
<div className="kingdom-card">
<h3>{props.title}</h3>
<p>{props.content}</p>
</div>
);
}

// The Form Workshop creates interactive forms
function Form(props) {
return (
<form className="kingdom-form" onSubmit={props.onSubmit}>
{props.fields.map((field, index) => (
<div key={index} className="form-field">
<label>{field.label}</label>
<input
type={field.type}
name={field.name}
placeholder={field.placeholder}
value={field.value}
onChange={field.onChange}
/>
</div>
))}
<button type="submit" className="form-button">
{props.submitLabel || 'Submit'}
</button>
</form>
);
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Component Lesson:</h3>
				<p>
					In React, everything you see is a Component – a reusable
					piece of code that returns JSX elements describing what
					should appear on the screen. Components can be as simple as
					a button or as complex as an entire page.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does thinking of components as specialized workshops
					help you understand their purpose in React?
				</p>
				<p>
					Why is it useful to have many small, focused components
					rather than a few large ones?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
