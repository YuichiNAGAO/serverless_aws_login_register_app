resource "aws_lambda_function" "lambda_function" {
    function_name = "sample-app-backend"
    role          = aws_iam_role.lambda_iam_role.arn
    runtime = "nodejs14.x"
    memory_size = 500
    timeout = 5
}