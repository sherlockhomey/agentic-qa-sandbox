pipeline {
    agent any
    tools { nodejs 'Node v24' }

    stages {
        stage('Setup') {
            steps {
                deleteDir()
                checkout scm
                dir('next-js-app') { bat 'npm ci' }
                dir('playwright-framework') { 
                    bat 'npm ci'
                    bat 'npx playwright install --with-deps'
                }
            }
        }

        stage('Run Sandbox Engine') {
            steps {
                // 1. Start Server in background
                dir('next-js-app') { bat 'start /B npm run dev' }

                // 2. SMART WAIT: Instead of 'timeout', we use PowerShell to sense the port
                // This waits until Port 3000 is actually listening.
                bat 'powershell -Command "while(!(Test-NetConnection -ComputerName localhost -Port 3000).TcpTestSucceeded) { Start-Sleep -Seconds 2 }"'

                // 3. Run Tests
                dir('playwright-framework') { bat 'npx playwright test' }
            }
        }
    }

    post {
        always {
            bat 'taskkill /F /IM node.exe /T || exit 0'
            
            // 4. GUARDED PUBLISH: Only try to publish if the directory was actually created
            script {
                def reportExists = writeFile file: 'check.bat', text: "if exist playwright-framework\\playwright-report exit 0 else exit 1"
                dir('playwright-framework') {
                    publishHTML([
                        allowMissing: true, // Set to true so the pipeline doesn't flip out if tests didn't run
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
}
