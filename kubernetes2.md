# Kubernetes Deployment Flow

## 1️⃣ Build → Containerize

The application is packaged into a Docker image and pushed to a
registry\
(ECR, ACR, GCR, Docker Hub).

## 2️⃣ Write the K8s Manifests (YAML)

You define everything Kubernetes should manage:

-   **Deployment** → Pods, replicas, rolling updates\
-   **Service** → Exposes the app\
-   **ConfigMap & Secret** → Configs + credentials\
-   **Ingress** → Routes external traffic\
-   **HPA** → Autoscaling

**K8s is declarative** -- you state the desired outcome, and Kubernetes
ensures reality matches it.

## 3️⃣ Deploy to the Cluster

Using GitOps (Argo CD / Flux) or `kubectl`:

``` bash
kubectl apply -f deployment.yaml
```

The scheduler picks the right node, **kubelet pulls the image**, and
Pods start running.

## 4️⃣ Traffic Routing

Services and Ingress make the app reachable internally or externally\
(via Load Balancers).

## 5️⃣ Self-Healing + Scaling

Kubernetes constantly checks:

-   🟦 Health probes\
-   🟦 Readiness\
-   🟦 Liveness\
-   🟦 Resource usage

If a Pod fails → Kubernetes restarts it.\
If traffic spikes → Kubernetes scales it.

## 6️⃣ Zero-Downtime Updates

New version? Kubernetes rolls out changes safely:

-   ✔️ Rolling updates\
-   ✔️ Canary releases\
-   ✔️ Auto-rollback if something breaks

