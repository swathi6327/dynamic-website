pipeline {
    agent any

    environment {
        IMAGE_NAME = 'web-app'
        CONTAINER_NAME = 'web-app-container'
        PORT = '3000'
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/yeshcrik/web-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove any previous container
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    
                    // Run the container on port 3000
                    sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
                }
            }
        }
    }
}

