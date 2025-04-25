pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        S3_BUCKET = 'elasticbeanstalk-eu-north-1-442042508670l'  // S3 Bucket for Elastic Beanstalk
        APP_NAME = 'Dynamicwebsite'  // Elastic Beanstalk application name
        ENV_NAME = 'Dynamicwebsite-env'  // Elastic Beanstalk environment name
        VERSION_LABEL = "V-1"  // Version label for the deployment
        ZIP_FILE = "${VERSION_LABEL}.zip"  // File name for the zipped application
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Cloning repository..."
                git url: 'https://github.com/swathi6327/dynamic-website.git', branch: 'main'
            }
        }

        stage('Build App') {
            steps {
                script {
                    // Build the app, assuming the app has a 'build' script in package.json
                    echo "Building the app..."
                    sh 'npm run build'  // Replace with the appropriate build command if needed
                }
            }
        }

        stage('Package') {
            steps {
                echo "Packaging the application into a zip file..."
                sh "zip -r ${ZIP_FILE} * .[^.]*"  // Zip the app files, including hidden files like .env or .gitignore
            }
        }

        stage('Upload to S3') {
            steps {
                echo "Uploading the zip file to S3..."
                sh "aws s3 cp ${ZIP_FILE} s3://${S3_BUCKET}/${ZIP_FILE}"  // Upload the zip file to the S3 bucket
            }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                echo "Deploying to Elastic Beanstalk..."
                sh """
                    aws elasticbeanstalk create-application-version \
                        --application-name ${APP_NAME} \
                        --version-label ${VERSION_LABEL} \
                        --source-bundle S3Bucket=${S3_BUCKET},S3Key=${ZIP_FILE}

                    aws elasticbeanstalk update-environment \
                        --environment-name ${ENV_NAME} \
                        --version-label ${VERSION_LABEL}
                """  // Create a new application version and deploy to the specified Elastic Beanstalk environment
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"  // If the deployment succeeds
        }
        failure {
            echo "❌ Deployment failed."  // If the deployment fails
        }
    }
}
