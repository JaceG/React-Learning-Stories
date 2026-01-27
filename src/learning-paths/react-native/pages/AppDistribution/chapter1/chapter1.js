import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const [selectedChecklist, setSelectedChecklist] = useState('ios');
	const [checklistItems, setChecklistItems] = useState({
		ios: {
			certificate: false,
			provisioning: false,
			appIcon: false,
			screenshots: false,
			metadata: false,
			privacy: false
		},
		android: {
			keystore: false,
			appIcon: false,
			featureGraphic: false,
			screenshots: false,
			description: false,
			contentRating: false
		}
	});
	const [buildStatus, setBuildStatus] = useState('ready');
	const [activeTools, setActiveTools] = useState([]);
	
	const { 
		publishingProgress,
		advancePublishing,
		appStatus,
		updateAppStatus,
		publisherLevel
	} = useOutletContext();

	const publishingTools = [
		{ id: 'fastlane', name: 'Fastlane', icon: '🚀', description: 'Automate builds and releases' },
		{ id: 'expo-eas', name: 'Expo EAS', icon: '📦', description: 'Cloud build service' },
		{ id: 'codemagic', name: 'Codemagic', icon: '🎩', description: 'CI/CD for mobile apps' },
		{ id: 'bitrise', name: 'Bitrise', icon: '🔧', description: 'Mobile DevOps platform' },
		{ id: 'appcenter', name: 'App Center', icon: '📊', description: 'Build, test, distribute' },
		{ id: 'testflight', name: 'TestFlight', icon: '✈️', description: 'iOS beta testing' }
	];

	const certificateTypes = [
		{ platform: 'iOS', type: 'Development', status: 'Valid', expiry: '2025-01-15' },
		{ platform: 'iOS', type: 'Distribution', status: 'Valid', expiry: '2025-01-15' },
		{ platform: 'Android', type: 'Release Keystore', status: 'Created', expiry: 'Never' }
	];

	const handleChecklistToggle = (platform, item) => {
		setChecklistItems(prev => ({
			...prev,
			[platform]: {
				...prev[platform],
				[item]: !prev[platform][item]
			}
		}));
		
		// Check if all items are complete
		const updatedItems = {
			...checklistItems,
			[platform]: {
				...checklistItems[platform],
				[item]: !checklistItems[platform][item]
			}
		};
		
		const allComplete = Object.values(updatedItems[platform]).every(v => v);
		if (allComplete && !publishingProgress.preparation) {
			advancePublishing('preparation');
			updateAppStatus('ready-to-submit');
		}
	};

	const handleToolActivation = (toolId) => {
		if (!activeTools.includes(toolId)) {
			setActiveTools([...activeTools, toolId]);
		}
	};

	const handleBuildStart = () => {
		setBuildStatus('building');
		updateAppStatus('building');
		
		// Simulate build process
		setTimeout(() => {
			setBuildStatus('complete');
			updateAppStatus('built');
		}, 3000);
	};

	const getChecklistProgress = (platform) => {
		const items = checklistItems[platform];
		const completed = Object.values(items).filter(v => v).length;
		const total = Object.values(items).length;
		return (completed / total) * 100;
	};

	return (
		<div className='chapter app-distribution'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Publishing Port`}
			/>

		<StorySection
			paragraphs={[
				<>The Publishing Port prepared apps for their journey to the App Store and Google Play. <strong>Publisher Prime</strong> reviewed Aria's app. "Web deployment was instant. Mobile requires approval, certificates, and patience."</>,
				`The port buzzed with activity - apps being signed, tested, and packaged. "Each store has its own requirements, review process, and rules."`,
				`Aria surveyed the preparation areas. "So many steps before users can even download the app!"`,
				`Binary processed requirements. "Certificates: check. Provisioning profiles: check. App signing: in progress. Metadata optimization: pending!"`,
				`"Preparation is key," Publisher Prime explained. "A well-prepared submission sails through review. A hasty one gets rejected repeatedly."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Publishing Preparation Center</h3>
				
				<InstructionBox character={`Publisher Prime hands you a preparation manifest.`}>
					{`"Start the build process and complete the platform checklists. Each checkbox represents a crucial step in your app's journey to the stores."`}
				</InstructionBox>
				
				<div className='publishing-port'>
					<div className='app-pipeline'>
						<div className='pipeline-connector'>
							<div 
								className='pipeline-progress' 
								style={{ width: buildStatus === 'complete' ? '100%' : buildStatus === 'building' ? '50%' : '0%' }}
							/>
						</div>
						<div className='pipeline-stage'>
							<div className={`stage-icon ${buildStatus !== 'ready' ? 'completed' : 'active'}`}>
								📱
							</div>
							<h4>Development</h4>
							<p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>App ready</p>
						</div>
						<div className='pipeline-stage'>
							<div className={`stage-icon ${buildStatus === 'building' ? 'active' : buildStatus === 'complete' ? 'completed' : ''}`}>
								🔨
							</div>
							<h4>Build & Sign</h4>
							<p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
								{buildStatus === 'building' ? 'Building...' : buildStatus === 'complete' ? 'Complete' : 'Ready'}
							</p>
						</div>
						<div className='pipeline-stage'>
							<div className={`stage-icon ${appStatus === 'ready-to-submit' ? 'active' : ''}`}>
								📤
							</div>
							<h4>Submit</h4>
							<p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>To stores</p>
						</div>
					</div>

					{buildStatus === 'ready' && (
						<div style={{ textAlign: 'center', marginTop: '30px' }}>
							<button
								onClick={handleBuildStart}
								style={{
									padding: '15px 40px',
									background: 'linear-gradient(135deg, #00BCD4, #0097A7)',
									border: 'none',
									borderRadius: '25px',
									color: 'white',
									fontSize: '1.1em',
									fontWeight: 'bold',
									cursor: 'pointer',
									boxShadow: '0 5px 20px rgba(0, 188, 212, 0.3)'
								}}
							>
								Start Build Process
							</button>
						</div>
					)}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Pre-Submission Checklist</h3>
				
				<InstructionBox character={`Binary displays platform requirements.`}>
					{`"Toggle between iOS and Android to complete each platform's checklist. Watch your progress bar fill as you prepare for submission!"`}
				</InstructionBox>
				
				<div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
					<button
						onClick={() => setSelectedChecklist('ios')}
						style={{
							padding: '10px 25px',
							background: selectedChecklist === 'ios' ? '#0D7DF2' : 'rgba(13, 125, 242, 0.2)',
							border: '1px solid #0D7DF2',
							borderRadius: '20px',
							color: 'white',
							cursor: 'pointer'
						}}
					>
						🍎 iOS App Store
					</button>
					<button
						onClick={() => setSelectedChecklist('android')}
						style={{
							padding: '10px 25px',
							background: selectedChecklist === 'android' ? '#34A853' : 'rgba(52, 168, 83, 0.2)',
							border: '1px solid #34A853',
							borderRadius: '20px',
							color: 'white',
							cursor: 'pointer'
						}}
					>
						🤖 Google Play
					</button>
				</div>

				<div className='review-checklist'>
					<div style={{ marginBottom: '20px' }}>
						<div style={{ 
							background: 'rgba(0, 188, 212, 0.1)', 
							height: '8px', 
							borderRadius: '4px',
							overflow: 'hidden'
						}}>
							<div style={{
								width: `${getChecklistProgress(selectedChecklist)}%`,
								height: '100%',
								background: 'linear-gradient(90deg, #00BCD4, #FFC107)',
								transition: 'width 0.3s ease'
							}}/>
						</div>
						<p style={{ 
							textAlign: 'center', 
							marginTop: '10px', 
							color: '#bdc3c7',
							fontSize: '0.9em'
						}}>
							{getChecklistProgress(selectedChecklist).toFixed(0)}% Complete
						</p>
					</div>

					{Object.entries(checklistItems[selectedChecklist]).map(([item, checked]) => (
						<div 
							key={item} 
							className={`checklist-item ${checked ? 'completed' : ''}`}
							onClick={() => handleChecklistToggle(selectedChecklist, item)}
						>
							<div className={`checklist-checkbox ${checked ? 'checked' : ''}`}></div>
							<span className='checklist-label'>
								{item.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
							</span>
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Certificate Management</h3>
				
				<div className='certificate-viewer'>
					<div className='certificate-header'>
						<div className='certificate-seal'>🔏</div>
						<h4 style={{ color: '#00BCD4' }}>App Signing Certificates</h4>
					</div>
					
					<div style={{ 
						display: 'grid', 
						gap: '15px',
						marginTop: '20px'
					}}>
						{certificateTypes.map((cert, index) => (
							<div key={index} style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '15px',
								background: 'rgba(0, 188, 212, 0.1)',
								borderRadius: '10px',
								border: '1px solid rgba(0, 188, 212, 0.3)'
							}}>
								<div>
									<strong>{cert.platform}</strong> - {cert.type}
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
									<span style={{ 
										color: cert.status === 'Valid' ? '#4CAF50' : '#FFC107',
										fontSize: '0.9em'
									}}>
										{cert.status}
									</span>
									<span style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
										Expires: {cert.expiry}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Publishing Tools</h3>
				
				<InstructionBox character={`Publisher Prime reveals the tool arsenal.`}>
					{`"Click on each tool to activate it. These automation tools will be your allies in the publishing journey."`}
				</InstructionBox>
				
				<div className='publishing-tools'>
					<div className='tool-grid'>
						{publishingTools.map((tool) => (
							<div 
								key={tool.id}
								className='tool-item'
								onClick={() => handleToolActivation(tool.id)}
								style={{
									opacity: activeTools.includes(tool.id) ? 1 : 0.7,
									borderColor: activeTools.includes(tool.id) ? '#FFC107' : 'rgba(0, 188, 212, 0.3)'
								}}
							>
								<div className='tool-icon'>{tool.icon}</div>
								<h5 style={{ margin: '10px 0 5px' }}>{tool.name}</h5>
								<p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									{tool.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<CodeExample
				title={`App Store Preparation`}
				discoveredBy={`Publisher Prime's preparation guide`}
				code={`# iOS App Store Preparation
// Publisher Prime: "Certificates and profiles are your passport!"

# 1. Apple Developer Setup
- Enroll in Apple Developer Program ($99/year)
- Create App ID in Developer Portal
- Generate certificates:
  - iOS Development Certificate
  - iOS Distribution Certificate
  - Push Notification Certificate (if needed)

# 2. Provisioning Profiles
// Development Profile (for testing)
- Select App ID
- Select development certificates
- Select test devices

// Distribution Profile (for App Store)
- Select App ID
- Select distribution certificate
- No device selection needed

# 3. App Store Connect Setup
- Create new app
- Fill in app information:
  - Bundle ID (must match)
  - SKU (unique identifier)
  - Primary language

# 4. Build Configuration (React Native)
// ios/YourApp/Info.plist
<key>CFBundleDisplayName</key>
<string>Your App Name</string>
<key>CFBundleIdentifier</key>
<string>com.yourcompany.yourapp</string>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>

// Required permissions with descriptions
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to take photos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location to show nearby places</string>

# 5. Build & Archive
// Using Xcode
1. Select "Generic iOS Device" or "Any iOS Device"
2. Product > Archive
3. Window > Organizer
4. Validate App
5. Distribute App > App Store Connect

// Using Fastlane
# Fastfile
platform :ios do
  desc "Push a new release build to the App Store"
  lane :release do
    build_app(
      workspace: "YourApp.xcworkspace",
      scheme: "YourApp",
      export_method: "app-store"
    )
    upload_to_app_store(
      skip_metadata: true,
      skip_screenshots: true
    )
  end
end

# Android Google Play Preparation
// Binary: "Keystore security is critical!"

# 1. Generate Release Keystore
keytool -genkeypair -v -keystore my-release-key.keystore \\
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure Gradle
// android/gradle.properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****

// android/app/build.gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

# 3. Build Release APK/AAB
cd android
./gradlew bundleRelease  # For AAB (recommended)
# or
./gradlew assembleRelease  # For APK

# Output: android/app/build/outputs/bundle/release/app-release.aab

# 4. Google Play Console Setup
- Create application
- Set up store listing:
  - Title (30 chars)
  - Short description (80 chars)
  - Full description (4000 chars)
  - Screenshots (min 2, max 8)
  - Feature graphic (1024x500)
  - Icon (512x512)

# Using Expo EAS Build
// Aria: "Expo makes it so much easier!"

# 1. Install EAS CLI
npm install -g eas-cli

# 2. Configure project
eas build:configure

# 3. Build for iOS
eas build --platform ios

# 4. Build for Android
eas build --platform android

# 5. Submit to stores
eas submit --platform ios
eas submit --platform android

# Metadata Best Practices
// Debuggora: "Keywords matter for discovery!"

# App Store Optimization (ASO)
1. Title: Include main keyword
2. Subtitle: Secondary keywords (iOS)
3. Keywords field: 100 chars (iOS only)
4. Description: Natural keyword usage
5. Screenshots: Show key features
6. App Preview Video: 15-30 seconds

# Localization
// Support multiple languages
- App Store: 40+ languages
- Google Play: 80+ languages
- Localize:
  - App name
  - Description
  - Screenshots
  - Keywords`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Publisher Prime`,
						description: `Harbor master of the Publishing Port and expert navigator of app store requirements. His wisdom guides apps from code to global distribution. "Preparation is the difference between a smooth voyage and a shipwreck of rejections."`
					}
				]}
				lessonInsight={{
					title: `The Publishing Lesson:`,
					content: `The Publishing Port teaches that mobile app distribution is a journey, not a destination. Unlike web deployment's instant gratification, mobile apps must navigate certificates, provisioning profiles, and store requirements. Publisher Prime shows that preparation is everything - from proper signing to compelling metadata. Success comes from attention to detail, patience with the process, and understanding each platform's unique requirements.`
				}}
				reflectionQuestions={[
					`Why do mobile platforms require such extensive preparation compared to web deployment?`,
					`How does the app signing process protect both developers and users?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Morning)`,
					content: `I've arrived at the Publishing Port where Publisher Prime commands the preparation docks! The difference from web deployment is striking - no instant deploys here. Instead, there's a careful dance of certificates, provisioning profiles, and platform-specific requirements. I learned iOS needs Development and Distribution certificates, while Android requires a securely stored keystore. Binary tracked my progress: checklist completion at ${getChecklistProgress(selectedChecklist).toFixed(0)}%, ${activeTools.length} tools activated. Publisher Prime's wisdom: "A well-prepared submission sails through review. A hasty one gets rejected repeatedly." The Publishing Port awaits my app's voyage!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;
