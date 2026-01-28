import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		portalState,
		openPortal,
		closePortal,
		createModalPortal,
		closeModalPortal,
		modalPortals,
	} = useOutletContext();

	const [selectedPortalType, setSelectedPortalType] = useState('modal');
	const [demoPortalOpen, setDemoPortalOpen] = useState(false);
	const [portalContent, setPortalContent] = useState({
		title: 'Welcome Traveler',
		message: 'You have discovered a magical portal!',
	});

	const portalTypes = [
		{
			id: 'modal',
			name: 'Modal Portal',
			icon: '🪟',
			description: 'Opens in a layer above the current view',
		},
		{
			id: 'drawer',
			name: 'Drawer Portal',
			icon: '📤',
			description: 'Slides in from the edge of the screen',
		},
		{
			id: 'full',
			name: 'Full Screen Portal',
			icon: '🖥️',
			description: 'Takes over the entire viewport',
		},
		{
			id: 'popup',
			name: 'Popup Portal',
			icon: '💬',
			description: 'Small contextual portal',
		},
	];

	const handleCreatePortal = () => {
		const modalId = createModalPortal({
			type: selectedPortalType,
			content: portalContent,
		});
		setDemoPortalOpen(true);

		// Auto-close after 5 seconds for demo
		setTimeout(() => {
			closeModalPortal(modalId);
			setDemoPortalOpen(false);
		}, 5000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title='The Discovery of Portal Magic'
			/>

			<StorySection
				paragraphs={[
					`Marina led Aria to the Portal Passages chamber, where the most advanced navigation concepts awaited - modals, overlays, and parallel routes. Here, she would learn the final navigation patterns.`,
					`"Today, you'll learn something special," Marina announced. "I'll teach you how to create portal-based navigation that maintains state, handles forms, and provides seamless transitions. Your React foundation will help you understand these advanced portal techniques."`,
					<>
						Marina activated holographic portals around the room,{' '}
						<strong>Binary</strong> assisting with the projections.
						"Portal Passages combine every concept in our kingdom,"
						she explained. "Components provide structure, state
						manages portal visibility, effects handle focus
						management, and forms can span across portals."
					</>,
					`Aria watched with fascination as the portal patterns unfolded before her. "This is amazing! I can see how every concept I've learned contributes to these advanced navigation patterns."`,
				]}
			/>

			<div className='portal-demonstration'>
				<h3>Portal Types Exhibition</h3>

				<div className='portal-type-selector'>
					{portalTypes.map((type) => (
						<div
							key={type.id}
							className={`portal-type-card ${
								selectedPortalType === type.id ? 'selected' : ''
							}`}
							onClick={() => setSelectedPortalType(type.id)}>
							<span className='portal-icon'>{type.icon}</span>
							<h4>{type.name}</h4>
							<p>{type.description}</p>
						</div>
					))}
				</div>

				<div className='portal-creation-lab'>
					<h4>Portal Creation Workshop</h4>
					<div className='portal-config'>
						<label>
							Portal Title:
							<input
								type='text'
								value={portalContent.title}
								onChange={(e) =>
									setPortalContent({
										...portalContent,
										title: e.target.value,
									})
								}
							/>
						</label>
						<label>
							Portal Message:
							<textarea
								value={portalContent.message}
								onChange={(e) =>
									setPortalContent({
										...portalContent,
										message: e.target.value,
									})
								}
							/>
						</label>
					</div>
					<button
						className='create-portal-btn'
						onClick={handleCreatePortal}
						disabled={demoPortalOpen}>
						Open{' '}
						{
							portalTypes.find((t) => t.id === selectedPortalType)
								?.name
						}{' '}
						✨
					</button>
					{demoPortalOpen && (
						<p className='portal-status'>
							Portal is active! It will close automatically in 5
							seconds...
						</p>
					)}
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Creating Your First Portals</h3>

				<InstructionBox character='Select a portal type above and customize the content, then click Open to create your first portal!'>
					Watch how portals render outside the normal component tree
					while maintaining React state.
				</InstructionBox>

				<CodeExample
					title='Basic Modal Portal Implementation'
					discoveredBy='Transcribed by Aria'
					code={`// Basic Modal Portal Implementation
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  // Create portal root on mount
  useEffect(() => {
    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
      const div = document.createElement('div');
      div.id = 'portal-root';
      document.body.appendChild(div);
    }
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Open Portal
      </button>
      
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}>
        <h2>Welcome to the Portal Dimension!</h2>
        <p>This content exists in a parallel space.</p>
      </Modal>
    </>
  );
}`}
				/>

				<CodeExample
					title='Advanced Portal with Focus Management'
					code={`function AccessibleModal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousActiveElement.current = document.activeElement;
      
      // Focus first focusable element in modal
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
      
      // Trap focus within modal
      const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };
      
      document.addEventListener('keydown', handleTab);
      
      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    } else {
      // Restore focus when closing
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);
  
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div 
        ref={modalRef}
        className="modal"
        role="document"
        aria-labelledby="modal-title">
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close Portal</button>
      </div>
    </div>,
    document.body
  );
}`}
				/>

				<div className='portal-patterns'>
					<h3>Common Portal Patterns</h3>
					<div className='pattern-examples'>
						<div className='pattern-card'>
							<h4>Confirmation Portal</h4>
							<p>Verify important actions</p>
							<div className='code-snippet'>
								{`<ConfirmDialog
  isOpen={showConfirm}
  title="Delete Item?"
  message="This cannot be undone."
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>`}
							</div>
						</div>
						<div className='pattern-card'>
							<h4>Form Portal</h4>
							<p>Collect data without leaving the page</p>
							<div className='code-snippet'>
								{`<FormModal
  isOpen={showForm}
  title="Add New Item"
  onSubmit={handleSubmit}
  onClose={() => setShowForm(false)}
>
  <ItemForm />
</FormModal>`}
							</div>
						</div>
						<div className='pattern-card'>
							<h4>Gallery Portal</h4>
							<p>Full-screen media viewing</p>
							<div className='code-snippet'>
								{`<ImageViewer
  images={galleryImages}
  currentIndex={selectedImage}
  onClose={() => setSelectedImage(null)}
/>`}
							</div>
						</div>
						<div className='pattern-card'>
							<h4>Toast Portal</h4>
							<p>Non-blocking notifications</p>
							<div className='code-snippet'>
								{`<ToastContainer>
  {toasts.map(toast => (
    <Toast
      key={toast.id}
      {...toast}
      onDismiss={dismissToast}
    />
  ))}
</ToastContainer>`}
							</div>
						</div>
					</div>
				</div>

				<CodeExample
					title='Route-Aware Modal System'
					code={`import { useNavigate, useLocation } from 'react-router-dom';

function RouteModal({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if modal should be open based on route
  const isOpen = location.pathname.includes('/modal');
  
  const closeModal = () => {
    // Go back to previous route
    navigate(-1);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {children}
    </Modal>
  );
}

// Route configuration
const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductList />,
    children: [
      {
        path: "modal/add",
        element: <RouteModal><AddProductForm /></RouteModal>
      },
      {
        path: ":id/modal/edit",
        element: <RouteModal><EditProductForm /></RouteModal>
      }
    ]
  }
]);

// Opening modals with navigation
function ProductList() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate('modal/add')}>
        Add Product
      </button>
      {/* Modal renders based on route */}
      <Outlet />
    </div>
  );
}`}
				/>

				<div className='portal-architecture'>
					<h3>Portal Architecture</h3>
					<div className='architecture-diagram'>
						<div className='layer main-layer'>
							<h4>Main Application Layer</h4>
							<p>Your regular routes and components</p>
						</div>
						<div className='layer portal-layer'>
							<h4>Portal Layer</h4>
							<p>Overlays, modals, tooltips</p>
						</div>
						<div className='layer root-layer'>
							<h4>Portal Root</h4>
							<p>DOM mounting point outside React root</p>
						</div>
					</div>
				</div>
			</div>

			<div className='portal-best-practices'>
				<h3>Portal Best Practices</h3>
				<div className='practice-list'>
					<div className='practice-item'>
						<span className='practice-icon'>🎯</span>
						<h4>Focus Management</h4>
						<p>
							Always return focus to the trigger element when
							closing
						</p>
					</div>
					<div className='practice-item'>
						<span className='practice-icon'>⌨️</span>
						<h4>Keyboard Navigation</h4>
						<p>Implement Escape to close and Tab trapping</p>
					</div>
					<div className='practice-item'>
						<span className='practice-icon'>📱</span>
						<h4>Responsive Design</h4>
						<p>Ensure portals work on all screen sizes</p>
					</div>
					<div className='practice-item'>
						<span className='practice-icon'>♿</span>
						<h4>Accessibility</h4>
						<p>Use proper ARIA attributes and roles</p>
					</div>
				</div>
			</div>

			<div className='character-guidance'>
				<h3>Marina's Integrated Portal Wisdom</h3>
				<div className='teaching-dialogue'>
					<p className='marina-insight'>
						"Notice how portals use everything you've learned,"
						Marina explained. "The modal component structure from
						the Northern Quarter, state management for visibility
						from the Eastern Quarter, form handling that persists
						across portal boundaries from the Western Quarter, and
						now navigation integration. It all connects!"
					</p>

					<p className='student-response'>
						Aria watched with understanding. "This is incredible!
						You've shown me how all the techniques work together to
						create seamless experiences."
					</p>
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: `Captain Marina`,
						description: `Expert guide through the Portal Passages chamber where the most advanced navigation concepts await - modals, overlays, and parallel routes. She teaches how to create portal-based navigation that maintains state, handles forms, and provides seamless transitions. "Portals combine every concept in our kingdom. Components provide structure, state manages portal visibility, effects handle focus management, and forms can span across portals. It all connects!"`,
					},
				]}
				lessonInsight={{
					title: "Marina's Integrated Portal Wisdom:",
					content:
						'"Notice how portals use everything you\'ve learned," Marina explained. "The modal component structure from the Northern Quarter, state management for visibility from the Eastern Quarter, form handling that persists across portal boundaries from the Western Quarter, and now navigation integration. It all connects!"',
				}}
				reflectionQuestions={[
					'How might you combine the validation patterns from forms with portal-based wizards?',
					'What about maintaining context state across nested modal interactions?',
					'Consider creating a portal system that remembers user progress, validates input before allowing portal closure, and gracefully handles errors - all while maintaining accessibility and performance.',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 24 (Morning)",
					content:
						"Marina brought me to the Portal Passages chamber today! React portals are fascinating - they let UI elements escape the normal DOM hierarchy while keeping all their React powers. Modals, tooltips, and overlays render at the document body level, but their state, events, and context still flow normally through the React tree. I created my first accessible modal with focus trapping, keyboard navigation, and smooth transitions. The key insight: portals are about WHERE elements render in the DOM, not about breaking React's component model. Binary is cataloging all the accessibility patterns!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
