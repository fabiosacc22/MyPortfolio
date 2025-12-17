// src/data/experiences.ts

export interface ProjectLog {
  id: string;
  title: string;
  type: string;
  status: 'PASSED' | 'FIXED' | 'RUNNING';
  description: string;
  tools: string[];
  date: string;
  logs: string[];
}

export const projectsData: ProjectLog[] = [
  {
    id: "TR-001",
    title: "E-commerce Platform Audit",
    type: "Manual & Regression Testing",
    status: "PASSED",
    description: "Analisi completa del flusso di checkout. Identificati e documentati 15 bug critici relativi alla validazione dei pagamenti.",
    tools: ["Jira", "DevTools", "Postman"],
    date: "2024-11-15",
    logs: [
      "Starting Manual Audit...",
      "Checking Checkout Flow: FAIL (Payment Validation)",
      "Issue logged in Jira: JIRA-402",
      "Regression Test: PASSED",
      "Final validation: 0 critical issues remaining."
    ]
  },
  {
    id: "TR-002",
    title: "Mobile App Beta Testing",
    type: "Exploratory Testing",
    status: "FIXED",
    description: "Test di usabilità e performance su dispositivi Android/iOS. Focus sulla gestione della cache offline.",
    tools: ["BrowserStack", "ADB Shell"],
    date: "2024-12-02",
    logs: [
      "Environment: Android 14 / iOS 17",
      "Testing Offline Mode: Cache mismatch found",
      "Analyzing ADB Logs: Memory leak detected",
      "Developer Fix Applied",
      "Retest: Offline sync successful."
    ]
  },
  {
    id: "TR-003",
    title: "Rest API Validation",
    type: "API Testing",
    status: "PASSED",
    description: "Verifica degli endpoint di autenticazione e autorizzazione. Validazione degli schemi JSON e dei codici di risposta HTTP.",
    tools: ["Postman", "Swagger"],
    date: "2025-01-10",
    logs: [
      "Target: https://api.auth.service/v1",
      "Testing GET /user_profile [Status 200]",
      "Schema Validation: Match found",
      "Latency Test: 85ms (Average)",
      "Auth Token Refresh: OK"
    ]
  }
];