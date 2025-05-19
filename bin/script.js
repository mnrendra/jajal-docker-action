#!/usr/bin/env node
"use strict";var a=require("node:process"),l=require("node:child_process");const r=(t,n={})=>new Promise((c,o)=>{try{l.exec(t,n,(s,e,i)=>{s!=null&&o(s),c({stdout:e,stderr:i})})}catch(s){o(s)}}),d=async()=>{const[t,n,c]=a.argv.slice(2),o=`v${t}`;await r(`git tag -d ${o}`),await r(`git push origin -d tag ${o}`);const s=`release: ${o}`,e=await r("git config --list");console.log(`gitconfig:
`,e.stdout,`
`,e.stderr);const i=await r("gpg --list-secret-keys --keyid-format=long");console.log(`gpgk:
`,i.stdout,`
`,i.stderr);const g=await r("gpgconf --list-dirs");return console.log(`gpgconf:
`,g.stdout,`
`,g.stderr),await r(`git tag -s ${o} -m "${s}

${n}"`),await r(`git push origin ${o}`),c};d().then(t=>{console.log("result:",t)}).catch(t=>{throw t instanceof Error?t:new Error("Unknown error")});
