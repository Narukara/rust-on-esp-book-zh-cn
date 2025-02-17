# Visual Studio Code

Microsoft 的 [Visual Studio Code][vscode] 文本编辑器以及 [Rust Analyzer][rust-analyzer] 扩展，也称为 RA，是较常见的开发环境之一。

Visual Studio Code 是一个开源的跨平台图形化文本编辑器，具有丰富的扩展生态系统。[Rust Analyzer 扩展][rust-analyzer-extension]为 Rust 提供了 [Language Server Protocol（语言服务器协议][language-server-protocol]的实现，并包括自动完成、跳转到定义等功能。

Visual Studio Code 可以通过大多数流行的软件包管理器安装，也可以在官方网站上获得安装程序。[Rust Analyzer 扩展][rust-analyzer-extension]可以通过内置的扩展管理器在 Visual Studio Code 中安装。

除了 Rust Analyzer 之外，其他扩展也可能有所帮助：

- [Even Better TOML][even-better-toml]用于编辑基于 TOML 的配置文件
- [crates][crates]用于帮助管理 Rust 依赖项

[vscode]: https://code.visualstudio.com/
[rust-analyzer]: https://rust-analyzer.github.io/
[rust-analyzer-extension]: https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer
[language-server-protocol]: https://microsoft.github.io/language-server-protocol/
[even-better-toml]: https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml
[crates]: https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates

## 实用建议

### 在 `no_std` 下使用 Rust Analyzer

如果为不支持 `std` 的目标开发，Rust Analyzer 可能会表现出奇怪的行为，通常会报告各种错误。这可以通过在项目中创建 `.vscode/settings.json` 文件并填充以下内容来解决：

```json
{
  "rust-analyzer.check.allTargets": false
}
```

### 在使用自定义工具链时使用 Cargo 提示

如果正在使用自定义工具链，就像在 `Xtensa` 目标中一样，可以通过 `rust-toolchain.toml` 文件向 `cargo` 提供一些提示，以改善用户体验：

```toml
[toolchain]
channel = "esp"
components = ["rustfmt", "rustc-dev"]
targets = ["xtensa-esp32-none-elf"]
```

## 其他 IDE

选择介绍 VS Code 是因为它对 Rust 有很好的支持，并且在开发者中很受欢迎。还有其他一些 IDE 也有相当的 Rust 支持，如 CLion 和 vim，但这些不在本书的讨论范围内。

[clion]: https://www.jetbrains.com/clion/
[vim]: https://www.vim.org/
