export interface GenerateStudyPlanPayload {
  userId: string;
  name: string;
  description: string;
  goal: string;
  currentLevel?: string;
  maxHours?: number;
  learningStyle: string;
  expectedOutput: string;
  startDate: string;
  endDate: string;
  techStacks: string[];
}

export interface AddStudyPlanAiModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
  readonly userId: string;
  readonly onSubmit: (data: GenerateStudyPlanPayload) => Promise<void>;
}
