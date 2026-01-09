# Vercelデプロイガイド

## 前提条件

- Vercelアカウント（[vercel.com](https://vercel.com)で無料登録可能）
- Gitリポジトリ（GitHub、GitLab、Bitbucket）

## デプロイ方法

### 方法1: Vercel CLIを使用（推奨）

1. **Vercel CLIをインストール**
   ```bash
   npm install -g vercel
   ```

2. **ログイン**
   ```bash
   vercel login
   ```

3. **プロジェクトディレクトリでデプロイ**
   ```bash
   cd "/Users/harukichi/App Devlopment/Othello_with_qwen"
   vercel
   ```

4. **本番環境にデプロイ**
   ```bash
   vercel --prod
   ```

### 方法2: GitHub経由でデプロイ（推奨）

1. **GitHubにリポジトリをプッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Othello game"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercelダッシュボードでインポート**
   - [vercel.com/new](https://vercel.com/new) にアクセス
   - GitHubリポジトリを選択
   - プロジェクトをインポート
   - Vercelが自動的に設定を検出します

3. **自動デプロイ**
   - `main`ブランチへのプッシュで自動デプロイ
   - プルリクエストでプレビューデプロイ

### 方法3: Vercelダッシュボードから直接デプロイ

1. [vercel.com/new](https://vercel.com/new) にアクセス
2. 「Import Git Repository」を選択
3. リポジトリを選択
4. 設定を確認（自動検出されるはず）:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. 「Deploy」をクリック

## 設定確認

Vercelは以下の設定を自動検出します：

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

`vercel.json`ファイルで追加設定が含まれています：
- SPAルーティングの設定
- セキュリティヘッダー
- キャッシュ設定

## 環境変数

現在、環境変数は不要です。将来的に追加する場合は、Vercelダッシュボードの「Settings」→「Environment Variables」から設定できます。

## カスタムドメインの設定

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Domains」を選択
3. カスタムドメインを追加
4. DNS設定を更新（Vercelが指示を提供）

## デプロイ後の確認事項

- ✅ アプリケーションが正常に動作するか
- ✅ セキュリティヘッダーが設定されているか（ブラウザの開発者ツールで確認）
- ✅ HTTPSが有効になっているか
- ✅ モバイル表示が正常か

## トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドをテスト
npm run build
```

### 404エラー（ルーティング）

`vercel.json`の`rewrites`設定を確認してください。SPAアプリケーションでは、すべてのルートを`index.html`にリダイレクトする必要があります。

### アセットが読み込まれない

`vite.config.ts`の`base`設定を確認してください。通常は`/`で問題ありません。

## パフォーマンス最適化

Vercelは自動的に以下を最適化します：
- ✅ 自動HTTPS
- ✅ CDN配信
- ✅ 画像最適化（必要に応じて）
- ✅ エッジネットワーク

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
