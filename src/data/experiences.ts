// src/data/experiences.ts

export interface ProjectLog {
  id: string;
  title: string;
  company: string;
  type: string;
  status: 'PASSED' | 'RUNNING' | 'COMPLETED';
  description: string;
  tools: string[];
  date: string;
  logs: string[];
}

// Struttura corretta per supportare il multilingua ed evitare errori .length
export const projectsData: { en: ProjectLog[]; it: ProjectLog[] } = {
  en: [
    {
      id: "WRKEX-001",
      title: "Salesforce QA Strategy - Unipol",
      company: "Accenture",
      type: "Functional & Release Testing",
      status: "RUNNING",
      description: "End-to-end validation of the Salesforce portal. Managing the full defect lifecycle and release coordination to ensure strict compliance with application requirements.",
      tools: ["Salesforce", "Micro Focus ALM", "Standard QA Suite"],
      date: "2025-02-03 - Present",
      logs: [
        "Syncing with Accenture/Unipol requirements...",
        "Defining Test Cases for Salesforce modules...",
        "Execution of functional test campaigns: ACTIVE",
        "Defect tracking & monitoring via ALM...",
        "Quality Gate: Analyzing release readiness [PENDING]"
      ]
    },
    {
      id: "WRKEX-002",
      title: "Backend & Integration Testing - Intesa",
      company: "Accenture",
      type: "API & DB Validation",
      status: "RUNNING",
      description: "Technical audit of banking integration flows. Database integrity verification and API endpoint validation to ensure maximum system stability and data consistency.",
      tools: ["Postman", "SQL", "API Integration", "Oracle DB"],
      date: "2025-02-03 - Present",
      logs: [
        "Establishing secure connection to DB...",
        "Validating API endpoints via Postman requests...",
        "SQL Query: Checking data transcription integrity [OK]",
        "Analyzing application integration flows...",
        "Defect lifecycle management: COMPLETED"
      ]
    },
    {
      id: "WRKEX-003",
      title: "Insurance Backend Audit",
      company: "RGI Group",
      type: "API, DB & Log Analysis",
      status: "PASSED",
      description: "Specialized consultancy for the insurance sector. Validation of backend flows, relational database querying, and system health monitoring through advanced log analysis.",
      tools: ["Postman", "MySQL", "DBeaver", "Elastic (ELK)", "Jira"],
      date: "2023-11-02 – 2025-02-02",
      logs: [
        "Establishing DBeaver session with MySQL...",
        "Querying insurance policy tables... [ OK ]",
        "Fetching application logs via Elastic...",
        "Investigating root cause for reported bugs...",
        "Issue tracking & documentation in Jira workflow..."
      ]
    },
    {
      id: "WRKEX-005",
      title: "Mobile App & API Integration - Vodafone",
      company: "Concept Reply",
      type: "Mobile Testing & Network Debugging",
      status: "PASSED",
      description: "End-to-end testing of iOS and Android applications. Leveraging network proxies for API traffic interception and validation of client-server communication flows.",
      tools: ["Charles Proxy", "Postman", "iOS/Android", "Jira"],
      date: "2022-07-01 – 2023-10-30",
      logs: [
        "Initializing Charles Proxy session...",
        "Intercepting SSL traffic from mobile client...",
        "Validating API response payloads [Postman]...",
        "Cross-platform parity check: iOS vs Android [OK]",
        "Defect reporting: High priority issues logged in Jira."
      ]
    },
    {
      id: "WRKEX-006",
      title: "Full-Stack Automation Suite - Easyjet",
      company: "Concept Reply",
      type: "Test Automation (Web & API)",
      status: "PASSED",
      description: "Development of automation frameworks for Frontend and Backend components. Implementing Selenium and Selenide scripts in Kotlin/Java and Python for regression suites.",
      tools: ["Selenide (Kotlin)", "Selenium (Java)", "Python", "PyCharm", "ClickUp"],
      date: "2022-07-01 – 2023-10-30",
      logs: [
        "Building automation scripts [Selenide/Kotlin]...",
        "Executing UI regression suite via Selenium...",
        "Running Python-based backend validation scripts...",
        "API integration test: Checking JSON schema [SUCCESS]",
        "Syncing test results with ClickUp lifecycle..."
      ]
    },
    {
      id: "WRKEX-007",
      title: "Functional Testing & BDD - Walgreens",
      company: "Relatech",
      type: "Behavior Driven Development",
      status: "PASSED",
      description: "Functional testing for the Pharma/Retail industry. Requirement definition using Gherkin language and large-scale data analysis for business process validation.",
      tools: ["Gherkin", "Databricks", "Jira", "VDI", "Confluence"],
      date: "2022-02-17 – 2022-06-30",
      logs: [
        "Drafting BDD scenarios (Given/When/Then)...",
        "Translating business requirements into Gherkin...",
        "Querying datasets via Databricks for validation...",
        "Executing test campaigns in VDI environment...",
        "Documenting test results in Confluence..."
      ]
    }
  ],
  it: [
    {
      id: "WRKEX-001",
      title: "Strategia QA Salesforce - Unipol",
      company: "Accenture",
      type: "Test Funzionali & Rilascio",
      status: "RUNNING",
      description: "Validazione end-to-end del portale Salesforce. Gestione dell'intero ciclo di vita dei difetti e coordinamento dei rilasci per garantire la conformità ai requisiti applicativi.",
      tools: ["Salesforce", "Micro Focus ALM", "Standard QA Suite"],
      date: "03-02-2025 - Presente",
      logs: [
        "Sincronizzazione requisiti Accenture/Unipol...",
        "Definizione Test Case per moduli Salesforce...",
        "Esecuzione campagne test funzionali: ATTIVA",
        "Monitoraggio e tracking difetti via ALM...",
        "Quality Gate: Analisi prontezza rilascio [PENDING]"
      ]
    },
    {
      id: "WRKEX-002",
      title: "Backend & Integration Testing - Intesa",
      company: "Accenture",
      type: "Validazione API & Database",
      status: "RUNNING",
      description: "Audit tecnico dei flussi di integrazione bancaria. Verifica dell'integrità del database e validazione degli endpoint API per garantire stabilità di sistema e consistenza dei dati.",
      tools: ["Postman", "SQL", "API Integration", "Oracle DB"],
      date: "03-02-2025 - Presente",
      logs: [
        "Stabilizzazione connessione sicura al DB...",
        "Validazione endpoint API via richieste Postman...",
        "Query SQL: Controllo integrità trascrizione dati [OK]",
        "Analisi flussi di integrazione applicativa...",
        "Gestione ciclo di vita dei difetti: COMPLETATA"
      ]
    },
    {
      id: "WRKEX-003",
      title: "Audit Backend Assicurativo",
      company: "RGI Group",
      type: "Analisi API, DB & Log",
      status: "PASSED",
      description: "Consulenza specializzata per il settore assicurativo. Validazione dei flussi backend, interrogazione di database relazionali e monitoraggio tramite analisi avanzata dei log.",
      tools: ["Postman", "MySQL", "DBeaver", "Elastic (ELK)", "Jira"],
      date: "02-11-2023 – 02-02-2025",
      logs: [
        "Apertura sessione DBeaver con MySQL...",
        "Interrogazione tabelle polizze assicurative... [ OK ]",
        "Estrazione log applicativi via Elastic...",
        "Investigazione root cause per bug segnalati...",
        "Tracking problematiche nel workflow Jira..."
      ]
    },
    {
      id: "WRKEX-005",
      title: "App Mobile & Integrazione API - Vodafone",
      company: "Concept Reply",
      type: "Mobile Testing & Network Debugging",
      status: "PASSED",
      description: "Testing end-to-end di applicazioni iOS e Android. Utilizzo di proxy di rete per l'intercettazione del traffico API e la validazione dei flussi di comunicazione client-server.",
      tools: ["Charles Proxy", "Postman", "iOS/Android", "Jira"],
      date: "01-07-2022 – 30-10-2023",
      logs: [
        "Inizializzazione sessione Charles Proxy...",
        "Intercettazione traffico SSL da client mobile...",
        "Validazione payload risposte API [Postman]...",
        "Verifica parità cross-platform: iOS vs Android [OK]",
        "Bug reporting: Loggate issue ad alta priorità in Jira."
      ]
    },
    {
      id: "WRKEX-006",
      title: "Suite Automazione Full-Stack - Easyjet",
      company: "Concept Reply",
      type: "Test Automation (Web & API)",
      status: "PASSED",
      description: "Sviluppo di framework di automazione per componenti Frontend e Backend. Implementazione di script Selenium e Selenide in Kotlin/Java e Python per suite di regressione.",
      tools: ["Selenide (Kotlin)", "Selenium (Java)", "Python", "PyCharm", "ClickUp"],
      date: "01-07-2022 – 30-10-2023",
      logs: [
        "Sviluppo script di automazione [Selenide/Kotlin]...",
        "Esecuzione suite regressione UI via Selenium...",
        "Esecuzione script Python per validazione backend...",
        "Test integrazione API: Verifica JSON schema [SUCCESS]",
        "Sincronizzazione risultati su ClickUp..."
      ]
    },
    {
      id: "WRKEX-007",
      title: "Test Funzionali & BDD - Walgreens",
      company: "Relatech",
      type: "Behavior Driven Development",
      status: "PASSED",
      description: "Testing funzionale per il settore Pharma/Retail. Definizione dei requisiti tramite linguaggio Gherkin e analisi dati su larga scala per la validazione dei processi di business.",
      tools: ["Gherkin", "Databricks", "Jira", "VDI", "Confluence"],
      date: "17-02-2022 – 30-06-2022",
      logs: [
        "Stesura scenari BDD (Given/When/Then)...",
        "Traduzione requisiti di business in Gherkin...",
        "Query su Databricks per validazione dataset...",
        "Esecuzione campagne test in ambiente VDI...",
        "Documentazione risultati su Confluence..."
      ]
    }
  ]
};