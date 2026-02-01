const fs = require('fs');

const arrayContent = `[
					{
						name: \`Captain Marina\`,
						description: \`Expert guide through the Portal Passages chamber where the most advanced navigation concepts await - modals, overlays, and parallel routes. She teaches how to create portal-based navigation that maintains state, handles forms, and provides seamless transitions. "Portals combine every concept in our kingdom. Components provide structure, state manages portal visibility, effects handle focus management, and forms can span across portals. It all connects!"\`,
					},
				]`;

console.log('Testing regex patterns...\n');

// Test 1: Original regex (strict)
const backtickRegex = /\{\s*name:\s*`([^`]*)`\s*,\s*description:\s*`([^`]*)`\s*\}/gs;
console.log('Regex pattern (strict):', backtickRegex);

// Test 2: More flexible regex
const flexibleRegex = /\{\s*name:\s*`([^`]*)`[\s\S]*?description:\s*`([^`]*)`[\s\S]*?\}/g;
console.log('Regex pattern (flexible):', flexibleRegex);
console.log('\nArray content:');
console.log(arrayContent);
console.log('\n---\n');

let introMatch;
let count = 0;
while ((introMatch = backtickRegex.exec(arrayContent)) !== null) {
  count++;
  console.log(`Match ${count}:`);
  console.log('  Name:', introMatch[1]);
  console.log('  Description:', introMatch[2].substring(0, 100) + '...');
}

if (count === 0) {
  console.log('❌ Strict regex: No matches found');
  
  // Try flexible regex
  console.log('\nTrying flexible regex...');
  let flexCount = 0;
  while ((introMatch = flexibleRegex.exec(arrayContent)) !== null) {
    flexCount++;
    console.log(`Match ${flexCount}:`);
    console.log('  Name:', introMatch[1]);
    console.log('  Description:', introMatch[2].substring(0, 100) + '...');
  }
  
  if (flexCount === 0) {
    console.log('❌ Flexible regex: No matches found either');
    
    console.log('\nDebugging:');
    console.log('Has opening brace:', arrayContent.includes('{'));
    console.log('Has name:', arrayContent.includes('name:'));
    console.log('Has backticks:', arrayContent.includes('`'));
    console.log('Has description:', arrayContent.includes('description:'));
    
    // Try simpler patterns
    const nameMatch = arrayContent.match(/name:\s*`([^`]*)`/);
    console.log('\nName-only match:', nameMatch ? nameMatch[1] : 'NO MATCH');
    
    const descMatch = arrayContent.match(/description:\s*`([^`]*)`/s);
    console.log('Description-only match:', descMatch ? descMatch[1].substring(0, 50) : 'NO MATCH');
  } else {
    console.log(`\n✅ Flexible regex found ${flexCount} character intro(s)!`);
  }
} else {
  console.log(`\n✅ Strict regex found ${count} character intro(s)`);
}
