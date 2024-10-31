import{_ as s,c as i,a2 as t,o as e}from"./chunks/framework.CdbxnhrM.js";const d=JSON.parse('{"title":"Migration from vue-chart-3","description":"","frontmatter":{},"headers":[],"relativePath":"de/migration-guides/vue-chart-3.md","filePath":"de/migration-guides/vue-chart-3.md","lastUpdated":1730382198000}'),n={name:"de/migration-guides/vue-chart-3.md"};function h(l,a,p,r,o,k){return e(),i("div",null,a[0]||(a[0]=[t(`<h1 id="migration-from-vue-chart-3" tabindex="-1">Migration from vue-chart-3 <a class="header-anchor" href="#migration-from-vue-chart-3" aria-label="Permalink to &quot;Migration from vue-chart-3&quot;">​</a></h1><h2 id="uninstall-vue-chart-3" tabindex="-1">Uninstall vue-chart-3 <a class="header-anchor" href="#uninstall-vue-chart-3" aria-label="Permalink to &quot;Uninstall vue-chart-3&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chart-3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remove</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chart-3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chart-3</span></span></code></pre></div><h2 id="install-vue-chartjs" tabindex="-1">Install vue-chartjs <a class="header-anchor" href="#install-vue-chartjs" aria-label="Permalink to &quot;Install vue-chartjs&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chartjs</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chartjs</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-chartjs</span></span></code></pre></div><h2 id="change-component-import-path" tabindex="-1">Change component import path <a class="header-anchor" href="#change-component-import-path" aria-label="Permalink to &quot;Change component import path&quot;">​</a></h2><p>For Vue 2.7 and Vue 3 projects:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* component */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue-chartjs&#39;</span></span></code></pre></div><p>For Vue 2 (&lt;2.7) projects:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* component */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue-chartjs/legacy&#39;</span></span></code></pre></div><h2 id="rename-components" tabindex="-1">Rename components <a class="header-anchor" href="#rename-components" aria-label="Permalink to &quot;Rename components&quot;">​</a></h2><ul><li>BarChart to Bar</li><li>DoughnutChart to Doughnut</li><li>LineChart to Line</li><li>PieChart to Pie</li><li>PolarAreaChart to PolarArea</li><li>RadarChart to Radar</li><li>BubbleChart to Bubble</li><li>ScatterChart to Scatter</li></ul><h2 id="rename-props" tabindex="-1">Rename props <a class="header-anchor" href="#rename-props" aria-label="Permalink to &quot;Rename props&quot;">​</a></h2><ul><li>options to chartOptions</li></ul>`,14)]))}const u=s(n,[["render",h]]);export{d as __pageData,u as default};
