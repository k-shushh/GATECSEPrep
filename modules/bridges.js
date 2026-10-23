/* Additional C exam bridges; appended before the source question bank. */
(() => {
const G=GATE;
function add(id,title,text,code,check){const m=G.modules[id];m.lessons.push({id:'l'+(m.lessons.length+1),title,short:title.split(':')[0],minutes:30,html:G.md(text)+G.codeBlock(code)+'<div data-check="0"></div>',checks:[check]});m.minutes+=40;m.objectives.push(title);}
add('m01','Macros and precedence: expand before calculating',`Before the compiler analyzes a C program, preprocessing handles directives such as #include and #define. A header supplies declarations and other definitions; including stdio.h tells the compiler about functions such as printf. Linking supplies the compiled library implementations later.

A macro performs token substitution. It is not an ordinary function and does not create parameter objects. With #define SQUARE(x) x*x, SQUARE(2+3) expands to 2+3*2+3, which evaluates to 11. Parenthesize both each use of an argument and the full result: ((x)*(x)). Even then SQUARE(i++) repeats the increment and can cause undefined behavior; prefer a function when arguments have side effects.

Useful precedence groups, from tighter to looser, are postfix operations; unary operations and casts; multiplication/division/remainder; addition/subtraction; shifts; relational comparisons; equality; bitwise AND, XOR, OR; logical AND, OR; conditional ?:; assignment; comma. Most binary arithmetic groups associate left to right; assignment groups right to left. Use parentheses whenever the intended grouping is not obvious.

The **comma operator** evaluates its left operand before its right and yields the right operand's value. A comma separating function arguments is not that operator and does not guarantee argument evaluation order. sizeof normally does not evaluate a non-VLA operand, so sizeof(i++) does not increment an ordinary int i. Variable-length arrays have additional evaluation rules and must be treated separately.`, `#define BAD_SQUARE(x) x*x
#define SQUARE(x) ((x)*(x))
int a = BAD_SQUARE(2+3); /* 11 */
int b = SQUARE(2+3);     /* 25 */
int i = 2;
int c = (i++, i+4);      /* i=3, c=7 */`,{type:'nat',q:'What is BAD_SQUARE(3+1)?',answer:7,explain:'Expansion gives 3+1*3+1. Multiplication first yields 3+3+1=7.'});
G.modules.m01.notes+='\n## Macros and sequencing\nExpand macros before applying precedence. Parenthesize parameters and the entire result, but avoid arguments with side effects if a macro repeats them. The comma operator sequences its operands; commas between function arguments do not. sizeof on an ordinary non-VLA expression does not evaluate it.\n';
add('m04','Reading declarations: const, typedef and callbacks',`Read a declaration from the identifier outward, respecting parentheses. int *p[3] gives an array of three pointers; int (*p)[3] gives a pointer to one three-int row. int (*fn)(int) gives a pointer to a function that receives int and returns int. A callback is a function passed to another function so the latter can call it.

const int *p prevents modifying the pointed-to int through p, but p itself can be reassigned. int *const p fixes the pointer value but allows modification of a non-const target. const int *const p does both. A const-qualified access path does not mean every alias is const, while modifying an object actually defined const through a cast is undefined behavior.

typedef introduces a name for a type; it does not allocate storage or create a separate runtime object. With typedef int *IntPtr, IntPtr a,b declares two pointers. That differs from int *a,b, which declares one pointer and one ordinary int. Expand the type meaning carefully rather than treating typedef as text substitution.

An enum defines integer constants useful for named states. A union shares storage among its members, unlike a struct whose members occupy distinct parts (with possible padding). A union's size must accommodate its largest member and alignment. Reading a different member from the one last written can involve representation-dependent details; do not assume it performs a numeric conversion.`, `int twice(int x) { return 2*x; }
int apply(int (*fn)(int), int x) {
    return fn(x);
}
/* apply(twice, 6) returns 12. */
typedef int *IntPtr;
IntPtr a, b;  /* both are int pointers */`,{type:'mcq',q:'What does const int *p mean?',options:['p cannot be reassigned','The pointed-to value cannot be modified through p','p is an integer constant','p must be NULL'],answer:1,explain:'const qualifies the int reached through p. The pointer variable itself remains reassignable.'});
G.modules.m04.notes+='\n## Declarations\nconst int *p: read-only target through p. int *const p: fixed pointer. int (*fn)(int): function pointer. typedef names a type rather than substituting tokens. A struct has distinct members; a union shares member storage.\n';
add('m05','Exam bridge: solving recursive costs',`This optional first-pass challenge prepares you for the harder recursion-cost PYQs. Revisit it after Module 06 if the growth notation is new. A recurrence describes a quantity using smaller inputs; that quantity might be runtime, number of calls or a returned value. Identify which one before calculating.

In a flowchart, add the work of steps executed sequentially. Between alternative branches, use the larger cost for worst-case analysis. If the longest executable route invokes five calls of size n/2 and does constant other work, its cost is T(n)=5T(n/2)+Θ(1). Do not count calls on mutually exclusive branches as if they all execute.

For T(n)=aT(n/b)+Θ(1), with fixed a>1, b>1 and constant nonzero base cost, the recursion tree has about log_b(n) levels. At depth d there are a^d calls. The leaf count is a^(log_b(n))=n^(log_b(a)). Summing the geometric level counts gives Θ(n^(log_b(a))). For a=5 and b=2, the exponent is log2(5)≈2.322. This shortcut needs these assumptions; a different nonrecursive cost can change the answer.

For a decrementing recurrence with an exponential factor, divide by that factor first. If T(n)=2T(n−1)+n×2^n, set S(n)=T(n)/2^n. Dividing both sides gives S(n)=S(n−1)+n. Unroll: S(n)=S(0)+1+2+...+n=S(0)+n(n+1)/2. Therefore T(n)=Θ(n²×2^n). Normalization turns a difficult-looking recurrence into an ordinary sum.

For a function repeatedly replacing n by floor(log2 n), values shrink much faster than repeated halving. If the base case is n≤1 and a question asks for the smallest input needing a certain number of reductions, work backwards: the smallest input whose floor(log2 n) is k is 2^k. Starting with 1 gives thresholds 1,2,4,16,65536. Check the exact base case and whether the initial call is included before attaching a call count to a threshold.`, `/* Recursive cost reasoning (mathematical notation):
   T(n)=3T(n/2)+1
   depth log2(n); leaves 3^log2(n)
   growth n^log2(3), approximately n^1.585

   S(n)=S(n-1)+n
   S(n)=S(0)+n(n+1)/2 */`,{type:'mcq',q:'For T(n)=4T(n/2)+1 with T(1)=1, what is the tight growth?',options:['Θ(log n)','Θ(n)','Θ(n²)','Θ(2^n)'],answer:2,explain:'The branching formula gives n^log2(4)=n². Nonrecursive work is constant and the leaf cost is nonzero.'});
G.modules.m05.notes+='\n## Advanced cost bridges\nFor fixed a>1,b>1 and constant base cost, T(n)=aT(n/b)+Θ(1) gives Θ(n^log_b(a)). Count only calls on an executable route; worst case chooses the costliest branch. For T(n)=2T(n−1)+n×2^n, divide by 2^n to get S(n)=S(n−1)+n, giving Θ(n²×2^n). Repeated-log input thresholds can be derived backwards by exponentiation, respecting the exact base case.\n';
add('m10','Exam bridge: count heaps and compare conversions',`A heap shape is fixed by its size, but many assignments of keys to that shape satisfy heap order. Assume all keys are distinct. In a max-heap, the largest must be the root. If the left subtree has L nodes and the right subtree R nodes, choose which L of the remaining n−1 keys go left, then independently arrange valid heaps on the two sides.

Write H(n) for the number of heaps. Then H(0)=H(1)=1 and H(n)=choose(n−1,L) × H(L) × H(R). Here choose(a,b) counts subsets of size b from a distinct items. It equals a!/(b!(a−b)!), where factorial means the product from 1 through the argument and 0!=1. The subtree sizes come from the complete shape; they are not arbitrary BST splits.

For seven keys, L=R=3. Three keys have H(3)=choose(2,1)=2 arrangements. Therefore H(7)=choose(6,3)×2×2=20×4=80. For six keys, the last level fills left first, giving L=3 and R=2. This is a useful check against assuming equal subtrees for every heap size.

In a distinct-key max-heap, the second largest key must be a child of the root: any deeper candidate has a larger parent. A smallest key must be a leaf. Finding that smallest key may require examining linearly many leaves.

Converting a BST into a heap is linear: traverse the BST to collect all keys, then build a heap bottom-up. The opposite conversion cannot generally be linear in the comparison model. If it were, we could build a heap from arbitrary keys in linear time, convert it to a BST in linear time, and obtain sorted keys by inorder traversal in linear time. That would contradict the Ω(n log n) comparison-sorting lower bound. This argument concerns arbitrary distinct keys and comparison-based operations; it does not rule out special bounded-integer methods.

To meld two heaps, concatenate their arrays and run bottom-up build-heap on the combined array. Two inputs of n keys each take Θ(n) total time. To merge two BSTs, obtain their sorted inorder sequences, merge those two sequences with two advancing indices, then construct a balanced BST by recursively choosing each interval's middle key as its root. Each phase is linear in the total number of keys. These constructions use extra array storage; they are different from repeatedly inserting every key.`, `/* Heap counts for distinct keys:
   H(0)=1, H(1)=1, H(2)=1, H(3)=2
   H(7)=choose(6,3)*H(3)*H(3)=80
   Shape fixes L and R before keys are assigned. */`,{type:'nat',q:'How many distinct max-heaps can be formed from three distinct keys?',answer:2,explain:'The largest is fixed at the root. The two remaining keys can be assigned to the two child positions in two ways.'});
G.modules.m10.notes+='\n## Heap counting and conversions\nFor distinct keys, H(n)=choose(n−1,L) H(L) H(R), H(0)=H(1)=1; L and R follow the complete shape. H(7)=80. Meld heaps by concatenating and building a heap. Merge BSTs by inorder traversal, merging sorted sequences, and recursively selecting middle roots; total linear time with extra arrays. The second maximum is a root child, and a minimum is a leaf. BST→heap can be linear; arbitrary heap→BST is not generally linear in the comparison model because inorder would yield a comparison sort.\n';
add('m11','Exam bridge: matrix walks, diameter and spanning trees',`These ideas connect graph data structures to graph-theory and Algorithms PYQs. Treat them as a bridge after you understand adjacency matrices and BFS.

Let A be the 0–1 adjacency matrix. Matrix multiplication defines (A²)[u][v] as the sum, over every intermediate vertex k, of A[u][k]×A[k][v]. A product is 1 exactly when u→k→v is a two-edge walk. More generally, (A^r)[u][v] counts walks of exactly r edges. Walks may repeat vertices and edges; they need not be simple paths.

For a simple undirected graph, (A²)[u][u] equals degree(u), because every neighbor provides one out-and-back walk. The trace of a matrix is the sum of its diagonal entries. trace(A³) counts three-edge closed walks. Each undirected triangle contributes six: three choices of starting vertex and two directions. Thus triangle count=trace(A³)/6, only under the simple-undirected assumptions.

The identity matrix I has 1 on its diagonal and 0 elsewhere. A square matrix's inverse A⁻¹, when it exists, satisfies A×A⁻¹=A⁻¹×A=I. Saying A is its own inverse means A²=I. For a simple undirected adjacency matrix, this forces every vertex to have degree one, so the graph consists of disjoint pairs joined by edges. Those edges form a perfect matching: each vertex belongs to exactly one selected edge.

For a connected unweighted undirected graph, distance is the minimum number of edges between vertices. The diameter D is the largest distance over all pairs. A BFS tree rooted at s has height h equal to the largest distance from s. We have h≤D≤2h: one pair already achieves h; any pair u,v can travel via s in at most dist(u,s)+dist(s,v)≤2h steps. This bounds diameter but does not claim that every BFS tree finds an exact diameter pair in an arbitrary graph.

An undirected edge can connect only the same or adjacent BFS levels: a larger gap would provide a shorter route to its farther endpoint. For DFS, tree edges are the edges used to discover new vertices. A back edge leads toward an ancestor; a forward edge is a non-tree edge toward a descendant; a cross edge joins vertices with neither an ancestor nor descendant relationship in the DFS forest. Directed graphs can have all four types. In undirected DFS, each non-tree edge joins an ancestor and descendant and is classified as a back edge; there are no cross edges between separate branches.

A spanning tree is an acyclic connected subgraph containing every vertex. It has V−1 edges. In a connected weighted undirected graph, a minimum spanning tree (MST) minimizes the sum of its edge weights. It differs from a shortest-path tree, which minimizes root-to-vertex distances. A cut partitions the vertices into two nonempty groups. The cut property says a uniquely lightest edge crossing a cut belongs to every MST; a tied lightest edge belongs to some MST.

If all edge weights are distinct, the MST is unique. The converse is false: some graphs with repeated weights still have a unique MST. Adding the same constant c to every edge changes every spanning tree's total by (V−1)c, so it preserves which trees are minimum. It does not necessarily preserve shortest paths, because different paths can use different numbers of edges. Kruskal's algorithm grows a tree by considering edges in increasing weight order and skipping cycle-forming edges; Prim's algorithm repeatedly adds a lightest edge leaving the currently reached vertices. These are orientation for the linked questions, not a replacement for a full Algorithms course.`, `/* Triangle A-B-C-A:
   adjacency matrix:
   0 1 1
   1 0 1
   1 1 0
   diagonal of A^2: 2,2,2 (the degrees)
   trace(A^3)=6, so triangles=6/6=1.

   BFS height h=3 implies 3<=diameter<=6. */`,{type:'nat',q:'A simple undirected graph has trace(A³)=24. How many triangles does it contain?',answer:4,explain:'Each triangle contributes six closed walks of length three, so divide 24 by 6.'});
G.modules.m11.notes+='\n## Graph exam bridges\n(A^r)[u][v] counts length-r walks. For simple undirected graphs, (A²)[u][u]=degree(u), and triangles=trace(A³)/6. A²=I means A is its own inverse and the simple undirected graph is a perfect matching. BFS edges join levels differing by at most one. Undirected DFS has only tree and back edges, with no cross edges. In a connected unweighted undirected graph, a BFS tree height h gives h≤diameter≤2h. A spanning tree has V−1 edges. An MST minimizes total tree weight, not all root-to-vertex paths. A uniquely lightest cut edge is in every MST. Distinct weights imply uniqueness, but are not necessary. Adding constant c to every edge preserves MSTs since all spanning trees gain (V−1)c.\n';
})();
