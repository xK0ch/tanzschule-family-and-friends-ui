pipeline {
  agent any

  tools {
    nodejs '22.22.1'
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose -f docker-compose-tanzschule-family-and-friends-ui.yml down'
        sh 'docker image prune -af'
        sh 'docker compose -f docker-compose-tanzschule-family-and-friends-ui.yml up --build -d'
      }
    }
  }
}
