# Rust 安装

确保你已经安装了 [Rust][rust-lang-org]。如果没有，请参阅 [rustup][rustup.rs-website] 网站上的说明。

> 🚨 **警告**：使用基于 Unix 的系统时，通过系统的包管理器（例如 `brew`、`apt`、`dnf` 等）安装 Rust 可能导致多种兼容性问题，因此最好还是使用 [rustup][rustup.rs-website]。

使用 Windows 时，请确保你已安装下面列出的 ABI 之一。有关更多详细信息，请参阅 rustup book 中的 [Windows][rustup-book-windows] 章节。
- **MSVC**：推荐的 ABI，包含在 `rustup` 的默认依赖项列表中。使用此 ABI 可以与 Visual Studio 生成的软件实现互操作。
- **GNU**：GCC 工具链使用的 ABI。你可以自行安装它，以便与使用 MinGW/MSYS2 工具链构建的软件实现互操作。

另请参阅[其他安装方案][rust-alt-installation]。

[rustup.rs-website]: https://rustup.rs/
[rust-alt-installation]: https://rust-lang.github.io/rustup/installation/other.html
[rustup-book-windows]: https://rust-lang.github.io/rustup/installation/windows.html
[rust-lang-org]: https://www.rust-lang.org/
