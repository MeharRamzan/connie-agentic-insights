-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  job_title TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create contacts table (user's network)
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  location TEXT,
  avatar_url TEXT,
  notes TEXT,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  connection_strength INTEGER DEFAULT 50,
  tags TEXT[],
  source TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own contacts"
ON public.contacts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
ON public.contacts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
ON public.contacts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
ON public.contacts FOR DELETE
USING (auth.uid() = user_id);

-- Create interactions table
CREATE TABLE public.interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- email, meeting, call, note, message
  subject TEXT,
  summary TEXT,
  sentiment TEXT, -- positive, neutral, negative
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interactions"
ON public.interactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions"
ON public.interactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
ON public.interactions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
ON public.interactions FOR DELETE
USING (auth.uid() = user_id);

-- Create integrations table
CREATE TABLE public.user_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL, -- gmail, outlook, linkedin, slack, etc.
  status TEXT DEFAULT 'pending' NOT NULL, -- pending, connected, disconnected, error
  last_synced_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, provider)
);

ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own integrations"
ON public.user_integrations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own integrations"
ON public.user_integrations FOR ALL
USING (auth.uid() = user_id);

-- Create notes table
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notes"
ON public.notes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own notes"
ON public.notes FOR ALL
USING (auth.uid() = user_id);

-- Create meetings table
CREATE TABLE public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  attendee_ids UUID[],
  prep_notes TEXT,
  follow_up_notes TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meetings"
ON public.meetings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own meetings"
ON public.meetings FOR ALL
USING (auth.uid() = user_id);

-- Create reconnection_suggestions table
CREATE TABLE public.reconnection_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  reason TEXT,
  priority INTEGER DEFAULT 50,
  suggested_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  dismissed_at TIMESTAMP WITH TIME ZONE,
  acted_on_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.reconnection_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own suggestions"
ON public.reconnection_suggestions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own suggestions"
ON public.reconnection_suggestions FOR ALL
USING (auth.uid() = user_id);