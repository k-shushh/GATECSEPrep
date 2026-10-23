(() => {
const C=GATE.codeBlock,md=GATE.md;
const N=(q,answer,explain)=>({type:'nat',q,answer,explain});
const Q=(q,options,answer,explain)=>({type:'mcq',q,options,answer,explain});
const X=(q,options,answer,explain)=>({type:'msq',q,options,answer,explain});
function L(title,text,code,check,lab){return {title,short:title.split(':')[0],minutes:30,html:md(text)+(code?C(code):'')+(lab?`<div data-widget="${lab}"></div>`:'')+'<div data-check="0"></div>',checks:[check]};}
function M(id,summary,lessons,revision,notes){lessons.forEach((l,i)=>l.id='l'+(i+1));GATE.module({id,summary,level:'Beginner → GATE',minutes:lessons.length*40,lessons,revision,pyqs:[],notes,objectives:lessons.map(l=>l.title),pyqNote:'Open the bundled official paper at the indicated question. Enter its original option letter(s) or number here. Titles, hints and solution notes are original; overlapping topic questions may appear in more than one module.'});}

M('m07','Learn LIFO and FIFO by manipulating them, then use stacks and queues to solve expression and traversal problems.',[
L('Stacks: the last item leaves first',`A stack is like a pile of plates: add and remove at the top. push adds an element; pop removes the most recently added element; peek reads it without removing it. This is last-in, first-out, abbreviated LIFO.

With an array implementation, let top be the index of the current top and use −1 for an empty stack. Before pushing, check top+1<capacity; before popping, check top≥0. These checks distinguish overflow from underflow. An alternative representation uses top as the count; it is equally valid, but its formulas differ. Always read the convention.

Stacks support function-call bookkeeping, undo histories, parenthesis matching and depth-first search. A stack does not automatically sort values. For pushes 1,2,3 with no intervening pops, the removal order is 3,2,1. Interleaving pushes and pops produces additional orders, but not every permutation is possible.

To also query the minimum in constant time, store a second stack with the running minimum at each depth. Pushing x stores min(x,previous minimum); popping removes from both stacks. The first push stores x as its own minimum. The top of the second stack is the minimum of all remaining values. Store repeated minima too, so equal values work correctly. This uses Θ(n) extra storage and keeps push, pop and minimum queries Θ(1).

In the lab, push 1 and 2, pop once, push 3, then pop twice. Record the output sequence before clicking. Seeing the container change makes later expression traces much easier.`, `/* top is initialized to -1; capacity is CAP. */
int push(int x) {
    if (top + 1 == CAP) return 0;
    a[++top] = x;
    return 1;
}
/* A pop first checks top>=0, then returns a[top--]. */`,N('Push 1, push 2, pop, push 3, pop. What does the last pop return?',3,'After popping 2, pushing 3 makes 3 the newest item.'),'stack-lab'),
L('Queues: serve in arrival order',`A queue adds at the rear and removes from the front. This is first-in, first-out (FIFO), like a line at a counter. enqueue adds, dequeue removes, and front reads the next item. Queues appear in breadth-first search and scheduling simulations.

A naive array queue shifts all remaining entries after each removal, wasting linear time. A circular queue instead advances indices modulo capacity. With a count representation, empty means count=0 and full means count=capacity; front identifies the next removal and rear the next insertion.

There is another common convention: leave one cell unused. Then front==rear means empty, and (rear+1)%capacity==front means full, so usable capacity is capacity−1. **Do not mix this rule with the count convention.** GATE questions often depend on exactly which convention is specified.

In our lab all capacity cells are usable because we maintain count. Insert several items, remove two, then insert more to see rear wrap to the beginning without shifting existing entries. A deque is a related structure supporting insertions and removals at both ends.`, `/* Count-based queue, cap>0. */
if (count < cap) {
    q[rear] = value;
    rear = (rear + 1) % cap;
    count++;
}
/* Dequeue reads q[front], advances front modulo cap,
   and decrements count, after checking count>0. */`,N('In the one-empty-cell convention, an array of size 8 holds how many queued items?',7,'One cell distinguishes full from empty, leaving seven usable slots.'),'queue-lab'),
L('Postfix evaluation: preserve operand order',`Infix expressions put an operator between operands, as in 3+4. Postfix puts it after both operands: 3 4 +. Postfix needs no precedence parentheses when token boundaries are known. Evaluate it with a stack.

Scan left to right. Push each operand. For a binary operator, pop the right operand first, then the left operand. Compute left operator right and push the result. This order matters for subtraction and division. A valid complete expression finishes with exactly one value; underflow or extra values indicate a malformed expression.

For 8 3 2 * −, push 8,3,2; multiply 3×2 and push 6; subtract 8−6 and push 2. Do not compute 6−8. For space-separated multi-digit operands, parse complete tokens rather than individual characters.

Prefix places the operator before its operands and can be evaluated right to left with a corresponding stack procedure. Parenthesis matching uses a stack of opening brackets: each closing bracket must match the most recent unmatched opening bracket, and the stack must be empty at the end.`, `/* Postfix tokens: 8 3 2 * -
   stack bottom → top:
   [8] → [8,3] → [8,3,2] → [8,6] → [2]
*/`,N('Evaluate postfix: 9 3 / 2 -',1,'Pop 3 as right and 9 as left: 9/3=3. Then 3−2=1.'),'postfix-lab'),
L('Infix conversion and stack permutations',`To convert infix to postfix, output operands immediately and hold operators on a stack. Before pushing a new left-associative operator, pop operators of higher or equal precedence to the output. Push an opening parenthesis; at a closing parenthesis, pop until the matching opening parenthesis, then discard it.

Thus a+b*c becomes a b c * +. Multiplication stays above addition until it is emitted first. For (a+b)*c, parentheses force addition to be emitted before multiplication. An abstract right-associative exponent operator needs a different equal-precedence rule. In C, ^ means bitwise XOR, not exponentiation.

A stack permutation question gives an input order and asks whether an output order can arise with pushes and pops. Simulate greedily: push until the desired next value is on top; pop it; if the value is already buried below a different top and no future push can expose it, the order is impossible.

For input 1,2,3, output 3,1,2 is impossible: producing 3 requires pushing all three, leaving 2 above 1. With n distinct values in fixed push order, the number of valid complete pop permutations is the Catalan number Cn, a connection revisited with tree shapes.`, `/* Infix: a + b * c
   Output a; stack +
   Output b; stack +,*
   Output c; drain * then +
   Postfix: a b c * + */`,Q('Which output is impossible for input 1,2,3 through one stack?',['1,2,3','2,1,3','3,2,1','3,1,2'],3,'After outputting 3, the remaining top is 2, so 1 cannot leave next.')),
L('Build a queue from two stacks',`Two stacks can implement FIFO behavior. Keep an input stack for enqueue and an output stack for dequeue. Enqueue pushes onto input. Dequeue pops output; if output is empty, first move every input item to output, reversing their order. The oldest item then becomes output's top.

Do not transfer input while output still contains items: doing so would mix newer values ahead of older ones. If both are empty, dequeue underflows. Each element is pushed to input once, moved once, and popped from output once.

A particular dequeue can take Θ(n) when it triggers a transfer. Over a sequence, each element incurs only constant total stack work, so the amortized time per queue operation is Θ(1). This is an important example of why worst-case and amortized complexity differ.

The reverse construction—a stack using queues—can make either push or pop expensive depending on the method. Derive the cost from the actual operations rather than memorizing a universal statement. Stacks and queues are behavioral interfaces; their implementation decides their costs.`, `/* enqueue(x): in.push(x)
   dequeue():
      if out.empty():
          while !in.empty(): out.push(in.pop())
      if out.empty(): report underflow
      return out.pop()
   This is pseudocode, not a built-in C stack API. */`,Q('One dequeue with two stacks may take Θ(n), but amortized time is…',['Θ(n²)','Θ(n)','Θ(log n)','Θ(1)'],3,'Each item crosses from input to output at most once, so total work across operations is linear.'))
],[
Q('Stack removal order is…',['FIFO','LIFO','Sorted','Random'],1,'The newest remaining item is at the top.'),
N('Push 4,7,9, then pop twice. Second pop?',7,'The first pop returns 9, then 7.'),
N('Enqueue 4,7,9, then dequeue twice. Second dequeue?',7,'FIFO returns 4 then 7.'),
N('Circular queue capacity 6, next insertion index 5. New rear after insertion?',0,'(5+1)%6=0.'),
N('One-empty-slot circular queue array length 10: usable capacity?',9,'One slot is reserved to distinguish full from empty.'),
N('Evaluate postfix 5 2 - 4 *.',12,'(5−2)×4=12.'),
Q('Postfix of (a+b)*c is…',['a b c * +','a b + c *','a + b c *','* + a b c'],1,'Complete the parenthesized addition before multiplying by c.'),
Q('For input 1,2,3, impossible stack output?',['2,3,1','2,1,3','3,1,2','1,3,2'],2,'After 3 is popped, 2 blocks 1.'),
Q('Which structure is natural for bracket matching?',['Stack','FIFO queue','Unsorted array without an index','Heap'],0,'The last opening bracket must be matched first.'),
X('Queue-from-two-stacks facts:',['Transfer only when output is empty','Each dequeue is worst-case constant','Each item transfers at most once','Amortized cost can be constant'],[0,2,3],'A transfer can make one dequeue linear, but the total transfer work is bounded per element.')
],`# Module 07 · Stacks and queues
- Stack: LIFO, push/pop/peek. Array index-top convention uses top=−1 when empty.
- Queue: FIFO, enqueue/dequeue/front.
- Count-based circular queue: empty count=0, full count=capacity; indices wrap modulo capacity.
- One-empty-cell convention: empty front=rear, full (rear+1)%capacity=front; usable capacity is capacity−1.
- Postfix: pop right operand, then left. Finish with exactly one value.
- Infix conversion uses precedence and associativity; parentheses delimit popping.
- Stack permutations are checked by simulation, not just by reversing the whole input.
- Queue from two stacks: transfer input only when output is empty. Θ(n) worst-case dequeue, Θ(1) amortized operations.
`);

M('m08','Connect objects through pointers. Learn the boundary cases that make list operations correct, then trace reversal and cycle detection.',[
L('Nodes and the head pointer',`A linked list stores items in separate nodes. Each node contains a value and a pointer to the next node. Nodes need not be adjacent in memory. A head pointer identifies the first node; a null head represents an empty list. In a linear singly linked list, the final node's next pointer is null.

Traversal follows next pointers until null. Accessing the kth node takes Θ(k) time because there is no array-style address formula. Searching takes Θ(n) worst-case time. In return, local changes can reconnect nodes without shifting all later values.

Distinguish the node object from a pointer that refers to it. Assigning p=head makes p an alias to the first node; it does not copy the whole list. Advancing p=p->next changes the traversal pointer, not the head variable, unless p and head are literally the same variable.

Draw each node as [value | next] and head as a separate arrow. Never draw a node's position on the page as evidence of physical adjacency. The interactive list lab shows topology, not actual memory addresses.`, `struct Node { int value; struct Node *next; };
void print_list(const struct Node *p) {
    while (p != NULL) {
        printf("%d ", p->value);
        p = p->next;
    }
}`,Q('A null head means…',['The list contains zero','The list is empty','The list has a cycle','The final value is unknown'],1,'No first node is reachable from the head.'),'list-lab'),
L('Insert: connect before redirecting',`To insert at the front, allocate and initialize a new node, point its next at the old head, then make head point to the new node. The order preserves access to the old list. Empty-list insertion works with the same steps because the old head is null.

If a function needs to change the caller's head, it can return the new head or receive a pointer to the head pointer. In the return-new-head style below, the caller must assign head=prepend(head,x). Ignoring the return loses the new head.

Inserting after a known node p takes constant pointer work: new->next=p->next followed by p->next=new. Finding p by position or value may still take linear time. 'Insertion is O(1)' is incomplete without stating that the insertion location is already known.

Always check allocation failure before dereferencing the new pointer. Our example returns the old head on failure; a larger program should communicate that failure separately if it must distinguish 'unchanged successfully' from 'allocation failed'. Appending is constant-time with a maintained tail pointer, but linear-time if you must search for the tail.`, `struct Node *prepend(struct Node *head, int x) {
    struct Node *n = malloc(sizeof *n);
    if (n == NULL) return head;
    n->value = x;
    n->next = head;
    return n;
}
/* Caller: head = prepend(head, 7); */`,Q('Insert after known node p: which order preserves the suffix?',['p->next=n; n->next=p->next;','n->next=p->next; p->next=n;','free(p); p->next=n;','n->next=n; p=n;'],1,'Save the old successor in n->next before overwriting p->next.')),
L('Delete: bypass, then free',`Deleting a node requires both changing links and ending that node's lifetime if it was dynamically allocated. For a non-head node with known predecessor prev, let victim=prev->next; set prev->next=victim->next; then free(victim). Do not read victim->next after freeing victim.

Deleting the head is a separate boundary case when you use a plain head pointer. Store the old head, advance head to head->next, then free the old node. For a one-node list, head becomes null. If a tail pointer is maintained, update it when the last node is removed.

In a singly linked list, knowing only the target node does not generally let you remove it in constant time because its predecessor's link must change. The familiar 'copy the next node's data' trick cannot handle the tail and may violate node-identity requirements. Do not treat it as a universal deletion method.

A pointer-to-pointer traversal can treat head and interior links uniformly, but learn the simple boundary cases first. Check empty list, absent key, head, middle and tail when validating an implementation.`, `/* Remove first node, if any. */
if (head != NULL) {
    struct Node *old = head;
    head = head->next;
    free(old);
}`,Q('Why read the successor before free(old)?',['Because free reverses the list','Accessing a freed node is invalid','Because NULL is always the successor','To sort the list'],1,'After free, old no longer points to a live node.')),
L('Reverse: save the unvisited suffix',`Iterative reversal keeps three pointers: prev is the already-reversed prefix, cur is the first unprocessed node, and next saves cur's original successor. Initially prev is null and cur is head.

At each iteration, save next=cur->next; redirect cur->next=prev; move prev=cur; then move cur=next. Saving next first is crucial: redirecting cur->next would otherwise lose the rest of the original list. When cur becomes null, prev is the new head.

The invariant is that prev reaches the processed nodes in reversed order, while cur reaches the untouched suffix in its original order. Each iteration transfers exactly one node from suffix to prefix. Every node is visited once, so time is Θ(n), and the fixed set of pointers uses Θ(1) auxiliary space.

For 1→2→3→null, draw all three arrows after each iteration. Empty and one-node lists need no special branches in this implementation. Recursive reversal is also possible, but it uses linear call-stack space unless an optimization is explicitly guaranteed.`, `struct Node *reverse(struct Node *head) {
    struct Node *prev=NULL, *cur=head;
    while (cur != NULL) {
        struct Node *next=cur->next;
        cur->next=prev;
        prev=cur;
        cur=next;
    }
    return prev;
}`,N('How many next-link rewrites occur when reversing a 5-node linear list?',5,'Each node has its next pointer reassigned exactly once.'),'reverse-lab'),
L('Doubly linked, circular and cyclic lists',`A doubly linked node stores next and prev pointers. A known node can be unlinked in constant time when the necessary head/tail handling is available: reconnect both neighbors. The cost is extra storage and more links to maintain. A circular list instead connects the last node back to the first; traversal must stop on returning to the start, not wait for null.

Concatenating two unsorted linear singly linked lists takes constant link work when both heads and the first tail are known: connect that tail to the second head, with empty-list handling. If the tail is not known, finding it may require a linear scan. Merging two sorted lists while keeping sorted order generally requires Θ(n+m) comparisons/link work: repeatedly select the smaller front node, then append the remaining suffix. Distinguish joining two chains from merging their sorted order.

An unintended cycle in a singly linked list makes null-terminated traversal loop forever. Floyd's algorithm uses slow advancing one step and fast advancing two. If fast or fast->next becomes null, the list is acyclic. If the two pointers meet, there is a reachable cycle.

To find the entry after a meeting, reset one pointer to head and move both one step at a time; their next meeting is the cycle entry. This follows from the distance traveled modulo the cycle length. Counting a loop around the cycle gives its length.

Floyd detection uses Θ(n) time over the reachable prefix and cycle and Θ(1) auxiliary space. Comparing node addresses, not stored values, is essential: two different nodes may hold the same value without forming a cycle.`, `int has_cycle(struct Node *head) {
    struct Node *slow=head, *fast=head;
    while (fast != NULL && fast->next != NULL) {
        slow=slow->next;
        fast=fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}`,Q('Cycle detection must compare…',['Node values only','Node addresses','List lengths only','The largest value'],1,'Equal values can occur in distinct nodes; revisiting the same node establishes a cycle.'))
],[
Q('Worst-case search in an unsorted singly linked list?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],2,'You may follow all n nodes.'),
Q('Insert after an already-known node costs…',['Θ(1) pointer work','Θ(n) necessarily','Θ(log n)','Θ(n²)'],0,'Only a fixed number of links change; locating the node is separate.'),
N('A linear singly linked list of 7 nodes has how many non-null next links?',6,'Every node except the tail points to a next node.'),
N('Reverse 2→5→8. New head value?',8,'The old tail becomes the new head.'),
Q('Reversal must first save…',['cur->next','prev->value','The final length','The maximum element'],0,'The original successor would be lost after redirecting the link.'),
Q('Iterative reversal auxiliary space?',['Θ(n)','Θ(log n)','Θ(1)','Θ(n²)'],2,'Only a fixed number of pointers are needed.'),
Q('Circular-list traversal should stop…',['Only when next is NULL','On returning to the starting node','At the largest value','After two nodes'],1,'A proper circular list does not terminate at null.'),
Q('A known doubly linked node can usually be deleted with…',['A whole-list scan','Constant link changes with boundary handling','Sorting','Binary search'],1,'Both predecessor and successor are available from the node.'),
X('Safe deletion steps include…',['Save the successor before free','Reconnect the predecessor or head','Read victim->next after free','Update a maintained tail when necessary'],[0,1,3],'Reading through victim after freeing it is invalid.'),
Q('Floyd fast pointer advances how many links per iteration?',['One','Two','Three','It never moves'],1,'The speed difference enables a meeting inside a cycle.')
],`# Module 08 · Linked lists
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
`);

M('m09','Read tree shapes, derive their counts, traverse them, and understand exactly what a binary search tree guarantees.',[
L('Tree vocabulary and height conventions',`A tree is a connected undirected graph with no cycle. A rooted tree designates one node as root, giving parent/child relationships. A leaf has no children; an internal node has at least one. Ancestors lie on the path to the root, while descendants lie below a node. A tree with n≥1 nodes has n−1 edges.

A binary tree gives each node at most two ordered child positions, left and right. It is not necessarily a search tree. A full (proper) binary tree gives every internal node exactly two children. A complete binary tree fills levels from left to right with only the last level possibly incomplete. A perfect binary tree has every internal node with two children and all leaves at the same depth.

We measure depth and height in **edges**: root depth is 0 and a single-node tree has height 0. Some questions measure height in nodes; check before using a formula. With edge-height h, a binary tree has at most 2^(h+1)−1 nodes and at least h+1 nodes.

Draw three nodes in a chain and then as a root with two children. Both are binary trees, but their heights are 2 and 1. Shape affects operation costs.`, `/* Node representation: */
struct TreeNode {
    int key;
    struct TreeNode *left, *right;
};`,N('Maximum nodes in a binary tree of edge-height 3?',15,'Levels 0..3 hold at most 1+2+4+8=15 nodes.'),'tree-lab'),
L('Traversals: when do you visit the root?',`A traversal visits every node in a defined order. Preorder visits root, left subtree, right subtree. Inorder visits left subtree, root, right subtree. Postorder visits left subtree, right subtree, root. The words describe when the current root is processed relative to its children.

For root 4, left child 2 and right child 6, preorder is 4,2,6; inorder is 2,4,6; postorder is 2,6,4. For larger trees, apply the same rule recursively to each subtree. A null subtree contributes no values.

Level order visits nodes by increasing depth, using a queue. Start by enqueuing the root; repeatedly dequeue a node, visit it, and enqueue its children left then right. Depth-first traversals use recursion or an explicit stack.

All these traversals take Θ(n) time because every node is processed once. Recursive DFS auxiliary space is Θ(h) for tree height h; level-order queue space can be Θ(n) for a wide level. Inorder is sorted only when the tree satisfies the BST ordering rule.`, `void inorder(struct TreeNode *r) {
    if (r == NULL) return;
    inorder(r->left);
    printf("%d ", r->key);
    inorder(r->right);
}`,Q('Which traversal processes the root after both subtrees?',['Preorder','Inorder','Postorder','Level order'],2,'Postorder is left, right, root.')),
L('Binary search trees: a global invariant',`For distinct keys, a binary search tree requires every key in a node's left subtree to be smaller and every key in its right subtree to be larger. This is a rule about entire subtrees, not just immediate children. If duplicates are allowed, a consistent placement rule must be stated.

Search compares the target with the current key. A smaller target can only be in the left subtree; a larger target only in the right. Insert follows the same path until a missing child position is reached. The lab lets you insert your own values and see how order changes shape.

Each operation follows a path of length at most the height, so search and insertion cost O(h). A balanced shape gives logarithmic height; inserting sorted distinct keys into an ordinary unbalanced BST produces a chain and linear worst-case time. A binary search tree is not automatically balanced.

Inorder traversal of a BST lists keys in sorted order. To find the minimum, follow left children until none remains; maximum follows right children. The successor is the next key in inorder: use the minimum of the right subtree when it exists, otherwise the appropriate ancestor.`, `struct TreeNode *find(struct TreeNode *r, int key) {
    while (r != NULL && r->key != key) {
        if (key < r->key) r=r->left;
        else r=r->right;
    }
    return r;
}`,N('Insert 1,2,3,4 into an ordinary empty BST. Edge-height?',3,'Every new value becomes the right child of the previous one, forming a four-node chain.'),'bst-lab'),
L('BST deletion and reconstructing a tree',`BST deletion has three cases. A leaf can simply be removed. A node with one child is replaced by that child. A node with two children can have its key replaced by its inorder successor (the minimum in its right subtree), followed by deletion of that successor from its original position. The predecessor is a symmetric alternative.

The successor cannot have a left child, so deleting it reduces to a simpler case. Link changes and memory release still require care, especially if the deleted node is the root. Operations remain O(h); deletion does not inherently rebalance the tree.

With distinct keys, inorder plus preorder uniquely reconstructs a binary tree. Preorder's first value identifies the root; its position in inorder divides the left and right subtrees. Inorder plus postorder also works, using the last postorder value as root. Preorder plus postorder alone does not generally determine an arbitrary binary tree: a single child could be left or right.

For inorder 2,4,5,7 and preorder 4,2,7,5, root is 4, left subtree is 2, and the right subtree has root 7 with left child 5. Test your reconstructed tree by traversing it again.`, `/* Delete root 4 from BST with keys:
       4
      / \\
     2   7
        /
       5
   Successor is 5. Replace 4 by 5, then remove the old 5. */`,N('What key replaces 4 using its inorder successor in the example?',5,'It is the smallest key in the right subtree.')),
L('Counting trees and proving formulas',`Let a binary tree have n0 leaves, n1 nodes with one child and n2 nodes with two children. Counting edges by children gives n1+2n2. Counting edges by total nodes gives n0+n1+n2−1. Equating them yields n0=n2+1 for every nonempty binary tree.

In a full binary tree n1=0, so total nodes are 2n2+1 and leaves are n2+1. A binary tree represented with two child pointers per node has 2n pointer fields, n−1 non-null child links, and therefore n+1 null child pointers. These are derived identities, not unrelated facts.

For n distinct sorted keys, the number of possible BST shapes is the Catalan number Cn. It obeys C0=1 and Cn=Σ Ck*C(n−1−k) for k=0..n−1, because each root divides the remaining keys into a left and a right subtree. The first values are 1,1,2,5,14,42 for n=0..5.

Do not confuse tree shapes with insertion sequences. Multiple insertion orders can create the same BST. For a fixed root and fixed subtree insertion orders, interleaving left and right arrivals without changing their internal orders gives a binomial counting factor.`, `/* n=3 BST shapes:
   C3 = C0*C2 + C1*C1 + C2*C0
      = 1*2 + 1*1 + 2*1 = 5.
*/`,N('A nonempty binary tree has 8 nodes with two children. Number of leaves?',9,'n0=n2+1 regardless of how many one-child nodes it has.'))
],[
N('Edges in a tree with 12 nodes?',11,'Every nonempty tree has n−1 edges.'),
N('Maximum nodes at depth 4 in a binary tree?',16,'At most 2^4 nodes.'),
N('Maximum nodes for edge-height 4?',31,'2^(4+1)−1=31.'),
N('Full binary tree with 6 internal nodes: leaves?',7,'Every internal node has two children, so leaves=internal+1.'),
N('Null child pointers in a 9-node binary tree?',10,'2n−(n−1)=n+1.'),
Q('Inorder of a BST with distinct keys is…',['Sorted ascending','Sorted descending always','Insertion order','Level order'],0,'The left subtree is smaller, then root, then larger right subtree.'),
Q('Worst-case search in an ordinary n-node BST?',['Θ(1)','Θ(log n) guaranteed','Θ(n)','Θ(n log n)'],2,'A skewed tree has linear height.'),
Q('Which pair uniquely reconstructs an arbitrary binary tree with distinct keys?',['Preorder and postorder','Inorder and preorder','Height and level count','Preorder alone'],1,'The root from preorder splits the inorder sequence recursively.'),
N('Number of BST shapes on 4 distinct keys?',14,'Catalan C4=14.'),
X('BST deletion with two children may use…',['Minimum in right subtree','Maximum in left subtree','Any arbitrary leaf','Inorder successor'],[0,1,3],'These preserve sorted inorder order. An arbitrary leaf may violate the invariant.')
],`# Module 09 · Trees and BSTs
Height here counts edges: single node h=0. Tree edges=n−1.
- Binary: at most two ordered children. Full: zero or two. Complete: levels fill left-to-right. Perfect: all leaves at same level and all internal nodes have two children.
- Max nodes at depth d: 2^d. Max nodes at height h: 2^(h+1)−1. Min nodes: h+1.
- n0=n2+1; full tree nodes=2*internal+1; null child pointers=n+1.
- Preorder root-left-right; inorder left-root-right; postorder left-right-root; level order uses a queue.
- BST ordering applies to entire subtrees. Inorder is sorted. Search/insert/delete O(h), worst-case Θ(n) without balancing.
- Two-child deletion uses successor (right minimum) or predecessor (left maximum).
- Inorder+preorder or inorder+postorder reconstructs a distinct-key tree uniquely.
- Catalan Cn counts BST shapes for n distinct keys; C0..C5=1,1,2,5,14,42.
`);

M('m10','Use a complete binary tree as an efficient priority queue. See why heap order differs from sorted order, and why build-heap is linear.',[
L('Heap shape and heap order',`A binary heap combines two independent properties. Its shape is a complete binary tree: all levels are full except possibly the last, which fills left to right. Its order property compares each parent with its children. In a max-heap the parent is at least as large; in a min-heap it is at most as large.

Only the extreme element is guaranteed at the root. A heap is not a BST and its array is not globally sorted. Siblings can appear in either order. In a max-heap the minimum can be among the leaves, requiring linear worst-case search if no extra information is maintained.

Completeness permits a compact array representation. With zero-based indexing, children of i are 2i+1 and 2i+2; for i>0, parent is floor((i−1)/2). With one-based indexing, children are 2i and 2i+1, and parent is floor(i/2). Always check the convention.

For n≥1, heap edge-height is floor(log2 n). Zero-based leaves have indices floor(n/2) through n−1. These formulas come from the complete-tree layout, not from the key values.`, `/* Zero-based max-heap array: */
int h[] = {9, 7, 8, 2, 5, 3};
/* Root 9; children 7 and 8.
   Node at index 1 has children at indices 3 and 4. */`,N('Zero-based right-child index of node 3?',8,'2×3+2=8, provided that index is within the heap.'),'heap-lab'),
L('Insert: append and sift upward',`To insert, first preserve completeness by appending the new key at the end of the heap array. Then restore the order property by comparing it with its parent. In a max-heap, swap upward while the new key exceeds its parent. Stop at the root or once the parent is large enough.

Only the path from the new leaf to the root can violate order. All other parent-child relationships were already correct and are unchanged. Because the path length is O(log n), insertion uses logarithmic worst-case comparisons and swaps.

For max-heap [9,7,8,2,5,3], insert 10. Append at index 6; parent index 2 holds 8, so swap. Now 10 is at index 2; parent index 0 holds 9, so swap again. The result is [10,7,9,2,5,3,8].

Equal keys need not swap if the property uses ≥. A priority queue may have a separate tie-breaking rule, but a plain binary heap does not promise stable ordering of equal priorities. Use the interactive heap lab to compare a small insertion with a new maximum.`, `/* Max-heap sift-up after append at index i. */
while (i > 0) {
    int p=(i-1)/2;
    if (h[p] >= h[i]) break;
    int t=h[p]; h[p]=h[i]; h[i]=t;
    i=p;
}`,N('Inserting 10 into the given 6-element heap causes how many swaps?',2,'10 crosses parent 8 and then root 9.')),
L('Delete the root: replace and sift downward',`Removing a heap root creates a hole at the top. Move the last element into that hole and reduce the heap size; this preserves the complete shape. Then restore heap order by sifting the replacement down.

In a max-heap choose the larger existing child. If that child exceeds the current value, swap and continue from the child position. Swapping with the smaller child could leave the larger child above its parent, so choosing the correct child is essential. A node may have only a left child near the bottom.

Deleting 9 from [9,7,8,2,5,3] moves 3 to the root. The larger child is 8, so swap to get [8,7,3,2,5]. The new position of 3 has no children, so stop. Returning the old root gives the maximum in O(log n) time; peeking without removal is O(1).

Changing a known key's priority can similarly sift up or down. Finding an arbitrary key by value in a plain heap can still take Θ(n); heap order is weaker than BST ordering.`, `/* At index i in a max-heap of current size n: */
int left=2*i+1, right=left+1;
int largest=i;
if (left<n && h[left]>h[largest]) largest=left;
if (right<n && h[right]>h[largest]) largest=right;
/* If largest!=i, swap and continue from largest. */`,Q('For max-heap sift-down, choose…',['The smaller child','The larger child','Always the left child','Any leaf'],1,'The parent must dominate both children after the local correction.')),
L('Build-heap: why the sum is linear',`One way to build a heap is repeated insertion, costing O(n log n) in the worst case. A faster bottom-up method starts with all values in an array and sifts down each internal node from floor(n/2)−1 back to 0. Leaves already satisfy the heap property.

Why is this Θ(n) rather than Θ(n log n)? Most nodes are near the bottom and move very little. About half the nodes are leaves with zero work, about a quarter have height one, an eighth have height two, and so on. The work is bounded by n times a convergent weighted sum: Σ h/2^(h+1), which is constant.

Equivalently, charge work by the height of each node, not by assigning the root's maximum height to every node. The root may sift O(log n) levels, but there is only one root. Bottom-up construction also inspects enough entries to require Ω(n), giving the tight Θ(n) result.

This is a common GATE distinction: a single heapify/sift-down operation is O(log n), whereas heapifying the whole array bottom-up is Θ(n). Ask which operation the problem means by 'heapify'.`, `/* Bottom-up max-heap construction. */
for (int i=n/2-1; i>=0; i--) {
    sift_down(h, n, i); /* helper follows the previous lesson */
}
/* i is signed here, avoiding unsigned underflow in i--. */`,Q('Tight time for bottom-up build-heap?',['Θ(log n)','Θ(n)','Θ(n log n)','Θ(n²)'],1,'Summing each node’s available downward height gives linear total work.')),
L('Heapsort and choosing a structure',`Heapsort first builds a max-heap. Swap the maximum at index zero with the last element of the active heap, shrink the active heap by one, and sift the new root down. Repeat. The excluded suffix becomes sorted in ascending order.

Build-heap takes Θ(n); the repeated removals take O(n log n), and worst-case total time is Θ(n log n). An iterative array implementation uses Θ(1) auxiliary space. Standard heapsort is not stable: equal-key records can change relative order through distant swaps.

Use a heap when the main operation is repeatedly selecting the smallest or largest item, such as task priority management or an algorithm frontier. Use a BST when ordered search, successor queries and range traversal matter, keeping its balance assumptions explicit. Use a sorted array when indexed access and binary search dominate and updates are rare.

The heap lab displays the underlying array so you can verify the complete-tree indexing. After every operation, check every parent-child pair. A plausible-looking root alone does not prove the entire heap is valid.`, `/* Max-heap based ascending heapsort, schematic C: */
build_heap(h, n);
for (int end=n-1; end>0; end--) {
    swap(&h[0], &h[end]);
    sift_down(h, end, 0); /* end is the new active size */
}`,Q('Standard in-place heapsort is…',['Stable and linear','Unstable with Θ(n log n) worst-case time','Always quadratic','A BST traversal'],1,'Heap swaps can reorder equal keys; the height controls the logarithmic removal cost.'))
],[
N('Zero-based left child of index 4?',9,'2×4+1=9.'),
N('Zero-based parent of index 8?',3,'floor((8−1)/2)=3.'),
N('Height in edges of a 10-node binary heap?',3,'floor(log2 10)=3.'),
N('Leaves in a 10-node zero-based heap?',5,'Indices 5..9 are leaves.'),
Q('A max-heap guarantees…',['Every left child is smaller than every right child','Root is a maximum','Array is sorted','Minimum is at index 1'],1,'Only parent-child dominance is guaranteed.'),
Q('Heap insertion worst-case time?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],1,'The new key can rise along one root path.'),
Q('Bottom-up build-heap time?',['Θ(log n)','Θ(n)','Θ(n log n)','Θ(n²)'],1,'Most nodes have small subtree height.'),
Q('To delete a heap root, first replace it with…',['Any leaf chosen arbitrarily','The last array element','The minimum key','Its left child without further changes'],1,'Removing the last array position preserves completeness.'),
Q('Find an arbitrary key in a plain heap: worst-case time?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n log n)'],2,'The order property does not choose one unique search branch.'),
X('Heapsort properties:',['Θ(n log n) worst-case time','Stable by default','Can use Θ(1) extra space iteratively','Max-heap extraction to the end gives ascending order'],[0,2,3],'Standard heapsort is not stable, but is in-place and has logarithmic-height removals.')
],`# Module 10 · Binary heaps
- Shape: complete binary tree. Max-heap parent≥children; min-heap parent≤children.
- Zero-based: left=2i+1, right=2i+2, parent=floor((i−1)/2) for i>0.
- One-based: children 2i,2i+1; parent=floor(i/2).
- Height floor(log2 n); leaves start at floor(n/2) in zero-based storage.
- Peek Θ(1); insert/delete extreme Θ(log n) worst case; arbitrary-value search Θ(n).
- Insert: append, sift up. Delete root: move last to root, shrink, sift down using larger child in a max-heap.
- Bottom-up build starts at n/2−1 and is Θ(n), not Θ(n log n).
- Heapsort: Θ(n log n) worst-case, Θ(1) iterative auxiliary space, generally unstable.
`);

M('m11','Represent relationships as vertices and edges. Build BFS and DFS traces, compare storage choices, and recognize which guarantees need extra assumptions.',[
L('Graph vocabulary and degree counting',`A graph consists of vertices (objects) and edges (relationships). An undirected edge joins two vertices symmetrically; a directed edge has a source and destination. A weighted graph associates a cost with an edge. A simple undirected graph has no self-loops or parallel edges.

A path follows edges; a simple path does not repeat vertices. A cycle returns to its starting vertex without repeating other vertices in the usual simple-cycle definition. An undirected graph is connected if every pair of vertices has a path between them. A connected component is a maximal connected region.

The degree of an undirected vertex counts incident edge ends. Every edge contributes two to the total degree, so Σdegree=2E, with a self-loop contributing two if loops are allowed. In a directed graph, total indegree=total outdegree=E. A simple undirected graph on V vertices has at most V(V−1)/2 edges.

A tree is a connected acyclic undirected graph and has V−1 edges. A directed acyclic graph is called a DAG; it need not be connected or look like a rooted tree. State the graph model before applying formulas.`, `/* Example undirected edges:
   A-B, A-C, B-D, C-D, D-E
   degrees: A=2, B=2, C=2, D=3, E=1
   sum=10=2*5 edges.
*/`,N('A simple undirected graph has 6 vertices. Maximum edges?',15,'Choose any pair: 6×5/2=15.')),
L('Adjacency matrix versus adjacency list',`An adjacency matrix stores one entry for each ordered vertex pair, requiring Θ(V²) space. In a simple unweighted graph, entry [u][v] indicates whether an edge exists. An undirected graph's matrix is symmetric. Checking a particular edge is Θ(1), but listing all neighbors of one vertex scans a whole row, Θ(V).

An adjacency list stores the neighbors of each vertex. Total storage is Θ(V+E); an undirected edge is normally recorded twice, once at each endpoint. Listing neighbors takes Θ(degree(u)). Looking for a particular neighbor in an unsorted list may scan the whole list.

Sparse graphs have relatively few edges, so lists often save substantial space and traversal time. Dense graphs may make a matrix attractive. In a weighted matrix, choose a representation for 'no edge' that does not accidentally forbid legitimate zero-weight edges.

C implementations can use arrays of lists, dynamic arrays of neighbors, or compressed arrays. Representation affects complexity: BFS with lists is Θ(V+E), while scanning a matrix for all vertices costs Θ(V²). The lab shows one fixed graph and the order in which its neighbors are considered.`, `/* Adjacency list, neighbors in alphabetical order:
   A: B C
   B: A D
   C: A D
   D: B C E
   E: D
*/`,N('An undirected adjacency list for 7 edges stores how many neighbor entries?',14,'Each edge is recorded at both endpoints.'),'graph-lab'),
L('BFS: explore by distance',`Breadth-first search uses a queue. Mark the start discovered, assign distance zero, and enqueue it. Repeatedly dequeue a vertex and inspect its neighbors. For every undiscovered neighbor, mark it immediately, set its parent and distance, then enqueue it.

Marking on enqueue prevents the same vertex being enqueued repeatedly through different parents. The queue processes vertices in nondecreasing distance from the start. Therefore BFS finds shortest paths measured in number of edges in unweighted graphs. It also works for equal positive edge weights after scaling, but it does not solve arbitrary weighted shortest paths.

For the sample graph from A, B and C have distance 1, D distance 2, and E distance 3. D's parent depends on which same-level vertex is processed first, but its shortest distance does not. Neighbor ordering can change a valid BFS tree.

A single BFS visits only the reachable component. To cover a disconnected undirected graph, start another BFS at each still-undiscovered vertex. Across all starts, adjacency-list work is Θ(V+E), and the visited, parent, distance and queue structures use O(V) auxiliary space.`, `/* Pseudocode */
discover(start); distance[start]=0; enqueue(start);
while (!empty()) {
    u=dequeue();
    for (each neighbor v of u) {
        if (!discovered[v]) {
            discover(v); parent[v]=u;
            distance[v]=distance[u]+1; enqueue(v);
        }
    }
}`,N('Sample graph A-B,A-C,B-D,C-D,D-E: distance A to E?',3,'A-B-D-E or A-C-D-E uses three edges.')),
L('DFS: finish a branch before returning',`Depth-first search explores an undiscovered neighbor recursively before moving to the next neighbor. Recursion or an explicit stack remembers unfinished work. Mark a vertex when discovered to avoid revisiting it through a cycle.

For directed graphs, colors help classify edges: white is undiscovered, gray is active on the recursion stack, and black is finished. An edge to a gray vertex is a back edge and proves a directed cycle. Directed DFS may also have tree, forward and cross edges. In an undirected simple graph, the edge back to the immediate parent should not be mistaken for a new cycle.

DFS discovers nested time intervals: a descendant is discovered after its ancestor and finishes before the ancestor. These timestamps support reasoning about ancestry and traversal order. Exact discovery order depends on start vertex and neighbor order; do not assume it is unique.

Adjacency-list DFS visits vertices and edges in Θ(V+E) time. Its stack can grow to Θ(V), for example along a long path. A recursive graph traversal therefore needs a visited set in addition to a base case: cycles do not naturally decrease a numeric argument.`, `/* DFS pseudocode */
visit(u) {
    discovered[u]=true;
    for (each neighbor v of u)
        if (!discovered[v]) visit(v);
    /* u finishes here */
}`,Q('In directed DFS, an edge to a gray vertex shows…',['A shortest path','A cycle','A complete graph','That BFS is impossible'],1,'Gray means an active ancestor in the DFS call stack; the edge closes a directed cycle.')),
L('Topological order and the Algorithms boundary',`A topological ordering of a directed graph places every edge's source before its destination. Such an ordering exists exactly when the graph is acyclic. It is useful for prerequisites: complete each prerequisite before the dependent task. Several valid orders may exist.

Kahn's algorithm starts with all zero-indegree vertices. Remove one, append it to the order, and decrement the indegrees of its outgoing neighbors. Any neighbor whose indegree becomes zero becomes eligible. If fewer than V vertices can be removed, the remaining graph contains a directed cycle.

DFS gives another method: for a DAG, reverse finishing order is topological. Cycle detection is necessary; blindly reversing a DFS order from a cyclic graph does not make it valid. A graph with no edges admits every permutation as a topological order.

Graph representations are in Programming and Data Structures; traversals bridge into Algorithms. Weighted shortest paths, minimum spanning trees, greedy methods and dynamic programming are separate Section 5 topics. This course introduces that boundary but does not claim to replace a full Algorithms course. Dijkstra requires nonnegative edge weights; BFS alone is not a general weighted-path algorithm.`, `/* DAG edges A->C, B->C, C->D.
   Initially eligible: A,B.
   Valid orders: A,B,C,D or B,A,C,D.
   C cannot be output before both A and B. */`,N('How many topological orders for A→C, B→C, C→D?',2,'Only A and B can exchange positions. C must follow both and D must follow C.'))
],[
N('Sum of degrees for an undirected graph with 9 edges?',18,'Every edge contributes two endpoints.'),
N('Maximum edges in a simple undirected graph with 5 vertices?',10,'5×4/2=10.'),
N('A connected acyclic undirected graph has 8 vertices. Edges?',7,'It is a tree, so E=V−1.'),
Q('BFS uses…',['A stack','A queue','A heap necessarily','A BST necessarily'],1,'FIFO order preserves layers of distance.'),
Q('BFS guarantees shortest paths for…',['Arbitrary weighted graphs','Unweighted graphs','Only complete graphs','Only trees'],1,'It minimizes edge count; unequal weights require a different method.'),
Q('Adjacency-list traversal complexity?',['Θ(V²) always','Θ(V+E)','Θ(E²)','Θ(log V)'],1,'Vertices and adjacency entries are processed a constant number of times.'),
Q('Adjacency-matrix space?',['Θ(V)','Θ(E)','Θ(V²)','Θ(log V)'],2,'There is an entry for every ordered vertex pair.'),
Q('Topological ordering exists exactly for…',['Any directed graph','Directed acyclic graphs','Only complete graphs','Only connected undirected graphs'],1,'A directed cycle would require a vertex to appear before itself through the cycle constraints.'),
N('A directed graph has 12 edges. Total indegree?',12,'Each directed edge contributes one incoming endpoint.'),
X('Which are true?',['BFS may have multiple valid trees','DFS order depends on neighbor order','One BFS always covers a disconnected graph','A directed back edge signals a cycle'],[0,1,3],'One start reaches only its reachable region; repeat from unvisited vertices to cover the rest.')
],`# Module 11 · Graphs
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
`);
})();
