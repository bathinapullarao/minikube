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

  -----------------------------------------------------------------------------------------------------------
  **Error**              **Meaning / Causes / Fix**
  ---------------------- ------------------------------------------------------------------------------------
  **ImagePullBackOff**   Image cannot be pulled from registry.

  **CrashLoopBackOff**   Container starts → crashes → restarts repeatedly. **Common Causes:** App error/bug,
                         missing environment variables, wrong command or entrypoint, program exits
                         immediately.

  **ContainerCreating    **Reason:** Pod cannot start creating container. **Common Causes:** Node has no
  (stuck)**              resources, PVC is not bound, CNI networking issue.

  **Pending Pods**       **Reason:** Pod waiting for node scheduling. **Common Causes:** Not enough CPU/RAM
                         on nodes, NodeSelector/Tolerations mismatch, PVC not bound.

  **OOMKilled**          **Reason:** Container used more memory than its limit. **Fix:** Increase memory
                         limit in Deployment, fix memory leak in app.

  **Crash due to         Pod restarted or marked unhealthy due to failed health checks.
  Readiness/Liveness     
  Probe failures**       

  **Forbidden Error /    Example:
  RBAC issues**          `Error from server (Forbidden): pods is forbidden: User xxx cannot list resource`.
                         **Fix:** Create appropriate Role/ClusterRole, bind with RoleBinding.

  **Node NotReady /      **Reason:** Node lost connection or kubelet stopped. **Fix:** Check kubelet logs,
  Unknown**              check network, restart node.

  **Service not          **Reasons:** Selector mismatch, pod label mismatch, wrong targetPort, container port
  reachable**            not exposed. **Fix:** Check labels and ports.

  **Ingress errors**     **Common Issues:** 404 Not Found, wrong path, missing host, wrong annotations,
                         backend service not reachable.

  **PVC stuck in         **Reasons:** No StorageClass, storage quota exhausted. **Fix:** Add StorageClass,
  Pending**              expand PV.

  **ConfigMap or Secret  Object missing or wrong namespace/name.
  not found**            

  **NodePort /           **Common Causes:** Firewall blocking, wrong targetPort, ingress not configured.
  LoadBalancer not       
  working**              

  **NetworkPolicy        **Symptoms:** Pod unreachable, service blocked due to restricted network rules.
  blocking traffic**     
  -----------------------------------------------------------------------------------------------------------

  
# Ingress Routing Options

## 1. Path-Based Routing

    http://myapp.local/myapp → myapp-service
    http://myapp.local/orders → orderservice

## 2. Host-Based Routing

    myapp.local → myapp
    orders.myapp.local → orderservice
