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
helm upgrade myapp .
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

### Rollback

``` bash
helm rollback myapp 1
```

> Note: Rollback restores Kubernetes-stored revision and does **not**
> change local chart files.
