import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://uppduzvyirfyhvapjdz.supabase.co'
const supabaseKey = 'sb_publishable_RIzN7JdnVA4Bn6-tfYKSug_gC8HsKeZ'

const supabase = createClient(supabaseUrl, supabaseKey)

window.supabase = supabase