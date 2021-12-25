provider "aws" {
  region = "ap-northeast-1"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.54.0"
    }
  }

  backend "s3" {
    bucket  = "tf-backend-yuichi"
    region  = "ap-northeast-1"
    key     = "serverless_aws_login_register_app.tfstate"
    encrypt = true
  }
}