 - **2019/9/8** 
    原本只是想做個helloWorld的第一個serverless專案，乾脆就整合了mongoose做出了讀取清單與新增的功能,並使用了React實作出前端.
    - React Project  https://github.com/hahalin/NoteItems
 - **2019/9/15** 
   加入express,實現單一入口，透過express來對應url route.
``` yml
    handler: handler.index
     events:
    - http: ANY /
    - http: 'ANY {proxy+}'     
 ```
  - todo:
    - JWT
