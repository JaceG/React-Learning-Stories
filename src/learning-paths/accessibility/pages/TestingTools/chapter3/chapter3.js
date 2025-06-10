import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [activePhase, setActivePhase] = useState('awareness');
	const [teamReadiness, setTeamReadiness] = useState(0);
	const [selectedInitiative, setSelectedInitiative] = useState(null);
	const [championNetwork, setChampionNetwork] = useState([]);
	const [maturityLevel, setMaturityLevel] = useState(1);
	
	const { 
		teamCulture,
		setTeamCulture,
		buildCulture,
		complianceScore
	} = useOutletContext();

	const culturePillars = [
		{
			id: 'training',
			name: 'Education & Training',
			icon: '📚',
			description: 'Regular accessibility workshops and learning paths',
			initiatives: [
				'Weekly accessibility tips',
				'Lunch & learn sessions',
				'Certification programs',
				'Hands-on workshops'
			]
		},
		{
			id: 'documentation',
			name: 'Living Documentation',
			icon: '📖',
			description: 'Accessible patterns library and best practices',
			initiatives: [
				'Component documentation',
				'Accessibility guidelines',
				'Decision records',
				'Success stories'
			]
		},
		{
			id: 'codeReviews',
			name: 'Inclusive Code Reviews',
			icon: '👀',
			description: 'Accessibility checks in every PR',
			initiatives: [
				'A11y checklist in PR template',
				'Automated PR checks',
				'Peer review guidelines',
				'Accessibility champions'
			]
		},
		{
			id: 'userTesting',
			name: 'User Involvement',
			icon: '👥',
			description: 'Include users with disabilities in testing',
			initiatives: [
				'Disability advisory board',
				'Regular user testing',
				'Feedback channels',
				'Co-design sessions'
			]
		},
		{
			id: 'cicd',
			name: 'Automated Excellence',
			icon: '🔄',
			description: 'Build accessibility into CI/CD pipeline',
			initiatives: [
				'Pre-commit hooks',
				'Build-time checks',
				'Deployment gates',
				'Monitoring alerts'
			]
		}
	];

	const maturityStages = [
		{
			level: 1,
			name: 'Awareness',
			description: 'Team understands accessibility importance',
			milestones: [
				'Basic WCAG knowledge',
				'Screen reader demos attended',
				'Accessibility champion identified'
			]
		},
		{
			level: 2,
			name: 'Adoption',
			description: 'Active implementation of practices',
			milestones: [
				'Testing tools installed',
				'First audits completed',
				'Basic fixes implemented'
			]
		},
		{
			level: 3,
			name: 'Integration',
			description: 'Accessibility part of workflow',
			milestones: [
				'Automated testing in CI',
				'Regular audits scheduled',
				'Team trained on tools'
			]
		},
		{
			level: 4,
			name: 'Optimization',
			description: 'Continuous improvement culture',
			milestones: [
				'Proactive accessibility design',
				'User testing program',
				'Mentoring others'
			]
		},
		{
			level: 5,
			name: 'Innovation',
			description: 'Leading accessibility practices',
			milestones: [
				'Contributing to standards',
				'Open source tools',
				'Industry leadership'
			]
		}
	];

	const teamActivities = [
		{
			name: 'Empathy Lab',
			duration: '2 hours',
			description: 'Experience disabilities through simulation',
			impact: 'High',
			activities: [
				'Screen reader navigation',
				'One-handed browsing',
				'Color blindness filters',
				'Cognitive load exercises'
			]
		},
		{
			name: 'A11y Game Day',
			duration: '4 hours',
			description: 'Gamified accessibility challenges',
			impact: 'High',
			activities: [
				'Bug hunt competition',
				'Speed fixing contest',
				'Design challenges',
				'Knowledge quiz'
			]
		},
		{
			name: 'Guest Speakers',
			duration: '1 hour',
			description: 'Learn from users with disabilities',
			impact: 'Very High',
			activities: [
				'User stories',
				'Live demonstrations',
				'Q&A sessions',
				'Feedback collection'
			]
		}
	];

	const implementationRoadmap = [
		{
			phase: 'awareness',
			name: 'Build Awareness',
			duration: '1-2 months',
			activities: [
				'Executive buy-in',
				'Team introduction',
				'Initial training',
				'Set goals'
			]
		},
		{
			phase: 'foundation',
			name: 'Lay Foundation',
			duration: '2-3 months',
			activities: [
				'Install tools',
				'Create guidelines',
				'First audits',
				'Quick wins'
			]
		},
		{
			phase: 'practice',
			name: 'Embed Practice',
			duration: '3-6 months',
			activities: [
				'Regular testing',
				'Code reviews',
				'User feedback',
				'Iterate process'
			]
		},
		{
			phase: 'culture',
			name: 'Sustain Culture',
			duration: 'Ongoing',
			activities: [
				'Continuous learning',
				'Measure impact',
				'Celebrate wins',
				'Share knowledge'
			]
		}
	];

	const calculateTeamReadiness = () => {
		const factors = Object.values(teamCulture);
		const ready = factors.filter(f => f).length;
		const total = factors.length;
		setTeamReadiness(Math.round((ready / total) * 100));
	};

	const addChampion = (name) => {
		setChampionNetwork(prev => [...prev, {
			id: Date.now(),
			name,
			joinedAt: new Date().toISOString()
		}]);
	};

	const progressToNextLevel = () => {
		if (maturityLevel < 5) {
			setMaturityLevel(prev => prev + 1);
		}
	};

	return (
		<div className='chapter testing-tools'>
			<h2 className='chapter-title'>
				Chapter 3: The Culture Citadel
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Culture Citadel glowed with shared purpose. <strong>Culture Keeper</strong> 
					welcomed them warmly. "Tools and standards are important, but culture makes 
					accessibility sustainable."
				</p>
				
				<p className='story-paragraph'>
					Aria understood. "It's not just about fixing issues - it's about preventing them!"
				</p>

				<p className='story-paragraph'>
					"Exactly. When every team member champions inclusion, accessibility becomes 
					natural. Build it into your DNA."
				</p>

				<p className='story-paragraph'>
					Binary calculated the impact. "Teams with accessibility culture ship 73% 
					fewer a11y bugs. ROI: Positive. Efficiency: Maximized!"
				</p>

				<p className='story-paragraph'>
					Debuggora saw the bigger picture. "We're not just building accessible products - 
					we're building an inclusive future. Every team member is part of this."
				</p>

				<p className='story-paragraph'>
					Culture Keeper smiled. "You understand. Accessibility isn't a destination - 
					it's a journey we take together. Make it part of everything you do."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Culture Building Center</h3>
				
				<div className='culture-citadel'>
					<h4 style={{ marginBottom: '20px' }}>The Five Pillars of Accessibility Culture</h4>
					
					<div className='culture-pillars'>
						{culturePillars.map((pillar) => (
							<div
								key={pillar.id}
								className={`culture-pillar ${teamCulture[pillar.id] ? 'established' : ''}`}
								onClick={() => {
									if (!teamCulture[pillar.id]) {
										buildCulture(pillar.id);
										setSelectedInitiative(pillar.id);
										setTimeout(calculateTeamReadiness, 100);
									}
								}}
							>
								<span className='pillar-icon'>{pillar.icon}</span>
								<div className='pillar-name'>{pillar.name}</div>
								<div className='pillar-description'>{pillar.description}</div>
								
								{teamCulture[pillar.id] && (
									<div style={{ marginTop: '15px', fontSize: '0.9em', color: '#4CAF50' }}>
										✓ Established
									</div>
								)}
							</div>
						))}
					</div>

					{selectedInitiative && (
						<div style={{
							marginTop: '30px',
							padding: '20px',
							background: 'rgba(156, 39, 176, 0.1)',
							borderRadius: '10px',
							border: '1px solid rgba(156, 39, 176, 0.3)'
						}}>
							<h5 style={{ marginTop: 0 }}>
								{culturePillars.find(p => p.id === selectedInitiative)?.name} Initiatives:
							</h5>
							<ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
								{culturePillars.find(p => p.id === selectedInitiative)?.initiatives.map((init, idx) => (
									<li key={idx} style={{ marginBottom: '5px' }}>{init}</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className='team-progress' style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Team Readiness Assessment</h3>
					
					<div className='progress-item'>
						<div className='progress-label'>
							<span>Culture Implementation</span>
							<span>{teamReadiness}%</span>
						</div>
						<div className='progress-bar'>
							<div 
								className='progress-fill' 
								style={{ width: `${teamReadiness}%` }}
							/>
						</div>
					</div>

					<div className='progress-item'>
						<div className='progress-label'>
							<span>Technical Compliance</span>
							<span>{complianceScore}%</span>
						</div>
						<div className='progress-bar'>
							<div 
								className='progress-fill' 
								style={{ width: `${complianceScore}%` }}
							/>
						</div>
					</div>
				</div>

				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Accessibility Maturity Journey</h3>
					
					<div className='demo-controls' style={{ marginBottom: '20px' }}>
						{maturityStages.map((stage) => (
							<button
								key={stage.level}
								onClick={() => setMaturityLevel(stage.level)}
								className={`demo-button ${maturityLevel === stage.level ? 'active' : ''}`}
								style={{
									opacity: stage.level > maturityLevel + 1 ? 0.5 : 1,
									cursor: stage.level > maturityLevel + 1 ? 'not-allowed' : 'pointer'
								}}
							>
								Level {stage.level}: {stage.name}
							</button>
						))}
					</div>

					{maturityStages.map((stage) => (
						stage.level === maturityLevel && (
							<div key={stage.level} style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: '10px'
							}}>
								<h4>{stage.name}</h4>
								<p style={{ margin: '10px 0' }}>{stage.description}</p>
								<h5 style={{ marginTop: '20px' }}>Key Milestones:</h5>
								<ul style={{ paddingLeft: '20px' }}>
									{stage.milestones.map((milestone, idx) => (
										<li key={idx} style={{ marginBottom: '5px' }}>
											{milestone}
										</li>
									))}
								</ul>
								{maturityLevel < 5 && (
									<button
										onClick={progressToNextLevel}
										style={{
											marginTop: '20px',
											padding: '10px 25px',
											background: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
											border: 'none',
											borderRadius: '20px',
											color: 'white',
											cursor: 'pointer'
										}}
									>
										Progress to Level {maturityLevel + 1}
									</button>
								)}
							</div>
						)
					))}
				</div>

				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Implementation Roadmap</h3>
					
					<div className='demo-controls' style={{ marginBottom: '20px' }}>
						{implementationRoadmap.map((phase) => (
							<button
								key={phase.phase}
								onClick={() => setActivePhase(phase.phase)}
								className={`demo-button ${activePhase === phase.phase ? 'active' : ''}`}
							>
								{phase.name}
							</button>
						))}
					</div>

					{implementationRoadmap.map((phase) => (
						phase.phase === activePhase && (
							<div key={phase.phase} style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: '10px'
							}}>
								<h4>{phase.name}</h4>
								<p style={{ margin: '10px 0' }}>
									<strong>Duration:</strong> {phase.duration}
								</p>
								<h5>Key Activities:</h5>
								<div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
									{phase.activities.map((activity, idx) => (
										<div key={idx} style={{
											padding: '10px',
											background: 'rgba(255, 255, 255, 0.05)',
											borderRadius: '5px',
											display: 'flex',
											alignItems: 'center'
										}}>
											<span style={{ marginRight: '10px' }}>
												{idx + 1}.
											</span>
											{activity}
										</div>
									))}
								</div>
							</div>
						)
					))}
				</div>

				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Team Building Activities</h3>
					
					<div style={{ display: 'grid', gap: '20px' }}>
						{teamActivities.map((activity, idx) => (
							<div key={idx} style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: '10px',
								border: '2px solid rgba(76, 175, 80, 0.3)'
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<h4 style={{ margin: 0 }}>{activity.name}</h4>
									<div style={{ display: 'flex', gap: '10px' }}>
										<span style={{
											padding: '5px 15px',
											background: 'rgba(255, 193, 7, 0.2)',
											borderRadius: '15px',
											fontSize: '0.9em'
										}}>
											{activity.duration}
										</span>
										<span style={{
											padding: '5px 15px',
											background: activity.impact === 'Very High' ? 
												'rgba(76, 175, 80, 0.2)' : 'rgba(33, 150, 243, 0.2)',
											borderRadius: '15px',
											fontSize: '0.9em'
										}}>
											Impact: {activity.impact}
										</span>
									</div>
								</div>
								<p style={{ margin: '10px 0' }}>{activity.description}</p>
								<div style={{ marginTop: '15px' }}>
									<strong>Activities:</strong>
									<ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
										{activity.activities.map((act, i) => (
											<li key={i} style={{ fontSize: '0.9em' }}>{act}</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Accessibility Champions Network</h3>
					
					<div style={{
						padding: '20px',
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '10px'
					}}>
						<p style={{ marginBottom: '20px' }}>
							Build a network of accessibility champions across your organization:
						</p>
						
						<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
							<input
								type='text'
								placeholder='Champion name'
								id='champion-input'
								style={{
									flex: 1,
									padding: '10px',
									background: 'rgba(255, 255, 255, 0.1)',
									border: '1px solid rgba(255, 255, 255, 0.3)',
									borderRadius: '5px',
									color: 'white'
								}}
							/>
							<button
								onClick={() => {
									const input = document.getElementById('champion-input');
									if (input.value) {
										addChampion(input.value);
										input.value = '';
									}
								}}
								style={{
									padding: '10px 20px',
									background: 'linear-gradient(135deg, #4CAF50, #45a049)',
									border: 'none',
									borderRadius: '5px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								Add Champion
							</button>
						</div>

						{championNetwork.length > 0 ? (
							<div style={{ display: 'grid', gap: '10px' }}>
								{championNetwork.map((champion) => (
									<div key={champion.id} style={{
										padding: '10px',
										background: 'rgba(76, 175, 80, 0.1)',
										borderRadius: '5px',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
										<span>🏆 {champion.name}</span>
										<span style={{ fontSize: '0.85em', color: '#7f8c8d' }}>
											Joined {new Date(champion.joinedAt).toLocaleDateString()}
										</span>
									</div>
								))}
							</div>
						) : (
							<p style={{ color: '#7f8c8d', textAlign: 'center' }}>
								No champions yet. Be the first!
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Building Accessibility Culture</span>
					<span className='discovered-by'>Culture Keeper's wisdom</span>
				</div>
				<pre>{`# Building an Accessibility-First Culture
// Culture Keeper: "Make inclusion everyone's responsibility!"

# Starting the Journey

## Getting Executive Buy-In
// Aria: "Leadership support is crucial!"

const businessCase = {
  marketReach: {
    fact: '15% of global population has disabilities',
    value: '$13 trillion in annual disposable income',
    impact: 'Expand addressable market'
  },
  
  legalRisk: {
    fact: 'ADA lawsuits increased 300% in 5 years',
    cost: 'Average settlement: $25,000-$75,000',
    impact: 'Avoid litigation and reputation damage'
  },
  
  innovation: {
    fact: 'Accessible design improves UX for all',
    examples: ['Curb cuts', 'Voice assistants', 'Captions'],
    impact: 'Drive innovation through constraints'
  },
  
  talent: {
    fact: 'Inclusive companies attract top talent',
    stat: '2x more likely to outperform peers',
    impact: 'Build diverse, innovative teams'
  }
};

## Team Education Program
// Binary: "Knowledge distribution = Culture multiplication!"

class AccessibilityEducation {
  constructor() {
    this.curriculum = {
      beginner: [
        'What is Web Accessibility?',
        'Understanding Disabilities',
        'WCAG Basics',
        'Using Screen Readers'
      ],
      intermediate: [
        'Semantic HTML Deep Dive',
        'ARIA Patterns',
        'Testing Strategies',
        'Common Pitfalls'
      ],
      advanced: [
        'Complex Widget Patterns',
        'Performance & A11y',
        'Accessibility APIs',
        'Contributing to Standards'
      ]
    };
  }
  
  createLearningPath(role) {
    const paths = {
      developer: [
        ...this.curriculum.beginner,
        'Accessible JavaScript',
        'Testing Tools',
        'Component Patterns'
      ],
      designer: [
        ...this.curriculum.beginner,
        'Color & Contrast',
        'Accessible Typography',
        'Inclusive Design Patterns'
      ],
      qa: [
        ...this.curriculum.beginner,
        'Manual Testing',
        'Automated Testing',
        'Writing A11y Test Cases'
      ],
      pm: [
        ...this.curriculum.beginner,
        'User Stories for A11y',
        'Prioritizing Issues',
        'Compliance Requirements'
      ]
    };
    
    return paths[role] || this.curriculum.beginner;
  }
  
  trackProgress(userId, completed) {
    // Store progress
    // Generate certificates
    // Unlock next level
  }
}

# Embedding in Workflow

## Accessibility in Agile
// Debuggora: "Build it into every sprint!"

const accessibleScrum = {
  planning: {
    userStories: \`
      As a [user with disability]
      I want to [accomplish task]
      So that [achieve goal]
    \`,
    acceptanceCriteria: [
      'Keyboard navigable',
      'Screen reader compatible',
      'WCAG AA compliant',
      'Error messages clear'
    ]
  },
  
  development: {
    definitionOfReady: [
      'A11y requirements defined',
      'Design reviewed for a11y',
      'Test cases include a11y'
    ],
    definitionOfDone: [
      'Automated tests pass',
      'Manual testing complete',
      'Screen reader tested',
      'Keyboard accessible'
    ]
  },
  
  review: {
    sprintDemo: [
      'Demo with keyboard only',
      'Show screen reader usage',
      'Highlight a11y features'
    ],
    retrospective: [
      'What a11y issues found?',
      'How can we prevent them?',
      'Training needs?'
    ]
  }
};

## Code Review Checklist
// Every PR should include

const a11yReviewChecklist = {
  html: [
    'Semantic elements used',
    'Headings hierarchical',
    'Landmarks present',
    'Lang attribute set'
  ],
  
  interactions: [
    'Keyboard accessible',
    'Focus visible',
    'Focus order logical',
    'No keyboard traps'
  ],
  
  forms: [
    'Labels associated',
    'Errors identified',
    'Required marked',
    'Instructions clear'
  ],
  
  media: [
    'Images have alt text',
    'Videos have captions',
    'Audio has transcripts',
    'Animations can pause'
  ],
  
  aria: [
    'Roles appropriate',
    'States updated',
    'Properties accurate',
    'Live regions used'
  ]
};

# Building Champions Network

## Champion Responsibilities
function AccessibilityChampion(teamMember) {
  return {
    ...teamMember,
    responsibilities: [
      'Lead by example',
      'Share knowledge',
      'Review PRs for a11y',
      'Advocate for users',
      'Track team progress'
    ],
    
    activities: {
      weekly: [
        'Share a11y tip',
        'Review one PR',
        'Test one feature'
      ],
      monthly: [
        'Run team workshop',
        'Audit one page',
        'Update documentation'
      ],
      quarterly: [
        'Present learnings',
        'Set team goals',
        'Celebrate wins'
      ]
    },
    
    resources: {
      time: '10% allocation',
      training: 'Priority access',
      tools: 'Premium licenses',
      support: 'Direct mentorship'
    }
  };
}

## Recognition Program
const recognitionSystem = {
  badges: {
    firstBug: '🐛 Bug Hunter',
    tenFixes: '🔧 Fix Master',
    screenReader: '🔊 Screen Reader Pro',
    mentor: '👨‍🏫 A11y Mentor',
    innovation: '💡 Innovation Award'
  },
  
  rewards: {
    individual: [
      'Conference tickets',
      'Training courses',
      'Book allowance',
      'Extra time off'
    ],
    team: [
      'Team lunch',
      'Hackathon day',
      'Charity donation',
      'Team trophy'
    ]
  },
  
  celebrate(achievement) {
    // Announce in team meeting
    // Post in Slack
    // Add to performance review
    // Update team dashboard
  }
};

# Measurement & Metrics

## Culture Health Metrics
class CultureMetrics {
  constructor() {
    this.metrics = {
      awareness: 0,
      adoption: 0,
      proficiency: 0,
      advocacy: 0
    };
  }
  
  measure() {
    return {
      // Quantitative
      trainingCompletion: this.getTrainingStats(),
      issuesFound: this.getIssueStats(),
      fixTime: this.getFixTimeStats(),
      testCoverage: this.getTestStats(),
      
      // Qualitative
      surveyResults: this.getSurveyData(),
      userFeedback: this.getUserTestResults(),
      championGrowth: this.getChampionStats()
    };
  }
  
  generateDashboard() {
    return {
      scorecard: {
        overall: this.calculateMaturity(),
        trend: this.getTrend(),
        nextSteps: this.getRecommendations()
      },
      
      teamView: {
        trained: this.metrics.awareness,
        practicing: this.metrics.adoption,
        proficient: this.metrics.proficiency,
        teaching: this.metrics.advocacy
      }
    };
  }
}

# Sustaining Momentum

## Continuous Improvement
const sustainabilityPlan = {
  shortTerm: {
    wins: [
      'Fix top 5 issues',
      'Train core team',
      'Add basic testing'
    ],
    timeline: '1-3 months'
  },
  
  mediumTerm: {
    goals: [
      'Embed in process',
      'Expand testing',
      'User involvement'
    ],
    timeline: '3-6 months'
  },
  
  longTerm: {
    vision: [
      'Culture transformation',
      'Industry leadership',
      'Open source contribution'
    ],
    timeline: '6+ months'
  }
};

## Making it Stick
// Culture Keeper: "Consistency creates culture!"

const habitFormation = {
  cue: 'New feature planning',
  routine: 'Include a11y requirements',
  reward: 'Smoother development',
  
  reinforcement: {
    daily: 'Accessibility tip in standup',
    weekly: 'Champion shoutouts',
    monthly: 'Team metrics review',
    quarterly: 'Celebration events'
  }
};

# Resources & Support

## Internal Resources
const internalSupport = {
  documentation: {
    wiki: 'Accessibility guidelines',
    patterns: 'Component library',
    checklist: 'Testing protocols',
    faq: 'Common questions'
  },
  
  people: {
    champions: 'Local experts',
    mentors: 'Senior guidance',
    allies: 'Executive sponsors',
    users: 'Advisory board'
  },
  
  tools: {
    testing: 'Licensed tools',
    learning: 'Course subscriptions',
    assistive: 'Screen readers',
    development: 'IDE plugins'
  }
};

## External Community
const communityConnections = {
  organizations: [
    'W3C WAI',
    'WebAIM',
    'A11y Project',
    'Deque University'
  ],
  
  events: [
    'Global Accessibility Awareness Day',
    'Inclusive Design 24',
    'CSUN Conference',
    'Local meetups'
  ],
  
  contribute: [
    'Open source projects',
    'Blog about learnings',
    'Speak at conferences',
    'Mentor others'
  ]
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Culture Lesson:</h3>
				<p>
					Culture Keeper reveals the ultimate truth: tools and standards are important, 
					but culture makes accessibility sustainable. When every team member understands, 
					values, and practices accessibility, it becomes part of your organization's DNA. 
					This isn't achieved overnight—it requires consistent effort, executive support, 
					continuous learning, and celebration of progress. By building a network of 
					champions, embedding accessibility into every process, and measuring both 
					technical and cultural metrics, you create an environment where inclusion 
					thrives. Remember: accessibility culture isn't about perfection; it's about 
					continuous improvement and shared commitment to building a web that works 
					for everyone.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How can you become an accessibility champion in your organization and 
					inspire others to join the journey?
				</p>
				<p>
					What would change in your team's output if accessibility was considered 
					from the very beginning of every project?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;