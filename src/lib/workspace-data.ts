// Mock workspace + project data. Replace with Lovable Cloud queries later.

export type ProjectStatus = "draft" | "in_production" | "in_review" | "delivered";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  role: "owner" | "admin" | "producer" | "designer" | "editor";
  members: number;
  initials: string;
};

export type Project = {
  id: string;
  workspaceId: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number; // 0-100
  cover: string; // gradient class
  updatedAt: string;
  dueAt: string;
  team: { name: string; initials: string; color: string }[];
  stats: {
    characters: number;
    themes: number;
    backgrounds: number;
    props: number;
    scenes: number;
    storyboards: number;
    videos: number;
  };
};

export const workspaces: Workspace[] = [
  { id: "ws_acme", name: "Acme Studios", slug: "acme", role: "owner", members: 14, initials: "AS" },
  { id: "ws_north", name: "Northbound Films", slug: "northbound", role: "producer", members: 6, initials: "NF" },
  { id: "ws_solo", name: "Personal", slug: "personal", role: "owner", members: 1, initials: "P" },
];

const covers = [
  "from-[#006466] via-[#0b525b] to-[#272640]",
  "from-[#272640] via-[#3e1f47] to-[#4d194d]",
  "from-[#1b3a4b] via-[#272640] to-[#3e1f47]",
  "from-[#006466] via-[#272640] to-[#4d194d]",
  "from-[#0b525b] via-[#1b3a4b] to-[#212f45]",
  "from-[#3e1f47] via-[#4d194d] to-[#272640]",
];

export const projects: Project[] = [
  {
    id: "p_neon",
    workspaceId: "ws_acme",
    name: "Neon Bloom",
    client: "Sony Music · Artist Visual",
    status: "in_production",
    progress: 62,
    cover: covers[0],
    updatedAt: "2h ago",
    dueAt: "Jun 18",
    team: [
      { name: "Ada L.", initials: "AL", color: "bg-[#006466]" },
      { name: "Kai N.", initials: "KN", color: "bg-[#3e1f47]" },
      { name: "Mira S.", initials: "MS", color: "bg-[#272640]" },
    ],
    stats: { characters: 6, themes: 3, backgrounds: 11, props: 22, scenes: 14, storyboards: 9, videos: 4 },
  },
  {
    id: "p_atlas",
    workspaceId: "ws_acme",
    name: "Atlas Reborn",
    client: "Atlas Motors · Brand Film",
    status: "in_review",
    progress: 84,
    cover: covers[1],
    updatedAt: "yesterday",
    dueAt: "Jun 06",
    team: [
      { name: "Theo R.", initials: "TR", color: "bg-[#4d194d]" },
      { name: "Iris W.", initials: "IW", color: "bg-[#0b525b]" },
    ],
    stats: { characters: 3, themes: 2, backgrounds: 8, props: 14, scenes: 9, storyboards: 9, videos: 7 },
  },
  {
    id: "p_lunar",
    workspaceId: "ws_acme",
    name: "Lunar Drift",
    client: "Netflix · Concept Short",
    status: "in_production",
    progress: 38,
    cover: covers[2],
    updatedAt: "5h ago",
    dueAt: "Jul 02",
    team: [
      { name: "Sora P.", initials: "SP", color: "bg-[#272640]" },
      { name: "Levi K.", initials: "LK", color: "bg-[#006466]" },
      { name: "Eko M.", initials: "EM", color: "bg-[#3e1f47]" },
      { name: "Jun H.", initials: "JH", color: "bg-[#4d194d]" },
    ],
    stats: { characters: 4, themes: 2, backgrounds: 6, props: 9, scenes: 7, storyboards: 3, videos: 1 },
  },
  {
    id: "p_orbit",
    workspaceId: "ws_acme",
    name: "Orbit Theory",
    client: "Internal R&D",
    status: "draft",
    progress: 12,
    cover: covers[3],
    updatedAt: "3d ago",
    dueAt: "Aug 14",
    team: [{ name: "Ada L.", initials: "AL", color: "bg-[#006466]" }],
    stats: { characters: 1, themes: 1, backgrounds: 2, props: 3, scenes: 1, storyboards: 0, videos: 0 },
  },
  {
    id: "p_silk",
    workspaceId: "ws_north",
    name: "Silk Road 2099",
    client: "Northbound Films",
    status: "in_production",
    progress: 47,
    cover: covers[4],
    updatedAt: "1d ago",
    dueAt: "Jul 22",
    team: [
      { name: "Riya D.", initials: "RD", color: "bg-[#3e1f47]" },
      { name: "Felix B.", initials: "FB", color: "bg-[#006466]" },
    ],
    stats: { characters: 5, themes: 4, backgrounds: 12, props: 18, scenes: 11, storyboards: 6, videos: 2 },
  },
  {
    id: "p_ember",
    workspaceId: "ws_acme",
    name: "Ember Protocol",
    client: "Riot Games · Cinematic",
    status: "delivered",
    progress: 100,
    cover: covers[5],
    updatedAt: "1w ago",
    dueAt: "May 24",
    team: [
      { name: "Maya T.", initials: "MT", color: "bg-[#4d194d]" },
      { name: "Owen P.", initials: "OP", color: "bg-[#272640]" },
      { name: "Sol V.", initials: "SV", color: "bg-[#006466]" },
    ],
    stats: { characters: 8, themes: 3, backgrounds: 14, props: 27, scenes: 18, storyboards: 18, videos: 12 },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function projectsForWorkspace(wsId: string): Project[] {
  return projects.filter((p) => p.workspaceId === wsId);
}

export const statusMeta: Record<ProjectStatus, { label: string; tone: string }> = {
  draft: { label: "Draft", tone: "bg-muted text-muted-foreground" },
  in_production: { label: "In production", tone: "bg-[#006466]/12 text-[#006466]" },
  in_review: { label: "In review", tone: "bg-[#3e1f47]/12 text-[#3e1f47]" },
  delivered: { label: "Delivered", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
};

// ---------- Project sub-entities (mock) ----------

export type Character = {
  id: string;
  name: string;
  role: string;
  wardrobes: string[];
  cover: string;
  status: "approved" | "review" | "draft";
};

export const charactersByProject: Record<string, Character[]> = {
  p_neon: [
    { id: "c1", name: "Nova", role: "Lead Artist", wardrobes: ["Stage", "Backstage", "Rehearsal"], cover: "from-[#006466] to-[#4d194d]", status: "approved" },
    { id: "c2", name: "Echo", role: "Producer", wardrobes: ["Studio", "Street"], cover: "from-[#272640] to-[#0b525b]", status: "review" },
    { id: "c3", name: "Lyric", role: "Backup Vocal", wardrobes: ["Stage"], cover: "from-[#3e1f47] to-[#272640]", status: "draft" },
    { id: "c4", name: "Pulse", role: "Drummer", wardrobes: ["Stage", "Casual"], cover: "from-[#0b525b] to-[#1b3a4b]", status: "approved" },
    { id: "c5", name: "Halo", role: "Dancer", wardrobes: ["Stage A", "Stage B", "Outdoor"], cover: "from-[#4d194d] to-[#272640]", status: "review" },
    { id: "c6", name: "Mute", role: "Sound Engineer", wardrobes: ["Booth"], cover: "from-[#1b3a4b] to-[#212f45]", status: "draft" },
  ],
};

export type Theme = {
  id: string;
  name: string;
  era: string;
  mood: string;
  palette: string[];
};

export const themesByProject: Record<string, Theme[]> = {
  p_neon: [
    { id: "t1", name: "Neo Tokyo Dusk", era: "2099", mood: "Hopeful, electric", palette: ["#006466", "#3e1f47", "#4d194d", "#f4d35e"] },
    { id: "t2", name: "Concrete Bloom", era: "Near future", mood: "Brutalist, tender", palette: ["#1b3a4b", "#272640", "#cfe6e9", "#b39ddb"] },
    { id: "t3", name: "Velvet Static", era: "Retro 80s", mood: "Saturated, nostalgic", palette: ["#0b525b", "#4d194d", "#e94560", "#f9c74f"] },
  ],
};

export type Background = {
  id: string;
  name: string;
  variants: string[];
  cover: string;
};

export const backgroundsByProject: Record<string, Background[]> = {
  p_neon: [
    { id: "b1", name: "Rooftop, Shibuya", variants: ["Dusk", "Night", "Rain"], cover: "from-[#006466] to-[#272640]" },
    { id: "b2", name: "Backstage Corridor", variants: ["Day", "Night"], cover: "from-[#1b3a4b] to-[#3e1f47]" },
    { id: "b3", name: "Studio Floor A", variants: ["Wide", "Medium", "Close"], cover: "from-[#272640] to-[#4d194d]" },
    { id: "b4", name: "Underpass Tunnel", variants: ["Fog", "Rain"], cover: "from-[#0b525b] to-[#1b3a4b]" },
    { id: "b5", name: "Alley Neon", variants: ["Night", "Rain", "Snow"], cover: "from-[#3e1f47] to-[#006466]" },
    { id: "b6", name: "Sky Bridge", variants: ["Dawn", "Dusk"], cover: "from-[#212f45] to-[#272640]" },
    { id: "b7", name: "Penthouse Loft", variants: ["Wide", "Close"], cover: "from-[#4d194d] to-[#0b525b]" },
    { id: "b8", name: "Train Platform", variants: ["Empty", "Crowd"], cover: "from-[#006466] to-[#3e1f47]" },
  ],
};

export type Prop = {
  id: string;
  name: string;
  category: "vehicle" | "tech" | "wardrobe" | "set";
  cover?: string;
  description?: string;
};

export const propsByProject: Record<string, Prop[]> = {
  p_neon: [
    { id: "pr1", name: "Holo Mic", category: "tech", cover: "from-[#006466] to-[#272640]", description: "Holographic stage microphone with floating waveform reactive to vocals." },
    { id: "pr2", name: "Drone Cam", category: "tech", cover: "from-[#0b525b] to-[#1b3a4b]", description: "Autonomous tracking drone with anamorphic lens." },
    { id: "pr3", name: "Leather Jacket", category: "wardrobe", cover: "from-[#3e1f47] to-[#272640]", description: "Hand-distressed jacket with embedded LED piping." },
    { id: "pr4", name: "Vintage Bike", category: "vehicle", cover: "from-[#1b3a4b] to-[#3e1f47]", description: "1970s street bike retrofitted with electric drivetrain." },
    { id: "pr5", name: "Neon Sign", category: "set", cover: "from-[#4d194d] to-[#006466]", description: "Hand-bent neon sign in Devanagari script." },
    { id: "pr6", name: "Synth Rig", category: "tech", cover: "from-[#272640] to-[#4d194d]", description: "Modular synthesizer rig, hero piece for studio scenes." },
    { id: "pr7", name: "Trench Coat", category: "wardrobe", cover: "from-[#212f45] to-[#0b525b]", description: "Oversized trench with smart-fabric reactive panels." },
    { id: "pr8", name: "Hoverboard", category: "vehicle", cover: "from-[#006466] to-[#4d194d]", description: "Compact magnetic hoverboard with custom underglow." },
    { id: "pr9", name: "LED Visor", category: "wardrobe", cover: "from-[#3e1f47] to-[#0b525b]", description: "Wraparound visor with programmable LED matrix." },
    { id: "pr10", name: "Studio Console", category: "set", cover: "from-[#4d194d] to-[#272640]", description: "Custom mixing console, hero set piece for studio interior." },
  ],
};

export function getCharacter(projectId: string, id: string): Character | undefined {
  return (charactersByProject[projectId] ?? charactersByProject.p_neon).find((c) => c.id === id);
}

export function getProp(projectId: string, id: string): Prop | undefined {
  return (propsByProject[projectId] ?? propsByProject.p_neon).find((p) => p.id === id);
}

export type Scene = {
  id: string;
  name: string;
  duration: string;
  characters: string[];
  background: string;
  status: "draft" | "ready" | "rendered";
};

export const scenesByProject: Record<string, Scene[]> = {
  p_neon: [
    { id: "s1", name: "Opening — Rooftop", duration: "0:24", characters: ["Nova"], background: "Rooftop, Shibuya", status: "rendered" },
    { id: "s2", name: "Backstage Tension", duration: "0:18", characters: ["Nova", "Echo"], background: "Backstage Corridor", status: "ready" },
    { id: "s3", name: "First Verse", duration: "0:42", characters: ["Nova", "Halo", "Pulse"], background: "Studio Floor A", status: "ready" },
    { id: "s4", name: "Chase, Underpass", duration: "0:36", characters: ["Nova"], background: "Underpass Tunnel", status: "draft" },
    { id: "s5", name: "Neon Walk", duration: "0:28", characters: ["Nova", "Echo"], background: "Alley Neon", status: "draft" },
    { id: "s6", name: "Bridge Confession", duration: "0:31", characters: ["Nova", "Lyric"], background: "Sky Bridge", status: "ready" },
    { id: "s7", name: "Loft Reflection", duration: "0:22", characters: ["Nova"], background: "Penthouse Loft", status: "draft" },
  ],
};

export type ReviewItem = {
  id: string;
  type: "Scene" | "Character" | "Storyboard" | "Video" | "Background";
  title: string;
  submittedBy: string;
  initials: string;
  color: string;
  at: string;
  priority: "high" | "med" | "low";
};

export const reviewsByProject: Record<string, ReviewItem[]> = {
  p_neon: [
    { id: "r1", type: "Video", title: "Opening — Rooftop · Take 03", submittedBy: "Kai N.", initials: "KN", color: "bg-[#3e1f47]", at: "2h ago", priority: "high" },
    { id: "r2", type: "Character", title: "Echo · Backstage wardrobe v2", submittedBy: "Mira S.", initials: "MS", color: "bg-[#272640]", at: "4h ago", priority: "med" },
    { id: "r3", type: "Scene", title: "Bridge Confession · Lighting pass", submittedBy: "Ada L.", initials: "AL", color: "bg-[#006466]", at: "yesterday", priority: "med" },
    { id: "r4", type: "Storyboard", title: "Neon Walk · 8 frames", submittedBy: "Kai N.", initials: "KN", color: "bg-[#3e1f47]", at: "yesterday", priority: "low" },
    { id: "r5", type: "Background", title: "Alley Neon — Rain variant", submittedBy: "Mira S.", initials: "MS", color: "bg-[#272640]", at: "2d ago", priority: "low" },
  ],
};

export type ActivityItem = {
  id: string;
  who: string;
  initials: string;
  color: string;
  action: string;
  target: string;
  at: string;
};

export const activityByProject: Record<string, ActivityItem[]> = {
  p_neon: [
    { id: "a1", who: "Kai N.", initials: "KN", color: "bg-[#3e1f47]", action: "rendered", target: "Opening — Rooftop · v3", at: "2h ago" },
    { id: "a2", who: "Mira S.", initials: "MS", color: "bg-[#272640]", action: "uploaded reference", target: "Tokyo nights moodboard", at: "3h ago" },
    { id: "a3", who: "Ada L.", initials: "AL", color: "bg-[#006466]", action: "commented on", target: "Bridge Confession", at: "5h ago" },
    { id: "a4", who: "Theo R.", initials: "TR", color: "bg-[#4d194d]", action: "approved", target: "Nova · Stage wardrobe", at: "yesterday" },
    { id: "a5", who: "Iris W.", initials: "IW", color: "bg-[#0b525b]", action: "added scene", target: "Loft Reflection", at: "yesterday" },
  ],
};
