enum SessionType {
  A,
  B,
  Lightning,
}

interface Speaker {
  name: string;
  company?: string;
}

interface Session {
  type: SessionType;
  title: string;
  description?: string;
  speakers: Speaker[];
  order: number;
}

export { SessionType };
export type { Session };
