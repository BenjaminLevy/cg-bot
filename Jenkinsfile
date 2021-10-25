pipeline { 
    agent { dockerfile true } 
    stages {
        stage('Test') { 
            steps { 
                sh 'node --version' 
            }
        }
        stage('Deploy'){
            steps {
                sh 'make check'
                junit 'reports/**/*.xml' 
            }
        }
    }
}