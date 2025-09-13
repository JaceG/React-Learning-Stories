import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	const { authState, roleGates, checkPermission, gateStatuses } =
		useOutletContext();

	const [selectedGate, setSelectedGate] = useState(null);
	const [testingRole, setTestingRole] = useState('visitor');
	const [masterDemonstration, setMasterDemonstration] = useState(false);

	const kingdomAreas = [
		{
			id: 'treasury',
			name: 'Royal Treasury',
			requiredRole: 'royal',
			requiredPermissions: ['financial.read', 'treasury.access'],
			description: "Where the kingdom's wealth is stored",
			icon: '👑',
			reactIntegration: 'State-managed access tokens',
		},
		{
			id: 'armory',
			name: "Knight's Armory",
			requiredRole: 'knight',
			requiredPermissions: ['weapons.access', 'armor.equip'],
			description: "Equipment for the kingdom's defenders",
			icon: '⚔️',
			reactIntegration: 'Component-based permission checks',
		},
		{
			id: 'library',
			name: "Scholar's Library",
			requiredRole: 'scholar',
			requiredPermissions: ['books.read', 'scrolls.access'],
			description: 'Ancient knowledge and wisdom',
			icon: '📚',
			reactIntegration: 'Context-provided access levels',
		},
		{
			id: 'market',
			name: 'Merchant Square',
			requiredRole: 'merchant',
			requiredPermissions: ['trade.conduct', 'goods.sell'],
			description: 'The bustling center of commerce',
			icon: '🏪',
			reactIntegration: 'Form-validated transactions',
		},
		{
			id: 'workshop',
			name: 'Artisan Workshop',
			requiredRole: 'artisan',
			requiredPermissions: ['tools.use', 'craft.create'],
			description: 'Where master crafters work their magic',
			icon: '🔨',
			reactIntegration: 'Hook-managed tool access',
		},
	];

	const roleHierarchy = {
		visitor: { level: 0, inherits: [] },
		student: { level: 1, inherits: ['visitor'] },
		merchant: { level: 2, inherits: ['visitor'] },
		artisan: { level: 2, inherits: ['visitor'] },
		scholar: { level: 3, inherits: ['student', 'visitor'] },
		knight: { level: 4, inherits: ['visitor'] },
		royal: {
			level: 5,
			inherits: [
				'scholar',
				'knight',
				'merchant',
				'artisan',
				'student',
				'visitor',
			],
		},
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

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 3: The Ultimate Guardian Synthesis
				</h2>

				<div className='chapter-bridge'>
					<p>
						Marina led Aria to the grand Hall of Authority for the
						final lesson in route protection. Here, she would learn
						the ultimate guardian patterns - systems that integrated
						every React concept she had studied across her journey.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to the advanced guardian training," Marina
						began, her voice carrying authority and warmth. "Today,
						I'll teach you how authentication and authorization can
						become truly intelligent when combined with all React
						patterns you've learned."
					</p>

					<p className='story-paragraph'>
						Marina activated a complex authorization matrix. "Let me
						show you how everything connects. In the Northern
						Quarter, you learned that routes are components. In the
						Eastern, that permissions are state. In the Southern,
						how authority flows through props. In the Western, how
						validation guards access. Watch as we unite them all."
					</p>

					<p className='story-paragraph'>
						Aria watched with fascination as the patterns connected.
						"This is incredible! I can see how all my learning comes
						together in route protection!"
					</p>

					<p className='story-paragraph'>
						"It's not just about roles anymore," Marina explained,
						activating the demonstration. "It's about creating an
						intelligent system that understands context, preserves
						state, validates dynamically, and adapts to user
						behavior. I call it the{' '}
						<strong>Hierarchical Intelligence Pattern</strong>."
					</p>

					<p className='story-paragraph'>
						Binary displayed the integration: "System online!
						Components: INTEGRATED. State: MANAGED. Props: FLOWING.
						Hooks: ACTIVE. Forms: VALIDATED. Authorization:
						REVOLUTIONARY!"
					</p>
					<div className='role-visualization master-demonstration'>
						<h3>The Intelligent Authority System</h3>

						{!masterDemonstration && (
							<button
								className='master-demo-button'
								onClick={() => setMasterDemonstration(true)}>
								✨ Activate Master Demonstration
							</button>
						)}

						<div className='hierarchy-pyramid enhanced'>
							{Object.entries(roleHierarchy)
								.sort((a, b) => b[1].level - a[1].level)
								.map(([role, data]) => (
									<div
										key={role}
										className={`hierarchy-level level-${
											data.level
										} ${
											testingRole === role ? 'active' : ''
										}`}
										onClick={() => setTestingRole(role)}>
										<div className='role-badge'>
											<h4>
												{role.charAt(0).toUpperCase() +
													role.slice(1)}
											</h4>
											<span className='level-indicator'>
												Level {data.level}
											</span>
										</div>
										{data.inherits.length > 0 && (
											<div className='inheritance-info'>
												Inherits from:{' '}
												{data.inherits.join(', ')}
											</div>
										)}
										{masterDemonstration && (
											<div className='react-enhancement'>
												<p>
													React Pattern:{' '}
													{role === 'royal'
														? 'Context + All Patterns'
														: role === 'knight'
														? 'State-managed combat access'
														: role === 'scholar'
														? 'Hook-based knowledge gates'
														: role === 'merchant'
														? 'Form-validated commerce'
														: role === 'artisan'
														? 'Component tool access'
														: 'Basic prop flow'}
												</p>
											</div>
										)}
									</div>
								))}
						</div>
					</div>

					<div className='gates-chamber master-system'>
						<h3>Marina's Guardian System</h3>
						<p className='current-role enhanced'>
							Testing as:{' '}
							<strong>
								{testingRole.charAt(0).toUpperCase() +
									testingRole.slice(1)}
							</strong>
							{masterDemonstration && (
								<span className='master-note'>
									{' '}
									- with React integrated patterns
								</span>
							)}
						</p>

						<div className='kingdom-areas intelligent'>
							{kingdomAreas.map((area) => {
								const hasAccess = checkAccess(
									area,
									testingRole
								);
								return (
									<div
										key={area.id}
										className={`area-gate ${
											hasAccess ? 'accessible' : 'locked'
										} ${
											selectedGate?.id === area.id
												? 'selected'
												: ''
										}`}
										onClick={() => setSelectedGate(area)}>
										<div className='gate-icon'>
											{area.icon}
										</div>
										<h4>{area.name}</h4>
										<p className='required-role'>
											Requires: {area.requiredRole}
										</p>
										{masterDemonstration && (
											<p className='react-integration'>
												{area.reactIntegration}
											</p>
										)}
										<div className='access-indicator'>
											{hasAccess
												? '✓ Access Granted'
												: '✗ Access Denied'}
										</div>
									</div>
								);
							})}
						</div>

						{selectedGate && (
							<div className='permission-details enhanced'>
								<h4>{selectedGate.name} Requirements</h4>
								<p>{selectedGate.description}</p>
								<div className='permission-list'>
									<h5>Marina's Security Requirements:</h5>
									<ul>
										{selectedGate.requiredPermissions.map(
											(perm) => (
												<li key={perm}>{perm}</li>
											)
										)}
									</ul>
								</div>
								{masterDemonstration && (
									<div className='react-additions'>
										<h5>React Pattern Integration:</h5>
										<p>{selectedGate.reactIntegration}</p>
									</div>
								)}
							</div>
						)}
					</div>

					<div className='masters-collaboration'>
						<p className='story-paragraph'>
							"Watch carefully," Marina demonstrated to the
							learning group. "Each gate doesn't just check roles
							- it integrates patterns from every quarter. The
							Treasury uses state-managed tokens. The Library
							leverages context providers. The Market validates
							with forms."
						</p>

						<p className='story-paragraph'>
							Aria watched with fascination. "This is amazing!
							Authorization isn't just checking permissions, but
							creating intelligent systems that understand
							context, preserve state, and adapt to user
							behavior."
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Marina's Authorization Architecture
					</h3>
					<p className='collaboration-note'>
						Marina demonstrates the complete authorization system...
					</p>

					<div className='code-example collaborative'>
						<h3>Intelligent Role-Based Protection</h3>
						<pre>{`// Marina's Security with React Integration
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, usePermissions, useStateTracking } from './master-hooks';

// The Complete Guardian Pattern
function IntelligentRoleGuard({ 
  children, 
  allowedRoles,
  requiredPermissions = [],
  validateContext = null,
  preserveOnRedirect = true 
}) {
  // Marina's authentication
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Aria's state management
  const { preserveCurrentState } = useStateTracking();
  const { checkPermissions } = usePermissions();
  
  // Aria's context validation
  const contextValid = validateContext ? validateContext(user) : true;
  
  // Check role with hierarchy
  const hasRequiredRole = useMemo(() => {
    if (!user) return false;
    
    // Direct role match
    if (allowedRoles.includes(user.role)) return true;
    
    // Check inherited roles (Aria's pattern)
    return user.inheritedRoles?.some(role => 
      allowedRoles.includes(role)
    );
  }, [user, allowedRoles]);
  
  // Check granular permissions
  const hasRequiredPermissions = useMemo(() => {
    if (requiredPermissions.length === 0) return true;
    return checkPermissions(user, requiredPermissions);
  }, [user, requiredPermissions]);
  
  // Loading state (Eastern Quarter pattern)
  if (isLoading) {
    return (
      <div className="guardian-loading">
        <LoadingCrystal />
        <p>Verifying authorization...</p>
      </div>
    );
  }
  
  // Not authenticated
  if (!user) {
    if (preserveOnRedirect) {
      preserveCurrentState();
    }
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          requiredRoles: allowedRoles 
        }} 
      />
    );
  }
  
  // Wrong role
  if (!hasRequiredRole) {
    return (
      <Navigate 
        to="/upgrade-access" 
        state={{ 
          currentRole: user.role,
          requiredRoles: allowedRoles,
          from: location 
        }}
      />
    );
  }
  
  // Missing permissions
  if (!hasRequiredPermissions) {
    return (
      <Navigate 
        to="/insufficient-permissions" 
        state={{ 
          missing: requiredPermissions.filter(
            p => !user.permissions?.includes(p)
          )
        }}
      />
    );
  }
  
  // Context validation failed
  if (!contextValid) {
    return (
      <Navigate 
        to="/context-required" 
        state={{ from: location }}
      />
    );
  }
  
  // All checks passed!
  return children;
}`}</pre>
					</div>

					<div className='code-example'>
						<h3>The Complete Permission System</h3>
						<pre>{`// Marina's Intelligent Permission Architecture
import { createContext, useContext, useState, useEffect } from 'react';

// Permission Context (Southern Quarter pattern)
const PermissionContext = createContext();

export function IntelligentPermissionProvider({ children }) {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState({});
  const [permissionCache, setPermissionCache] = useState({});
  
  // Aria's pattern: Dynamic permission loading
  useEffect(() => {
    if (user) {
      loadUserPermissions(user).then(perms => {
        setPermissions(perms);
      });
    }
  }, [user]);
  
  // Marina's security + Aria's intelligence
  const can = (resource, action, context = {}) => {
    // Check cache first (performance optimization)
    const cacheKey = \`\${resource}:\${action}:\${JSON.stringify(context)}\`;
    if (permissionCache[cacheKey] !== undefined) {
      return permissionCache[cacheKey];
    }
    // Hierarchical permission check
    const hasPermission = checkHierarchicalPermission(
      user,
      permissions,
      resource,
      action,
      context
    );
    
    // Cache result
    setPermissionCache(prev => ({
      ...prev,
      [cacheKey]: hasPermission
    }));
    
    return hasPermission;
  };
  
  // Aria's addition: Contextual permissions
  const canWithContext = (resource, action, entityContext) => {
    // Check basic permission
    if (!can(resource, action)) return false;
    
    // Check ownership
    if (entityContext.ownerId && user.id === entityContext.ownerId) {
      return true;
    }
    
    // Check department/team access
    if (entityContext.departmentId && 
        user.departments?.includes(entityContext.departmentId)) {
      return true;
    }
    
    // Check temporal permissions
    if (entityContext.timeRestricted) {
      return checkTimeBasedAccess(user, entityContext);
    }
    
    return can(resource, action);
  };
  
  // Bulk permission checking (for UI rendering)
  const canMany = (checks) => {
    return checks.map(({ resource, action, context }) => 
      can(resource, action, context)
    );
  };
  
  return (
    <PermissionContext.Provider value={{
      can,
      canWithContext,
      canMany,
      permissions,
      refreshPermissions: () => loadUserPermissions(user)
    }}>
      {children}
    </PermissionContext.Provider>
  );
}

// The Master Permission Hook
export function useIntelligentPermissions() {
  const context = useContext(PermissionContext);
  const { trackAction } = useAnalytics();
  
  // Track permission checks for security auditing
  const canWithAudit = (resource, action, context) => {
    const result = context.can(resource, action, context);
    
    trackAction('permission_check', {
      resource,
      action,
      granted: result,
      timestamp: Date.now()
    });
    
    return result;
  };
  
  return {
    ...context,
    can: canWithAudit
  };
}`}</pre>
					</div>

					<div className='authorization-patterns enhanced'>
						<h3>Marina's Authorization Patterns</h3>
						<div className='pattern-cards master-edition'>
							<div className='pattern-card'>
								<h4>Intelligent RBAC</h4>
								<p className='marina'>
									Marina: Role hierarchies
								</p>
								<p className='aria'>
									Integration: + State preservation
								</p>
								<code>user → role → context → permissions</code>
							</div>
							<div className='pattern-card'>
								<h4>Dynamic ABAC</h4>
								<p className='marina'>
									Marina: Attribute checks
								</p>
								<p className='aria'>
									Integration: + Hook-based logic
								</p>
								<code>useAttributeAuth(user, resource)</code>
							</div>
							<div className='pattern-card'>
								<h4>Stateful Ownership</h4>
								<p className='marina'>
									Marina: Owner validation
								</p>
								<p className='aria'>
									Integration: + Context tracking
								</p>
								<code>useOwnership(resource, context)</code>
							</div>
							<div className='pattern-card'>
								<h4>Reactive Time-Based</h4>
								<p className='marina'>Marina: Time windows</p>
								<p className='aria'>
									Integration: + Effect updates
								</p>
								<code>useTimeBasedAccess(schedule)</code>
							</div>
						</div>
						<div className='pattern-explanation'>
							<p className='story-paragraph'>
								"Each pattern builds on traditional
								authorization," Marina explained. "We're not
								just checking permissions - we're creating
								reactive, intelligent systems that adapt to
								context and user behavior."
							</p>
						</div>
					</div>

					<div className='code-example'>
						<h3>The Ultimate Authorization System</h3>
						<pre>{`// Marina's Complete Authorization Architecture
import { useState, useEffect, useCallback, useMemo } from 'react';

// The Master Authorization Service
class IntelligentAuthorizationService {
  constructor() {
    this.policies = new Map();
    this.cache = new Map();
    this.subscribers = new Set();
  }
  
  // Register intelligent policies
  register(resource, action, policy, options = {}) {
    const key = \`\${resource}:\${action}\`;
    
    // Aria's enhancement: Policy metadata
    this.policies.set(key, {
      policy,
      cacheable: options.cacheable ?? true,
      ttl: options.ttl ?? 300000, // 5 min default
      dependencies: options.dependencies ?? [],
      description: options.description
    });
    
    // Notify subscribers of policy change
    this.notifySubscribers(key);
  }
  
  // Check authorization with intelligence
  async authorize(user, resource, action, context = {}) {
    const key = \`\${resource}:\${action}\`;
    const policyData = this.policies.get(key);
    
    // Check wildcard policies first
    const wildcardPolicy = this.policies.get('*:*');
    if (wildcardPolicy) {
      const wildcardResult = await wildcardPolicy.policy(user, context);
      if (wildcardResult) return true;
    }
    
    if (!policyData) {
      return false; // No policy = no access
    }
    
    // Check cache (Aria's optimization)
    if (policyData.cacheable) {
      const cacheKey = \`\${key}:\${user.id}:\${JSON.stringify(context)}\`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < policyData.ttl) {
        return cached.result;
      }
    }
    
    // Execute policy with dependency injection
    const deps = await this.resolveDependencies(policyData.dependencies);
    const result = await policyData.policy(user, context, deps);
    
    // Cache result
    if (policyData.cacheable) {
      const cacheKey = \`\${key}:\${user.id}:\${JSON.stringify(context)}\`;
      this.cache.set(cacheKey, {
        result,
        timestamp: Date.now()
      });
    }
    
    return result;
  }
  
  // Aria's addition: Reactive authorization
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  notifySubscribers(key) {
    this.subscribers.forEach(cb => cb(key));
  }
}

// Initialize the service
const authService = new IntelligentAuthorizationService();

// Register intelligent policies

// Marina's base: Admin can do anything
authService.register('*', '*', 
  (user) => user.role === 'admin',
  { description: 'Global admin access' }
);

// Aria's pattern: Contextual post editing
authService.register('post', 'edit', 
  async (user, { post }, { permissionService }) => {
    // Owner can always edit
    if (user.id === post.authorId) return true;
    
    // Check temporal permissions
    if (post.locked && !user.canUnlock) return false;
    
    // Check department permissions
    if (post.departmentId && 
        await permissionService.canAccessDepartment(user, post.departmentId)) {
      return true;
    }
    
    // Moderators can edit public posts
    return user.role === 'moderator' && post.visibility === 'public';
  },
  { 
    cacheable: true,
    ttl: 60000,
    dependencies: ['permissionService'],
    description: 'Intelligent post editing policy'
  }
);

// Time and context aware reporting
authService.register('report', 'view',
  async (user, { reportType }, { timeService, analyticsService }) => {
    // Check basic role
    if (!['analyst', 'manager', 'admin'].includes(user.role)) {
      return false;
    }
    
    // Time-based access
    const currentTime = timeService.getCurrentTime();
    const isBusinessHours = currentTime.hour >= 9 && currentTime.hour < 17;
    
    // Analysts only during business hours
    if (user.role === 'analyst' && !isBusinessHours) {
      return false;
    }
    
    // Check report-specific permissions
    const hasReportAccess = await analyticsService.checkReportAccess(
      user,
      reportType
    );
    
    return hasReportAccess;
  },
  {
    cacheable: false, // Time-sensitive, don't cache
    description: 'Time and role based report access'
  }
);

// The Master Authorization Hook
export function useMasterAuthorization() {
  const { user } = useAuth();
  const [policies, setPolicies] = useState([]);
  
  // Subscribe to policy changes
  useEffect(() => {
    const unsubscribe = authService.subscribe((changedKey) => {
      // Re-evaluate permissions when policies change
      setPolicies(prev => [...prev, changedKey]);
    });
    
    return unsubscribe;
  }, []);
  
  const can = useCallback(async (resource, action, context = {}) => {
    if (!user) return false;
    
    try {
      return await authService.authorize(user, resource, action, context);
    } catch (error) {
      console.error('Authorization error:', error);
      return false;
    }
  }, [user]);
  
  // Bulk permission checking
  const canMany = useCallback(async (checks) => {
    const results = await Promise.all(
      checks.map(({ resource, action, context }) => 
        can(resource, action, context)
      )
    );
    
    return checks.map((check, index) => ({
      ...check,
      allowed: results[index]
    }));
  }, [can]);
  
  // UI helper: Hide/show based on permissions
  const PermissionGate = useCallback(({ 
    resource, 
    action, 
    context = {},
    children,
    fallback = null 
  }) => {
    const [allowed, setAllowed] = useState(false);
    const [checking, setChecking] = useState(true);
    
    useEffect(() => {
      can(resource, action, context).then(result => {
        setAllowed(result);
        setChecking(false);
      });
    }, [resource, action, context]);
    
    if (checking) return null;
    return allowed ? children : fallback;
  }, [can]);
  
  return {
    can,
    canMany,
    PermissionGate,
    refreshPolicies: () => authService.clearCache()
  };
}`}</pre>
					</div>

					<div className='masters-finale'>
						<h3>The Grand Authorization Synthesis</h3>
						<p className='story-paragraph'>
							Marina demonstrated the complete system to the
							learning group. "This shows how we can take simple
							role checks and transform them into an intelligent,
							reactive authorization system," she explained.
						</p>

						<p className='story-paragraph'>
							Aria studied the patterns with growing
							understanding. "I can see how hooks enable
							permission checking, state handles caching, context
							manages distribution, and effects provide
							reactivity. It all works together!"
						</p>

						<p className='story-paragraph'>
							Marina smiled with teaching satisfaction. "This is
							what learning looks like. By applying your
							comprehensive React foundation to navigation
							security concepts, you've understood something
							profound."
						</p>

						<p className='story-paragraph'>
							"I can see how every pattern has its place!" Aria
							marveled. "Components render based on permissions.
							State tracks authorization. Props pass access
							rights. Hooks manage permission logic. Forms
							validate before granting access. And routes
							orchestrate it all. This is the true power of React
							- everything connects."
						</p>
					</div>
				</div>

				<div className='best-practices enhanced'>
					<h3>Marina's Authorization Principles</h3>
					<div className='practice-list master-edition'>
						<div className='practice-item'>
							<h4>Intelligent Least Privilege</h4>
							<p className='marina'>
								Marina: Minimal necessary permissions
							</p>
							<p className='aria'>
								Integration: + Context-aware adjustments
							</p>
						</div>
						<div className='practice-item'>
							<h4>Full-Stack Validation</h4>
							<p className='marina'>
								Marina: Server verification required
							</p>
							<p className='aria'>
								Integration: + Client optimization for UX
							</p>
						</div>
						<div className='practice-item'>
							<h4>Reactive Audit System</h4>
							<p className='marina'>Marina: Log all decisions</p>
							<p className='aria'>
								Integration: + Real-time monitoring hooks
							</p>
						</div>
						<div className='practice-item'>
							<h4>Progressive Enhancement</h4>
							<p className='marina'>
								Marina: Hide unauthorized elements
							</p>
							<p className='aria'>
								Integration: Predictive permission loading
							</p>
						</div>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Marina's Ultimate Guardian Wisdom:</h3>
					<p>
						Marina addressed the chamber, her teaching resonating
						through the hall. "Authentication asks 'Who are you?'"
						she began.
					</p>
					<p>
						"Authorization asks 'What can you do?'" Marina
						continued.
					</p>
					<p>
						"But intelligent authorization," Marina concluded, "asks
						'What should you be able to do in this context, at this
						time, with your history, considering the current state
						of the application?'"
					</p>
					<p className='story-paragraph'>
						Binary's final projection lit up the chamber: "Guardian
						Gates evolution complete! Basic checks: TRANSCENDED.
						Intelligent authorization: ACHIEVED. Marina's teaching +
						Aria's learning: EXCELLENT. Future students will study
						this system for generations!"
					</p>
					<p className='story-paragraph'>
						Marina smiled with the satisfaction of a teacher whose
						student had grasped complex concepts. Aria had learned
						to protect routes using advanced patterns that
						integrated everything she'd studied across the React
						Kingdom.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does integrating all React patterns (components,
						state, props, hooks, forms, and routing) create a more
						intelligent authorization system than traditional role
						checks?
					</p>
					<p className='story-paragraph'>
						What benefits come from treating authorization as a
						reactive, contextual system rather than static
						permission lists?
					</p>
					<p className='story-paragraph'>
						How does Aria's journey through every quarter of the
						React Kingdom help her understand Marina's authorization
						architecture concepts?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
