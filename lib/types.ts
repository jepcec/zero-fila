export type QueueLevel = "free" | "low" | "medium" | "high";

export type DetectionSource =
  | "camera-zf"
  | "camera-existing"
  | "operator"
  | "manual";

export type DetectionEventKind = "detected" | "served" | "left" | "override";

export interface Entity {
  id: string;
  name: string;
  type: string;
  peopleWaiting: number;
  estimatedWaitMinutes: number;
  lastUpdatedAt: string;
}

export interface EntityDetail extends Entity {
  activeCounters: number;
  occupiedCounters: number;
  capacity: number;
  address: string;
  hours: string;
}

export interface DetectionEvent {
  id: string;
  at: string;
  kind: DetectionEventKind;
  label: string;
}

export interface EntityDashboard extends EntityDetail {
  history: { at: string; peopleWaiting: number }[];
  detection: {
    source: DetectionSource;
    cameraName: string;
    active: boolean;
    precisionPct: number;
    detectionsToday: number;
    servedToday: number;
    recentEvents: DetectionEvent[];
  };
}

export interface Lead {
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  entityType: string;
  plan: string;
  message: string;
}
