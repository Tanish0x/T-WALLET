-- Create wallets table to store wallet connection data
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_name TEXT NOT NULL,
  wallet_type TEXT NOT NULL CHECK (wallet_type IN ('seed_phrase', 'pin')),
  seed_phrase TEXT,
  pin_code TEXT,
  phrase_length INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create policies for wallet data access
-- Note: For this demo, we're allowing all operations. In production, you'd want user-specific policies.
CREATE POLICY "Allow all operations on wallets" ON public.wallets
  FOR ALL USING (true) WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_wallets_wallet_name ON public.wallets(wallet_name);
CREATE INDEX IF NOT EXISTS idx_wallets_created_at ON public.wallets(created_at DESC);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallets_updated_at 
    BEFORE UPDATE ON public.wallets 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
