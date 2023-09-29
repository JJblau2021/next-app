# 浏览器学习笔记

## 浏览器架构

浏览器是如何使用进程和线程构建的呢？答案可以是通过一个进程，进程中包含多个不同的线程；也可以是多个不同的进程，每个进程包含若干个线程，进程之间通过 ****IPC**** 进行通信。

> IPC（Inter-Process Communication）是进程间通信的缩写。它是一种用于在不同进程之间传递数据和信息的技术。通过IPC，不同的进程可以相互交换数据、进行通信和协调工作。常见的IPC通信方式包括管道、消息队列、共享内存和套接字等。
> 

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/BG4tvT7y95iPAelkeadP.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/BG4tvT7y95iPAelkeadP.png?auto=format&w=1252)

## 浏览器包含的进程

1. **浏览器进程**：负责管理所有浏览器窗口，处理用户界面和核心功能，如地址栏、书签和扩展程序。
2. **渲染进程**：每个浏览器标签页都有一个独立的渲染进程，负责处理网页的渲染和交互。这样可以实现多个标签页并行加载和运行，提高浏览器的性能和稳定性。
3. **GPU进程**：负责处理浏览器的图形渲染，通过硬件加速提供更高的性能和流畅度。
4. **网络进程**：负责处理网络请求和数据传输，包括下载文件、加载网页和处理网络通信。
5. **插件进程**：每个安装的插件都有一个独立的进程，负责运行插件的代码和提供相应的功能。
6. **扩展程序进程**：每个安装的扩展程序都有一个独立的进程，负责运行扩展程序的代码和处理相关的任务。
7. **任务管理器进程**：用于监视和管理其他进程的运行状态，可以通过Chrome浏览器的任务管理器查看和终止进程。
8. **插件扩展进程**：用来管理和运行浏览器的插件和扩展程序的进程。

这些进程共同协作，以提供稳定、高效的浏览体验。

### 浏览器进程 （Browser Process）

Google Chrome 浏览器的浏览器进程（Browser Process）包含多个线程，每个线程都有不同的任务和功能。以下是 Chrome 浏览器浏览器进程中的一些重要线程：

1. **主线程（Main Thread）**：主线程是 Chrome 浏览器的核心，负责处理用户界面、用户输入和管理其他线程。它还负责创建和销毁渲染进程，以及协调不同组件之间的通信。
2. **渲染线程（Renderer Thread）**：每个标签页或扩展都会有一个渲染线程，负责渲染和显示网页内容。渲染线程执行 HTML、CSS 和 JavaScript，并将最终的页面呈现给用户。它还与 GPU 进程协作以进行图形加速。
3. **GPU 线程（GPU Thread）**：GPU 线程负责将渲染线程生成的图形内容传输到 GPU 进行处理。这有助于加速图形渲染和动画效果。在某些情况下，Chrome 还可以创建多个 GPU 线程以提高性能。
4. **网络线程（Network Thread）**：网络线程负责处理网络请求和响应。它与网络栈交互，发送和接收数据，以加载网页内容和资源。
5. **V8 JavaScript 引擎线程（V8 JavaScript Engine Thread）**：V8 线程负责执行 JavaScript 代码。它使用 Chrome 的 JavaScript 引擎 V8 来解释和执行网页中的 JavaScript。
6. **存储线程（Storage Thread）**：存储线程处理浏览器的存储操作，包括处理本地存储、会话存储、Cookie 等。
7. **扩展线程（Extension Thread）**：扩展线程用于运行浏览器扩展和应用程序。每个扩展都在其自己的线程中运行，以防止它们影响浏览器的稳定性。
8. **定时器线程（Timer Thread）**：定时器线程负责管理 JavaScript 定时器，以确保定时任务按时执行。
9. **插件线程（Plugin Thread）**：如果页面中包含使用 NPAPI（Netscape Plugin Application Programming Interface）或 PPAPI（Pepper Plugin API）的插件，插件线程会负责管理这些插件。
10. **音频线程（Audio Thread）**：音频线程处理音频播放和音频效果，以确保音频正常运行。
11. **UI 线程 （UI Thread）**: UI 线程主要负责处理用户输入、导航等功能。

这些线程协同工作，使 Chrome 浏览器能够高效地执行各种任务，提供出色的性能和用户体验。不同版本的 Chrome 可能会略有不同，但这些是常见的线程类型。细节可能会因浏览器版本和配置而有所不同。

---

- 可以通过以下步骤查看Chrome浏览器正在运行的进程：
    1. 打开 Chrome 浏览器
    2. 在浏览器窗口的右上角，点击菜单按钮（三个竖点）。
    3. 从菜单中选择"更多工具"，然后选择"任务管理器"。
    4. 任务管理器将显示当前运行的所有进程，包括浏览器进程、渲染进程、插件进程等。

浏览器多进程架构的优势包括：

1. **提高稳定性**：每个标签页和插件都在独立的进程中运行，一个标签页或插件崩溃不会导致整个浏览器崩溃，提高了浏览器的稳定性。
2. **提高安全性**：不同的进程之间有隔离机制，一个进程中的恶意代码不会直接影响其他进程，提高了浏览器的安全性。
3. **提高性能**：多进程架构允许多个标签页并行加载和运行，提高了浏览器的响应速度和页面加载速度。
4. **提供更好的用户体验**：每个标签页都有独立的渲染进程，可以避免一个页面的加载或脚本执行影响其他页面的响应性能，提供了更流畅的用户体验。

总体上，多进程架构使浏览器更稳定、更安全、更高效，提供了更好的用户体验。

## 网站隔离

站点隔离（Site Isolation）是一种网络安全和隐私保护技术，旨在增强Web浏览器的安全性。它被广泛用于现代Web浏览器，特别是Google Chrome，以减少恶意网站或攻击者之间的信息泄漏风险。

站点隔离的主要思想是将不同的网站或来源的网页内容隔离在单独的进程或沙盒中，以防止它们相互干扰或共享敏感信息。这有助于防止一种称为"同源策略（Same-Origin Policy）"的安全漏洞，该策略通常限制一个网页只能访问来自同一域名（同源）的资源，但在某些情况下，恶意网站可能会试图绕过这个策略，访问其他网站的信息。

站点隔离的关键特点和工作原理包括：

1. **每个网站的单独进程**：每个正在打开的网站或标签页都在独立的浏览器进程中运行，这意味着不同网站的JavaScript代码和内容在不同的进程中执行。
2. **沙盒隔离**：每个进程通常都在沙盒环境中运行，限制了其对操作系统和其他进程的访问权限。这有助于防止攻击者通过浏览器漏洞来攻击操作系统。
3. **隔离网站的内存**：站点隔离确保不同网站的内存空间是相互隔离的，这样它们不能互相读取或篡改彼此的数据。
4. **跨站点通信限制**：站点隔离还减少了不同网站之间的跨站点通信，如JavaScript窗口.postMessage()方法，以减少信息泄漏风险。

站点隔离的主要优点是提高了浏览器的安全性和隐私保护，防止了一些常见的Web攻击，如跨站脚本攻击（XSS）和跨站请求伪造（CSRF）。然而，它也可能会增加浏览器的资源消耗，因为每个网站都需要一个额外的进程，这可能会导致内存使用率上升。因此，站点隔离是一种权衡，旨在提供更高的安全性，但也可能影响性能。

## 导航流程

### 处理用户输入

当用户开始在地址栏中输入时，UI 线程首先会问：“这是搜索查询还是 URL？”。在 Chrome 浏览器中，地址栏也是搜索框，因此 UI 线程需要对输入进行解析，并决定是将你带到搜索引擎还是你请求的网站。

### 开始导航

当用户按下回车键时，UI 线程会进行网络调用以获取网站内容。标签页会显示“加载中”图标，网络线程会执行相应的协议，如 DNS 查找和为请求建立 TLS 连接。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/nSD7ognQ9hNFoFOnFQlw.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/nSD7ognQ9hNFoFOnFQlw.png?auto=format&w=1252)

此时，网络线程会访问本地缓存，如果缓存生效，那么会使用本地缓存，也可能会收到像 HTTP 301 这样的重定向状态码。在这种情况下，网络线程会与 UI 线程通信，告知服务器正在请求重定向，然后启动另一个 URL 请求。

### 读取响应

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/PTmbGdEyTDdLDrAbJw4v.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/PTmbGdEyTDdLDrAbJw4v.png?auto=format&w=1252)

随着响应体（payload）开始输入，网络线程会查看数据流的前几个字节。响应的 Content-Type 头部应当说明响应的数据类型，但由于它可能缺失或出错，因此在这里进行 [MIME 类型嗅探](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)。正如引擎[源代码中的注释](https://link.juejin.cn/?target=https%3A%2F%2Fcs.chromium.org%2Fchromium%2Fsrc%2Fnet%2Fbase%2Fmime_sniffer.cc%3Fsq%3Dpackage%3Achromium%26dr%3DCS%26l%3D5)所言，这是一项 "棘手的工作"。感兴趣的话，你可以阅读注释，了解不同浏览器如何处理 Content-Type 和 payload 的关系。

如果响应是 HTML 文件，那么下一步就是将数据传递给渲染进程，但如果是压缩文件或其他文件，则意味着这是一个下载请求，数据将被传递给下载管理器。

这时还会进行[安全浏览检查](https://link.juejin.cn/?target=https%3A%2F%2Fsafebrowsing.google.com%2F)。如果网站域名和响应数据与已知的恶意网站相匹配，网络线程就会发出警报，显示警告页面。此外，还会进行[跨源读取阻塞（Cross Origin Read Blocking, CORB）](https://link.juejin.cn/?target=https%3A%2F%2Fwww.chromium.org%2FHome%2Fchromium-security%2Fcorb-for-developers)检查，以确保敏感的跨站点数据不会进入渲染进程。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/pn0zlnxoYgbyzFVKoTc9.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/pn0zlnxoYgbyzFVKoTc9.png?auto=format&w=1252)

### 查找渲染进程

完成所有检查后，网络线程确认浏览器可以导航到请求的网站，告诉 UI 线程数据已准备就绪。然后，UI 线程会找到一个渲染进程，继续呈现网页。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/VAR3s7k8rIgTrfwEWMIo.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/VAR3s7k8rIgTrfwEWMIo.png?auto=format&w=1252)

由于网络请求可能需要几百毫秒才能得到响应，因此可以进行优化以加快这一过程。当 UI 线程在第 2 步向网络线程发送 URL 请求时，它已经知道将要导航到哪个网站，此时 UI 线程会尝试主动查找或启动一个与网络请求并行的渲染进程。这样，如果一切按预期进行，当网络线程收到数据时，渲染进程已经处于待机状态。如果导航跨站重定向，这个备用进程可能不会被使用，在这种情况下需要启动另一个进程。

### 提交导航

现在数据和渲染进程都已准备就绪，浏览器进程会向渲染进程发送 IPC 消息，以提交导航。同时，它还会传递 HTML 数据流给渲染进程。一旦浏览器进程监听到渲染进程确认提交，导航阶段就完成了，接下来开始文档加载阶段。

此时，地址栏会更新，安全指示器和网站设置界面也会显示新页面的网站信息。标签页的会话历史记录将被更新，因此后退/前进按钮将依次访问前面导航到的网站。为便于在关闭标签页或窗口时恢复标签页/会话，会话历史记录会存储在硬盘上。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/kL6CLP7fLay9L99vRR3F.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/kL6CLP7fLay9L99vRR3F.png?auto=format&w=1252)

### 初始加载完成

导航提交后，渲染进程将继续加载资源并渲染页面。我们将在下一篇文章中详细介绍这一阶段发生的事情。一旦渲染进程“完成”渲染，它就会向浏览器进程发送 IPC 消息（在页面中所有 frame 的 `onload` 事件都已触发并执行完毕之后）。此时，UI 线程会把标签页的“加载中”图标去除。

之所以“完成”加了引号，是因为网页的 JavaScript 代码仍然可以在此之后加载其他资源并渲染新视图。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/DwMkwQndYadDqnMtp8T3.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/DwMkwQndYadDqnMtp8T3.png?auto=format&w=1252)

### 导航到另一个网站

导航流程完成后，当用户再次输入不同的 URL，浏览器会检查当前渲染的网站是否注册了 `beforeunload` 事件。而此时，导航将从渲染进程启动。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/u7EEPH9S2PpycpbQQRFk.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/u7EEPH9S2PpycpbQQRFk.png?auto=format&w=1252)

如果新导航的页面与当前渲染的页面不是同个网站，会调用一个单独的渲染进程来处理新导航，同时保留当前渲染进程来处理 `unload` 等事件。如需了解更多信息，请参阅[页面生命周期状态概述](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Fupdates%2F2018%2F07%2Fpage-lifecycle-api%23overview_of_page_lifecycle_states_and_events)以及[页面生命周期 API](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Fupdates%2F2018%2F07%2Fpage-lifecycle-api)。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/5tThsmZamrpxFydJFePg.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/5tThsmZamrpxFydJFePg.png?auto=format&w=1252)

## 渲染流水线

渲染进程负责处理网页内发生的一切。在渲染进程中，主线程负责处理你编写的大部分 JavaScript 代码。如果你使用了 Web Worker 或 Service Worker，这部分的 JavaScript 代码会由 worker 线程处理。合成和光栅化线程也会在渲染进程中运行，从而高效流畅地呈现页面。

渲染进程的核心工作是将 HTML、CSS 和 JavaScript 代码转化为用户可以交互的网页。

![渲染进程中包含一个主线程，一个工作线程，一个合成线程和一个光栅化线程等。](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/uIqf0QQZxF6mHPDWFEjz.png?auto=format&w=1252)

渲染进程中包含一个主线程，一个工作线程，一个合成线程和一个光栅化线程等。

### HTML 解析

---

**DOM 构建：**

渲染进程的主线成会将接收到的 HTML 数据转换成 DOM 树，并根据 HTML 规范优雅的处理 HTML 模板中的错误。

**子资源加载：**

主线程在解析和构建 DOM 过程中，会加载一些额外资源如图片、css，此时，“预加载扫描器” 会在 DOM 构建过程中同步运行，当 HTML 解析中出现了 `<img>` 或 `<link>` 等标签，预加载扫描器会提前查看 HTML 解析器生成的 token 并向浏览器进程中的网络线程发送请求

![主线程解析 DOM，并向网络线程发送请求](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/qmuN5aduuEit6SZfwVOi.png?auto=format&w=1252)

主线程解析 DOM，并向网络线程发送请求

**JavaScript 会阻塞 HTML 解析：**

在 HTML 解析过程中遇到了 `<script>` 标签时，会暂停堆 HTML 文档的解析，然后执行 JS 代码，因为 JS 代码可以直接操作 DOM。

**提示浏览器如何加载资源：**

如果 JS 脚本不直接操作 DOM，可以在 `<script>` 标签中添加 `async` 或  `defer` 属性，这样浏览器会异步加载并运行该脚本，而不会阻塞 HTML 解析过程。而 `<link rel=“preload”>` 可以告知浏览器当前导航肯定需要该资源，希望尽快加载。

[Preload critical assets to improve loading speed](https://web.dev/preload-critical-assets/)

**样式计算：**

主线程会解析 CSS 并确定每个 DOM 节点的样式，其中浏览器会一共一个默认样式表，来定义 DOM 节点的默认样式。

![主线程解析 CSS 并且给 DOM 节点添加计算样式](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/hGqtsAuYpEYX4emJd5Jw.png?auto=format&w=1252)

主线程解析 CSS 并且给 DOM 节点添加计算样式

**布局：**

主线程会遍历 DOM 和计算样式来创建布局树，其中包含 x y 坐标和边界框尺寸等信息。如果元素使用了 `display:none`，那么该元素就不属于布局树。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/0JqiVwHxNab2YL6qWHbS.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/0JqiVwHxNab2YL6qWHbS.png?auto=format&w=1252)

**绘制：**

除了 DOM、样式和布局还不足以渲染页面，还需要判断绘制它们的顺序。例如 `z-index` 会影响元素的绘制顺序。

![没有考虑 z-index 导致的绘制错误](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/4x9etJ64cg0x4a6Ktt5T.png?auto=format&w=1252)

没有考虑 z-index 导致的绘制错误

在绘制步骤中，主线程会遍历布局树以创建绘制记录（paint records）。绘制记录是对页面绘制过程的详细记录，如 "先画背景，后画文本，再画矩形"。这个过程类似于使用 JavaScript 在 `<canvas>` 元素上进行过绘制。

![主线程遍历布局树并生成绘制记录](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/zs8wNimWDPhu7NIhJDcc.png?auto=format&w=1252)

主线程遍历布局树并生成绘制记录

### 渲染流水线的更新成本很高

渲染流水线中最重要的一点是，每一步都要使用前一步操作的结果来创建新数据。例如，如果布局树中的某些内容发生了变化，那么就需要对影响的部分重新生成绘制顺序。这也解释了重绘的成本比重排要低。

### 合成

---

[https://storage.googleapis.com/web-dev-uploads/video/T4FyVKpzu4WKF1kBNvXepbi08t52/AiIny83Lk4rTzsM8bxSn.mp4](https://storage.googleapis.com/web-dev-uploads/video/T4FyVKpzu4WKF1kBNvXepbi08t52/AiIny83Lk4rTzsM8bxSn.mp4)

将页面的 DOM 结构、元素的样式和几何形状以及绘制顺序转化为屏幕上的像素的过程被称为光栅化。

处理这种情况的一个简单方法是光栅化用户当前可见的那部分内容。如果用户滚动页面，则移动光栅化的视口，将缺失的部分继续进行光栅化。Chrome 浏览器在发布之初就是这样处理光栅化的。不过，现代浏览器使用的是一种更复杂的流程，称为**合成（Compositing）**。

**什么是合成**

[https://storage.googleapis.com/web-dev-uploads/video/T4FyVKpzu4WKF1kBNvXepbi08t52/Aggd8YLFPckZrBjEj74H.mp4](https://storage.googleapis.com/web-dev-uploads/video/T4FyVKpzu4WKF1kBNvXepbi08t52/Aggd8YLFPckZrBjEj74H.mp4)

合成是将页面的各个部分分层，分别光栅化，然后在一个叫合成线程的单独线程中合成页面。如果发生滚动，由于图层已经光栅化，只需合成一个新的帧即可。动画也可以用同样的方法实现，也就是移动图层和合成新帧。

**分层**

为了进行元素层级的划分，主线程会遍历布局树以创建层级树（在开发者工具的 Performence 面板中称为 "Update Layer Tree"）。如果希望页面的某些部分获得单独的层级，可以通过 CSS 中的 `will-change` 属性提示浏览器。

![https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/V667Geh9MtTviJjDkGZq.png?auto=format&w=1252](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/V667Geh9MtTviJjDkGZq.png?auto=format&w=1252)

光栅化和合成在主线程外进行

创建完层级树后，主线程会将这些信息提交给合成线程。合成线程会将每个图层分块发送给光栅化线程来进行光栅化，并将其保存在 GPU 内存中。

![光栅化线程创建图块的位图然后发送给 GPU](https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/SL4KO5UsGgBNLrOwb0wC.png?auto=format&w=1252)

光栅化线程创建图块的位图然后发送给 GPU

针对浏览器视口内的内容，合成线程可以优先处理光栅化。

当图块光栅化完成后，合成线程会收集图块信息（称为 draw quads，绘制四边形）以创建一个合成帧（compositor frame）。

随后合成帧会通过 IPC 提交给浏览器进程。此时，UI 线程可添加另一个合成帧，用于浏览器用户界面的更改，或从其他渲染进程添加用于扩展的合成帧。这些合成帧会被发送到 GPU，从而在屏幕上显示出来。如果发生了滚动事件，合成线程会创建另一个合成帧发送到 GPU。