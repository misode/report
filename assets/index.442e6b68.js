var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,r=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,l=(e,t)=>{for(var a in t||(t={}))i.call(t,a)&&r(e,a,t[a]);if(n)for(var a of n(t))s.call(t,a)&&r(e,a,t[a]);return e},o=(e,n)=>t(e,a(n));import{a as c,l as p,y as u,o as m,b as d,s as v,J as h,N as f}from"./vendor.6f8ef5a2.js";async function g(e,{decode:t=(e=>e.json()),refresh:a}={}){try{const i=await caches.open("misode-report-v1");console.debug(`[cachedFetch] Opened cache misode-report-v1 ${e}`);const s=await i.match(e);if(!a)return s&&s.ok?(console.debug(`[cachedFetch] Retrieving cached data ${e}`),await t(s)):await k(i,e,t);try{return await k(i,e,t)}catch(n){if(s&&s.ok)return console.debug(`[cachedFetch] Cannot refresh, using cache ${e}`),await t(s);throw new Error("Failed to fetch")}}catch(n){console.warn(`[cachedFetch] Failed to open cache misode-report-v1: ${n.message}`),console.debug(`[cachedFetch] Fetching data ${e}`);const a=await fetch(e);return await t(a)}}async function k(e,t,a){console.debug(`[cachedFetch] Fetching data ${t}`);const n=await fetch(t),i=n.clone(),s=await a(n);return await e.put(t,i),s}function y({title:e,items:t,name:a}){return c("div",{class:`card area-${a}`},e&&c("div",{class:"card-title"},e,c("span",null,"(",t.length,")")),c("div",{class:"collection-list"},t.map((e=>c("span",{class:"card-value"},e)))))}function b({data:e,goal:t,title:a,name:n}){const i=(e.reduce(((e,t)=>e+t))/e.length).toFixed(3);return c("div",{class:`card graph area-${n}`,style:"--goal: "+1.5*t},e.map((e=>{const a=`hsl(${Math.max(0,150-100*e/t)}deg, 80%, 55%)`;return c("div",{class:"graph-value",style:`--value: ${Math.round(e)}; --color: ${a};`})})),a&&c("span",{class:"graph-title"},a),c("span",{class:"graph-info"},"avg: ",i))}function w({title:e,properties:t,name:a,defaults:n={}}){return c("div",{class:`card area-${a}`},e&&c("div",{class:"card-title"},e),c("div",{class:"card-properties"},t.filter((e=>"string"==typeof e[1])).map((e=>c("div",{class:"card-property"+(void 0!==n[e[0]]&&n[e[0]]!==e[1]?" altered":"")},c("span",{class:"card-key"},e[0],": "),c("span",{class:"card-value"},e[1]))))))}function x({name:e,columns:t,data:a}){const[n,i]=p(Math.min(100,a.length));return c("div",{class:`card table area-${e}`},c("div",{class:"table-row table-head"},t.map((e=>c("div",{class:"table-column"},e)))),c("div",{class:"table-body"},a.slice(0,n).map((e=>c("div",{class:"table-row"},e.map((e=>c("div",{class:"table-column"},e)))))),a.length>n&&c("div",{class:"table-row table-foot"},c("div",null,a.length-n," entries hidden"),a.length-n>100&&c("div",{class:"table-action",onClick:()=>i(n+100)},"Show 100 more"),c("div",{class:"table-action",onClick:()=>i(a.length)},"Show all")),0===a.length&&c("div",{class:"table-row table-foot"},c("div",null,"None"))))}function C({title:e,name:t,text:a}){return c("div",{class:`card area-${t}`},e&&c("div",{class:"card-title"},e),a&&c("pre",{class:"card-text"},a))}const $={announceAdvancements:"true",commandBlockOutput:"true",disableElytraMovementCheck:"false",disableRaids:"false",doDaylightCycle:"true",doEntityDrops:"true",doFireTick:"true",doInsomnia:"true",doImmediateRespawn:"false",doLimitedCrafting:"false",doMobLoot:"true",doMobSpawning:"true",doPatrolSpawning:"true",doTileDrops:"true",doTraderSpawning:"true",doWeatherCycle:"true",drowningDamage:"true",fallDamage:"true",fireDamage:"true",forgiveDeadPlayers:"true",freezeDamage:"true",keepInventory:"false",logAdminCommands:"true",maxCommandChainLength:"65536",maxEntityCramming:"24",mobGriefing:"true",naturalRegeneration:"true",playersSleepingPercentage:"100",randomTickSpeed:"3",reducedDebugInfo:"false",sendCommandFeedback:"true",showDeathMessages:"true",spawnRadius:"10",spectatorsGenerateChunks:"true",universalAnger:"false"},M={ao:"MAX",biomeBlendRadius:"2",enableVsync:"true",entityDistanceScaling:"1.0",entityShadows:"true",forceUnicodeFont:"false",fov:"70.0",fovEffectScale:"1.0",fullscreen:"false",gamma:"1.0",glDebugVerbosity:"1",graphicsMode:"fancy",guiScale:"0",maxFps:"120",mipmapLevels:"4",narrator:"OFF",overrideHeight:"0",overrideWidth:"0",particles:"ALL",reducedDebugInfo:"false",renderClouds:"FANCY",renderDistance:"12",screenEffectScale:"1.0",useNativeTransport:"true"};const T={plus:c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"},c("path",{"fill-rule":"evenodd",d:"M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"})),rows:c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"},c("path",{"fill-rule":"evenodd",d:"M16 2.75A1.75 1.75 0 0014.25 1H1.75A1.75 1.75 0 000 2.75v2.5A1.75 1.75 0 001.75 7h12.5A1.75 1.75 0 0016 5.25v-2.5zm-1.75-.25a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-2.5a.25.25 0 01.25-.25h12.5zM16 10.75A1.75 1.75 0 0014.25 9H1.75A1.75 1.75 0 000 10.75v2.5A1.75 1.75 0 001.75 15h12.5A1.75 1.75 0 0016 13.25v-2.5zm-1.75-.25a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-2.5a.25.25 0 01.25-.25h12.5z"})),x:c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"},c("path",{"fill-rule":"evenodd",d:"M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"}))};function S({children:e,hidden:t,path:a,level:n,tickTime:i,onToggle:s}){return c(d,null,Object.entries(e).map((([e,t])=>[e,`${a}.${e}`,t])).map((([e,a,r])=>c(d,null,c(O,{name:e,props:r,tickTime:i,level:n,onClick:()=>s(a)}),r.children&&!t.has(a)&&c(S,{children:r.children,hidden:t,path:a,level:n+1,tickTime:i,onToggle:s})))))}function F({children:e,tickTime:t}){return c(d,null,Object.entries(e).map((([e,a])=>c(d,null,c(O,{name:e,props:a,tickTime:t}),a.children&&c(F,{children:a.children,tickTime:t})))))}function O({name:e,props:t,tickTime:a,level:n,onClick:i}){const[s,r]=function(e=!1){const[t,a]=p(e),n=()=>a(!1);return u((()=>(t&&(document.body.addEventListener("click",n),document.body.addEventListener("contextmenu",n)),()=>{document.body.removeEventListener("click",n),document.body.removeEventListener("contextmenu",n)})),[t]),[t,a]}(),l=v(null);return c("div",{class:`table-row ${n?`level-${n}`:""} ${s?"active":""}`,onClick:i,onContextMenuCapture:e=>{e.preventDefault(),r(!0)}},c("div",{class:"profile-name"},e.startsWith("ServerLevel[")?e.split(" ").pop():e),void 0!==t.ofTotal&&c(d,null,c("div",{class:"profile-parent-part"},t.ofParent," %"),c("div",{class:"profile-total-part"},t.ofTotal," %"),c("div",{class:"profile-time"},(a*t.ofTotal/100).toFixed(3)," ms")),c("div",{class:"profile-total-count"},t.count),c("div",{class:"profile-average-count"},t.averageCount),s&&c("div",{class:"profile-menu"},c("input",{ref:l,type:"text",value:e,style:"display: block; width: 1px; height: 0; border: none;"}),c("div",{class:"profile-menu-btn",onClick:e=>{e.stopPropagation(),l.current.select(),document.execCommand("copy"),r(!1)}},"Copy")))}var I;!function(e){async function t(e,t){var a,n;const i=await r(e,t),s=i.indexOf("--- BEGIN PROFILE DUMP ---")+2,o=i.indexOf("--- END PROFILE DUMP ---"),c=[],p=[];let u=-1;for(let r=s;r<o;r+=1){const e=i[r].match(/^\[(\d\d)\][ |]+(.*)(\((\d+)\/(\d+)\) - ([\d\.]+)%\/([\d\.]+)%| (\d+)\/(\d+))$/),t=parseInt(e[1]),s=e[2];t>u?c.push({}):p.pop();for(let a=0;a<u-t;a+=1){const e=c.pop();c[c.length-1][p.pop()].children=e}p.push(s),u=t,c[c.length-1][s]=l({count:parseInt(null!=(a=e[4])?a:e[8]),averageCount:parseInt(null!=(n=e[5])?n:e[9])},e[6]&&{ofParent:parseFloat(e[6]),ofTotal:parseFloat(e[7])})}return{timeSpan:parseInt(i[4].split(":")[1]),tickSpan:parseInt(i[5].split(":")[1]),dump:c[0]}}function a(e){var t,a,n;return{versionName:e["Minecraft Version"],versionId:e["Minecraft Version ID"],isModded:e["Is Modded"].startsWith("Probably not.")?"No":e["Is Modded"].startsWith("Unknown")?"Unknown":"Yes",resourcePacks:null==(t=e["Resource Packs"])?void 0:t.split(",").map((e=>e.trim())),dataPacks:null==(a=e["Data Packs"])?void 0:a.split(",").map((e=>e.trim())),operatingSystem:e["Operating System"],javaVersion:e["Java Version"],jvmVersion:e["Java VM Version"],library:e["Backend library"],processorName:e["Processor Name"],cpus:parseInt(e.CPUs),frequency:parseFloat(e["Frequency (GHz)"]),graphicsCardName:e["Graphics card #0 name"],playerCount:null==(n=e["Player Count"])?void 0:n.split(";")[0].split(" / ").map((e=>parseInt(e))),language:e["Current Language"],graphicsMode:e["Graphics mode"],vbos:e["Using VBOs"]?"Yes"===e["Using VBOs"]:void 0}}async function n(e,t){const[a,...n]=await r(e,t),i=a.split(",").map((e=>e.trim()));return n.map((e=>Object.fromEntries(e.split(",").map(((e,t)=>[i[t],e.trim()])))))}async function i(e,t,a=":"){return s(await r(e,t),a)}function s(e,t=":"){return Object.fromEntries(e.filter((e=>e.includes(t))).map((e=>{const[a,...n]=e.split(t);return[a.trim(),n.join(t).trim()]})))}async function r(e,t){const a=e.files[t];if(!a)throw new Error(`Cannot find "${t}"`);return(await a.async("text")).trimEnd().split("\n")}e.fromZip=async function(e){const s=await e.arrayBuffer(),r=await h.loadAsync(s),c=await i(r,"system.txt");return o(l(l({name:e.name},await async function(e){if(!e.files["client/options.txt"])return;const a=e.files["client/metrics/jvm.csv"]?await n(e,"client/metrics/jvm.csv"):void 0,s=await n(e,"client/metrics/ticking.csv"),r=await i(e,"client/options.txt"),l=await t(e,"client/profiling.txt");return{client:{metrics:{jvm:null==a?void 0:a.map((e=>({tick:parseInt(e["@tick"]),heap:parseInt(e["heap MiB"])}))),ticking:s.map((e=>({tick:parseInt(e["@tick"]),tickTime:Number(e.ticktime)})))},options:r,profiling:l}}}(r)),await async function(e){if(!e.files["server/stats.txt"])return;const a=e.files["server/metrics/jvm.csv"]?await n(e,"server/metrics/jvm.csv"):void 0,s=await n(e,"server/metrics/ticking.csv"),r=await t(e,"server/profiling.txt"),l=await i(e,"server/gamerules.txt","="),o=await i(e,"server/stats.txt"),c=Object.keys(e.files).map((e=>{var t,a;return null!=(a=null==(t=e.match(/^server\/levels\/([a-z0-9_-]+(?:\/[a-z0-9_-]+)+)\/stats.txt$/))?void 0:t[1])?a:void 0})).filter((e=>void 0!==e)),p=await Promise.all(c.map((t=>async function(e,t){const a=await n(e,`server/levels/${t}/block_entities.csv`),s=await n(e,`server/levels/${t}/chunks.csv`),r=await n(e,`server/levels/${t}/entities.csv`),l=await n(e,`server/levels/${t}/entity_chunks.csv`),o=await i(e,`server/levels/${t}/stats.txt`),c=o.entities.split(",").map((e=>parseInt(e)));return{blockEntities:a.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),type:e.type}))),chunks:s.map((e=>({x:parseInt(e.x),z:parseInt(e.z),level:parseInt(e.level),inMemory:"true"===e.in_memory,status:"[null]"===e.status?null:e.status,fullStatus:"[null]"===e.full_status?null:e.full_status,accessibleReady:e.accessible_ready,tickingReady:e.ticking_ready,entityTickingReady:e.entity_ticking_ready,spawning:"true"===e.spawning,blockEntityCount:parseInt(e.block_entity_count)}))),entities:r.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),uuid:e.uuid,type:e.type,alive:"true"===e.alive,displayName:e.display_name,customName:"[null]"===e.custom_name?null:e.custom_name}))),entityChunks:l.map((e=>({x:parseFloat(e.x),y:parseFloat(e.y),z:parseFloat(e.z),visibility:e.visibility,loadStatus:e.load_status,entityCount:parseInt(e.entity_count)}))),stats:{spawningChunks:parseInt(o.spawning_chunks),entities:{knownUuids:c[0],visibleEntityStorage:c[1],sectionStorage:c[2],chunkLoadStatuses:c[3],chunkVisibility:c[4],loadingInbox:c[5],chunksToUnload:c[6]},blockEntityTickers:parseInt(o.block_entity_tickers),blockTicks:parseInt(o.block_ticks),fluidTicks:parseInt(o.fluid_ticks),pendingTasks:parseInt(o.pending_tasks)}}}(e,t))));return{server:{levels:Object.fromEntries(c.map(((e,t)=>[e.replace("/",":"),p[t]]))),metrics:{jvm:null==a?void 0:a.map((e=>({tick:parseInt(e["@tick"]),heap:parseInt(e["heap MiB"])}))),ticking:s.map((e=>({tick:parseInt(e["@tick"]),tickTime:Number(e.ticktime)})))},gamerules:l,profiling:r,stats:{pendingTasks:parseInt(o.pending_tasks),averageTickTime:parseFloat(o.average_tick_time),tickTimes:JSON.parse(o.tick_times)}}}}(r)),{system:a(c)})},e.fromCrash=async function(e){const t=await e.text();if(!t.startsWith("---- Minecraft Crash Report ----"))throw new Error("This is not a crash report");const n=t.indexOf("\n\n"),i=t.indexOf("\n\n",n+2),r=t.indexOf("\n\n",i+2),l=s(t.substring(n+2,i).split("\n")),o=a(s(t.substring(t.indexOf("-- System Details --")).split("\n"))),c=t.substring(i+2,r).replaceAll("\t","    ");return{name:e.name,crash:{time:l.Time,description:l.Description,stacktrace:c},system:o}}}(I||(I={}));const j=[{name:"Overview",predicate:e=>e.server||e.client,component:function({report:e}){var t,a,n,i,s,r,l,o;console.log(e);const p=null!=(a=null==(t=e.server)?void 0:t.stats.averageTickTime)?a:0,u=Math.min(...null!=(i=null==(n=e.server)?void 0:n.stats.tickTimes)?i:[])/1e6,m=Math.max(...null!=(r=null==(s=e.server)?void 0:s.stats.tickTimes)?r:[])/1e6;return c(d,null,e.server&&c(w,{name:"stats",title:e.client?"Server stats":"Stats",properties:[["Average tick",`${p.toFixed(3)} mspt`],["Minimum tick",`${u.toFixed(3)} mspt`],["Maximum tick",`${m.toFixed(3)} mspt`]]}),e.server&&c(b,{name:"tick-graph",title:e.client?"Server tick (mspt)":"Tick (mspt)",goal:50,data:e.server.stats.tickTimes.map((e=>e/1e6))}),e.server&&c(b,{name:"server-metrics",title:e.client?"Full server tick (ms)":"Full tick",goal:50,data:e.server.metrics.ticking.map((e=>e.tickTime/1e6))}),e.client&&c(b,{name:"client-metrics",title:"Client tick (ms)",goal:60,data:e.client.metrics.ticking.map((e=>1e3/(e.tickTime/1e6)))}),(null==(l=e.server)?void 0:l.metrics.jvm)&&c(b,{name:"server-jvm",title:"Server JVM heap (MiB)",goal:2e3,data:e.server.metrics.jvm.map((e=>e.heap))}),(null==(o=e.client)?void 0:o.metrics.jvm)&&c(b,{name:"client-jvm",title:"Client JVM heap (MiB)",goal:2e3,data:e.client.metrics.jvm.map((e=>e.heap))}))}},{name:"Crash",predicate:e=>e.crash,component:function({report:e}){var t,a,n,i,s;const[r,l]=p(null==(t=e.crash)?void 0:t.stacktrace);return u((()=>{var t,a;const n=null==(t=e.crash)?void 0:t.stacktrace;if(l(n),n&&!(null==(a=e.crash)?void 0:a.remapped)){const t=e.name.endsWith("-server.txt")?"server":"client";(async function(e,t){var a;const n=null==(a=(await g("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json",{refresh:!0})).versions.find((t=>t.id===e)))?void 0:a.url;if(!n)throw new Error(`Version ${e} not found`);const i=(await g(n)).downloads[`${t}_mappings`].url;return await g(`https://misode-cors-anywhere.herokuapp.com/${i}`,{decode:e=>e.text()})})(e.system.versionId,t).then((t=>{const a=m(t,n);l(a),e.crash.stacktrace=a,e.crash.remapped=!0}))}}),[null==(a=e.crash)?void 0:a.stacktrace]),c(d,null,c(w,{name:"crash-info",title:"Minecraft Crash report",properties:[["Time",null==(n=e.crash)?void 0:n.time],["Description",null==(i=e.crash)?void 0:i.description]]}),c(C,{name:"stacktrace",title:null!=(s=null==r?void 0:r.slice(0,null==r?void 0:r.indexOf("\n")))?s:"Stacktrace",text:null==r?void 0:r.slice(r.indexOf("\n")+1)}))}},{name:"System",predicate:e=>e.system,component:function({report:e}){var t;return c(d,null,c(w,{name:"version",title:"Minecraft version",properties:[["Name",e.system.versionName],["Id",e.system.versionId],["Is modded",e.system.isModded]]}),e.client&&c(w,{name:"game-options",title:"Game options",properties:[["Player count",null==(t=e.system.playerCount)?void 0:t.join(" / ")],["Language",e.system.language],["Graphics mode",e.system.graphicsMode],["Using VBOs",e.system.vbos?"Yes":"No"]]}),c(w,{name:"software",title:"Software",properties:[["Operating system",e.system.operatingSystem],["Java version",e.system.javaVersion],["Java VM version",e.system.jvmVersion],["Library",e.system.library]]}),c(w,{name:"hardware",title:"Hardware",properties:[["Processor",e.system.processorName],["CPUs",e.system.cpus.toFixed()],["Frequency",`${e.system.frequency} GHz`],["Graphics card",e.system.graphicsCardName]]}),e.system.dataPacks&&c(y,{name:"data-packs",title:"Data packs",items:e.system.dataPacks}),e.system.resourcePacks&&c(y,{name:"resource-packs",title:"Resource packs",items:e.system.resourcePacks}))}},{name:"Options",predicate:e=>e.server||e.client,component:function({report:e}){var t,a;return c(d,null,(null==(t=e.server)?void 0:t.gamerules)&&c(w,{title:"Gamerules",name:"gamerules",properties:Object.entries(e.server.gamerules),defaults:$}),(null==(a=e.client)?void 0:a.options)&&c(w,{title:"Client Options",name:"options",properties:Object.entries(e.client.options),defaults:M}))}},{name:"Levels",predicate:e=>e.server,component:function({report:e}){var t,a;const[n,i]=p("entities");return c(d,null,c("ul",{class:"panels"},c("li",{class:"panel"+("entities"===n?" active":""),onClick:()=>i("entities")},"Entities"),c("li",{class:"panel"+("block-entities"===n?" active":""),onClick:()=>i("block-entities")},"Block entities"),c("li",{class:"panel"+("chunks"===n?" active":""),onClick:()=>i("chunks")},"Chunks"),c("li",{class:"panel"+("stats"===n?" active":""),onClick:()=>i("stats")},"Stats")),"entities"===n&&c(x,{name:"entities",columns:["Type","Position","Dimension"],data:Object.entries(null!=(r=null==(s=e.server)?void 0:s.levels)?r:{}).flatMap((([e,t])=>t.entities.map((t=>o(l({},t),{dimension:e}))))).map((e=>[e.type.replace(/^minecraft:/,""),`${Math.round(e.x)} ${Math.round(e.y)} ${Math.round(e.z)}`,e.dimension.replace(/^minecraft:/,"")]))}),"block-entities"===n&&c(x,{name:"block-entities",columns:["Type","Position","Dimension"],data:(()=>{var t,a;return Object.entries(null!=(a=null==(t=e.server)?void 0:t.levels)?a:{}).flatMap((([e,t])=>t.blockEntities.map((t=>o(l({},t),{dimension:e}))))).map((e=>[e.type.replace(/^minecraft:/,""),`${Math.round(e.x)} ${Math.round(e.y)} ${Math.round(e.z)}`,e.dimension.replace(/^minecraft:/,"")]))})()}),"chunks"===n&&c(x,{name:"chunks",columns:["Position","Dimension","Level","Status","Entities"],data:(()=>{var t,a;return Object.entries(null!=(a=null==(t=e.server)?void 0:t.levels)?a:{}).flatMap((([e,t])=>t.chunks.map((t=>o(l({},t),{dimension:e}))))).map((t=>{var a,n,i,s;return[`${Math.round(t.x)} ${Math.round(t.z)}`,t.dimension.replace(/^minecraft:/,""),`${t.level}`,"minecraft:full"===t.status?null!=(n=null==(a=t.fullStatus)?void 0:a.toLowerCase())?n:"unknown":null!=(s=null==(i=t.status)?void 0:i.replace(/^minecraft:/,""))?s:"unknown",`${e.server.levels[t.dimension].entityChunks.filter((e=>e.x===t.x&&e.z===t.z)).reduce(((e,t)=>e+t.entityCount),0)}`]}))})()}),"stats"===n&&Object.entries(null!=(a=null==(t=e.server)?void 0:t.levels)?a:{}).map((([e,{stats:t}])=>c(w,{name:"level-stats",title:e,properties:[["Entities",`${t.entities.knownUuids}`],["Block entities",`${t.blockEntityTickers}`],["Block ticks",`${t.blockTicks}`],["Fluid ticks",`${t.fluidTicks}`],["Spawning chunks",`${t.spawningChunks}`]]}))));var s,r}},{name:"Profiling",predicate:e=>{var t,a;return(null==(t=e.server)?void 0:t.profiling)||(null==(a=e.client)?void 0:a.profiling)},component:function({report:e}){var t,a;const[n,i]=p(e.server?"server":"client"),[s,r]=p("tree"),[l,o]=p(new Set),u=(null!=(a=null!=(t=e[n])?t:e.server)?a:e.client).profiling,m=u.timeSpan/u.tickSpan;return c(d,null,e.client&&e.server&&c("ul",{class:"panels"},c("li",{class:"panel"+("server"===n?" active":""),onClick:()=>i("server")},"Server"),c("li",{class:"panel"+("client"===n?" active":""),onClick:()=>i("client")},"Client")),c(w,{name:"profiling-stats",properties:[["Time span",`${u.timeSpan} ms`],["Tick span",`${u.tickSpan} ticks`],["Average tick",`${m.toFixed(3)} mspt`]]}),c("div",{class:"card table area-profiling"},c("div",{class:"table-row table-head"},c("div",{class:"table-column profile-name"},c("div",{class:"table-button table-prefix",onClick:()=>r("list"===s?"tree":"list")},T.rows),"Name"),c("div",{class:"table-column table-button profile-parent-part"},"% Parent"),c("div",{class:"table-column table-button profile-total-part"},"% Total"),c("div",{class:"table-column table-button profile-time"},"Avg Time"),c("div",{class:"table-column table-button profile-total-count"},"Count"),c("div",{class:"table-column table-button profile-average-count"},"Avg Count")),c("div",{class:"table-body"},"tree"===s?c(S,{children:u.dump,hidden:l,path:"root",level:0,tickTime:m,onToggle:e=>{l.has(e)?l.delete(e):l.add(e),o(new Set(l))}}):c(F,{children:u.dump,tickTime:m}))))}}];function P(){const[e,t]=p([]),[a,n]=p(0),[i,s]=p("Overview"),[r,l]=p([]),o=e[Math.min(e.length,a)];u((()=>{var e;if(o){const t=j.filter((e=>e.predicate(o))).map((e=>e.name));t.includes(i)||s(null!=(e=t[0])?e:"Overview")}}),[o,i]);const m=async a=>{if(r&&l([]),a instanceof FileList){const e=[];for(let t=0;t<a.length;t++)e.push(a[t]);a=e}const i=a.flatMap((t=>{if(!e.find((e=>e.name===t.name))){if(t.type.match(/^application\/(x-)?zip(-compressed)?$/))return[I.fromZip(t)];if("text/plain"===t.type&&t.name.match(/^crash-.+-(client|server)\.txt$/))return[I.fromCrash(t)]}return[]})),s=await Promise.all(i.map((async e=>{try{return await e}catch(t){return l([...r,t.message]),void console.error(t)}})));n(e.length+s.length-1),t([...e,...s.filter((e=>void 0!==e))])},h=v();return c("main",{onDrop:async e=>{e.preventDefault(),e.dataTransfer&&m(e.dataTransfer.files)},onDragOver:e=>e.preventDefault()},e.length>0&&c("ul",{class:"tabs"},e.map(((i,s)=>c("li",{class:"tab"+(Math.min(e.length,a)===s?" active":""),onClick:()=>n(s),title:i.name},c("div",{class:"tab-name"},i.name.replace(/\.(zip|txt)$/,"")),c("button",{class:"tab-button",onClick:()=>{return a=s,void t(e.filter(((e,t)=>t!==a)));var a}},T.x)))),c("li",{class:"tab new-report"},c("button",{class:"tab-button",onClick:()=>n(e.length)},T.plus))),0!==e.length&&o?c(d,null,c("ul",{class:"panels"},j.map((e=>e.predicate(o)?c("li",{key:e.name,class:"panel"+(i===e.name?" active":""),onClick:()=>s(e.name)},e.name):null))),c("div",{class:`report${o.client?" client-report":""}${o.server?" server-report":""}`},j.map((e=>e.name===i?c(e.component,{key:e.name,report:o}):null))),c("div",{class:"footer"},c("p",null,"Developed by Misode"),c("p",null,"Source code on ",c("a",{href:"https://github.com/misode/report",target:"_blank"},"GitHub")))):c(d,null,c("div",{class:"drop"},c("input",{ref:h,type:"file",onChange:()=>{h.current.files&&m(h.current.files)},accept:".zip,.txt",multiple:!0}),c("h1",null,"Drop profiling or crash report here"),c("p",null,"Singleplayer: F3 + L"),c("p",null,"Multiplayer: /perf start"),c("p",null,"Located in .minecraft/debug/profiling/"),c("p",null,"Crash reports in .minecraft/crash-reports/"))),r.map((e=>c("div",{class:"error"},c("p",null,"Something went wrong loading the report:"),c("p",{class:"error-message"},e),c("p",null,"What you can do:",c("ul",null,c("li",null,"Ensure that you are not using a version below 1.17-pre1"),c("li",null,"Report this as a bug ",c("a",{href:"https://github.com/misode/report/issues/new",target:"_blank"},"on GitHub")," and upload the report"))),c("div",{class:"error-close",onClick:()=>l(r.filter((t=>t!==e)))},"x")))))}f(c(P,null),document.body);
