import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const [hoveredPlatform, setHoveredPlatform] = useState(null);
	const { visitPlatform, visitedPlatforms, globalReach } = useOutletContext();

	const hostingPlatforms = [
		{
			id: 'vercel',
			name: 'Vercel Island',
			icon: '▲',
			type: 'Edge Platform',
			description: 'The fastest path to production with automatic deployments',
			features: ['Git integration', 'Edge functions', 'Analytics', 'Preview deployments'],
			bestFor: 'Next.js and React apps',
			difficulty: 'Beginner'
		},
		{
			id: 'netlify',
			name: 'Netlify Shores',
			icon: '🔷',
			type: 'Static Hosting',
			description: 'Developer-friendly platform for modern web projects',
			features: ['Forms', 'Identity', 'Functions', 'Split testing'],
			bestFor: 'Static sites and JAMstack',
			difficulty: 'Beginner'
		},
		{
			id: 'aws',
			name: 'AWS Continent',
			icon: '🌎',
			type: 'Cloud Infrastructure',
			description: 'The vast continent of infinite possibilities and services',
			features: ['S3 + CloudFront', 'Amplify', 'EC2', 'Lambda'],
			bestFor: 'Enterprise scale',
			difficulty: 'Advanced'
		},
		{
			id: 'railway',
			name: 'Railway Station',
			icon: '🚂',
			type: 'Full-Stack Platform',
			description: 'Deploy anything with zero config',
			features: ['Databases', 'Background jobs', 'Environments', 'CLI'],
			bestFor: 'Full-stack applications',
			difficulty: 'Intermediate'
		}
	];

	const platformCategories = [
		{
			name: 'Static Hosting',
			description: 'Perfect for React SPAs',
			platforms: ['Vercel', 'Netlify', 'GitHub Pages']
		},
		{
			name: 'Traditional Servers',
			description: 'Full control over environment',
			platforms: ['DigitalOcean', 'Linode', 'VPS']
		},
		{
			name: 'Serverless',
			description: 'Pay only for what you use',
			platforms: ['AWS Lambda', 'Cloudflare Workers', 'Vercel Edge']
		},
		{
			name: 'Container Services',
			description: 'Docker-based deployments',
			platforms: ['Google Cloud Run', 'AWS ECS', 'Fly.io']
		}
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Platform Archipelago`}
			/>

		<StorySection
			paragraphs={[
				`"How do I choose?" Aria asked, overwhelmed by the options spread before her.`,
				`"Consider your needs," Navigator Hosting explained, pointing to a detailed map. "Traffic expectations, features required, budget constraints, complexity tolerance. Each platform has its sweet spot."`,
				`Binary scanned the platforms. "Calculating optimal routes... Each destination has unique performance characteristics and cost structures!"`,
				`Debuggora studied the deployment logs flowing from each island. "Different error handling, different debugging tools. Choose wisely!"`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Platform Exploration Map</h3>
				
				<InstructionBox character={`Navigator Vercel unfurls a magical map showing the Platform Archipelago.`}>
					{`"Explore each island to discover its unique strengths. Click on platforms to learn about their features, best use cases, and difficulty levels."`}
				</InstructionBox>
				
				<div style={{ 
					background: 'rgba(52, 152, 219, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<div style={{ display: 'flex', gap: '30px' }}>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Islands Visited: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{visitedPlatforms.length}/4</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Global Reach: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{globalReach}%</span>
						</div>
					</div>
					<div style={{ fontSize: '0.9em', color: '#3498db' }}>
						🧭 Click platforms to explore
					</div>
				</div>

				<div className='platform-map'>
					<h4>The Hosting Archipelago</h4>
					<div className='archipelago-grid'>
						{hostingPlatforms.map((platform) => (
							<div 
								key={platform.id}
								className={`platform-island ${
									visitedPlatforms.find(p => p.id === platform.id) ? 'visited' : ''
								} ${hoveredPlatform === platform.id ? 'selected' : ''}`}
								onMouseEnter={() => setHoveredPlatform(platform.id)}
								onMouseLeave={() => setHoveredPlatform(null)}
								onClick={() => visitPlatform(platform)}
							>
								<div className='platform-icon'>{platform.icon}</div>
								<div className='platform-name'>{platform.name}</div>
								<div className='platform-type'>{platform.type}</div>
								<p style={{ fontSize: '0.9em', marginBottom: '15px' }}>
									{platform.description}
								</p>
								<div style={{ fontSize: '0.85em' }}>
									<strong>Best for:</strong> {platform.bestFor}
								</div>
								<div style={{ 
									marginTop: '10px',
									padding: '5px 10px',
									background: platform.difficulty === 'Beginner' ? 'rgba(46, 204, 113, 0.2)' :
											   platform.difficulty === 'Intermediate' ? 'rgba(241, 196, 15, 0.2)' :
											   'rgba(231, 76, 60, 0.2)',
									borderRadius: '15px',
									display: 'inline-block',
									fontSize: '0.85em'
								}}>
									{platform.difficulty}
								</div>
								{visitedPlatforms.find(p => p.id === platform.id) && (
									<div style={{ 
										position: 'absolute', 
										top: '10px', 
										right: '10px',
										color: '#27ae60',
										fontSize: '1.5em'
									}}>
										✓
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{hoveredPlatform && (
					<div className='platform-details'>
						<h5>{hostingPlatforms.find(p => p.id === hoveredPlatform).name} Features</h5>
						<div className='comparison-grid'>
							{hostingPlatforms.find(p => p.id === hoveredPlatform).features.map((feature, i) => (
								<div key={i} className='feature-card'>
									<div className='feature-icon'>✨</div>
									<div className='feature-name'>{feature}</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className='feature-comparison'>
					<h4>Platform Categories</h4>
					<div style={{ marginTop: '20px' }}>
						{platformCategories.map((category, i) => (
							<div key={i} style={{ 
								marginBottom: '20px',
								padding: '15px',
								background: 'rgba(0, 0, 0, 0.2)',
								borderRadius: '8px'
							}}>
								<h5 style={{ color: '#3498db', marginBottom: '10px' }}>{category.name}</h5>
								<p style={{ fontSize: '0.9em', marginBottom: '10px' }}>{category.description}</p>
								<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
									{category.platforms.map((platform, j) => (
										<span key={j} style={{
											padding: '5px 10px',
											background: 'rgba(52, 152, 219, 0.2)',
											borderRadius: '15px',
											fontSize: '0.85em'
										}}>
											{platform}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<CodeExample
				title={`Navigator's Platform Guide`}
				discoveredBy={`Essential deployment configurations`}
				code={`# Vercel Deployment
# Navigator: "The simplest path to production!"

# Install Vercel CLI
npm i -g vercel

# Deploy with zero config
vercel

# vercel.json configuration
{
  "framework": "create-react-app",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}

# Netlify Deployment
# Binary: "Drag and drop efficiency: 98.7%!"

# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

# AWS S3 + CloudFront
# Debuggora: "More complex, but ultimate control!"

# Build and sync to S3
npm run build
aws s3 sync build/ s3://my-react-bucket --delete

# CloudFront invalidation
aws cloudfront create-invalidation \\
  --distribution-id ABCDEFG \\
  --paths "/*"

# Aria's notes: "Each platform has its own deployment dance!"`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Hosting Lesson:`,
					content: `Choosing a hosting platform is about matching your needs with platform strengths. Navigator Vercel teaches that there's no 'best' platform - only the best platform for your specific requirements. Consider factors like ease of use, scalability, cost, features, and team expertise. Start simple and migrate when your needs outgrow your current platform.`
				}}
				reflectionQuestions={[
					`How does thinking of hosting platforms as islands help visualize their different characteristics and trade-offs?`,
					`What factors are most important when choosing a hosting platform for your React applications?`
				]}
				characterIntros={[
					{
						name: `Navigator Vercel`,
						description: `Master navigator of the Platform Archipelago and expert guide through the vast ocean of hosting options. Her philosophy: "Every platform has its sweet spot - find yours."`
					}
				]}
				journalEntry={{
					title: `Aria's Journal - Day 35 (Morning)`,
					content: `The build is complete, but now comes the crucial question - where will my application live? Navigator Vercel welcomed me to the Platform Archipelago, a vast ocean dotted with hosting islands. Vercel Island offers the fastest path with zero-config deployments. Netlify Shores excels at static sites and JAMstack. AWS Continent provides infinite scale but requires more navigation skill. Railway Station handles full-stack applications with ease. Navigator's wisdom: "There's no 'best' platform - only the best platform for YOUR needs." I explored 4 islands today, each with unique features and trade-offs!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;