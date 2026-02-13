# 📘 MyApp Helm Deployment on Minikube (WSL2)

This guide explains how to deploy an application using **Helm** on
**Minikube running inside WSL2**.

## 📁 Folder Structure

    myapp-helm/
     ├── Chart.yaml
     ├── values.yaml
     ├── templates/
     │    ├── deployment.yaml
     │    ├── service.yaml
     │    ├── ingress.yaml
     │    └── _helpers.tpl

## 🛠 Create Helm Chart

``` bash
helm create myapp-helm
```

## 🚀 Start Minikube (WSL2)

``` bash
minikube start --driver=docker
```

## 🌐 Enable Ingress Controller

``` bash
minikube addons enable ingress
```

Verify:

``` bash
kubectl get pods -n ingress-nginx
```

## 📦 Install Helm Chart

``` bash
cd myapp-helm
helm install <release> <chart>
helm install <release> <chart> -f values.yaml   <--Install with custom values
helm install <release> <chart> --set key=value  <--Override values inline
helm install myapp .
helm list
kubectl get all
```

## 🌍 Access Application

Get Minikube IP:

``` bash
minikube ip
```

Edit hosts file:

    192.168.49.2  myapp.local

Open:

    http://myapp.local

## 🧰 Common Helm Commands

### Install

``` bash
helm install myapp .
```

### Upgrade

``` bash
helm upgrade <release> <chart>                  <--Upgrade release
helm upgrade <release> <chart> -f values.yaml   <--Upgrade with values
helm upgrade --install                          <--Install if not exists
helm upgrade myapp .
helm upgrade myapp ./mychart
helm upgrade --install myapp ./mychart
```

### Uninstall

``` bash
helm uninstall myapp
```

### Dry Run

``` bash
helm install myapp . --dry-run --debug
```

### Render Templates

``` bash
helm template myapp .
```

### Get Release Values

``` bash
helm get values myapp
```

### Get Manifests

``` bash
helm get manifest myapp
```

### Get history

``` bash
helm history <release-name>   <--List all revisions of a Helm release
helm history myapp
helm get manifest <release-name> --revision <rev-number>   <--. See the manifest for a specific revision
helm get manifest myapp --revision 3
helm plugin install https://github.com/databus23/helm-diff   
helm diff revision <release-name> 2 5                      <--Compare two revisions

```

### Rollback

``` bash
helm rollback <release-name> <revision-number>
helm rollback myapp 1
```

> Note: Rollback restores Kubernetes-stored revision and does **not**
> change local chart files.
