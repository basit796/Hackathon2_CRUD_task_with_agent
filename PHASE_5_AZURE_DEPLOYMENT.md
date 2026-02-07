# Phase 5: Azure Cloud Deployment Guide

**Status:** Ready to Start  
**Azure Account:** 24F-CSE-005@students.duet.edu.pk  
**Subscription:** Azure for Students ($100 credits)

---

## ✅ Prerequisites Completed

- [x] Phase 4 - Kubernetes deployment tested locally
- [x] Docker images created and tested
- [x] Helm charts ready
- [x] Azure account logged in
- [x] Application working on localhost

---

## 📋 Phase 5A: Azure Kubernetes Service (AKS) Deployment

### Step 1: Create Azure Resources (5 minutes)

Open **NEW PowerShell** terminal and run:

```powershell
# Set variables
$resourceGroup = "taskmaster-rg"
$location = "eastus"
$acrName = "taskmasteracr$(Get-Random -Maximum 9999)"
$aksName = "taskmaster-aks"
$dbName = "taskmaster-db"

# Create Resource Group
az group create --name $resourceGroup --location $location

# Create Azure Container Registry (ACR)
az acr create --name $acrName --resource-group $resourceGroup --sku Basic

# Create AKS Cluster (2 nodes, B2s tier - within free credits)
az aks create `
  --name $aksName `
  --resource-group $resourceGroup `
  --node-count 2 `
  --node-vm-size Standard_B2s `
  --enable-managed-identity `
  --attach-acr $acrName `
  --generate-ssh-keys

# Get AKS credentials
az aks get-credentials --name $aksName --resource-group $resourceGroup

# Verify connection
kubectl get nodes
```

**Expected Output:**
```
NAME                                STATUS   READY
aks-nodepool1-xxxxx-vmss000000      Ready    2m
aks-nodepool1-xxxxx-vmss000001      Ready    2m
```

---

### Step 2: Create Azure Database (5 minutes)

```powershell
# Create PostgreSQL Flexible Server
az postgres flexible-server create `
  --name $dbName `
  --resource-group $resourceGroup `
  --location $location `
  --admin-user taskmaster `
  --admin-password "TaskMaster2026!" `
  --sku-name Standard_B1ms `
  --tier Burstable `
  --storage-size 32 `
  --version 14

# Allow Azure services access
az postgres flexible-server firewall-rule create `
  --name $dbName `
  --resource-group $resourceGroup `
  --rule-name AllowAzureServices `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0

# Get connection string
$dbHost = az postgres flexible-server show `
  --name $dbName `
  --resource-group $resourceGroup `
  --query "fullyQualifiedDomainName" -o tsv

Write-Host "Database URL: postgresql://taskmaster:TaskMaster2026!@$dbHost/postgres"
```

---

### Step 3: Push Images to ACR (10 minutes)

```powershell
# Login to ACR
az acr login --name $acrName

# Tag and push backend
docker tag taskmaster-backend:1.0.0 "$acrName.azurecr.io/taskmaster-backend:1.0.0"
docker push "$acrName.azurecr.io/taskmaster-backend:1.0.0"

# Tag and push frontend
docker tag taskmaster-frontend:1.0.0 "$acrName.azurecr.io/taskmaster-frontend:1.0.0"
docker push "$acrName.azurecr.io/taskmaster-frontend:1.0.0"
```

---

### Step 4: Update Helm Values for Azure (2 minutes)

Update `helm-charts/taskmaster/values.yaml`:

```yaml
backend:
  image:
    repository: <ACR_NAME>.azurecr.io/taskmaster-backend
    tag: "1.0.0"

frontend:
  image:
    repository: <ACR_NAME>.azurecr.io/taskmaster-frontend
    tag: "1.0.0"
```

---

### Step 5: Create Kubernetes Secrets (2 minutes)

```powershell
# Get database URL
$DATABASE_URL = "postgresql://taskmaster:TaskMaster2026!@$dbHost/postgres"

# Create secret
kubectl create secret generic taskmaster-secret `
  --from-literal=DATABASE_URL="$DATABASE_URL" `
  --from-literal=JWT_AUTH="XiZoxQg1uKgfOcM2ZWJkQJm50GR8_eKLrsndu_DI_Bo" `
  --from-literal=GOOGLE_API_KEY="AIzaSyBS2gyco-F6eUfsJdBe6iZlDCB2PcD4qPc" `
  --from-literal=GOOGLE_CLOUD_PROJECT="taskmaster-ai" `
  -n taskmaster

# Label for Helm
kubectl label secret taskmaster-secret -n taskmaster app.kubernetes.io/managed-by=Helm
kubectl annotate secret taskmaster-secret -n taskmaster meta.helm.sh/release-name=taskmaster meta.helm.sh/release-namespace=taskmaster
```

---

### Step 6: Deploy with Helm (5 minutes)

```powershell
# Install Helm chart
helm install taskmaster .\helm-charts\taskmaster -n taskmaster

# Wait for pods
kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=taskmaster -n taskmaster --timeout=180s

# Get service IP
kubectl get svc -n taskmaster
```

---

### Step 7: Access Application

```powershell
# Get LoadBalancer IP
$EXTERNAL_IP = kubectl get svc taskmaster-frontend -n taskmaster -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

Write-Host "Application URL: http://$EXTERNAL_IP:3000"
Write-Host "Backend API: http://$EXTERNAL_IP:8000"
```

---

## 📊 Cost Estimate

| Resource | Size | Monthly Cost | Notes |
|----------|------|--------------|-------|
| AKS Cluster | 2x B2s nodes | ~$30 | Free tier eligible |
| ACR | Basic | ~$5 | First 10GB free |
| PostgreSQL | B1ms | ~$12 | Burstable tier |
| Load Balancer | Standard | ~$5 | Data transfer |
| **Total** | | **~$52/month** | **Covered by $100 credits!** |

---

## 🔧 Troubleshooting

### Pods not starting?
```powershell
kubectl logs -f deployment/taskmaster-backend -n taskmaster
kubectl describe pod -n taskmaster
```

### Can't pull images?
```powershell
az aks update -n $aksName -g $resourceGroup --attach-acr $acrName
```

### Database connection failed?
```powershell
# Check firewall rules
az postgres flexible-server firewall-rule list --name $dbName --resource-group $resourceGroup
```

---

## 🎯 Next Steps After Deployment

Once working on Azure, we'll add:

1. **Custom Domain + HTTPS** (Week 2)
   - Azure DNS
   - Let's Encrypt SSL
   
2. **Event-Driven Architecture** (Week 3-4)
   - Azure Event Hubs
   - Notification microservice
   - Analytics microservice

3. **CI/CD Pipeline** (Week 5)
   - GitHub Actions
   - Auto-deploy on push

---

## 📝 Commands Summary

```powershell
# Quick deployment (run all at once)
$resourceGroup = "taskmaster-rg"
$location = "eastus"
$acrName = "taskmasteracr$(Get-Random -Maximum 9999)"
$aksName = "taskmaster-aks"

# Create everything
az group create --name $resourceGroup --location $location
az acr create --name $acrName --resource-group $resourceGroup --sku Basic
az aks create --name $aksName --resource-group $resourceGroup --node-count 2 --node-vm-size Standard_B2s --enable-managed-identity --attach-acr $acrName --generate-ssh-keys
az aks get-credentials --name $aksName --resource-group $resourceGroup

# Deploy
helm install taskmaster .\helm-charts\taskmaster -n taskmaster
kubectl get svc -n taskmaster
```

---

**Ready to deploy? Open a NEW PowerShell terminal and follow Step 1!**
