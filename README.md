# Sample Severless App with Login/Register feature 

AWS上にReact+Node.js+Terraformでデプロイするログイン/登録機能を持ったサンプルアプリケーション

### アーキテクチャ

![アーキテクチャ図](https://github.com/YuichiNAGAO/serverless_aws_login_register_app/blob/images/architecture.png)

### 使い方
```
git clone 
```

### Terraform環境の用意


1. tfstateを格納するためのS3バケットをコンソールから作成する

2. ローカル環境にシークレットを用意
```
export AWS_ACCESS_KEY_ID="anaccesskey"
export AWS_SECRET_ACCESS_KEY="asecretkey"
```

3. 1で作成したバケット名をjsonファイルに記入

4. コマンドの実行

