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
        <Route path="/" element={<Navigate to="/woomoonjeong" replace />} />

        {/* ================= Woomoonjeong ================= */}
        <Route path="/woomoonjeong" element={<Page.TodoManagement />} />
        <Route
          path="/woomoonjeong/todo/:todoId"
          element={<Page.TodoManagementDetail />}
        />
        <Route
          path="/woomoonjeong/todo/:todoId/edit"
          element={<Page.TodoManagementUpdate />}
        />
        <Route
          path="/woomoonjeong/documents"
          element={<Page.DocumentsManagement />}
        />
        <Route
          path="/woomoonjeong/documents/recommended"
          element={<Page.RecommendedDocumentsMain />}
        />
        <Route
          path="/woomoonjeong/fields/:fieldId"
          element={<Page.FieldDetail />}
        />

        {/* ================= Woomoonro ================= */}
        <Route
          path="/woomoonro"
          element={<Page.CloneCodingProjectMain />}
        />
        <Route
          path="/woomoonro/project/:projectId"
          element={<Page.CloneCodingProjectDetail />}
        />
        <Route
          path="/woomoonro/archive"
          element={<Page.CloneCodingProjectArchive/>}
        />

        {/* ================= Woomoonkyung ================= */}
        {/* 목록 (list) */}
        <Route path="/woomoonkyung" element={<Page.WoomoonkyungMain />} />

        {/* 상세 (list → 선택) */}
        <Route
          path="/woomoonkyung/plan/:planId"
          element={<Page.WoomoonkyungDetail />}
        />

        {/* 수정 (edit) */}
        <Route
          path="/woomoonkyung/edit/:planId"
          element={<Page.WoomoonkyungEdit />}
        />

        {/* 생성 (create) */}
        <Route
          path="/woomoonkyung/create"
          element={<Page.WoomoonkyungCreate />}
        />

        {/* 노드 생성 (create/node) */}
        <Route
          path="/woomoonkyung/create/node/:planId"
          element={<Page.WoomoonkyungCreateNode />}
        />

        {/* 노드 편집 (nodes) */}
        <Route
          path="/woomoonkyung/:planId/nodes"
          element={<Page.WoomoonkyungEditNode />}
        />

        {/* 추천 */}
        <Route
          path="/woomoonkyung/recommended"
          element={<Page.RecommendedStudyPlans />}
        />

        {/* 추천 - 선택*/}
        <Route
          path="/woomoonkyung/recommended/:planId"
          element={<Page.RecommendedStudyPlanDetail />}
        />

        {/* 아카이브 */}
        <Route
          path="/woomoonkyung/archive"
          element={<Page.StudyPlanArchive />}
        />

        {/* 아카이브 - 선택*/}
        <Route
          path="/woomoonkyung/archive/:planId"
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
          element={<Page.MockInterview />}
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
        {/* <Route path="/concepts" element={<Page.ConceptMain />} /> */}

        <Route path="/notes" element={<Page.NotesList />} />
        <Route path="/notes/:noteId" element={<Page.NoteDetail />} />
        <Route path="/notes/create" element={<Page.NoteCreate />} />
        <Route path="/notes/:noteId/edit" element={<Page.NoteUpdate />} />

        <Route path="/librarys" element={<Page.LibrarysList />} />
        <Route path="/librarys/:libraryId" element={<Page.LibraryDetail />} />
        <Route path="/basic-concepts" element={<Page.BasicConceptsList />} />
        <Route
          path="/basic-concepts/:conceptId"
          element={<Page.BasicConceptDetail />}
        />
        <Route path="/coding-tools" element={<Page.CodingToolsList />} />
        <Route
          path="/coding-tools/:toolId"
          element={<Page.CodingToolDetail />}
        />
        <Route path="/third-partys" element={<Page.ThirdPartyList />} />
        <Route
          path="/third-partys/:serviceId"
          element={<Page.ThirdPartyDetail />}
        />
        <Route
          path="/package-managers"
          element={<Page.PackageManagerMaterialsList />}
        />
        <Route
          path="/package-managers/:materialId"
          element={<Page.PackageManagerMaterialsDetail />}
        />

        {/* ================= Profile ================= */}
        <Route path="/profile" element={<Page.Profile />} />
        <Route path="/profile/edit" element={<Page.ProfileEdit />} />
        <Route path="/profile/badges" element={<Page.BadgeManager />} />

        {/* ================= Notices ================= */}
        <Route path="/notices" element={<Page.NoticesList />} />
        <Route path="/notices/:id" element={<Page.NoticeDetail />} />
      </Route>

      {/* ================= 잘못된 경로 ================= */}

      <Route path="*" element={<Page.NotFound/>} />
    </Routes>
  );
}
