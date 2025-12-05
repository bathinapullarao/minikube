# Minikube Installation and Usage

## Install Required Packages

``` bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y curl wget apt-transport-https conntrack
```

## Install Docker

``` bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER
newgrp docker
```

## Install Minikube

``` bash
minikube delete --all --purge      <--delete minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube   # install minikube
```

## Start Minikube

``` bash
minikube start --driver=docker
minikube status
```

## Install kubectl

``` bash
kubectl get nodes      # kubectl will not work initially
sudo service docker start
sudo snap install kubectl --classic   # install kubectl
kubectl version --client
kubectl get nodes
```

## Enable Ingress & Tunnel

``` bash
minikube addons enable ingress
minikube tunnel
minikube ip
```

## Apply All Kubernetes Manifests

``` bash
kubectl apply -f k8s/
```

# Kubernetes Folder Structure

    k8s/
     ├── namespace.yaml
     ├── ingress.yaml
     ├── microservice1/
     │    ├── deployment.yaml
     │    ├── service.yaml
     │    ├── configmap.yaml
     │    ├── secret.yaml
     │    ├── pvc.yaml
     │    └── hpa.yaml
     ├── microservice2/
     │    ├── deployment.yaml
     │    ├── service.yaml
     │    ├── configmap.yaml
     │    ├── secret.yaml
     │    ├── pvc.yaml
     │    └── hpa.yaml
     └── ...

## Apply/Delete Manifests Individually

``` bash
kubectl apply -f namespace.yaml
kubectl apply -f microservice1/
kubectl apply -f microservice2/
kubectl apply -f ingress.yaml
kubectl delete -f namespace.yaml
kubectl delete -f microservice1/
kubectl delete -f microservice2/
kubectl delete -f ingress.yaml
```

# Troubleshooting Commands

``` bash
kubectl get all -n prod
kubectl get pods -n prod
kubectl get svc -n prod
kubectl get ingress -n prod
kubectl logs -n prod -l app=myapp --tail=50
kubectl logs podname -n prod
kubectl describe pod <pod> -n <namespace>
```

# Useful Commands

``` bash
kubectl rollout restart deployment perchases -n prod
kubectl rollout status deployment perchases -n prod
kubectl get pvc -n <namespace>
kubectl describe pvc <pvc-name> -n <namespace>
kubectl delete pvc <pvc-name> -n <namespace>
kubectl get pv
kubectl describe pv <pv-name>
kubectl describe pod <pod-name> -n <namespace> | grep -i volume
kubectl get hpa -n <namespace>
kubectl describe hpa <hpa-name> -n <namespace>
kubectl autoscale deployment <deployment-name> --min=1 --max=5 --cpu-percent=50
kubectl delete hpa <hpa-name> -n <namespace>
kubectl top pod -n <namespace>
kubectl top node
```

# Common Kubernetes Errors

| **Error** | **Meaning / Causes / Fix** |
|-----------|------------------------------|
| <span style="color:red">ImagePullBackOff</span> | Image cannot be pulled from registry. |
| <span style="color:red">CrashLoopBackOff</span> | Container starts → crashes → restarts repeatedly. **Common Causes:** App error/bug, missing environment variables, wrong command or entrypoint, program exits immediately. |
| <span style="color:orange">ContainerCreating (stuck)</span> | **Reason:** Pod cannot start creating container. **Common Causes:** Node has no resources, PVC is not bound, CNI networking issue. |
| <span style="color:orange">Pending Pods</span> | **Reason:** Pod waiting for node scheduling. **Common Causes:** Not enough CPU/RAM on nodes, NodeSelector/Tolerations mismatch, PVC not bound. |
| <span style="color:red">OOMKilled</span> | **Reason:** Container used more memory than its limit. **Fix:** Increase memory limit in Deployment, fix memory leak in app. |
| <span style="color:orange">Readiness/Liveness Probe Failures</span> | Pod restarted or unhealthy due to failed health checks. |
| <span style="color:red">Forbidden / RBAC Error</span> | Example: `Error from server (Forbidden): pods is forbidden`. **Fix:** Create Role/ClusterRole + RoleBinding. |
| <span style="color:purple">Node NotReady / Unknown</span> | **Reason:** Node lost connection or kubelet stopped. **Fix:** Check kubelet logs, network, restart node. |
| <span style="color:blue">Service not reachable</span> | Selector mismatch, wrong ports, missing containerPort. |
| <span style="color:blue">Ingress errors</span> | 404 Not Found, wrong path, missing host, wrong annotations. |
| <span style="color:purple">PVC stuck in Pending</span> | No StorageClass, storage quota issues. |
| <span style="color:brown">ConfigMap / Secret not found</span> | Wrong name or namespace. |
| <span style="color:brown">NodePort / LoadBalancer not working</span> | Firewall blocking, wrong targetPort, ingress missing. |
| <span style="color:green">NetworkPolicy blocking traffic</span> | Pod unreachable due to network restrictions. |


  
# Ingress Routing Options

## 1. Path-Based Routing

    http://myapp.local/myapp → myapp-service
    http://myapp.local/orders → orderservice

## 2. Host-Based Routing

    myapp.local → myapp
    orders.myapp.local → orderservice
