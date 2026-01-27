import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [activeAuditType, setActiveAuditType] = useState('wcag');
	const [currentSeverity, setCurrentSeverity] = useState('all');
	const [selectedStandard, setSelectedStandard] = useState('WCAG 2.1');
	const [auditProgress, setAuditProgress] = useState(0);
	const [reportFormat, setReportFormat] = useState('detailed');
	
	const { 
		wcagLevel,
		setWcagLevel,
		auditFindings,
		addAuditFinding,
		complianceScore,
		calculateComplianceScore,
		testingChecklist,
		updateChecklist
	} = useOutletContext();

	const wcagPrinciples = [
		{
			name: 'Perceivable',
			icon: '👁️',
			guidelines: [
				{ id: '1.1', name: 'Text Alternatives', level: 'A' },
				{ id: '1.2', name: 'Time-based Media', level: 'A' },
				{ id: '1.3', name: 'Adaptable', level: 'A' },
				{ id: '1.4', name: 'Distinguishable', level: 'AA' }
			]
		},
		{
			name: 'Operable',
			icon: '🖱️',
			guidelines: [
				{ id: '2.1', name: 'Keyboard Accessible', level: 'A' },
				{ id: '2.2', name: 'Enough Time', level: 'A' },
				{ id: '2.3', name: 'Seizures', level: 'A' },
				{ id: '2.4', name: 'Navigable', level: 'AA' },
				{ id: '2.5', name: 'Input Modalities', level: 'AA' }
			]
		},
		{
			name: 'Understandable',
			icon: '🧠',
			guidelines: [
				{ id: '3.1', name: 'Readable', level: 'AA' },
				{ id: '3.2', name: 'Predictable', level: 'A' },
				{ id: '3.3', name: 'Input Assistance', level: 'A' }
			]
		},
		{
			name: 'Robust',
			icon: '🔧',
			guidelines: [
				{ id: '4.1', name: 'Compatible', level: 'A' }
			]
		}
	];

	const commonIssues = [
		{
			title: 'Missing alt text',
			severity: 'critical',
			wcag: '1.1.1',
			description: 'Images without alt attributes',
			impact: 'Screen reader users cannot understand image content',
			fix: 'Add descriptive alt text to all informative images'
		},
		{
			title: 'Low color contrast',
			severity: 'major',
			wcag: '1.4.3',
			description: 'Text contrast below 4.5:1',
			impact: 'Users with low vision cannot read content',
			fix: 'Increase contrast between text and background'
		},
		{
			title: 'Missing form labels',
			severity: 'critical',
			wcag: '3.3.2',
			description: 'Form inputs without associated labels',
			impact: 'Screen reader users cannot identify form fields',
			fix: 'Add <label> elements or aria-label attributes'
		},
		{
			title: 'No keyboard access',
			severity: 'critical',
			wcag: '2.1.1',
			description: 'Interactive elements not keyboard accessible',
			impact: 'Keyboard users cannot access functionality',
			fix: 'Ensure all interactive elements are focusable'
		},
		{
			title: 'Missing page title',
			severity: 'major',
			wcag: '2.4.2',
			description: 'Page lacks descriptive title',
			impact: 'Users cannot understand page purpose',
			fix: 'Add descriptive <title> element'
		}
	];

	const auditTools = [
		{
			name: 'WCAG Compliance',
			id: 'wcag',
			description: 'Check against WCAG 2.1 guidelines'
		},
		{
			name: 'Section 508',
			id: 'section508',
			description: 'US federal accessibility standards'
		},
		{
			name: 'ADA Compliance',
			id: 'ada',
			description: 'Americans with Disabilities Act requirements'
		},
		{
			name: 'ARIA Validation',
			id: 'aria',
			description: 'Validate ARIA implementation'
		}
	];

	const runAudit = () => {
		setAuditProgress(0);
		const interval = setInterval(() => {
			setAuditProgress(prev => {
				if (prev >= 100) {
					clearInterval(interval);
					// Add sample findings
					commonIssues.forEach((issue, idx) => {
						if (Math.random() > 0.5) {
							setTimeout(() => {
								addAuditFinding({
									...issue,
									location: `Component${idx + 1}.js`,
									line: Math.floor(Math.random() * 100) + 1
								});
							}, idx * 200);
						}
					});
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const generateReport = () => {
		const report = {
			date: new Date().toISOString(),
			standard: selectedStandard,
			level: wcagLevel,
			score: complianceScore,
			findings: auditFindings,
			summary: {
				critical: auditFindings.filter(f => f.severity === 'critical').length,
				major: auditFindings.filter(f => f.severity === 'major').length,
				minor: auditFindings.filter(f => f.severity === 'minor').length
			}
		};
		
		console.log('Accessibility Audit Report:', report);
		alert('Report generated! Check console for details.');
	};

	const filteredFindings = currentSeverity === 'all' 
		? auditFindings 
		: auditFindings.filter(f => f.severity === currentSeverity);

	return (
		<div className='chapter testing-tools'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Audit Arena`}
				bridge={`Master Validator led them deeper into the Testing Tower, through a corridor lined with scrolls of standards and regulations. "Now that you understand the tools," she explained, "it's time to learn the rules they enforce. The Audit Arena awaits - where WCAG, Section 508, and ADA standards become your guides to true compliance."`}
			/>

			<StorySection
				paragraphs={[
					<>The Audit Arena hummed with activity. <strong>Compliance Commander</strong> reviewed scrolls of standards. "WCAG 2.1, Section 508, ADA - each has its place."</>,
					`Aria felt overwhelmed. "So many rules! How do we track them all?"`,
					`"Start with WCAG. It's the international standard. Level AA covers most legal requirements. Level AAA for critical applications."`,
					`Binary processed the data. "WCAG 2.1 contains 78 success criteria. Level A: 30, Level AA: 20, Level AAA: 28. Systematic approach required!"`,
					`Debuggora studied the patterns. "I see - it's not about perfection, but continuous improvement. Each fix makes the web more inclusive."`,
					`Compliance Commander nodded. "Document your efforts. Show progress. Accessibility is a journey, and audits are your map."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Compliance Audit Center</h3>
				
				<InstructionBox character={`Compliance Commander unveils the Audit Dashboard.`}>
					{`"Select your target compliance level, check guidelines as you verify them, and run an audit to discover issues. Remember: Level AA is the standard for most applications, but your specific context may require more or less stringent compliance."`}
				</InstructionBox>
				
				<div className='audit-arena'>
					<div className='demo-controls'>
						{auditTools.map((tool) => (
							<button
								key={tool.id}
								onClick={() => setActiveAuditType(tool.id)}
								className={`demo-button ${activeAuditType === tool.id ? 'active' : ''}`}
							>
								{tool.name}
							</button>
						))}
					</div>

					{activeAuditType === 'wcag' && (
						<div>
							<h4 style={{ marginTop: '30px', marginBottom: '20px' }}>
								WCAG 2.1 Compliance Check
							</h4>
							
							<div className='wcag-level-selector'>
								<button
									onClick={() => setWcagLevel('A')}
									className={`wcag-level-button ${wcagLevel === 'A' ? 'active' : ''}`}
								>
									Level A
								</button>
								<button
									onClick={() => setWcagLevel('AA')}
									className={`wcag-level-button ${wcagLevel === 'AA' ? 'active' : ''}`}
								>
									Level AA
								</button>
								<button
									onClick={() => setWcagLevel('AAA')}
									className={`wcag-level-button ${wcagLevel === 'AAA' ? 'active' : ''}`}
								>
									Level AAA
								</button>
							</div>

							<div style={{ marginTop: '30px' }}>
								{wcagPrinciples.map((principle) => (
									<div key={principle.name} style={{ marginBottom: '30px' }}>
										<h5 style={{ fontSize: '1.3em', marginBottom: '15px' }}>
											{principle.icon} {principle.name}
										</h5>
										<div style={{ paddingLeft: '30px' }}>
											{principle.guidelines.map((guideline) => (
												<div
													key={guideline.id}
													style={{
														display: 'flex',
														alignItems: 'center',
														marginBottom: '10px',
														padding: '10px',
														background: 'rgba(255, 255, 255, 0.05)',
														borderRadius: '5px'
													}}
												>
													<input
														type='checkbox'
														checked={testingChecklist[guideline.id] || false}
														onChange={(e) => updateChecklist(guideline.id, e.target.checked)}
														style={{ marginRight: '10px' }}
													/>
													<span style={{ flex: 1 }}>
														{guideline.id} - {guideline.name}
													</span>
													<span
														style={{
															padding: '2px 10px',
															background: guideline.level === 'A' ? '#4CAF50' :
																guideline.level === 'AA' ? '#FFC107' : '#FF9800',
															borderRadius: '10px',
															fontSize: '0.85em',
															fontWeight: 'bold'
														}}
													>
														{guideline.level}
													</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>

							<button
								onClick={() => {
									runAudit();
									calculateComplianceScore();
								}}
								style={{
									marginTop: '20px',
									padding: '15px 40px',
									background: 'linear-gradient(135deg, #4CAF50, #45a049)',
									border: 'none',
									borderRadius: '25px',
									color: 'white',
									fontSize: '1.1em',
									fontWeight: 'bold',
									cursor: 'pointer'
								}}
							>
								Run Compliance Audit
							</button>

							{auditProgress > 0 && auditProgress < 100 && (
								<div style={{ marginTop: '20px' }}>
									<div className='progress-bar'>
										<div 
											className='progress-fill' 
											style={{ width: `${auditProgress}%` }}
										/>
									</div>
									<p style={{ textAlign: 'center', marginTop: '10px' }}>
										Scanning... {auditProgress}%
									</p>
								</div>
							)}
						</div>
					)}

					<div className='compliance-meter' style={{ '--score': complianceScore }}>
						<div className='score-circle'>
							<div className='score-value'>{complianceScore}%</div>
						</div>
						<div className='score-label'>Overall Compliance Score</div>
						<p style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
							Based on {Object.values(testingChecklist).filter(v => v).length} of{' '}
							{Object.keys(testingChecklist).length} criteria checked
						</p>
					</div>
				</div>

				{auditFindings.length > 0 && (
					<div>
						<h3 className='section-title' style={{ marginTop: '40px' }}>
							Audit Findings
						</h3>
						
						<div className='demo-controls' style={{ marginBottom: '20px' }}>
							<button
								onClick={() => setCurrentSeverity('all')}
								className={`demo-button ${currentSeverity === 'all' ? 'active' : ''}`}
							>
								All ({auditFindings.length})
							</button>
							<button
								onClick={() => setCurrentSeverity('critical')}
								className={`demo-button ${currentSeverity === 'critical' ? 'active' : ''}`}
							>
								Critical ({auditFindings.filter(f => f.severity === 'critical').length})
							</button>
							<button
								onClick={() => setCurrentSeverity('major')}
								className={`demo-button ${currentSeverity === 'major' ? 'active' : ''}`}
							>
								Major ({auditFindings.filter(f => f.severity === 'major').length})
							</button>
							<button
								onClick={() => setCurrentSeverity('minor')}
								className={`demo-button ${currentSeverity === 'minor' ? 'active' : ''}`}
							>
								Minor ({auditFindings.filter(f => f.severity === 'minor').length})
							</button>
						</div>

						<div style={{ maxHeight: '400px', overflow: 'auto' }}>
							{filteredFindings.map((finding) => (
								<div 
									key={finding.id} 
									className={`audit-finding ${finding.severity}`}
								>
									<div className='finding-header'>
										<div className='finding-title'>{finding.title}</div>
										<div className={`finding-severity ${finding.severity}`}>
											{finding.severity}
										</div>
									</div>
									<p style={{ margin: '10px 0' }}>{finding.description}</p>
									<div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
										<p><strong>WCAG:</strong> {finding.wcag}</p>
										<p><strong>Impact:</strong> {finding.impact}</p>
										<p><strong>Fix:</strong> {finding.fix}</p>
										{finding.location && (
											<p><strong>Location:</strong> {finding.location}:{finding.line}</p>
										)}
									</div>
								</div>
							))}
						</div>

						<button
							onClick={generateReport}
							style={{
								marginTop: '20px',
								padding: '12px 30px',
								background: 'linear-gradient(135deg, #FFC107, #FF9800)',
								border: 'none',
								borderRadius: '25px',
								color: 'white',
								fontWeight: 'bold',
								cursor: 'pointer'
							}}
						>
							Generate Report
						</button>
					</div>
				)}
			</div>

			<CodeExample
				title={`Audit & Compliance Guide`}
				discoveredBy={`Compliance Commander's standards`}
				code={`# WCAG 2.1 Compliance Guide
// Compliance Commander: "Standards guide us to inclusion!"

# Understanding WCAG Levels

## Level A - Essential
// Minimum level of accessibility
const levelA = {
  criteria: 30,
  examples: [
    'Images have alt text',
    'Videos have captions',
    'Content is keyboard accessible',
    'Page has a title'
  ],
  impact: 'Basic accessibility for most users'
};

## Level AA - Recommended
// Target for most websites
const levelAA = {
  criteria: 20,
  buildOn: 'Level A',
  examples: [
    'Color contrast 4.5:1 (normal text)',
    'Color contrast 3:1 (large text)',
    'Consistent navigation',
    'Multiple ways to find pages',
    'Visible focus indicators'
  ],
  impact: 'Good accessibility for most situations'
};

## Level AAA - Enhanced
// For specialized contexts
const levelAAA = {
  criteria: 28,
  buildOn: 'Level A + AA',
  examples: [
    'Color contrast 7:1 (normal text)',
    'Color contrast 4.5:1 (large text)',
    'Sign language for videos',
    'Context-sensitive help',
    'No interruptions'
  ],
  impact: 'Maximum accessibility'
};

# Automated Audit Implementation

## Using Pa11y for CI/CD
// Binary: "Automate compliance checking!"

// Install pa11y
npm install --save-dev pa11y pa11y-ci

// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000,
    "wait": 2000,
    "viewport": {
      "width": 1280,
      "height": 1024
    }
  },
  "urls": [
    {
      "url": "http://localhost:3000",
      "actions": [
        "wait for element h1 to be visible"
      ]
    },
    {
      "url": "http://localhost:3000/form",
      "actions": [
        "set field #email to test@example.com",
        "click element button[type=submit]",
        "wait for element .error-message to be visible"
      ]
    }
  ]
}

// package.json scripts
"scripts": {
  "test:a11y": "pa11y-ci",
  "test:a11y:report": "pa11y-ci --reporter cli --reporter html"
}

# Manual Audit Checklist

## Perceivable
function auditPerceivable() {
  const checks = {
    '1.1.1': {
      name: 'Non-text Content',
      test: () => {
        const images = document.querySelectorAll('img');
        const missing = Array.from(images).filter(img => 
          !img.alt && !img.getAttribute('role') === 'presentation'
        );
        return {
          pass: missing.length === 0,
          issues: missing.map(img => ({
            element: img,
            fix: 'Add alt attribute'
          }))
        };
      }
    },
    '1.4.3': {
      name: 'Contrast (Minimum)',
      test: () => {
        // Use contrast checking library
        const elements = document.querySelectorAll('*');
        const issues = [];
        
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.color && style.backgroundColor) {
            const ratio = getContrastRatio(
              style.color, 
              style.backgroundColor
            );
            if (ratio < 4.5) {
              issues.push({
                element: el,
                ratio,
                required: 4.5
              });
            }
          }
        });
        
        return {
          pass: issues.length === 0,
          issues
        };
      }
    }
  };
  
  return runChecks(checks);
}

## Operable
function auditOperable() {
  const checks = {
    '2.1.1': {
      name: 'Keyboard',
      test: () => {
        const interactive = document.querySelectorAll(
          'a, button, input, select, textarea, [onclick]'
        );
        const notKeyboardable = Array.from(interactive).filter(el => {
          const tabindex = el.getAttribute('tabindex');
          return tabindex === '-1' || 
            (el.tagName === 'DIV' && !tabindex);
        });
        
        return {
          pass: notKeyboardable.length === 0,
          issues: notKeyboardable
        };
      }
    },
    '2.4.1': {
      name: 'Bypass Blocks',
      test: () => {
        const skipLink = document.querySelector(
          'a[href^="#"]:first-child'
        );
        return {
          pass: skipLink !== null,
          fix: 'Add skip navigation link'
        };
      }
    }
  };
  
  return runChecks(checks);
}

# Reporting Tools

## Generate HTML Report
function generateA11yReport(findings) {
  const report = {
    metadata: {
      date: new Date().toISOString(),
      url: window.location.href,
      standard: 'WCAG 2.1 AA',
      tool: 'Custom Audit'
    },
    summary: {
      total: findings.length,
      byPrinciple: {
        perceivable: findings.filter(f => f.principle === 'P').length,
        operable: findings.filter(f => f.principle === 'O').length,
        understandable: findings.filter(f => f.principle === 'U').length,
        robust: findings.filter(f => f.principle === 'R').length
      },
      bySeverity: {
        critical: findings.filter(f => f.severity === 'critical').length,
        major: findings.filter(f => f.severity === 'major').length,
        minor: findings.filter(f => f.severity === 'minor').length
      }
    },
    findings: findings.map(f => ({
      ...f,
      recommendation: getRecommendation(f.wcag),
      effort: estimateEffort(f.severity)
    }))
  };
  
  return report;
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Audit Lesson:`,
					content: `Compliance Commander teaches us that accessibility standards aren't just legal requirements—they're blueprints for inclusion. WCAG 2.1 provides clear, testable criteria that ensure our applications work for everyone. Level AA compliance is the sweet spot for most applications, balancing accessibility with practical implementation. Regular audits help track progress, identify patterns, and demonstrate commitment to accessibility. Remember: compliance is the minimum; true accessibility goes beyond checking boxes to creating genuinely inclusive experiences.`
				}}
				reflectionQuestions={[
					`How does understanding WCAG principles change your approach to designing and building user interfaces?`,
					`Why is documenting accessibility efforts and progress as important as fixing the issues themselves?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 44 (Afternoon)`,
					content: `The Audit Arena opened my eyes to the structure behind accessibility! Compliance Commander revealed the WCAG framework: 78 success criteria organized into four principles - Perceivable, Operable, Understandable, Robust. Binary processed it all: "Level A: 30 criteria, Level AA: 20 more, Level AAA: 28 additional. Systematic approach required!" I learned to run audits, filter findings by severity, and generate reports. The key insight: "It's not about perfection, but continuous improvement." Each fix makes the web more inclusive. Compliance Commander's wisdom: "Document your efforts. Show progress. Accessibility is a journey, and audits are your map."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
