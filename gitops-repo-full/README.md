gitops-k8s-sample (Executable GitOps repo for Kubernetes)

This document contains a full, runnable GitOps-style repository layout that you can push to a Git server (GitHub, GitLab, etc.) and use with kubectl/kustomize or ArgoCD/Flux. All files are provided inline — copy them into the same tree locally and push to a repo.

Goal: kubectl apply -k clusters/dev (or Argo CD pointing at clusters/*) should create namespaces, apps, and infra.
```bash
Repo layout
gitops-repo/
├── README.md
├── apps/
│   ├── app1/
│   │   ├── base/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── kustomization.yaml
│   │   └── overlays/
│   │       ├── dev/kustomization.yaml
│   │       ├── staging/kustomization.yaml
│   │       └── prod/kustomization.yaml
│   └── app2/  (same pattern as app1)
├── infra/
│   ├── ingress-nginx/
│   │   └── kustomization.yaml
│   └── monitoring/
│       └── kustomization.yaml
└── clusters/
    ├── dev/
    │   ├── kustomization.yaml
    │   └── namespace.yaml
    ├── staging/
    │   ├── kustomization.yaml
    │   └── namespace.yaml
    └── prod/
        ├── kustomization.yaml
        └── namespace.yaml

```
Top-level README.md
# GitOps Sample Repo


This repo demonstrates a GitOps multi-environment layout using kustomize overlays and an app-of-apps model for ArgoCD.


Quick start (kustomize locally):


```bash
# apply dev environment with kustomize
kubectl apply -k clusters/dev

For ArgoCD: point an ArgoCD Application to clusters as an app-of-apps, or use the argocd manifests you add.

Replace image tags in overlays before deploying (or use a CI image update workflow).
