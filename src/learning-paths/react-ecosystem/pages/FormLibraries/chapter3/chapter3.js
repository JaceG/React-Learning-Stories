import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
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

	const [selectedScenario, setSelectedScenario] = useState(null);
	const [consensusAchieved, setConsensusAchieved] = useState(false);
	const [formSolutions, setFormSolutions] = useState([]);
	const [validationStrategies, setValidationStrategies] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({});

	// Real-world form scenarios
	const realWorldScenarios = [
		{
			id: 'startup-mvp',
			name: 'Startup MVP',
			icon: '🚀',
			requirements: ['Quick development', 'Basic validation', 'Good DX'],
			recommendation: 'React Hook Form',
			reasoning: 'Minimal setup, great performance out of the box, excellent TypeScript support'
		},
		{
			id: 'enterprise-app',
			name: 'Enterprise Application',
			icon: '🏢',
			requirements: ['Team scalability', 'Standardization', 'Extensive validation'],
			recommendation: 'Formik',
			reasoning: 'Familiar patterns, mature ecosystem, extensive documentation'
		},
		{
			id: 'performance-critical',
			name: 'Performance Critical',
			icon: '⚡',
			requirements: ['Minimal re-renders', 'Large forms', 'Real-time validation'],
			recommendation: 'React Hook Form',
			reasoning: 'Uncontrolled components minimize re-renders, built for performance'
		},
		{
			id: 'complex-wizard',
			name: 'Complex Multi-Step',
			icon: '🧙',
			requirements: ['Step validation', 'Progress tracking', 'State persistence'],
			recommendation: 'React Final Form',
			reasoning: 'Fine-grained control over form state and subscriptions'
		},
		{
			id: 'simple-forms',
			name: 'Simple Forms',
			icon: '📝',
			requirements: ['< 5 fields', 'Basic validation', 'No dependencies'],
			recommendation: 'Native React',
			reasoning: 'No need for a library with simple requirements'
		}
	];

	// Form library decision matrix
	const decisionFactors = [
		{
			factor: 'Learning Curve',
			hookForm: 'Moderate',
			formik: 'Easy',
			finalForm: 'Steep',
			native: 'None'
		},
		{
			factor: 'Performance',
			hookForm: 'Excellent',
			formik: 'Good',
			finalForm: 'Excellent',
			native: 'Depends'
		},
		{
			factor: 'Bundle Size',
			hookForm: '~25KB',
			formik: '~43KB',
			finalForm: '~30KB',
			native: '0KB'
		},
		{
			factor: 'TypeScript',
			hookForm: 'Excellent',
			formik: 'Good',
			finalForm: 'Good',
			native: 'Manual'
		},
		{
			factor: 'Ecosystem',
			hookForm: 'Growing',
			formik: 'Mature',
			finalForm: 'Moderate',
			native: 'None'
		}
	];

	// Migration strategies
	const migrationPaths = [
		{
			from: 'Native React',
			to: 'React Hook Form',
			strategy: 'Gradual form-by-form migration, start with complex forms'
		},
		{
			from: 'Formik',
			to: 'React Hook Form',
			strategy: 'Parallel implementation, migrate performance-critical forms first'
		},
		{
			from: 'Redux Form',
			to: 'React Final Form',
			strategy: 'Similar APIs make migration straightforward'
		}
	];

	// Check consensus achievement
	const checkConsensus = () => {
		if (formSolutions.length >= 3 && implementedForms.length >= 4 && validationStrategies.length >= 2) {
			setConsensusAchieved(true);
			setFederationProgress(100);
		}
	};

	// Select scenario
	const selectScenario = (scenario) => {
		setSelectedScenario(scenario);
		checkConsensus();
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Form Consensus`}
				bridge={`After hours of implementation in the Form Workshop, Aria had experienced each library's strengths firsthand. "Each library has its own elegance," she reflected. The Federal Form Chancellor gathered all the representatives. "Now, let's find consensus on when to use each."`}
			/>

			<StorySection
				paragraphs={[
					<>The <strong>Federal Form Chancellor</strong> gathered all the library representatives. "Ambassador Aria has studied each approach. Now, let's find consensus on when to use each."</>,
					<><strong>Aria</strong> presented her findings: "Each library excels in different scenarios. There's no universal best - only the best for specific needs."</>,
					<>The representatives, once competitive, began nodding in agreement. <strong>React Hook Form Ambassador</strong> admitted, "For simple forms, native React might suffice."</>,
					<><strong>Formik Leader</strong> added, "And for performance-critical applications, React Hook Form's approach is superior."</>,
					<><strong>Binary</strong> computed the consensus. "Optimal library selection based on requirements - this is true engineering!"</>
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Finding Form Consensus</h3>
				
				<InstructionBox character={`The Federal Form Chancellor presents the Consensus Chamber.`}>
					Explore real-world scenarios to find the right library for each situation. 
					Review the decision matrix and migration strategies!
				</InstructionBox>
				
				<div className='approach-comparison'>
					<h4>Real-World Scenario Analysis</h4>
					<div className='library-representatives'>
						{realWorldScenarios.map(scenario => (
							<div
								key={scenario.id}
								className={`representative-card ${
									selectedScenario?.id === scenario.id ? 'selected' : ''
								}`}
								onClick={() => selectScenario(scenario)}
								style={{ cursor: 'pointer' }}>
								<div className='rep-icon'>{scenario.icon}</div>
								<div className='rep-name'>{scenario.name}</div>
								<div className='rep-philosophy'>
									<strong>Requirements:</strong>
									<ul style={{ 
										marginTop: '10px', 
										paddingLeft: '20px',
										textAlign: 'left' 
									}}>
										{scenario.requirements.map((req, i) => (
											<li key={i}>{req}</li>
										))}
									</ul>
								</div>
								{selectedScenario?.id === scenario.id && (
									<div style={{
										marginTop: '15px',
										padding: '15px',
										background: '#f39c12',
										color: '#2c3e50',
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

				<div className='decision-matrix' style={{ marginTop: '40px' }}>
					<h4>Form Library Decision Matrix</h4>
					<table className='comparison-table'>
						<thead>
							<tr>
								<th>Factor</th>
								<th>React Hook Form</th>
								<th>Formik</th>
								<th>Final Form</th>
								<th>Native React</th>
							</tr>
						</thead>
						<tbody>
							{decisionFactors.map((item, index) => (
								<tr key={index}>
									<td><strong>{item.factor}</strong></td>
									<td style={{ color: '#ec5990' }}>{item.hookForm}</td>
									<td style={{ color: '#4a90e2' }}>{item.formik}</td>
									<td style={{ color: '#27ae60' }}>{item.finalForm}</td>
									<td style={{ color: '#95a5a6' }}>{item.native}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='migration-guide' style={{ marginTop: '40px' }}>
					<h4>Migration Strategies</h4>
					<div className='validation-patterns'>
						{migrationPaths.map((path, index) => (
							<div key={index} className='validation-card'>
								<div className='validation-title'>
									{path.from} → {path.to}
								</div>
								<div className='validation-description'>
									{path.strategy}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='consensus-summary' style={{ marginTop: '40px' }}>
					<h4>The Form Federation Consensus</h4>
					<div style={{
						background: 'rgba(255, 255, 255, 0.1)',
						padding: '30px',
						borderRadius: '15px',
						lineHeight: '1.8'
					}}>
						<p><strong>For Performance-Critical Apps:</strong> React Hook Form</p>
						<p><strong>For Team Familiarity:</strong> Formik</p>
						<p><strong>For Ultimate Control:</strong> React Final Form</p>
						<p><strong>For Modern Type-Safe Apps:</strong> TanStack Form</p>
						<p><strong>For Simple Forms:</strong> Native React</p>
					</div>
				</div>

				{consensusAchieved && (
					<div className='consensus-banner'>
						<h4>🤝 Form Federation Consensus Achieved!</h4>
						<p>You've mastered the art of form library selection! You understand 
						that each tool serves different needs, and the key is matching the 
						solution to the problem.</p>
					</div>
				)}
			</div>

			<CodeExample
				title={`Form Library Selection Guide`}
				discoveredBy={`Consensus Wisdom`}
				code={`// Comprehensive Form Library Selection Guide

// 1. Decision Tree
function selectFormLibrary(requirements) {
  // Simple forms (< 5 fields, basic validation)
  if (requirements.fields < 5 && !requirements.complexValidation) {
    return 'native-react';
  }
  
  // Performance critical (many fields, frequent updates)
  if (requirements.fields > 20 || requirements.realTimeValidation) {
    return 'react-hook-form';
  }
  
  // Team familiarity and ecosystem
  if (requirements.teamSize > 5 && requirements.needsEcosystem) {
    return 'formik';
  }
  
  // Complex state management needs
  if (requirements.conditionalLogic === 'complex' || 
      requirements.subscriptionControl) {
    return 'react-final-form';
  }
  
  // Modern TypeScript-first projects
  if (requirements.typeScript === 'strict' && requirements.modern) {
    return 'tanstack-form';
  }
  
  // Default recommendation
  return 'react-hook-form';
}

// 2. Migration Example: Formik to React Hook Form
// Before (Formik)
const FormikExample = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required()
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" type="email" />
          {errors.email && touched.email && <div>{errors.email}</div>}
          
          <Field name="password" type="password" />
          {errors.password && touched.password && <div>{errors.password}</div>}
          
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

// After (React Hook Form)
const HookFormExample = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required()
    }))
  });
  
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register('email')} type="email" />
      {errors.email && <div>{errors.email.message}</div>}
      
      <input {...register('password')} type="password" />
      {errors.password && <div>{errors.password.message}</div>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

// 3. Hybrid Approach - Using Multiple Libraries
// Sometimes using different libraries for different forms makes sense
const App = () => {
  return (
    <>
      {/* Simple search form - Native React */}
      <SearchForm />
      
      {/* User profile form - Formik for familiarity */}
      <ProfileForm />
      
      {/* Complex order form - React Hook Form for performance */}
      <OrderForm />
      
      {/* Multi-step wizard - React Final Form for control */}
      <WizardForm />
    </>
  );
};

// 4. Creating a Form Abstraction Layer
// Abstract form library choice from components
interface FormConfig {
  fields: FieldConfig[];
  onSubmit: (values: any) => void;
  validation?: ValidationSchema;
}

class FormFactory {
  static create(config: FormConfig, library: 'formik' | 'hook-form' | 'native') {
    switch (library) {
      case 'formik':
        return <FormikForm {...config} />;
      case 'hook-form':
        return <HookForm {...config} />;
      case 'native':
        return <NativeForm {...config} />;
      default:
        throw new Error('Unknown form library');
    }
  }
}

// Usage
<FormFactory 
  config={formConfig} 
  library={process.env.REACT_APP_FORM_LIBRARY} 
/>

// 5. Performance Monitoring
const FormPerformanceMonitor = ({ children, formName }) => {
  const renderCount = useRef(0);
  const renderTimes = useRef([]);
  
  useEffect(() => {
    renderCount.current++;
    renderTimes.current.push(performance.now());
    
    // Log performance metrics
    if (renderCount.current % 10 === 0) {
      console.log(\`Form \${formName} metrics:\`, {
        renders: renderCount.current,
        averageRenderTime: calculateAverage(renderTimes.current)
      });
    }
  });
  
  return children;
};

// 6. Form Library Feature Comparison
const featureMatrix = {
  'react-hook-form': {
    pros: [
      'Minimal re-renders',
      'Small bundle size',
      'Built-in validation',
      'Excellent TypeScript support',
      'Great DevTools'
    ],
    cons: [
      'Learning curve for uncontrolled components',
      'Less intuitive for complex dependent fields'
    ],
    bestFor: 'Performance-critical applications, large forms'
  },
  
  formik: {
    pros: [
      'Familiar React patterns',
      'Large ecosystem',
      'Extensive documentation',
      'Easy to learn',
      'Good community support'
    ],
    cons: [
      'Performance issues with large forms',
      'Larger bundle size',
      'More boilerplate'
    ],
    bestFor: 'Teams new to form libraries, standard CRUD apps'
  },
  
  'react-final-form': {
    pros: [
      'Fine-grained subscriptions',
      'Highly optimizable',
      'Framework agnostic core',
      'Powerful form state management'
    ],
    cons: [
      'Steeper learning curve',
      'More complex API',
      'Smaller community'
    ],
    bestFor: 'Complex forms with specific performance needs'
  }
};

// 7. Choosing Based on Project Phase
const projectPhaseGuide = {
  prototype: {
    recommendation: 'Native React or Formik',
    reason: 'Quick to implement, familiar patterns'
  },
  mvp: {
    recommendation: 'React Hook Form',
    reason: 'Good balance of DX and performance'
  },
  scale: {
    recommendation: 'React Hook Form or Final Form',
    reason: 'Performance becomes critical'
  },
  enterprise: {
    recommendation: 'Standardize on one, provide abstractions',
    reason: 'Consistency across teams'
  }
};`}
			/>

			{consensusAchieved && (
				<div className='achievement-banner'>
					<h4>🤝 Form Federation Consensus Achieved!</h4>
					<p>You've mastered the art of form library selection!</p>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: `The Consensus Insight:`,
					content: `The form library ecosystem demonstrates a mature understanding of different needs. Each library represents years of community learning and optimization. Key selection factors: form complexity, performance requirements, team experience, TypeScript usage, and ecosystem needs. Don't choose based on popularity alone - match the tool to your requirements.`
				}}
				reflectionQuestions={[
					`How do you balance developer experience with performance?`,
					`Should you standardize on one library or use multiple?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Evening)`,
					content: `The Form Federation has reached consensus! For Performance-Critical Apps: React Hook Form. For Team Familiarity: Formik. For Ultimate Control: React Final Form. For Modern Type-Safe Apps: TanStack Form. For Simple Forms: Native React. The key is matching requirements to solutions. Decision factors: Learning Curve, Performance, Bundle Size, TypeScript support, and Ecosystem. Federation Progress: ${federationProgress}%! The Chancellor's wisdom: "Choose based on your specific requirements, not trends." Forms seemed simple at first, but handling user input properly requires careful consideration!`
				}}
				chapterEnding={[
					`The Federal Form Chancellor smiled warmly. "You've achieved what many cannot - understanding without bias. Each library has its place."`,
					`Aria reflected on her journey. "Forms seemed simple at first. But handling user input properly requires careful consideration."`,
					`Binary finalized his analysis. "Optimal form handling improves both user experience and developer productivity!"`,
					`Debuggora prepared for departure. "Next stop: the Style Symposium. Time to explore CSS-in-JS, Tailwind, and more!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;