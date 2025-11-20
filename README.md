## Minicube installation and usage
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y curl wget apt-transport-https conntrack
sudo apt install -y docker.io
sudo usermod -aG docker $USER
newgrp docker
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube     <--install minikube
minikube start --driver=docker
minikube status
kubectl get nodes                    <--kubectl will not work
sudo service docker start
sudo snap install kubectl --classic  <--install kubectl command
kubectl version --client
kubectl get nodes
minikube addons enable ingress       <--ingress will work with this command
minikube tunnel                      <--****By tunneling only app will show in browser
minikube ip                          <--to get the ip of minikube
kubectl apply -f k8s/                <--To apply whole directory

Kubernetis folder structure in this project:----------------------------------
foldor structure
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

 To Apply all manifests:
kubectl apply -f namespace.yaml
kubectl apply -f microservice1/
kubectl apply -f microservice2/
kubectl apply -f ingress.yaml
----------------------------------------------------------------------------------------------------------------------------|
When k8s app is not opening troubleshoot like below
----------------------------------------------------------------------------------------------------------------------------|
kubectl get all -n prod
kubectl get pods -n prod  <--in prod namespace If pods are not READY, app will not open.
kubectl get svc -n prod   <--Expected:myapp-service   NodePort   8080:30080/TCP <--where NodePort is 30080
kubectl get ingress -n prod
kubectl logs -n prod -l app=myapp --tail=50
kubectl describe pod <pod-name> -n <namespace>
----------------------------------------------------------------------------------------------------------------------------
some useful commands in this project
----------------------------------------------------------------------------------------------------------------------------
kubectl rollout restart deployment perchases -n prod   <--perchases is deploymnet name for namespace prod
kubectl get pvc -n <namespace>   <--List PVCs in a namespace
kubectl describe pvc <pvc-name> -n <namespace>
kubectl delete pvc <pvc-name> -n <namespace>
kubectl get pv                   <--Get PVs (PersistentVolumes)
kubectl describe pv <pv-name>
kubectl describe pod <pod-name> -n <namespace> | grep -i volume <--Check PVC usage inside a pod (volume mount info)
kubectl get hpa -n <namespace>   <--List HPA in a namespace
kubectl describe hpa <hpa-name> -n <namespace>
kubectl autoscale deployment <deployment-name> --min=1 --max=5 --cpu-percent=50 <--Autoscale deployment using CPU
kubectl delete hpa <hpa-name> -n <namespace>
kubectl top pod -n <namespace>   <--CPU & Memory Metrics for HPA
kubectl top node
----------------------------------------------------------------------------------------------------------------------------
comman errors
ImagePullBackOff          <-- image not able to pull from registory
----------------------------------------------------------------------------------------------------------------------------
Ingress routing can be done in two ways:------------------------------------------------------------------------------------
1.***Path-based routing (recommended)
Single domain → different paths
Example:
http://myapp.local/myapp → myapp-service
http://myapp.local/orders → orderservice

2.****Host-based routing (microservice subdomains)
Different hostnames:
myapp.local → myapp
orders.myapp.local → orderservice
