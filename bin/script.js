#!/usr/bin/env node
"use strict";var c=require("node:process"),g=require("node:child_process");const i=(r,s={})=>new Promise((a,t)=>{try{g.exec(r,s,(e,n,o)=>{e!=null&&t(e),a({stdout:n,stderr:o})})}catch(e){t(e)}}),u=async()=>{const[r,s,a]=c.argv.slice(2),t=`v${r}`;await i(`git tag -d ${t}`),await i(`git push origin -d tag ${t}`);const e=`release: ${t}`;return await i("git config --list"),await i("gpg -k"),await i(`git tag -s ${t} -m "${e}

${s}"`),await i(`git push origin ${t}`),a};u().then(r=>{console.log("result:",r)}).catch(r=>{throw r instanceof Error?r:new Error("Unknown error")});
