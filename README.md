# zhangying

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 设计

### 实体与属性
- 问题:{**问题ID**,问题描述,问题从属章节ID,问题答案文字部分,问题答案图片部分,问题从属用户ID}
- 用户:{**用户ID**,用户名,用户头像,用户密码}
- 题单:{**题单ID**,题单从属用户ID,题库范围CODE,题单SIZE}
- 章节:{**章节ID**,章节的父ID,章节NAME,章节从属用户ID}//章节总表
### 处理
#### 上传问题
#### 生成题单
#### 