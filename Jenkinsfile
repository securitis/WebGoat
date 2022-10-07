pipeline {
  agent any 
     
        
  tools {
    maven 'maven'
  }
        
  environment {
    Snyk = 'Snyk'
    Trivy = 'Trivy'
    Audit = 'Audit'
  }
  
  stages {
    stage ('Initialize') {
      steps {
        sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                  
            ''' 
      }
    } 
     
 



    stage ('SAST - ASOC') {
     steps {
            appscan application: 'f5883107-a93c-4ebe-830c-bc5d0d74a598', credentials: 'PersonalASOC', name: 'WebgoatScan', scanner: static_analyzer(hasOptions: false, target: 'https://github.com/securitis/WebGoat.git'), type: 'Static Analyzer'
       }
    }
     
    
    
 
    
  }
} 



