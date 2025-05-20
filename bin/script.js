#!/usr/bin/env node
"use strict";var c=require("node:process"),g=require("node:child_process");const s=(r,n={})=>new Promise((o,t)=>{try{g.exec(r,n,(e,i,a)=>{e!=null&&t(e),o({stdout:i,stderr:a})})}catch(e){t(e)}}),u=async()=>{const[r,n,o]=c.argv.slice(2),t=`v${r}`;await s(`git tag -d ${t}`),await s(`git push origin -d tag ${t}`);const e=`release: ${t}`;return await s(`git tag -s ${t} -m "${e}

${n}"`),await s(`git push origin ${t}`),o};u().then(r=>{console.log("result:",r)}).catch(r=>{throw r instanceof Error?r:new Error("Unknown error")});
