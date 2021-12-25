resource "aws_api_gateway_rest_api" "api_gateway_rest_api" {
  name = "sample-app-backend-gateway"
}





resource "aws_api_gateway_resource" "health_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "health"
}

resource "aws_api_gateway_method" "health_method" {
  rest_api_id      = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id      = aws_api_gateway_resource.health_resource.id
  http_method      = "GET"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "integration_health" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id             = aws_api_gateway_resource.health_resource.id
  http_method             = aws_api_gateway_method.health_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
  content_handling        = "CONVERT_TO_TEXT"
}




resource "aws_api_gateway_resource" "login_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "login"
}

resource "aws_api_gateway_method" "login_method" {
  rest_api_id      = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id      = aws_api_gateway_resource.login_resource.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "integration_login" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id             = aws_api_gateway_resource.login_resource.id
  http_method             = aws_api_gateway_method.login_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
  content_handling        = "CONVERT_TO_TEXT"
}





resource "aws_api_gateway_resource" "register_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "register"
}

resource "aws_api_gateway_method" "register_method" {
  rest_api_id      = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id      = aws_api_gateway_resource.register_resource.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "integration_register" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id             = aws_api_gateway_resource.register_resource.id
  http_method             = aws_api_gateway_method.register_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
  content_handling        = "CONVERT_TO_TEXT"
}





resource "aws_api_gateway_resource" "verify_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "verify"
}

resource "aws_api_gateway_method" "verify_method" {
  rest_api_id      = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id      = aws_api_gateway_resource.verify_resource.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "integration_verify" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id             = aws_api_gateway_resource.verify_resource.id
  http_method             = aws_api_gateway_method.verify_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
  content_handling        = "CONVERT_TO_TEXT"
}




resource "aws_api_gateway_deployment" "mydeployment" {
  rest_api_id       = aws_api_gateway_rest_api.api_gateway_rest_api.id
  stage_name        = "prod"

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_api_gateway_api_key" "backend_apikey" {
  name    = "backend-apikey"
  enabled = true
}


resource "aws_api_gateway_usage_plan" "myplan" {
  name       = "my-plan"
  depends_on = [aws_api_gateway_deployment.mydeployment]

  api_stages {
    api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
    stage  = aws_api_gateway_deployment.mydeployment.stage_name
  }

  quota_settings {
    limit  = 10000
    offset = 0
    period = "MONTH"
  }

  throttle_settings {
    burst_limit = 500
    rate_limit  = 1000
  }
}

resource "aws_api_gateway_usage_plan_key" "myplan_key" {
  key_id        = aws_api_gateway_api_key.backend_apikey.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.myplan.id
}
