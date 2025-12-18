// src/data/translations.ts

export const translations: any = {
  en: {
    hero: {
      command: "> init --qa-profile",
      successMsg: "Profile initialized successfully",
      status: "Status: Open_to_Opportunities",
      titlePart1: "FABIO ANTONIO",
      titlePart2: "SACCONE",
      description: `Software Tester & QA Automation Engineer. 
Specialized in identifying critical vulnerabilities and optimizing software quality. From manual API auditing with Postman and Charles Proxy to building robust automation suites with Selenium and Python, I ensure every release is bug-free and production-ready.`,
      ctaMain: "run_test_suite.exe",
      ctaCv: "curriculum_vitae.pdf",
    },
    cv: {
      terminalHeader: "QA_EXECUTION_REPORT.log",
      statusLabel: "STATUS:",
      statusValue: "READY_FOR_RELEASE",
      techSkillsTitle: "01. Technical_Skills",
      expLogTitle: "02. Work_Experience_Log",
      generateBtn: "[ GENERATE_PDF_REPORT ]",
      phoneLabel: "PHONE:",
      phoneValue: "3392814726",
      skills: ["#Manual_Testing", "#Bug_Reporting_Jira_ALM", "#Regression_Testing", "#API_Testing_Postman", "#Selenium", "#Relational_DBs", "#Network_Debugging_Charles_Proxy", "#SQL_&_Data_Validation"],
      privacy: "I authorize the processing of my personal data contained in my curriculum vitae in accordance with the GDPR (Regulation UE 2016/679).",
      experiences: [
        {
          role: "Quality Assurance",
          company: "Protom Group SPA (Naples) @ Accenture",
          period: "[ 02/03/2025 - ON GOING ]",
          details: [
            { label: "Unipol (Salesforce):", text: "Functional testing, requirements verification, and defect monitoring via ALM." },
            { label: "Intesa Sanpaolo:", text: "Flow and integration testing, API validation with Postman, and DB data consistency checks." }
          ]
        },
        {
          role: "Quality Assurance",
          company: "RGi Group (Turin - Hybrid)",
          period: "[ 11/02/2023 - 02/02/2025 ]",
          details: [
            { label: ">", text: "Insurance sector consultancy: back-end testing (Postman) and MySQL database verification (DBeaver)." },
            { label: ">", text: "Application log analysis via Elastic and bug tracking via Jira." }
          ]
        },
        {
          role: "Software Tester",
          company: "Concept Reply (Turin - Remote)",
          period: "[ 07/01/2022 - 10/30/2023 ]",
          details: [
            { label: "Vodafone:", text: "Mobile app testing (iOS/Android) and API integration testing (Postman/Charles)." },
            { label: "Easyjet:", text: "Automation testing with Selenide (Kotlin), Selenium (Java), and Python. API validation with Postman and management via ClickUp." }
          ]
        },
        {
          role: "Junior Software Tester",
          company: "Relatech SpA (Naples)",
          period: "[ 02/17/2022 - 06/30/2022 ]",
          details: [
            { label: "Walgreens Boots Alliance:", text: "Functional testing with test case writing in Gherkin. Used Jira, Databricks, and Confluence." }
          ]
        }
      ]
    },
    profileDropdown: {
      age: 30,
      location: "Valle di Maddaloni (CE), Italy",
      status: "Active",
      hobbies: ["Sport", "Tech", "TV Series", "Cooking"],
      current_focus: "QA Automation & Testing",
    },
    experience: {
      sectionTitle: "Exp_Repository",
      sectionSub: "Deploying professional_background.sh ... READY",
      snapshotTitle: "System_Snapshot",
      snapshotEntries: "WORK_EXPERIENCES",
      snapshotStatus: "DB_STATUS",
      snapshotSynced: "SYNCED",
      employer: "@_Employer",
      activity: "Activity_Type",
      period: "Time_Period",
      summary: "-- Mission_Summary --",
      statusLabel: "STATUS",
      runningMsg: "> RUNNING_DIAGNOSTICS",
      consoleHeader: "CONSOLE_OUTPUT",
    },
    overlay: {
      logs: [
        "> STARTING_FULL_SYSTEM_AUDIT...",
        "> Checking UI/UX integrity... [ OK ]",
        "> Analyzing backend endpoints... [ OK ]",
        "> Running security_vulnerability_scan...",
        "> [ WARNING ] 14 Unresolved bugs found in production",
        "> [ CRITICAL ] Quality Assurance gap detected",
        "> [ ANALYSIS ] Risk of user churn: HIGH",
        "> ------------------------------------------------",
        "> SOLUTION FOUND: Fabio Antonio Saccone (QA Automation Engineer)",
        "> Action: Fortify_Codebase_And_Automate_Tests",
        "> Status: WAITING_FOR_YOUR_COMMAND",
        "> [ MESSAGE ] Need someone to break your code before your users do?",
      ],
      ctaHire: "Hire_Tester.now()",
      ctaClose: "Return_to_site",
    }
  },
  it: {
    hero: {
      command: "> inizializza --profilo-qa",
      successMsg: "Profilo inizializzato correttamente",
      status: "Stato: Disponibile_per_nuove_sfide",
      titlePart1: "FABIO ANTONIO",
      titlePart2: "SACCONE",
      description: `Software Tester & QA Automation Engineer. 
Specializzato nell'identificazione di vulnerabilità critiche e nell'ottimizzazione della qualità del software. Dall'analisi manuale delle API con Postman e Charles Proxy alla creazione di suite di automazione robuste con Selenium e Python, garantisco che ogni rilascio sia privo di bug e pronto per la produzione.`,
      ctaMain: "esegui_test_suite.exe",
      ctaCv: "curriculum_vitae.pdf",
    },
    cv: {
      terminalHeader: "REPORT_ESECUZIONE_QA.log",
      statusLabel: "STATO:",
      statusValue: "PRONTO_AL_RILASCIO",
      techSkillsTitle: "01. Competenze_Tecniche",
      expLogTitle: "02. Log_Esperienze_Lavorative",
      generateBtn: "[ GENERA_PDF_REPORT ]",
      phoneLabel: "CELL:",
      phoneValue: "3392814726",
      skills: ["#Manual_Testing", "#Bug_Reporting_Jira_ALM", "#Regression_Testing", "#API_Testing_Postman", "#Selenium", "#DB_Relazionali", "#Network_Debugging_Charles_Proxy", "#SQL_&_Validazione_Dati"],
      privacy: "Autorizzo il trattamento dei dati personali contenuti nel mio curriculum vitae in conformità al D.Lgs. 196/03 e al Regolamento (UE) 2016/679 (GDPR).",
      experiences: [
        {
          role: "Quality Assurance",
          company: "Protom Group SPA (Napoli) @ Accenture",
          period: "[ 03/02/2025 - IN CORSO ]",
          details: [
            { label: "Unipol (Salesforce):", text: "Test funzionali, verifica requisiti e monitoraggio defect tramite ALM." },
            { label: "Intesa Sanpaolo:", text: "Test flussi applicativi e integrazione, validazione API tramite Postman e verifica coerenza dati a database." }
          ]
        },
        {
          role: "Quality Assurance",
          company: "RGi Group (Torino - Ibrido)",
          period: "[ 02/11/2023 - 02/02/2025 ]",
          details: [
            { label: ">", text: "Consulenza assicurativa: test back-end (Postman) e verifiche database MySQL (DBeaver)." },
            { label: ">", text: "Analisi log tramite Elastic e monitoraggio bug tramite Jira." }
          ]
        },
        {
          role: "Software Tester",
          company: "Concept Reply (Torino - Remoto)",
          period: "[ 01/07/2022 - 30/10/2023 ]",
          details: [
            { label: "Vodafone:", text: "Testing Mobile (iOS/Android) e test integrazione API (Postman/Charles)." },
            { label: "Easyjet:", text: "Automation testing con Selenide, Selenium e Python. Validazione API e gestione tramite ClickUp." }
          ]
        },
        {
          role: "Junior Software Tester",
          company: "Relatech SpA (Napoli)",
          period: "[ 17/02/2022 - 30/06/2022 ]",
          details: [
            { label: "Walgreens Boots Alliance:", text: "Testing funzionale con stesura casi di test in linguaggio Gherkin. Utilizzo di Jira, Databricks e Confluence." }
          ]
        }
      ]
    },
    profileDropdown: {
      age: 30,
      location: "Valle di Maddaloni (CE)",
      status: "Attivo",
      hobbies: ["Sport", "Informatica", "Serie TV", "Cucina"],
      current_focus: "QA Automation & Testing",
    },
    experience: {
      sectionTitle: "Repository_Exp",
      sectionSub: "Caricamento background_professionale.sh ... PRONTO",
      snapshotTitle: "Snapshot_Sistema",
      snapshotEntries: "ESPERIENZE_LAVORATIVE",
      snapshotStatus: "STATO_DB",
      snapshotSynced: "SINCRONIZZATO",
      employer: "@_Azienda",
      activity: "Tipo_Attività",
      period: "Periodo_Temporale",
      summary: "-- Sintesi Attività --",
      statusLabel: "STATO",
      runningMsg: "> ESECUZIONE_DIAGNOSTICA",
      consoleHeader: "OUTPUT_CONSOLE",
    },
    overlay: {
      logs: [
        "> AVVIO_AUDIT_SISTEMA_COMPLETO...",
        "> Verifica integrità UI/UX... [ OK ]",
        "> Analisi endpoint backend... [ OK ]",
        "> Esecuzione security_vulnerability_scan...",
        "> [ WARNING ] 14 Bug non risolti trovati in produzione",
        "> [ CRITICAL ] Rilevato gap nel Quality Assurance",
        "> [ ANALYSIS ] Rischio di abbandono utenti: ALTO",
        "> ------------------------------------------------",
        "> SOLUZIONE TROVATA: Fabio Antonio Saccone (QA Automation Engineer)",
        "> Azione: Fortifica_Codebase_E_Automatizza_Test",
        "> Stato: IN_ATTESA_DI_COMANDO",
        "> [ MESSAGE ] Hai bisogno di qualcuno che rompa il tuo codice prima che lo facciano gli utenti?",
      ],
      ctaHire: "Assumi_Tester.now()",
      ctaClose: "Torna_al_sito",
    }
  },
};