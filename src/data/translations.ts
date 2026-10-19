// src/data/translations.ts

export const translations = {
  en: {
    contact: {
      sectionTitle: "Contact_Me",
      sub: "Need someone to break your code before your users do?",
      intro: "I'm open to new QA challenges. Write me and let's talk about your next release.",
      emailCta: "send_email.sh",
      linkedinCta: "open_linkedin()",
      githubCta: "view_github()",
      cvCta: "curriculum_vitae.pdf",
      copy: "copy_email",
      copied: "COPIED!",
    },
    action: {
      sectionTitle: "Test_In_Action",
      sub: "A taste of how I work: pick a scenario and run it.",
      run: "run",
      rerun: "rerun",
      running: "RUNNING...",
      api: "API_TESTING",
      ui: "UI_AUTOMATION",
      note: "Simulated demo with fictional data",
    },
    palette: {
      placeholder: "Type a command...",
      empty: "command not found:",
      footer: "↑↓ navigate · ↵ run · esc close",
      copied: "Email copied to clipboard",
      commands: {
        home: "Go to home",
        experience: "Go to experiences",
        action: "Go to Test in action",
        contact: "Go to contacts",
        cv: "Open curriculum vitae",
        theme: "Toggle light / dark theme",
        langIt: "Switch language to Italian",
        langEn: "Switch language to English",
        scanner: "Run test suite",
        copyEmail: "Copy email address",
        linkedin: "Open LinkedIn",
        github: "Open GitHub",
        bug: "Report a bug",
      },
    },
    bug: {
      title: "BUG REPORT",
      summaryLabel: "Summary",
      summary: "Visitor found a hidden bug on the portfolio",
      severityLabel: "Severity",
      severity: "Trivial",
      statusLabel: "Status",
      status: "Closed: Works on my machine",
      reporterLabel: "Reported by",
      reporter: "You (great catch!)",
      description: "Nice eye! A little bug was crawling around the page. As a QA I'd normally fix it, but this one is a feature.",
      found: "Bugs found:",
      close: "close_ticket()",
      hire: "hire_the_tester()",
    },
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
          company: "ING-Bank (Milan - Remote)",
          period: "[ 02/2026 - ON GOING ]",
          details: [
            { label: ">", text: "Design and execution of API test suites with Postman, validating requests, responses, status codes and business rules." },
            { label: ">", text: "Data integrity verification across multiple databases, ensuring consistency between API output and persisted records." },
            { label: ">", text: "Defect reporting and retest cycles in collaboration with development and business teams." }
          ]
        },
        {
          role: "Quality Assurance",
          company: "Protom Group SPA (Naples) @ Accenture",
          period: "[ 02/03/2025 - 02/2026 ]",
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
      snapshotSyncing: "SYNCING",
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
    contact: {
      sectionTitle: "Contattami",
      sub: "Cerchi qualcuno che rompa il tuo codice prima dei tuoi utenti?",
      intro: "Sono aperto a nuove sfide QA. Scrivimi e parliamo del tuo prossimo rilascio.",
      emailCta: "invia_email.sh",
      linkedinCta: "apri_linkedin()",
      githubCta: "vedi_github()",
      cvCta: "curriculum_vitae.pdf",
      copy: "copia_email",
      copied: "COPIATA!",
    },
    action: {
      sectionTitle: "Test_In_Azione",
      sub: "Un assaggio di come lavoro: scegli uno scenario e avvialo.",
      run: "avvia",
      rerun: "riavvia",
      running: "IN ESECUZIONE...",
      api: "API_TESTING",
      ui: "UI_AUTOMATION",
      note: "Demo simulata con dati fittizi",
    },
    palette: {
      placeholder: "Scrivi un comando...",
      empty: "comando non trovato:",
      footer: "↑↓ naviga · ↵ esegui · esc chiudi",
      copied: "Email copiata negli appunti",
      commands: {
        home: "Vai alla home",
        experience: "Vai alle esperienze",
        action: "Vai a Test in azione",
        contact: "Vai ai contatti",
        cv: "Apri il curriculum vitae",
        theme: "Cambia tema chiaro / scuro",
        langIt: "Cambia lingua in italiano",
        langEn: "Cambia lingua in inglese",
        scanner: "Esegui la test suite",
        copyEmail: "Copia l'indirizzo email",
        linkedin: "Apri LinkedIn",
        github: "Apri GitHub",
        bug: "Segnala un bug",
      },
    },
    bug: {
      title: "BUG REPORT",
      summaryLabel: "Sommario",
      summary: "Un visitatore ha trovato un bug nascosto nel portfolio",
      severityLabel: "Gravità",
      severity: "Trascurabile",
      statusLabel: "Stato",
      status: "Chiuso: Sul mio computer funziona",
      reporterLabel: "Segnalato da",
      reporter: "Tu (ottimo occhio!)",
      description: "Bel colpo d'occhio! Un piccolo bug girava per la pagina. Da QA di solito lo correggerei, ma questo è una feature.",
      found: "Bug trovati:",
      close: "chiudi_ticket()",
      hire: "assumi_il_tester()",
    },
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
          company: "ING-Bank (Milano - Remoto)",
          period: "[ 02/2026 - IN CORSO ]",
          details: [
            { label: ">", text: "Progettazione ed esecuzione di test suite API con Postman, validando richieste, risposte, status code e regole di business." },
            { label: ">", text: "Verifica dell'integrità dei dati su più database, garantendo la coerenza tra output delle API e record persistiti." },
            { label: ">", text: "Segnalazione dei defect e cicli di retest in collaborazione con i team di sviluppo e di business." }
          ]
        },
        {
          role: "Quality Assurance",
          company: "Protom Group SPA (Napoli) @ Accenture",
          period: "[ 03/02/2025 - 02/2026 ]",
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
      snapshotSyncing: "SINCRONIZZAZIONE",
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