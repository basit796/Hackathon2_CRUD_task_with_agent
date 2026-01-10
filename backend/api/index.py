import sys
import os

# Add the parent directory to the path so we can import src
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from mangum import Mangum
from src.main import app

# Vercel serverless handler
handler = Mangum(app, lifespan="off")
