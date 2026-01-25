import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		formSolutions,
		addFormSolution,
		currentLibrary,
		focusLibrary,
		federationStage,
		evolve
	} = useOutletContext();

	const [selectedRepresentative, setSelectedRepresentative] = useState(null);
	const [comparisonMode, setComparisonMode] = useState(false);

	// Form library representatives
	const formRepresentatives = [
		{
			id: 'react-hook-form',
			name: 'React Hook Form Ambassador',
			icon: '⚡',
			philosophy: 'Performance through uncontrolled components!',
			strengths: ['Minimal re-renders', 'Built-in validation', 'TypeScript support'],
			approach: 'Register inputs and let the library handle the rest',
			color: '#ec5990'
		},
		{
			id: 'formik',
			name: 'Formik Federation Leader',
			icon: '🎯',
			philosophy: 'Simplicity through controlled components!',
			strengths: ['Familiar patterns', 'Rich ecosystem', 'Battle-tested'],
			approach: 'Manage form state the React way',
			color: '#4a90e2'
		},
		{
			id: 'react-final-form',
			name: 'Final Form Chancellor',
			icon: '🔄',
			philosophy: 'Flexibility through subscriptions!',
			strengths: ['Performance optimization', 'Field-level subscriptions', 'Framework agnostic'],
			approach: 'Subscribe only to what you need',
			color: '#27ae60'
		},
		{
			id: 'tanstack-form',
			name: 'TanStack Form Innovator',
			icon: '🚀',
			philosophy: 'Type-safe forms with modern patterns!',
			strengths: ['Full TypeScript', 'Framework agnostic', 'Modern API'],
			approach: 'Headless UI with complete type safety',
			color: '#f39c12'
		}
	];

	// Basic form requirements comparison
	const formRequirements = [
		{
			requirement: 'Simple Forms',
			native: 'Easy with useState',
			hookForm: 'Minimal setup',
			formik: 'Straightforward',
			finalForm: 'More setup needed'
		},
		{
			requirement: 'Complex Forms',
			native: 'Becomes unwieldy',
			hookForm: 'Scales well',
			formik: 'Good with helpers',
			finalForm: 'Excellent control'
		},
		{
			requirement: 'Performance',
			native: 'Many re-renders',
			hookForm: 'Optimized by default',
			formik: 'Needs optimization',
			finalForm: 'Highly optimizable'
		},
		{
			requirement: 'Validation',
			native: 'Manual implementation',
			hookForm: 'Built-in + Yup/Zod',
			formik: 'Yup integration',
			finalForm: 'Flexible validation'
		}
	];

	// Select a representative
	const selectRepresentative = (rep) => {
		setSelectedRepresentative(rep);
		addFormSolution(rep);
		focusLibrary(rep.id);
		if (formSolutions.length >= 2) {
			evolve('exploring');
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Form Federation
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Federal Form Chancellor</strong> welcomed Aria to the 
					Form Federation headquarters. "Ambassador Aria, you've mastered 
					basic React forms, but complex applications demand more."
				</p>

				<p className='story-paragraph'>
					The grand hall displayed holographic forms of increasing complexity - 
					multi-step wizards, dynamic field arrays, real-time validation, and 
					conditional logic that would make any developer's head spin.
				</p>

				<p className='story-paragraph'>
					"Native React forms work," the Chancellor explained, "but specialized 
					libraries offer power, performance, and developer experience that can 
					transform how you handle user input."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the displays. "So many validation 
					patterns! So many state management approaches!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> perched on a form validator. "Each library 
					optimizes for different use cases. The key is knowing when to use which."
				</p>

				<div className='character-intro-card'>
					<h4>Federal Form Chancellor</h4>
					<p>The wise leader of the Form Federation. Their motto: "User input 
					is sacred - handle it with care, validate it with wisdom, and submit 
					it with confidence. Choose your tools based on your form's complexity, 
					not popularity."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Meet the Form Representatives</h3>
				
				<div className='federation-hall'>
					<div className='library-representatives'>
						{formRepresentatives.map(rep => (
							<div
								key={rep.id}
								className={`representative-card ${
									selectedRepresentative?.id === rep.id ? 'selected' : ''
								} ${currentLibrary === rep.id ? 'focused' : ''}`}
								onClick={() => selectRepresentative(rep)}
								style={{ '--library-color': rep.color }}>
								<span className='rep-icon'>{rep.icon}</span>
								<div className='rep-name'>{rep.name}</div>
								<div className='rep-philosophy'>"{rep.philosophy}"</div>
								{selectedRepresentative?.id === rep.id && (
									<div style={{ marginTop: '15px' }}>
										<strong style={{ color: rep.color }}>Strengths:</strong>
										<ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
											{rep.strengths.map((strength, i) => (
												<li key={i} style={{ marginBottom: '5px' }}>
													{strength}
												</li>
											))}
										</ul>
										<p style={{ marginTop: '15px', fontStyle: 'italic' }}>
											{rep.approach}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='approach-comparison'>
					<h4>Form Handling Comparison</h4>
					<button
						onClick={() => setComparisonMode(!comparisonMode)}
						style={{
							padding: '10px 20px',
							background: '#f39c12',
							color: '#2c3e50',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							marginBottom: '20px'
						}}>
						{comparisonMode ? 'Hide' : 'Show'} Detailed Comparison
					</button>

					{comparisonMode && (
						<table className='comparison-table'>
							<thead>
								<tr>
									<th>Requirement</th>
									<th>Native React</th>
									<th>React Hook Form</th>
									<th>Formik</th>
									<th>Final Form</th>
								</tr>
							</thead>
							<tbody>
								{formRequirements.map((req, index) => (
									<tr key={index}>
										<td><strong>{req.requirement}</strong></td>
										<td>{req.native}</td>
										<td style={{ color: '#ec5990' }}>{req.hookForm}</td>
										<td style={{ color: '#4a90e2' }}>{req.formik}</td>
										<td style={{ color: '#27ae60' }}>{req.finalForm}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				<div className='form-philosophy'>
					<h4>The Form Philosophy Spectrum</h4>
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '30px',
						background: 'rgba(255, 255, 255, 0.1)',
						borderRadius: '10px',
						marginTop: '20px'
					}}>
						<div style={{ textAlign: 'center', flex: 1 }}>
							<div style={{ fontSize: '2em', marginBottom: '10px' }}>🎮</div>
							<strong>Controlled</strong>
							<p style={{ fontSize: '0.9em', marginTop: '10px' }}>
								React state owns everything<br/>
								(Formik approach)
							</p>
						</div>
						<div style={{ 
							flex: 2, 
							height: '2px', 
							background: 'linear-gradient(90deg, #4a90e2, #ec5990)',
							margin: '0 20px'
						}} />
						<div style={{ textAlign: 'center', flex: 1 }}>
							<div style={{ fontSize: '2em', marginBottom: '10px' }}>🏃</div>
							<strong>Uncontrolled</strong>
							<p style={{ fontSize: '0.9em', marginTop: '10px' }}>
								DOM owns the state<br/>
								(React Hook Form approach)
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Form Library Foundations</span>
				</div>
				<div className='code-example'>
					<pre>{`// Understanding Form Library Approaches

// 1. Native React Forms (Controlled)
function NativeForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Too short';
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Submit:', formData);
    } else {
      setErrors(newErrors);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <span>{errors.username}</span>}
      {/* More fields... */}
    </form>
  );
}

// 2. React Hook Form (Uncontrolled)
import { useForm } from 'react-hook-form';

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  
  const onSubmit = (data) => {
    console.log('Submit:', data);
  };
  
  // Minimal re-renders!
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', { required: 'Required' })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      
      <input
        {...register('email', {
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        type="password"
        {...register('password', {
          required: 'Required',
          minLength: {
            value: 8,
            message: 'Too short'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

// 3. Formik (Controlled with helpers)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required')
});

function FormikForm() {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Submit:', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="span" />
          
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" />
          
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" />
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

// 4. React Final Form (Subscription-based)
import { Form, Field } from 'react-final-form';

function FinalForm() {
  const onSubmit = (values) => {
    console.log('Submit:', values);
  };
  
  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = 'Required';
    if (!values.email?.includes('@')) errors.email = 'Invalid email';
    if (values.password?.length < 8) errors.password = 'Too short';
    return errors;
  };
  
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field name="username">
            {({ input, meta }) => (
              <div>
                <input {...input} placeholder="Username" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          
          <Field name="email">
            {({ input, meta }) => (
              <div>
                <input {...input} type="email" placeholder="Email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <input {...input} type="password" placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          
          <button type="submit" disabled={submitting || pristine}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

// When to Use Each Library

// React Hook Form
// ✅ Performance is critical
// ✅ Large forms with many fields
// ✅ TypeScript projects
// ✅ Minimal bundle size matters

// Formik
// ✅ Team familiar with React patterns
// ✅ Need rich ecosystem
// ✅ Complex validation with Yup
// ✅ Established codebase

// React Final Form
// ✅ Need fine-grained subscriptions
// ✅ Complex form logic
// ✅ Performance optimization control
// ✅ Framework agnostic core

// Native React
// ✅ Simple forms (< 5 fields)
// ✅ Learning React
// ✅ Minimal dependencies
// ✅ Full control needed`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Chancellor's Wisdom:</strong> "Each library represents years 
					of community wisdom. React Hook Form optimizes for performance with 
					uncontrolled components. Formik provides familiar React patterns. 
					Final Form offers ultimate flexibility. Choose based on your form's 
					complexity and your team's needs."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Federation Insight:</h3>
				<p>
					Form libraries exist because forms are deceptively complex. What starts 
					as a simple input quickly grows: validation, error handling, async 
					submission, field dependencies, dynamic fields, and performance concerns.
				</p>
				<p>
					Each library makes different trade-offs. React Hook Form minimizes 
					re-renders through uncontrolled components. Formik keeps things familiar 
					with controlled components. Final Form provides granular control through 
					subscriptions. Understanding these philosophies helps you choose wisely.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Form Complexity</h3>
				<p>
					<strong>When do native React forms become insufficient?</strong> Consider 
					at what point the complexity of validation, state management, and 
					performance optimization justifies adding a library.
				</p>
				<p>
					<strong>How do form requirements shape library choice?</strong> Think 
					about how factors like team size, performance needs, and form complexity 
					influence the optimal solution.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					The Federal Form Chancellor gestured to the library representatives. 
					"Each has mastered their approach. Now, Ambassador Aria, you must 
					learn their ways."
				</p>
				<p>
					<strong>Aria</strong> studied the holographic demonstrations. "They 
					all solve forms differently, but elegantly."
				</p>
				<p>
					<strong>Binary</strong> prepared his benchmarking modules. "Ready to 
					measure performance impacts and developer experience!"
				</p>
				<p>
					"Then let us begin," the Chancellor declared. "Time to dive deep into 
					each library's implementation..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;