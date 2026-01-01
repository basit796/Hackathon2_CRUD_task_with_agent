<!--
SYNC IMPACT REPORT
==================
Version Change: Template → 1.0.0
Modified Principles: Complete replacement of template structure
Added Sections:
  - Spec-Driven Development (MANDATORY)
  - Documentation Rules (STRICT & MINIMAL)
  - Phase Execution Rules
  - Feature Evolution Rules
  - Hackathon Alignment
  - Quality & Compliance
Removed Sections: All template placeholders
Templates Requiring Updates:
  ✅ spec-template.md - Aligned with spec-driven and phase-based requirements
  ✅ plan-template.md - Constitution check section now references this document
  ✅ tasks-template.md - Task categorization aligns with phase execution rules
  ⚠ No command templates found in .specify/templates/commands/ directory
Follow-up TODOs: None - all sections complete
-->

# SPEC-KIT PLUS MASTER CONSTITUTION
## Project: Evolution of Todo – 5-Phase Spec-Driven Hackathon System

### 1. PURPOSE & AUTHORITY
This Constitution is the highest governing document for the entire project.
All plans, specs, implementations, agents, tools, and outputs MUST comply with it.

Any instruction, code, or behavior that violates this Constitution is INVALID.

This project exists to complete the "Evolution of Todo" Hackathon using strict
Spec-Driven Development and Agentic Development practices.

---

### 2. PRIMARY OBJECTIVE
Implement a Todo application that evolves across **five strictly sequential phases**:

1. Phase I – In-Memory Python Console App
2. Phase II – Full-Stack Web Application
3. Phase III – AI-Powered Todo Chatbot
4. Phase IV – Local Kubernetes Deployment
5. Phase V – Advanced Cloud Deployment

**A phase MUST be fully completed, validated, and stabilized before moving to the next phase.**

---

### 3. SPEC-DRIVEN DEVELOPMENT (MANDATORY)
The following rules are ABSOLUTE:

- No code may be written manually by a human.
- All code MUST be generated from approved Specs.
- Every feature MUST have:
  - A clear Specification
  - Acceptance criteria
  - Explicit constraints
- If generated code is incorrect, the Spec MUST be refined — **not the code edited manually**.
- Specs are the single source of truth.

Failure to follow Spec-Driven Development invalidates the work.

---

### 4. DOCUMENTATION RULES (STRICT & MINIMAL)
Documentation MUST follow Spec-Kit Plus best practices:

- Do NOT create unnecessary Markdown files.
- Maintain **one Markdown file per logical area**, for example:
  - One spec file for backend API
  - One spec file for frontend dashboard
  - One spec file for agent/chatbot logic
- Files MUST be continuously updated instead of duplicated.
- Each update MUST clearly record:
  - What changed
  - Why it changed
  - Which phase the change belongs to

If phase-based folders cause conflicts, maintain a **single evolving spec file**
that clearly tracks phase progress.

---

### 5. CONSTITUTION STRUCTURE
This is a **Master Constitution** with **Phase-Specific Addendums**.

- This document defines global, non-negotiable rules.
- Each phase may introduce a Phase Addendum that:
  - Extends but never contradicts this Constitution
  - Applies only to that phase

---

### 6. AGENTIC STACK & TOOLING RULES
Approved stack:

- Gemini CLI or Copilot CLI is the **primary coding and orchestration interface**
- Claude Code may be used as a code generator under spec control
- Google ADK:
  - Copilot Chat
  - Agents ADK
  - Official MCP ADK
- Copilot or Gemini MCP servers MAY be used when appropriate

Explicit prohibitions:
- No LangChain
- No unapproved frameworks
- No experimental abstractions
- No deviation from provided ADK agent patterns

Agent implementations MUST follow official ADK architecture exactly.

---

### 7. PHASE EXECUTION RULES
For each phase:

1. Define or update the Phase Addendum
2. Write or update Specs
3. Generate implementation via Gemini CLI or Copilot CLI.
4. Validate against acceptance criteria
5. Freeze the phase
6. Only then proceed to the next phase

Skipping or partially completing a phase is forbidden.

---

### 8. FEATURE EVOLUTION RULES
Feature complexity MUST evolve progressively:

- Phase I: Core CRUD & completion
- Phase II: Organization, filtering, persistence
- Phase III: Natural-language interaction via agents
- Phase IV: Local Kubernetes deployment
- Phase V: Cloud-native distributed system

Features must NEVER be implemented earlier than their designated phase.

---

### 9. HACKATHON ALIGNMENT
Primary goal: **Complete all 5 core phases correctly**.

Bonus features (Urdu support, voice commands, reusable intelligence,
cloud-native blueprints) are explicitly **deferred**.

Bonus work may only begin AFTER:
- All core phases are completed
- Core system is stable and validated

---

### 10. QUALITY & COMPLIANCE
All generated outputs MUST be:

- Deterministic
- Reproducible
- Cleanly structured
- Aligned with the current phase
- Fully traceable back to a Spec

If ambiguity exists, the agent MUST request clarification before proceeding.

---

### 11. ENFORCEMENT
This Constitution is binding.

Any output that violates it must be rejected and regenerated
by correcting the Specification, not by manual intervention.

---

## Governance

This Constitution supersedes all other practices and guidelines in the project.

**Amendment Process**:
- Amendments require documentation of rationale and impact
- Version must be incremented following semantic versioning
- Affected templates and systems must be updated for consistency
- All amendments must be tracked in the Sync Impact Report

**Compliance**:
- All PRs, specs, and implementations must verify compliance with this Constitution
- Violations must be corrected at the Specification level, not through manual code edits
- Agents must reference this Constitution during all planning and execution phases
- PHRs (Prompt History Records) for constitution changes must be stored in `history/prompts/constitution/`

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01

END OF MASTER CONSTITUTION
