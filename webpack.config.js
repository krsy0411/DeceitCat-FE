const path = require("path"); // output에서 사용할 path
// 사용할 플러그인 불러오기
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// env 환경변수 처리 플러그인
const Dotenv = require("dotenv-webpack");

module.exports = {
  // mode: "development",
  // 최초 진입점
  entry: {
    main: "./src/index.js",
  },
  // 번들링 된 js 파일이 저장될 경로와 이름
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "/dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", "..."],
  },
  // 설치한 loader를 설정
  module: {
    rules: [
      // 자바스크립트 파일들 바벨 처리
      {
        test: /\.(js|jsx|ts|tsx)$/, // 해당 파일명으로 끝나면 babel-loader가 처리
        exclude: /node_modules/, // node_modules는 대상에서 제외
        loader: "babel-loader", // 바벨 로더 추가
      },
      // css 처리
      {
        // css파일 확장자
        test: /\.css$/,
        // 로더가 2개 이상일 때 해당 파일에 적용할 로더의 배열
        use: ["style-loader", "css-loader"],
      },
      // 이미지 파일 로더
      {
        test: /\.(png|jpe?g|gif|svg|webp|jfif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            // <파일 이름.확장자> 옵션 설정
            name: '[name].[ext]',
          },
        },
      }
    ],
  },
  // webpack-dev-server 옵션 설정
  devServer: {
    compress: true,
    port: 3000,
    // 해당 항목 작성
    historyApiFallback: true,
    // 프록시 설정
    proxy: {
      // api로 시작하는 경로일 경우 : ex) /api/sub/chat/ws
      '/api': {
        // 요청 url앞에 타겟 붙여주기 : ex) 43.202.161.139:8080/api/sub/chat/ws
        target: '13.124.97.155:8080/',
        ws: true,
      },
    },
  },
  // 플러그인 적용
  plugins: [
    new CleanWebpackPlugin(),
    // 번들링 파일을 주입할 대상 HTML 파일을 명시
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // dotenv-webpack 플러그인 사용
    new Dotenv(),
  ],
};
