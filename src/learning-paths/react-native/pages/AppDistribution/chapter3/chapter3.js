import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [launchRegions, setLaunchRegions] = useState({
		northAmerica: false,
		europe: false,
		asia: false,
		southAmerica: false,
		africa: false,
		oceania: false
	});
	const [appMetrics, setAppMetrics] = useState({
		downloads: 0,
		activeUsers: 0,
		rating: 0,
		reviews: 0,
		revenue: 0,
		crashes: 0
	});
	const [updateStrategy, setUpdateStrategy] = useState('phased');
	const [localizationLanguages, setLocalizationLanguages] = useState(['en']);
	const [achievementUnlocked, setAchievementUnlocked] = useState(false);
	
	const { 
		publishingProgress,
		advancePublishing,
		globalReach,
		expandGlobalReach,
		publisherLevel,
		setPublisherLevel,
		storeSubmissions
	} = useOutletContext();

	const regions = [
		{ id: 'northAmerica', name: 'North America', countries: 3, icon: '🇺🇸' },
		{ id: 'europe', name: 'Europe', countries: 27, icon: '🇪🇺' },
		{ id: 'asia', name: 'Asia', countries: 48, icon: '🇯🇵' },
		{ id: 'southAmerica', name: 'South America', countries: 12, icon: '🇧🇷' },
		{ id: 'africa', name: 'Africa', countries: 54, icon: '🇿🇦' },
		{ id: 'oceania', name: 'Oceania', countries: 14, icon: '🇦🇺' }
	];

	const languages = [
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'es', name: 'Spanish', flag: '🇪🇸' },
		{ code: 'fr', name: 'French', flag: '🇫🇷' },
		{ code: 'de', name: 'German', flag: '🇩🇪' },
		{ code: 'ja', name: 'Japanese', flag: '🇯🇵' },
		{ code: 'zh', name: 'Chinese', flag: '🇨🇳' },
		{ code: 'ko', name: 'Korean', flag: '🇰🇷' },
		{ code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
	];

	const updateStrategies = [
		{ 
			id: 'immediate', 
			name: 'Immediate Release', 
			description: 'Release to all users at once',
			risk: 'High',
			icon: '🚀'
		},
		{ 
			id: 'phased', 
			name: 'Phased Release', 
			description: 'Gradual rollout over 7 days',
			risk: 'Low',
			icon: '📈'
		},
		{ 
			id: 'manual', 
			name: 'Manual Release', 
			description: 'You control when to release',
			risk: 'Medium',
			icon: '🎛️'
		}
	];

	const handleRegionLaunch = (regionId, countries) => {
		if (!launchRegions[regionId]) {
			setLaunchRegions(prev => ({
				...prev,
				[regionId]: true
			}));
			expandGlobalReach(countries);
			
			// Simulate metrics growth
			setAppMetrics(prev => ({
				downloads: prev.downloads + countries * 1000,
				activeUsers: prev.activeUsers + countries * 500,
				rating: Math.min(prev.rating + 0.1, 5),
				reviews: prev.reviews + countries * 50,
				revenue: prev.revenue + countries * 100
			}));
		}
	};

	const handleLanguageAdd = (langCode) => {
		if (!localizationLanguages.includes(langCode)) {
			setLocalizationLanguages([...localizationLanguages, langCode]);
			setAppMetrics(prev => ({
				...prev,
				downloads: prev.downloads + 5000,
				activeUsers: prev.activeUsers + 2000
			}));
		}
	};

	const calculateGlobalCoverage = () => {
		const totalCountries = regions.reduce((sum, r) => sum + r.countries, 0);
		return Math.round((globalReach / totalCountries) * 100);
	};

	useEffect(() => {
		// Check for final achievement
		const regionsLaunched = Object.values(launchRegions).filter(v => v).length;
		if (regionsLaunched >= 4 && localizationLanguages.length >= 3 && !achievementUnlocked) {
			setAchievementUnlocked(true);
			setPublisherLevel('Global Publisher');
			if (!publishingProgress.launch) {
				advancePublishing('launch');
			}
		}
	}, [launchRegions, localizationLanguages, achievementUnlocked, publishingProgress, advancePublishing, setPublisherLevel]);

	// Auto-increment metrics over time when launched
	useEffect(() => {
		if (globalReach > 0) {
			const interval = setInterval(() => {
				setAppMetrics(prev => ({
					downloads: prev.downloads + Math.floor(Math.random() * 100),
					activeUsers: prev.activeUsers + Math.floor(Math.random() * 50),
					rating: Math.min(prev.rating + (Math.random() * 0.01), 5),
					reviews: prev.reviews + Math.floor(Math.random() * 5),
					revenue: prev.revenue + Math.floor(Math.random() * 20),
					crashes: Math.max(0, prev.crashes + (Math.random() > 0.8 ? 1 : -1))
				}));
			}, 2000);
			
			return () => clearInterval(interval);
		}
	}, [globalReach]);

	return (
		<div className='chapter app-distribution'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Global Launch`}
				bridge={`With both stores showing approval badges, Publisher Prime led Aria to the highest tower of the Publishing Port - the Global Launch Control Center. "You've passed the Review Gauntlet," he said proudly. "Now comes the most exciting part of all - releasing your app to the world and watching it grow."`}
			/>

		<StorySection
			paragraphs={[
				`Aria's app launched globally. "Millions of devices, different languages, various screen sizes - all running my React Native app!"`,
				`Publisher Prime celebrated. "From web to mobile, you've conquered both frontiers. Your app now reaches users worldwide."`,
				`Binary streamed analytics. "Downloads increasing! User engagement: optimal. Crash rate: minimal. Revenue generation: active!"`,
				`Debuggora monitored error reports. "Crashes from 132 device models, but our error handling catches 99.2% gracefully!"`,
				`"Global distribution isn't the end," Publisher Prime advised. "It's the beginning of your app's journey. Monitor, update, and grow."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Global Launch Control</h3>
				
				<InstructionBox character={`Publisher Prime unveils the world map.`}>
					{`"Click on regions to launch your app globally! Each region adds countries to your reach and boosts your metrics. Launch in 4+ regions with 3+ languages to achieve Global Publisher status!"`}
				</InstructionBox>
				
				<div className='global-launch-map'>
					<div className='world-map'>🌍</div>
					<h4 style={{ marginTop: '20px' }}>
						Global Coverage: {calculateGlobalCoverage()}% ({globalReach} countries)
					</h4>
					
					<div className='launch-regions'>
						{regions.map((region) => (
							<div 
								key={region.id}
								className={`region-tile ${launchRegions[region.id] ? 'active' : ''}`}
								onClick={() => handleRegionLaunch(region.id, region.countries)}
							>
								<div style={{ fontSize: '2em', marginBottom: '5px' }}>
									{region.icon}
								</div>
								<div style={{ fontWeight: 'bold' }}>{region.name}</div>
								<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									{region.countries} countries
								</div>
								{launchRegions[region.id] && (
									<div style={{ 
										marginTop: '5px', 
										color: '#4CAF50',
										fontSize: '0.9em'
									}}>
										✓ Launched
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>App Performance Metrics</h3>
				
				<div className='metrics-dashboard'>
					<div className='metric-card'>
						<div className='metric-icon'>📱</div>
						<div className='metric-value'>{appMetrics.downloads.toLocaleString()}</div>
						<div className='metric-label'>Total Downloads</div>
					</div>
					<div className='metric-card'>
						<div className='metric-icon'>👥</div>
						<div className='metric-value'>{appMetrics.activeUsers.toLocaleString()}</div>
						<div className='metric-label'>Active Users</div>
					</div>
					<div className='metric-card'>
						<div className='metric-icon'>⭐</div>
						<div className='metric-value'>{appMetrics.rating.toFixed(1)}</div>
						<div className='metric-label'>Average Rating</div>
					</div>
					<div className='metric-card'>
						<div className='metric-icon'>💬</div>
						<div className='metric-value'>{appMetrics.reviews.toLocaleString()}</div>
						<div className='metric-label'>User Reviews</div>
					</div>
					<div className='metric-card'>
						<div className='metric-icon'>💰</div>
						<div className='metric-value'>${appMetrics.revenue.toLocaleString()}</div>
						<div className='metric-label'>Revenue</div>
					</div>
					<div className='metric-card'>
						<div className='metric-icon'>🐛</div>
						<div className='metric-value'>{appMetrics.crashes}</div>
						<div className='metric-label'>Crash Reports</div>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Localization Center</h3>
				
				<InstructionBox character={`Binary calculates international potential.`}>
					{`"Each language you support opens doors to millions more users. Click languages to add localization support!"`}
				</InstructionBox>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px',
					margin: '20px 0'
				}}>
					<p style={{ marginBottom: '20px', color: '#bdc3c7' }}>
						Supporting {localizationLanguages.length} languages
					</p>
					
					<div style={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
						gap: '15px'
					}}>
						{languages.map((lang) => (
							<div 
								key={lang.code}
								onClick={() => handleLanguageAdd(lang.code)}
								style={{
									padding: '15px',
									background: localizationLanguages.includes(lang.code) 
										? 'rgba(0, 188, 212, 0.2)' 
										: 'rgba(0, 188, 212, 0.05)',
									border: localizationLanguages.includes(lang.code)
										? '2px solid #00BCD4'
										: '1px solid rgba(0, 188, 212, 0.3)',
									borderRadius: '10px',
									cursor: 'pointer',
									textAlign: 'center',
									transition: 'all 0.3s ease'
								}}
							>
								<div style={{ fontSize: '2em', marginBottom: '5px' }}>
									{lang.flag}
								</div>
								<div style={{ fontSize: '0.9em' }}>{lang.name}</div>
								{localizationLanguages.includes(lang.code) && (
									<div style={{ fontSize: '0.8em', color: '#4CAF50', marginTop: '5px' }}>
										✓ Active
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Update Strategy</h3>
				
				<InstructionBox character={`Publisher Prime explains deployment approaches.`}>
					{`"Choose your update strategy wisely. Phased releases minimize risk, while immediate releases get features to users faster."`}
				</InstructionBox>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					{updateStrategies.map((strategy) => (
						<div 
							key={strategy.id}
							onClick={() => setUpdateStrategy(strategy.id)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '20px',
								padding: '15px',
								marginBottom: '15px',
								background: updateStrategy === strategy.id 
									? 'rgba(0, 188, 212, 0.2)' 
									: 'transparent',
								border: updateStrategy === strategy.id
									? '2px solid #00BCD4'
									: '1px solid rgba(0, 188, 212, 0.2)',
								borderRadius: '10px',
								cursor: 'pointer',
								transition: 'all 0.3s ease'
							}}
						>
							<div style={{ fontSize: '2em' }}>{strategy.icon}</div>
							<div style={{ flex: 1 }}>
								<strong>{strategy.name}</strong>
								<p style={{ fontSize: '0.9em', color: '#bdc3c7', margin: '5px 0' }}>
									{strategy.description}
								</p>
							</div>
							<div style={{
								padding: '5px 15px',
								borderRadius: '15px',
								fontSize: '0.85em',
								background: strategy.risk === 'High' 
									? 'rgba(244, 67, 54, 0.2)' 
									: strategy.risk === 'Medium' 
									? 'rgba(255, 193, 7, 0.2)' 
									: 'rgba(76, 175, 80, 0.2)',
								color: strategy.risk === 'High' 
									? '#F44336' 
									: strategy.risk === 'Medium' 
									? '#FFC107' 
									: '#4CAF50'
							}}>
								Risk: {strategy.risk}
							</div>
						</div>
					))}
				</div>

				{achievementUnlocked && (
					<div className='achievement-banner'>
						<div className='publisher-badge'>🌐</div>
						<h2 style={{ marginBottom: '10px' }}>Global Publisher Achieved!</h2>
						<p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
							Your app has successfully launched worldwide
						</p>
						<div style={{ fontSize: '1.1em' }}>
							Publisher Level: <strong>{publisherLevel}</strong>
						</div>
					</div>
				)}
			</div>

			<CodeExample
				title={`Post-Launch Operations`}
				discoveredBy={`Publisher Prime's global strategy`}
				code={`# Global App Management
// Publisher Prime: "Launch is just the beginning!"

# App Analytics Integration

## Firebase Analytics (Cross-platform)
npm install @react-native-firebase/analytics

import analytics from '@react-native-firebase/analytics';

// Track user events
await analytics().logEvent('purchase', {
  value: 19.99,
  currency: 'usd',
  items: [{
    item_id: 'premium_monthly',
    item_name: 'Premium Subscription',
    item_category: 'subscription'
  }]
});

// Track screen views
await analytics().logScreenView({
  screen_name: 'ProductDetail',
  screen_class: 'ProductDetailScreen'
});

// User properties
await analytics().setUserProperties({
  subscription_type: 'premium',
  preferred_language: 'en'
});

## App Store Connect Analytics
// Automatic tracking includes:
- App Units (downloads)
- Sales & Proceeds
- Usage (sessions, crashes)
- Retention metrics

// Custom tracking with App Analytics API
import { AppAnalytics } from '@apple/app-store-connect-api';

const metrics = await AppAnalytics.getMetrics({
  app_id: 'your-app-id',
  metric_types: ['DOWNLOADS', 'PROCEEDS', 'SESSIONS'],
  group_by: ['TERRITORY', 'DEVICE'],
  date_range: 'LAST_30_DAYS'
});

## Google Play Console Reports
// Key metrics available:
- Acquisition reports
- User engagement
- Revenue metrics
- Technical performance

# Localization Implementation

## React Native Localization
npm install react-native-localize i18next react-i18next

// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to {{appName}}',
      get_started: 'Get Started',
      settings: 'Settings'
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a {{appName}}',
      get_started: 'Comenzar',
      settings: 'Configuración'
    }
  },
  ja: {
    translation: {
      welcome: '{{appName}}へようこそ',
      get_started: '始める',
      settings: '設定'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Usage in components
import { useTranslation } from 'react-i18next';

function WelcomeScreen() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('welcome', { appName: 'MyApp' })}</Text>
      <Button title={t('get_started')} />
    </View>
  );
}

# Update Strategies

## Phased Rollout (Recommended)
// Binary: "Risk mitigation through gradual deployment!"

// App Store Connect
- 1% → 2% → 5% → 10% → 20% → 50% → 100%
- 7-day rollout period
- Pause if issues detected

// Google Play Console
- Custom percentage rollout
- Can increase/decrease percentage
- Halt rollout option

## Version Management
// Semantic Versioning
{
  "version": "1.2.3",
  // Major.Minor.Patch
  // Breaking.Feature.Bugfix
}

// Platform-specific versioning
// iOS: CFBundleShortVersionString + CFBundleVersion
// Android: versionName + versionCode

## Over-the-Air Updates (CodePush)
// Aria: "Update JavaScript without store review!"
npm install react-native-code-push

import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE
};

class App extends Component {
  componentDidMount() {
    CodePush.sync({
      updateDialog: {
        title: 'Update Available',
        mandatoryUpdateMessage: 'An update is available that must be installed.',
        mandatoryContinueButtonLabel: 'Continue',
        optionalUpdateMessage: 'An update is available. Would you like to install it?',
        optionalInstallButtonLabel: 'Install',
        optionalIgnoreButtonLabel: 'Ignore'
      }
    });
  }
}

export default CodePush(codePushOptions)(App);

# Crash Reporting & Monitoring

## Crashlytics Integration
npm install @react-native-firebase/crashlytics

// Force a test crash
import crashlytics from '@react-native-firebase/crashlytics';

crashlytics().crash();

// Log custom events
crashlytics().log('User clicked purchase');
crashlytics().setUserId('user123');
crashlytics().setAttribute('subscription', 'premium');

// Record non-fatal errors
try {
  // risky operation
} catch (error) {
  crashlytics().recordError(error);
}

## Performance Monitoring
npm install @react-native-firebase/perf

import perf from '@react-native-firebase/perf';

// Network request monitoring
const httpMetric = await perf().newHttpMetric(
  'https://api.example.com/data',
  'GET'
);
await httpMetric.start();
// make request
await httpMetric.setHttpResponseCode(200);
await httpMetric.setResponseContentType('application/json');
await httpMetric.stop();

// Custom traces
const trace = await perf().startTrace('custom_trace');
trace.putAttribute('user_type', 'premium');
trace.incrementMetric('items_loaded', 25);
await trace.stop();

# User Feedback Loop

## In-App Reviews
// Debuggora: "Ask at the right moment!"
npm install react-native-in-app-review

import InAppReview from 'react-native-in-app-review';

const requestReview = async () => {
  // Check if available
  const isAvailable = InAppReview.isAvailable();
  
  if (isAvailable) {
    // Trigger review dialog
    await InAppReview.RequestInAppReview();
  }
};

// Best practices:
- After successful action
- Not during onboarding
- Max 3 times per year
- After positive interaction

# Revenue Optimization

## A/B Testing Pricing
// Test different price points
const experiments = {
  pricing_test: {
    variants: {
      control: { price: 4.99 },
      variant_a: { price: 3.99 },
      variant_b: { price: 5.99 }
    }
  }
};

## Subscription Management
// Track subscription metrics
- Monthly Recurring Revenue (MRR)
- Churn rate
- Lifetime Value (LTV)
- Trial conversion rate`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Global Launch Lesson:`,
					content: `Global distribution transforms your app from a project into a living product. Publisher Prime's wisdom reveals that launch is not the destination but the beginning of a continuous journey. Success comes from monitoring metrics, responding to user feedback, expanding to new markets, and constantly improving. The mobile frontier rewards those who treat their apps as evolving services, not static products.`
				}}
				reflectionQuestions={[
					`How does global distribution change the responsibility of app developers?`,
					`Why is continuous monitoring and updating crucial for mobile apps' long-term success?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Evening)`,
					content: `I've done it - my React Native app is live globally! The metrics dashboard shows ${appMetrics.downloads.toLocaleString()} downloads across ${globalReach} countries, with ${localizationLanguages.length} languages supported. Binary streams real-time analytics: active users at ${appMetrics.activeUsers.toLocaleString()}, rating climbing to ${appMetrics.rating.toFixed(1)} stars. I chose the ${updateStrategy} release strategy for future updates - ${updateStrategy === 'phased' ? 'minimizing risk through gradual rollout' : updateStrategy === 'immediate' ? 'getting features to users fast' : 'maintaining full control'}. Publisher Prime's final wisdom: "Launch is just the beginning. Monitor, update, and grow." Publisher Level: ${publisherLevel}. The Mobile Frontier is conquered! 🎉`
				}}
				chapterEnding={[
					`As the global metrics streamed across the dashboard, Publisher Prime placed a hand on Aria's shoulder. "You've completed the Mobile Frontier," he said proudly. "From React Native foundations to native powers, from navigation trails to worldwide distribution."`,
					`Binary processed the achievement statistics. "Four lessons completed. Twelve chapters mastered. One unified codebase running on millions of devices across ${globalReach > 0 ? globalReach : 'countless'} countries. Truly remarkable, Aria."`,
					`Marshal Native appeared at the tower's entrance, a rare smile crossing his weathered face. "Captain Aria, you've proven that React truly is 'learn once, write anywhere.' You've taken web wisdom and applied it to the mobile realm."`,
					`Debuggora perched on the observation deck, watching downloads tick upward from around the world. "Each number represents a user whose life you've touched. Each crash report handled gracefully. Each feature making someone's day easier."`,
					`Aria looked out over the Publishing Port, where ships carried apps to every corner of the digital world. "I started this journey in the React Kingdom, learning about components and state. Now I'm distributing apps globally."`,
					`"The Mobile Frontier was just one of many realms," Publisher Prime reminded her. "The Accessibility Empire awaits - where you'll learn to make your apps truly universal, reaching users of all abilities."`,
					`Binary's circuits hummed with anticipation. "New patterns to learn. New users to serve. The journey continues!"`,
					`🎓 Congratulations! You have completed the React Native Learning Path! Your apps now run on billions of devices worldwide, powered by React's elegant component model. The Mobile Frontier is yours! 🌍📱`
				]}
			/>
		</div>
	);
};

export default ChapterThree;
