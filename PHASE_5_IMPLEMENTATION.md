# Phase 5: Event-Driven Cloud Deployment

**Branch:** `phase-5-event-driven`  
**Status:** In Progress  
**Started:** 2026-02-07

---

## 🎯 Objective

Deploy TaskMaster as an event-driven microservices architecture using:
- **Oracle Cloud (OKE)** - Kubernetes cluster (Always Free)
- **Redpanda Cloud** - Kafka-compatible event streaming (Free tier)
- **Dapr** - Distributed application runtime
- **Microservices** - Notification, Recurring Tasks, Audit

---

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORACLE CLOUD (OKE)                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Kubernetes Cluster                             │ │
│  │                                                              │ │
│  │  Frontend (Next.js) ─────┐                                 │ │
│  │  + Dapr Sidecar          │                                 │ │
│  │                           ▼                                 │ │
│  │  Backend (FastAPI) ──▶ Redpanda Cloud                      │ │
│  │  + Dapr Sidecar       (Kafka Events)                       │ │
│  │                           │                                 │ │
│  │         ┌─────────────────┴─────────────────┐              │ │
│  │         ▼                 ▼                 ▼              │ │
│  │  Notification      Recurring Task      Audit              │ │
│  │  Service           Service             Service            │ │
│  │  + Dapr            + Dapr              + Dapr             │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  External: Neon DB (PostgreSQL), Redpanda Cloud (Kafka)         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Orchestration** | Oracle OKE | Kubernetes cluster (Always Free) |
| **Event Streaming** | Redpanda Cloud | Kafka-compatible messaging |
| **Runtime** | Dapr | Pub/Sub, State, Jobs, Secrets |
| **Backend** | FastAPI + Google ADK | Main API + AI Agent |
| **Frontend** | Next.js 14 | UI with custom chatbox |
| **Database** | Neon PostgreSQL | Primary data store |
| **Microservices** | Python FastAPI | Event consumers |
| **CI/CD** | GitHub Actions | Automated deployment |

---

## 📊 Kafka Topics

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `task-events` | Backend API | Recurring, Audit | All task CRUD operations |
| `reminders` | Backend API | Notification | Scheduled reminders |
| `task-updates` | Backend API | WebSocket | Real-time sync |
| `audit-log` | All Services | Audit Service | Activity tracking |

---

## 🎯 Implementation Phases

### Phase 5A: Event-Driven Architecture ⏳
- [ ] Create event schemas
- [ ] Add event publishers to backend
- [ ] Build notification microservice
- [ ] Build recurring task microservice
- [ ] Build audit microservice

### Phase 5B: Dapr Integration ⏳
- [ ] Install Dapr on Minikube
- [ ] Create Dapr components (Pub/Sub, State, Jobs, Secrets)
- [ ] Add Dapr sidecars to deployments
- [ ] Test locally with Minikube

### Phase 5C: Cloud Deployment ⏳
- [ ] Setup Oracle Cloud account
- [ ] Create OKE cluster
- [ ] Setup Redpanda Cloud
- [ ] Deploy Dapr on OKE
- [ ] Deploy application to OKE
- [ ] Configure CI/CD pipeline

---

## 📁 New Directory Structure

```
.
├── backend/
│   ├── src/
│   │   ├── events/          # NEW - Event schemas and publishers
│   │   │   ├── __init__.py
│   │   │   ├── schemas.py   # Event data models
│   │   │   └── publishers.py # Dapr Pub/Sub wrappers
│   │   └── ...
├── services/                 # NEW - Microservices
│   ├── notification/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── main.py
│   ├── recurring/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── main.py
│   └── audit/
│       ├── Dockerfile
│       ├── requirements.txt
│       └── main.py
├── dapr-components/          # NEW - Dapr configurations
│   ├── pubsub-redpanda.yaml
│   ├── state-postgresql.yaml
│   ├── jobs-api.yaml
│   └── secrets-k8s.yaml
├── k8s/                      # NEW - Additional K8s manifests
│   ├── microservices/
│   └── dapr/
└── .github/workflows/        # NEW - CI/CD
    └── deploy-oke.yml
```

---

## 🚀 Quick Start

### Local Development (Minikube)

```bash
# Start Minikube
minikube start --cpus=4 --memory=8192

# Install Dapr
dapr init -k

# Deploy Redpanda locally
helm install redpanda redpanda/redpanda --set replicas=1

# Deploy application
kubectl apply -f k8s/

# Test
kubectl port-forward svc/taskmaster-frontend 3000:3000
```

### Cloud Deployment (Oracle OKE)

```bash
# Setup Oracle CLI
oci setup config

# Create OKE cluster
oci ce cluster create --name taskmaster-oke ...

# Deploy
helm upgrade --install taskmaster ./helm-charts/taskmaster
```

---

## 📝 Event Flow Examples

### 1. Task Created Event
```
User creates task
     ↓
Backend publishes to "task-events"
     ↓
Audit Service logs the event
```

### 2. Reminder Event
```
Task with due date created
     ↓
Backend schedules via Dapr Jobs API
     ↓
At scheduled time, publish to "reminders"
     ↓
Notification Service sends push notification
```

### 3. Recurring Task Event
```
User completes recurring task
     ↓
Backend publishes to "task-events"
     ↓
Recurring Task Service creates next occurrence
```

---

## 🎯 Success Criteria

- [ ] All events published to Redpanda
- [ ] 3 microservices running and consuming events
- [ ] Dapr Pub/Sub working
- [ ] Dapr Jobs API scheduling reminders
- [ ] Deployed to Oracle OKE
- [ ] CI/CD pipeline functional
- [ ] Real-time notifications working

---

## 📊 Progress Tracking

**Total Tasks:** 25  
**Completed:** 0  
**In Progress:** 0  
**Remaining:** 25

---

## 🔗 Resources

- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Redpanda Cloud](https://redpanda.com/cloud)
- [Dapr Docs](https://docs.dapr.io/)
- [OKE Documentation](https://docs.oracle.com/en-us/iaas/Content/ContEng/home.htm)

---

**Next Steps:** Create event schemas and publishers
