# オセロゲーム（Othello Game）

テスト駆動開発（TDD）で作成されたブラウザで動作するオセロアプリケーションです。

## 🎮 機能

- 2人対戦のオセロゲーム
- モダンなUIデザイン
- レスポンシブ対応（モバイル、タブレット、デスクトップ）
- アニメーション効果
- アクセシビリティ対応

## 🛠️ 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **テストフレームワーク**: Vitest + React Testing Library
- **スタイリング**: CSS3（アニメーション、レスポンシブ対応）

## 📦 インストール

```bash
npm install
```

## 🚀 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

## 🧪 テスト実行

```bash
# すべてのテストを実行
npm test

# UI付きでテスト実行
npm run test:ui

# カバレッジレポート生成
npm run test:coverage
```

## 🏗️ ビルド

```bash
npm run build
```

ビルド成果物は `dist` ディレクトリに生成されます。

## 📤 Vercelへのデプロイ

### クイックスタート

1. **Vercel CLIを使用**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **GitHub経由**
   - GitHubにリポジトリをプッシュ
   - [vercel.com/new](https://vercel.com/new) でリポジトリをインポート
   - 自動デプロイが開始されます

詳細は [DEPLOY.md](./DEPLOY.md) を参照してください。

## 📁 プロジェクト構造

```
Othello_with_qwen/
├── src/
│   ├── components/      # Reactコンポーネント
│   │   ├── Board.tsx
│   │   ├── Cell.tsx
│   │   ├── Game.tsx
│   │   └── GameStatus.tsx
│   ├── game/           # ゲームロジック
│   │   ├── types.ts
│   │   ├── board.ts
│   │   └── game.ts
│   ├── styles/         # スタイルシート
│   │   └── App.css
│   └── main.tsx        # エントリーポイント
├── tests/              # テストファイル
│   ├── components/
│   └── game/
├── vercel.json         # Vercel設定
└── package.json
```

## 🎯 ゲームルール

- 8x8のボードで対戦
- 初期配置: 中央4マスに黒・白を交互に配置
- 石を挟むと反転
- 有効な手がない場合はパス
- 両者とも手がない場合にゲーム終了
- 石の多い方が勝ち

## 🔒 セキュリティ

詳細なセキュリティ検証レポートは [SECURITY_REPORT.md](./SECURITY_REPORT.md) を参照してください。

主なセキュリティ対策：
- ✅ XSS対策（Reactのデフォルトエスケープ）
- ✅ セキュリティヘッダー設定
- ✅ 入力検証
- ✅ 型安全性（TypeScript）

## 📝 ライセンス

MIT License

## 👨‍💻 開発

このプロジェクトはテスト駆動開発（TDD）で作成されました。

### TDDの流れ

1. **Red**: テストを書く（失敗する）
2. **Green**: 最小限の実装でテストを通す
3. **Refactor**: コードをリファクタリング

### テストカバレッジ

- ゲームロジック: 100%
- UIコンポーネント: 主要機能をカバー

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まずIssueを開いて変更内容を議論してください。
