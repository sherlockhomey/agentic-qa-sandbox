pipeline {
    agent any

    tools {
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

        stage('Install & Setup') {
            steps {
                dir('next-js-app') {
                    bat 'npm ci' 
                }
                dir('playwright-framework') {
                    bat 'npm ci'
                    bat 'npx playwright install chromium'
                }
            }
        }

        stage('Start Server & Test') {
            steps {
                // 1. Start Next.js in the background
                dir('next-js-app') {
                    // "/B" runs it in the background so Jenkins doesn't hang
                    bat 'start /B npm run dev' 
                }

                // 2. Wait for the server to be ready (Next.js needs time to compile)
                // We'll give it 20 seconds for the first time
                bat 'timeout /t 20 /nobreak'

                // 3. Run the tests
                dir('playwright-framework') {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            // 4. Cleanup: Kill the background Node process so port 3000 isn't locked for the next build
            bat 'taskkill /F /IM node.exe /T || exit 0'

            dir('playwright-framework') {
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: true, 
                    reportDir: 'playwright-report', 
                    reportFiles: 'index.html', 
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }
}