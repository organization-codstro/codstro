import React from "react";
import { FileText } from "lucide-react";
import PinCard from "./PinCard";
import { Pin } from "../../../types/Woomoonjeong/woomoonjeong";

interface PinListProps {
  pins: Pin[];
}

const PinList: React.FC<PinListProps> = ({ pins }) => (
  <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
      <span className="text-sm text-gray-500">
        {pins.length} total documents
      </span>
    </div>

    <div className="space-y-3">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}

      {pins.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No documents in this field</p>
        </div>
      )}
    </div>
  </div>
);

export default PinList;
