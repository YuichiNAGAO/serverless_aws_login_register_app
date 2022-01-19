# Sample Severless App with Login/Register feature 

AWS上にReact+Node.js+Terraformでデプロイするログイン/登録機能を持ったサンプルアプリケーション

## アーキテクチャ

![アーキテクチャ図](https://github.com/YuichiNAGAO/serverless_aws_login_register_app/blob/images/app_architecture.png)


- フロントエンド：Reactを用いて作成。ログイン画面や登録画面、プレミアムコンテンツページなど機能上必要最低限のページを実装。S3上に静的ホスティングする。
- バックエンド：Node.jsを使ったRestAPI。Lambdaにデプロイ。
- インフラ構築：Terraformを用いる。


## デプロイまでの手順
---
#### ローカル環境からデプロイする場合
---
1. tfstateを格納するためのS3バケットをコンソールから作成する

2. 1で作成したバケット名を[ここ](https://github.com/YuichiNAGAO/serverless_aws_login_register_app/blob/main/terraform/main.tf#L14)に記入

3. ローカル環境にAWSのシークレットを用意
```
export AWS_ACCESS_KEY_ID="an access key"
export AWS_SECRET_ACCESS_KEY="a secret key"
```
4. Terraformコマンドの実行
```
cd terraform
terraform apply
```

5. バックエンドのコードをLambdaにアップロード

6. フロントエンドのビルド&S3バケットにアップロード
```
cd frontend
npm run build
```
`frontend/`配下に作成された`build/`フォルダをS3にアップロード



---
#### Github Actionsを使ってデプロイする場合
---
1. tfstateを格納するためのS3バケットをコンソールから作成する

2. 1で作成したバケット名を[ここ](https://github.com/YuichiNAGAO/serverless_aws_login_register_app/blob/main/terraform/main.tf#L14)に記入


3. Github環境にAWSのシークレットを用意
```
AWS_ACCESS_KEY_ID="an access key"
AWS_SECRET_ACCESS_KEY="a secret key"
```

4. ActionsのページからGithub Actionsを手動でトリガーする
```
cd terraform
terraform apply
```

5. フロントエンドのビルド&S3バケットにアップロード
```
cd frontend
npm run build
```
`frontend/`配下に作成された`build/`フォルダをS3にアップロード


## アプリケーションのフロント部分

![フロントエンド](https://github.com/YuichiNAGAO/serverless_aws_login_register_app/blob/images/sample_frontend.png)


## バックエンドのAPI設計

(1) ヘルスチェック
+ リクエスト
  + メソッド: GET
  + URI: /health
  + ボディ
      ```js
      {
        "avater_id": 2
      }
      ```
+ レスポンス


(2) ログイン
+ リクエスト
  + メソッド: POST
  + URI: /login
+ レスポンス


(3) 登録
+ リクエスト
  + メソッド: POST
  + URI: /register
  + ボディ
      ```js
      {
        "name": "sample",
        "email": "sample@email.com",
        "username": "sample",
        "password": "sample"
      }
      ```
+ レスポンス
(4) ユーザー確認
+ リクエスト
  + メソッド: POST
  + URI: /verify
+ レスポンス
