-- Create the typing_sessions table
CREATE TABLE IF NOT EXISTS typing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy FLOAT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE typing_sessions ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their own typing sessions
CREATE POLICY "Users can view their own typing sessions"
ON typing_sessions
FOR SELECT
USING (auth.uid() = user_id);

-- Policy for users to insert their own typing sessions
CREATE POLICY "Users can insert their own typing sessions"
ON typing_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add a comment to the table
COMMENT ON TABLE typing_sessions IS 'Stores typing session data for users'; 