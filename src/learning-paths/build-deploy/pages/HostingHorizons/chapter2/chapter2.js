import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterTwo = () => {
	const [activeTab, setActiveTab] = useState('vercel');
	const [deploymentStep, setDeploymentStep] = useState(0);
	const [customDomain, setCustomDomain] = useState('');
	const { visitPlatform, navigationSkill, levelUpSkill, setGlobalReach } = useOutletContext();

	const deploymentCeremonies = {
		vercel: {
			name: 'Vercel',
			icon: '▲',
			steps: [
				{ step: 'Connect GitHub', command: 'vercel link' },
				{ step: 'Import project', command: 'vercel import' },
				{ step: 'Configure build', command: 'Auto-detected' },
				{ step: 'Deploy', command: 'vercel --prod' }
			],
			envVars: ['REACT_APP_API_URL', 'REACT_APP_ENV'],
			features: {
				'Preview URLs': 'Automatic for every branch',
				'Rollbacks': 'One-click instant rollback',
				'Analytics': 'Built-in Web Vitals',
				'Functions': 'Serverless API routes'
			}
		},
		netlify: {
			name: 'Netlify',
			icon: '🔷',
			steps: [
				{ step: 'New site from Git', command: 'netlify init' },
				{ step: 'Configure build', command: 'Build settings' },
				{ step: 'Set environment', command: 'netlify env:set' },
				{ step: 'Deploy site', command: 'netlify deploy --prod' }
			],
			envVars: ['REACT_APP_API_KEY', 'NODE_VERSION'],
			features: {
				'Forms': 'Built-in form handling',
				'Identity': 'User authentication',
				'Functions': 'Background functions',
				'Split Testing': 'A/B testing support'
			}
		},
		aws: {
			name: 'AWS',
			icon: '🌎',
			steps: [
				{ step: 'Create S3 bucket', command: 'aws s3 mb s3://my-app' },
				{ step: 'Enable hosting', command: 'aws s3 website' },
				{ step: 'Setup CloudFront', command: 'aws cloudfront create' },
				{ step: 'Deploy files', command: 'aws s3 sync build/' }
			],
			envVars: ['AWS_REGION', 'BUCKET_NAME'],
			features: {
				'CloudFront CDN': 'Global edge locations',
				'Route 53': 'DNS management',
				'WAF': 'Web application firewall',
				'Lambda@Edge': 'Edge computing'
			}
		}
	};

	const domainConfiguration = {
		steps: [
			'Add custom domain in platform dashboard',
			'Update DNS records (A/CNAME)',
			'Wait for propagation (5-48 hours)',
			'Configure SSL certificate',
			'Test HTTPS redirect'
		],
		providers: [
			{ name: 'Namecheap', icon: '🏷️' },
			{ name: 'GoDaddy', icon: '🌐' },
			{ name: 'Cloudflare', icon: '☁️' },
			{ name: 'Google Domains', icon: '🔍' }
		]
	};

	const runDeployment = () => {
		let step = 0;
		const interval = setInterval(() => {
			if (step < 4) {
				setDeploymentStep(step + 1);
				step++;
			} else {
				clearInterval(interval);
				setGlobalReach(prev => Math.min(100, prev + 20));
				if (navigationSkill === 'Explorer') {
					levelUpSkill('Captain');
				}
			}
		}, 1000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Deployment Ceremonies`}
				bridge={`Navigator Vercel led Aria to a ceremonial chamber where platforms performed their deployment rituals. "Each platform has its own ceremony," she explained. "Vercel's is swift and magical - push code, receive URL. Netlify's involves configuration incantations. AWS requires the most elaborate preparation." Aria watched, eager to master each ritual.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"But AWS gives ultimate control," Navigator Hosting added, showing the vast 
					array of services. "With great power comes great configuration."
				</p>

				<p className='story-paragraph'>
					Binary compared deployment speeds. "Vercel: 45 seconds. Netlify: 52 seconds. 
					AWS CloudFront invalidation: 5-10 minutes. Choose based on your patience!"
				</p>

				<p className='story-paragraph'>
					Debuggora examined the deployment logs. "Each platform has different log 
					formats and error messages. Learn their languages!"
				</p>

				<p className='story-paragraph'>
					"Master the ceremonies," Navigator advised, "and deployment becomes a 
					simple ritual rather than a complex ordeal."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Platform Deep Dive</h3>
				
				<InstructionBox character={`Navigator Vercel presents the ceremonial deployment console.`}>
					{`"Select a platform tab below to learn its deployment steps. Run the simulation to practice the ceremony and configure your custom domain to establish your presence on the web."`}
				</InstructionBox>
				
				<div style={{ 
					background: 'rgba(52, 152, 219, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					textAlign: 'center'
				}}>
					<p style={{ color: '#3498db', marginBottom: '10px' }}>
						Choose a platform below to practice deployment ceremonies
					</p>
					<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
						<div>
							<span style={{ color: '#7f8c8d' }}>Navigator Skill: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{navigationSkill}</span>
						</div>
					</div>
				</div>

				<div className='deployment-config'>
					<div className='config-tabs'>
						{Object.entries(deploymentCeremonies).map(([key, platform]) => (
							<button
								key={key}
								className={`config-tab ${activeTab === key ? 'active' : ''}`}
								onClick={() => setActiveTab(key)}
							>
								<span style={{ marginRight: '5px' }}>{platform.icon}</span>
								{platform.name}
							</button>
						))}
					</div>

					<div style={{ marginTop: '20px' }}>
						<h4>Deployment Steps - {deploymentCeremonies[activeTab].name}</h4>
						<div style={{ margin: '20px 0' }}>
							{deploymentCeremonies[activeTab].steps.map((step, index) => (
								<div key={index} style={{
									padding: '15px',
									margin: '10px 0',
									background: deploymentStep > index ? 'rgba(46, 204, 113, 0.1)' : 'rgba(0, 0, 0, 0.2)',
									border: `1px solid ${deploymentStep > index ? 'rgba(46, 204, 113, 0.3)' : 'rgba(52, 152, 219, 0.3)'}`,
									borderRadius: '8px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<strong>{index + 1}. {step.step}</strong>
										<div style={{ fontSize: '0.9em', marginTop: '5px', fontFamily: 'monospace' }}>
											{step.command}
										</div>
									</div>
									{deploymentStep > index && (
										<span style={{ color: '#27ae60', fontSize: '1.5em' }}>✓</span>
									)}
								</div>
							))}
							{deploymentStep === 0 && (
								<button
									onClick={runDeployment}
									style={{
										marginTop: '20px',
										padding: '10px 20px',
										background: '#3498db',
										color: 'white',
										border: 'none',
										borderRadius: '5px',
										cursor: 'pointer',
										fontWeight: 'bold'
									}}
								>
									Run Deployment Simulation
								</button>
							)}
							{deploymentStep === 4 && (
								<div style={{ 
									marginTop: '20px', 
									padding: '15px',
									background: 'rgba(46, 204, 113, 0.2)',
									borderRadius: '8px',
									textAlign: 'center',
									color: '#27ae60'
								}}>
									🎉 Deployment Complete! Your app is live.
								</div>
							)}
						</div>

						<div className='detail-section'>
							<h5>Environment Variables</h5>
							<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
								{deploymentCeremonies[activeTab].envVars.map((envVar, i) => (
									<code key={i} style={{
										padding: '5px 10px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '5px'
									}}>
										{envVar}
									</code>
								))}
							</div>
						</div>

						<div className='detail-section'>
							<h5>Platform Features</h5>
							<div className='comparison-grid'>
								{Object.entries(deploymentCeremonies[activeTab].features).map(([feature, description]) => (
									<div key={feature} className='feature-card'>
										<div className='feature-name'>{feature}</div>
										<div className='feature-status'>{description}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='platform-details'>
					<h4>Custom Domain Configuration</h4>
					<div style={{ marginBottom: '20px' }}>
						<input
							type='text'
							placeholder='yourdomain.com'
							value={customDomain}
							onChange={(e) => setCustomDomain(e.target.value)}
							style={{
								width: '100%',
								padding: '10px',
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(52, 152, 219, 0.3)',
								borderRadius: '5px',
								color: 'white',
								fontSize: '1em'
							}}
						/>
					</div>
					{customDomain && (
						<div>
							<h5>Configuration Steps for {customDomain}</h5>
							<ol style={{ marginLeft: '20px' }}>
								{domainConfiguration.steps.map((step, i) => (
									<li key={i} style={{ marginBottom: '10px' }}>{step}</li>
								))}
							</ol>
							<div style={{ marginTop: '20px' }}>
								<h6>Popular Domain Providers:</h6>
								<div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
									{domainConfiguration.providers.map((provider, i) => (
										<div key={i} style={{
											padding: '10px 15px',
											background: 'rgba(52, 152, 219, 0.1)',
											border: '1px solid rgba(52, 152, 219, 0.3)',
											borderRadius: '8px',
											display: 'flex',
											alignItems: 'center',
											gap: '5px'
										}}>
											<span>{provider.icon}</span>
											<span>{provider.name}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Platform-Specific Configurations`}
				discoveredBy={`Navigator's deployment secrets`}
				code={`# Environment Variables Best Practices
# Navigator: "Never commit secrets to Git!"

# .env.local (for local development)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development

# Vercel Environment Variables
vercel env add REACT_APP_API_URL production
vercel env add REACT_APP_STRIPE_KEY production

# Netlify Environment Variables
netlify env:set REACT_APP_API_URL https://api.example.com

# AWS Systems Manager (for secure storage)
aws ssm put-parameter \\
  --name "/myapp/prod/api-key" \\
  --value "secret-key" \\
  --type "SecureString"

# Custom Domain DNS Configuration
# Binary: "DNS propagation time: unpredictable!"

# A Record (for apex domain)
Type: A
Name: @
Value: 76.76.21.21

# CNAME Record (for www)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# SSL/TLS Configuration
# Debuggora: "Always force HTTPS!"

# Vercel (automatic)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains"
        }
      ]
    }
  ]
}

# Netlify _headers file
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Deployment Lesson:`,
					content: `Each platform has its own deployment ceremony - a unique set of steps, configurations, and considerations. Navigator Vercel teaches that mastering these ceremonies transforms deployment from a stressful event into a smooth ritual. Understanding environment variables, custom domains, and SSL configuration ensures your applications are not just deployed, but deployed correctly and securely.`
				}}
				reflectionQuestions={[
					`How do platform-specific features influence your deployment decisions?`,
					`Why is it important to understand the deployment process rather than just following tutorials?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 35 (Afternoon)`,
					content: `This afternoon I learned the deployment ceremonies! Each platform has its own ritual: Vercel's four-step magic (link, import, configure, deploy), Netlify's netlify.toml incantations, and AWS's elaborate S3 + CloudFront ceremony. I mastered environment variables - never commit secrets to Git! Custom domain configuration requires patience: DNS propagation takes 5-48 hours. Binary timed each deployment: Vercel 45s, Netlify 52s, AWS CloudFront 5-10 minutes. Navigator's wisdom: "Master the ceremonies, and deployment becomes a simple ritual rather than a complex ordeal." My Navigator Skill upgraded to Captain!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;