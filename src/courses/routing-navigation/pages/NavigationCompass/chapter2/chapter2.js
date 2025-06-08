import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
	const { 
		activeRoute, 
		handleNavigation,
		currentView,
		switchView,
		masterStatus
	} = useOutletContext();

	const [selectedParam, setSelectedParam] = useState('');
	const [queryParams, setQueryParams] = useState({});
	const [statePreservation, setStatePreservation] = useState({});

	const dynamicRoutes = [
		{ pattern: '/user/:id', example: '/user/123', description: 'User profile', integration: 'Auth context' },
		{ pattern: '/product/:category/:id', example: '/product/books/42', description: 'Product details', integration: 'Cart state' },
		{ pattern: '/workshop/:name', example: '/workshop/state-sorcerers', description: 'Workshop page', integration: 'Progress tracking' },
		{ pattern: '/form/:stage', example: '/form/validation', description: 'Multi-stage form', integration: 'Form state persistence' }
	];

	const viewContent = {
		home: { title: 'Central Command', content: 'Where all navigation paths converge', state: { visits: 12, lastAccess: 'Today' } },
		about: { title: 'Knowledge Archives', content: 'Documentation enhanced by Aria\'s journey', state: { readArticles: 45, bookmarks: 8 } },
		products: { title: 'Component Gallery', content: 'Patterns discovered across all quarters', state: { favorites: 23, customHooks: 15 } },
		contact: { title: 'Collaboration Hub', content: 'Connect with masters across the kingdom', state: { messages: 7, contacts: 150 } }
	};

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: Collaborative Navigation Design</h2>
			
			<div className='chapter-bridge'>
				<p>The Navigation Command Center transformed into a collaborative workspace. Marina 
				and Aria stood before a massive holographic display, designing the next generation 
				of React navigation patterns together.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Traditional routing has limitations," Marina explained, manipulating the hologram. 
					"Static routes work for simple cases, but modern applications need intelligence."
				</p>
				
				<p className='story-paragraph'>
					Aria nodded, adding her own projections to the display. "In my journey, I've seen 
					how state needs to persist across navigation, how forms span multiple routes, and 
					how authentication affects available paths. Let me show you patterns I've developed."
				</p>
				
				<p className='story-paragraph'>
					Binary interfaced with the hologram, merging their designs. "Synthesis initiated! 
					Marina's routing expertise + Aria's state mastery = Revolutionary navigation system!"
				</p>

				<div className='collaborative-design'>
					<h3>The Unified Navigation Architecture</h3>
					<div className='design-contribution marina'>
						<h4>Marina's Routing Foundation</h4>
						<p>"Dynamic routes adapt to any identifier..."</p>
					</div>
					<div className='design-contribution aria'>
						<h4>Aria's State Integration</h4>
						<p>"But they must preserve application state..."</p>
					</div>
					<div className='design-synthesis'>
						<h4>Combined Innovation</h4>
						<p>"Together: Stateful dynamic routing!</p>
					</div>
				</div>

				<div className='navigation-demo enhanced'>
					<h3>Intelligent Navigation System</h3>
					<div className='demo-nav'>
						{Object.keys(viewContent).map(view => (
							<button 
								key={view}
								className={`nav-link ${currentView === view ? 'active' : ''}`}
								onClick={() => {
									switchView(view);
									// Aria's addition: preserve state
									setStatePreservation(prev => ({
										...prev,
										[currentView]: { timestamp: Date.now(), scrollPos: window.scrollY }
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
							<h5>Preserved State (Aria's Pattern):</h5>
							{Object.entries(viewContent[currentView].state).map(([key, value]) => (
								<div key={key} className='state-item'>
									<span>{key}:</span> <strong>{value}</strong>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='peer-discussion'>
					<p className='story-paragraph'>
						"Watch this," Aria said, her fingers dancing across the interface. "We can 
						combine your dynamic routing with my state management patterns. When users 
						navigate, we don't just change the URL - we intelligently preserve and 
						restore their context."
					</p>
					
					<p className='story-paragraph'>
						Marina's eyes widened with excitement. "And if we add my navigation guards 
						with your validation patterns..."
					</p>
					
					<p className='story-paragraph'>
						"We get routes that validate before allowing navigation!" Aria finished. 
						"No more losing form data when users accidentally click away."
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Advanced Dynamic Routing Patterns
				</h3>
				<p className='collaboration-note'>
					Marina and Aria present their unified approach...
				</p>

				<div className='route-map advanced'>
					<h4>Intelligent Route Patterns</h4>
					{dynamicRoutes.map((route, index) => (
						<div key={index} className='route-card enhanced'>
							<div className='route-basics'>
								<p><strong>Pattern:</strong> {route.pattern}</p>
								<p><strong>Example:</strong> {route.example}</p>
								<p><strong>Purpose:</strong> {route.description}</p>
							</div>
							<div className='route-integration'>
								<p className='integration-label'>Aria's Integration:</p>
								<p className='integration-detail'>{route.integration}</p>
							</div>
						</div>
					))}
				</div>

				<div className='code-example collaborative'>
					<h3>The Marina-Aria Dynamic Route Pattern</h3>
					<pre>{`// Intelligent Dynamic Routes with State Preservation
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useFormPersistence } from './aria-patterns'; // From Forms & Events

// Marina's dynamic route foundation
<Route 
  path="/user/:userId/edit" 
  element={<UserEditForm />} 
/>

// Enhanced with Aria's patterns
function UserEditForm() {
  // Marina's routing
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Aria's state management
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
    // Aria's validation before navigation
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
}`}</pre>
				</div>

				<div className='advanced-patterns'>
					<h3>Query Parameters with Intelligence</h3>
					<div className='pattern-showcase'>
						<div className='pattern-card marina-style'>
							<h4>Marina's Foundation</h4>
							<pre>{`// Basic query params
const [searchParams, setSearchParams] = useSearchParams();
const filter = searchParams.get('filter');`}</pre>
						</div>
						
						<div className='pattern-card aria-enhancement'>
							<h4>Aria's Enhancement</h4>
							<pre>{`// Synchronized with app state
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
};`}</pre>
						</div>
						
						<div className='pattern-card combined'>
							<h4>Combined Power</h4>
							<pre>{`// Stateful navigation with history
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
};`}</pre>
						</div>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Collaborative Discovery:</h3>
				<p>
					Marina and Aria discovered that true navigation mastery comes from understanding 
					routes not as isolated paths, but as state transitions in your application. By 
					combining Marina's routing expertise with Aria's comprehensive React knowledge, 
					they created patterns that:
				</p>
				<ul>
					<li>Preserve form state across navigation</li>
					<li>Validate before allowing route changes</li>
					<li>Sync URL parameters with application state</li>
					<li>Provide intelligent back/forward navigation</li>
					<li>Create truly stateful single-page applications</li>
				</ul>
				<p>
					"This is why I needed you," Marina said with admiration. "Routing alone is 
					powerful, but routing integrated with everything else? That's revolutionary."
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does treating navigation as state transitions change your approach to 
					routing in React applications?
				</p>
				<p className='story-paragraph'>
					What benefits come from preserving component state across route changes?
				</p>
				<p className='story-paragraph'>
					How can validation and navigation work together to create better user experiences?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterTwo;