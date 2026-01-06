import {
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import { FieldGroupType } from "../Woomoonjeong";


//필드당 아이콘 표시할때 사용되는 아이콘
export const fieldTypeIcons: Record<FieldGroupType, React.ElementType> = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};
