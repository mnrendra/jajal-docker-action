#!/usr/bin/env node
"use strict";var l=require("node:process"),d=require("node:child_process");const s=(t,n={})=>new Promise((g,o)=>{try{d.exec(t,n,(r,e,i)=>{r!=null&&o(r),g({stdout:e,stderr:i})})}catch(r){o(r)}}),u=async()=>{const[t,n,g]=l.argv.slice(2),o=`v${t}`;await s(`git tag -d ${o}`),await s(`git push origin -d tag ${o}`);const r=`release: ${o}`,e=await s("./bin/importgpg.sh");console.log(`importgpg:
`,e.stdout,`
`,e.stderr);const i=await s("git config --list");console.log(`gitconfig:
`,i.stdout,`
`,i.stderr);const c=await s("gpg --list-secret-keys --keyid-format=long");console.log(`gpgk:
`,c.stdout,`
`,c.stderr);const a=await s("gpgconf --list-dirs");return console.log(`gpgconf:
`,a.stdout,`
`,a.stderr),await s(`git tag -s ${o} -m "${r}

${n}"`),await s(`git push origin ${o}`),g};u().then(t=>{console.log("result:",t)}).catch(t=>{throw t instanceof Error?t:new Error("Unknown error")});
