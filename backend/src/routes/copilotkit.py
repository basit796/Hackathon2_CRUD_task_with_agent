"""CopilotKit endpoint for ADK agent integration."""
import logging
from src.agent import root_agent
from ag_ui_adk import ADKAgent, add_adk_fastapi_endpoint
from google.adk.sessions import InMemorySessionService
from google.adk.artifacts import InMemoryArtifactService
from google.adk.memory import InMemoryMemoryService
from google.adk.auth.credential_service.in_memory_credential_service import InMemoryCredentialService

logger = logging.getLogger(__name__)

# Create ADK services
session_service = InMemorySessionService()
memory_service = InMemoryMemoryService()
credential_service = InMemoryCredentialService()
artifact_service = InMemoryArtifactService()

# Create ADK agent for CopilotKit using ag_ui_adk
task_adk_agent = ADKAgent(
    adk_agent=root_agent,
    app_name="task_manager",
    user_id="copilotkit_user",  # Will be overridden per session
    session_timeout_seconds=604800,  # 7 days
    use_in_memory_services=False,
    memory_service=memory_service,
    credential_service=credential_service,
    session_service=session_service,
    artifact_service=artifact_service,
    cleanup_interval_seconds=604800
)

# Use the helper function to add the ADK FastAPI endpoint
# This automatically handles all the CopilotKit protocol
def setup_copilotkit_routes(app):
    """Setup CopilotKit routes on the FastAPI app"""
    add_adk_fastapi_endpoint(app, task_adk_agent, path="/api/copilotkit")
    logger.info("CopilotKit endpoint registered at /api/copilotkit")
