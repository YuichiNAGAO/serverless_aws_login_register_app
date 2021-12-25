resource "aws_dynamodb_table" "dynamodb_table" {
  name     = "sample-app-users"
  hash_key = "username"
  attribute {
    name = "username"
    type = "S"
  }
  read_capacity  = 1
  write_capacity = 1
}