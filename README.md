# Romerike Markiseservice v2.0

http://romerike-markise.no/

#### Backend

Scalatra-based Scala backend with REST interface. 

#### Frontend

React-based frontend

* React for the view
* Redux for data-flow through the app
* Babel 6 for transpiling fancy ES2015 code into boring old javascript
* Webpack for building and bundling 

#### Build and Deploy

The project uses Docker and Kubernetes for building and deployment.

##### Build and Deploy New Version
```bash
./ci.sh
```

##### Deploy Specific Version
```bash
# Deploy specific app version
./ci.sh --tag-app=<app-image-tag>

# Deploy specific db version
./ci.sh --tag-db=<db-image-tag>

# Deploy both specific versions
./ci.sh --tag-app=<app-image-tag> --tag-db=<db-image-tag>
```

##### Browse Container
To inspect a running container:
```bash
# Browse the most recent version
./browse-container.sh

# Browse a specific version
./browse-container.sh --tag=<image-tag>
```

#### Requirements
- Docker with BuildKit enabled
- Google Cloud SDK (`gcloud`)
- Kubernetes CLI (`kubectl`)
- Access to the Google Container Registry (GCR)

Make sure you're authenticated with Google Cloud:
```bash
gcloud auth login
```
