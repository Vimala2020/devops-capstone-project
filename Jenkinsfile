Pipeline {
    agent any
 
    environment {
        DOCKER_IMAGE = 'vimala92/devops-capstone-app'
        PATH = "/usr/local/bin:${env.PATH}"
    }
 
    stages {
 
        stage('Checkout') {
            steps {
                echo 'Getting code from GitHub...'
                checkout scm
            }
        }
 
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
 
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
 
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                sh 'docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
            }
        }
 
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
 
                withCredentials([
                    usernamePassword(
                        credentialsId: 'vimala92',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
    }
 
    post {
        success {
            echo 'CI/CD build completed successfully!'
        }
 
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
 