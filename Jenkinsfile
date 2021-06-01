pipeline {
    tools {
        nodejs "nodejs"
    }
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
        stage('Upload to S3 Bucket') {
            steps {
                dir('/var/lib/jenkins/workspace/Admin-UI/dist/admin-ui') {
                    withAWS(region:'us-east-2',credentials:'aws-ecr-creds') {
                        s3Delete(bucket:"stacklunch-ui-portals", path:'admin-ui/');
                        s3Upload(bucket:"stacklunch-ui-portals", path:'admin-ui/', includePathPattern:'**/*');
                    }   
                } 
            }
        }
    }
    post {
        always {
            sh 'rm -rf dist'
        }
    }
}