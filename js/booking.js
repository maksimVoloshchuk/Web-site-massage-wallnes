import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://uppduzvyirfyhvapjdz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZGR1enZ5aXJmdnlodmFwamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMTA3MzIsImV4cCI6MjA5MTY4NjczMn0.6kUkf7e_I08FgFq7Ptqb0ksfJYyocJPDKJX0UltDiCs'

const supabase = createClient(supabaseUrl, supabaseKey)

window.supabase = supabase