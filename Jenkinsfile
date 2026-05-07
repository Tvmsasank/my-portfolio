pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                // Install Node.js 20 (requires NodeJS plugin or preinstalled Node)
                bat 'node -v'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Upload artifact') {
            steps {
                // Archive build output (like ./dist)
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying portfolio...'
                // Example: copy files to web server, S3 bucket, or run deploy script
            }
        }
    }
}
