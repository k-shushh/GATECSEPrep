/* Official-source practice. Statements and option wording stay in the bundled PDFs. */
window.PYQ_CATALOG=[
  {
    "modules": [
      "m02",
      "m03"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 34,
    "type": "nat",
    "answer": 9,
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "page": 24,
    "title": "A shadowed loop counter",
    "hint": "Draw a box around each scope.",
    "explanation": "The loop changes the inner i. The parameter i remains 9 and is printed after the block.",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m03.",
    "id": "2026-CS1-34"
  },
  {
    "modules": [
      "m04"
    ],
    "year": 2026,
    "set": "CS2",
    "number": 60,
    "type": "nat",
    "answer": 9,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS2.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS2_Keys.pdf",
    "page": 40,
    "title": "Pointer reassignment versus pointee mutation",
    "hint": "Track the pointer target after every assignment.",
    "explanation": "The first write changes a to 20. Later a becomes 11; ptr still targets c, so c becomes 20 minus 11.",
    "localPaper": "papers/paper-80914db78ae7.pdf",
    "localKey": "papers/key-0dd9ea86886f.pdf",
    "id": "2026-CS2-60"
  },
  {
    "modules": [
      "m02",
      "m03",
      "m01",
      "m05"
    ],
    "year": 2026,
    "set": "CS2",
    "number": 61,
    "type": "nat",
    "answer": 1,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS2.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS2_Keys.pdf",
    "page": 41,
    "title": "Branches selected by a remainder",
    "hint": "Track the length modulo three.",
    "explanation": "Only residue one adds to the result. After that branch, subsequent positive lengths cycle through residues zero and two, so at most one is added.",
    "localPaper": "papers/paper-80914db78ae7.pdf",
    "localKey": "papers/key-0dd9ea86886f.pdf",
    "note": "Recursive follow-through: also suitable after recursion.",
    "overlap": "Revisited for C arithmetic and logical expressions; complete functions and recursion first.",
    "id": "2026-CS2-61"
  },
  {
    "modules": [
      "m02",
      "m04",
      "m06"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 33,
    "type": "nat",
    "answer": 435,
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "page": 33,
    "title": "Counting adjacent swaps",
    "hint": "Count inversions in reverse order.",
    "explanation": "Every pair is inverted, and each adjacent swap removes one inversion. The total is 30 times 29 divided by 2.",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m04.",
    "id": "2025-CS1-33"
  },
  {
    "modules": [
      "m03",
      "m04"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 34,
    "type": "nat",
    "answer": 25,
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "page": 34,
    "title": "Changing a caller variable through a pointer",
    "hint": "Follow z to its target.",
    "explanation": "z points to a. Passing z copies that address, and the callee writes b's value through it; a becomes 25.",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "overlap": "This question is intentionally revisited because it combines m03, m04.",
    "id": "2025-CS1-34"
  },
  {
    "modules": [
      "m03",
      "m04",
      "m05",
      "m06"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 61,
    "type": "nat",
    "answer": 5,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "page": 61,
    "title": "Counting equal-value runs recursively",
    "hint": "Mark boundaries between consecutive unequal elements.",
    "explanation": "There are four changes between neighbouring elements. The final one-element suffix contributes one, giving five runs.",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "note": "Revisit after recursion.",
    "overlap": "This question is intentionally revisited because it combines m03, m04.",
    "id": "2025-CS1-61"
  },
  {
    "modules": [
      "m01",
      "m02",
      "m03"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 63,
    "type": "nat",
    "answer": 46,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "page": 63,
    "title": "Keeping alternate decimal digits",
    "hint": "Trace quotient, remainder and the toggle.",
    "explanation": "Digits are visited left to right. The toggle keeps the second and fourth digits, producing 46.",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "overlap": "This question is intentionally revisited because it combines m01, m02, m03.",
    "id": "2025-CS1-63"
  },
  {
    "modules": [
      "m02",
      "m03",
      "m04",
      "m06"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 19,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 17,
    "title": "An overlapping string copy without a terminator",
    "hint": "Check whether the loop copies the null character.",
    "explanation": "The loop copies twelve visible characters, but never copies the terminator. The original final d and exclamation mark remain before the old null.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m03, m04.",
    "id": "2025-CS2-19"
  },
  {
    "modules": [
      "m01",
      "m02"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 33,
    "type": "nat",
    "answer": 21,
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 26,
    "title": "Repeated subtraction until equality",
    "hint": "Subtract the smaller positive value.",
    "explanation": "The first subtraction gives 21 and 105. Repeated subtraction then reduces the larger value to 21; both variables equal their gcd.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "overlap": "This question is intentionally revisited because it combines m01, m02.",
    "id": "2025-CS2-33"
  },
  {
    "modules": [
      "m01",
      "m04",
      "m06"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 62,
    "type": "nat",
    "answer": 111,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 46,
    "title": "Pointer movement and postfix update",
    "hint": "Separate the saved value from the mutated element.",
    "explanation": "a saves 50. The pointed element becomes 51; the pointer advances to the element 10. Their sum is 111.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "overlap": "This question is intentionally revisited because it combines m01, m04.",
    "id": "2025-CS2-62"
  },
  {
    "modules": [
      "m02",
      "m03",
      "m01"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 63,
    "type": "nat",
    "answer": 46,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 47,
    "title": "Composing two calls inside a loop",
    "hint": "Evaluate the innermost call first.",
    "explanation": "For n equal to one and two, g(f(n)) is 22 and 24. The loop adds these two values.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "overlap": "Revisited for C arithmetic and logical expressions; complete functions and recursion first.",
    "id": "2025-CS2-63"
  },
  {
    "modules": [
      "m02",
      "m04",
      "m06"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 17,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "page": 11,
    "title": "Checking sorted order with one pass",
    "hint": "Count adjacent pairs in the worst case.",
    "explanation": "A worst-case scan checks all N minus one adjacent pairs. Its upper and lower asymptotic bounds are both linear.",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m04.",
    "id": "2024-CS1-17"
  },
  {
    "modules": [
      "m01",
      "m02"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 18,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "page": 12,
    "title": "A loop trapped by integer division",
    "hint": "Compute the first two updates exactly.",
    "explanation": "The first update makes a equal to one. Integer division keeps later updates at one, so the loop condition remains true forever.",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "overlap": "This question is intentionally revisited because it combines m01, m02.",
    "id": "2024-CS1-18"
  },
  {
    "modules": [
      "m03",
      "m05"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 19,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "page": 13,
    "title": "Printing during recursive return",
    "hint": "Distinguish reading order from printing order.",
    "explanation": "Each call saves its own character. Printing occurs after the deeper call returns, so the four input characters appear in reverse order.",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "note": "Revisit after recursion.",
    "id": "2024-CS1-19"
  },
  {
    "modules": [
      "m01",
      "m02",
      "m03"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 48,
    "type": "msq",
    "answer": [
      "B",
      "D"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "page": 30,
    "title": "Repeated doubling with a fixed addition",
    "hint": "Add y to both sides of the update.",
    "explanation": "After y iterations, the result is (initial x plus y) times 2 raised to y, minus y. Comparing the three cases selects B and D.",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "overlap": "This question is intentionally revisited because it combines m01, m02, m03.",
    "id": "2024-CS1-48"
  },
  {
    "modules": [
      "m03"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 13,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "page": 10,
    "title": "Argument evaluation under a stated order",
    "hint": "Use the order explicitly supplied by the exam.",
    "explanation": "The right argument prints 20, then the left prints 10. Inside f, g prints 10 and h prints 20.",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "note": "Right-to-left evaluation is an explicit question assumption, not a general C guarantee.",
    "id": "2024-CS2-13"
  },
  {
    "modules": [
      "m02",
      "m03",
      "m04",
      "m06"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 33,
    "type": "msq",
    "answer": [
      "A",
      "B",
      "D"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "page": 22,
    "title": "Finding string length by pointer subtraction",
    "hint": "Notice that the function only reads characters.",
    "explanation": "Each valid null-terminated input advances b to its terminator. Subtracting the initial address yields length four; none of the three forms modifies the literal.",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m03, m04.",
    "id": "2024-CS2-33"
  },
  {
    "modules": [
      "m04",
      "m06"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 36,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "page": 24,
    "title": "Element distance and value difference",
    "hint": "Pointer subtraction counts elements, not bytes.",
    "explanation": "q is one element beyond p, so their difference is one. The pointed values differ by five.",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "id": "2024-CS2-36"
  },
  {
    "modules": [
      "m02",
      "m04",
      "m06"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 42,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "page": 29,
    "title": "Maintaining a two-value window",
    "hint": "Keep separate lengths for the last run and the current window.",
    "explanation": "On switching to the other known value the last equal run restarts at one. A new third value retains only the previous equal run, then adds one.",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m04.",
    "id": "2024-CS2-42"
  },
  {
    "modules": [
      "m03",
      "m05"
    ],
    "year": 2023,
    "set": "CS",
    "number": 36,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "page": 35,
    "title": "Constructing a function activation tree",
    "hint": "Attach each call to the invocation that makes it.",
    "explanation": "Main calls f1, f2 and f3. The outer f2 calls f3 and another f2; that inner call calls f3 and f1.",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "note": "Includes recursion and activation trees; revisit after recursion.",
    "id": "2023-CS-36"
  },
  {
    "modules": [
      "m04",
      "m06"
    ],
    "year": 2022,
    "set": "CS",
    "number": 21,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "page": 17,
    "title": "Writing through two different addresses",
    "hint": "Track x and each array element independently.",
    "explanation": "The first dereference sets x to ten. The later indexed address refers to z[1], which rises from eleven to fourteen; z[0] remains ten.",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-21"
  },
  {
    "modules": [
      "m02",
      "m04",
      "m06"
    ],
    "year": 2022,
    "set": "CS",
    "number": 43,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "page": 28,
    "title": "Traversing a three-dimensional array",
    "hint": "Identify the index that never changes.",
    "explanation": "j stays zero while i and k vary. The program therefore prints the first row of each of the three planes.",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "overlap": "This question is intentionally revisited because it combines m02, m04.",
    "id": "2022-CS-43"
  },
  {
    "modules": [
      "m01"
    ],
    "year": 2022,
    "set": "CS",
    "number": 44,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "page": 29,
    "title": "Bitwise operators on character codes",
    "hint": "Convert the characters to numeric codes before operating.",
    "explanation": "AND, OR and XOR give 80, 120 and 40. Applying the offsets gives character codes 122, 75 and 83: z, K and S.",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-44"
  },
  {
    "modules": [
      "m01",
      "m02"
    ],
    "year": 2021,
    "set": "CS1",
    "number": 37,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2021/cs_2021.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2021/cs_merged_2021.pdf",
    "page": 31,
    "title": "Short-circuiting a postfix increment",
    "hint": "Skip the right operand when the left operand is false.",
    "explanation": "For negative j, i does not increment. At zero it increments but yields false. The later iterations add one, two and three; final i is four.",
    "localPaper": "papers/paper-9085878377b6.pdf",
    "localKey": "papers/key-f36e374394b7.pdf",
    "numbering": "CS section question number; GA is numbered separately.",
    "overlap": "This question is intentionally revisited because it combines m01, m02.",
    "id": "2021-CS1-37"
  },
  {
    "modules": [
      "m01",
      "m02",
      "m03",
      "m04"
    ],
    "year": 2021,
    "set": "CS1",
    "number": 48,
    "type": "nat",
    "answer": 1023,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2021/cs_2021.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2021/cs_merged_2021.pdf",
    "page": 39,
    "title": "Accumulating with Horner-style updates",
    "hint": "Write the total after a few iterations.",
    "explanation": "Starting at one, nine updates double the total and add one. This produces 2 raised to 10, minus one: 1023.",
    "localPaper": "papers/paper-9085878377b6.pdf",
    "localKey": "papers/key-f36e374394b7.pdf",
    "numbering": "CS section question number; GA is numbered separately.",
    "overlap": "This question is intentionally revisited because it combines m01, m02, m03, m04.",
    "id": "2021-CS1-48"
  },
  {
    "modules": [
      "m02",
      "m03",
      "m05"
    ],
    "year": 2021,
    "set": "CS2",
    "number": 49,
    "type": "nat",
    "answer": 60,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2021/cs_2021.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2021/cs_merged_2021.pdf",
    "page": 85,
    "title": "Two-parameter recursive branching",
    "hint": "Build a small table of the reachable argument pairs.",
    "explanation": "Boundary branches reduce the remaining positive coordinate. The branching recurrence produces six terminal contributions, each equal to ten, for a total of sixty.",
    "localPaper": "papers/paper-9085878377b6.pdf",
    "localKey": "papers/key-f36e374394b7.pdf",
    "note": "Revisit after recursion.",
    "numbering": "CS section question number; GA is numbered separately.",
    "overlap": "This question is intentionally revisited because it combines m02, m03.",
    "id": "2021-CS2-49"
  },
  {
    "modules": [
      "m05",
      "m08"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 39,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "page": 28,
    "title": "Recursive list size",
    "hint": "Stop at the last node.",
    "explanation": "Each nonterminal node contributes one and recurses on its successor; the final node contributes one.",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "id": "2026-CS1-39"
  },
  {
    "modules": [
      "m05"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 61,
    "type": "nat",
    "answer": 65536,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "page": 45,
    "title": "Nested logarithmic recursion",
    "hint": "Work backwards from the base case.",
    "explanation": "bar computes floor(log2(n)). Minimum inputs for successive foo values are 1, 2, 4, 16, 65536.",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "id": "2026-CS1-61"
  },
  {
    "modules": [
      "m05",
      "m09"
    ],
    "year": 2023,
    "set": "CS",
    "number": 47,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "page": 50,
    "title": "Recursive subtree totals",
    "hint": "Return values are subtree sums.",
    "explanation": "Official key C assumes left-subtree evaluation before right and gives subtree sums 3, 8, 16, 13, 24, 50. Both recursive calls finish before printing the parent total, but C does not guarantee which operand of + is evaluated first. Therefore that exact print order is not portable; use C for the official exam key while recognizing its assumed order.",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "note": "Official key C follows left-subtree-before-right evaluation. In portable C, the + operator does not specify operand evaluation order; use separate statements to guarantee that print order.",
    "id": "2023-CS-47"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 62,
    "type": "nat",
    "answer": 5,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "page": 62,
    "title": "Deleting matching successor nodes",
    "hint": "The head is never tested for deletion.",
    "explanation": "Bypass matching successors while keeping the current pointer fixed after deletion. Five nodes remain.",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "id": "2025-CS1-62"
  },
  {
    "modules": [
      "m08",
      "m10"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 38,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 29,
    "title": "Melding linked and ordered structures",
    "hint": "Separate linking from rebuilding.",
    "explanation": "Lists concatenate in constant time; heap construction and merging sorted BST traversals each take linear time.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "id": "2025-CS2-38"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2023,
    "set": "CS",
    "number": 13,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "page": 10,
    "title": "Deletion in singly and doubly linked lists",
    "hint": "Consider deletion of the last node.",
    "explanation": "A singly linked list needs its predecessor found by traversal. A doubly linked node already provides that link.",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "id": "2023-CS-13"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2022,
    "set": "CS",
    "number": 15,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 1,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "page": 13,
    "title": "Reversing links with constant space",
    "hint": "Keep previous, current and next pointers.",
    "explanation": "Every link must change. One pass achieves linear time with a constant number of pointers.",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-15"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2026,
    "set": "CS2",
    "number": 50,
    "type": "msq",
    "answer": [
      "A",
      "B"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS2.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS2_Keys.pdf",
    "page": 36,
    "title": "Assigning arrivals to a stack or queue",
    "hint": "Stack output descends; queue output ascends.",
    "explanation": "Both A and B yield the required output by joining the popped stack prefix with the dequeued queue suffix.",
    "localPaper": "papers/paper-80914db78ae7.pdf",
    "localKey": "papers/key-0dd9ea86886f.pdf",
    "id": "2026-CS2-50"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 45,
    "type": "msq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "page": 34,
    "title": "Supporting constant-time stack minimum",
    "hint": "Preserve previous minima.",
    "explanation": "A minimum pointer per record restores the previous minimum after popping. A single global pointer cannot do this alone.",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "id": "2025-CS2-45"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 48,
    "type": "msq",
    "answer": [
      "B",
      "C",
      "D"
    ],
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "page": 33,
    "title": "Two stacks with limited capacity",
    "hint": "Track both capacities after every move.",
    "explanation": "A needs three buffered elements before reaching the bottom, exceeding capacity two. B, C and D have valid schedules.",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "id": "2024-CS2-48"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2023,
    "set": "CS",
    "number": 59,
    "type": "nat",
    "answer": 8,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "page": 62,
    "title": "Tracing mixed stack and queue operations",
    "hint": "Write stack bottom-to-top.",
    "explanation": "The four transferred values are 7, 8, 9, 2. Popping twice leaves 8 on top.",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "id": "2023-CS-59"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2022,
    "set": "CS",
    "number": 62,
    "type": "nat",
    "answer": 0,
    "marks": 2,
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "page": 40,
    "title": "Reversing into another queue",
    "hint": "Rotate the destination queue.",
    "explanation": "Enqueue each incoming item into Q2, then rotate Q2 until that item is first. Q1 needs no enqueue operations.",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-62"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2021,
    "set": "CS2",
    "number": 35,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 2,
    "page": 75,
    "title": "An uninitialized final link",
    "hint": "Inspect the last traversal iteration.",
    "explanation": "The last node has an uninitialized next field. Advancing through it and dereferencing the result causes undefined behavior.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2021/cs_2021.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2021/cs_merged_2021.pdf",
    "localPaper": "papers/paper-9085878377b6.pdf",
    "localKey": "papers/key-f36e374394b7.pdf",
    "id": "2021-CS2-35"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2021,
    "set": "CS1",
    "number": 21,
    "type": "nat",
    "answer": 86,
    "marks": 1,
    "page": 21,
    "title": "Separating LIFO and FIFO traces",
    "hint": "Keep the two containers separate.",
    "explanation": "The final stack removal yields 62; the second queue removal yields 24. Their sum is 86.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2021/cs_2021.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2021/cs_merged_2021.pdf",
    "localPaper": "papers/paper-9085878377b6.pdf",
    "localKey": "papers/key-f36e374394b7.pdf",
    "id": "2021-CS1-21"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2020,
    "set": "CS",
    "number": 16,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 1,
    "page": 7,
    "title": "Repeated sorted-list insertion",
    "hint": "Include the search for an insertion point.",
    "explanation": "Worst-case insertion scans the growing list. The sum of scan lengths is quadratic. Options continue on PDF page 8.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2020/cs_2020.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2020/cs_2020.pdf",
    "localPaper": "papers/paper-e0b337872b57.pdf",
    "localKey": "papers/paper-e0b337872b57.pdf",
    "keyPage": 17,
    "id": "2020-CS-16"
  },
  {
    "modules": [
      "m07",
      "m08"
    ],
    "year": 2018,
    "set": "CS",
    "number": 3,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "page": 4,
    "title": "Queue operations at opposite list ends",
    "hint": "Deleting the tail requires its predecessor.",
    "explanation": "Head insertion is constant time. Finding the predecessor of the tail requires a linear traversal.",
    "paperUrl": "https://drive.google.com/file/d/1HKbA_s2l0WBo0Z1z8XkU0x566rJEVwUP/view",
    "keyUrl": "https://drive.google.com/file/d/1HEcIz6mZoGfGGW3RMY0W2Mee6_65GW5R/view",
    "localPaper": "papers/paper-dbe756c332e8.pdf",
    "localKey": "papers/key-aa6f9a70376d.pdf",
    "provenance": "Original GATE paper and official answer key, mirrored by GATE Overflow (gatecse.in).",
    "sourceLabel": "Original exam / mirrored official key",
    "keyPage": 1,
    "id": "2018-CS-3"
  },
  {
    "modules": [
      "m07",
      "m08"
    ],
    "year": 2017,
    "set": "CS2",
    "number": 13,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "page": 5,
    "title": "Closing a linked circular queue",
    "hint": "Follow the rear node’s next pointer.",
    "explanation": "The rear links to the front. Updating a few links supports front deletion and rear insertion in constant time.",
    "paperUrl": "https://drive.google.com/file/d/10QDN7OWvrmjmj8FhmNcRdJaflR6g32Tr/view",
    "keyUrl": "https://drive.google.com/file/d/1LWmOwxMnFkNqNI5SWsrJzReXfAEbyZAQ/view",
    "localPaper": "papers/paper-3fe1a43a202d.pdf",
    "localKey": "papers/key-609d576e8aea.pdf",
    "provenance": "Original GATE paper and official answer key, mirrored by GATE Overflow (gatecse.in).",
    "sourceLabel": "Original exam / mirrored official key",
    "keyPage": 1,
    "id": "2017-CS2-13"
  },
  {
    "modules": [
      "m08"
    ],
    "year": 2017,
    "set": "CS1",
    "number": 8,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "page": 5,
    "title": "Concatenation and an empty-list edge case",
    "hint": "Test whether n can be NULL.",
    "explanation": "A nonempty n is traversed and linked to m. Empty n causes a null-pointer dereference at p->next.",
    "paperUrl": "https://drive.google.com/file/d/1dUQ2EFrZG4wv6MaNKU3-6CItdUVNcIov/view",
    "keyUrl": "https://drive.google.com/file/d/1XNwOUEbRa-IdQOTfnBJOrqN7XmtCGVrh/view",
    "localPaper": "papers/paper-d629a70416ef.pdf",
    "localKey": "papers/key-f28d107c14dd.pdf",
    "provenance": "Original GATE paper and official answer key, mirrored by GATE Overflow (gatecse.in).",
    "sourceLabel": "Original exam / mirrored official key",
    "keyPage": 1,
    "id": "2017-CS1-8"
  },
  {
    "modules": [
      "m05"
    ],
    "year": 2016,
    "set": "CS2",
    "number": 39,
    "type": "nat",
    "answer": [
      2.2,
      2.4
    ],
    "marks": 2,
    "page": 14,
    "title": "Reading recursive cost from a flowchart",
    "hint": "Count calls on the longest branch.",
    "explanation": "The longest path makes five half-sized recursive calls: T(n)=5T(n/2)+O(1), giving exponent log2(5), approximately 2.32.",
    "paperUrl": "https://drive.google.com/file/d/1VRzKhsOhvx1pfdtlmPdvM1pT9WdZV5Mq/view",
    "keyUrl": "https://drive.google.com/file/d/16DeLUMJH1noQrIlAvtv4dIjcDmR43oul/view",
    "localPaper": "papers/paper-df549f7c4fa8.pdf",
    "localKey": "papers/key-644364d6c129.pdf",
    "provenance": "Original GATE paper and official answer key, mirrored by GATE Overflow (gatecse.in).",
    "sourceLabel": "Original exam / mirrored official key",
    "keyPage": 1,
    "note": "Advanced recursion-cost extension; accepted official numeric range is 2.2–2.4.",
    "id": "2016-CS2-39"
  },
  {
    "modules": [
      "m05",
      "m06"
    ],
    "year": 2016,
    "set": "CS2",
    "number": 37,
    "type": "nat",
    "answer": 3,
    "marks": 2,
    "page": 13,
    "title": "Recursive adjacent differences",
    "hint": "Each frame compares one adjacent pair.",
    "explanation": "The return value is the maximum of zero and the adjacent forward differences. These are -2, 3, -4 and 2, giving 3.",
    "paperUrl": "https://drive.google.com/file/d/1VRzKhsOhvx1pfdtlmPdvM1pT9WdZV5Mq/view",
    "keyUrl": "https://drive.google.com/file/d/16DeLUMJH1noQrIlAvtv4dIjcDmR43oul/view",
    "localPaper": "papers/paper-df549f7c4fa8.pdf",
    "localKey": "papers/key-644364d6c129.pdf",
    "provenance": "Original GATE paper and official answer key, mirrored by GATE Overflow (gatecse.in).",
    "sourceLabel": "Original exam / mirrored official key",
    "keyPage": 1,
    "id": "2016-CS2-37"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 33,
    "page": 23,
    "type": "nat",
    "answer": 11,
    "marks": 1,
    "title": "Tallest full binary tree",
    "hint": "Extend one branch while preserving two children per internal node.",
    "explanation": "Each added internal node needs a sibling leaf. With 23 nodes, 11 internal nodes can form a spine of height 11.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "id": "2026-CS1-33"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 40,
    "page": 29,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 2,
    "title": "Insertion order and complete shape",
    "hint": "Determine the root and its two children first.",
    "explanation": "The root must be 8. Third insertions can include 4, 12, 2, 6, 10, or 14, but never 5.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "id": "2026-CS1-40"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2026,
    "set": "CS1",
    "number": 62,
    "page": 45,
    "type": "nat",
    "answer": 7,
    "marks": 2,
    "title": "Reconstruct a BST traversal",
    "hint": "Partition the preorder at each root.",
    "explanation": "Postorder is 13,30,47,40,25,70,60,77,80,75,50. Thus 60 appears seventh.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS1.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS1_Keys.pdf",
    "localPaper": "papers/paper-18c75979fbbf.pdf",
    "localKey": "papers/key-45faa791c9a4.pdf",
    "id": "2026-CS1-62"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2026,
    "set": "CS2",
    "number": 12,
    "page": 11,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 1,
    "title": "Match the three traversal orders",
    "hint": "Track when the root is visited.",
    "explanation": "Inorder places the root between subtrees; preorder visits it first; postorder visits it last.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS2.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS2_Keys.pdf",
    "localPaper": "papers/paper-80914db78ae7.pdf",
    "localKey": "papers/key-0dd9ea86886f.pdf",
    "id": "2026-CS2-12"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2026,
    "set": "CS2",
    "number": 49,
    "page": 35,
    "type": "msq",
    "answer": [
      "A",
      "C"
    ],
    "marks": 2,
    "title": "Insert between a leaf and its successor",
    "hint": "Consider disjoint inorder gaps.",
    "explanation": "Each inserted key occupies a distinct gap and becomes a right child of its leaf. Height increases by at most one. A maximum-only tree is a counterexample to B.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2026/QPs/CS2.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2026/Keys/CS2_Keys.pdf",
    "localPaper": "papers/paper-80914db78ae7.pdf",
    "localKey": "papers/key-0dd9ea86886f.pdf",
    "id": "2026-CS2-49"
  },
  {
    "modules": [
      "m09",
      "m10"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 26,
    "page": 26,
    "type": "msq",
    "answer": [
      "A",
      "B"
    ],
    "marks": 1,
    "title": "BST guarantees versus heap order",
    "hint": "Separate sorted traversal, balance, and heap properties.",
    "explanation": "The maximum possible height is n-1; inorder is sorted. An arbitrary BST can be skewed and need not satisfy min-heap order.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "id": "2025-CS1-26"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 35,
    "page": 26,
    "type": "nat",
    "answer": 4,
    "marks": 1,
    "title": "Build a BST and count depth",
    "hint": "Insert one key at a time.",
    "explanation": "The root-to-target path is 10,15,30,20,19, containing four edges.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "id": "2025-CS2-35"
  },
  {
    "modules": [
      "m09"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 39,
    "page": 26,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "title": "What can the key set determine?",
    "hint": "Distinguish a tree shape from its sorted contents.",
    "explanation": "Inorder is the sorted set regardless of insertion order. Root, preorder, and postorder depend on the resulting shape.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "id": "2024-CS2-39"
  },
  {
    "modules": [
      "m09",
      "m10"
    ],
    "year": 2022,
    "set": "CS",
    "number": 28,
    "page": 22,
    "type": "nat",
    "answer": 509,
    "marks": 1,
    "title": "BST ordering in a heap-style array",
    "hint": "Use zero-based child indices and reverse inorder.",
    "explanation": "Rightmost occupied node is 510, the maximum. Its parent 254 is second largest; its left child 509 is third largest.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-28"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 35,
    "page": 35,
    "type": "nat",
    "answer": 5,
    "marks": 1,
    "title": "Heap height from its size",
    "hint": "A binary heap is complete.",
    "explanation": "A complete binary tree with n nodes has edge-height floor(log2 n); for 32 nodes this is 5.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "id": "2025-CS1-35"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2019,
    "set": "CS",
    "number": 40,
    "page": 13,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "title": "Heap extrema and conversion costs",
    "hint": "Use heap order, then distinguish heap construction from sorting.",
    "explanation": "In the intended distinct-key comparison model, a minimum is among leaves and second maximum is a root child. BST-to-heap is linear; heap-to-BST would require comparison sorting.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2019/cs_2019.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2019/cs_2019.pdf",
    "localPaper": "papers/paper-875e3b0e5892.pdf",
    "localKey": "papers/paper-875e3b0e5892.pdf",
    "keyPage": 19,
    "id": "2019-CS-40"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 43,
    "page": 27,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "title": "Where can a min-heap maximum live?",
    "hint": "Count leaves, not all array positions.",
    "explanation": "With distinct keys, the maximum must be a leaf. A 105-node complete binary tree has 105-floor(105/2)=53 leaves.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "id": "2024-CS1-43"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2023,
    "set": "CS",
    "number": 12,
    "page": 9,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "title": "Recognize a max-heap array",
    "hint": "Check every parent against its children.",
    "explanation": "Use children 2i and 2i+1 for one-based indexing. Only option B satisfies every parent-child inequality.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "id": "2023-CS-12"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2023,
    "set": "CS",
    "number": 46,
    "page": 49,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 2,
    "title": "Priority queue operation costs",
    "hint": "How far can an element move?",
    "explanation": "Insertion sifts upward; extract-max replaces the root and sifts downward. Each crosses at most the logarithmic heap height.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2023/cs_2023.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2023/CS_ANS_GATE2023.pdf",
    "localPaper": "papers/paper-82eb753aa8dd.pdf",
    "localKey": "papers/key-345f01f1553f.pdf",
    "id": "2023-CS-46"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 18,
    "page": 18,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "title": "Distances in a graph and spanning tree",
    "hint": "A tree path is also a graph path.",
    "explanation": "Restricting available edges cannot shorten the optimum path. Therefore the graph distance is at most the tree distance.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "id": "2025-CS1-18"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2025,
    "set": "CS1",
    "number": 43,
    "page": 43,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 2,
    "title": "BFS height and graph diameter",
    "hint": "Apply the triangle inequality through the BFS root.",
    "explanation": "Diameter 30 is at most twice any root eccentricity. BFS height is that eccentricity, so it is at least 15.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS12025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS1_Keys.pdf",
    "localPaper": "papers/paper-baebd4b7f1b8.pdf",
    "localKey": "papers/key-e98ef3cc41a4.pdf",
    "id": "2025-CS1-43"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 29,
    "page": 23,
    "type": "msq",
    "answer": [
      "B",
      "C",
      "D"
    ],
    "marks": 1,
    "title": "BFS and DFS invariants",
    "hint": "Compare levels, ancestry, and reachability.",
    "explanation": "Undirected DFS has no cross edges. BFS edges join levels differing by at most one. Either search can discover components; DFS need not give shortest paths.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "id": "2025-CS2-29"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2025,
    "set": "CS2",
    "number": 37,
    "page": 28,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 2,
    "title": "Uniformly increasing edge weights",
    "hint": "Spanning trees all have the same edge count.",
    "explanation": "Every spanning tree gains the same total weight. Paths may contain different numbers of edges, so their ordering can change.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2025/CS22025.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2025_Key/CS2_Keys.pdf",
    "localPaper": "papers/paper-81a853046692.pdf",
    "localKey": "papers/key-9dd780ebea58.pdf",
    "id": "2025-CS2-37"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2024,
    "set": "CS1",
    "number": 45,
    "page": 28,
    "type": "msq",
    "answer": [
      "C"
    ],
    "marks": 2,
    "title": "One tree that is both BFS and DFS",
    "hint": "Ask what a forward edge would do to a BFS distance.",
    "explanation": "A non-tree forward edge skips at least one level, contradicting BFS distances. Back edges and cross edges can still occur.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS124S5.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS1FinalAnswerKey.pdf",
    "localPaper": "papers/paper-bfda193bd065.pdf",
    "localKey": "papers/key-8465a55d2e39.pdf",
    "id": "2024-CS1-45"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2024,
    "set": "CS2",
    "number": 17,
    "page": 13,
    "type": "mcq",
    "answer": [
      "B"
    ],
    "marks": 1,
    "title": "An adjacency matrix that is its inverse",
    "hint": "Inspect the diagonal entries of the matrix square.",
    "explanation": "A squared adjacency matrix has vertex degrees on its diagonal. A squared matrix equal to the identity forces every vertex to have degree one.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS224S6.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2024/CS2FinalAnswerKey.pdf",
    "localPaper": "papers/paper-7926f216ba9e.pdf",
    "localKey": "papers/key-68376f6c2209.pdf",
    "id": "2024-CS2-17"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2022,
    "set": "CS",
    "number": 30,
    "page": 22,
    "type": "nat",
    "answer": 36,
    "marks": 1,
    "title": "Maximum edges while disconnected",
    "hint": "Concentrate vertices into one largest component.",
    "explanation": "Use a complete graph on nine vertices and one isolated vertex. The edge count is 9 times 8 divided by 2, or 36.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-30"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2022,
    "set": "CS",
    "number": 37,
    "page": 24,
    "type": "mcq",
    "answer": [
      "D"
    ],
    "marks": 2,
    "title": "Count triangles using adjacency powers",
    "hint": "Count how many closed walks represent one triangle.",
    "explanation": "Each undirected triangle yields three starting vertices and two directions. Therefore divide trace(A cubed) by six.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-37"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2022,
    "set": "CS",
    "number": 49,
    "page": 32,
    "type": "msq",
    "answer": [
      "A",
      "B",
      "C"
    ],
    "marks": 2,
    "title": "Distinct weights and spanning-tree facts",
    "hint": "Use the cut property and Kruskal ordering.",
    "explanation": "The first two edges cannot form a cycle. If the third closes a triangle, the fourth is accepted. Unique lightest cut edges are mandatory; distinct weights imply uniqueness.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-49"
  },
  {
    "modules": [
      "m11"
    ],
    "year": 2022,
    "set": "CS",
    "number": 52,
    "page": 34,
    "type": "msq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "title": "Read graph properties from a matrix",
    "hint": "Degrees come from two-step walks back to the start.",
    "explanation": "The diagonal of A squared gives degrees. A cycle plus isolated vertices refutes C; disconnected components with edges refute D. Bipartite graphs refute B.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2022/cs_2022.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/Answer_keys2022/cs_2022.pdf",
    "localPaper": "papers/paper-86fc7de844d7.pdf",
    "localKey": "papers/key-18be7ddb5bba.pdf",
    "id": "2022-CS-52"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2018,
    "set": "CS",
    "number": 46,
    "type": "nat",
    "answer": 80,
    "marks": 2,
    "page": 19,
    "title": "Count distinct binary min-heaps",
    "hint": "Fix the root, partition the other keys, then count each subtree.",
    "explanation": "The minimum is the root. Choose three of the six remaining keys for the left subtree: 20 choices. Each three-node subtree has two arrangements, giving 20 times 2 times 2 = 80.",
    "paperUrl": "https://drive.google.com/file/d/1CboGjdOkvPzijQk8IXzsE6LdJst-xv9M/view",
    "keyUrl": "https://drive.google.com/file/d/1IqzR1oBuWFssrnPt7O61dxmKUQeT06gK/view",
    "localPaper": "papers/paper-b4d79272ecc5.pdf",
    "localKey": "papers/key-267fe6682741.pdf",
    "id": "2018-CS-46"
  },
  {
    "modules": [
      "m10"
    ],
    "year": 2020,
    "set": "CS",
    "number": 47,
    "type": "nat",
    "answer": 511,
    "marks": 2,
    "page": 14,
    "title": "Find the maximum in a binary min-heap",
    "hint": "Count possible maximum positions and then selection comparisons.",
    "explanation": "Only the 512 leaves need consideration. Finding the largest among 512 unordered candidates needs 511 comparisons.",
    "paperUrl": "https://gate2026.iitg.ac.in/doc/download/2020/cs_2020.pdf",
    "keyUrl": "https://gate2026.iitg.ac.in/doc/download/2020/cs_2020.pdf",
    "localPaper": "papers/paper-e0b337872b57.pdf",
    "localKey": "papers/paper-e0b337872b57.pdf",
    "keyPage": 18,
    "id": "2020-CS-47"
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2014,
    "set": "CS2",
    "number": 41,
    "type": "mcq",
    "answer": [
      "C"
    ],
    "marks": 2,
    "paperUrl": "https://gateatzeal.com/assets/images/papers/GATE%202014/CS2014%20Set%202.pdf",
    "keyUrl": "https://db.gateoverflow.in/2007/gate-cse-2014-set-2-question-41",
    "page": 17,
    "title": "A queue using a reversible stack",
    "hint": "Keep the oldest queue item at the top, and preserve that invariant after every operation.",
    "explanation": "Enqueue can reverse the stack, push the new item, and reverse again. This places the new item at the bottom while keeping the oldest item on top. Dequeue then needs only pop. Thus enqueue uses three instructions and dequeue one, giving C.",
    "localPaper": "papers/paper-05c56586cdd6.pdf",
    "sourceKind": "original-paper-mirror",
    "keyKind": "independently-solved-secondary-crosscheck",
    "note": "Original GATE paper hosted by Gate at Zeal. Printed CS page11/15 is PDFpage17. Answer independently derived and crosschecked against GateOverflow; this link is not an official answer key.",
    "id": "2014-CS2-41",
    "localKey": null
  },
  {
    "modules": [
      "m07"
    ],
    "year": 2012,
    "set": "CSA",
    "number": 35,
    "type": "mcq",
    "answer": [
      "A"
    ],
    "marks": 2,
    "paperUrl": "https://gateatzeal.com/assets/images/papers/GATE%202012/CS2012.pdf",
    "keyUrl": "https://gateforum.com/wp-content/uploads/2013/01/CS-GATE-2012.pdf",
    "page": 8,
    "title": "Distinguishing empty and full circular queues",
    "hint": "Reserve one array slot, then compare the next insertion index with the removal index.",
    "explanation": "With one spare slot, equal front and rear indices mean empty. Inserting another item would consume the spare slot exactly when (rear+1)%n equals front, so this is the full condition. These two conditions correspond to A.",
    "localPaper": null,
    "localKey": null,
    "sourceKind": "original-paper-mirror-online-only",
    "keyKind": "independently-solved-secondary-crosscheck",
    "keyPage": 18,
    "note": "Verified against GATE2012 BookletA Q35, original PDFpage8. Wording adapted for this offline edition; the mathematical options and their order are preserved. The original PDF is online only. Answer independently derived; the secondary solved paper calls this Q38 on page18 and is not an official key.",
    "offlinePrompt": "An n-slot array implements a circular FIFO buffer with room for n−1 entries. REAR chooses the insertion position; FRONT chooses the removal position. Both begin at zero. Which pair of tests identifies a full buffer and an empty buffer?",
    "offlineOptions": [
      "Full: (REAR+1)%n == FRONT; Empty: REAR == FRONT",
      "Full: (REAR+1)%n == FRONT; Empty: (FRONT+1)%n == REAR",
      "Full: REAR == FRONT; Empty: (REAR+1)%n == FRONT",
      "Full: (FRONT+1)%n == REAR; Empty: REAR == FRONT"
    ],
    "sourceLabel": "GATE PYQ · wording adapted",
    "id": "2012-CSA-35"
  }
];
(() => {
const selected={"m01":["2026-CS2-61","2025-CS2-33","2025-CS2-62","2025-CS1-63","2025-CS2-63","2024-CS1-18","2024-CS1-48","2022-CS-44","2021-CS1-37","2021-CS1-48"],"m02":["2026-CS1-34","2026-CS2-61","2025-CS2-19","2025-CS1-33","2025-CS2-33","2025-CS1-63","2025-CS2-63","2024-CS1-17","2024-CS1-18","2024-CS2-33"],"m03":["2026-CS1-34","2026-CS2-61","2025-CS2-19","2025-CS1-34","2025-CS1-61","2025-CS1-63","2025-CS2-63","2024-CS2-13","2024-CS1-19","2024-CS2-33"],"m04":["2026-CS2-60","2025-CS2-19","2025-CS1-33","2025-CS1-34","2025-CS1-61","2025-CS2-62","2024-CS1-17","2024-CS2-33","2024-CS2-36","2024-CS2-42"],"m05":["2026-CS1-39","2026-CS2-61","2026-CS1-61","2025-CS1-61","2024-CS1-19","2023-CS-36","2023-CS-47","2021-CS2-49","2016-CS2-37","2016-CS2-39"],"m06":["2025-CS2-19","2025-CS1-33","2025-CS1-61","2025-CS2-62","2024-CS1-17","2024-CS2-33","2024-CS2-36","2024-CS2-42","2022-CS-21","2022-CS-43"],"m07":["2026-CS2-50","2025-CS2-45","2024-CS2-48","2023-CS-59","2022-CS-62","2021-CS1-21","2018-CS-3","2017-CS2-13","2014-CS2-41","2012-CSA-35"],"m08":["2026-CS1-39","2025-CS2-38","2025-CS1-62","2023-CS-13","2022-CS-15","2021-CS2-35","2020-CS-16","2018-CS-3","2017-CS1-8","2017-CS2-13"],"m09":["2026-CS2-12","2026-CS1-33","2026-CS1-40","2026-CS2-49","2026-CS1-62","2025-CS1-26","2025-CS2-35","2024-CS2-39","2023-CS-47","2022-CS-28"],"m10":["2025-CS1-26","2025-CS1-35","2025-CS2-38","2024-CS1-43","2023-CS-12","2023-CS-46","2022-CS-28","2020-CS-47","2019-CS-40","2018-CS-46"],"m11":["2025-CS1-18","2025-CS2-29","2025-CS2-37","2025-CS1-43","2024-CS2-17","2024-CS1-45","2022-CS-30","2022-CS-37","2022-CS-49","2022-CS-52"]};
const E=GATE.esc;
for(const [id,ids] of Object.entries(selected)){
 const m=GATE.modules[id];
 m.pyqs=ids.map(key=>{
 const r=window.PYQ_CATALOG.find(x=>x.id===key),paper=(r.localPaper||r.paperUrl)+'#page='+r.page;
 const type=r.type;
 const letters=Array.isArray(r.answer)?r.answer:[];
 const ans=type==='nat'?r.answer:type==='msq'?letters.map(c=>'ABCD'.indexOf(c)):'ABCD'.indexOf(letters[0]);
 if(type!=='nat'&&(type==='mcq'?ans<0:ans.some(x=>x<0)))throw Error('Bad key '+r.id);
 const overlap=r.modules.length>1?'Cross-topic practice: '+r.modules.map(x=>GATE.modules[x]?.title||x).join(' · '):'';
 const keyLinks=r.localKey?'<a href="'+E(r.localKey+(r.keyPage?'#page='+r.keyPage:''))+'" target="_blank" rel="noopener">Check official answer key ↗</a> · <a href="'+E(r.keyUrl)+'" target="_blank" rel="noopener">Online key source</a>':'Answer independently derived in this guide. <a href="'+E(r.keyUrl)+'" target="_blank" rel="noopener">Secondary solution cross-check (online)</a>';
 return {type,answer:ans,year:r.year+' '+r.set+' · Q'+r.number,marks:r.marks,tag:r.sourceLabel||(r.localKey?'Official paper':'Original paper · independently checked answer'),
 q:'<h3>'+E(r.title)+'</h3><div class="q-source"><span class="source-badge">GATE '+r.year+' · '+E(r.set)+' · QUESTION '+r.number+' · PDF PAGE '+r.page+'</span>'+(r.offlinePrompt?'<p><b>Offline wording adapted from the verified original.</b></p><p>'+E(r.offlinePrompt)+'</p>':'<p>Read the exact question and options in the original paper, then answer below using its original option order.</p>')+'<a class="btn small primary" href="'+E(paper)+'" target="_blank" rel="noopener">'+(r.localPaper?'Open original question ↗':'Verify original paper (online) ↗')+'</a>'+(r.localPaper?'<details class="pdf-view"><summary>Read the paper inline</summary><iframe title="Original question paper '+E(r.id)+'" data-src="'+E(paper)+'"></iframe></details>':'')+'</div>'+ (overlap?'<p class="muted-note">'+E(overlap)+'. Complete the relevant lessons before attempting.</p>':'')+(r.note?'<p class="muted-note">'+E(r.note)+'</p>':'')+'<details><summary>Hint</summary><p>'+E(r.hint)+'</p></details>',
 options:type==='nat'?undefined:r.offlineOptions||['Option A in the original paper','Option B in the original paper','Option C in the original paper','Option D in the original paper'],
 explain:'<p>'+E(r.explanation)+'</p><p>'+keyLinks+' · <a href="'+E(r.paperUrl)+'" target="_blank" rel="noopener">Original online paper</a></p>'};
 });
 m.pyqNote=id==='m00'?m.pyqNote:'Ten sourced GATE questions, selected for this topic. Some combine multiple concepts; the card identifies those prerequisites. Read the bundled paper or the explicitly labeled offline adaptation, preserve the option order, answer here, and inspect the explanation. Available official keys are bundled. Independently checked answers are labeled.';
 if(m.pyqs.length<10)m.pyqNote=m.pyqs.length+' verified questions currently included. No invented questions are labeled as PYQs.';
}
})();
