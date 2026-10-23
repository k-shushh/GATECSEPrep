(() => {
const C=GATE.codeBlock,md=GATE.md;
const N=(q,answer,explain)=>({type:'nat',q,answer,explain});
const Q=(q,options,answer,explain)=>({type:'mcq',q,options,answer,explain});
const X=(q,options,answer,explain)=>({type:'msq',q,options,answer,explain});
function L(title,text,code,check,lab){return {title,short:title.split(':')[0],minutes:30,html:md(text)+(code?C(code):'')+(lab?`<div data-widget="${lab}"></div>`:'')+'<div data-check="0"></div>',checks:[check]};}
function M(id,summary,lessons,revision,notes){lessons.forEach((l,i)=>l.id='l'+(i+1));GATE.module({id,summary,level:'Beginner → GATE',minutes:lessons.length*40,lessons,revision,pyqs:[],notes,objectives:lessons.map(l=>l.title),pyqNote:'Read the indicated question in the bundled official paper, then submit the original option letter or number here. Hints and solution notes are original explanations. Cross-topic questions can appear in more than one module.'});}

M('m04','Build a precise picture of addresses and objects, then use it to understand arrays, strings, structures and allocated memory.',[
L('Pointers: an address is a value',`A pointer is a variable whose value can identify another object. int *p declares p as a pointer to int. If x is an int, &x is its address and p=&x stores that address in p. *p accesses the int at that address. The same * character appears in a declaration and in dereferencing, but the roles differ.

Draw two boxes: x stores 7, while p stores the address of x. After *p=12, x stores 12; p still points to x. After p=&y, p points elsewhere without changing x. Two pointers can point to the same object; writes through either are then visible through the other. This is aliasing.

A null pointer value deliberately indicates 'no object'. You may compare it but must not dereference it. An uninitialized pointer is not automatically null. A dangling pointer refers to an object whose lifetime has ended. A valid address, a live target and a compatible type are all part of safe access.

**Trace rule:** first decide which object each expression identifies, then read or write its value. Do not mix up p, *p and &p: they mean an address value, the target object, and the address of the pointer object itself.`, `int x = 7, y = 20;
int *p = &x;
*p = 12;       /* x=12 */
p = &y;
*p += 1;       /* y=21; x is still 12 */`,N('What is x at the end?',12,'Redirecting p to y does not undo the earlier write to x.'),'pointer-lab'),
L('Arrays: contiguous elements and bounds',`An array holds a fixed sequence of same-type elements next to one another. int a[4]={8,3,5,2} creates four ints with indices 0 through 3. a[i] names element i. In most expressions, an array expression converts to a pointer to its first element, so a[i] means *(a+i).

Arrays and pointers are still different kinds of objects. sizeof a for an actual array gives the size of the whole array; sizeof p for a pointer gives the pointer's size. A declared array cannot be reassigned like a pointer. In a function parameter, int a[] is adjusted to int *a, so sizeof a there measures a pointer, not the caller's array.

Pointer arithmetic advances by elements: if an int occupies four bytes and a starts at address 1000, a+2 represents 1008. Subtracting two pointers within the same array gives an element distance, not a byte distance. You may form a one-past pointer, but cannot dereference it. Going beyond those bounds is not a valid shortcut.

Pass an array's length alongside its pointer. A function receiving a pointer cannot generally discover how many elements are available.`, `int sum(const int a[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += a[i];
    return s;
}
/* Caller: int a[4]={8,3,5,2}; sum(a,4) returns 18. */`,N('a starts at 1000, sizeof(int)=4. Address of a[3]?',1012,'Base + index × element size = 1000+3×4.')),
L('Strings: characters plus a terminator',`A C string is a sequence of characters ending at the first '\\0' character, whose value is zero. char s[]="cat" creates four elements: c, a, t and the terminator. strlen(s) is 3; sizeof s is 4. strlen walks until the first zero and does not count it. Calling it on an unterminated character array can read outside the object.

char s[]="cat" creates a modifiable array copy. const char *p="cat" points to a string literal; modifying a string literal has undefined behavior. The const spelling documents that you should not modify its characters through p. A pointer variable can be reassigned, whereas the array name cannot.

Input needs capacity for the terminator. For char name[20], scanf("%19s",name) limits the word to 19 characters and leaves room for zero; %s stops at whitespace. fgets(name,sizeof name,stdin) can read spaces and may retain the newline. Check the return result either way.

The expression '0' is a digit character; '\\0' is the zero-valued character constant used as a terminator; 0 is an integer constant. In C, '\\0' and 0 both have type int and value zero. The digit character '0' is different: in ASCII it has value 48.`, `#include <string.h>
char s[] = "gate";
s[2] = '\\0';
/* Now strlen(s)==2, sizeof(s)==5.
   Bytes remain: 'g','a',0,'e',0. */`,N('What is strlen(s) after this assignment?',2,'The first zero terminates the string after g and a. The array allocation remains five bytes.')),
L('Structures and pointer-to-pointer parameters',`An array groups elements of one type. A struct groups named members, possibly of different types. A student record might contain an int id and a double score. Access a member with s.id when s is the struct object, or p->id when p points to one. The latter means (*p).id.

Structure size can include padding for alignment, so do not blindly add member sizes unless the problem explicitly rules padding out. Assigning one compatible struct object to another copies its member values. Pointer members are copied as addresses; pointed-to data is not automatically deep-copied.

A self-referential struct stores a pointer to the same struct type, not a complete embedded copy of itself. This is how linked-list nodes connect. The pointer has finite size; directly embedding an entire instance of the same type would require endless nesting.

To update a caller's pointer variable, pass the address of that pointer. In set_to, pp is a pointer to a pointer; *pp names the caller's pointer. Module 08 uses the same idea to change the head of a list.`, `struct Node {
    int value;
    struct Node *next;
};
void set_to(int **pp, int *target) { *pp = target; }
/* Inside main: */
int a=3, b=9;
int *p=&a;
set_to(&p, &b); /* now *p is 9 */`,N('What is *p after set_to(&p,&b)?',9,'*pp changes the caller pointer p to &b; dereferencing p now accesses b.')),
L('Dynamic memory: allocate, use, release',`A local array's lifetime is tied to its block. Dynamically allocated storage can outlive the allocating function and has a size chosen at runtime. malloc requests bytes and returns a pointer, or a null pointer on failure. In C, its void pointer result converts to an object pointer without a cast.

Allocate n*sizeof *p bytes for n elements of the type p points to, after checking that the multiplication will not overflow for arbitrary untrusted n. malloc leaves the storage uninitialized. calloc allocates space and initializes all bits to zero. free releases an allocation once you no longer need it; free(NULL) does nothing.

After free(p), p is dangling. Setting p=NULL helps avoid accidental reuse through that particular variable, but other aliases remain dangling. Double-free, use-after-free and losing the only pointer without freeing are distinct errors. The last creates a memory leak.

realloc may move the block. Store its result in a temporary pointer so failure does not lose your original allocation; on failure with nonzero requested size, the old allocation remains valid. This course's small demos bound their inputs, but real allocation code must check sizes and failure.`, `#include <stdlib.h>
int *make_three(void) {
    int *p = malloc(3 * sizeof *p);
    if (p == NULL) return NULL;
    p[0]=10; p[1]=20; p[2]=30;
    return p;
}
/* Caller uses the result only if non-null, then calls free(p). */`,Q('After free(p), which action is valid?',['Read p[0] once','free(p) again','Set p=NULL without dereferencing','Assume all aliases became NULL'],2,'The allocation no longer exists. Assigning a null pointer to p is fine; aliases are not automatically updated.')),
L('Two-dimensional arrays: rows have a type',`int a[2][3] is an array of two rows; each row is an array of three ints. C lays out rows contiguously, so the last index varies fastest. a[1][2] is the sixth int overall. The expression a commonly converts to a pointer to a row, whose type is int (*)[3]. It is not int **.

Incrementing a row pointer advances by one whole row. With four-byte ints, a+1 advances twelve bytes, while &a[0][0]+1 advances four. To pass this array to a function, the row width must be known: void f(int a[][3], int rows) or the equivalent pointer-to-row syntax.

Read declarations from the name outward using parentheses. int *p[3] is an array of three int pointers; int (*p)[3] is one pointer to an array of three ints. Parentheses change what the star binds to.

For output tracing, first write types beside each pointer expression. Many 'tricky' questions become straightforward once the unit of each +1 is known. Module 06 formalizes multidimensional address calculations, including nonzero lower bounds used in abstract-array questions.`, `int a[2][3]={{1,2,3},{4,5,6}};
int (*p)[3]=a;
/* p+1 points at row {4,5,6}.
   *(*(p+1)+2) is a[1][2], which is 6. */`,N('What is *(*(p+1)+2)?',6,'p+1 selects row 1; dereference gives that row; +2 selects its third element.'))
],[
N('int a=4; int *p=&a; *p+=3; What is a?',7,'The assignment through p changes a itself.'),
N('For int a[5], with four-byte int, what is sizeof a?',20,'Five contiguous ints occupy 5×4 bytes.'),
N('For char s[]="abc", what is sizeof s?',4,'Three letters plus the terminating zero.'),
N('For int a[8], what is (a+6)-(a+2)?',4,'Pointer subtraction counts elements within the same array.'),
Q('An array parameter int a[] becomes…',['An int','An int pointer','A copied array','An int double pointer'],1,'The parameter declaration adjusts to int *a.'),
Q('Which operation is permitted?',['Dereference NULL','Modify a string literal','Form a pointer one past an array','Dereference one past an array'],2,'One-past pointers can be formed and compared appropriately; they are not dereferenceable.'),
Q('int (*p)[3] declares…',['Three pointers','A pointer to an array of three ints','A pointer to pointer','An int array'],1,'The parentheses bind *p before the array suffix.'),
N('C row-major int a[3][4], base=100, size=4. Address a[2][1]?',136,'Offset is 2×4+1=9 elements; 100+9×4=136.'),
X('Which are memory-management errors?',['Freeing the same allocation twice','Dereferencing an alias after free','Checking malloc for NULL','Losing the sole pointer to live allocated storage'],[0,1,3],'The first two are invalid operations; the last leaks the allocation. Checking failure is necessary.'),
Q('Why use a temporary pointer with realloc?',['To double the speed','To preserve the original pointer on allocation failure','Because realloc never moves storage','To avoid checking NULL'],1,'For a failed nonzero-size request, the old block remains allocated. Directly overwriting the only pointer can leak it.')
],`# Module 04 · Pointers, arrays and strings
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
`);

M('m05','Replace recursion anxiety with small, explicit call frames. Learn to trace returns and count time and auxiliary space separately.',[
L('A smaller version of the same problem',`Recursion means a function calls itself, directly or indirectly. It works when a problem can be reduced to smaller instances of the same kind. A **base case** gives an answer without another recursive call; a **recursive case** moves toward it.

Factorial has a natural decomposition: n! = n×(n−1)! for positive n, with 0!=1. fact(3) waits for fact(2), which waits for fact(1), which waits for fact(0). The answers then travel back up: 1,1,2,6. Multiplications happen during return, not while the calls are being made.

A base case alone is insufficient: the recursive arguments must reach it. fact(n+1) would move in the wrong direction for positive n. Negative inputs also need a stated policy. Our example is limited to nonnegative inputs small enough that the int result does not overflow; the lab uses 0 through 7.

**Predict before play:** for n=4, list every n value on the descent and every returned value on the ascent. This makes recursion a sequence of ordinary function calls rather than a mysterious jump.`, `int fact(int n) { /* precondition: small n >= 0 */
    if (n == 0) return 1;
    return n * fact(n - 1);
}`,N('How many invocations, including the base call, does fact(4) make?',5,'Calls use n=4,3,2,1,0. The base case is still one invocation.'),'recursion-lab'),
L('Print before or after the recursive call',`Every recursive invocation has its own automatic parameters and locals. A local n in an older invocation is not replaced by the new invocation's n. Draw a frame for each, including the point where execution is paused.

A print before the recursive call occurs on the way down. A print after the recursive call occurs on the way back up. For walk(3), the first prints are 3,2,1. The base call with zero prints nothing. The pending prints then produce 1,2,3. The complete output is 3 2 1 1 2 3.

Do not stop tracing when you reach the base case. It returns to its caller, which may have unfinished statements. Write those statements beside the paused frame. This is especially important when the return value and printed output are different.

Static or global variables are shared across invocations, unlike automatic locals. If a recursive example includes them, keep one shared-state table beside the separate frames. Also check whether expressions leave operand evaluation order unspecified.`, `void walk(int n) {
    if (n == 0) return;
    printf("%d ", n);
    walk(n - 1);
    printf("%d ", n);
}`,N('How many integers does walk(4) print?',8,'Each of the four non-base invocations prints twice, once before and once after its child call.')),
L('Two recursive calls: build a recursion tree',`A function can make more than one recursive call. For Fibonacci, fib(n)=fib(n−1)+fib(n−2), with fib(0)=0 and fib(1)=1. To understand its work, draw a tree: each invocation is a node and each call it makes is a child.

fib(4) needs fib(3) and fib(2). fib(3) itself needs fib(2) and fib(1), so fib(2) is recomputed. This repeated work makes the naive algorithm exponential. The recurrence for invocation count is C(n)=1+C(n−1)+C(n−2), with C(0)=C(1)=1. Thus C(2)=3, C(3)=5 and C(4)=9.

The number of calls is not the maximum number of live frames. A depth-first execution finishes one child before finishing the other. The maximum depth is linear in n, so auxiliary stack space is Θ(n), even though total work is exponential.

Memoization stores previously computed results; it reduces this Fibonacci calculation to linear time and linear extra storage. That is a bridge to dynamic programming in Algorithms, not a requirement to memorize every optimization now.`, `int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}`,N('How many calls does the naive fib(4) make, including itself?',9,'C(4)=1+C(3)+C(2)=1+5+3=9.')),
L('Time recurrence and stack depth',`Write a recurrence by counting recursive subproblems and the work outside them. fact has one call on n−1 and constant extra work: T(n)=T(n−1)+Θ(1), which expands to Θ(n). A function that halves n with constant extra work gives Θ(log n).

Two calls on halves plus a linear combine step give T(n)=2T(n/2)+Θ(n). Each level costs Θ(n), and there are Θ(log n) levels, so total time is Θ(n log n). Two calls on n−1 produce exponentially many nodes even though the longest chain has length n.

Auxiliary stack space is maximum simultaneous depth times frame size. With constant-size frames, a halving recursion has Θ(log n) stack space and a decrementing recursion has Θ(n). If each frame allocates an array, account for those sizes too; frame size is not always constant.

A tail-recursive call is the final action before return. A compiler may optimize it, but standard C does not guarantee that optimization. Unless the question explicitly grants it, analyze the ordinary call stack.`, `int count_halves(unsigned n) {
    if (n <= 1) return 0;
    return 1 + count_halves(n / 2);
}`,N('What does count_halves(16) return?',4,'16→8→4→2→1 gives four halvings, with five calls including the base.')),
L('Recursive arrays and a proof habit',`Recursive functions are easier to trust when their meaning is precise. Let sum(a,n) mean the sum of the first n elements, with 0≤n≤the array length. The empty prefix has sum zero. A nonempty prefix is the first n−1 elements plus element n−1.

Prove correctness in three short sentences. First, the base case returns the sum of an empty prefix. Second, assume the recursive call correctly sums the shorter prefix. Third, adding the final element produces the desired full prefix. Termination follows because n decreases toward zero.

This style of reasoning is mathematical induction expressed as a program. It also catches index errors: using a[n] would access the element after the prefix, and for a full array could be out of bounds. Returning 1 in the base case would add an unwanted constant.

For a GATE trace, combine the contract with a concrete example. For [4,1,6], the pending additions are 6,1,4; the returns are 0,4,5,11. Try the empty array prefix as a boundary case before generalizing.`, `int prefix_sum(const int a[], int n) {
    if (n == 0) return 0;
    return prefix_sum(a, n - 1) + a[n - 1];
}`,N('For a={4,1,6}, what is prefix_sum(a,2)?',5,'It includes only the first two elements: 4+1.'))
],[
N('For fact with base n==0, fact(5) returns?',120,'5×4×3×2×1×1=120.'),
N('How many frames are simultaneously live for fact(5), including fact(0)?',6,'The chain contains n=5,4,3,2,1,0.'),
N('walk(n) prints n only after walk(n-1), base zero prints nothing. First number printed by walk(4)?',1,'Unwinding starts with the deepest non-base frame n=1.'),
N('Naive Fibonacci fib(5), with fib(0)=0 and fib(1)=1, returns?',5,'Values are 0,1,1,2,3,5.'),
Q('T(n)=T(n-1)+1 has growth…',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],2,'Expanding adds one unit at each of n levels.'),
Q('T(n)=2T(n/2)+n has growth…',['Θ(log n)','Θ(n)','Θ(n log n)','Θ(n²)'],2,'Each logarithmic level contributes linear total work.'),
Q('A base case guarantees termination…',['Always','Only if recursive arguments eventually reach it','Only in C++','Never'],1,'Progress toward a reachable base case is necessary.'),
Q('Standard C guarantees tail-call elimination?',['Yes','No'],1,'Compiler optimizations may eliminate frames, but it is not guaranteed.'),
N('T(n) makes one call at n/2, stopping at 1. Frames for n=32?',6,'32,16,8,4,2,1 gives six frames.'),
X('For naive Fibonacci, which are true?',['Subproblems repeat','Maximum stack depth is exponential','Memoization can avoid recomputation','Total invocation count exceeds stack depth for sufficiently large n'],[0,2,3],'The tree has many nodes but a linear-length deepest path.')
],`# Module 05 · Recursion
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
`);

M('m06','Use arrays as a data structure: compare operation costs, calculate addresses, search correctly and read asymptotic bounds.',[
L('Array operations and their cost',`An array maps an index to an element using a base address and a fixed-size stride. This supports constant-time indexed access in the standard RAM model: element i does not require visiting all earlier elements. A linked list, which you will meet later, lacks this direct mapping.

Searching an unsorted array may inspect every element: Θ(n) worst-case time. Inserting at index i in a packed array shifts the later elements right; deleting shifts them left. These take Θ(n) worst-case time. Appending to an array with spare capacity is Θ(1); resizing a dynamic array can take Θ(n).

A dynamic array that doubles capacity has amortized Θ(1) append cost over a long sequence, but a particular append may still be expensive. Worst-case per operation and amortized cost are different claims. Space for n elements is Θ(n).

An **abstract data type** describes behavior; a data structure implements it. A stack can be implemented with an array or a linked list. Choose based on required operations, not because one structure is universally fastest. The lab lets you insert and remove values and watch the positions shift.`, `/* Insert x at pos, assuming 0<=pos<=n and spare capacity. */
for (int i = n; i > pos; i--) a[i] = a[i - 1];
a[pos] = x;
n++;`,N('How many existing elements shift when inserting at index 1 of a 5-element array?',4,'Old indices 1,2,3,4 move one position right.'),'array-lab'),
L('Big O, Omega and Theta',`Asymptotic notation compares growth for large input sizes while ignoring constant factors and lower-order terms. O(g(n)) is an asymptotic upper bound, Ω(g(n)) a lower bound, and Θ(g(n)) a matching upper and lower bound. For f(n)=3n²+10n+5, the tight growth is Θ(n²).

Big O is not inherently 'worst case', and Omega is not inherently 'best case'. First choose the function you are analyzing—such as worst-case comparisons—and then bound that function. Binary search has Θ(log n) worst-case comparisons but can succeed on its first comparison.

Common increasing growth rates are constant, log n, n, n log n, n², 2^n and n!. Logarithm bases greater than one differ only by a constant factor, so the base does not affect Θ(log n). Exact numerical counts do depend on the base.

Auxiliary space excludes the input itself unless a question defines it otherwise. An in-place loop with a few variables uses Θ(1) auxiliary space even when it reads an n-element input array. Always state the input-size parameter: for graphs it may be both V and E.`, `/* Visits every element once, keeping one running total. */
int total = 0;
for (int i = 0; i < n; i++) total += a[i];
/* Θ(n) time; Θ(1) auxiliary space, assuming no overflow. */`,Q('For 3n²+10n+5, which bound is tight?',['Θ(n)','Θ(n log n)','Θ(n²)','Θ(2^n)'],2,'The quadratic term dominates. Constants do not change the growth class.')),
L('Addresses: row-major and column-major',`For a one-dimensional array with lower bound L, base address B of A[L], and element width w, address(A[i])=B+(i−L)w. The subtraction converts the index into a zero-based element offset.

For a two-dimensional array with R rows, C columns, lower bounds Lr and Lc, row-major offset is (i−Lr)C+(j−Lc). Count complete earlier rows, then earlier elements within the chosen row. Column-major offset is (j−Lc)R+(i−Lr), because complete earlier columns come first. Multiply the element offset by w and add B.

C multidimensional arrays use row-major storage. Column-major questions are abstract layout exercises or refer to other languages; do not claim C changes layout. The base must be the address of the element at the declared lower bounds, not an arbitrary element.

For A[1..3][−2..1], C=4. Address A[2][0] with B=1000 and w=4 is 1000+((2−1)×4+(0−(−2)))×4=1024. The lab compares layouts using zero-based coordinates.`, `/* C example: 3 rows, 4 columns, zero-based indices. */
int a[3][4];
/* Element a[2][1] is offset 2*4+1 = 9 ints. */`,N('Row-major 3×4 array, B=1000, w=4: address [2][1]?',1036,'Offset 9 elements gives 36 bytes beyond the base.'),'address-lab'),
L('Searching: linear and binary',`Linear search inspects elements in order and works without sorting. Stop when the key is found or the array ends. Its worst-case comparisons are n. Binary search requires a sorted array and eliminates roughly half of the remaining candidates at each step.

Use one consistent interval convention. Here [lo,hi] is inclusive: initially lo=0, hi=n−1. While lo≤hi, inspect mid=lo+(hi−lo)/2. If the key is smaller, set hi=mid−1; if larger, set lo=mid+1. Excluding mid guarantees progress. The arithmetic form avoids overflow from lo+hi for valid nonnegative bounds.

For duplicates, a basic binary search can return any matching index. Finding the first occurrence requires recording a match and continuing left. Never silently assume that the first found equals the leftmost.

Trace unsuccessful searches too. At termination lo>hi means no candidate positions remain. For an empty array, hi=−1 and the loop never runs. The lab uses a fixed sorted array and lets you choose the target.`, `int search(const int a[], int n, int key) {
    int lo=0, hi=n-1;
    while (lo<=hi) {
        int mid=lo+(hi-lo)/2;
        if (a[mid]==key) return mid;
        if (a[mid]<key) lo=mid+1;
        else hi=mid-1;
    }
    return -1;
}`,Q('Binary search requires…',['Distinct values','Sorted input','An odd array length','Positive values only'],1,'Sorted order justifies discarding an entire half. Duplicates are allowed.'),'search-lab'),
L('Compact matrices and boundary discipline',`If most matrix entries are known in advance, storing every entry can waste space. A diagonal n×n matrix needs only n variable entries. A lower-triangular matrix including its diagonal has 1+2+...+n=n(n+1)/2 entries. A symmetric matrix can store one triangle because A[i][j]=A[j][i].

For a zero-based lower-triangular matrix stored row by row including the diagonal, element (i,j), with 0≤j≤i<n, has offset i(i+1)/2+j. There are 1+...+i entries in preceding rows. If j>i, the entry is outside the stored lower triangle; it may represent a known zero rather than an addressable stored value.

Sparse formats store values together with their coordinates or row offsets. Their benefit depends on how many entries are nonzero and on metadata overhead. They are a useful extension of array representation, rather than a substitute for learning ordinary indexing.

Address questions are safest when you calculate an element offset first, then convert to bytes. Test the first element, a row boundary and the last valid element. These checks expose off-by-one errors in a memorized formula.`, `/* For lower triangular rows:
   row 0: (0,0)
   row 1: (1,0),(1,1)
   row 2: (2,0),(2,1),(2,2)
   offset(2,1)=2*3/2+1=4. */`,N('How many stored entries in a 5×5 lower triangle including diagonal?',15,'1+2+3+4+5=5×6/2=15.'))
],[
Q('Worst-case arbitrary-position insertion in a packed array?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],2,'It may shift all n existing entries.'),
N('Linear search worst-case comparisons for 12 elements?',12,'An absent key or last-position match needs every element checked.'),
N('Row-major 4×5, B=200, w=2: address [2][3]?',226,'Offset 2×5+3=13; 200+2×13=226.'),
N('Column-major 4×5, B=200, w=2: address [2][3]?',228,'Offset 3×4+2=14; address 228.'),
N('A[−3..4] base A[−3]=500, w=4. Address A[2]?',520,'Index offset 2−(−3)=5; add 20 bytes.'),
Q('O(n²) means…',['Exactly n² operations','An asymptotic upper bound','The best case only','A lower bound only'],1,'A linear function is also O(n²), although that is not its tight bound.'),
Q('Binary search worst-case time?',['Θ(n)','Θ(log n)','Θ(n log n)','Θ(1)'],1,'The candidate interval roughly halves each iteration.'),
N('Entries in a 6×6 lower triangle including diagonal?',21,'6×7/2=21.'),
N('Lower triangle row-major zero-based offset of (3,2)?',8,'3×4/2+2=8 stored entries precede it.'),
X('Which statements are true?',['C arrays are row-major','Basic binary search always finds the first duplicate','Array indexing is constant-time in the RAM model','A resize can make an individual dynamic-array append linear'],[0,2,3],'First-occurrence search needs an extra invariant; ordinary binary search may return any duplicate.')
],`# Module 06 · Arrays and complexity
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
`);
})();
