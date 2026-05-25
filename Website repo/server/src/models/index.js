const supabase = require('../config/supabase');

const connectDB = async () => {
  try {
    if (!supabase) throw new Error('Supabase client not initialized — check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    const { error } = await supabase.from('Users').select('id').limit(1);
    if (error) throw new Error(error.message);
    console.log('Supabase connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.warn('Server running without DB — DB calls will fail.');
  }
};

module.exports = { connectDB };
