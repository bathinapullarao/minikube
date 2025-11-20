### How to Create, Tag, Push, and Run a Docker Image

#### **1. Build Docker Image**
Run this command **from the folder containing the Dockerfile**:

```bash
docker build -t myapp:latest .
```

- `-t myapp:latest` → Tags the image with a name and version  
- `.` → Uses the current directory as the build context

---

#### **2. Tag the Docker Image**
```bash
docker tag myapp:latest myrepo/myapp:v1
```
This assigns a new tag so the image can be pushed to Docker Hub.

---

#### **3. Push Image to Docker Hub**
```bash
docker push myrepo/myapp:v1
```

---

#### **4. Run the Docker Container**
```bash
docker run -d -p 3000:3000 myapp
```
- `-d` → Run in detached mode  
- `-p 3000:3000` → Map host port to container port

---
