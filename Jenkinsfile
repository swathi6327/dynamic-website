pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1' // change as needed
        S3_BUCKET = 'elasticbeanstalk-eu-north-1-442042508670l' // must exist
        APP_NAME = 'Dynamicwebsite'
        ENV_NAME = 'Dynamicwebsite-env"
        VERSION_LABEL = "V-1"
        
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/yeshcrik/dynamic-website.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build' // or skip if your app doesn't need build
            }
        }

        stage('Package') {
            steps {
                sh 'zip -r app.zip * .[^.]*' // zips all files, including hidden ones
            }
        }

        stage('Deploy to S3') {
            steps {
                
                sh """  
                    aws s3 sync . s3://S3_BUCKET --delete
                }
            }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                    sh """
                        aws elasticbeanstalk create-application-version \
                            --application-name ${APP_NAME} \
                            --version-label ${VERSION_LABEL} \
                            --source-bundle S3Bucket=${S3_BUCKET},S3Key=${VERSION_LABEL}.zip

                        aws elasticbeanstalk update-environment \
                            --environment-name ${ENV_NAME} \
                            --version-label ${VERSION_LABEL}
                    """
                }
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
