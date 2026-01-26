import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		selectedLibrary,
		selectLibrary,
		implementedForms,
		addImplementedForm,
		federationProgress
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
		selectLibrary(rep.id);
		addImplementedForm(rep.id);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Form Federation`}
			/>

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
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Meet the Form Representatives</h3>
				
				<InstructionBox character={`The Federal Form Chancellor introduces the library representatives.`}>
					Click on each representative to learn their philosophy and strengths. 
					Compare the approaches to understand controlled vs uncontrolled patterns!
				</InstructionBox>
				
				<div className='federation-hall'>
					<div className='library-representatives'>
						{formRepresentatives.map(rep => (
							<div
								key={rep.id}
								className={`representative-card ${
									selectedRepresentative?.id === rep.id ? 'selected' : ''
								} ${selectedLibrary === rep.id ? 'focused' : ''}`}
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

			<CodeExample
				title={`Form Library Foundations`}
				discoveredBy={`Chancellor's Wisdom`}
				code={`// Form Library Approaches Comparison

// 1. Native React (Controlled)
const [formData, setFormData] = useState({ username: '', email: '' });
<input name="username" value={formData.username} onChange={handleChange} />

// 2. React Hook Form (Uncontrolled - Minimal re-renders!)
import { useForm } from 'react-hook-form';
const { register, handleSubmit, formState: { errors } } = useForm();
<input {...register('username', { required: 'Required' })} />

// 3. Formik (Controlled with Yup validation)
import { Formik, Form, Field } from 'formik';
const schema = Yup.object({ username: Yup.string().required() });
<Formik initialValues={{}} validationSchema={schema} onSubmit={...}>
  <Field name="username" />
</Formik>

// 4. React Final Form (Subscription-based)
import { Form, Field } from 'react-final-form';
<Form onSubmit={onSubmit} render={({ handleSubmit }) => (
  <Field name="username">{({ input }) => <input {...input} />}</Field>
)} />

// When to Use:
// React Hook Form: Performance critical, large forms, TypeScript
// Formik: Team familiar with React, rich ecosystem, Yup validation
// React Final Form: Fine-grained subscriptions, complex logic
// Native React: Simple forms (< 5 fields), learning, full control`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Federal Form Chancellor`,
						description: `The wise leader of the Form Federation. Their motto: "User input is sacred - handle it with care, validate it with wisdom, and submit it with confidence. Choose your tools based on your form's complexity, not popularity."`
					}
				]}
				lessonInsight={{
					title: `The Federation Insight:`,
					content: `Form libraries exist because forms are deceptively complex. What starts as a simple input quickly grows: validation, error handling, async submission, field dependencies, dynamic fields, and performance concerns. Each library makes different trade-offs - React Hook Form minimizes re-renders, Formik keeps things familiar, Final Form provides granular control.`
				}}
				reflectionQuestions={[
					`When do native React forms become insufficient?`,
					`How do form requirements shape library choice?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Morning)`,
					content: `Welcome to the Form Federation! The Federal Form Chancellor showed me the grand hall with holographic forms of increasing complexity. I met the library representatives: React Hook Form Ambassador (⚡ "Performance through uncontrolled components!"), Formik Federation Leader (🎯 "Simplicity through controlled components!"), Final Form Chancellor (🔄 "Flexibility through subscriptions!"), and TanStack Form Innovator (🚀 "Type-safe forms!"). The philosophy spectrum: controlled vs uncontrolled components. Federation Progress: ${federationProgress}%. The Chancellor's wisdom: "Choose your tools based on form complexity, not popularity."`
				}}
			/>
		</div>
	);
};

export default ChapterOne;