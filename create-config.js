const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  process.exit(1);
}

const configContent = `// Auto-generated from environment variables
export const SUPABASE_URL ='${supabaseUrl}';

export const SUPABASE_ANON_KEY = '${supabaseAnonKey}';
`;

const configPath = path.join(__dirname, 'Backend', 'config.js');
fs.writeFileSync(configPath, configContent);
console.log('✓ config.js generated successfully from environment variables');

