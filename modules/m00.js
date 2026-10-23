/* Module 00: How Computers & Code Work */
(() => {
const C = GATE.codeBlock, esc = GATE.esc;

/* ---------- widget: computer parts explorer ---------- */
GATE.widget("m00-parts", (el) => {
  const parts = {
    input:  {name:"Input devices", eg:"Keyboard, mouse, microphone, camera", what:"Turn things you do (pressing a key, moving the mouse) into numbers the computer can work with.", kitchen:"The waiter who brings the customer's order into the kitchen."},
    cpu:    {name:"CPU (processor)", eg:"Intel Core i5, AMD Ryzen, Apple M-series", what:"The general-purpose processor that executes the program’s instructions. Other processors and devices can also perform work. It reads one instruction, carries it out (add, compare, copy...), then moves to the next one, billions of times a second.", kitchen:"The chef. Fast, but can only follow the recipe one step at a time."},
    ram:    {name:"RAM (main memory)", eg:"8 GB, 16 GB", what:"A huge row of numbered boxes that holds the program that is running right now and the data it is using. Very fast, but everything in it is lost when the power goes off.", kitchen:"The kitchen counter. Whatever the chef is working on right now sits here."},
    disk:   {name:"Storage (SSD / hard disk)", eg:"512 GB SSD", what:"Keeps files and installed programs permanently, even with the power off. Much slower than RAM, so programs are copied into RAM before they run.", kitchen:"The pantry and fridge. Lots of space, but you have to walk over to fetch things."},
    output: {name:"Output devices", eg:"Screen, speakers, printer", what:"Turn the computer's numbers back into something you can see or hear.", kitchen:"The plate of food that goes back out to the customer."}
  };
  const flows = {
    key: {label:"You press the key “A”", steps:[
      ["input","The keyboard reports a key event. The operating system and editor map it to “A”, represented by 65 in ASCII."],
      ["ram","The number 65 is stored in a box in RAM."],
      ["cpu","The CPU runs the text editor's instructions: “a key arrived, add it to the document”."],
      ["ram","The document in RAM is updated to contain the new letter."],
      ["output","The screen is redrawn and you see “A”."]]},
    open: {label:"You open a saved file",steps:[
      ["input","You double-click the file with the mouse."],
      ["disk","The file is read from storage, the slow but permanent pantry."],
      ["ram","Its contents are copied into RAM so the CPU can reach them quickly."],
      ["cpu","The CPU runs the app's instructions to understand the file."],
      ["output","The file appears on the screen."]]},
    run: {label:"You run a C program",steps:[
      ["disk","The compiled program (a file of machine instructions) sits in storage."],
      ["ram","The operating system copies the program into RAM."],
      ["cpu","The CPU fetches the first instruction from RAM, does it, then fetches the next..."],
      ["ram","Variables in your program live in RAM boxes, which the CPU reads and changes."],
      ["output","printf sends text to the screen."]]}
  };
  let active = "cpu", flow = null, step = 0;
  el.classList.add("viz");
  const box = (k, extra="") => `<button type="button" class="pc-part ${active===k?"is-active":""} ${flow && flows[flow].steps[step][0]===k?"is-visit":""}" data-p="${k}" ${extra}>${parts[k].name}</button>`;
  function draw(){
    const p = parts[active];
    el.innerHTML = `<div class="viz-title">Inside a computer<span class="sub">Click a part, or play a scenario</span></div>
      <style>
        .pc-grid{display:grid;grid-template-columns:1fr 1.3fr 1fr;grid-template-areas:"in cpu out" "in ram out" ". disk .";gap:10px;align-items:stretch}
        .pc-part{border:2px solid var(--line);background:var(--surface-2);border-radius:12px;padding:14px 10px;font-weight:700;cursor:pointer;font-size:15px;min-height:56px;transition:all .2s}
        .pc-part:hover{border-color:var(--accent)}
        .pc-cpu{grid-area:cpu}.pc-ram{grid-area:ram}.pc-disk{grid-area:disk}.pc-in{grid-area:in}.pc-out{grid-area:out}
        @media (max-width:560px){.pc-grid{grid-template-columns:1fr 1fr;grid-template-areas:"in out" "cpu cpu" "ram ram" "disk disk"}}
      </style>
      <div class="pc-grid">
        <div class="pc-in" style="display:grid">${box("input")}</div>
        <div class="pc-cpu" style="display:grid">${box("cpu")}</div>
        <div class="pc-ram" style="display:grid">${box("ram")}</div>
        <div class="pc-disk" style="display:grid">${box("disk")}</div>
        <div class="pc-out" style="display:grid">${box("output")}</div>
      </div>
      <div class="grid2">
        <div class="card"><h4>${p.name}</h4><p style="margin:0">${p.what}</p><p class="muted" style="margin:0;font-size:14.5px">Examples: ${p.eg}</p></div>
        <div class="card" style="background:var(--violet-soft);border-color:transparent"><h4 style="color:var(--violet)">In the kitchen</h4><p style="margin:0">${p.kitchen}</p></div>
      </div>
      <div class="ctl"><span class="muted" style="font-size:14px">Play a scenario:</span>${Object.entries(flows).map(([k,f])=>`<button type="button" class="btn small ${flow===k?"primary":""}" data-f="${k}">${f.label}</button>`).join("")}</div>
      ${flow?`<div class="viz-note"><b>Step ${step+1} of ${flows[flow].steps.length}:</b> ${flows[flow].steps[step][1]}</div>
      <div class="ctl"><button type="button" class="btn small" data-s="-1" ${step===0?"disabled":""}>← Back</button><button type="button" class="btn small primary" data-s="1" ${step===flows[flow].steps.length-1?"disabled":""}>Next →</button></div>`:""}`;
  }
  el.addEventListener("click", e => {
    const p = e.target.closest("[data-p]"), f = e.target.closest("[data-f]"), s = e.target.closest("[data-s]");
    if (p) { active = p.dataset.p; }
    if (f) { flow = f.dataset.f; step = 0; active = flows[flow].steps[0][0]; }
    if (s) { step += +s.dataset.s; active = flows[flow].steps[step][0]; }
    if (p || f || s) draw();
  });
  draw();
});

/* ---------- widget: 8-bit binary playground ---------- */
GATE.widget("m00-bits", (el) => {
  let bits = [0,1,0,0,0,0,0,1];
  el.classList.add("viz");
  function draw(){
    const val = bits.reduce((a,b)=>a*2+b,0);
    const signed = val >= 128 ? val - 256 : val;
    const ch = val >= 32 && val < 127 ? String.fromCharCode(val) : "(not a printable letter)";
    el.innerHTML = `<div class="viz-title">One byte = 8 bits<span class="sub">Tap a bit to flip it</span></div>
      <style>.bitrow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.bit{display:grid;gap:4px;justify-items:center}
      .bit button{width:48px;height:56px;border-radius:10px;border:2px solid var(--line);background:var(--surface-2);font-family:var(--f-mono);font-size:24px;font-weight:600;cursor:pointer}
      .bit button.on{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}.bit small{font-family:var(--f-mono);font-size:11.5px;color:var(--ink-3)}
      .readout{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}.readout div{background:var(--surface-2);border-radius:10px;padding:10px 12px}
      .readout b{display:block;font-family:var(--f-mono);font-size:22px}.readout span{font-size:12.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}</style>
      <div class="bitrow">${bits.map((b,i)=>`<div class="bit"><button type="button" class="${b?"on":""}" data-i="${i}" aria-label="bit worth ${2**(7-i)}">${b}</button><small>${2**(7-i)}</small></div>`).join("")}</div>
      <div class="viz-note">Value = ${bits.map((b,i)=>b?2**(7-i):null).filter(x=>x!==null).join(" + ") || "0"} = <b>${val}</b></div>
      <div class="readout">
        <div><span>As a number (unsigned)</span><b>${val}</b></div>
        <div><span>As a letter (ASCII)</span><b>${esc(ch)}</b></div>
        <div><span>As signed char (2's complement)</span><b>${signed}</b></div>
        <div><span>Hexadecimal</span><b>0x${val.toString(16).toUpperCase().padStart(2,"0")}</b></div>
      </div>
      <div class="ctl"><button type="button" class="btn small" data-set="65">Make “A” (65)</button><button type="button" class="btn small" data-set="97">Make “a” (97)</button><button type="button" class="btn small" data-set="48">Make “0” (48)</button><button type="button" class="btn small" data-set="255">All ones (255)</button><button type="button" class="btn small" data-set="0">Clear</button></div>`;
  }
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-i]"), s = e.target.closest("[data-set]");
    if (b) bits[+b.dataset.i] ^= 1;
    if (s) { const v = +s.dataset.set; bits = Array.from({length:8},(_,i)=>(v>>(7-i))&1); }
    if (b || s) draw();
  });
  draw();
});

/* ---------- widget: memory as numbered boxes ---------- */
GATE.widget("m00-memory", (el) => {
  const START = 1000, N = 16;
  let mem = Array(N).fill(null), owners = Array(N).fill(null), next = 0, log = [];
  const sizes = {char:1, int:4, double:8};
  el.classList.add("viz");
  function draw(msg){
    el.innerHTML = `<div class="viz-title">RAM as numbered boxes<span class="sub">Each box holds 1 byte and has an address</span></div>
      <div class="field"><label for="m00-type">Type</label><select id="m00-type"><option value="char">char (1 byte)</option><option value="int" selected>int (4 bytes)</option><option value="double">double (8 bytes)</option></select>
      <label for="m00-name">Name</label><input type="text" id="m00-name" value="${["age","marks","x","total","pi"][log.length%5]}" style="width:100px" maxlength="8">
      <label for="m00-val">Value</label><input type="text" id="m00-val" value="${[20,95,7,300,"3.14"][log.length%5]}" style="width:80px" maxlength="8">
      <button type="button" class="btn small primary" data-a="store">Store it</button><button type="button" class="btn small" data-a="clear">Clear memory</button></div>
      <div class="viz-stage">${GATE.arrayHTML(mem.map((v,i)=>owners[i]? (v===null?"·":v) : ""), {addr:{start:START,size:1}, hl:Object.fromEntries(owners.map((o,i)=>[i,o? (o===log[log.length-1]?.name?"active":"visit"):null]).filter(x=>x[1])), ptr:Object.fromEntries(log.map(l=>[l.at-START,l.name]))})}</div>
      <div class="viz-note">${msg || "Pick a type, a name and a value, then press <b>Store it</b>. Watch how many boxes each type uses."}</div>
      ${log.length?`<div class="tablewrap"><table><thead><tr><th>Variable</th><th>Type</th><th>Address (&amp;name)</th><th>Bytes used</th><th>Value</th></tr></thead><tbody>${log.map(l=>`<tr><td><code>${esc(l.name)}</code></td><td>${l.type}</td><td>${l.at}</td><td>${sizes[l.type]}</td><td>${esc(l.val)}</td></tr>`).join("")}</tbody></table></div>`:""}`;
  }
  el.addEventListener("click", e => {
    const a = e.target.closest("[data-a]")?.dataset.a; if (!a) return;
    if (a === "clear") { mem = Array(N).fill(null); owners = Array(N).fill(null); next = 0; log = []; draw(); return; }
    const type = GATE.$("#m00-type", el).value, name = GATE.$("#m00-name", el).value.trim() || "v", val = GATE.$("#m00-val", el).value.trim() || "0";
    const sz = sizes[type];
    if (next + sz > N) { draw(`Not enough free boxes for a ${type} (needs ${sz}). Press <b>Clear memory</b> to start again.`); return; }
    if (log.some(l => l.name === name)) { draw(`A variable called <code>${esc(name)}</code> already exists. In C every variable in the same place needs its own name.`); return; }
    for (let i=0;i<sz;i++){ owners[next+i] = name; mem[next+i] = i===0 ? val : "·"; }
    log.push({name, type, val, at: START+next}); next += sz;
    draw(`<code>${type} ${esc(name)} = ${esc(val)};</code> took ${sz} box${sz>1?"es":""}, starting at address <b>${START+next-sz}</b>. That starting address is what <code>&amp;${esc(name)}</code> gives you in C.`);
  });
  draw();
});

/* ---------- widget: put the instructions in order ---------- */
GATE.widget("m00-order", (el) => {
  const correct = ["Fill the kettle with water","Switch the kettle on","Wait until the water boils","Put a tea bag in the cup","Pour the boiling water into the cup","Wait 3 minutes, then remove the tea bag"];
  let pool = [3,0,5,1,4,2], picked = [], result = null;
  el.classList.add("viz");
  function draw(){
    el.innerHTML = `<div class="viz-title">Be the programmer<span class="sub">Click the steps in the order a robot should do them</span></div>
      <div class="grid2">
        <div><div class="panel-h">Available steps</div><div class="opts">${pool.map(i=>`<button type="button" class="opt" data-add="${i}"><span class="lt">+</span><span class="ot">${correct[i]}</span></button>`).join("") || '<div class="muted">All steps used.</div>'}</div></div>
        <div><div class="panel-h">Your program</div><div class="opts">${picked.map((i,k)=>`<button type="button" class="opt ${result? (result[k]?"correct":"incorrect"):""}" data-rm="${k}"><span class="lt">${k+1}</span><span class="ot">${correct[i]}</span></button>`).join("") || '<div class="muted">Empty. Click a step on the left.</div>'}</div></div>
      </div>
      ${result?`<div class="viz-note">${result.every(Boolean)?"Perfect. Every step is in a sensible order. That is exactly what a program is: <b>precise steps in the right order</b>.":"Some steps (in red) are in the wrong place. A robot would happily pour cold water or wait for nothing. Computers do exactly what you say, in exactly that order. Click a step to remove it and try again."}</div>`:""}
      <div class="ctl"><button type="button" class="btn small primary" data-a="check" ${picked.length<correct.length?"disabled":""}>Check my order</button><button type="button" class="btn small" data-a="reset">Start over</button></div>`;
  }
  el.addEventListener("click", e => {
    const add = e.target.closest("[data-add]"), rm = e.target.closest("[data-rm]"), a = e.target.closest("[data-a]")?.dataset.a;
    if (add) { const i = +add.dataset.add; pool = pool.filter(x=>x!==i); picked.push(i); result = null; }
    else if (rm) { const k = +rm.dataset.rm; pool.push(picked[k]); picked.splice(k,1); result = null; }
    else if (a === "check") result = picked.map((i,k)=>i===k);
    else if (a === "reset") { pool = [3,0,5,1,4,2]; picked = []; result = null; }
    else return;
    draw();
  });
  draw();
});

/* ---------- pipeline frames ---------- */
const stage = (names, on, note) => `<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center">${names.map((n,i)=>`<div class="cell ${i===on?"is-active":i<on?"is-done":""}" style="border-radius:10px;min-width:auto;padding:0 12px;font-family:var(--f-body);font-size:14px">${n}</div>${i<names.length-1?'<span style="color:var(--ink-3)">→</span>':""}`).join("")}</div>${note||""}`;
const PIPE = ["hello.c","Preprocessor","Compiler","Assembler","Linker","hello.exe","Run"];
const mini = (txt) => `<div class="term" style="max-width:560px;width:100%">${esc(txt)}</div>`;
const pipelineFrames = [
  {html: stage(PIPE,0, C(`#include <stdio.h>\nint main() {\n    printf("Hello, GATE!\\n");\n    return 0;\n}`)), caption:"You write <b>source code</b> in a plain text file ending in <code>.c</code>. To the computer this is just text. The CPU cannot run it yet."},
  {html: stage(PIPE,1, mini("#include <stdio.h> is replaced by the full text of stdio.h\n(the declaration of printf and friends).\nComments are removed. #define names are substituted.")), caption:"The <b>preprocessor</b> handles every line starting with <code>#</code>. It is a text copy-paste step that runs before real compiling."},
  {html: stage(PIPE,2, mini("main:\n    push  rbp\n    lea   rdi, [msg]\n    call  puts\n    mov   eax, 0\n    pop   rbp\n    ret")), caption:"The <b>compiler</b> checks your grammar (syntax) and translates C into <b>assembly</b>, a human-readable form of machine instructions. Spelling and grammar mistakes are caught here as <b>compile-time errors</b>."},
  {html: stage(PIPE,3, mini("01010101 01001000 10001001 11100101\n01001000 10001101 00111101 ...\n(an object file: hello.o / hello.obj)")), caption:"The <b>assembler</b> turns assembly into raw <b>machine code</b>: binary instructions the CPU understands."},
  {html: stage(PIPE,4, mini("hello.o  +  printf's code from the C library\n          ↓\n      one complete program")), caption:"The <b>linker</b> joins your code with ready-made code you used but did not write, like <code>printf</code> from the standard library."},
  {html: stage(PIPE,5, mini("hello.exe   (Windows)\na.out       (Linux / macOS default)")), caption:"The result is an <b>executable</b> file. You can run it again and again without compiling, until you change the source."},
  {html: stage(PIPE,6, mini("Hello, GATE!")), caption:"The operating system loads the executable into RAM and the CPU runs it. Mistakes that only appear now, like dividing by zero, are <b>run-time errors</b>."}
];

GATE.module({
  id: "m00",
  level: "Absolute beginner",
  minutes: 150,
  summary: "Before any C, you need a picture of what a computer is, where data lives, what “code” means and how it turns into something the machine runs. This module builds that picture from nothing.",
  objectives: [
    "Name the main parts of a computer and explain what each one does, with an everyday analogy",
    "Explain bits, bytes and binary, and convert small numbers between binary and decimal",
    "Describe memory as numbered boxes with addresses, the idea that pointers are built on",
    "Explain what a program, a programming language, a compiler and an IDE are",
    "Read, write and step through your first C program and explain every line",
    "Tell compile-time errors from run-time errors, and know the four regions of a running program's memory"
  ],
  lessons: [
  {
    id: "l1", title: "What is a computer, really?", short: "Computers", minutes: 15,
    html: `
<p class="big-idea">A computer is a machine that follows a list of very simple instructions, extremely fast, and never gets bored.</p>
<p>That is all. A computer is not clever. It cannot guess what you meant. It can only do tiny things like <em>add two numbers</em>, <em>compare two numbers</em>, or <em>copy a number from one place to another</em>. It does billions of them per second, and that speed is what makes it look smart.</p>
<p>Every computer, from your phone to a supercomputer, has the same basic plan: it takes <b>input</b>, <b>processes</b> it, <b>stores</b> things while it works, and produces <b>output</b>.</p>
<div data-widget="m00-parts"></div>
<h3>The parts you must know</h3>
<div class="tablewrap"><table><thead><tr><th>Part</th><th>Job</th><th>Keeps data when power is off?</th><th>Speed</th></tr></thead><tbody>
<tr><td><b>CPU</b></td><td>Runs instructions, one after another</td><td>No</td><td>Fastest</td></tr>
<tr><td><b>RAM</b> (main memory)</td><td>Holds the running program and its data</td><td>No (volatile)</td><td>Fast</td></tr>
<tr><td><b>Storage</b> (SSD/HDD)</td><td>Holds files and installed programs</td><td>Yes (non-volatile)</td><td>Much slower</td></tr>
<tr><td><b>Input / Output</b></td><td>Move data in from you and out to you</td><td>-</td><td>-</td></tr>
</tbody></table></div>
<div class="callout analogy"><p>A restaurant kitchen. The <b>chef</b> is the CPU. The <b>counter</b> is RAM: small, but everything the chef is working on is right there. The <b>pantry</b> is storage: big, but slow to walk to. The <b>recipe</b> is the program. The chef follows the recipe one line at a time and never skips or improvises.</p></div>
<h3>And the operating system?</h3>
<p>The <b>operating system</b> (Windows, Linux, macOS, Android) is itself a program, the manager of the kitchen. It decides which program gets the CPU, gives each program its own part of RAM, and talks to the keyboard, screen and disk. When you “run” your C program, you are really asking the operating system to load it into RAM and let the CPU execute it.</p>
<div class="callout key"><p>In this simplified model, executable instructions and data are loaded into memory. Real processors usually fetch through caches, and operating systems can load pages on demand. The CPU fetches an instruction, executes it, then proceeds. This <b>fetch → execute</b> cycle is the heartbeat of every computer.</p></div>
<div data-check="0"></div>`,
    checks: [
      {type:"mcq", q:"You are writing an essay and the power suddenly goes off. You had **not** saved it. Why is the essay lost?",
       options:["The CPU forgot it","It was only in RAM, which is volatile","The SSD deleted it","The keyboard didn't send it"],
       answer:1, explain:"Unsaved work lives in RAM. RAM needs power to keep its contents, so it is **volatile**. Saving copies it to storage (SSD/HDD), which keeps data without power."}
    ]
  },
  {
    id: "l2", title: "Bits, bytes and binary", short: "Binary", minutes: 20,
    html: `
<p>Inside the computer there are no letters, pictures or songs. There are only billions of tiny electronic switches, each either <b>off</b> or <b>on</b>. We write off as <code>0</code> and on as <code>1</code>. One switch is called a <b>bit</b> (binary digit).</p>
<div class="callout analogy"><p>A row of light switches. One switch can show 2 patterns (off, on). Two switches can show 4 patterns (00, 01, 10, 11). Every extra switch <b>doubles</b> the number of patterns. With 8 switches you get 2⁸ = <b>256</b> patterns.</p></div>
<h3>Counting in binary</h3>
<p>In everyday decimal, each place is worth 10 times the place to its right (1, 10, 100...). In binary, each place is worth <b>2 times</b> the place to its right: 1, 2, 4, 8, 16, 32, 64, 128. To read a binary number, add up the place values wherever there is a 1.</p>
<div class="tablewrap"><table><thead><tr><th>Binary</th><th>Working</th><th>Decimal</th></tr></thead><tbody>
<tr><td><code>0101</code></td><td>4 + 1</td><td>5</td></tr>
<tr><td><code>1010</code></td><td>8 + 2</td><td>10</td></tr>
<tr><td><code>01000001</code></td><td>64 + 1</td><td>65</td></tr>
<tr><td><code>11111111</code></td><td>128+64+32+16+8+4+2+1</td><td>255</td></tr>
</tbody></table></div>
<div data-widget="m00-bits"></div>
<h3>Bytes, and why the same bits can mean different things</h3>
<p>8 bits make one <b>byte</b>, the basic unit of memory. Look at the playground above: the same pattern <code>01000001</code> can be read as the number 65 <em>or</em> the letter “A”. The bits do not know what they mean. <mark>The program decides how to read them</mark>, and in C that decision is called the <b>data type</b>. You will meet <code>int</code>, <code>char</code> and friends in Module 01.</p>
<div class="callout info"><p><b>ASCII</b> is the agreed code that maps numbers to characters: 'A' is 65, 'a' is 97, '0' (the digit character) is 48. You don't need to memorise the table, but remembering these three makes many GATE tracing questions faster.</p></div>
<h3>Bigger units</h3>
<p>1 KiB = 2¹⁰ = 1024 bytes, 1 MiB = 2²⁰ bytes, 1 GiB = 2³⁰ bytes. Decimal units use 1 kB = 1000 bytes. Some exam questions use KB for 1024 bytes; follow their stated convention. With <i>n</i> bits you can make 2<sup>n</sup> different patterns, so <i>n</i> unsigned bits store numbers 0 to 2<sup>n</sup>−1.</p>
<div class="callout tip"><p>GATE questions rely on these basics: the range of a <code>char</code>, overflow of an <code>unsigned int</code>, sizes in pointer arithmetic. The rule <b>n bits → 2<sup>n</sup> values</b> appears everywhere.</p></div>
<div data-check="0"></div>`,
    checks: [
      {type:"nat", q:"What is the decimal value of the binary number `1101`?", answer:13, explain:"Place values from the right are 1, 2, 4, 8. The ones are at 8, 4 and 1: 8 + 4 + 1 = **13**."}
    ]
  },
  {
    id: "l3", title: "Memory: numbered boxes", short: "Memory", minutes: 15,
    html: `
<p>RAM is one long row of bytes. Each byte has a number, its <b>address</b>, just like houses on a street. The CPU never says “get me the variable called <code>age</code>”. It says “get me what is in box 1000”. Names are for humans; addresses are for the machine.</p>
<div data-widget="m00-memory"></div>
<div class="callout analogy"><p>A hostel corridor with numbered rooms. A <b>variable</b> is a guest. The guest's <b>name</b> is how you talk about them; the <b>room number</b> (address) is how you actually find them. A big guest (a <code>double</code>) needs 8 rooms in a row; a small one (a <code>char</code>) needs only 1.</p></div>
<h3>Three facts to carry forward</h3>
<ol>
<li>A <b>variable</b> is a named group of memory boxes that holds a value.</li>
<li>Every variable has an <b>address</b>: the number of its first box. In C, <code>&amp;age</code> means “the address of <code>age</code>”.</li>
<li>Different <b>types</b> use different numbers of boxes. On typical GATE assumptions, <code>char</code> = 1 byte and <code>int</code> = 4 bytes (GATE questions usually say so if it matters).</li>
</ol>
<div class="callout key"><p>Pointers, arrays, linked lists, trees: almost everything in this course is built on this one picture of <b>values sitting in numbered boxes</b>. If pointers ever feel confusing later, come back and draw the boxes.</p></div>
<div data-check="0"></div>`,
    checks: [
      {type:"nat", q:"An `int` takes 4 bytes. Three `int` variables are stored one after another starting at address 2000. What is the address of the **third** one?", answer:2008, explain:"First at 2000 (uses 2000 to 2003), second at 2004, third at **2008**. Each one starts 4 bytes after the previous one. This is exactly how array addresses work in Module 06."}
    ]
  },
  {
    id: "l4", title: "What is a program? What is code?", short: "Code", minutes: 15,
    html: `
<p>A <b>program</b> is a list of instructions that tells the computer exactly what to do, step by step. <b>Code</b> (or <b>source code</b>) is that list written down in a programming language. <b>Programming</b> is the skill of breaking a task into steps so precise that a machine with zero common sense can follow them.</p>
<div data-widget="m00-order"></div>
<h3>Algorithm vs program</h3>
<p>An <b>algorithm</b> is the idea: the step-by-step method, in any language, even English. A <b>program</b> is that algorithm written in a programming language so a computer can run it. “Look at each number and remember the biggest one so far” is an algorithm. The C code that does it is a program.</p>
<h3>Why not just write in English?</h3>
<p>English is ambiguous (“I saw a man with a telescope”). The CPU only understands <b>machine code</b>, which is binary, and every CPU family has its own. Writing binary by hand is painful, so we use <b>programming languages</b>: precise, readable languages that a tool translates into machine code.</p>
<div class="tablewrap"><table><thead><tr><th>Level</th><th>Looks like</th><th>Who reads it</th></tr></thead><tbody>
<tr><td>High-level (C, Python, Java)</td><td><code>total = a + b;</code></td><td>Humans, easily</td></tr>
<tr><td>Assembly</td><td><code>ADD R1, R2</code></td><td>Humans, with effort</td></tr>
<tr><td>Machine code</td><td><code>00000001 11010001</code></td><td>The CPU</td></tr>
</tbody></table></div>
<h3>Why C, and why GATE uses it</h3>
<p>C was created by Dennis Ritchie at Bell Labs in the early 1970s to write the Unix operating system. It is close to the hardware: you can see memory, addresses and bytes directly. That is exactly why GATE uses it. Questions test whether you understand <em>what actually happens in memory</em>, not just whether you can write code.</p>
<div class="callout info"><p>GATE is an objective exam rather than a coding submission contest; questions may still ask you to choose or fill in correct code. It shows you C code and asks <b>what it prints</b>, <b>what value a variable ends with</b>, or <b>which statement is true</b>. So the core skill is <b>tracing</b>: running the code in your head (or on paper) line by line. Every module here trains that skill.</p></div>
<div data-check="0"></div>`,
    checks: [
      {type:"msq", q:"Which of these statements are true? (Select all that apply.)",
       options:["The CPU directly understands C code","An algorithm can be written in plain English","Machine code is made of binary instructions","GATE programming questions are mostly about predicting what code does"],
       answer:[1,2,3], explain:"The CPU only understands **machine code**; C must be translated first. The other three are true. An algorithm is the method in any language, and GATE mostly asks you to trace code and predict output."}
    ]
  },
  {
    id: "l5", title: "Compilers, IDEs and how code becomes a program", short: "Compiler & IDE", minutes: 20,
    html: `
<p>A <b>compiler</b> is a translator program. It reads your whole C source file and produces a machine-code file that the CPU can run. For C, the most common compiler is <b>GCC</b>.</p>
<div data-widget="frames" data-ref="pipe"></div>
<h3>Two kinds of mistakes</h3>
<div class="grid2">
<div class="card"><h4>Compile-time error</h4><p>The compiler refuses to translate. Usually grammar: a missing <code>;</code>, an unknown name, mismatched braces. Nothing runs until you fix it.</p></div>
<div class="card"><h4>Run-time error</h4><p>The program compiled fine but fails while running: dividing by zero, reading memory you don't own (a “segmentation fault”), an infinite loop.</p></div>
</div>
<div class="callout info"><p>There is a third kind: the <b>logic error</b>. The program runs and prints something, but the wrong thing, because the steps are wrong. No tool can catch this for you. Tracing can.</p></div>
<h3>Compiler vs interpreter</h3>
<p>A compiler translates the <em>whole</em> program once, ahead of time (C, C++). An <b>interpreter</b> reads and runs the program line by line every time (classic Python). Compiled programs usually run faster.</p>
<h3>What is an IDE?</h3>
<p>An <b>IDE</b> (Integrated Development Environment) is an app that bundles everything a programmer needs in one window: a <b>text editor</b> with colours and auto-complete, a button that <b>compiles and runs</b>, an <b>output window</b>, and a <b>debugger</b> that lets you pause the program and look at variables, which is like the step-through panels in this course.</p>
<div class="grid3">
<div class="card"><h4>Online, zero setup</h4><p>Search “online C compiler”: <a href="https://www.onlinegdb.com/online_c_compiler" target="_blank" rel="noopener">OnlineGDB</a> or <a href="https://www.programiz.com/c-programming/online-compiler/" target="_blank" rel="noopener">Programiz</a>. Type, press Run. Best for starting today.</p></div>
<div class="card"><h4>Simple desktop IDE</h4><p><b>Code::Blocks</b> (Windows download that includes the GCC compiler). One install, then File → New → Empty file, save as <code>.c</code>, Build and Run.</p></div>
<div class="card"><h4>Professional setup</h4><p><b>VS Code</b> + the C/C++ extension + GCC (MinGW on Windows). More setup, used in industry.</p></div>
</div>
<div class="callout try"><p>Open an online C compiler now and keep it in another tab. Whenever this course shows a program, type it in and run it. Change a number and run again. Breaking things on purpose is one of the fastest ways to learn.</p></div>
<div data-check="0"></div>`,
    data: { pipe: { title: "From hello.c to running program", sub: "The build pipeline", frames: pipelineFrames, align: "stretch" } },
    checks: [
      {type:"mcq", q:"You forgot a semicolon at the end of a line. When will you find out?",
       options:["When the program prints wrong output","During compilation, as a compile-time error","Only when you restart the computer","Never: C ignores missing semicolons"],
       answer:1, explain:"A missing `;` breaks C's grammar (syntax). The compiler checks syntax before producing a program, so you get a **compile-time error** and nothing runs."}
    ]
  },
  {
    id: "l6", title: "Your first C program, line by line", short: "First program", minutes: 25,
    html: `
<p>Here is the traditional first program. It prints a message on the screen. A complete hosted C program uses an entry point called main. Exam questions may show only a fragment and leave this surrounding code implicit.</p>
${C(`#include <stdio.h>

int main() {
    printf("Hello, GATE!\\n");
    return 0;
}`)}
<div class="tablewrap"><table><thead><tr><th>Line</th><th>What it means</th></tr></thead><tbody>
<tr><td><code>#include &lt;stdio.h&gt;</code></td><td>“Paste in the standard input/output declarations.” This is where <code>printf</code> is declared. Lines starting with <code>#</code> are for the preprocessor.</td></tr>
<tr><td><code>int main()</code></td><td>Every C program starts running at a function called <code>main</code>. <code>int</code> says main gives back a whole number when it ends.</td></tr>
<tr><td><code>{ ... }</code></td><td>Curly braces group statements into a <b>block</b>, here the body of <code>main</code>.</td></tr>
<tr><td><code>printf("...");</code></td><td>A function call that prints text. The text in double quotes is a <b>string</b>. <code>\\n</code> means “new line”.</td></tr>
<tr><td><code>;</code></td><td>Ends a statement, like a full stop ends a sentence.</td></tr>
<tr><td><code>return 0;</code></td><td>Ends <code>main</code> and tells the operating system “finished successfully”.</td></tr>
</tbody></table></div>
<h3>Step through a slightly bigger program</h3>
<p>This one stores numbers in variables, does arithmetic, and prints the result. Press <b>Next</b> and watch the right-hand side: the <b>Variables</b> panel is RAM, and the <b>Screen output</b> panel is what you would see.</p>
<div data-widget="trace" data-ref="t1"></div>
<h3>How printf prints numbers</h3>
<p>Inside the quotes, <code>%d</code> is a <b>placeholder</b>, a hole that gets filled with an integer value given after the comma. <code>printf("%d + %d = %d", a, b, sum)</code> fills the three holes with a, b and sum in order. You will learn all the placeholders in Module 01.</p>
<div class="callout trap"><p>C is <b>case-sensitive</b>: <code>Main</code>, <code>PRINTF</code> and <code>Printf</code> are all different (and wrong). <code>sum</code> and <code>Sum</code> are two different variables.</p></div>
<div class="callout try"><p>In your online compiler, type the program above. Then change <code>b = 7</code> to <code>b = 70</code>, run it, and predict the output <em>before</em> you look. That prediction habit is the whole GATE game.</p></div>
<h3>Comments</h3>
<p>Text the compiler ignores, written for humans: <code>// until the end of the line</code> or <code>/* across many lines */</code>. GATE code rarely has comments, so you will often add your own notes while tracing on paper.</p>
<div data-check="0"></div>`,
    data: {
      t1: {
        title: "Tracing a C program",
        code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = 7;
    int sum = a + b;
    printf("%d + %d = %d\\n", a, b, sum);
    a = a * 2;
    printf("a is now %d\\n", a);
    return 0;
}`,
        steps: [
          {line:3, note:"The program starts running at `main`. No variables exist yet."},
          {line:4, vars:{a:5}, note:"`int a = 5;` creates a box called **a** (4 bytes) and puts 5 in it."},
          {line:5, vars:{b:7}, note:"Another box, **b**, holding 7."},
          {line:6, vars:{sum:12}, note:"The CPU reads a (5) and b (7), adds them, and stores 12 in a new box **sum**. The right side is worked out first, then stored on the left."},
          {line:7, out:"5 + 7 = 12\n", note:"`printf` fills each `%d` with the next value: a, then b, then sum. `\\n` moves to a new line."},
          {line:8, vars:{a:10}, note:"`a = a * 2` does **not** mean a equals 2a in maths. It means: read a (5), multiply by 2, store the result back into a. The old 5 is overwritten."},
          {line:9, out:"a is now 10\n", note:"sum is still 12. Changing a later does not update sum. Each statement runs once, in order."},
          {line:10, note:"`return 0;` ends main. The program is finished."}
        ]
      }
    },
    checks: [
      {type:"mcq", q:"What does this program print?", code:`#include <stdio.h>
int main() {
    int x = 3;
    int y = x + 4;
    x = 10;
    printf("%d %d", x, y);
    return 0;
}`, options:["3 7","10 14","10 7","3 14"], answer:2,
       explain:"`y` gets 3 + 4 = 7 at the moment line 4 runs. Changing `x` to 10 later does **not** change `y`. Output: **10 7**."}
    ]
  },
  {
    id: "l7", title: "What happens in memory when a program runs", short: "Program memory", minutes: 15,
    html: `
<p>When the operating system loads your program into RAM, it gives the program a region of memory and divides it into four areas. You don't need the details yet, but the names come up again and again in later modules.</p>
<div class="viz"><div class="viz-title">A running C program's memory<span class="sub">Low addresses at the bottom</span></div>
<style>.seg{display:grid;grid-template-columns:150px 1fr;gap:0;border:2px solid var(--ink-3);border-radius:12px;overflow:hidden;max-width:620px;margin:0 auto;width:100%}
.seg>div{padding:12px 14px;border-bottom:1.5px solid var(--line)}.seg .n{font-family:var(--f-mono);font-weight:600;background:var(--surface-2)}
.seg .grow{font-size:13px;color:var(--ink-3);text-align:center;background:var(--surface);border-bottom-style:dashed}
.seg>div:nth-last-child(-n+2){border-bottom:0}@media(max-width:500px){.seg{grid-template-columns:1fr}}</style>
<div class="seg">
<div class="n" style="color:var(--accent)">Stack</div><div>Local variables and function calls. Each time a function is called, a <b>stack frame</b> is pushed; when it returns, the frame is popped. Key for <b>Module 03 and Recursion</b>.</div>
<div class="grow" style="grid-column:1/-1">Typical conceptual layout; actual layout and growth directions depend on the implementation</div>
<div class="n" style="color:var(--ok)">Heap</div><div>Memory you ask for while running with <code>malloc</code> and give back with <code>free</code>. Used for <b>linked lists and trees</b>.</div>
<div class="n" style="color:var(--warn)">Data</div><div>Global variables and <code>static</code> variables. They live for the whole run of the program.</div>
<div class="n" style="color:var(--violet)">Code (text)</div><div>The machine instructions of your program. Read-only.</div>
</div></div>
<div class="callout analogy"><p>The <b>stack</b> is a pile of plates: you can only add or remove the top plate, which is exactly how function calls nest. The <b>heap</b> is a warehouse where you rent space by request and must return it yourself.</p></div>
<h3>How GATE questions look</h3>
<p>Here is the style you are training for. Don't worry if you can't answer it yet. By Module 03 you will in seconds.</p>
${C(`#include <stdio.h>
int main() {
    int i = 1, s = 0;
    while (i <= 4) {
        s = s + i;
        i = i + 1;
    }
    printf("%d", s);
    return 0;
}`)}
<p>“The output of the program is ______.” (a numerical-answer type, NAT, question). The method is always the same: <b>make a table of variables and update it one line at a time</b>.</p>
<details><summary>See the trace table</summary>
<div class="tablewrap"><table><thead><tr><th>Check i ≤ 4?</th><th>s after s = s + i</th><th>i after i = i + 1</th></tr></thead><tbody>
<tr><td>1 ≤ 4 yes</td><td>1</td><td>2</td></tr><tr><td>2 ≤ 4 yes</td><td>3</td><td>3</td></tr><tr><td>3 ≤ 4 yes</td><td>6</td><td>4</td></tr><tr><td>4 ≤ 4 yes</td><td>10</td><td>5</td></tr><tr><td>5 ≤ 4 no, stop</td><td colspan="2">prints <b>10</b></td></tr></tbody></table></div>
</details>
<div class="callout key"><p>GATE CSE questions come in three formats: <b>MCQ</b> (one correct option, negative marking), <b>MSQ</b> (one or more correct, no negative marking), and <b>NAT</b> (type a number, no negative marking). This course uses all three so you get used to them.</p></div>
<div data-check="0"></div>`,
    checks: [
      {type:"mcq", q:"Which memory area holds the local variables of a function that is currently running?", options:["Code (text)","Data","Heap","Stack"], answer:3,
       explain:"Each function call gets a **stack frame** holding its local variables. Globals and statics are in the data area; `malloc` memory is on the heap."}
    ]
  }
  ],
  notes: `# Module 00 · How Computers & Code Work

## The big picture
- A computer follows **simple instructions** (add, compare, copy) **very fast**, one after another.
- Plan of every computer: **Input → Process (CPU) → Store (RAM / storage) → Output**.
- The **operating system** loads programs into RAM and shares the CPU between them.

## Parts of a computer
| Part | Job | Volatile? | Analogy |
|---|---|---|---|
| CPU | Executes instructions (fetch → execute cycle) | - | Chef |
| RAM | Holds the running program + its data | **Yes** | Kitchen counter |
| Storage (SSD/HDD) | Files & installed programs | No | Pantry |
| I/O devices | Keyboard, mouse / screen, speaker | - | Waiter / plate |

> Programs **run from RAM**. Storage is permanent but slow; RAM is fast but loses everything without power.

## Bits & bytes
- **Bit** = 0 or 1. **Byte** = 8 bits. n bits → **2ⁿ patterns** → unsigned range **0 … 2ⁿ − 1**.
- Binary place values: 128 64 32 16 8 4 2 1. Example: \`1101\` = 8+4+1 = **13**.
- 1 KiB = 2¹⁰ B, 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B. Decimal kB means 1000 bytes; read the question’s convention.
- Same bits, different meaning: \`01000001\` = 65 = 'A'. **The data type decides the meaning.**
- ASCII anchors: **'A' = 65, 'a' = 97, '0' = 48**. (lowercase = uppercase + 32)

## Memory = numbered boxes
- RAM is a row of bytes, each with an **address**.
- A **variable** = a named group of boxes. Its address = address of its first byte (\`&x\` in C).
- Typical sizes (GATE usually states them): \`char\` 1 B, \`int\` 4 B, \`double\` 8 B.
- Consecutive ints from 2000 → 2000, 2004, 2008, …

## Programs & languages
- **Algorithm** = the step-by-step method (any language). **Program** = algorithm written in a programming language.
- Levels: high-level (C) → assembly → **machine code** (binary, the only thing a CPU runs).
- GATE tests **tracing**: predicting output and final values of variables. Code selection and completion can also be tested.

## From source to running program
\`\`\`text
hello.c → Preprocessor (#include, #define, removes comments)
        → Compiler (syntax check, C → assembly)
        → Assembler (assembly → machine code, .o/.obj)
        → Linker (joins library code like printf)
        → executable (a.out / .exe) → loaded into RAM → CPU runs it
\`\`\`
- **Compile-time error**: grammar/syntax (missing \`;\`, undeclared name). Nothing runs.
- **Run-time error**: crashes while running (divide by zero, segmentation fault).
- **Logic error**: runs, but wrong answer.
- **Compiler** translates whole program ahead of time; **interpreter** runs line by line.
- **IDE** = editor + compile/run button + output + **debugger**. Try: OnlineGDB / Programiz (online), Code::Blocks, VS Code + GCC.

## First C program
\`\`\`c
#include <stdio.h>      // declarations for printf
int main() {            // execution starts here
    printf("Hello\\n");  // \\n = new line
    return 0;           // 0 = success
}
\`\`\`
- Statements end with \`;\`. Blocks use \`{ }\`. C is **case-sensitive**.
- \`x = x * 2\` means *compute the right side, store it in x*. It is not an equation.
- A variable assigned from another (\`y = x + 4\`) keeps its value even if \`x\` changes later.
- \`%d\` in printf = placeholder for an int, filled left to right.

## Memory of a running program
| Area | Holds |
|---|---|
| **Stack** | Local variables, function call frames (push on call, pop on return) |
| **Heap** | \`malloc\`/\`free\` memory (linked lists, trees) |
| **Data** | Globals and \`static\` variables (live for whole run) |
| **Code** | Machine instructions (read-only) |

## GATE question formats
- **MCQ**: one correct, negative marking (−1/3 for 1-mark, −2/3 for 2-mark).
- **MSQ**: one or more correct, no negative, no partial credit.
- **NAT**: type a number, no negative.
- Universal method for code questions: **draw a variable table and update it line by line.**
`,
  revision: [
    {type:"mcq", q:"Which part of a computer actually executes the instructions of a program?", options:["RAM","SSD","CPU","Monitor"], answer:2, explain:"The **CPU** fetches and executes instructions. RAM only holds them; the SSD stores them permanently."},
    {type:"mcq", q:"A program is stored on the SSD. What must happen before the CPU can run it?", options:["Nothing, the CPU runs it directly from the SSD","It is copied into RAM by the operating system","It is printed","It is converted to ASCII"], answer:1, explain:"The CPU fetches instructions from **RAM**. The operating system loads (copies) the executable from storage into RAM first."},
    {type:"nat", q:"How many different values can be stored in **10 bits**?", answer:1024, explain:"n bits give 2ⁿ patterns. 2¹⁰ = **1024**."},
    {type:"nat", q:"Convert the binary number `00110010` to decimal.", answer:50, explain:"Ones at place values 32, 16 and 2: 32 + 16 + 2 = **50**. (Also the ASCII code of the character '2'.)"},
    {type:"mcq", q:"The ASCII code of 'A' is 65. What is the ASCII code of 'D'?", options:["67","68","100","69"], answer:1, explain:"Letters are consecutive: A=65, B=66, C=67, **D=68**."},
    {type:"msq", q:"Which of the following are **compile-time** errors? (Select all that apply.)", options:["Missing semicolon","Dividing by a variable that is 0 while the program runs","Using a variable name that was never declared","A loop that never ends"], answer:[0,2], explain:"Syntax problems (missing `;`) and undeclared names are caught by the compiler. Division by zero and infinite loops only show up **while running**."},
    {type:"mcq", q:"Which step in the build pipeline joins your code with the code for `printf` from the C library?", options:["Preprocessor","Compiler","Assembler","Linker"], answer:3, explain:"The **linker** combines object files and library code into one executable. The preprocessor only pastes in the *declaration* from stdio.h."},
    {type:"mcq", q:"What does this print?", code:`#include <stdio.h>
int main() {
    int a = 4;
    int b = a * 3;
    a = a + 1;
    b = b - a;
    printf("%d %d", a, b);
    return 0;
}`, options:["5 7","4 12","5 12","5 8"], answer:0, explain:"a=4 → b=12 → a=5 → b = 12 − 5 = 7. Output **5 7**."},
    {type:"nat", q:"Four `int` variables (4 bytes each) are stored back-to-back starting at address 500. What is the address of the **last byte** used by the fourth variable?", answer:515, explain:"They start at 500, 504, 508, 512. The fourth uses bytes 512, 513, 514, **515**."},
    {type:"mcq", q:"Which memory area holds memory obtained with `malloc`?", options:["Stack","Heap","Code","Registers"], answer:1, explain:"`malloc` allocates from the **heap**. Locals go on the stack; globals and statics go in the data area."}
  ],
  pyqNote: "This prerequisite module teaches computer basics and IDE vocabulary. There is no meaningful set of ten direct GATE Programming PYQs on these exact introductory topics. Finish the ten revision questions, then start the sourced C question bank in Module 01.",
  pyqs: []
});
})();
