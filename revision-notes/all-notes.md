# Module 00 · How Computers & Code Work

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
- Binary place values: 128 64 32 16 8 4 2 1. Example: `1101` = 8+4+1 = **13**.
- 1 KiB = 2¹⁰ B, 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B. Decimal kB means 1000 bytes; read the question’s convention.
- Same bits, different meaning: `01000001` = 65 = 'A'. **The data type decides the meaning.**
- ASCII anchors: **'A' = 65, 'a' = 97, '0' = 48**. (lowercase = uppercase + 32)

## Memory = numbered boxes
- RAM is a row of bytes, each with an **address**.
- A **variable** = a named group of boxes. Its address = address of its first byte (`&x` in C).
- Typical sizes (GATE usually states them): `char` 1 B, `int` 4 B, `double` 8 B.
- Consecutive ints from 2000 → 2000, 2004, 2008, …

## Programs & languages
- **Algorithm** = the step-by-step method (any language). **Program** = algorithm written in a programming language.
- Levels: high-level (C) → assembly → **machine code** (binary, the only thing a CPU runs).
- GATE tests **tracing**: predicting output and final values of variables. Code selection and completion can also be tested.

## From source to running program
```text
hello.c → Preprocessor (#include, #define, removes comments)
        → Compiler (syntax check, C → assembly)
        → Assembler (assembly → machine code, .o/.obj)
        → Linker (joins library code like printf)
        → executable (a.out / .exe) → loaded into RAM → CPU runs it
```
- **Compile-time error**: grammar/syntax (missing `;`, undeclared name). Nothing runs.
- **Run-time error**: crashes while running (divide by zero, segmentation fault).
- **Logic error**: runs, but wrong answer.
- **Compiler** translates whole program ahead of time; **interpreter** runs line by line.
- **IDE** = editor + compile/run button + output + **debugger**. Try: OnlineGDB / Programiz (online), Code::Blocks, VS Code + GCC.

## First C program
```c
#include <stdio.h>      // declarations for printf
int main() {            // execution starts here
    printf("Hello\n");  // \n = new line
    return 0;           // 0 = success
}
```
- Statements end with `;`. Blocks use `{ }`. C is **case-sensitive**.
- `x = x * 2` means *compute the right side, store it in x*. It is not an equation.
- A variable assigned from another (`y = x + 4`) keeps its value even if `x` changes later.
- `%d` in printf = placeholder for an int, filled left to right.

## Memory of a running program
| Area | Holds |
|---|---|
| **Stack** | Local variables, function call frames (push on call, pop on return) |
| **Heap** | `malloc`/`free` memory (linked lists, trees) |
| **Data** | Globals and `static` variables (live for whole run) |
| **Code** | Machine instructions (read-only) |

## GATE question formats
- **MCQ**: one correct, negative marking (−1/3 for 1-mark, −2/3 for 2-mark).
- **MSQ**: one or more correct, no negative, no partial credit.
- **NAT**: type a number, no negative.
- Universal method for code questions: **draw a variable table and update it line by line.**


---

# Module 01 · C building blocks
## Core rules
- Declaration introduces a typed object. Assignment stores a computed value.
- Initialize automatic variables before reading them.
- sizeof(char)=1; int size and char signedness are not universal.
- Apply integer promotions first. Arithmetic performed in an unsigned w-bit type wraps modulo 2^w; signed overflow is undefined.
- Integer division truncates toward zero. a=(a/b)*b+a%b for nonzero b when quotient is representable.
- Cast before division to obtain a floating result.
- == compares; = assigns. && and || short-circuit; & and | operate on bits.
- Operator precedence does not specify operand evaluation order.
## GATE procedure
1. Record operand types and all stated machine assumptions.
2. Parenthesize by precedence.
3. Apply promotions/conversions and short-circuit rules.
4. Check undefined behavior before tracing.
5. Update a value table after each full expression.
## I/O
printf: %d int, %u unsigned, %c character, %f double, %zu size_t.
scanf: %d with int*, %f with float*, %lf with double*. Check its return count.
## Recall
Why is 5/2 different from 5.0/2? Why is i++ + i++ not a tracing puzzle?

## Macros and sequencing
Expand macros before applying precedence. Parenthesize parameters and the entire result, but avoid arguments with side effects if a macro repeats them. The comma operator sequences its operands; commas between function arguments do not. sizeof on an ordinary non-VLA expression does not evaluate it.


---

# Module 02 · Decisions and loops
- if tests zero/nonzero. else binds to the nearest unmatched if.
- switch enters at a matching case; execution falls through until break.
- for order: initialize once → test → body → update → test.
- while can run zero times; do/while runs at least once.
- break exits the innermost loop/switch. continue in for still executes its update.
- A loop must make progress on every repeating path.
## Counts
- n successive visits: Θ(n).
- n independent inner visits for n outer visits: Θ(n²).
- 0+1+...+(n−1)=n(n−1)/2.
- 1,2,4,...≤n visits floor(log2 n)+1 values for n≥1.
## Trace checklist
Record initialization, each successful test, body changes, update, final failed test. Treat exact counts and asymptotic growth as different questions.


---

# Module 03 · Functions, scope and storage
- C is call by value, including pointer arguments.
- A parameter is a separate object; dereferencing a copied pointer can change its target.
- Scope = name visibility. Lifetime = when an object exists. Linkage = identity across declarations.
- C uses lexical scope. Caller locals are not visible in a called function merely because of the call.
- Automatic locals are created on entry; static locals persist but retain block scope.
- Static-duration objects without explicit initializers start at zero.
- Do not return addresses of automatic locals.
## Call tracing
Push a frame for each call. Record parameters, locals and the pending return expression. Pop only after the callee returns. Do not invent an argument evaluation order.


---

# Module 04 · Pointers, arrays and strings
- &x gives an address; *p accesses its target. p, *p and &p are different.
- C passes pointers by value. Use pointer-to-pointer to update a caller pointer.
- a[i] means *(a+i). Pointer +1 advances one pointed-to element.
- Pointer subtraction within an array gives element distance.
- One-past may be formed but not dereferenced.
- Arrays are not pointers: sizeof an actual array includes every element; array parameters adjust to pointers.
- String length ends at first zero. char s[]="cat" has size 4 and length 3.
- Modifying string literals is undefined. Leave input capacity for the terminator.
- Struct access: object.member or pointer->member. Account for padding.
- malloc storage is uninitialized; check failure; free once; do not use dangling aliases.
- int a[R][C] is row-major. a decays to a pointer to a row, not int**.
- int *p[3]: array of pointers. int (*p)[3]: pointer to a row.
## Trace routine
Write types, draw live objects, draw arrows, compute each pointer offset in its own element units, then dereference.

## Declarations
const int *p: read-only target through p. int *const p: fixed pointer. int (*fn)(int): function pointer. typedef names a type rather than substituting tokens. A struct has distinct members; a union shares member storage.


---

# Module 05 · Recursion
## Three requirements
Define what the function means, give a correct base case, and make progress toward it.
## Tracing
Keep one frame per unfinished call. Automatic locals are separate; globals and statics are shared. Print-before occurs on descent; print-after occurs on return.
## Complexity
- T(n)=T(n−1)+Θ(1): Θ(n) time and Θ(n) constant-size frames.
- T(n)=T(n/2)+Θ(1): Θ(log n) time/depth.
- T(n)=2T(n/2)+Θ(n): Θ(n log n) time.
- Naive Fibonacci: exponential time, Θ(n) stack depth.
- Total calls and maximum live frames are different quantities.
- Tail-call optimization is not guaranteed by C.
## Proof
Check the base case, assume the smaller call's contract, show how the current step completes it, and prove termination.

## Advanced cost bridges
For fixed a>1,b>1 and constant base cost, T(n)=aT(n/b)+Θ(1) gives Θ(n^log_b(a)). Count only calls on an executable route; worst case chooses the costliest branch. For T(n)=2T(n−1)+n×2^n, divide by 2^n to get S(n)=S(n−1)+n, giving Θ(n²×2^n). Repeated-log input thresholds can be derived backwards by exponentiation, respecting the exact base case.


---

# Module 06 · Arrays and complexity
## Operations
Index Θ(1); unsorted search Θ(n); packed insertion/deletion Θ(n) worst case. Dynamic-array append may be Θ(n) for a resize but Θ(1) amortized with geometric growth.
## Bounds
O upper, Ω lower, Θ tight. Select best/average/worst-case function separately. Auxiliary space excludes input by usual convention.
## Addresses
- 1D: B+(i−L)w.
- Row-major: B+[(i−Lr)C+(j−Lc)]w.
- Column-major: B+[(j−Lc)R+(i−Lr)]w.
- C uses row-major layout.
- Lower triangle row-major (zero-based, diagonal included): offset i(i+1)/2+j, j≤i.
## Binary search
Sorted input; inclusive [lo,hi]; mid=lo+(hi−lo)/2; update to mid−1 or mid+1. Empty interval is lo>hi. Θ(log n) worst-case time, Θ(1) iterative extra space.


---

# Module 07 · Stacks and queues
- Stack: LIFO, push/pop/peek. Array index-top convention uses top=−1 when empty.
- Queue: FIFO, enqueue/dequeue/front.
- Count-based circular queue: empty count=0, full count=capacity; indices wrap modulo capacity.
- One-empty-cell convention: empty front=rear, full (rear+1)%capacity=front; usable capacity is capacity−1.
- Postfix: pop right operand, then left. Finish with exactly one value.
- Infix conversion uses precedence and associativity; parentheses delimit popping.
- Stack permutations are checked by simulation, not just by reversing the whole input.
- Queue from two stacks: transfer input only when output is empty. Θ(n) worst-case dequeue, Θ(1) amortized operations.


---

# Module 08 · Linked lists
- head points to first node; NULL means empty. Nodes need not be contiguous.
- Search/indexing Θ(n) worst case. Insert after known node Θ(1); finding it may cost Θ(n).
- Front insertion: new->next=head; head=new. Check allocation first.
- Deletion: save successor, reconnect predecessor/head, free victim. Update tail as needed.
- Reverse: next=cur->next; cur->next=prev; prev=cur; cur=next. New head=prev.
- Iterative reversal: Θ(n) time, Θ(1) extra space.
- Doubly linked lists maintain both neighbor directions. Circular traversal stops at the starting node.
- Floyd: slow one link, fast two; compare addresses. Θ(n) time and Θ(1) extra space.
## Boundary tests
Empty list, one node, head/middle/tail operation, absent key, repeated values.


---

# Module 09 · Trees and BSTs
Height here counts edges: single node h=0. Tree edges=n−1.
- Binary: at most two ordered children. Full: zero or two. Complete: levels fill left-to-right. Perfect: all leaves at same level and all internal nodes have two children.
- Max nodes at depth d: 2^d. Max nodes at height h: 2^(h+1)−1. Min nodes: h+1.
- n0=n2+1; full tree nodes=2*internal+1; null child pointers=n+1.
- Preorder root-left-right; inorder left-root-right; postorder left-right-root; level order uses a queue.
- BST ordering applies to entire subtrees. Inorder is sorted. Search/insert/delete O(h), worst-case Θ(n) without balancing.
- Two-child deletion uses successor (right minimum) or predecessor (left maximum).
- Inorder+preorder or inorder+postorder reconstructs a distinct-key tree uniquely.
- Catalan Cn counts BST shapes for n distinct keys; C0..C5=1,1,2,5,14,42.


---

# Module 10 · Binary heaps
- Shape: complete binary tree. Max-heap parent≥children; min-heap parent≤children.
- Zero-based: left=2i+1, right=2i+2, parent=floor((i−1)/2) for i>0.
- One-based: children 2i,2i+1; parent=floor(i/2).
- Height floor(log2 n); leaves start at floor(n/2) in zero-based storage.
- Peek Θ(1); insert/delete extreme Θ(log n) worst case; arbitrary-value search Θ(n).
- Insert: append, sift up. Delete root: move last to root, shrink, sift down using larger child in a max-heap.
- Bottom-up build starts at n/2−1 and is Θ(n), not Θ(n log n).
- Heapsort: Θ(n log n) worst-case, Θ(1) iterative auxiliary space, generally unstable.

## Heap counting and conversions
For distinct keys, H(n)=choose(n−1,L) H(L) H(R), H(0)=H(1)=1; L and R follow the complete shape. H(7)=80. Meld heaps by concatenating and building a heap. Merge BSTs by inorder traversal, merging sorted sequences, and recursively selecting middle roots; total linear time with extra arrays. The second maximum is a root child, and a minimum is a leaf. BST→heap can be linear; arbitrary heap→BST is not generally linear in the comparison model because inorder would yield a comparison sort.


---

# Module 11 · Graphs
## Counts and representations
- Undirected sum of degrees=2E. Directed total indegree=total outdegree=E.
- Simple undirected maximum edges V(V−1)/2; tree edges V−1.
- Matrix Θ(V²) space, Θ(1) edge query, Θ(V) neighbor scan.
- List Θ(V+E) space, Θ(degree) neighbor scan. Undirected edges normally appear twice.
## Traversal
- BFS: mark on enqueue, FIFO queue; shortest edge counts in unweighted graphs.
- DFS: recurse/stack, mark on discovery; directed edge to gray indicates a cycle.
- A single start covers only reachable vertices. Repeat for disconnected regions.
- Lists give Θ(V+E) traversal; matrix scans give Θ(V²).
## DAGs
Topological order exists iff directed acyclic. Kahn removes zero-indegree vertices; fewer than V removed means a cycle. Reverse DFS finish order works for a DAG.
## Scope
Representations are core Section 4. Traversals bridge to Section 5. Weighted shortest paths and MSTs need a separate Algorithms treatment.

## Graph exam bridges
(A^r)[u][v] counts length-r walks. For simple undirected graphs, (A²)[u][u]=degree(u), and triangles=trace(A³)/6. A²=I means A is its own inverse and the simple undirected graph is a perfect matching. BFS edges join levels differing by at most one. Undirected DFS has only tree and back edges, with no cross edges. In a connected unweighted undirected graph, a BFS tree height h gives h≤diameter≤2h. A spanning tree has V−1 edges. An MST minimizes total tree weight, not all root-to-vertex paths. A uniquely lightest cut edge is in every MST. Distinct weights imply uniqueness, but are not necessary. Adding constant c to every edge preserves MSTs since all spanning trees gain (V−1)c.
