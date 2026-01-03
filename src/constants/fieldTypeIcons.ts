import {
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export type FieldType =
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

export const fieldTypeIcons: Record<FieldType, React.ElementType> = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};
