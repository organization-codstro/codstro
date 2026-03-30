// api/ProjectPlanning/SummaryEditorPage.ts

import { supabase } from "../../db/supabase/supabase";

export const SummaryEditorService = {
  // 요약 불러오기
  getMeetingSummary: async ({ roomId }: { roomId: string }) => {
    const { data, error } = await supabase
      .from("project_meeting_summarys")
      .select("*")
      .eq("project_meeting_room_id", roomId)
      .single();

    if (error) throw error;
    return { summary: data };
  },

  // 요약 저장
  updateMeetingSummary: async ({
    summaryId,
    summaryText,
  }: {
    summaryId: string;
    summaryText: string;
  }) => {
    const { error } = await supabase
      .from("project_meeting_summary")
      .update({ project_meeting_summary: summaryText })
      .eq("project_meeting_summary_id", summaryId);

    if (error) throw error;
  },
};
