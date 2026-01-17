export interface RoomData {
  name: string;
  type: "daily" | "project";
  topics: string;
  isMain: boolean;
}

export interface RoomInfoFormProps {
  data: RoomData;
  onChange: (data: RoomData) => void;
}
