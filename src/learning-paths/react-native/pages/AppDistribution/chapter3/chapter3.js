import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>
				Chapter 3: The Global Launch
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Aria's app launched globally. "Millions of devices, different languages, 
					various screen sizes - all running my React Native app!"
				</p>
				
				<p className='story-paragraph'>
					Publisher Prime celebrated. "From web to mobile, you've conquered both 
					frontiers. Your app now reaches users worldwide."
				</p>

				<p className='story-paragraph'>
					Binary streamed analytics. "Downloads increasing! User engagement: optimal. 
					Crash rate: minimal. Revenue generation: active!"
				</p>

				<p className='story-paragraph'>
					Debuggora monitored error reports. "Crashes from 132 device models, but our 
					error handling catches 99.2% gracefully!"
				</p>

				<p className='story-paragraph'>
					"Global distribution isn't the end," Publisher Prime advised. "It's the 
					beginning of your app's journey. Monitor, update, and grow."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Global Launch Control</h3>
				
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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Post-Launch Operations</span>
					<span className='discovered-by'>Publisher Prime's global strategy</span>
				</div>
				<pre>{`# Global App Management
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
- Trial conversion rate`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Global Launch Lesson:</h3>
				<p>
					Global distribution transforms your app from a project into a living product. 
					Publisher Prime's wisdom reveals that launch is not the destination but the 
					beginning of a continuous journey. Success comes from monitoring metrics, 
					responding to user feedback, expanding to new markets, and constantly improving. 
					The mobile frontier rewards those who treat their apps as evolving services, 
					not static products.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does global distribution change the responsibility of app developers?
				</p>
				<p>
					Why is continuous monitoring and updating crucial for mobile apps' long-term success?
				</p>
			</div>

			<div className='achievement-section' style={{ 
				marginTop: '40px',
				padding: '30px',
				background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(156, 39, 176, 0.1))',
				borderRadius: '20px',
				textAlign: 'center'
			}}>
				<h3 style={{ color: '#00BCD4', marginBottom: '20px' }}>
					The Mobile Achievement
				</h3>
				<p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
					Standing at the Mobile Frontier's edge, Aria reflected on her journey. 
					She'd taken React's principles and applied them to an entirely new platform.
				</p>
				<p style={{ fontSize: '1.1em', lineHeight: '1.8', marginTop: '15px' }}>
					Marshal Native approached. "Captain Aria, you've proven that React truly 
					is learn once, write anywhere. Your final challenge awaits in the Inclusive Empire."
				</p>
				<p style={{ fontSize: '1.1em', lineHeight: '1.8', marginTop: '15px' }}>
					Binary had adapted to process touch, motion, and native APIs. Debuggora 
					had learned to debug across platforms and devices.
				</p>
				<p style={{ 
					fontSize: '1.2em', 
					fontWeight: 'bold', 
					color: '#FFC107', 
					marginTop: '25px' 
				}}>
					"One more kingdom to make React truly universal," Aria declared. 
					"To the Inclusive Empire!"
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;