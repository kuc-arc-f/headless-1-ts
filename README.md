# headless-1-ts (Beta)

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/10/18 

 update  : 2021/12/25

***
### Summary

headless CMS , Next.js + mongodb + Typescript

***
### required
* Next.js : 12
* mongodb : 3.6.3
* node : 14.17
* Typescript

***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL, mongodb URL, database name

```
BASE_URL: "http://localhost:3001"
MONGODB_URL: "mongodb://localhost:27017",
MONGODB_DB_NAME: "hcms",    
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3001"
```

***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### Get Started / Document

https://cms-kuc-headless1.netlify.app/pages/20210331115325

***
### blanch

* v0_9_2 : next.js 12  

* v0_9_1 : new 


***
### Blog : 

***

