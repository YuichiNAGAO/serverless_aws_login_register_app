resource "aws_s3_bucket" "static_hosting" {
  bucket = "sample-serverless-app-yuichi"
  acl    = "public-read"
  server_side_encryption_configuration {
    rule {
      bucket_key_enabled = false

      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}


resource "aws_s3_bucket_policy" "static_hosting_policy" {
  bucket = aws_s3_bucket.static_hosting.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "${aws_s3_bucket.static_hosting.arn}/*"
      }
  ]
}
EOF
}