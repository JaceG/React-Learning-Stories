import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [activeRegions, setActiveRegions] = useState(['us-east']);
	const [edgeLocations, setEdgeLocations] = useState(1);
	const [performanceMetrics, setPerformanceMetrics] = useState({
		ttfb: 2000,
		fcp: 3000,
		lcp: 4000
	});
	const { globalReach, setGlobalReach, levelUpSkill } = useOutletContext();

	const globalRegions = [
		{ id: 'us-east', name: 'US East', icon: '🗽', latency: 20 },
		{ id: 'us-west', name: 'US West', icon: '🌉', latency: 35 },
		{ id: 'eu-west', name: 'EU West', icon: '🏰', latency: 80 },
		{ id: 'asia-pacific', name: 'Asia Pacific', icon: '🏯', latency: 150 },
		{ id: 'south-america', name: 'South America', icon: '🌎', latency: 120 },
		{ id: 'australia', name: 'Australia', icon: '🦘', latency: 180 }
	];

	const edgeStrategies = [
		{
			name: 'Edge Functions',
			icon: '⚡',
			description: 'Run code at edge locations near users',
			providers: ['Vercel Edge', 'Cloudflare Workers', 'AWS Lambda@Edge'],
			benefits: ['<50ms latency', 'Personalization', 'A/B testing']
		},
		{
			name: 'CDN Distribution',
			icon: '🌐',
			description: 'Cache static assets globally',
			providers: ['CloudFront', 'Cloudflare', 'Fastly'],
			benefits: ['Asset caching', 'DDoS protection', 'Compression']
		},
		{
			name: 'Geographic Routing',
			icon: '🧭',
			description: 'Route users to nearest server',
			providers: ['Route 53', 'Cloudflare DNS', 'Azure Traffic Manager'],
			benefits: ['Reduced latency', 'Failover', 'Load balancing']
		}
	];

	const performanceOptimizations = [
		{ name: 'Brotli Compression', impact: 20, icon: '🗜️' },
		{ name: 'HTTP/3 Support', impact: 15, icon: '🚄' },
		{ name: 'Image Optimization', impact: 30, icon: '🖼️' },
		{ name: 'Edge Caching', impact: 40, icon: '💾' },
		{ name: 'Prerendering', impact: 25, icon: '📄' }
	];

	const activateRegion = (regionId) => {
		if (!activeRegions.includes(regionId)) {
			setActiveRegions([...activeRegions, regionId]);
			setEdgeLocations(prev => prev + 1);
			setGlobalReach(prev => Math.min(100, prev + 15));
			
			// Improve performance metrics
			setPerformanceMetrics(prev => ({
				ttfb: Math.max(100, prev.ttfb - 300),
				fcp: Math.max(500, prev.fcp - 400),
				lcp: Math.max(1000, prev.lcp - 500)
			}));
			
			if (activeRegions.length >= 3) {
				levelUpSkill('Admiral');
			}
		}
	};

	const applyOptimization = (optimization) => {
		const reduction = optimization.impact;
		setPerformanceMetrics(prev => ({
			ttfb: Math.max(50, prev.ttfb - reduction * 10),
			fcp: Math.max(200, prev.fcp - reduction * 15),
			lcp: Math.max(500, prev.lcp - reduction * 20)
		}));
	};

	const getPerformanceColor = (metric) => {
		if (metric < 1000) return '#27ae60';
		if (metric < 2500) return '#f39c12';
		return '#e74c3c';
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Global Network
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Aria's applications now deployed globally, reaching users on every continent. 
					"Edge functions, CDN distribution, geographic routing - the world is your 
					kingdom!" Navigator Hosting proclaimed.
				</p>
				
				<p className='story-paragraph'>
					Binary monitored the global metrics. "Response times vary by region. 
					US East: 20ms. Asia Pacific: 150ms. We need edge optimization!"
				</p>

				<p className='story-paragraph'>
					Debuggora tracked errors across regions. "Different regions, different 
					challenges. Network conditions, regulations, user behaviors all vary."
				</p>

				<p className='story-paragraph'>
					"You've learned to think globally," Navigator smiled. "Performance isn't 
					just about code - it's about proximity. Bring your app closer to your users."
				</p>

				<p className='story-paragraph'>
					Aria surveyed her global deployment network with pride. "From local 
					development to worldwide distribution - what a journey!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Global Deployment Network</h3>
				
				<div style={{ 
					background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(142, 68, 173, 0.1))', 
					padding: '20px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(52, 152, 219, 0.3)',
					textAlign: 'center'
				}}>
					{globalReach >= 90 ? (
						<div>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>
								🌍 <strong style={{ color: '#9b59b6' }}>Global Admiral</strong> 🌍
							</div>
							<p style={{ color: '#8e44ad' }}>
								Your applications span the globe! Users everywhere enjoy fast, reliable service.
							</p>
						</div>
					) : (
						<div>
							<p style={{ color: '#3498db' }}>
								Expand to more regions to achieve Global Admiral status!
							</p>
							<div style={{ marginTop: '10px' }}>
								<span style={{ color: '#7f8c8d' }}>Global Coverage: </span>
								<span style={{ color: '#3498db', fontWeight: 'bold' }}>{globalReach}%</span>
							</div>
						</div>
					)}
				</div>

				<div className='global-network'>
					<h4>Edge Location Network</h4>
					<div className='network-map'>
						{globalRegions.map((region) => (
							<div
								key={region.id}
								className={`region-node ${activeRegions.includes(region.id) ? 'active' : ''}`}
								onClick={() => activateRegion(region.id)}
								style={{ cursor: 'pointer' }}
							>
								<div className='region-icon'>{region.icon}</div>
								<div className='region-name'>{region.name}</div>
								<div style={{ fontSize: '0.75em', marginTop: '5px' }}>
									{region.latency}ms
								</div>
							</div>
						))}
					</div>
					<div style={{ marginTop: '20px' }}>
						<div style={{ fontSize: '1.2em', marginBottom: '10px' }}>
							Active Edge Locations: <strong style={{ color: '#3498db' }}>{edgeLocations}</strong>
						</div>
						<p style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
							Click regions to expand your global network
						</p>
					</div>
				</div>

				<div className='automation-metrics'>
					<h4>Global Performance Metrics</h4>
					<div className='metric-card'>
						<div className='metric-value' style={{ color: getPerformanceColor(performanceMetrics.ttfb) }}>
							{performanceMetrics.ttfb}ms
						</div>
						<div className='metric-label'>Time to First Byte</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value' style={{ color: getPerformanceColor(performanceMetrics.fcp) }}>
							{performanceMetrics.fcp}ms
						</div>
						<div className='metric-label'>First Contentful Paint</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value' style={{ color: getPerformanceColor(performanceMetrics.lcp) }}>
							{performanceMetrics.lcp}ms
						</div>
						<div className='metric-label'>Largest Contentful Paint</div>
					</div>
				</div>

				<div className='deployment-strategies'>
					<h4>Edge Deployment Strategies</h4>
					{edgeStrategies.map((strategy) => (
						<div key={strategy.name} className='strategy-card'>
							<div className='strategy-icon'>{strategy.icon}</div>
							<div className='strategy-name'>{strategy.name}</div>
							<p style={{ fontSize: '0.9em', margin: '10px 0' }}>{strategy.description}</p>
							<div style={{ fontSize: '0.85em' }}>
								<strong>Providers:</strong>
								<div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
									{strategy.providers.map((provider, i) => (
										<span key={i} style={{
											padding: '3px 8px',
											background: 'rgba(52, 152, 219, 0.2)',
											borderRadius: '10px'
										}}>
											{provider}
										</span>
									))}
								</div>
							</div>
							<div style={{ marginTop: '10px', fontSize: '0.85em' }}>
								<strong>Benefits:</strong>
								<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
									{strategy.benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				<div className='feature-comparison'>
					<h4>Performance Optimizations</h4>
					<div style={{ marginTop: '20px' }}>
						{performanceOptimizations.map((opt) => (
							<div 
								key={opt.name}
								onClick={() => applyOptimization(opt)}
								style={{
									padding: '15px',
									margin: '10px 0',
									background: 'rgba(46, 204, 113, 0.1)',
									border: '1px solid rgba(46, 204, 113, 0.3)',
									borderRadius: '8px',
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									transition: 'all 0.3s ease'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
									<span style={{ fontSize: '1.5em' }}>{opt.icon}</span>
									<div>
										<div style={{ fontWeight: 'bold' }}>{opt.name}</div>
										<div style={{ fontSize: '0.85em', color: '#7f8c8d' }}>
											Performance impact: {opt.impact}%
										</div>
									</div>
								</div>
								<div style={{ color: '#27ae60' }}>
									Click to apply
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Global Deployment Configuration</span>
					<span className='discovered-by'>Navigator's worldwide wisdom</span>
				</div>
				<pre>{`# Edge Function Example (Vercel)
// api/geo-router.js
export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  const country = request.geo?.country || 'US';
  const region = request.geo?.region || 'unknown';
  
  // Route to nearest content
  const cdnUrl = getCDNUrl(country);
  
  return new Response(JSON.stringify({
    country,
    region,
    cdnUrl,
    latency: getExpectedLatency(country)
  }));
}

# CloudFront Distribution
# Binary: "295+ edge locations worldwide!"

resource "aws_cloudfront_distribution" "app" {
  origin {
    domain_name = aws_s3_bucket.app.bucket_regional_domain_name
    origin_id   = "S3-\${aws_s3_bucket.app.id}"
  }
  
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  
  # Geographic restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  # Cache behaviors
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-\${aws_s3_bucket.app.id}"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }
  
  # Custom error pages for SPA
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
}

# Performance Headers
# Debuggora: "Headers affect Core Web Vitals!"

# Optimal headers for global performance
Cache-Control: public, max-age=31536000, immutable
Vary: Accept-Encoding
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'

# Aria's final note: "Think globally, cache locally!"`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Global Lesson:</h3>
				<p>
					Global deployment transforms your application from a single location to a 
					worldwide presence. Navigator Hosting's final teaching reveals that true 
					performance comes from proximity - edge functions process near users, CDNs 
					cache content globally, and geographic routing ensures optimal paths. The 
					journey from local development to global deployment completes when your 
					application performs excellently for users everywhere, regardless of their 
					location.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does global deployment change the way you think about application 
					architecture and performance?
				</p>
				<p>
					What considerations become important when serving users across different 
					continents and network conditions?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;