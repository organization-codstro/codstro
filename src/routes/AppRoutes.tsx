import { Routes, Route, Navigate } from "react-router-dom";
import * as Page from "./pages";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Layout */}
      <Route element={<Page.AuthLayout />}>
        <Route path="/login" element={<Page.Login />} />
        <Route path="/signup" element={<Page.Signup />} />
      </Route>

      {/* ================= 서비스 영역 (Layout 적용) ================= */}
      <Route element={<Page.Layout />}>
        {/* 기본 진입 */}
        <Route path="/" element={<Navigate to="/todo-management" replace />} />

        {/* ================= TODO-MANAGEMENT ================= */}
        <Route path="/todo-management" element={<Page.TodoManagement />} />
        <Route
          path="/todo-management/todo/:todoId"
          element={<Page.TodoManagementDetail />}
        />
        <Route
          path="/todo-management/todo/:todoId/edit"
          element={<Page.TodoManagementUpdate />}
        />
        <Route
          path="/todo-management/documents"
          element={<Page.DocumentsManagement />}
        />
        <Route
          path="/todo-management/fields/:fieldId"
          element={<Page.FieldDetail />}
        />

        {/* ================= Clone Coding Project ================= */}
        <Route
          path="/clone-coding-project"
          element={<Page.CloneCodingProjectMain />}
        />
        <Route
          path="/clone-coding-project/:projectId"
          element={<Page.CloneCodingProjectDetail />}
        />
        <Route
          path="/clone-coding-project/archive"
          element={<Page.CloneCodingProjectArchive />}
        />

        {/* ================= StudyPlan ================= */}
        {/* 목록 (list) */}
        <Route path="/study-plan" element={<Page.StudyPlanMain />} />

        {/* 상세 (list → 선택) */}
        <Route
          path="/study-plan/plan/:planId"
          element={<Page.StudyPlanDetail />}
        />

        {/* 수정 (edit) */}
        <Route
          path="/study-plan/:planId/edit"
          element={<Page.StudyPlanEdit />}
        />

        {/* 생성 (create) */}
        <Route path="/study-plan/create" element={<Page.StudyPlanCreate />} />

        {/* 노드 생성 (create/node) */}
        <Route
          path="/study-plan/create/node/:planId"
          element={<Page.StudyPlanCreateNode />}
        />

        {/* 노드 편집 (nodes) */}
        <Route
          path="/study-plan/:planId/nodes"
          element={<Page.StudyPlanEditNode />}
        />

        {/* 아카이브 */}
        <Route path="/study-plan/archive" element={<Page.StudyPlanArchive />} />

        {/* 아카이브 - 선택*/}
        <Route
          path="/study-plan/archive/:planId"
          element={<Page.StudyPlanArchiveDetail />}
        />
        {/* ================= Company ================= */}
        <Route path="/companies" element={<Page.CompanyList />} />
        <Route path="/companies/:companyId" element={<Page.CompanyDetail />} />
        <Route
          path="/companies/:companyId/match"
          element={<Page.CompanyMatch />}
        />
        <Route
          path="/companies/:companyId/interview"
          element={<Page.InterviewDetailPage />}
        />

        {/* ===== Company Archive / History ===== */}
        <Route path="/bookmarks" element={<Page.Bookmarks />} />
        <Route path="/interviews" element={<Page.InterviewHistory />} />
        <Route
          path="/interviews/:interviewId"
          element={<Page.InterviewHistoryDetail />}
        />
        <Route path="/matches" element={<Page.MatchingHistory />} />
        <Route
          path="/matches/:matchingId"
          element={<Page.MatchingHistoryDetail />}
        />

        {/* ================= Project Planning ================= */}
        <Route path="/projects" element={<Page.ProjectMain />} />
        <Route path="/projects/:projectId" element={<Page.ProjectDetail />} />
        <Route path="/projects/new" element={<Page.ProjectBasicInfoInput />} />
        <Route path="/projects/new/chat" element={<Page.ProjectCreateChat />} />
        <Route
          path="/projects/new/info"
          element={<Page.ProjectInfoGenerate />}
        />
        <Route
          path="/projects/:projectId/meetings"
          element={<Page.ProjectMeeting />}
        />
        <Route
          path="/projects/:projectId/meetings/new"
          element={<Page.CreateProjectMeeting />}
        />
        <Route
          path="/projects/:projectId/meetings/:meetingId"
          element={<Page.MeetingProgress />}
        />
        <Route
          path="/projects/:projectId/meetings/:meetingId/materials"
          element={<Page.MeetingMaterials />}
        />
        <Route
          path="/projects/:projectId/meetings/:meetingId/materials/summary/edit"
          element={<Page.SummaryEditor />}
        />
        <Route
          path="/projects/archive"
          element={<Page.ProjectPlanningArchive />}
        />

        {/* ================= AI Chat ================= */}
        <Route path="/ai-chat" element={<Page.ChatRoomsList />} />
        <Route path="/ai-chat/:roomId" element={<Page.ChatConversation />} />
        <Route
          path="/ai-chat/friends"
          element={<Page.AIPersonasCollection />}
        />
        <Route
          path="/ai-chat/persona/create"
          element={<Page.CreateAIPersona />}
        />
        <Route
          path="/ai-chat/persona/:personaId"
          element={<Page.AIPersonaDetail />}
        />
        <Route path="/ai-chat/create-room" element={<Page.CreateChatRoom />} />
        <Route path="/ai-chat/user-info" element={<Page.UserInfo />} />

        {/* ================= MBIT ================= */}
        {/* <Route path="/mbit" element={<Page.MbitHome />} /> */}
        <Route path="/mbit/fortune" element={<Page.TodayFortune />} />

        <Route
          path="/mbit/fortune-encyclopedias"
          element={<Page.FortuneEncyclopediaList />}
        />
        <Route
          path="/mbit/fortune-encyclopedias/:fortuneId"
          element={<Page.FortuneEncyclopediaDetail />}
        />

        <Route path="/mbit/personality" element={<Page.PersonalityTest />} />

        <Route
          path="/mbit/personality-encyclopedias"
          element={<Page.PersonalityEncyclopediaList />}
        />
        <Route
          path="/mbit/personality-encyclopedias/:personalityId"
          element={<Page.PersonalityEncyclopediaDetail />}
        />

        <Route path="/mbit/major" element={<Page.MajorTest />} />

        <Route
          path="/mbit/major-encyclopedias"
          element={<Page.MajorEncyclopediaList />}
        />
        <Route
          path="/mbit/major-encyclopedias/:majorId"
          element={<Page.MajorEncyclopediaDetail />}
        />

        {/* ================= Coding Concepts ================= */}

        <Route path="/notes" element={<Page.NotesList />} />
        <Route path="/notes/:noteId" element={<Page.NoteDetail />} />
        <Route path="/notes/create" element={<Page.NoteCreate />} />
        <Route path="/notes/:noteId/edit" element={<Page.NoteUpdate />} />

        <Route path="/concepts" element={<Page.ConceptList />} />
        <Route path="/concepts/:conceptId" element={<Page.ConceptDetail />} />
        <Route
          path="/concepts/:conceptId/edit"
          element={<Page.ConceptUpdatePage />}
        />
        <Route path="/concepts/create" element={<Page.ConceptCreate />} />

        {/* ================= Profile ================= */}
        <Route path="/profile" element={<Page.Profile />} />
        <Route path="/profile/edit" element={<Page.ProfileEdit />} />
      </Route>

      {/* ================= 잘못된 경로 ================= */}

      <Route path="*" element={<Page.NotFoundPage />} />
    </Routes>
  );
}
