#!/usr/bin/env node
"use strict";var n=require("node:process");const o=async()=>{const[r,e]=n.argv.slice(2);return e};o().then(r=>{console.log("result:",r)}).catch(r=>{throw r instanceof Error?r:new Error("Unknown error")});
