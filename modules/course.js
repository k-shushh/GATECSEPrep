/* New course material. Plain scripts deliberately support double-click/offline use. */
(() => {
const C=GATE.codeBlock, md=GATE.md;
const N=(q,answer,explain)=>({type:'nat',q,answer,explain});
const Q=(q,options,answer,explain)=>({type:'mcq',q,options,answer,explain});
const X=(q,options,answer,explain)=>({type:'msq',q,options,answer,explain});
function L(title,text,code,check,lab){return {title,short:title.split(':')[0],minutes:25,html:md(text)+(code?C(code):'')+(lab?`<div data-widget="${lab}"></div>`:'')+'<div data-check="0"></div>',checks:[check]};}
function M(id,summary,lessons,revision,notes){
 lessons.forEach((l,i)=>l.id='l'+(i+1));
 GATE.module({id,summary,level:'Beginner → GATE',minutes:lessons.length*35,lessons,revision,pyqs:[],notes,objectives:lessons.map(l=>l.title),pyqNote:'Open the bundled official paper at the indicated question, solve it, then submit the original option letter or numerical answer here. Question titles and solution notes are our own. Some questions connect more than one module.'});
}

M('m01','Turn plain instructions into C expressions. Learn what a variable stores, how types change calculations, and when C does not promise one answer.',[
L('Variables: names for values',`Imagine a labelled box called score. A **variable** lets a program keep a value and change it later. A declaration tells C its type and name; an initializer gives its starting value. In int score = 7, int means an integer type, score is the identifier and 7 is the initial value. The semicolon ends the declaration.

Assignment is an action: compute the right side using the old values, then store the result on the left. So score = score + 3 is meaningful even though it would be a strange algebraic equation. After it, score holds 10. Two different variables do not stay linked just because one was initialized from the other.

Names can contain letters, digits and underscores, but cannot begin with a digit or be a keyword. C is case-sensitive: Score and score are different. Local variables declared without an initializer can hold indeterminate values; do not read them before assigning a value.

**Try on paper:** make columns for line, score and copy. Predict both printed values before stepping through the variable lab. Notice that changing score does not rewrite copy.`, `#include <stdio.h>
int main(void) {
    int score = 7;
    int copy = score;
    score = score + 3;
    printf("%d %d\\n", score, copy);
    return 0;
}`,N('What is copy after score changes?',7,'Assignment copies the current value. copy was initialized to 7 and is never assigned again.'),'variables-lab'),
L('Types: integers, characters and real numbers',`A type tells the compiler what values an object can hold and which operations make sense. Use int for ordinary integers, double for floating-point approximations, and char for character-sized integer values. A character literal such as 'A' is not the string "A": the string also has a terminating zero byte.

sizeof gives an object's or type's size in C bytes and has type size_t. **sizeof(char) is always 1**, but the C standard does not fix int to four bytes. A C byte has CHAR_BIT bits (at least eight). GATE often explicitly assumes eight-bit bytes or four-byte integers; use the stated assumption.

An unsigned type with w value bits represents 0 through 2^w−1. When the arithmetic is performed in that unsigned type after integer promotions and conversions, it wraps modulo 2^w. Smaller types such as unsigned char may first promote to int. Signed overflow is undefined behavior; it is not a portable wraparound rule. In a specified w-bit two's-complement model, signed values range from −2^(w−1) through 2^(w−1)−1.

Floating-point numbers approximate many fractions. Avoid assuming 0.1 + 0.2 is represented exactly as 0.3. Use appropriate precision when interpreting a numerical question. **First write down the types, then calculate.**`, `#include <stdio.h>
int main(void) {
    int count = 5;
    double mean = 5.0 / 2;
    char initial = 'A';
    printf("%d %.1f %c %zu\\n", count, mean, initial, sizeof count);
    return 0;
}`,N('An unsigned integer has 8 value bits. What is its maximum value?',255,'There are 2^8 = 256 values starting at zero, ending at 255.')),
L('Arithmetic and conversion',`Integer division discards the fractional part toward zero: 7/2 is 3, and −7/2 is −3. The remainder operator % works on integers; with nonzero b and a representable quotient, a = (a/b)*b + a%b. Therefore −7%2 is −1 under modern C. Division by zero is undefined. On a two's-complement int system, INT_MIN / -1 and INT_MIN % -1 also have undefined behavior because the quotient is not representable.

The calculation happens **before assignment**. In double x = 5/2, both operands are int, so the result is 2 and then becomes 2.0. Write 5.0/2 or (double)5/2 to request a floating calculation. A cast converts a value; it does not change the original variable's declared type.

Small integer types undergo integer promotions. Mixed signed and unsigned arithmetic can convert a negative value to unsigned; for example, −1 < 1u is false when int and unsigned int have the usual corresponding ranks. Do not infer mathematical order without checking conversion rules.

Multiplication, division and remainder bind more tightly than addition and subtraction. Operators at the same arithmetic precedence generally group left to right: 8/2*2 is 8. Parentheses make intent explicit. Grouping determines the expression's structure, not necessarily the order in which operands are evaluated.`, `int a = 5, b = 2;
double x = a / b;          /* 2.0 */
double y = (double)a / b;  /* 2.5 */
int r = -7 % 2;           /* -1 */`,N('What integer results from 17 / 5 + 17 % 5?',5,'17/5 is 3 and 17%5 is 2. Their sum is 5.')),
L('Logic, bits and safe expressions',`A condition treats zero as false and every nonzero scalar value as true. Comparison operators return int 0 or 1. Equality uses ==; assignment uses =. Logical && and || short-circuit from left to right. If the left side of && is false, the right side is skipped. If the left side of || is true, the right side is skipped.

Bitwise &, | and ^ combine individual bits. They are different from logical operators: 6 & 3 is 2, but 6 && 3 is 1. When the promoted left operand is unsigned, a valid left shift by k multiplies modulo that promoted type's range; right shift divides by 2^k discarding the remainder. The shift count must be nonnegative and less than the promoted left operand's width. Prefer unsigned int or a suitably wider unsigned type when reasoning about bits; a smaller unsigned type may promote to int.

Pre-increment ++i produces the incremented value; post-increment i++ produces the old value as its result. Both change i. **Do not modify the same scalar multiple times without the sequencing C requires.** i++ + i++ has undefined behavior, so there is no portable output to compute. Precedence does not repair this. Function argument evaluation order is not specified.

Use the lab to compare bitwise and logical operations. Predict one result before changing the inputs.`, `int x = 0;
if (x != 0 && 12 / x > 2) {
    /* safe: division is skipped when x is zero */
}
int i = 4;
int before = i++;  /* before=4, i=5 */
int after = ++i;   /* after=6, i=6 */`,Q('For i++ + i++, which conclusion is valid?',['Always twice the old value','Depends only on operator precedence','Undefined behavior; no portable result','Always a syntax error'],2,'The two modifications of i are unsequenced relative to each other. Do not assign a deterministic numerical answer.'),'bits-lab'),
L('Input, output and a debugging routine',`printf writes formatted output. Its format string is a template: %d expects int, %u unsigned int, %c an int representing a character, %f a double, and %zu size_t. A newline is written as \\n inside a string. The number and types of arguments must match the conversions.

scanf reads formatted input and stores results at supplied addresses. For int age, use scanf("%d", &age): &age means the address of age. Use %lf for reading double, %f for float. scanf returns the number of successfully assigned input items. Check that return value before using the variable. The address and pointer details come in Module 04.

An **IDE** combines an editor and development tools; the compiler translates C. In a terminal with GCC or Clang already installed, save a file as hello.c, compile with gcc -std=c17 -Wall -Wextra -pedantic hello.c -o hello, then run ./hello (or .\\hello.exe in Windows PowerShell). A terminal is a text interface for commands. If no compiler is installed, you can still use every guided lab here offline; these labs are simulations, not a general C compiler.

Debug in three passes: fix compiler diagnostics; trace each variable on paper; then test boundary inputs such as zero and one. Undefined behavior cannot be validated by trying one compiler once.`, `#include <stdio.h>
int main(void) {
    int age;
    if (scanf("%d", &age) != 1) {
        puts("Please enter an integer.");
        return 1;
    }
    printf("Next year: %d\\n", age + 1);
    return 0;
}`,Q('Which conversion reads a double with scanf?',['%d','%f','%lf','%zu'],2,'scanf needs %lf and a double pointer. printf uses %f for a double value.'))
],[
N('Evaluate 9 / 4 with integer operands.',2,'Integer division truncates toward zero.'),
N('Evaluate -9 % 4 in C17.',-1,'−9 = (−2)*4 + (−1).'),
N('What is 5 & 3?',1,'101 AND 011 is 001.'),
N('What is 5 && 3?',1,'Both operands are nonzero, so logical AND returns 1.'),
N('Evaluate 2 + 3 * 4.',14,'Multiplication binds before addition.'),
N('What is x after int x=3; int y=x++; x+=y;?',7,'y receives 3; x becomes 4; adding y makes x 7.'),
Q('Which is guaranteed by C?',['sizeof(int)==4','sizeof(char)==1','char is signed','Every byte is 8 bits'],1,'A C byte is the size of char. Widths and plain-char signedness depend on the implementation.'),
Q('What does double x=5/2 initialize x to?',['2.5','2.0','3.0','Undefined'],1,'Integer division happens before conversion to double.'),
Q('What happens in 0 && (10/0)?',['Division always occurs','The right operand is skipped','Result is 10','Syntax error'],1,'Short-circuit evaluation avoids evaluating 10/0 here; the result is 0.'),
X('Which expressions have defined results under C17?',['7/2','1/0','6u & 3u','i++ + i++ for an int i'],[0,2],'Integer division by nonzero 2 is defined. Unsigned bitwise AND is defined. The other two have undefined behavior.')
],`# Module 01 · C building blocks
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
`);

M('m02','Choose which instructions run and repeat them deliberately. Move from a single condition to nested-loop counting.',[
L('Decisions: if, else and nesting',`A program normally executes statements in sequence. An if statement selects a path based on a condition. Write braces around the controlled statements even when there is only one: it makes the boundaries visible. An else belongs to the nearest unmatched if, regardless of indentation.

Read a chain from top to bottom. In if / else if / else, only the first true branch runs; separate if statements are independent. Conditions can be combined with &&, || and !. Test a boundary exactly, just below it, and just above it. For a pass mark of 40, test 39, 40 and 41.

The conditional expression condition ? a : b computes the value of one of two alternatives. Only the selected alternative is evaluated. Unlike a statement, it can be part of an assignment. For a beginner, a normal if/else is often easier to trace.

**GATE habit:** ignore decorative indentation, match braces, and draw one path through the branches. Remember that if (x = 0) assigns zero and then tests false; it is legal C but usually a bug.`, `int marks = 40;
if (marks >= 40) {
    puts("Pass");
} else {
    puts("Try again");
}
int larger = (3 > 8) ? 3 : 8;`,Q('In an unbraced nested if, an else matches…',['The first if on the page','The nearest unmatched if','The most indented if','All earlier if statements'],1,'C grammar, not indentation, determines the match. Braces make it explicit.')),
L('Switch: entry point and fall-through',`switch evaluates an integer expression and jumps to a matching case label. A case is an entry point, not an isolated branch. Execution continues through subsequent statements until break, return or the end of the switch. This is called fall-through.

default is selected if no case matches; it can appear anywhere. Cases must be distinct integer constant expressions. A runtime variable or a string is not a valid case label. Multiple case labels can share one body, which is useful when several values need the same response.

break exits the innermost switch or loop. A break inside a switch nested in a loop leaves the switch but does not terminate the surrounding loop. This matters in tracing problems.

In the example, selecting case 2 prints B and then C because there is no break between those cases. Start tracing at the selected label rather than the top of the switch. Add a break after B and predict the new output before trying the guided trace.`, `int x = 2;
switch (x) {
    case 1: puts("A"); break;
    case 2: puts("B");
    case 3: puts("C"); break;
    default: puts("D");
}`,Q('For x=2, what does this example print?',['B only','C only','B then C','A then B then C'],2,'Execution enters at case 2 and falls through case 3 before the break.')),
L('Loops: initialization, test, body, update',`A loop repeats work while a condition is true. A while loop tests first, so its body can run zero times. A do/while loop tests after the body, so its body runs at least once. A for loop collects initialization, condition and update in one header.

Read for (i=0; i<3; i++) in this order: initialize i once; test i<3; run the body; update i; return to the test. The body sees i equal to 0, 1 and 2. The final failed test sees i equal to 3. An empty statement after the for header, written as a semicolon, is still a loop body and often causes a bug.

Use a loop invariant: a statement true at a repeated boundary. For the sum loop below, before an iteration with index i, sum equals 0+1+...+(i−1). The next iteration adds i and preserves the pattern. At termination i=n+1, giving the desired sum.

Trace the lab at n=0, then n=4. Write the condition checks as well as the additions. **Do not count the final failed test as a body execution.**`, `int n = 4, sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;
}
printf("%d\\n", sum);`,N('How many times does the body run for n=4?',4,'The body runs for i=1,2,3,4. The i=5 test fails.'),'loop-lab'),
L('Break, continue and termination',`break exits the nearest enclosing loop immediately. continue skips the rest of the current iteration. In a for loop, continue proceeds to the update expression and then the condition. In a while loop it proceeds straight to the condition: you must ensure any necessary progress is not skipped.

Termination needs a quantity that moves toward a stopping condition. An increment inside an unreachable branch does not count. For example, while (i<10) { if (i==3) continue; i++; } becomes stuck at 3. This is a useful warning about control flow, not an instruction to run a freezing program.

Nested loops have independent control boundaries. A break in the inner loop does not break the outer loop. Track one row per iteration with columns for outer index, inner index, output and reason for leaving.

The example skips the even values and stops before 7, so it prints 1, 3 and 5. Predict how moving break below printf changes the result. This kind of careful statement-order reasoning is more reliable than guessing from the loop header.`, `for (int i = 1; i <= 9; i++) {
    if (i % 2 == 0) continue;
    if (i == 7) break;
    printf("%d ", i);
}`,N('How many numbers are printed?',3,'Only 1, 3 and 5 reach printf. Even values continue, and 7 triggers break.')),
L('Counting work: nested and doubling loops',`Time complexity describes how work grows with input size, not stopwatch seconds. A loop visiting n elements has linear work Θ(n). Two independent loops each running n times inside one another do n² body executions. Sequential loops add their counts; nested loops often multiply, but only after checking the bounds.

If the inner bound depends on the outer index, sum the work. for i=0..n−1 with j=0..i−1 gives 0+1+...+(n−1)=n(n−1)/2 executions. This is still Θ(n²), even though the exact count is not n².

Repeated doubling is different: 1,2,4,... up to n visits floor(log2 n)+1 values for n≥1, assuming arithmetic does not overflow. A logarithm reverses exponentiation: log2(8)=3 because 2³=8. floor(x) means round down to the greatest integer no larger than x. Thus n=10 gives floor(log2(10))+1=4 visits: 1,2,4,8. Repeated halving similarly gives logarithmic depth. In exam pseudocode, machine limits may be abstracted away; in real C, overflow matters.

The notation Θ(n), pronounced theta of n, describes growth proportional to n up to constant factors for sufficiently large inputs. Θ(n²) is quadratic growth; Θ(log n) is logarithmic growth. Here it summarizes how iteration counts scale. Module 06 defines asymptotic bounds more carefully; you can first understand the actual counts without memorizing the symbols.

Write the first few iterations for n=4 or n=5 before deriving a formula. For i*i<n, the iteration count grows as √n, not log n. The operation used to advance the variable is the clue.`, `int count = 0;
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < i; j++) {
        count++;
    }
}
/* count = 0+1+2+3+4 = 10 */`,N('For n=8, how many values does i take in for(i=1;i<=n;i*=2)?',4,'The values are 1,2,4,8. The next value 16 fails the test.'))
],[
N('Body executions: for(i=0;i<6;i++).',6,'i takes values 0 through 5.'),
N('Body executions: for(i=6;i>0;i-=2).',3,'i takes values 6,4,2.'),
N('A do/while has an initially false condition. Minimum body executions?',1,'The body precedes the first condition check.'),
N('How many iterations for i=1; i<16; i*=2?',4,'1,2,4,8; 16 fails.'),
N('Sum of j-body counts for i=1..4 and j=1..i?',10,'1+2+3+4=10.'),
Q('continue in a for loop goes next to…',['Initialization','The update expression','The statement after the loop','The start of main'],1,'Then the condition is evaluated again.'),
Q('break inside a switch inside a loop exits…',['The whole program','Both constructs','Only that switch','Only the outer loop'],2,'break applies to the nearest enclosing switch or loop.'),
Q('Two sequential loops of n iterations cost…',['Θ(n)','Θ(n²)','Θ(log n)','Θ(1)'],0,'n+n=2n, which has linear growth.'),
N('int x=0; if(x=5) x++; What is x?',6,'Assignment stores 5; 5 is true, so the body increments to 6.'),
X('Which loops may execute zero times?',['while','for','do/while'],[0,1],'while and for test before entering; do/while tests after one execution.')
],`# Module 02 · Decisions and loops
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
`);

M('m03','Understand what a function receives, where its variables exist, and what survives between calls.',[
L('Functions: a named piece of work',`A function packages a task behind a name. Its declaration tells callers the return type and parameter types. In int square(int x), square is the name, x is the parameter and int before the name is the return type. A call such as square(4) supplies an argument. A return statement ends that invocation and supplies its result.

Think of a function as a small worksheet: it receives input values, creates local working values, and returns one result. A function may also perform side effects such as printing, but keep those separate in your trace. The number it prints need not equal the number it returns.

Write a declaration before calling a function so the compiler can check its argument types. int main(void) explicitly says main takes no parameters. void can also indicate that a function returns no value. A non-void function should return an appropriate value on every path that reaches its end (main has a special rule, but explicit return 0 is clear).

Read the example's caller first: it requests square(4), waits, receives 16, and prints it. The function body is executed at the call, not simply because its definition appears above main.`, `#include <stdio.h>
int square(int x) { return x * x; }
int main(void) {
    int result = square(4);
    printf("%d\\n", result);
    return 0;
}`,N('What does square(4) return?',16,'The parameter x is 4, so x*x is 16.')),
L('Call by value: a copy, including pointers',`C passes every argument by value. The parameter is a separate local object initialized with the argument's value. Reassigning an int parameter does not reassign the caller's int. This is why a swap function taking two int parameters cannot exchange the caller's variables.

A pointer value is an address. If a function receives a copy of that address, it can use it to modify the object at the address. The pointer is still passed by value; there is no separate call-by-reference mechanism in C. Reassigning the local pointer itself will not redirect the caller's pointer. To modify the caller's pointer object, pass its address, using a pointer-to-pointer parameter.

For now, treat *p as 'the object at address p' and &x as 'the address of x'. Module 04 develops those operations in detail. Distinguish changing a box from changing the note that tells you where the box is.

**Predict:** bump(a) leaves a at 10; bump_at(&a) changes a to 11. Draw separate parameter and caller boxes before reasoning about the second function.`, `void bump(int x) { x++; }
void bump_at(int *p) { (*p)++; }
/* Inside main: */
int a = 10;
bump(a);       /* a remains 10 */
bump_at(&a);   /* a becomes 11 */`,Q('C passes a pointer argument…',['By reference automatically','By value, copying its address value','By copying the pointed-to array','Only through a global variable'],1,'The pointer parameter is a copy. Dereferencing it may access the original pointed-to object.')),
L('Scope, shadowing and lifetime',`**Scope** answers 'where can this name be used?' **Lifetime** answers 'when does this object exist?' These are different questions. A local variable usually has block scope and automatic storage duration: each entry creates its instance, and leaving the block ends its lifetime.

A declaration in an inner block can hide an outer declaration of the same name. C resolves names lexically, using the source-code nesting, not the chain of calling functions. This is static or lexical scope. Dynamic scoping may appear in comparison questions, but it is not how ordinary C resolves variable names.

In the example, show uses the file-scope x=2. The x=9 local to main is not in show's lexical scope. Merely calling show from main does not expose main's local names. An inner block in main can declare another x and temporarily shadow main's x.

Never return the address of an automatic local variable: after the function returns, that object's lifetime has ended. A pointer that outlives its target is dangling. It does not become safe simply because the old bytes happen to remain unchanged in one run.`, `#include <stdio.h>
int x = 2;
void show(void) { printf("%d ", x); }
int main(void) {
    int x = 9;
    show();
    printf("%d\\n", x);
    return 0;
}`,Q('What does the example print?',['9 9','2 2','2 9','9 2'],2,'show sees the global x; main sees its own local x. Caller-local names do not dynamically become visible.')),
L('Storage duration: automatic and static',`An automatic local variable is initialized afresh when its declaration is executed on each call. A static local variable exists for the whole program, while its name remains visible only in its block. It is initialized once; if no explicit initializer is supplied, it starts as zero.

File-scope objects also have static storage duration. static at file scope additionally gives internal linkage, meaning that the name identifies that object within this translation unit. extern commonly declares an object defined elsewhere; it does not mean the object is a new local copy. Linkage concerns whether declarations refer to the same entity across scopes or files; it is separate from scope and lifetime.

The auto keyword describes automatic storage and is normally omitted. register is a historical optimization hint and is not a guarantee of physical register placement. For GATE, prioritize the observable lifetime, initialization and visibility rules.

In the counter below, n starts at zero once and accumulates across calls. If static is removed, each invocation creates n=0 again and returns 1. Trace both versions with three rows, one for each call.`, `int next_id(void) {
    static int n;
    n++;
    return n;
}
/* Three successive calls return 1, 2, 3. */`,N('What does the fourth call to next_id return?',4,'The same static n retains its value across calls; it is not reinitialized each time.')),
L('Call stack: return to the right place',`When one function calls another, execution of the caller pauses. A conceptual **stack frame** records the called function's parameters, locals and where execution should resume. The most recent unfinished call is on top. When it returns, its frame is removed and the caller continues.

This stack picture explains nested calls and is the foundation for recursion. Implementations may optimize or place values in registers, so the picture is a reasoning model, not a promise of exact memory layout. You do not need machine addresses to trace ordinary output questions.

For outer(3), outer waits for inner(4), which returns 8. outer then adds 1 and returns 9. Do not add 1 before inner has returned. Write the pending operation in the caller's frame.

For multiple calls in one expression, do not assume C evaluates operands left to right. If the calls affect shared state, check whether the result is portable. A good exam approach is to separate independent arithmetic from state-changing calls and note all language assumptions explicitly.`, `int inner(int a) { return 2 * a; }
int outer(int x) {
    int y = inner(x + 1);
    return y + 1;
}
/* outer(3) returns 9. */`,N('What is outer(5)?',13,'inner receives 6 and returns 12; outer adds 1.'),'calls-lab')
],[
N('int f(int x){x+=2;return x;} int a=3; f(a); What is a?',3,'Only the copied parameter changes; the returned value is ignored.'),
N('A static counter starts at 0 and adds 2 per call. Value after 3 calls?',6,'Persistent state accumulates 2+2+2.'),
Q('The lifetime of an automatic local ends…',['After compilation','On leaving its block','Only at program exit','When another name shadows it'],1,'Shadowing hides a name; leaving the block ends the automatic object lifetime.'),
Q('C uses which name-resolution rule?',['Dynamic scope','Lexical scope','Caller scope','Random scope'],1,'Source-code nesting determines visibility.'),
Q('To change a caller int x through a function, pass…',['x and assign the parameter','&x and dereference the pointer','sizeof x','The name as a string'],1,'A copied address still identifies the original object.'),
Q('An uninitialized static int starts as…',['An indeterminate value','1','0','A compiler error'],2,'Static-duration objects are zero-initialized before execution.'),
Q('Which return is unsafe?',['Returning an int result','Returning the address of an automatic local','Returning a pointer to a live static object','Returning NULL'],1,'The automatic object dies when its block is left, leaving a dangling pointer.'),
N('f(x)=2*x; g(x)=f(x+1)+3. What is g(4)?',13,'g calls f(5)=10, then adds 3.'),
X('Which statements about a static local are true?',['Its name is visible in every function','It retains state between calls','It has static storage duration','It is newly initialized on every call'],[1,2],'Block scope limits the name; static duration preserves the object.'),
Q('A function receiving int *p reassigns p=NULL. Does the caller pointer change?',['Yes','No','Only for arrays','Always undefined'],1,'p itself is a copied parameter. Reassigning it does not overwrite the caller pointer.')
],`# Module 03 · Functions, scope and storage
- C is call by value, including pointer arguments.
- A parameter is a separate object; dereferencing a copied pointer can change its target.
- Scope = name visibility. Lifetime = when an object exists. Linkage = identity across declarations.
- C uses lexical scope. Caller locals are not visible in a called function merely because of the call.
- Automatic locals are created on entry; static locals persist but retain block scope.
- Static-duration objects without explicit initializers start at zero.
- Do not return addresses of automatic locals.
## Call tracing
Push a frame for each call. Record parameters, locals and the pending return expression. Pop only after the callee returns. Do not invent an argument evaluation order.
`);
})();
