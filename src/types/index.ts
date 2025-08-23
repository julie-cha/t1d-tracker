export interface BloodSugarReading {
  id: string;
  value: number;
  timestamp: Date;
  mealType: "before_breakfast" | "after_breakfast" | "before_lunch" | "after_lunch" | "before_dinner" | "after_dinner" | "bedtime";
  notes?: string;
}
