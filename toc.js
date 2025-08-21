// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">1.</strong> 引言</a></li><li class="chapter-item expanded "><a href="overview/index.html"><strong aria-hidden="true">2.</strong> 开发方式总览</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="overview/using-the-standard-library.html"><strong aria-hidden="true">2.1.</strong> 使用标准库 (std)</a></li><li class="chapter-item expanded "><a href="overview/using-the-core-library.html"><strong aria-hidden="true">2.2.</strong> 使用核心库 (no_std)</a></li></ol></li><li class="chapter-item expanded "><a href="installation/index.html"><strong aria-hidden="true">3.</strong> 配置开发环境</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="installation/rust.html"><strong aria-hidden="true">3.1.</strong> Rust 安装</a></li><li class="chapter-item expanded "><a href="installation/riscv.html"><strong aria-hidden="true">3.2.</strong> 仅针对 RISC-V 目标</a></li><li class="chapter-item expanded "><a href="installation/riscv-and-xtensa.html"><strong aria-hidden="true">3.3.</strong> 针对 RISC-V 和 Xtensa 目标</a></li><li class="chapter-item expanded "><a href="installation/std-requirements.html"><strong aria-hidden="true">3.4.</strong> std 开发依赖项</a></li><li class="chapter-item expanded "><a href="installation/using-containers.html"><strong aria-hidden="true">3.5.</strong> 使用容器</a></li></ol></li><li class="chapter-item expanded "><a href="writing-your-own-application/index.html"><strong aria-hidden="true">4.</strong> 编写自己的应用</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="writing-your-own-application/generate-project/index.html"><strong aria-hidden="true">4.1.</strong> 从模板生成项目</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="writing-your-own-application/generate-project/esp-generate.html"><strong aria-hidden="true">4.1.1.</strong> esp-generate 简介</a></li><li class="chapter-item expanded "><a href="writing-your-own-application/generate-project/esp-idf-template.html"><strong aria-hidden="true">4.1.2.</strong> esp-idf-template 简介</a></li></ol></li><li class="chapter-item expanded "><a href="writing-your-own-application/nostd.html"><strong aria-hidden="true">4.2.</strong> 编写 no_std 应用</a></li><li class="chapter-item expanded "><a href="writing-your-own-application/std.html"><strong aria-hidden="true">4.3.</strong> 编写 std 应用</a></li></ol></li><li class="chapter-item expanded "><a href="tooling/index.html"><strong aria-hidden="true">5.</strong> 工具</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tooling/visual-studio-code.html"><strong aria-hidden="true">5.1.</strong> Visual Studio Code</a></li><li class="chapter-item expanded "><a href="tooling/espflash.html"><strong aria-hidden="true">5.2.</strong> espflash</a></li><li class="chapter-item expanded "><a href="tooling/debugging/index.html"><strong aria-hidden="true">5.3.</strong> 调试</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tooling/debugging/probe-rs.html"><strong aria-hidden="true">5.3.1.</strong> probe-rs</a></li><li class="chapter-item expanded "><a href="tooling/debugging/openocd.html"><strong aria-hidden="true">5.3.2.</strong> OpenOCD</a></li></ol></li><li class="chapter-item expanded "><a href="tooling/simulating/index.html"><strong aria-hidden="true">5.4.</strong> 仿真</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tooling/simulating/wokwi.html"><strong aria-hidden="true">5.4.1.</strong> Wokwi</a></li><li class="chapter-item expanded "><a href="tooling/simulating/qemu.html"><strong aria-hidden="true">5.4.2.</strong> QEMU</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="troubleshooting/index.html"><strong aria-hidden="true">6.</strong> Troubleshooting</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="troubleshooting/std.html"><strong aria-hidden="true">6.1.</strong> 基于 esp-idf-sys 的项目</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
