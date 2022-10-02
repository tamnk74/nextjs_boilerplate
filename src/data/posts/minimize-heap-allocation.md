---
title: 'Minimize Heap Allocations in Node.js'
date: '2022-10-02'
tags: ['nodejs', 'javascript']
---


# **[Heap Allocation in Node.js](https://blog.appsignal.com/2022/09/28/minimize-heap-allocations-in-nodejs.html)**

Memory management has always been a source of huge concern in Computer Science. Each piece of software is assigned a small portion of a computer’s finite memory; this memory has to be well-managed (carefully allocated and deallocated).

With its efficient automatic garbage collection mechanism, Node.js tries to handle the tedious task of memory management and free up developers to work on other tasks. While this is great, understanding the mechanism of memory management in V8 and Node.js is still important, especially when working on large applications.

This article explains how memory is allocated and deallocated in the heap. We'll also provide guidelines to help you minimize heap allocation and prevent memory leaks in Node.js.

Let's get going!

## **Heap Allocation in Node.js**

JavaScript and Node.js abstract a lot of things for you and do most of the heavy lifting in the background.

On executing a program, variables and objects are stored in the stack or the heap. JavaScript code is stored in the Execution Context to be executed.

### **The Stack**

When you declare a variable and assign a primitive data type, JavaScript assigns a fixed amount of memory at a memory address for it on the call stack. Primitive data types are immutable — their value cannot be changed. The variable may be reassigned a new value, but the existing value can not be altered.

This makes data allocation and deallocation easy in the stack, following a simple **`LIFO`** (Last In First Out) approach. Data types stored in the stack include:

- **`undefined`**
- **`string`**
- **`number`**
- **`boolean`**
- **`bigint`**
- **`null`**
- references to objects stored in the heap

In JavaScript, primitives are assigned/passed **by value** and not **by reference**. If you assign a primitive type's value to another variable, the value is copied - not assigned a reference to the first variable (which is what happens for objects). You can see this in the example below.

```bash
let num1 = 5;let num2 = num1; 
num1 = 6;console.log({ num1, num2 }); // { num1: 6, num2: 5 }
```

When you log **`num1`** and **`num2`** to the console, the value of **`num1`** is 6, whereas **`num2`** still maintains the value of 5. When **`num1`** is assigned to **`num2`** the JavaScript engine creates a copy of its value and assigns it to **`num2`**, so the two variables have a different copy of a value. Changing one variable's value down the line has no effect on the other variable.

In some programming languages (e.g. C++ and Pascal), each type can be passed by value or reference, so the developer is at liberty to decide this, but not with JavaScript. In JavaScript, primitive types are passed by value, and objects are passed by reference. This also determines how they are stored in memory — primitive values are stored on the stack while objects are stored on the heap, with a reference to their location stored on the stack.

One important thing to note about variables stored in the stack is that their sizes must be known at compile time. This allows a program to allocate the right amount of memory in the stack. Because the JavaScript engine allocates a fixed amount of memory for primitive values, there is a limit to how large they can be.

### **The Heap**

Memory allocation, as described above, is only possible with primitive variables. Dynamic variables or reference data types such as objects, functions, and arrays cannot be stored in the stack — they must be stored in the heap.

Unlike the stack, the heap does not follow the **`LIFO`** protocol. The sizes of functions and objects can only be determined at runtime, and so a program cannot allocate space for them in the stack. This requires dynamic memory allocation, where memory is stored in the heap and a pointer to that memory address is stored in the stack.

Consider the following example below.

```bash
const personObject = {  id: 1,  name: "Samuel",  age: 30,}; 
const personFunction = () => {  return personObject.age;};
```

The variables **`personObject`** and **`personFunction`** are stored in the stack, but their value is a pointer to a memory address in the heap. **`personObject`** and **`personFunction`** are assigned memory in the heap and a pointer to that memory address is stored in the stack.

If you assign the value of an object to another, the reference to that object will be assigned to the first object, so they will both point to the same object in memory.

For instance:

```bash
let personObject = {  id: 1,  name: "Samuel",  age: 30,}; 
let newPersonObject = personObject; // this will point to the same heap memory as personObject 
newPersonObject.name = "Alex"; 
console.log(personObject); // { id: 1, name: 'Alex', age: 30 }console.log(newPersonObject); // { id: 1, name: 'Alex', age: 30 }
```

Changing **`newPersonObject`** changes **`personObject`** because they both point to the same object.

## **Why Is Efficient Heap Memory Usage Important in Node.js?**

Memory stored in the heap will live on unless it is explicitly deleted or deallocated. The heap is a large chunk of contiguous memory blocks and is expected to remain so even after allocation and deallocation.

Unfortunately, due to the way heap memory is allocated and deallocated, memory can be wasted and so cause a leak.

To allocate memory in the heap, a program must first scan the heap to find a contiguous memory block large enough to hold the data. If a sufficient chunk is not found, the program will request an increase in heap space. If such a byte of virtual memory is still available in the operating system, it will be provided — but if not, the program will be notified (in some cases, the program may crash).

Since running a program involves accumulating precious virtual memory resources, a program must free memory when it is no longer needed (this is deallocation).

Furthermore, if memory is freed (irrespective of where it's freed in the heap), the heap is expected to merge to maintain the contiguous memory block form. As a result of increased complexity in heap memory, storing memory here can lead to a higher overhead (but comes with greater flexibility).

Although Node.js has an efficient garbage collection mechanism, inefficient use of the heap can lead to memory leaks. An application can use up too much memory or even crash.

## **Causes of Node.js Memory Leaks in the Heap**

The garbage collector tries hard to find and deallocate orphaned memory, but sometimes it may not be able to keep track of every piece of memory. This may result in unnecessary increases in load, especially for large applications. We’ll talk more about how the garbage collector works in Node.js later.

Some of the most common causes of memory leaks include:

- multiple references
- global variables
- closures
- timers
- events

It is easy to have several pointers or references to one object. While this may be convenient for you, it can also lead to memory issues if one reference to an object is garbage collected, but others are not.

Forgotten timers and callbacks are two of the most common causes of memory leaks in Node.js and JavaScript applications. Objects tied to timers will not be garbage collected until they time out. If a timer runs forever (which can easily occur in faulty code), objects will never be garbage collected. This will happen even if there are no pointers to the objects and so will create a memory leak in the heap.

Consider the following program:

```bash
const language = () => {  console.log("Javascript");  setTimeout(() => language(), 1000);};
```

The program will run forever and never be garbage collected.

## **How to Find Memory Leaks in Node.js**

Several tools are available to detect and debug memory leaks in Node.js, including Chrome DevTools, Node’s **`process.memoryUsage`** API, and AppSignal's garbage collection magic dashboard.

### **Chrome DevTools**

Chrome DevTools is perhaps one of the simplest. To activate the debugger, you need to start Node in inspect mode. Run **`node --inspect`** to do this.

More specifically, if your Node's entry point is **`app.js`**, you'll need to run **`node --inspect app.js`** to debug the Node app. Then, open a Chromium browser and go to **`chrome://inspect`**. You can also open the inspector page on Edge at **`edge://inspect`**. On the inspector page, you should see a page like this:

[https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-inspect-devices.png&w=3840&q=75](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-inspect-devices.png&w=3840&q=75)

Notice that the Node app you are trying to debug appears at the bottom of the inspector page. Click on **`inspect`** to open the debugger. The debugger has two important tabs — **`Memory`** and **`Profiler`** — but we'll focus on the **`Memory`** tab in this discussion.

[https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fnode-debugger.png&w=3840&q=75](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fnode-debugger.png&w=3840&q=75)

The easiest way to find a memory leak with the Chrome debugger is by taking a heap snapshot. The snapshot helps you inspect some variables or check their retainer size.

You can also compare several snapshots to find a memory leak. For instance, you can take a snapshot before a memory leak, and another snapshot after a memory leak, then compare the two. To take a snapshot, click on **`Heap snapshot`** and then the **`Take snapshot`** button. This may take some time, depending on your application's **`Total JS heap size`**. You can also load existing snapshots by clicking on the **`Load`** button at the bottom of the DevTool.

When you have two or more snapshots, you can easily compare the heap allocations to find the source of a memory leak. You can view the snapshot by:

- **Summary** - groups the objects in your Node application by their constructor names
- **Comparison** - shows the difference between two snapshots
- **Containment** - allows you to explore the heap content and analyze objects referenced in the global namespace
- **Statistics**

[https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-debugger-views.png&w=3840&q=75](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-debugger-views.png&w=3840&q=75)

Two columns stand out in the DevTools Heap Profiler — namely, **`Shadow Size`** and **`Retainer Size`**.

The **`Shadow Size`** is the memory size of the object itself. This memory size won't be large for most objects, except arrays and strings. On the other hand, the **`Retained Size`** is the memory size freed when the object in question and dependent objects are freed or made unreachable from the root.

Chrome DevTools is not the only way to take a heap snapshot. If you work with Node.js version 12.0 or higher, you can also take the snapshot by running the **`node --heapsnapshot-signal`** command.

`node --heapsnapshot-signal=SIGUSR2 app.js`

While you can use any signal for this, the user-defined signals **`SIGUSR1`** or **`SIGUSR2`** are recommended.

If you want to get a heap snapshot from an application running on a server, it may be better to use the **`writeHeapSnapshot`** function from the **`v8`** package.

`require("v8").writeHeapSnapshot();`

This method is possible in Node.js version 11.13 or higher. In earlier versions, you can achieve the same result with the heapdump package.

A heap snapshot is not the only way to debug memory issues with Chrome DevTools. You can also trace every heap allocation with **`Allocation instrumentation on timeline`**.

The allocation timeline shows instrumented memory allocations over time. To enable this, start the profiler, then run your application samples to start debugging memory issues. If you want to record memory allocations for a long-running operation and intend to minimize performance overhead, the best option is the **`Allocation sampling`** method.

### **Node’s `process.memoryUsage` API**

You can also observe memory usage using Node’s **`process.memoryUsage`** API. Run **`process.memoryUsage()`**, and you'll access the following:

- **rss** - amount of memory allocated
- **heapTotal** - total size of the allocated heap
- **heapUsed** - total amount of memory used when executing the process
- **arrayBuffers** - memory allocated for the Buffer instances

### **AppSignal's Garbage Collection Magic Dashboard**

To keep an eye on the growth of your heap, AppSignal has a [handy garbage collection magic dashboard](https://www.appsignal.com/nodejs/express-js-performance-monitoring). This dashboard is automatically generated for you when you connect your Node.js app to AppSignal!

Check out this example, where you can clearly see a spike in memory usage in the 'V8 Heap Statistics' graph:

[https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fheap-graph.png&w=3840&q=75](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fheap-graph.png&w=3840&q=75)

If this dashboard shows a steady increase, there might be a memory leak in your code, or in a dependency.

[Discover more about AppSignal for Node.js](https://www.appsignal.com/nodejs).

Now is a good time to look at how garbage collection works.

## **How Garbage Collection Works**

You know how to find memory leaks, but how can you fix them? We'll find out soon, but first, it's important to understand how Node.js and V8 (in general) handle garbage collection.

Garbage collection (GC) frees up (deallocates) memory when it is not needed. To work efficiently, the algorithm for garbage collection must properly define and identify what *not needing memory means*.

In reference counting GC algorithms, an object in the heap is garbage collected if it no longer has a reference in the stack. This algorithm works by counting references — so if the reference count is zero, the object will be up for garbage collection. Although this algorithm works most times, it fails on circular references.

Consider the following example.

```bash
let data = {};data.el = data; 
let obj1 = {};let obj2 = {};obj1.a = obj2;obj2.a = obj1;
```

Objects with circular references will never go out of scope or be garbage collected, even if they are no longer needed or used. This forms a memory leak and can make your application inefficient. Thankfully, Node.js no longer uses this algorithm for garbage collection.

Rather than counting references, Node.js considers an object ready for garbage collection if it can no longer be reached or referenced (either directly or indirectly) from the root.

The root in Javascript is a global object. In the browser, the root is the **`window`** object, but in Node.js, the root is the **`global`** object. This algorithm is more efficient than the reference counting algorithm and solves the circular references issue.

Considering the example above, although **`obj1`** and **`obj2`** still have a circular reference, they will be garbage collected if they are no longer reachable from the root (no longer needed).

This algorithm, commonly known as the **`mark and sweep`** algorithm, is useful. However, you must be careful and explicitly make an object unreachable from the root to ensure that it is garbage collected.

## **Fix Memory Leaks in Your Node.js App**

Now for the fun part! Here are some ways to improve heap memory allocation and prevent memory leaks.

### **Avoid Global Variables**

Global variables include variables declared with the **`var`** keyword, the **`this`** keyword, and variables not declared with a keyword.

We’ve established that accidental global variables (and any other form of global variables) can cause memory leaks. They will always be reachable from the root, and so cannot be garbage collected unless they are explicitly set to null.

Consider the following example:

```bash
function variables() {  this.a = "Variable one";  var b = "Variable two";  c = "Variable three";}
```

These three variables are global variables. To avoid the use of global variables, consider switching the **`strict`** mode by adding the **`use strict`** directive to the top of the file.

### **Use `JSON.parse`**

JSON has a much simpler syntax than JavaScript, so it is much easier to parse than JavaScript objects.

As a matter of fact, if you work with a large JavaScript object, you can speed up performance up to 1.7 times in V8 and Chrome by parsing the stringified form as JSON.

There is a possibility of even greater performance in some other JavaScript engines, like Safari. This optimization method is used in Webpack to improve performance in front-end apps.

For instance, rather than using the following JavaScript objects:

```bash
const Person = { name: "Samuel", age: 25, language: "English" };
```

It's more efficient to stringify them and then parse this as JSON.

```bash
const Person = JSON.parse('{"name":"Samuel","age":25,"language":"English"}');
```

### **Split Large Data Processing into Chunks and Spawn Processes**

You might get a weird **`Heap out of memory`** error when processing large datasets, such as large CSV files. Of course, you could increase your application’s memory limit to handle the processing, but a better method is to split the data into chunks.

In some cases, scaling your Node.js app on multi-core machines may help. This involves separating your application to master and worker processes. The workers handle the heavy logic, while the master controls the workers and restarts them when they run out of memory.

### **Use Timers Efficiently**

We’ve established that timers can cause a memory leak. To improve heap memory management, ensure that your timers don't run forever.

In particular, when a timer is created with **`setInterval`**, it is crucial to call **`clearInterval`** when the timer is no longer needed.

It is also a good practice to call **`clearTimeout`** or **`clearImmediate`** when you no longer need to create a timer with **`setTimeout`** or **`setImmediate`**.

```bash
const timeout = setTimeout(() => {  console.log("timeout");}, 1500); 
const immediate = setImmediate(() => {  console.log("immediate");}); 
const interval = setInterval(() => {  console.log("interval");}, 500); 
clearTimeout(timeout);clearImmediate(immediate);clearInterval(interval);
```

### **Remove Unnecessary Variables in a Closure**

Closures are a common concept in Javascript. They are functions (or callbacks) inside another function. If a variable is used in a function, it will be marked for garbage collection when the function returns — but this may not be the case for closures.

Consider the following example:

```bash
const func = () => {  let Person1 = { name: "Samuel", age: 25, language: "English" };  let Person2 = { name: "Den", age: 23, language: "Dutch" }; 
  return () => Person2;};
```

This function will reference a scope and keep every variable in that scope. In other words, both **`Person2`** and **`Person1`** will be kept in scope when you only need **`Person2`**.

As a result, this consumes more memory, resulting in a memory leak. To fix this, only declare variables you need and null out the ones you don’t need.

For instance:

```bash
const func = () => {  let Person1 = { name: "Samuel", age: 25, language: "English" };  let Person2 = { name: "Den", age: 23, language: "Dutch" };  Person1 = null;  return () => Person2;};
```

### **Unsubscribe from Observers and Event Emitters**

Observers and event emitters with long lifespans can be a source of memory leaks, especially if you do not unsubscribe from them when they are no longer needed.

Consider the following example.

```bash
const EventEmitter = require("events").EventEmitter;const emitter = new EventEmitter(); 
const bigObject = {}; //Some big objectconst listener = () => {  doSomethingWith(bigObject);};emitter.on("event1", listener);
```

Here, we retain the memory for **`bigObject`** until the listener is released from the emitter, or the emitter is garbage collected. To fix this issue, we need to call **`removeEventListener`** to release the listener from the emitter.

```bash
emitter.removeEventListener("event1", listener);
```

It is also possible for memory leaks to occur when there are more than 10 event listeners attached to an emitter. Most times, you can solve this problem by writing more efficient code.

But, in some cases, you may need to explicitly set the max event listener.

For instance:

```bash
emitter.setMaxListeners(n); //where n is the new maximum event listener.
```

## **Wrap Up**

In this post, we explored how to minimize your heap and detect memory leaks in Node.js.

We started by looking at heap allocation in Node, including how the stack and the heap work. We then considered why it's important to keep track of your memory usage and the causes of memory leaks.

Next, we saw how to find memory leaks using Chrome DevTools, Node’s **`process.memoryUsage`** API, and AppSignal's garbage collection magic dashboard.

Finally, we discovered how garbage collection works and shared some methods to fix memory leaks in your app.

Like any other programming language, memory management is very important in JavaScript and Node.js. I hope you've found this introduction useful. Happy coding!