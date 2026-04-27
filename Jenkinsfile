pipeline {
    agent any

    tools {
        // Ensure this matches the name in your Jenkins 'Global Tool Configuration'
        nodejs 'Node v24' 
    }

    stages {
        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('next-js-app') {
                    bat 'npm ci' 
                }
                dir('playwright-framework') {
                    bat 'npm ci'
                    // NEW: Added to ensure the Legion has the actual browser engine
                    bat 'npx playwright install chromium'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('playwright-framework') {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            dir('playwright-framework') {
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, // FIXED: Corrected parameter name
                    keepAll: true, 
                    reportDir: 'playwright-report', 
                    reportFiles: 'index.html', 
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }
}