import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		selectedLibrary,
		selectLibrary,
		comparisonMode,
		toggleComparison,
		implementedForms,
		addImplementedForm,
		federationProgress,
		setFederationProgress
	} = useOutletContext();

	const [activeDemo, setActiveDemo] = useState('react-hook-form');
	const [formMode, setFormMode] = useState('simple');
	const [showMetrics, setShowMetrics] = useState(false);
	const [performanceMetrics, setPerformanceMetrics] = useState({});
	const [validationStrategies, setValidationStrategies] = useState([]);

	// Complex form scenarios
	const formScenarios = {
		simple: {
			name: 'User Registration',
			fields: ['username', 'email', 'password'],
			validation: 'Basic required fields'
		},
		dynamic: {
			name: 'Dynamic Survey',
			fields: ['questions[]', 'conditional fields'],
			validation: 'Dynamic validation rules'
		},
		wizard: {
			name: 'Multi-Step Wizard',
			fields: ['personal info', 'address', 'preferences'],
			validation: 'Cross-step validation'
		},
		complex: {
			name: 'Order Form',
			fields: ['items[]', 'shipping', 'payment'],
			validation: 'Async validation, calculations'
		}
	};

	// Validation strategies
	const validationPatterns = [
		{
			id: 'schema',
			name: 'Schema Validation',
			description: 'Using Yup, Zod, or Joi for declarative validation',
			example: 'Yup.string().email().required()'
		},
		{
			id: 'custom',
			name: 'Custom Validators',
			description: 'Writing custom validation functions',
			example: 'value => value.length > 8 || "Too short"'
		},
		{
			id: 'async',
			name: 'Async Validation',
			description: 'Server-side validation (username availability)',
			example: 'await checkUsername(value)'
		},
		{
			id: 'dependent',
			name: 'Dependent Fields',
			description: 'Validation based on other field values',
			example: 'if (country === "US") validateZipCode(zip)'
		}
	];

	// Implement a form pattern
	const implementPattern = (library, scenario) => {
		addImplementedForm(`${library}-${scenario}`);
		
		// Generate performance metrics
		const newMetrics = {
			rerenders: Math.floor(Math.random() * 50) + 10,
			bundleSize: Math.floor(Math.random() * 30) + 20,
			setupTime: Math.floor(Math.random() * 20) + 5
		};
		
		setPerformanceMetrics(prev => ({
			...prev,
			[library]: newMetrics
		}));
		
		setFederationProgress(prev => Math.min(100, prev + 15));
	};

	// Add validation strategy
	const learnValidation = (strategy) => {
		if (!validationStrategies.find(v => v.id === strategy.id)) {
			setValidationStrategies([...validationStrategies, strategy]);
			setFederationProgress(prev => Math.min(100, prev + 10));
		}
	};

	// Switch active demo
	const switchDemo = (library) => {
		setActiveDemo(library);
		selectLibrary({ id: library });
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`Form Library Deep Dive`}
				bridge={`"Now that you've met the representatives," the Federal Form Chancellor announced, "it's time for hands-on learning. Each library has set up demonstration stations." Aria entered the Form Workshop where complex forms floated in the air, transforming as different libraries handled them.`}
			/>

			<StorySection
				paragraphs={[
					<><strong>Aria</strong> entered the Form Workshop, where each library had set up demonstration stations. Complex forms floated in the air, transforming as different libraries handled them.</>,
					<>"Time for hands-on learning," announced the <strong>React Hook Form Ambassador</strong>. "Watch how each library handles the same form differently."</>,
					<><strong>Binary</strong> activated his performance monitors. "I'll track re-renders, bundle sizes, and execution time!"</>,
					<><strong>Debuggora</strong> perched between the stations. "Notice how each approach affects debugging and developer experience."</>
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Form Library Workshop</h3>
				
				<InstructionBox character={`The React Hook Form Ambassador opens the Workshop.`}>
					Switch between libraries and form complexity levels. Implement forms 
					and learn validation strategies - schema, custom, async, and dependent fields!
				</InstructionBox>
				
				<div className='form-workshop'>
					<div className='implementation-tabs'>
						{['react-hook-form', 'formik', 'react-final-form', 'tanstack-form'].map(lib => (
							<button
								key={lib}
								className={`implementation-tab ${activeDemo === lib ? 'active' : ''}`}
								onClick={() => switchDemo(lib)}>
								{lib.split('-').map(word => 
									word.charAt(0).toUpperCase() + word.slice(1)
								).join(' ')}
							</button>
						))}
					</div>

					<div className='form-mode-selector' style={{ marginTop: '20px' }}>
						<label style={{ marginRight: '10px' }}>Form Complexity:</label>
						<select
							value={formMode}
							onChange={(e) => setFormMode(e.target.value)}
							style={{
								padding: '8px',
								background: 'rgba(255, 255, 255, 0.1)',
								border: '1px solid #f39c12',
								borderRadius: '5px',
								color: '#ecf0f1'
							}}>
							{Object.keys(formScenarios).map(mode => (
								<option key={mode} value={mode}>
									{formScenarios[mode].name}
								</option>
							))}
						</select>
					</div>

					<div className='form-demos'>
						<h4>{formScenarios[formMode].name} Implementation</h4>
						<p style={{ marginBottom: '20px' }}>
							Fields: {formScenarios[formMode].fields.join(', ')}
						</p>

						{activeDemo === 'react-hook-form' && (
							<div className='demo-form'>
								<h5 style={{ color: '#ec5990' }}>React Hook Form</h5>
								<div className='form-field'>
									<label>Username</label>
									<input type="text" placeholder="Uncontrolled input" />
								</div>
								<div className='form-field'>
									<label>Email</label>
									<input type="email" placeholder="Minimal re-renders" />
								</div>
								{formMode === 'dynamic' && (
									<div className='form-field'>
										<label>Dynamic Field</label>
										<input type="text" placeholder="Added dynamically" />
									</div>
								)}
								<button 
									className='submit-button'
									onClick={() => implementPattern('react-hook-form', formMode)}>
									Implement with React Hook Form
								</button>
							</div>
						)}

						{activeDemo === 'formik' && (
							<div className='demo-form'>
								<h5 style={{ color: '#4a90e2' }}>Formik</h5>
								<div className='form-field'>
									<label>Username</label>
									<input type="text" placeholder="Controlled input" />
								</div>
								<div className='form-field'>
									<label>Email</label>
									<input type="email" placeholder="Familiar React patterns" />
								</div>
								{formMode === 'wizard' && (
									<div style={{ marginTop: '20px' }}>
										<p>Step 1 of 3: Personal Info</p>
										<div style={{
											display: 'flex',
											gap: '10px',
											marginTop: '10px'
										}}>
											<div style={{
												flex: 1,
												height: '4px',
												background: '#4a90e2'
											}} />
											<div style={{
												flex: 1,
												height: '4px',
												background: 'rgba(255,255,255,0.2)'
											}} />
											<div style={{
												flex: 1,
												height: '4px',
												background: 'rgba(255,255,255,0.2)'
											}} />
										</div>
									</div>
								)}
								<button 
									className='submit-button'
									onClick={() => implementPattern('formik', formMode)}>
									Implement with Formik
								</button>
							</div>
						)}

						{/* Additional library demos would go here */}
					</div>

					<div className='implementation-showcase'>
						<h4>Your Implementations</h4>
						<div className='implementations-grid' style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
							gap: '15px',
							marginTop: '20px'
						}}>
							{implementedForms.map((impl, index) => {
								const parts = impl.split('-');
								const library = parts[0] + (parts[1] === 'hook' || parts[1] === 'final' ? '-' + parts[1] + '-' + parts[2] : '');
								const scenario = parts[parts.length - 1];
								
								return (
									<div key={index} className='implementation-card' style={{
										background: 'rgba(255, 255, 255, 0.1)',
										padding: '15px',
										borderRadius: '8px',
										border: '1px solid rgba(243, 156, 18, 0.3)'
									}}>
										<strong>{library}</strong>
										<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
											Scenario: {formScenarios[scenario]?.name || scenario}
										</div>
									</div>
								);
							})}
							{implementedForms.length === 0 && (
								<p style={{ color: '#7f8c8d' }}>
									Implement forms to see them here
								</p>
							)}
						</div>
					</div>
				</div>

				<div className='validation-section' style={{ marginTop: '40px' }}>
					<h3>Validation Strategies</h3>
					<div className='validation-patterns'>
						{validationPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`validation-card ${
									validationStrategies.find(v => v.id === pattern.id) ? 'mastered' : ''
								}`}
								onClick={() => learnValidation(pattern)}>
								<div className='validation-title'>{pattern.name}</div>
								<div className='validation-description'>
									{pattern.description}
								</div>
								<code style={{
									display: 'block',
									marginTop: '10px',
									padding: '10px',
									background: 'rgba(0, 0, 0, 0.3)',
									borderRadius: '5px',
									fontSize: '0.9em'
								}}>
									{pattern.example}
								</code>
							</div>
						))}
					</div>
				</div>

				<div className='performance-comparison'>
					<h4>Performance Metrics</h4>
					<button
						onClick={() => setShowMetrics(!showMetrics)}
						style={{
							padding: '10px 20px',
							background: '#e74c3c',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							marginBottom: '20px'
						}}>
						{showMetrics ? 'Hide' : 'Show'} Performance Data
					</button>

					{showMetrics && (
						<div className='metrics-grid'>
							{Object.entries(performanceMetrics).map(([library, metrics]) => (
								<div key={library} className='metric-card'>
									<div className='metric-label'>{library.toUpperCase()}</div>
									<div className='metric-value'>
										{metrics.rerenders || 0}
									</div>
									<span style={{ fontSize: '0.8em' }}>re-renders</span>
									<div className='metric-bar'>
										<div 
											className='metric-fill'
											style={{ width: `${100 - (metrics.rerenders || 0)}%` }}
										/>
									</div>
									<div style={{ fontSize: '0.8em', marginTop: '10px' }}>
										Bundle: {metrics.bundleSize || 0}kb
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Advanced Form Patterns`}
				discoveredBy={`Workshop Wisdom`}
				code={`// Advanced Form Implementation Patterns

// 1. Dynamic Form Fields
// React Hook Form
import { useForm, useFieldArray } from 'react-hook-form';

function DynamicForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      users: [{ name: '', email: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });
  
  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(\`users.\${index}.name\`)} />
          <input {...register(\`users.\${index}.email\`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', email: '' })}>
        Add User
      </button>
    </form>
  );
}

// Formik Dynamic Fields
import { FieldArray } from 'formik';

<FieldArray name="users">
  {({ push, remove }) => (
    <>
      {values.users.map((user, index) => (
        <div key={index}>
          <Field name={\`users[\${index}].name\`} />
          <Field name={\`users[\${index}].email\`} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => push({ name: '', email: '' })}>
        Add User
      </button>
    </>
  )}
</FieldArray>

// 2. Conditional Fields & Dependencies
// React Hook Form with watch
function ConditionalForm() {
  const { register, watch, formState: { errors } } = useForm();
  const watchCountry = watch('country');
  
  return (
    <form>
      <select {...register('country')}>
        <option value="">Select Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
      
      {watchCountry === 'US' && (
        <input
          {...register('zipCode', {
            required: 'ZIP code required for US',
            pattern: {
              value: /^[0-9]{5}$/,
              message: 'Invalid ZIP code'
            }
          })}
          placeholder="ZIP Code"
        />
      )}
      
      {watchCountry === 'CA' && (
        <input
          {...register('postalCode', {
            required: 'Postal code required for Canada',
            pattern: {
              value: /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/,
              message: 'Invalid postal code'
            }
          })}
          placeholder="Postal Code"
        />
      )}
    </form>
  );
}

// 3. Multi-Step Wizard Forms
// React Hook Form with form state persistence
function WizardForm() {
  const [step, setStep] = useState(1);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Persist across steps
      personal: {},
      address: {},
      preferences: {}
    }
  });
  
  const { trigger, getValues } = methods;
  
  const nextStep = async () => {
    const isValid = await trigger(\`step\${step}\`);
    if (isValid) setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        {step === 1 && <PersonalInfoStep />}
        {step === 2 && <AddressStep />}
        {step === 3 && <PreferencesStep />}
        
        <div>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

// 4. Async Validation
// React Hook Form
const validateUsername = async (value) => {
  const response = await fetch(\`/api/check-username?username=\${value}\`);
  const data = await response.json();
  return data.available || 'Username already taken';
};

<input
  {...register('username', {
    validate: validateUsername
  })}
/>

// Formik Async Validation
const validate = async (values) => {
  const errors = {};
  
  try {
    const response = await fetch(\`/api/check-username?username=\${values.username}\`);
    const data = await response.json();
    if (!data.available) {
      errors.username = 'Username already taken';
    }
  } catch (error) {
    errors.username = 'Could not validate username';
  }
  
  return errors;
};

// 5. Complex Validation with Yup
import * as Yup from 'yup';

const orderSchema = Yup.object({
  items: Yup.array()
    .of(
      Yup.object({
        product: Yup.string().required('Product required'),
        quantity: Yup.number()
          .min(1, 'At least 1')
          .required('Quantity required'),
        price: Yup.number()
          .positive('Must be positive')
          .required('Price required')
      })
    )
    .min(1, 'At least one item required'),
  
  shipping: Yup.object({
    method: Yup.string()
      .oneOf(['standard', 'express', 'overnight'])
      .required('Shipping method required'),
    address: Yup.string()
      .when('method', {
        is: (method) => method !== 'pickup',
        then: Yup.string().required('Address required for delivery'),
        otherwise: Yup.string()
      })
  }),
  
  total: Yup.number()
    .test('minimum-order', 'Minimum order $10', function(value) {
      return value >= 10;
    })
});

// 6. Performance Optimization
// React Hook Form - Isolated re-renders
function OptimizedForm() {
  const { register, control } = useForm();
  
  return (
    <form>
      {/* This component only re-renders when its field changes */}
      <Controller
        name="expensiveField"
        control={control}
        render={({ field }) => (
          <ExpensiveComponent {...field} />
        )}
      />
      
      {/* Regular fields don't trigger re-renders */}
      <input {...register('cheapField')} />
    </form>
  );
}

// React Final Form - Field-level subscriptions
<Field
  name="specificField"
  subscription={{ value: true, error: true }}
  render={({ input, meta }) => (
    // Only re-renders when this field's value or error changes
    <input {...input} />
  )}
/>`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Workshop Insight:`,
					content: `Complex forms reveal each library's strengths. React Hook Form's uncontrolled approach shines in large forms. Formik's controlled components feel natural to React developers. Final Form's subscription model provides ultimate performance control. Consider dynamic fields, conditional logic, multi-step wizards, async validation, and dependencies.`
				}}
				reflectionQuestions={[
					`How does form complexity affect library choice?`,
					`What role does team experience play in library selection?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Afternoon)`,
					content: `Hands-on learning in the Form Workshop! I implemented the same forms with different libraries: User Registration, Dynamic Survey, Multi-Step Wizard, and Order Form. Each library excels at different patterns: React Hook Form for performance (minimal re-renders), Formik for familiarity (controlled components), Final Form for control (subscriptions). I mastered validation strategies: Schema (Yup/Zod), Custom validators, Async validation, and Dependent fields. ${implementedForms.length} forms implemented! Binary tracked the metrics: re-renders, bundle sizes, and execution time varied significantly.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;