(function(){
"use strict";
var WEEKS = [
  { num:1, aim:"To compare Java with other popular languages and to install the JDK, configure it and run a first program on Windows.", tasks:["Compared Java, C, C++, Python and JavaScript on features such as memory management, security and performance.", "Matched languages to needs like system programming, enterprise apps, web, AI and mobile.", "Installed Oracle JDK and OpenJDK, and checked them with java --version and javac --version.", "Set JAVA_HOME and added %JAVA_HOME%\bin to PATH.", "Wrote, compiled and ran the Hello World program."] },
  { num:2, aim:"To practise basic Java concepts: data types, variables, type conversion and casting, and control statements.", tasks:["Declared and displayed all eight primitive data types and different kinds of variables.", "Performed arithmetic on integers and floating-point numbers, and swapped two variables.", "Showed widening conversion, narrowing casting and character to ASCII/Unicode conversion.", "Used if-else to check even or odd and to find the larger of two numbers.", "Saw why keywords cannot be identifiers, and printed 1 to 10 with a for loop."] },
  { num:3, aim:"To understand class fundamentals, objects, object references and methods.", tasks:["Built Student and Employee information programs using classes and display methods.", "Created several Book objects and an array of five Student objects filled through Scanner.", "Assigned and compared object references to see how they point to the same object.", "Wrote methods with return values for a Calculator and a Rectangle (area and perimeter)."] },
  { num:4, aim:"To work with constructors, the this keyword and garbage collection.", tasks:["Used default, parameterised and overloaded constructors in Student and BankAccount classes.", "Used the this keyword and constructor chaining with this(...).", "Requested garbage collection with System.gc() and used finalize().", "Showed which objects become eligible for garbage collection.", "Started method overloading with a Calculator class."] },
  { num:5, aim:"To use method overloading and to pass objects to and return objects from methods.", tasks:["Overloaded add methods in a Calculator and area methods for circle, rectangle and square.", "Passed Student objects as parameters and compared two Employee salaries.", "Returned Student and BankAccount objects from methods.", "Began static variables with a student counter."] },
  { num:6, aim:"To understand static members, the final keyword, and nested and inner classes.", tasks:["Used a static variable to count students, and static methods for square, cube and factorial.", "Applied final to a variable, a method and a class, and used a blank final variable.", "Built static nested classes: College.Department and Employee.Address.", "Built inner classes used through an outer object: Student.Address and Library.Book."] },
  { num:7, aim:"To work with the String, StringBuffer and StringTokenizer classes.", tasks:["Created strings from literals, character arrays, byte arrays and the new keyword.", "Compared == with equals() to see how string objects are stored.", "Used append, insert, replace, delete and reverse on a StringBuffer, and checked its length and capacity.", "Split sentences into tokens with StringTokenizer, using the default and a custom delimiter."] },
  { num:8, aim:"To implement inheritance, method overriding and dynamic method dispatch.", tasks:["Wrote single and multilevel inheritance programs, such as Person, Employee and Manager.", "Used super to call parent constructors, methods and variables.", "Overrode methods (Animal, Dog, Cat) and showed runtime polymorphism with Shape, Circle, Rectangle and Triangle.", "Observed the order of constructor execution in multilevel inheritance.", "Built a banking application with SavingsAccount and CurrentAccount subclasses."] },
  { num:9, aim:"To create and use packages and interfaces in Java.", tasks:["Created user-defined packages and used specific and wildcard imports.", "Compared public, protected, default and private access across packages.", "Set the CLASSPATH and built a bank package with several classes.", "Implemented single, multiple and nested interfaces, and interface inheritance.", "Showed interface polymorphism and built a payment processing system."] },
  { num:10, aim:"To handle runtime errors with exception handling and to read and write files with byte streams.", tasks:["Used try, catch and finally, multiple catch blocks, throw and throws.", "Observed an uncaught exception and its stack trace.", "Created custom exceptions for insufficient funds and invalid marks.", "Read and copied files with InputStream, OutputStream, FileInputStream and FileOutputStream.", "Copied an image and handled FileNotFoundException and IOException with try-catch-finally."] },
  { num:11, aim:"To read and write files with character streams and to create and control threads.", tasks:["Read keyboard input with Reader and wrote to the console with Writer.", "Read, wrote and copied text files with FileReader and FileWriter.", "Counted the characters, words and lines in a text file.", "Showed the main thread&#x27;s name, priority and state.", "Created threads with Thread and Runnable, and used isAlive() and join() to control them."] },
  { num:12, aim:"To work with thread priorities, synchronization and lambda expressions in Java.", tasks:["Set and observed thread priorities using MIN_PRIORITY, NORM_PRIORITY and MAX_PRIORITY.", "Used synchronized methods and synchronized blocks to protect a shared counter.", "Demonstrated a race condition and removed it with synchronization, and built a synchronized ticket-booking system.", "Implemented functional interfaces with lambda expressions, including single-parameter, multi-parameter and block lambdas.", "Used generic functional interfaces, lambdas with ArrayList (forEach, sort) and started a thread with a lambda."] }
];

var pages = {home: document.getElementById("page-home"),
             weeks: document.getElementById("page-weeks"),
             detail: document.getElementById("page-detail")};
var curtain = document.getElementById("curtain");
var toastEl = document.getElementById("toast");
var toastTimer;

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove("show"); }, 3400);
}

function goTo(name){
  curtain.classList.add("running");
  setTimeout(function(){
    Object.keys(pages).forEach(function(k){ pages[k].classList.remove("active"); });
    pages[name].classList.add("active");
    window.scrollTo({top:0, behavior:"instant"});
  }, 480);
  setTimeout(function(){ curtain.classList.remove("running"); }, 1000);
}

/* ---- Build the week grid ---- */
var grid = document.getElementById("weekGrid");
WEEKS.forEach(function(w){
  var b = document.createElement("button");
  b.className = "week-btn";
  b.type = "button";
  b.innerHTML = "Week " + w.num + "<span>View details</span>";
  b.addEventListener("click", function(){ openDetail(w.num); });
  grid.appendChild(b);
});

function openDetail(num){
  var w = WEEKS.find(function(x){ return x.num === num; });
  document.getElementById("detailTitle").textContent = "Week " + w.num;
  document.getElementById("detailAim").textContent = w.aim;
  var ul = document.getElementById("detailTasks");
  ul.innerHTML = "";
  w.tasks.forEach(function(t){
    var li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
  var file = "assets/week" + w.num + ".pdf";
  var view = document.getElementById("viewBtn");
  var dl = document.getElementById("downloadBtn");
  view.href = file;
  dl.href = file;
  dl.setAttribute("download", "Week-" + w.num + ".pdf");
  document.getElementById("shareBtn").onclick = function(){ shareDoc(w.num, file); };
  goTo("detail");
}

function shareDoc(num, file){
  var url = new URL(file, window.location.href).toString();
  var data = { title: "Java Lab Record - Week " + num, text: "Week " + num + " lab document", url: url };
  if (navigator.share){
    navigator.share(data).catch(function(){});
  } else if (navigator.clipboard){
    navigator.clipboard.writeText(url).then(function(){
      showToast("Link copied: " + file);
    }).catch(function(){ showToast("Share this file: " + file); });
  } else {
    showToast("Share this file: " + file);
  }
}

document.getElementById("backBtn").addEventListener("click", function(){ goTo("weeks"); });

/* ---- Seal mini-game: press and hold to break the seal ---- */
var seal = document.getElementById("seal");
var ring = document.getElementById("sealProgress");
var HOLD_MS = 1100, CIRC = 339;
var raf, startTime, holding = false;

function setProgress(p){ ring.style.strokeDashoffset = CIRC * (1 - p); }

function frame(ts){
  if (!holding) return;
  var p = Math.min(1, (ts - startTime) / HOLD_MS);
  setProgress(p);
  if (p >= 1){ complete(); return; }
  raf = requestAnimationFrame(frame);
}

function startHold(){
  if (seal.classList.contains("cracking")) return;
  holding = true;
  seal.classList.add("pressing");
  startTime = performance.now();
  raf = requestAnimationFrame(frame);
}
function cancelHold(){
  if (!holding) return;
  holding = false;
  seal.classList.remove("pressing");
  cancelAnimationFrame(raf);
  setProgress(0);
}
function complete(){
  holding = false;
  cancelAnimationFrame(raf);
  seal.classList.remove("pressing");
  seal.classList.add("cracking");
  setTimeout(function(){ goTo("weeks"); }, 260);
}

seal.addEventListener("pointerdown", function(e){ e.preventDefault(); startHold(); });
seal.addEventListener("pointerup", cancelHold);
seal.addEventListener("pointerleave", cancelHold);
seal.addEventListener("pointercancel", cancelHold);

/* ---- Logo fallback ---- */
var logo = document.querySelector(".logo");
if (logo){
  function useBadge(){
    var b = document.createElement("span");
    b.className = "logo--fallback";
    b.setAttribute("role","img"); b.setAttribute("aria-label", logo.alt);
    b.textContent = "S";
    logo.replaceWith(b);
  }
  if (logo.complete && logo.naturalWidth === 0) useBadge();
  else logo.addEventListener("error", useBadge);
}
})();
