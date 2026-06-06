-- Esquema inicial recomendado para Agenda Yeka Coach Academy 2027
-- Pensado para Supabase/PostgreSQL.

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  phone text,
  age int,
  vocal_level text,
  voice_type text,
  main_goal text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists fears (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  fear_text text not null,
  created_at timestamptz default now()
);

create table if not exists singers (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  position int check (position between 1 and 3),
  name text,
  image_url text,
  inspiration text,
  liked_voice_detail text,
  created_at timestamptz default now()
);

create table if not exists daily_entries (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  entry_date date not null,
  learned text,
  observations text,
  mood text,
  status text default 'Pendiente',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(student_id, entry_date)
);

create table if not exists daily_videos (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null,
  title text,
  video_url text not null,
  level text,
  assigned_student_id uuid references students(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists coach_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  entry_date date,
  note text not null,
  created_at timestamptz default now()
);
