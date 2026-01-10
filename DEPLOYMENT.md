# Deployment Guide

## Frontend Deployment ✅

The frontend has been successfully deployed to Vercel!

**Production URL:** https://frontend-6qbjw6t7a-syed-abdul-basits-projects.vercel.app

### Fixed Issues:
1. **TypeScript Build Errors**: Fixed type conflicts between React's `onAnimationStart` and Framer Motion's animation events in:
   - `src/components/ui/Button.tsx` 
   - `src/components/ui/Card.tsx`

2. **CORS Configuration**: Updated backend to allow all origins for production deployment

### Files Modified:
- `frontend/src/components/ui/Button.tsx` - Fixed motion type conflicts
- `frontend/src/components/ui/Card.tsx` - Fixed motion type conflicts  
- `backend/src/main.py` - Updated CORS to allow all origins

## Backend Deployment

The backend is a FastAPI Python application that needs to be deployed separately. Here are the recommended options:

### Option 1: Deploy Backend to Render.com (Recommended)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
4. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (Neon)
   - `JWT_AUTH`: Your JWT secret key (min 32 chars)
5. Deploy!

### Option 2: Deploy Backend to Railway.app

1. Create a new project on Railway.app
2. Connect your GitHub repository
3. Add PostgreSQL database (or use existing Neon)
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (same as above)

### Option 3: Deploy Backend to Vercel (Serverless)

Note: This requires converting the FastAPI app to serverless functions.

1. Create `backend/api/index.py`:
```python
from src.main import app

# Export for Vercel
handler = app
```

2. Create `backend/vercel.json`:
```json
{
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

3. Deploy with:
```bash
cd backend
vercel --prod
```

## Connecting Frontend to Backend

Once the backend is deployed:

1. Get your backend URL (e.g., `https://your-backend.onrender.com`)
2. Update frontend environment variable on Vercel:
   - Go to: https://vercel.com/syed-abdul-basits-projects/frontend/settings/environment-variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com`
3. Redeploy frontend:
```bash
cd frontend
vercel --prod
```

## Current Status

✅ **Frontend**: Deployed and working at https://frontend-6qbjw6t7a-syed-abdul-basits-projects.vercel.app  
⚠️ **Backend**: Needs to be deployed (recommended: Render.com or Railway.app)  
⚠️ **Database**: Already configured with Neon PostgreSQL (update DATABASE_URL env var)

## Environment Variables Required

### Frontend (.env.local or Vercel settings):
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (.env or deployment platform settings):
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_AUTH` - JWT secret key (min 32 characters)

## Testing Deployment

After both are deployed:

1. Visit your frontend URL
2. Sign up with a new account
3. Create some tasks
4. Verify all CRUD operations work

## Troubleshooting

**Frontend can't connect to backend:**
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running and accessible
- Check browser console for CORS errors

**Database connection errors:**
- Verify `DATABASE_URL` is correct
- Ensure Neon database is accessible
- Check that database tables are created

**Build errors:**
- Clear `.next` folder and rebuild
- Check that all dependencies are installed
- Verify Node.js version is 18+

## Next Steps

1. Deploy backend to Render.com or Railway.app
2. Configure environment variables on both platforms
3. Update frontend to point to production backend
4. Test the full application
5. Optional: Set up custom domain names
