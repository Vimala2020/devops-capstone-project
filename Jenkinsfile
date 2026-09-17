pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'vimala92/devops-capstone-app'
        'PATH+EXTRA'= '/usr/local/bin:/bin:/usr/bin:/usr/sbin:/sbin'
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
                sh 'PATH="/usr/local/bin:$PATH" npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'PATH="/usr/local/bin:$PATH" npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'PATH="/usr/local/bin:$PATH" docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                sh 'PATH="/usr/local/bin:$PATH" docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
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
                    sh 'PATH="/usr/local/bin:$PATH"; echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'PATH="/usr/local/bin:$PATH" docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                    sh 'PATH="/usr/local/bin:$PATH" docker push $DOCKER_IMAGE:latest'
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