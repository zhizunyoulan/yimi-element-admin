# yimi-element-admin

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


#### requester
//  有data数据
// 	  无contentType
// 		  猜测
// 			  有Blob，则multipart/form-data，
// 			  判断 this.data ，是FormData，则application/x-www-form-urlencoded
// 			  否则application/json

// 	  contentType
// 		  application/x-www-form-urlencoded
// 			  QS.stringfy
// 		  multipart/form-data
// 			  new FormData
// 			  字段，如果是Blob，如果是Object json blob，否则 直接append

// 		  application/json

// 无data 但是this.data存在
// 	  this.data typeof FormData  new FormData
// 		  if contentType null  multipart/form-data

// 	  this.data type Object {}
// 		  if contentType null   application/json