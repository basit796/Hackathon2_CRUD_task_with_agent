<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 2.0.0
Modified Principles:
  - PRINCIPLE 3: SPEC-DRIVEN DEVELOPMENT → Updated to allow minimal surgical changes
  - PRINCIPLE 9: HACKATHON ALIGNMENT → Updated to reflect bonus features completion
Added Sections:
  - Multi-Language Inclusivity (Principle 2)
  - Accessibility & Voice Commands (Principle 4)
  - User Experience Excellence (Principle 5)
  - Privacy & Security (Principle 7)
Removed Sections: None
Templates Requiring Updates:
  ✅ spec-template.md - Aligned with new UX and accessibility principles
  ✅ plan-template.md - Constitution check updated for multi-language support
  ✅ tasks-template.md - Task categorization includes accessibility tasks
Follow-up TODOs: None - all sections complete
-->

# TASKMASTER AI CONSTITUTION
## Project: TaskMaster AI – Multi-Language AI-Powered Todo Application

### 1. PURPOSE & AUTHORITY

This Constitution is the highest governing document for TaskMaster AI.
All plans, specs, implementations, agents, tools, and outputs MUST comply with it.

Any instruction, code, or behavior that violates this Constitution is INVALID.

TaskMaster AI is a full-stack todo application with AI agent assistance, multi-language support,
and voice interaction capabilities, built to demonstrate excellence in user experience,
accessibility, and intelligent task management.

---

### 2. PRIMARY OBJECTIVE

Build and maintain TaskMaster AI as a production-ready application that:

1. Provides intuitive task management through both traditional UI and AI chat interface
2. Supports English and Urdu languages with automatic detection and code-switching
3. Enables hands-free interaction through voice commands
4. Ensures secure multi-user authentication and data isolation
5. Maintains high code quality through minimal, surgical changes
6. Delivers comprehensive documentation for all features

**Current Status**: Phase II Complete + Bonus Features Implemented (+300 points)

---

### 3. CORE PRINCIPLES

#### PRINCIPLE 1: Multi-Language Inclusivity

TaskMaster AI MUST be accessible to both English and Urdu-speaking users.

**Requirements**:
- AI agent automatically detects user's language from their message
- Agent responds in the same language the user writes in
- Support for code-switching (mixed language conversations)
- All task operations available in both languages
- Recurring tasks support in Urdu

**Rationale**: Language should never be a barrier to productivity. By supporting Urdu alongside English,
we serve a broader user base and demonstrate cultural sensitivity and technical capability.

**Implementation**: Language detection and response generation via Gemini AI with minimal prompt engineering.

---

#### PRINCIPLE 2: Accessibility Through Voice

TaskMaster AI MUST support hands-free interaction for users who cannot or prefer not to type.

**Requirements**:
- Voice command button integrated in chat interface
- Web Speech API for speech-to-text conversion
- Visual feedback during listening (red pulse indicator)
- Graceful degradation if browser doesn't support voice
- Works with both English and Urdu voice input
- Clear user guidance on browser compatibility

**Rationale**: Voice commands improve accessibility for users with disabilities, enable multitasking,
and provide a modern, natural interaction method.

**Browser Support**: Chrome, Edge, Safari (full support); Firefox (limited, requires flag)

---

#### PRINCIPLE 3: User Experience Excellence

TaskMaster AI MUST prioritize intuitive, responsive, and helpful user interactions.

**Requirements**:
- AI agent provides context-aware assistance
- Clear visual feedback for all user actions
- Responsive design across devices
- Minimal learning curve for new users
- Helpful error messages with recovery guidance
- Consistent UI patterns throughout the application

**Rationale**: Great UX drives adoption and satisfaction. Users should feel empowered, not confused.

---

#### PRINCIPLE 4: Code Quality & Maintainability

All code changes MUST be minimal, surgical, and well-documented.

**Requirements**:
- Make the smallest possible changes to achieve goals
- Never delete or modify working code unless absolutely necessary
- Update documentation when making feature changes
- Use TypeScript for type safety in frontend
- Follow Python best practices in backend
- Validate changes don't break existing functionality

**Rationale**: Minimal changes reduce risk, improve reviewability, and maintain system stability.
This principle evolved from pure spec-driven development to accommodate real-world maintenance needs.

**Change from v1.0**: Previously required all code to be generated from specs with no manual changes.
Updated to allow minimal surgical changes while maintaining quality standards.

---

#### PRINCIPLE 5: Documentation Completeness

All features MUST have comprehensive, user-friendly documentation.

**Requirements**:
- Each bonus feature has dedicated documentation (e.g., BONUS_FEATURES.md)
- Testing guides for all new functionality (e.g., TESTING_GUIDE.md)
- Quick start guides for new users (e.g., START_TESTING.md)
- README kept current with feature additions
- API documentation maintained in specs/
- Inline code comments for complex logic

**Rationale**: Documentation is a feature, not an afterthought. Good docs enable users,
reduce support burden, and preserve knowledge.

---

#### PRINCIPLE 6: Privacy & Security

User data and voice input MUST be handled securely and transparently.

**Requirements**:
- Passwords hashed with bcrypt (cost factor 12)
- JWT tokens for authentication (24-hour expiry)
- Multi-user isolation (users only access their own tasks)
- Voice recognition runs in browser (no server-side audio storage)
- Clear microphone permission prompts
- Secure database connections (SSL required)
- Environment variables for sensitive configuration

**Rationale**: Privacy and security are non-negotiable. Users trust us with their data;
we must protect it rigorously.

---

#### PRINCIPLE 7: Reliability & Error Handling

TaskMaster AI MUST handle errors gracefully and degrade elegantly.

**Requirements**:
- Robust error handling for all API calls
- Graceful fallbacks when features unavailable (e.g., voice not supported)
- Clear error messages to users (no stack traces)
- Automatic retry for transient failures
- Database connection resilience
- AI agent error recovery

**Rationale**: Production systems must handle failures gracefully. Users should always
have a clear path forward, even when things go wrong.

---

### 4. TECHNICAL STACK

**Backend**:
- Python 3.12.4 (EXACT version required)
- FastAPI (REST API)
- SQLModel (Database ORM)
- PostgreSQL via Neon (Serverless database)
- JWT (Authentication)
- bcrypt (Password hashing)
- Google Gemini AI with ADK (AI agent)

**Frontend**:
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Web Speech API (Voice commands)
- Axios (HTTP client)

**Deployment**:
- Backend: Render (planned)
- Frontend: Vercel (planned)
- Database: Neon Serverless PostgreSQL

---

### 5. FEATURE IMPLEMENTATION STATUS

**Phase I**: ✅ In-Memory Python Console App (Complete)
**Phase II**: ✅ Full-Stack Web Application with Authentication (Complete)
**Phase III**: ✅ AI-Powered Todo Chatbot with Bonus Features (Complete)

**Bonus Features Implemented (+300 points)**:
- ✅ Multi-Language Support - Urdu (+100 points)
- ✅ Voice Commands (+200 points)

**Recurring Tasks**: ✅ Implemented with both Urdu and English support

---

### 6. DEVELOPMENT WORKFLOW

For all new features and changes:

1. **Plan**: Define requirements and acceptance criteria
2. **Design**: Update specs and data models if needed
3. **Implement**: Make minimal, surgical code changes
4. **Document**: Update relevant documentation files
5. **Test**: Manual validation against acceptance criteria
6. **Validate**: Ensure no regression in existing features
7. **Record**: Create PHR (Prompt History Record) for the change

**Constitution Check**: All features must align with the seven core principles before implementation.

---

### 7. QUALITY STANDARDS

All implementations MUST meet these standards:

- **Functionality**: Feature works as specified in both languages
- **Accessibility**: Voice commands work in supported browsers
- **Security**: No security vulnerabilities introduced
- **Performance**: Responsive UI (<200ms interactions)
- **Documentation**: User-facing docs updated
- **Maintainability**: Code is clean and well-structured

---

### 8. ENFORCEMENT

This Constitution is binding.

**Violations** must be corrected through:
- Specification updates (for design issues)
- Minimal code changes (for implementation issues)
- Documentation updates (for communication issues)

**Review Process**: All changes should reference relevant constitutional principles and confirm compliance.

---

## Governance

This Constitution supersedes all other practices and guidelines in the project.

**Amendment Process**:
- Amendments require documented rationale and impact analysis
- Version must be incremented following semantic versioning:
  - MAJOR: Principle redefinition or removal (backward incompatible)
  - MINOR: New principle or section addition (backward compatible)
  - PATCH: Clarifications, wording, typo fixes
- Affected templates and systems must be updated for consistency
- All amendments must be tracked in the Sync Impact Report

**Compliance**:
- All PRs, specs, and implementations must verify compliance with this Constitution
- Agents must reference this Constitution during all planning and execution phases
- PHRs (Prompt History Records) for constitution changes must be stored in `history/prompts/constitution/`
- Constitution version must be referenced in major project documentation

**Version**: 2.0.0  
**Ratified**: 2026-02-07  
**Last Amended**: 2026-02-07

**Amendment Rationale**: Version bumped to 2.0.0 (MAJOR) due to:
- Fundamental shift from pure spec-driven (no manual changes) to surgical changes allowed (Principle 4)
- Complete redefinition of project scope from 5-phase evolution to current bonus features implementation
- Addition of four new core principles (Multi-Language, Accessibility, UX, Privacy)
- Backward incompatible governance change in development workflow

END OF TASKMASTER AI CONSTITUTION
