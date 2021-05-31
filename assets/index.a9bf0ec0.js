var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,l=(e,t)=>{for(var a in t||(t={}))i.call(t,a)&&r(e,a,t[a]);if(s)for(var a of s(t))n.call(t,a)&&r(e,a,t[a]);return e},c=(e,s)=>t(e,a(s));import{a as o,y as m,l as p,J as u,N as d}from"./vendor.87791f12.js";function v({title:e,items:t,name:a}){return o("div",{class:`card area-${a}`},e&&o("div",{class:"card-title"},e),o("div",{class:"collection-list"},t.map((e=>o("span",{class:"card-value"},e)))))}function y({data:e,goal:t,title:a,name:s}){const i=(e.reduce(((e,t)=>e+t))/e.length).toFixed(3);return o("div",{class:`card graph area-${s}`,style:"--goal: "+1.5*t},e.map((e=>{const a=`hsl(${Math.max(0,150-100*e/t)}deg, 80%, 55%)`;return o("div",{class:"graph-value",style:`--value: ${e}; --color: ${a};`})})),a&&o("span",{class:"graph-title"},a),o("span",{class:"graph-info"},"avg: ",i))}function k({title:e,properties:t,name:a}){return o("div",{class:`card area-${a}`},e&&o("div",{class:"card-title"},e),o("div",{class:"card-properties"},t.map((e=>o("div",{class:"card-property"},o("span",{class:"card-key"},e[0],": "),o("span",{class:"card-value"},e[1]))))))}function g({name:e,columns:t,data:a}){const[s,i]=p(Math.min(100,a.length));return o("div",{class:`card table area-${e}`},o("div",{class:"table-row table-head"},t.map((e=>o("div",{class:"table-column"},e)))),o("div",{class:"table-body"},a.slice(0,s).map((e=>o("div",{class:"table-row"},e.map((e=>o("div",{class:"table-column"},e)))))),a.length>s&&o("div",{class:"table-row table-foot"},o("div",null,a.length-s," entries hidden"),a.length-s>100&&o("div",{class:"table-action",onClick:()=>i(s+100)},"Show 100 more"),o("div",{class:"table-action",onClick:()=>i(a.length)},"Show all")),0===a.length&&o("div",{class:"table-row table-foot"},o("div",null,"None"))))}const f={x:o("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"},o("path",{"fill-rule":"evenodd",d:"M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"}))};var b;!function(e){async function t(e,t){const[a,...i]=await s(e,t),n=a.split(",").map((e=>e.trim()));return i.map((e=>Object.fromEntries(e.split(",").map(((e,t)=>[n[t],e.trim()])))))}async function a(e,t,a=":"){const i=await s(e,t);return Object.fromEntries(i.filter((e=>e.includes(a))).map((e=>{const[t,...s]=e.split(a);return[t,s.join(a).trim()]})))}async function s(e,t){const a=e.files[t];if(!a)throw new Error(`Cannot find "${t}"`);return(await a.async("text")).trimEnd().split("\n")}(b||(b={})).fromZip=async function(e){const s=await e.arrayBuffer(),i=await u.loadAsync(s),n=await t(i,"client/metrics/ticking.csv"),r=await a(i,"client/options.txt"),l=await t(i,"server/metrics/ticking.csv"),c=await a(i,"server/gamerules.txt","="),o=await a(i,"server/stats.txt"),m=await a(i,"system.txt"),p=Object.keys(i.files).filter((e=>e.match(/^server\/levels\/[a-z0-9_-]+\/[a-z0-9_-]+\/$/))),d=await Promise.all(p.map((e=>async function(e,s){const i=await t(e,`${s}block_entities.csv`),n=await t(e,`${s}chunks.csv`),r=await t(e,`${s}entities.csv`),l=await t(e,`${s}entity_chunks.csv`),c=await a(e,`${s}stats.txt`),o=c.entities.split(",").map((e=>parseInt(e)));return{blockEntities:i.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),type:e.type}))),chunks:n.map((e=>({x:parseInt(e.x),z:parseInt(e.z),level:parseInt(e.level),inMemory:"true"===e.in_memory,status:"[null]"===e.status?null:e.status,fullStatus:"[null]"===e.full_status?null:e.full_status,accessibleReady:e.accessible_ready,tickingReady:e.ticking_ready,entityTickingReady:e.entity_ticking_ready,spawning:"true"===e.spawning,blockEntityCount:parseInt(e.block_entity_count)}))),entities:r.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),uuid:e.uuid,type:e.type,alive:"true"===e.alive,displayName:e.display_name,customName:"[null]"===e.custom_name?null:e.custom_name}))),entityChunks:l.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),visibility:e.visibility,loadStatus:e.load_status,entityCount:parseInt(e.entity_count)}))),stats:{spawningChunks:parseInt(c.spawning_chunks),entities:{knownUuids:o[0],visibleEntityStorage:o[1],sectionStorage:o[2],chunkLoadStatuses:o[3],chunkVisibility:o[4],loadingInbox:o[5],chunksToUnload:o[6]},blockEntityTickers:parseInt(c.block_entity_tickers),blockTicks:parseInt(c.block_ticks),fluidTicks:parseInt(c.fluid_ticks),pendingTasks:parseInt(c.pending_tasks)}}}(i,e))));return{name:e.name.replace(/\.zip$/,""),client:{metrics:{ticking:n.map((e=>({tick:parseInt(e["@tick"]),tickTime:Number(e.ticktime)})))},options:r},server:{levels:Object.fromEntries(p.map(((e,t)=>[e.replace(/^server\/levels\/([a-z0-9_-]+)\/([a-z0-9_-]+)\/$/,"$1:$2"),d[t]]))),metrics:{ticking:l.map((e=>({tick:parseInt(e["@tick"]),tickTime:Number(e.ticktime)})))},gamerules:c,stats:{pendingTasks:parseInt(o.pending_tasks),averageTickTime:parseFloat(o.average_tick_time),tickTimes:JSON.parse(o.tick_times)}},system:{versionName:m["Minecraft Version"],versionId:m["Minecraft Version ID"],isModded:!m["Is Modded"].startsWith("Probably not."),resourcePacks:m["Resource Packs"].split(",").map((e=>e.trim())),dataPacks:m["Data Packs"].split(",").map((e=>e.trim())),operatingSystem:m["Operating System"],javaVersion:m["Java Version"],jvmVersion:m["Java VM Version"],library:m["Backend library"],processorName:m["Processor Name"],cpus:parseInt(m.CPUs),frequency:parseFloat(m["Frequency (GHz)"]),graphicsCardName:m["Graphics card #0 name"],playerCount:m["Player Count"].split(";")[0].split(" / ").map((e=>parseInt(e))),language:m["Current Language"],graphicsMode:m["Graphics mode"],vbos:"Yes"===m["Using VBOs"]}}}}();const h=[["Overview",function(e){const t=e.server.stats.averageTickTime,a=Math.min(...e.server.stats.tickTimes)/1e6,s=Math.max(...e.server.stats.tickTimes)/1e6;return o(m,null,o(k,{name:"stats",title:"Server stats",properties:[["Average tick",`${t.toFixed(3)} mspt`],["Minimum tick",`${a.toFixed(3)} mspt`],["Maximum tick",`${s.toFixed(3)} mspt`]]}),o(y,{name:"tick-graph",title:"Server tick (mspt)",goal:50,data:e.server.stats.tickTimes.map((e=>Math.round(e/1e6)))}),o(y,{name:"server-metrics",title:"Full server tick",goal:50,data:e.server.metrics.ticking.map((e=>Math.round(e.tickTime/1e6)))}),o(y,{name:"client-metrics",title:"Client tick",goal:60,data:e.client.metrics.ticking.map((e=>Math.round(1e3/(e.tickTime/1e6))))}))}],["System",function(e){return o(m,null,o(k,{name:"version",title:"Minecraft version",properties:[["Name",e.system.versionName],["Id",e.system.versionId],["Is modded",e.system.isModded?"Yes":"Probably not"]]}),o(k,{name:"game-options",title:"Game options",properties:[["Player count",`${e.system.playerCount.join(" / ")}`],["Language",e.system.language],["Graphics mode",e.system.graphicsMode],["Using VBOs",e.system.vbos?"Yes":"No"]]}),o(k,{name:"software",title:"Software",properties:[["Operating system",e.system.operatingSystem],["Java version",e.system.javaVersion],["Java VM",e.system.jvmVersion],["Library",e.system.library]]}),o(k,{name:"hardware",title:"Hardware",properties:[["Processor",e.system.processorName],["CPUs",`${e.system.cpus}`],["Frequency",`${e.system.frequency} GHz`],["Graphics card",e.system.graphicsCardName]]}),o(v,{name:"data-packs",title:"Data packs",items:e.system.dataPacks}),o(v,{name:"resource-packs",title:"Resource packs",items:e.system.resourcePacks}))}],["Gamerules",function(e){return o(m,null,o(k,{name:"gamerules",properties:Object.entries(e.server.gamerules)}))}],["Levels",function(e){const[t,a]=p("entities");return o(m,null,o("ul",{class:"panels"},o("li",{class:"panel"+("entities"===t?" active":""),onClick:()=>a("entities")},"Entities"),o("li",{class:"panel"+("block-entities"===t?" active":""),onClick:()=>a("block-entities")},"Block entities"),o("li",{class:"panel"+("chunks"===t?" active":""),onClick:()=>a("chunks")},"Chunks")),"entities"===t&&o(g,{name:"entities",columns:["Type","Position","Dimension"],data:Object.entries(e.server.levels).flatMap((([e,t])=>t.entities.map((t=>c(l({},t),{dimension:e}))))).map((e=>[e.type.replace(/^minecraft:/,""),`${Math.round(e.x)} ${Math.round(e.y)} ${Math.round(e.z)}`,e.dimension.replace(/^minecraft:/,"")]))}),"block-entities"===t&&o(g,{name:"block-entities",columns:["Type","Position","Dimension"],data:Object.entries(e.server.levels).flatMap((([e,t])=>t.blockEntities.map((t=>c(l({},t),{dimension:e}))))).map((e=>[e.type.replace(/^minecraft:/,""),`${Math.round(e.x)} ${Math.round(e.y)} ${Math.round(e.z)}`,e.dimension.replace(/^minecraft:/,"")]))}),"chunks"===t&&o(g,{name:"chunks",columns:["Position","Dimension","Level","Status"],data:Object.entries(e.server.levels).flatMap((([e,t])=>t.chunks.map((t=>c(l({},t),{dimension:e}))))).map((e=>{var t,a,s,i;return[`${Math.round(e.x)} ${Math.round(e.z)}`,e.dimension.replace(/^minecraft:/,""),`${e.level}`,"minecraft:full"===e.status?null!=(a=null==(t=e.fullStatus)?void 0:t.toLowerCase())?a:"unknown":null!=(i=null==(s=e.status)?void 0:s.replace(/^minecraft:/,""))?i:"unknown"]}))}))}],["Profiling",function(e){return o(m,null)}]];function w(){const[e,t]=p([]),[a,s]=p(0),[i,n]=p(0);return o("main",{onDrop:async a=>{if(a.preventDefault(),a.dataTransfer)for(let i=0;i<a.dataTransfer.files.length;i++){const n=a.dataTransfer.files[i];if(n.type.match(/^application\/(x-)?zip(-compressed)?$/)){const a=await b.fromZip(n),i=e.findIndex((e=>e.name===a.name));i>=0?s(i):(console.log(a.name,a),s(e.length),t([...e,a]))}}},onDragOver:e=>e.preventDefault()},0===e.length?o(m,null,o("div",{class:"drop"},o("h1",null,"Drop profiling report here"),o("p",null,"Singleplayer: F3 + L"),o("p",null,"Multiplayer: /perf start"),o("p",null,"Located in .minecraft/debug/profiling/"))):o(m,null,o("ul",{class:"tabs"},e.map(((i,n)=>o("li",{class:"tab"+(a===n?" active":""),onClick:()=>s(n),title:i.name},o("div",{class:"tab-name"},i.name),o("button",{class:"tab-remove",onClick:()=>{return a=n,void t(e.filter(((e,t)=>t!==a)));var a}},f.x))))),o("ul",{class:"panels"},h.map(((e,t)=>o("li",{class:"panel"+(i===t?" active":""),onClick:()=>n(t)},e[0])))),o("div",{class:"report"},h[i][1](e[a]))))}d(o(w,null),document.body);