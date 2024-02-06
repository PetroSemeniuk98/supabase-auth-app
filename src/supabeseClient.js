import { createClient } from "@supabase/supabase-js";

const supabeseUrls = "https://bzfwiihhxzlkzczmzkec.supabase.co";
const supabeseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZndpaWhoeHpsa3pjem16a2VjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjEyNTg3NSwiZXhwIjoyMDIxNzAxODc1fQ.gIgOeMKhJLBgSCwb-o7u_XcpvvYhckjb3OMyKLAfqFA";

export const supabase = createClient(supabeseUrls, supabeseKey);



