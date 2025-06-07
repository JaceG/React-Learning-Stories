import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const { 
		authState,
		roleGates,
		checkPermission,
		gateStatuses 
	} = useOutletContext();

	const [selectedGate, setSelectedGate] = useState(null);
	const [testingRole, setTestingRole] = useState('visitor');

	const kingdomAreas = [
		{
			id: 'treasury',
			name: 'Royal Treasury',
			requiredRole: 'royal',
			requiredPermissions: ['financial.read', 'treasury.access'],
			description: 'Where the kingdom\'s wealth is stored',
			icon: '👑'
		},
		{
			id: 'armory',
			name: 'Knight\'s Armory',
			requiredRole: 'knight',
			requiredPermissions: ['weapons.access', 'armor.equip'],
			description: 'Equipment for the kingdom\'s defenders',
			icon: '⚔️'
		},
		{
			id: 'library',
			name: 'Scholar\'s Library',
			requiredRole: 'scholar',
			requiredPermissions: ['books.read', 'scrolls.access'],
			description: 'Ancient knowledge and wisdom',
			icon: '📚'
		},
		{
			id: 'market',
			name: 'Merchant Square',
			requiredRole: 'merchant',
			requiredPermissions: ['trade.conduct', 'goods.sell'],
			description: 'The bustling center of commerce',
			icon: '🏪'
		},
		{
			id: 'workshop',
			name: 'Artisan Workshop',
			requiredRole: 'artisan',
			requiredPermissions: ['tools.use', 'craft.create'],
			description: 'Where master crafters work their magic',
			icon: '🔨'
		}
	];

	const roleHierarchy = {
		visitor: { level: 0, inherits: [] },
		student: { level: 1, inherits: ['visitor'] },
		merchant: { level: 2, inherits: ['visitor'] },
		artisan: { level: 2, inherits: ['visitor'] },
		scholar: { level: 3, inherits: ['student', 'visitor'] },
		knight: { level: 4, inherits: ['visitor'] },
		royal: { level: 5, inherits: ['scholar', 'knight', 'merchant', 'artisan', 'student', 'visitor'] }
	};

	const checkAccess = (area, role) => {
		// Check direct role match
		if (area.requiredRole === role) return true;
		
		// Check role hierarchy
		const roleData = roleHierarchy[role];
		if (roleData && roleData.inherits.includes(area.requiredRole)) {
			return true;
		}
		
		// Royal can access everything
		if (role === 'royal') return true;
		
		return false;
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Hierarchy of Authority
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Master Param," Marina announced as they entered the grand Hall of 
					Authority, "today you'll learn the most sophisticated aspect of the 
					Guardian Gates - the <strong>hierarchy of permissions</strong>."
				</p>

				<p className='story-paragraph'>
					The hall was magnificent, with gates of different materials lining the 
					walls: bronze for merchants, silver for scholars, gold for knights, and 
					diamond for royalty. Each gate shimmered with magical runes that could 
					read not just identity, but <strong>authority levels</strong>.
				</p>

				<p className='story-paragraph'>
					"You see," Marina explained, waving her hand to illuminate the intricate 
					patterns, "not all authenticated citizens are equal. A merchant can enter 
					the market but not the armory. A scholar can access the library but not 
					the treasury. This is what we call <strong>role-based access control</strong>."
				</p>

				<p className='story-paragraph'>
					She produced a set of crystal badges, each glowing with different colors. 
					"These represent different roles in our kingdom. But here's the clever 
					part - some roles <strong>inherit permissions</strong> from others. A 
					royal, for instance, has all the permissions of every other role combined."
				</p>

				<div className='role-visualization'>
					<h3>Kingdom Authority Hierarchy</h3>
					<div className='hierarchy-pyramid'>
						{Object.entries(roleHierarchy)
							.sort((a, b) => b[1].level - a[1].level)
							.map(([role, data]) => (
								<div 
									key={role}
									className={`hierarchy-level level-${data.level} ${testingRole === role ? 'active' : ''}`}
									onClick={() => setTestingRole(role)}>
									<div className='role-badge'>
										<h4>{role.charAt(0).toUpperCase() + role.slice(1)}</h4>
										<span className='level-indicator'>Level {data.level}</span>
									</div>
									{data.inherits.length > 0 && (
										<div className='inheritance-info'>
											Inherits from: {data.inherits.join(', ')}
										</div>
									)}
								</div>
							))}
					</div>
				</div>

				<div className='gates-chamber'>
					<h3>Test the Guardian Gates</h3>
					<p className='current-role'>
						Testing as: <strong>{testingRole.charAt(0).toUpperCase() + testingRole.slice(1)}</strong>
					</p>
					
					<div className='kingdom-areas'>
						{kingdomAreas.map(area => {
							const hasAccess = checkAccess(area, testingRole);
							return (
								<div 
									key={area.id}
									className={`area-gate ${hasAccess ? 'accessible' : 'locked'} ${selectedGate?.id === area.id ? 'selected' : ''}`}
									onClick={() => setSelectedGate(area)}>
									<div className='gate-icon'>{area.icon}</div>
									<h4>{area.name}</h4>
									<p className='required-role'>Requires: {area.requiredRole}</p>
									<div className='access-indicator'>
										{hasAccess ? '✓ Access Granted' : '✗ Access Denied'}
									</div>
								</div>
							);
						})}
					</div>

					{selectedGate && (
						<div className='permission-details'>
							<h4>{selectedGate.name} Requirements</h4>
							<p>{selectedGate.description}</p>
							<div className='permission-list'>
								<h5>Required Permissions:</h5>
								<ul>
									{selectedGate.requiredPermissions.map(perm => (
										<li key={perm}>{perm}</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Implementing Role-Based Authorization
				</h3>

				<div className='code-example'>
					<pre>{`// Role-Based Route Protection
import { Navigate } from 'react-router-dom';

function RequireRole({ children, allowedRoles }) {
  const { user } = useAuth();
  
  // Check if user has any of the allowed roles
  const hasRequiredRole = user && allowedRoles.includes(user.role);
  
  if (!user) {
    // Not authenticated at all
    return <Navigate to="/login" />;
  }
  
  if (!hasRequiredRole) {
    // Authenticated but wrong role
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}

// Usage in Routes
<Route 
  path="/admin" 
  element={
    <RequireRole allowedRoles={['admin', 'super-admin']}>
      <AdminDashboard />
    </RequireRole>
  } 
/>

<Route 
  path="/moderator" 
  element={
    <RequireRole allowedRoles={['moderator', 'admin']}>
      <ModeratorPanel />
    </RequireRole>
  } 
/>`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Advanced Permission System
const permissions = {
  // Resource: Actions
  posts: ['create', 'read', 'update', 'delete'],
  users: ['read', 'update', 'ban'],
  comments: ['create', 'read', 'delete'],
  settings: ['read', 'update']
};

const rolePermissions = {
  guest: {
    posts: ['read'],
    comments: ['read']
  },
  user: {
    posts: ['create', 'read'],
    comments: ['create', 'read', 'delete'], // own comments only
    users: ['read'] // own profile only
  },
  moderator: {
    posts: ['read', 'update', 'delete'],
    comments: ['read', 'delete'],
    users: ['read', 'ban']
  },
  admin: {
    posts: ['create', 'read', 'update', 'delete'],
    users: ['read', 'update', 'ban'],
    comments: ['create', 'read', 'delete'],
    settings: ['read', 'update']
  }
};

// Permission Checking Hook
function usePermission() {
  const { user } = useAuth();
  
  const can = (resource, action) => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role];
    if (!userPermissions) return false;
    
    const resourcePermissions = userPermissions[resource];
    if (!resourcePermissions) return false;
    
    return resourcePermissions.includes(action);
  };
  
  return { can };
}

// Usage in Components
function PostActions({ post }) {
  const { can } = usePermission();
  const { user } = useAuth();
  
  return (
    <div className="post-actions">
      {can('posts', 'update') && (
        <button>Edit Post</button>
      )}
      
      {can('posts', 'delete') && (
        <button>Delete Post</button>
      )}
      
      {/* Ownership check */}
      {user?.id === post.authorId && (
        <button>Edit My Post</button>
      )}
    </div>
  );
}`}</pre>
				</div>

				<div className='authorization-patterns'>
					<h3>Common Authorization Patterns</h3>
					<div className='pattern-cards'>
						<div className='pattern-card'>
							<h4>Role-Based (RBAC)</h4>
							<p>Users have roles, roles have permissions</p>
							<code>user → role → permissions</code>
						</div>
						<div className='pattern-card'>
							<h4>Attribute-Based (ABAC)</h4>
							<p>Decisions based on attributes</p>
							<code>if (user.department === resource.department)</code>
						</div>
						<div className='pattern-card'>
							<h4>Ownership-Based</h4>
							<p>Users can only modify their own resources</p>
							<code>if (user.id === resource.ownerId)</code>
						</div>
						<div className='pattern-card'>
							<h4>Time-Based</h4>
							<p>Access varies by time or context</p>
							<code>if (isBusinessHours() && user.shift === 'day')</code>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Creating a Flexible Authorization System
class AuthorizationService {
  constructor() {
    this.policies = new Map();
  }
  
  // Register authorization policies
  register(resource, action, policy) {
    const key = \`\${resource}:\${action}\`;
    this.policies.set(key, policy);
  }
  
  // Check authorization
  async authorize(user, resource, action, context = {}) {
    const key = \`\${resource}:\${action}\`;
    const policy = this.policies.get(key);
    
    if (!policy) {
      return false; // No policy = no access
    }
    
    return await policy(user, context);
  }
}

// Define policies
const authService = new AuthorizationService();

// Admin can do anything
authService.register('*', '*', (user) => 
  user.role === 'admin'
);

// Users can edit their own posts
authService.register('post', 'edit', (user, { post }) => 
  user.id === post.authorId || user.role === 'moderator'
);

// Time-based access to reports
authService.register('report', 'view', (user) => {
  const hour = new Date().getHours();
  const isBusinessHours = hour >= 9 && hour < 17;
  return user.role === 'analyst' && isBusinessHours;
});

// Component using authorization
function SecureComponent({ resource, action, children }) {
  const { user } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    authService.authorize(user, resource, action)
      .then(setAuthorized);
  }, [user, resource, action]);
  
  if (!authorized) return null;
  return children;
}`}</pre>
				</div>

				<div className='hierarchical-roles'>
					<h3>Implementing Role Hierarchy</h3>
					<div className='code-example'>
						<pre>{`// Role Hierarchy Implementation
const roleHierarchy = {
  superAdmin: {
    level: 100,
    inherits: ['admin', 'moderator', 'user']
  },
  admin: {
    level: 80,
    inherits: ['moderator', 'user']
  },
  moderator: {
    level: 50,
    inherits: ['user']
  },
  user: {
    level: 10,
    inherits: []
  },
  guest: {
    level: 0,
    inherits: []
  }
};

function hasRole(userRole, requiredRole) {
  // Direct match
  if (userRole === requiredRole) return true;
  
  // Check inherited roles
  const userRoleData = roleHierarchy[userRole];
  if (!userRoleData) return false;
  
  return userRoleData.inherits.includes(requiredRole);
}

// Enhanced Route Guard
function RouteGuard({ 
  children, 
  requiredRole, 
  requiredPermissions = [],
  fallback = "/unauthorized" 
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const hasRequiredRole = hasRole(user.role, requiredRole);
    const hasPermissions = requiredPermissions.every(
      perm => user.permissions?.includes(perm)
    );
    
    if (!hasRequiredRole || !hasPermissions) {
      navigate(fallback);
    }
  }, [user, requiredRole, requiredPermissions]);
  
  return children;
}`}</pre>
					</div>
				</div>
			</div>

			<div className='best-practices'>
				<h3>Guardian Gate Best Practices</h3>
				<div className='practice-list'>
					<div className='practice-item'>
						<h4>Principle of Least Privilege</h4>
						<p>Grant only the minimum permissions necessary for each role</p>
					</div>
					<div className='practice-item'>
						<h4>Server-Side Validation</h4>
						<p>Never trust client-side authorization alone - always verify on the server</p>
					</div>
					<div className='practice-item'>
						<h4>Audit Trails</h4>
						<p>Log authorization decisions for security monitoring</p>
					</div>
					<div className='practice-item'>
						<h4>Graceful Degradation</h4>
						<p>Hide or disable UI elements users can't access rather than showing errors</p>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Guardian Lesson:</h3>
				<p>
					"Remember, Param - authentication asks 'Who are you?' while authorization 
					asks 'What can you do?' Both are essential for a secure kingdom. Never 
					confuse identity with permission!"
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How would you design an authorization system that balances security with 
					user experience? Consider how overly restrictive permissions might frustrate 
					users, while overly permissive ones could compromise security.
				</p>
				<p>
					What strategies would you use to manage complex permission hierarchies in 
					a large application with many different user types and resources?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;