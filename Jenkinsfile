pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        S3_BUCKET = 'elasticbeanstalk-eu-north-1-442042508670l'
        APP_NAME = 'Dynamicwebsite'
        ENV_NAME = 'Dynamicwebsite-env'
        VERSION_LABEL = "V-1"
        ZIP_FILE = "${VERSION_LABEL}.zip"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/swathi6327/dynamic-website.git', branch: 'main'
            }
        }
        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Package') {
            steps {
                sh "zip -r ${ZIP_FILE} * .[^.]*"
            }
        }

        stage('Upload to S3') {
            steps {
                sh "aws s3 cp ${ZIP_FILE} s3://${S3_BUCKET}/${ZIP_FILE}"
            }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                sh """
                    aws elasticbeanstalk create-application-version \
                        --application-name ${APP_NAME} \
                        --version-label ${VERSION_LABEL} \
                        --source-bundle S3Bucket=${S3_BUCKET},S3Key=${ZIP_FILE}

                    aws elasticbeanstalk update-environment \
                        --environment-name ${ENV_NAME} \
                        --version-label ${VERSION_LABEL}
                """
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
