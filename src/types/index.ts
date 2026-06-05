export interface Team {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  continent: string;
  fifaRank: number;
  group: string;
  titles: number;
  bestResult: string;
  description: string;
  starPlayers: string[];
  coach: string;
}

export interface Match {
  id: string;
  round: 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'final' | 'third';
  group?: string;
  matchday?: number;
  date: string;
  time: string;
  timezone: string;
  stadium: string;
  city: string;
  country: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  prediction?: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

export interface VoteRecord {
  matchId: string;
  choice: 'home' | 'draw' | 'away';
  timestamp: number;
}

export type Page = 'home' | 'schedule' | 'teams' | 'voting' | 'results';
