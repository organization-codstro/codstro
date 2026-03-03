//테이블 타입들

export interface Projects {
  project_id: number; // PK / number
  project_stacks: string; // text
  project_name: string; // text
  project_description: string | null; // text
  project_topic: string; // text
  project_start_date: Date; // date
  project_end_date: Date; // date
  project_main_color: string; // text
  project_style: string; // text
  project_effect: string; // 다지인에서 주요되는 에니매이션이나 전반적인 효과들 / text
  project_created_date: Date; // date
  user_id: number; // FK / number
}

export interface ConceptDescriptionMaterials {
  concept_description_material_id: number; // PK / number
  concept_description_material_name: string; // text
  concept_description_material_description: string; // text
  concept_description_material_content: string; // text
  concept_description_material_category: string | null; // text[]
  concept_description_material_document_url: string; // text[]
  concept_description_material_representative_image_url: string | null; // text
  concept_description_material_image_urls: string | null; // text[]
  concept_description_material_created_date: Date; // date
  concept_description_material_update_date: any | null;
}

export interface UserBadges {
  user_badge_id: number; // PK / number
  user_badge_obtained_at: Date; // date
  user_id: number; // FK / number
  badge_id: number; // FK / number
}

export interface Emoticons {
  emoticon_id: number; // PK / number
  emoticon_name: number; // number
  emoticon_img_url: string; // text
  emoticon_description: string; // text
  emoticon_created_date: Date; // date
}

export interface ChatRooms {
  chat_room_id: number; // PK / number
  chat_room_name: string; // text
  chat_room_daily_is_main: boolean | null; // 일상 채팅방만 적용 / boolen
  chat_room_topics: string; // text
  chat_room_type: string; // daily / project / text
  chat_room_created_date: Date; // date
  user_id: number; // FK / number
  chat_rooms_unconfirmed: number; // number
}

export interface UserFortune {
  user_fortune_id: number; // PK / number
  user_fortune_create_date: Date; // date
  developer_fortune_id: number; // FK / number
  user_id: number; // FK / number
}

export interface CompanyUserMatches {
  company_user_match_id: number; // PK / number
  company_user_match_name: string; // [회사이름 - 생성일]로 저장 / text
  company_user_match_rate: number; // AI가 판단한 적합도 % (예: 87.50), 전체 5자리, 소수점 2자리 / numeric(5,2)
  company_user_match_suggestions: string; // text
  company_user_match_reason: string; // text
  company_user_match_created_date: Date; // date
  company_id: number; // FK / number
  user_id: number; // FK / 이 유저 고유번호로, 유저의 정보 추적 / number
}

export interface MajorQuestions {
  major_question_id: number | null; // PK / number
  major_question_content: string; // text
  major_question_axis: string; // 이 질문으로 어떤 부분을 검사하는지 / text
  major_question_trait: string; // text
  major_question_score_value: number; // int
}

export interface NoteConcept {
  note_concept_id: number; // PK / number
  note_id: number; // FK / number
  concept_description_material_id: number; // FK / number
  tool_description_material_id: number; // FK / number
  librarie_description_material_id: number; // FK / number
  package_manager_description_material_id: number; // FK / number
  third_party_services_description_material_id: number; // FK / number
}

export interface ProjectPlannings {
  project_id: number; // PK / number
  project_stacks: string | null; // text
  project_name: string | null; // text
  project_description: string | null; // text
  project_topic: string | null; // text
  project_start_date: Date | null; // date
  project_end_date: Date | null; // date
  project_main_color: string | null; // text
  project_style: string | null; // text
  project_effect: string | null; // 다지인에서 주요되는 에니매이션이나 전반적인 효과들 / text
  project_created_date: Date; // date
  user_id: number; // FK / number
}

export interface AiUserRecords {
  ai_user_record_id: number | null; // PK / number
  ai_user_record_summary: string | null; // text
  ai_user_record_created_date: Date | null; // timestamp
  user_id: number; // FK / number
}

export interface ProjectPlanningLogs {
  project_tasks_logs_id: number; // PK / number
  project_tasks_logs_sender: string; // text
  project_tasks_logs_message: string; // text
  project_tasks_logs_created_at: Date; // timestamp
  project_tasks_logs_meeting_index: number; // 1 / number
  project_id: number; // FK / number
}

export interface ProjectPages {
  project_page_id: number; // PK / number
  project_page_name: any;
  project_page_role: any;
  project_page_function: any;
  project_page_is_complete: any;
  project_id: number; // FK / number
}

export interface Groups {
  group_id: number; // PK / number
  group_description: string | null; // text
  group_created_date: Date; // date
  group_name: number; // 유저가 만들수 있음 / number
  user_id: number; // FK / number
}

export interface ToolDescriptionMaterials {
  tool_description_material_id: number; // PK / number
  tool_description_material_name: string; // text
  tool_description_material_description: string; // text
  tool_description_material_content: string; // text
  tool_description_material_category: string | null; // text[]
  tool_description_material_document_url: string | null; // text
  tool_description_material_representative_image_url: string | null; // text
  tool_description_material_image_urls: string | null; // text[]
  tool_description_material_created_date: Date; // date
  tool_description_material_update_date: Date; // date
}

export interface DailyNewChats {
  daily_new_chat_id: number; // PK / number
  daily_new_chat: string; // text
  daily_chat_room_id: number; // FK / number
}

export interface Link {
  link_count_id: number; // PK / number
  link_count_url: string; // text
  link_count_number: number; // number
}

export interface UserCloneCodings {
  user_clone_codings_id: number; // PK / number
  user_clone_codings_status: string; // text
  user_clone_coding_is_bookmarked: boolean; // boolean
  user_clone_codings_started_at: Date; // date
  user_clone_codings_completed_at: Date; // date
  clone_coding_id: number; // FK / number
  user_id: number; // FK / number
}

export interface CloneCodings {
  clone_coding_id: number; // PK / number
  clone_coding_title: string; // text
  clone_coding_description: string; // text
  clone_coding_tech_stack: string; // text[]
  clone_codings_tags: string; // text[]
  clone_codings_difficulty: string; // text
  clone_codings_estimated_hours: string; // text
  clone_codings_thumbnail_url: string; // text
  clone_codings_github_url: string | null; // text
  clone_codings_demo_url: string | null; // text
  clone_codings_steps: any; // json
  clone_codings_project_structure: string | null; // text
  clone_codings_created_at: Date; // date
}

export interface Majors {
  major_id: number | null; // PK / number
  major_name: string; // text
  major_description: string; // text
  "major_recommended occupation": string; // text
  major_strengths: string; // text
  major_weaknesses: string; // text
  major_stress_management: string; // text
  major_annual_income: number; // int
}

export interface Badges {
  badge_id: number; // PK / number
  badge_name: string; // text
  badge_description: string | null; // text
  badge_img_url: string; // text
}

export interface Companys {
  company_id: number; // PK / number
  company_name: string; // text
  company_industry: string; // 회사가 하는일 / text
  company_description: string; // text
  company_website: string; // text
  company_values: string; // text
  created_at: Date;
  updated_at: Date;
}

export interface CompanyUserQnas {
  id: number; // PK / number
  user_id: number; // FK / number
  company_user_qna_answer: string; // text
  company_qna_question: string; // text
  company_user_qna_evaluation: string; // text
  company_user_qna_create_date: Date; // date
  company_qna_id: number; // FK / number
}

export interface LibrarieDescriptionMaterials {
  librarie_description_material_id: number; // PK / number
  librarie_description_material_name: string; // text
  librarie_description_material_description: string | null; // text
  librarie_description_material_content: string | null; // text
  librarie_description_material_category: string | null; // text[]
  librarie_description_material_document_url: string | null; // 아마 깃허브 아니면 npm? / text
  librarie_description_material_included_language: string | null; // 해당하는 라이브러리가 어디 언어에 포함되는가? / text
  librarie_description_material_representative_image_url: string | null; // text
  librarie_description_material_image_urls: string | null; // text[]
  librarie_description_materials_created_date: Date; // date
  librarie_description_materials_update_date: Date; // date
}

export interface Fields {
  field_id: number; // PK / number
  field_name: string; // text
  field_description: string | null; // text
  field_created_date: string; // text
  field_is_recommendation: boolean; // boolean
  group_id: number; // FK / number
}

export interface Todos {
  todo_id: number; // PK / number
  todo_name: string; // text
  todo_content: string; // text
  todo_description: string; // text
  todo_start_date: Date; // date
  todo_end_date: Date; // date
  todo_status: string; // text
  todo_created_date: Date; // date
  group_id: number | null; // FK / number
  project_id: number | null; // FK / number
  project_page_id: number | null; // FK / number
  group_name: string | null; // 이 할일이 속하여 있는 그룹의 이름 / text
  project_name: any | null; // 이 할일이 속하여 있는 프로젝트의 이름
}

export interface AiPersonas {
  ai_persona_id: number; // PK / number
  ai_persona_name: string; // text
  ai_personas_category: string; // text[]
  ai_persona_gender: string; // text
  ai_persona_personality: string; // text
  ai_persona_preferred_features: string; // 웹에서는 "선호 대화주제"로 표시 / text
  ai_persona_speech_style: string; // text
  ai_persona_created_date: Date; // 웹에서는 가입일로 표시 / date
  ai_persona_age: number; // integer
  ai_setting_preferred_topics: string; // text
}

export interface StudyPlans {
  study_plan_id: number; // PK / number
  study_plan_name: string; // text
  study_plan_description: string | null; // text
  study_plan_image_url: string | null; // text
  study_plan_start_date: string; // date
  study_plan_end_date: string; // date
  study_plan_is_archived: boolean; // 공부계획이 종료되면 이 속성이 참이됨 / boolean
  study_plan_state: string; // waiting / in progress / done / text
  created_at: string; // timestamptz
  user_id: number; // FK / number
  study_plan_is_recommendation: boolean; // boolean
}

export interface PackageManagerDescriptionMaterials {
  package_manager_description_material_id: number; // PK / number
  package_manager_description_material_name: string; // text
  package_manager_description__material_description: string | null; // text
  package_manager_description_material_content: string; // text
  package_manager_description_material_category: string | null; // text[]
  package_manager_description_material_document_url: string | null; // text
  package_manager_description_material_representative_image_url: string | null; // text
  package_manager_description_material_image_urls: string | null; // text[]
  package_manager_description_material_created_date: Date; // date
  package_manager_description_material_update_date: Date; // date
}

export interface UserLevels {
  user_level_id: number; // PK / number
  badge_id: number; // FK / 해당 등급으로 올라가면 주어지는 배지 id / number
  user_levels_name: string; // text
  user_levels_description: string | null; // text
  user_levels_required_points: number; // number
  user_levels_created_date: Date; // date
  user_levels_updated_date: Date; // date
}

export interface ProjectTasksLogs {
  project_tasks_log_id: number; // PK / number
  project_tasks_log_sender: string; // text
  project_tasks_log_message: string; // text
  project_tasks_log_created_at: Date; // timestamp
  project_meeting_room_id: number; // FK / number
  project_tasks_log_meeting_index: number; // 1 / number
}

export interface ProjectMeetingSummarys {
  project_meeting_summary_id: any; // PK
  "project meeting summary": any;
  project_meeting_room_id: any; // FK
  project_meeting_summary_meeting_index: number; // number
}

export interface Pins {
  pin_id: number; // PK / number
  pin_title: string; // text
  pin_description: string | null; // text
  pin_image_url: string | null; // text
  pin_created_date: Date; // date
  pin_label: string | null; // text
  pin_url: string; // text
  field_id: number; // FK / number
}

export interface ProjectMeetingRooms {
  project_meeting_room_id: any; // PK
  project__meeting_purpose: any; // 이 회의는 무엇을 위한 회의이고, 어떤걸 결정하고 싶은지 (유저가 입력한거)
  project_tasks_logs_created_date: any;
  project_meeting_detail: any; // 이 회의에서 다루는 프로젝트의 기본정보 (유저가 회의 생성시 정하는거 [프롬프트에 들어감])
  project_id: number; // FK / 한 프로젝트에서 여러가지 주제로 여러게의 회의를 만들수 있음 / number
  project_meeting_index: number; // 이 회의를 진행한 횟수 / number
  project_meeting_room_type: any; // Feature OR Free
}

export interface DeveloperFortune {
  developer_fortune_id: number; // PK / number
  code: number; // 서버 응답코드로 구성 / number
  name: string; // text
  one_line_summary: string; // text
  description: string; // text
  category_message: string; // text
}

export interface Notes {
  note_id: number; // PK / number
  note_title: string; // text
  note_content: string | null; // text
  note_labels: string | null; // text[]
  note_description: string | null; // text
  created_date: Date; // date
  user_id: number; // FK / number
}

export interface MbitTypes {
  mbit_type_id: number; // PK / number
  mbit_type_name: string; // text
  mbit_type_code: string; // text
  mbit_type_participation: string; // text
  mbit_type_risks: string; // text
  mbit_type_thought: string; // text
  mbit_type_approach: string; // text
  mbit_type_recommended_job: string; // text
  mbit_type_recommended_reason: string; // text
  mbit_type_collaborative_style: string; // text
  mbit_type_strengths: string; // text
  mbit_type_weaknesses: string; // text
  mbit_type_stress_management: string; // text
  mbit_type_morning_greetings: string; // text
  mbit_type_night_greetings: string; // text
  user_id: number; // FK / number
}

export interface ThirdPartyServicesDescriptionMaterials {
  third_party_services_description_material_id: number; // PK / number
  third_party_services_description_material_name: string; // text
  third_party_services_description_material_description: string | null; // text
  third_party_services_description_material_content: string; // text
  third_party_services_description_material_category: string | null; // text[]
  third_party_services_description_material_document_url: string | null; // text
  third_party_services_description_material_representative_image_url:
    | string
    | null; // text
  third_party_services_description_material_image_url: string | null; // text[]
  third_party_services_description_material_created_date: Date; // date
  third_party_services_description_material_update_date: Date; // date
}

export interface UserNoticeReads {
  user_notice_reads_id: number; // PK / number
  is_read: boolean; // boolean
  read_at: Date; // date
  user_id: number; // FK / number
  notices_id: number; // FK / number
}

export interface UserAiSettings {
  user_ai_setting_id: number; // PK / number
  user_ai_setting_call_me_name: string; // text
  user_ai_setting_ai_self_awareness: boolean; // ai가 자기 인식을 하게 할건지 설정, 감정에 영향을 받지 않음 (존댓말 우선 사용) / boolean
  user_ai_setting_service_integration: boolean; // boolean
  user_ai_setting_created_date: Date; // date
  user_ai_setting_emotion: any; // srting
  ai_persona_id: number; // FK / number
  user_id: number; // FK / number
}

export interface StudyPlanNodes {
  study_plan_node_id: string; // PK / uuid
  study_plan_node_name: string; // text
  description: string | null; // text
  start_date: Date; // date
  end_date: Date; // date
  completed: boolean; // boolean
  position: number; // 1부터 시작 / number
  created_date: Date; // date
  tech_stack_id: number; // FK / number
  study_plan_id: number; // FK / number
}

export interface UserConcepts {
  user_concept_id: number; // PK / number
  user_concept_is_starred: boolean; // boolean
  user_id: number; // FK / number
  tool_description_material_id: number | null; // FK / number
  concept_description_material_id: number | null; // FK / number
  librarie_description_material_id: number | null; // FK / number
  package_manager_description_material_id: number | null; // FK / number
  third_party_services_description_material_id: number; // FK / number
}

export interface ProjectPlanningPages {
  project_page_id: number; // PK / number
  project_page_name: any;
  project_page_role: any;
  project_page_function: any;
  project_page_is_complete: any;
  project_id: number; // FK / number
}

export interface TechStacks {
  tech_stack_id: number; // PK / number
  tech_stack_name: number; // number
  tech_stack_img_url: string; // uuid
  tech_stack_created_date: Date; // date
}

export interface CompanyQnas {
  company_qna_id: string; // PK / uuid
  company_qna_question: string; // text
  company_qna_answer: string | null; // text
  company_qna_question_reason: string | null; // text
  company_qna_created_date: Date; // date
  company_id: number; // FK / number
}

export interface ChatMessages {
  chat_message_id: number; // PK / number
  chat_message_sender: string; // text
  chat_message_content: string | null; // text
  chat_message_sent_at: Date; // timestamp
  chat_message_index: number; // number
  emoticon_id: number | null; // FK / number
  chat_room_id: number; // FK / number
}

export interface UserFavoriteCompanies {
  user_favorite_company_id: string; // PK / uuid
  created_at: Date; // date
  user_id: number; // FK / number
  company_id: number; // FK / number
}

export interface Users {
  user_id: number; // PK / number
  user_email: string; // text
  user_name: string; // text
  user_profile_url: string | null; // text
  user_join_date: Date; // date ( 2020-09-09)
  user__points: number; // number
  user_level_id: number; // FK / number
  major_id: number; // FK / number
}

export interface MbitQuestions {
  mbit_questions_id: number; // PK / number
  mbit_questions_content: string; // text
  mbit_questions_axis: string; // 축 (참여, 리스크, 사고, 접근) 같은 기준 / text
  mbit_questions_trait: string; // E|P / C|R / L|V, / B|A / text
  mbit_questions_score_value: number; // 보기에 번호랑 이 배열의 인덱스 값이랑 매칭 / number[]
}

export interface Notices {
  notices_id: string; // PK / uuid
  notices_title: string; // text
  notice_content: string; // text
  notice_type: string; // text
  notice_created_date: Date; // date
  notice_updated_date: Date; // date
}

export interface ChatRoomAiSettings {
  chat_room_ai_id: number; // PK / number
  user_ai_setting_id: number; // FK / number
  chat_room_id: number; // FK / number
}
