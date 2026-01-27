import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [activeStore, setActiveStore] = useState('appstore');
	const [reviewStatus, setReviewStatus] = useState({
		appstore: 'pending',
		playstore: 'pending'
	});
	const [reviewProgress, setReviewProgress] = useState(0);
	const [reviewFeedback, setReviewFeedback] = useState([]);
	const [betaTesters, setBetaTesters] = useState([
		{ id: 1, name: 'Alpha Tester', device: 'iPhone 13', status: 'active', bugs: 3 },
		{ id: 2, name: 'Beta Explorer', device: 'Pixel 6', status: 'active', bugs: 2 },
		{ id: 3, name: 'Gamma User', device: 'iPad Pro', status: 'pending', bugs: 0 },
		{ id: 4, name: 'Delta Checker', device: 'Galaxy S22', status: 'active', bugs: 1 }
	]);
	const [asoMetrics, setAsoMetrics] = useState({
		visibility: 45,
		conversion: 0,
		keywords: []
	});
	
	const { 
		publishingProgress,
		advancePublishing,
		storeSubmissions,
		submitToStore,
		publisherLevel,
		setPublisherLevel
	} = useOutletContext();

	const reviewStages = [
		{ stage: 'Waiting for Review', duration: '24-48 hours', icon: '⏳' },
		{ stage: 'In Review', duration: '2-7 days', icon: '🔍' },
		{ stage: 'Pending Developer Release', duration: 'Your choice', icon: '🚦' },
		{ stage: 'Ready for Sale', duration: 'Live!', icon: '✅' }
	];

	const commonRejectionReasons = [
		{ reason: 'Guideline 2.1 - App Completeness', description: 'App crashes on launch', severity: 'high' },
		{ reason: 'Guideline 4.2 - Minimum Functionality', description: 'App is too simple or limited', severity: 'medium' },
		{ reason: 'Guideline 5.1.1 - Data Collection', description: 'Privacy policy missing or incomplete', severity: 'high' },
		{ reason: 'Metadata Rejected', description: 'Screenshots contain pricing info', severity: 'low' },
		{ reason: 'Guideline 3.1.1 - In-App Purchase', description: 'Payment outside IAP system', severity: 'high' }
	];

	const asoKeywords = [
		{ keyword: 'react native app', difficulty: 'Medium', volume: 'High' },
		{ keyword: 'mobile development', difficulty: 'High', volume: 'Medium' },
		{ keyword: 'cross platform', difficulty: 'Low', volume: 'High' },
		{ keyword: 'javascript mobile', difficulty: 'Low', volume: 'Low' }
	];

	const handleSubmitForReview = (store) => {
		setReviewStatus(prev => ({
			...prev,
			[store]: 'reviewing'
		}));
		
		// Simulate review process
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			setReviewProgress(progress);
			
			if (progress >= 100) {
				clearInterval(interval);
				const approved = Math.random() > 0.3; // 70% approval rate
				
				if (approved) {
					setReviewStatus(prev => ({
						...prev,
						[store]: 'approved'
					}));
					submitToStore(store, 'approved');
					setReviewFeedback([...reviewFeedback, {
						store,
						status: 'approved',
						message: 'Your app has been approved!'
					}]);
					
					if (!publishingProgress.review) {
						advancePublishing('review');
					}
				} else {
					setReviewStatus(prev => ({
						...prev,
						[store]: 'rejected'
					}));
					submitToStore(store, 'rejected');
					const reason = commonRejectionReasons[Math.floor(Math.random() * commonRejectionReasons.length)];
					setReviewFeedback([...reviewFeedback, {
						store,
						status: 'rejected',
						message: reason.reason,
						description: reason.description
					}]);
				}
			}
		}, 500);
	};

	const handleTesterActivation = (testerId) => {
		setBetaTesters(prev => prev.map(tester => 
			tester.id === testerId 
				? { ...tester, status: 'active' }
				: tester
		));
	};

	const calculateASOScore = () => {
		const selectedKeywords = asoMetrics.keywords.length;
		const maxKeywords = 10;
		const keywordScore = (selectedKeywords / maxKeywords) * 40;
		const visibilityScore = (asoMetrics.visibility / 100) * 30;
		const conversionScore = (asoMetrics.conversion / 100) * 30;
		
		return Math.round(keywordScore + visibilityScore + conversionScore);
	};

	useEffect(() => {
		// Update ASO conversion based on review status
		const approved = Object.values(reviewStatus).filter(s => s === 'approved').length;
		if (approved > 0) {
			setAsoMetrics(prev => ({
				...prev,
				conversion: Math.min(prev.conversion + approved * 25, 100)
			}));
		}
	}, [reviewStatus]);

	return (
		<div className='chapter app-distribution'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Review Gauntlet`}
				bridge={`With preparations complete and builds signed, Publisher Prime led Aria to the towering Review Gauntlet. "Your app is packaged and ready," he said, gesturing to the imposing gates ahead. "But between here and the stores lies the toughest test of all - the platform reviewers who guard user safety and quality."`}
			/>

		<StorySection
			paragraphs={[
				`"The Review Gauntlet tests every app," Publisher Prime explained. "Apple for quality and guidelines, Google for security and policy."`,
				`Aria submitted her first app. "It's nerve-wracking! What if they reject it?"`,
				`"Then you fix and resubmit. Persistence and adherence to guidelines are key."`,
				`Binary analyzed patterns. "Rejection reasons: 40% crashes, 30% guideline violations, 20% metadata issues, 10% other. Optimization algorithms engaged!"`,
				`Debuggora prepared for battle. "Each rejection is a learning opportunity. The key is understanding why and fixing it properly."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Store Review Center</h3>
				
				<InstructionBox character={`Publisher Prime opens the submission portal.`}>
					{`"Submit your app to both stores and watch the review process unfold. Remember - approval rates hover around 70%, so don't be discouraged by rejections!"`}
				</InstructionBox>
				
				<div className='store-submissions'>
					<div 
						className={`store-card appstore ${activeStore === 'appstore' ? 'active' : ''}`}
						onClick={() => setActiveStore('appstore')}
					>
						<div className='store-logo'>🍎</div>
						<h4>App Store</h4>
						<p style={{ color: '#bdc3c7', fontSize: '0.9em', margin: '10px 0' }}>
							iOS & iPadOS Distribution
						</p>
						<div className={`store-status ${reviewStatus.appstore}`}>
							{reviewStatus.appstore === 'pending' && 'Ready to Submit'}
							{reviewStatus.appstore === 'reviewing' && `In Review (${reviewProgress}%)`}
							{reviewStatus.appstore === 'approved' && 'Approved ✓'}
							{reviewStatus.appstore === 'rejected' && 'Rejected - Fix Required'}
						</div>
						{reviewStatus.appstore === 'pending' && (
							<button
								onClick={() => handleSubmitForReview('appstore')}
								style={{
									marginTop: '15px',
									padding: '10px 25px',
									background: '#0D7DF2',
									border: 'none',
									borderRadius: '20px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								Submit for Review
							</button>
						)}
					</div>

					<div 
						className={`store-card playstore ${activeStore === 'playstore' ? 'active' : ''}`}
						onClick={() => setActiveStore('playstore')}
					>
						<div className='store-logo'>🤖</div>
						<h4>Google Play</h4>
						<p style={{ color: '#bdc3c7', fontSize: '0.9em', margin: '10px 0' }}>
							Android Distribution
						</p>
						<div className={`store-status ${reviewStatus.playstore}`}>
							{reviewStatus.playstore === 'pending' && 'Ready to Submit'}
							{reviewStatus.playstore === 'reviewing' && `In Review (${reviewProgress}%)`}
							{reviewStatus.playstore === 'approved' && 'Approved ✓'}
							{reviewStatus.playstore === 'rejected' && 'Rejected - Fix Required'}
						</div>
						{reviewStatus.playstore === 'pending' && (
							<button
								onClick={() => handleSubmitForReview('playstore')}
								style={{
									marginTop: '15px',
									padding: '10px 25px',
									background: '#34A853',
									border: 'none',
									borderRadius: '20px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								Submit for Review
							</button>
						)}
					</div>
				</div>

				{reviewFeedback.length > 0 && (
					<div style={{
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '15px',
						padding: '20px',
						margin: '30px 0'
					}}>
						<h4 style={{ marginBottom: '15px' }}>Review Feedback</h4>
						{reviewFeedback.map((feedback, index) => (
							<div key={index} style={{
								padding: '15px',
								background: feedback.status === 'approved' 
									? 'rgba(76, 175, 80, 0.1)' 
									: 'rgba(244, 67, 54, 0.1)',
								border: `1px solid ${feedback.status === 'approved' ? '#4CAF50' : '#F44336'}`,
								borderRadius: '10px',
								marginBottom: '10px'
							}}>
								<strong>{feedback.store === 'appstore' ? '🍎 App Store' : '🤖 Google Play'}</strong>
								<p style={{ margin: '5px 0' }}>{feedback.message}</p>
								{feedback.description && (
									<p style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										{feedback.description}
									</p>
								)}
							</div>
						))}
					</div>
				)}

				<h3 className='section-title' style={{ marginTop: '40px' }}>Beta Testing Board</h3>
				
				<InstructionBox character={`Binary displays the tester roster.`}>
					{`"Beta testers catch bugs before your users do. Activate pending testers and monitor bug reports from active ones."`}
				</InstructionBox>
				
				<div className='beta-testing-board'>
					<div className='tester-list'>
						{betaTesters.map((tester) => (
							<div key={tester.id} className='tester-item'>
								<div className='tester-avatar'>
									{tester.device.includes('iPhone') || tester.device.includes('iPad') ? '🍎' : '🤖'}
								</div>
								<div className='tester-info'>
									<strong>{tester.name}</strong>
									<p style={{ fontSize: '0.9em', color: '#bdc3c7', margin: '2px 0' }}>
										{tester.device}
									</p>
									{tester.status === 'active' && (
										<p style={{ fontSize: '0.85em', color: '#FFC107' }}>
											🐛 {tester.bugs} bugs reported
										</p>
									)}
								</div>
								<div className={`tester-status ${tester.status}`}>
									{tester.status === 'active' ? 'Testing' : 'Invite Sent'}
								</div>
								{tester.status === 'pending' && (
									<button
										onClick={() => handleTesterActivation(tester.id)}
										style={{
											padding: '5px 15px',
											background: '#00BCD4',
											border: 'none',
											borderRadius: '15px',
											color: 'white',
											cursor: 'pointer',
											fontSize: '0.85em'
										}}
									>
										Activate
									</button>
								)}
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>App Store Optimization (ASO)</h3>
				
				<InstructionBox character={`Debuggora reveals the discovery algorithms.`}>
					{`"Click keywords to add them to your ASO strategy. Watch how visibility and your ASO score improve!"`}
				</InstructionBox>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px',
					margin: '20px 0'
				}}>
					<div className='metrics-dashboard'>
						<div className='metric-card'>
							<div className='metric-icon'>👁️</div>
							<div className='metric-value'>{asoMetrics.visibility}%</div>
							<div className='metric-label'>Visibility Score</div>
						</div>
						<div className='metric-card'>
							<div className='metric-icon'>🎯</div>
							<div className='metric-value'>{asoMetrics.conversion}%</div>
							<div className='metric-label'>Conversion Rate</div>
						</div>
						<div className='metric-card'>
							<div className='metric-icon'>🏆</div>
							<div className='metric-value'>{calculateASOScore()}%</div>
							<div className='metric-label'>ASO Score</div>
						</div>
					</div>

					<h5 style={{ marginTop: '25px', marginBottom: '15px' }}>Keyword Optimization</h5>
					<div style={{ display: 'grid', gap: '10px' }}>
						{asoKeywords.map((kw, index) => (
							<div key={index} style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '12px',
								background: 'rgba(0, 188, 212, 0.1)',
								borderRadius: '8px',
								cursor: 'pointer',
								border: asoMetrics.keywords.includes(kw.keyword) 
									? '2px solid #FFC107' 
									: '1px solid rgba(0, 188, 212, 0.3)'
							}}
							onClick={() => {
								if (asoMetrics.keywords.includes(kw.keyword)) {
									setAsoMetrics(prev => ({
										...prev,
										keywords: prev.keywords.filter(k => k !== kw.keyword)
									}));
								} else {
									setAsoMetrics(prev => ({
										...prev,
										keywords: [...prev.keywords, kw.keyword],
										visibility: Math.min(prev.visibility + 5, 100)
									}));
								}
							}}>
								<span>{kw.keyword}</span>
								<div style={{ display: 'flex', gap: '15px', fontSize: '0.85em' }}>
									<span style={{ color: kw.difficulty === 'High' ? '#F44336' : kw.difficulty === 'Medium' ? '#FFC107' : '#4CAF50' }}>
										Difficulty: {kw.difficulty}
									</span>
									<span style={{ color: '#bdc3c7' }}>
										Volume: {kw.volume}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Review Process Timeline</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					{reviewStages.map((stage, index) => (
						<div key={index} style={{
							display: 'flex',
							alignItems: 'center',
							gap: '20px',
							marginBottom: '20px',
							padding: '15px',
							background: index === 1 && (reviewStatus.appstore === 'reviewing' || reviewStatus.playstore === 'reviewing')
								? 'rgba(255, 193, 7, 0.1)'
								: 'transparent',
							borderRadius: '10px',
							borderLeft: '4px solid',
							borderColor: index === 1 && (reviewStatus.appstore === 'reviewing' || reviewStatus.playstore === 'reviewing')
								? '#FFC107'
								: 'rgba(0, 188, 212, 0.3)'
						}}>
							<div style={{ fontSize: '2em' }}>{stage.icon}</div>
							<div>
								<strong>{stage.stage}</strong>
								<p style={{ fontSize: '0.9em', color: '#bdc3c7', marginTop: '5px' }}>
									Typical duration: {stage.duration}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<CodeExample
				title={`Store Review Guidelines`}
				discoveredBy={`Publisher Prime's review wisdom`}
				code={`# App Store Review Guidelines
// Publisher Prime: "Know the rules before you play the game!"

# Common Rejection Reasons & Solutions

## 1. App Completeness (Guideline 2.1)
// Binary: "Crashes = instant rejection!"
- Test on multiple devices
- Use crash reporting (Crashlytics, Sentry)
- TestFlight for beta testing
- Check memory usage

// Pre-submission testing
npm test
npm run lint
# Device testing
react-native run-ios --device "iPhone 13"
react-native run-android --variant=release

## 2. Minimum Functionality (Guideline 4.2)
// Aria: "Apps need substance!"
- More than a simple wrapper
- Provide unique value
- Native features utilization
- Offline functionality

## 3. Privacy & Data (Guideline 5.1)
// Debuggora: "Privacy is paramount!"

// App Tracking Transparency (iOS 14.5+)
import { request, PERMISSIONS } from 'react-native-permissions';

const requestTracking = async () => {
  const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (result === 'granted') {
    // Enable tracking
  }
};

// Privacy Policy Requirements
- Clearly state data collection
- Third-party services disclosure
- Data retention policies
- User rights (deletion, access)

## 4. In-App Purchases (Guideline 3.1)
// Must use Apple's IAP for digital goods
import * as RNIap from 'react-native-iap';

const products = await RNIap.getProducts(['premium_monthly']);
const purchase = await RNIap.requestPurchase('premium_monthly');

# Google Play Policy Center

## Content Rating
// Age-appropriate content classification
- Everyone (E)
- Teen (T)
- Mature (M)

## Data Safety Section
// Declare data collection
{
  "data_collected": {
    "personal_info": {
      "name": true,
      "email": true
    },
    "location": {
      "approximate": true,
      "precise": false
    }
  },
  "data_sharing": {
    "analytics": true,
    "advertising": false
  },
  "security_practices": {
    "encryption_in_transit": true,
    "encryption_at_rest": true
  }
}

# Beta Testing Best Practices

## TestFlight (iOS)
// Up to 10,000 testers
1. Upload build to App Store Connect
2. Add internal testers (100 max)
3. Add external testers (10,000 max)
4. Collect feedback via TestFlight

// Automatic updates
- Testers get updates automatically
- 90-day build expiration
- Crash reports included

## Google Play Console Testing
// Multiple testing tracks
1. Internal testing (100 testers)
2. Closed testing (custom lists)
3. Open testing (anyone with link)

// Play Console setup
- Create testing track
- Upload AAB/APK
- Add testers by email
- Share opt-in link

# ASO (App Store Optimization)

## Keywords Strategy
// iOS: 100 character limit
"react,native,mobile,app,development,javascript,cross,platform"

// Avoid:
- Competitor names
- Irrelevant terms
- Keyword stuffing

## Title Optimization
// iOS: 30 characters
// Android: 30 characters (50 on some devices)
"YourApp - Descriptive Tagline"

## Description Best Practices
// First 2-3 lines are crucial
"Transform your [problem] with [solution]. 
YourApp helps you [key benefit] in seconds.

KEY FEATURES:
• Feature 1 with benefit
• Feature 2 with benefit
• Feature 3 with benefit"

## Screenshots
// Tell a story
1. Hero shot - best feature
2. Core functionality
3. Unique value prop
4. Social proof
5. Call to action

# Review Response Templates

## Positive Reviews
"Thank you for the 5-star review! We're thrilled you love 
[specific feature]. Stay tuned for exciting updates!"

## Negative Reviews
"We're sorry to hear about your experience. Please contact 
support@yourapp.com so we can help resolve this issue."

## Feature Requests
"Thanks for the suggestion! We've noted your request for 
[feature] and will consider it for future updates."

# Resubmission After Rejection

## Resolution Steps
1. Read rejection reason carefully
2. Fix all mentioned issues
3. Test thoroughly
4. Update review notes
5. Resubmit with explanation

// Review notes example
"In response to your rejection for Guideline 2.1:
- Fixed crash on launch (line 234 in HomeScreen.js)
- Added null checks for undefined data
- Tested on all device sizes
- Attached crash logs showing resolution"`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Review Lesson:`,
					content: `The Review Gauntlet teaches that app store review is not an obstacle but a quality checkpoint. Each platform has its own priorities - Apple focuses on user experience and guideline adherence, Google emphasizes security and policy compliance. Success comes from understanding these requirements, thorough testing, and viewing rejections as opportunities to improve. Beta testing and ASO are not afterthoughts but essential parts of the journey to app store success.`
				}}
				reflectionQuestions={[
					`How do app store reviews protect users while challenging developers to create better apps?`,
					`Why is beta testing crucial for mobile apps but less common for web applications?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Afternoon)`,
					content: `The Review Gauntlet is intense! I submitted to both stores and experienced the nerve-wracking wait. Binary's analysis proved accurate - rejections happen, but each one teaches something new. I learned about common rejection reasons: crashes (40%), guideline violations (30%), metadata issues (20%). Beta testing with ${betaTesters.filter(t => t.status === 'active').length} active testers revealed ${betaTesters.reduce((sum, t) => sum + t.bugs, 0)} bugs before submission! The ASO dashboard showed my visibility at ${asoMetrics.visibility}% with ${asoMetrics.keywords.length} keywords optimized. Publisher Prime's wisdom: "Each rejection is a learning opportunity. The key is understanding why and fixing it properly." Persistence is the path to approval!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
