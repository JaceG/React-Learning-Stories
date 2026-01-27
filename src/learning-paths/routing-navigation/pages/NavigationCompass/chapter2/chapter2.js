import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterTwo() {
	const {
		activeRoute,
		handleNavigation,
		currentView,
		switchView,
		masterStatus,
	} = useOutletContext();

	const [selectedParam, setSelectedParam] = useState('');
	const [queryParams, setQueryParams] = useState({});
	const [statePreservation, setStatePreservation] = useState({});

	const dynamicRoutes = [
		{
			pattern: '/user/:id',
			example: '/user/123',
			description: 'User profile',
			integration: 'Auth context',
		},
		{
			pattern: '/product/:category/:id',
			example: '/product/books/42',
			description: 'Product details',
			integration: 'Cart state',
		},
		{
			pattern: '/workshop/:name',
			example: '/workshop/state-sorcerers',
			description: 'Workshop page',
			integration: 'Progress tracking',
		},
		{
			pattern: '/form/:stage',
			example: '/form/validation',
			description: 'Multi-stage form',
			integration: 'Form state persistence',
		},
	];

	const viewContent = {
		home: {
			title: 'Central Command',
			content: 'Where all navigation paths converge',
			state: { visits: 12, lastAccess: 'Today' },
		},
		about: {
			title: 'Knowledge Archives',
			content: 'Documentation and learning resources',
			state: { readArticles: 45, bookmarks: 8 },
		},
		products: {
			title: 'Component Gallery',
			content: 'Patterns discovered across all quarters',
			state: { favorites: 23, customHooks: 15 },
		},
		contact: {
			title: 'Collaboration Hub',
			content: 'Connect with masters across the kingdom',
			state: { messages: 7, contacts: 150 },
		},
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='Advanced Navigation Patterns'
					bridge='The Navigation Command Center transformed into an advanced learning space. Marina guided Aria to a massive holographic display, ready to teach her the next level of React navigation patterns.'
				/>

			<StorySection
				paragraphs={[
					`"Traditional routing has limitations," Marina explained, manipulating the hologram. "Static routes work for simple cases, but modern applications need intelligence. Let me show you advanced patterns."`,
					`Aria studied the display with growing interest. "I can see connections to my journey - state persistence, forms across routes, and authentication patterns. How do these all work together in navigation?"`,
					`"Excellent observations!" Marina praised. "Your React foundation helps you see the connections immediately. Let me show you how we integrate these patterns."`,
					`Binary interfaced with the hologram, ready to learn. "Advanced navigation patterns detected! Marina's routing expertise + Aria's React foundation = Excellent learning opportunity!"`
				]}
			/>

			<div className='collaborative-design'>
						<h3>The Unified Navigation Architecture</h3>
						<div className='design-contribution marina'>
							<h4>Marina's Routing Foundation</h4>
							<p>"Dynamic routes adapt to any identifier..."</p>
						</div>
						<div className='design-contribution student'>
							<h4>Student Understanding</h4>
							<p>
								"I see! They must preserve application state..."
							</p>
						</div>
						<div className='design-synthesis'>
							<h4>Marina's Teaching</h4>
							<p>"Exactly: Stateful dynamic routing!</p>
						</div>
					</div>

					<div className='navigation-demo enhanced'>
						<h3>Intelligent Navigation System</h3>
						<div className='demo-nav'>
							{Object.keys(viewContent).map((view) => (
								<button
									key={view}
									className={`nav-link ${
										currentView === view ? 'active' : ''
									}`}
									onClick={() => {
										switchView(view);
										// React pattern: preserve state
										setStatePreservation((prev) => ({
											...prev,
											[currentView]: {
												timestamp: Date.now(),
												scrollPos: window.scrollY,
											},
										}));
									}}>
									{viewContent[view].title.split(' ')[0]}
								</button>
							))}
						</div>
						<div className='route-content intelligent'>
							<h4>{viewContent[currentView].title}</h4>
							<p>{viewContent[currentView].content}</p>
							<div className='state-display'>
								<h5>Preserved State (React Pattern):</h5>
								{Object.entries(
									viewContent[currentView].state
								).map(([key, value]) => (
									<div key={key} className='state-item'>
										<span>{key}:</span>{' '}
										<strong>{value}</strong>
									</div>
								))}
							</div>
					</div>
				</div>

			<StorySection
				paragraphs={[
					`"Now watch this advanced pattern," Marina demonstrated, her fingers dancing across the interface. "We can combine dynamic routing with state management patterns. When users navigate, we don't just change the URL - we intelligently preserve and restore their context."`,
					`Aria's eyes widened with excitement. "And if you add navigation guards with validation patterns..."`,
					`"We get routes that validate before allowing navigation!" Marina finished. "No more losing form data when users accidentally click away."`
				]}
			/>

			<div className='interactive-section'>
					<h3 className='section-title'>
						Advanced Dynamic Routing Patterns
					</h3>
					<InstructionBox character='Marina teaches Aria advanced navigation patterns.'>
						Click on different views to see state preservation in action across route changes.
					</InstructionBox>

					<div className='route-map advanced'>
						<h4>Intelligent Route Patterns</h4>
						{dynamicRoutes.map((route, index) => (
							<div key={index} className='route-card enhanced'>
								<div className='route-basics'>
									<p>
										<strong>Pattern:</strong>{' '}
										{route.pattern}
									</p>
									<p>
										<strong>Example:</strong>{' '}
										{route.example}
									</p>
									<p>
										<strong>Purpose:</strong>{' '}
										{route.description}
									</p>
								</div>
								<div className='route-integration'>
									<p className='integration-label'>
										React Integration:
									</p>
									<p className='integration-detail'>
										{route.integration}
									</p>
								</div>
							</div>
						))}
					</div>

					<CodeExample
						title="Marina's Dynamic Route Pattern"
						code={`// Intelligent Dynamic Routes with State Preservation
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useFormPersistence } from './react-patterns'; // From Forms & Events

// Marina's dynamic route foundation
<Route 
  path="/user/:userId/edit" 
  element={<UserEditForm />} 
/>

// Enhanced with React patterns
function UserEditForm() {
  // Marina's routing
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // React state management
  const { formData, saveForm, loadForm } = useFormPersistence(userId);
  const { user } = useAuth(); // From Context mastery
  const { validate } = useValidation(); // From Validation Guardians
  
  // Effect to load preserved state
  useEffect(() => {
    // Check if we're returning to this form
    if (location.state?.returning) {
      loadForm();
    }
  }, [location]);
  
  // Intelligent navigation with validation
  const handleNavigation = async (path) => {
    // React validation before navigation
    if (formData.isDirty) {
      const isValid = await validate(formData);
      
      if (!isValid) {
        if (!confirm('You have unsaved changes. Leave anyway?')) {
          return;
        }
      } else {
        // Save form state for later
        saveForm();
      }
    }
    
    // Marina's navigation with state
    navigate(path, { 
      state: { 
        from: location.pathname,
        formSaved: true 
      }
    });
  };
  
  return (
    <div className="intelligent-form">
      {/* Form with state preservation across navigation */}
    </div>
  );
}`}
					/>

					<div className='advanced-patterns'>
						<h3>Query Parameters with Intelligence</h3>
						<div className='pattern-showcase'>
							<CodeExample
								title="Marina's Foundation"
								code={`// Basic query params
const [searchParams, setSearchParams] = useSearchParams();
const filter = searchParams.get('filter');`}
							/>

							<CodeExample
								title="React Learning"
								code={`// Synchronized with app state
const useSyncedSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters } = useFilterContext();
  
  // Sync URL with app state
  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  }, [filters]);
  
  return { searchParams, filters };
};`}
							/>

							<CodeExample
								title="Combined Power"
								code={`// Stateful navigation with history
const useStatefulNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preserveState } = useStatePreservation();
  
  const navigateWithState = (to, options = {}) => {
    // Preserve current state
    preserveState(location.pathname);
    
    // Navigate with context
    navigate(to, {
      ...options,
      state: {
        ...options.state,
        from: location.pathname,
        timestamp: Date.now()
      }
    });
  };
  
  return navigateWithState;
};`}
							/>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'The Collaborative Discovery:',
						content: "Marina taught Aria that true navigation mastery comes from understanding routes not as isolated paths, but as state transitions in your application. By learning Marina's routing expertise and applying her React foundation, Aria discovered patterns that preserve form state across navigation, validate before allowing route changes, sync URL parameters with application state, provide intelligent back/forward navigation, and create truly stateful single-page applications. \"Your React foundation makes these concepts so much clearer,\" Marina observed with satisfaction. \"Routing alone is powerful, but routing integrated with everything you've learned? That's the real magic.\""
					}}
					reflectionQuestions={[
						'How does treating navigation as state transitions change your approach to routing in React applications?',
						'What benefits come from preserving component state across route changes?',
						'How can validation and navigation work together to create better user experiences?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 21 (Afternoon)",
						content:
							"Marina showed me advanced navigation patterns today! Dynamic routes with parameters (/users/:id) are like props for URLs - they make routes reusable and flexible. Query parameters (?sort=name&filter=active) work exactly like form state for filtering! I immediately connected this to what I learned from Formeus about controlled inputs. The URL becomes another state container - a single source of truth that can be shared through links. Marina was impressed when I suggested using route state to preserve form data across navigation. Everything connects!",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
