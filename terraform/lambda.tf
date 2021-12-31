resource "aws_lambda_function" "lambda_function" {
  function_name = "sample-app-backend"
  role          = aws_iam_role.lambda_iam_role.arn
  runtime       = "nodejs14.x"
  memory_size   = 500
  timeout       = 5
  handler       = "index.handler"
  publish       = false
  environment {
    variables = {
      JWT_SECRET = random_string.token.result
    }
  }
  filename = "../backend/archive.zip"
}


resource "random_string" "token" {
  length  = 16
  special = false
}



resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.mydeployment.execution_arn}/*/*"
}