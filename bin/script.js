#!/usr/bin/env node
"use strict";var c=require("node:process"),g=require("node:child_process");const s=(t,n={})=>new Promise((a,r)=>{try{g.exec(t,n,(o,e,i)=>{o!=null&&r(o),a({stdout:e,stderr:i})})}catch(o){r(o)}}),l=async()=>{const[t,n,a]=c.argv.slice(2),r=`v${t}`;await s(`git tag -d ${r}`),await s(`git push origin -d tag ${r}`);const o=`release: ${r}`,e=await s("git config --list");console.log(`gitconfig:
`,e.stdout,`
`,e.stderr);const i=await s("gpg --list-secret-keys --keyid-format=long");return console.log(`gpglist:
`,i.stdout,`
`,i.stderr),await s(`git tag -s ${r} -m "${o}

${n}"`),await s(`git push origin ${r}`),a};l().then(t=>{console.log("result:",t)}).catch(t=>{throw t instanceof Error?t:new Error("Unknown error")});
