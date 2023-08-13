<p style="text-align:center;"><img src="./assets/esp-logo-black.svg" width="50%"></p>

# 引言

本书的目的在于提供一个将 [Rust 编程语言][rust]用于 [Espressif][espressif] 设备的全面指南。

Rust 对这些设备的支持仍在不断改进中，并且进展迅速。因此，本文档的某些部分可能已经过时，或者在多次阅读之间发生了重大变化。

对于与 Rust on ESP 相关的工具和库，请查看 GitHub 上的 [esp-rs 组织][esp-rs]。该组织由 Espressif 的员工以及社区成员共同管理。

[rust]: https://www.rust-lang.org/
[espressif]: https://espressif.com/
[esp-rs]: https://github.com/esp-rs/

## 这本书适合谁

本书适用于具有一定 Rust 经验，并且对嵌入式开发和电子相关知识有基础了解的人群。对于没有相关经验的读者，我们建议先阅读[前提条件][prerequisites]和[资源][resources]部分，以快速掌握相关知识。

[prerequisites]: #前提条件
[resources]: #资源

### 前提条件

- 你能够轻松使用 Rust 编程语言，并且在桌面环境下编写和运行过应用程序。
- 你应该熟悉 [Rust 2021 版][rust-2021]的术语，因为本书面向的是 Rust 2021 版。
- 你能够轻松使用其他语言（如 C 或 C++）开发嵌入式系统，并熟悉以下概念：
  - 交叉编译
  - 常见数字接口，如 `UART`、`SPI`、`I2C` 等
  - 内存映射外设
  - 中断

[rust-2021]: https://doc.rust-lang.org/edition-guide/rust-2021/index.html

### 资源

如果你对上面提到的任何内容不够熟悉，或者只是想要关于书中特定主题的更多信息，以下资源可能会很有帮助：

| 资源                                         | 描述                                                       |
| -------------------------------------------- | ---------------------------------------------------------- |
| [The Rust Programming Language][rust-book]                | 如果你不熟悉 Rust，我们建议你先阅读这本书。                   |
| [The Embedded Rust Book][embedded-rust-book]         | 这里包含由 Rust 嵌入式工作组提供的其他资源。 |
| [The Embedonomicon][embedonomicon]                  | 在使用 Rust 进行嵌入式编程时的细节。                         |
| [Embedded Rust on Espressif][std-training]   | 与 [Ferrous Systems][ferrous-systems] 合作编写的培训材料。   |

[rust-book]: https://doc.rust-lang.org/book/
[embedded-rust-book]: https://docs.rust-embedded.org/book/index.html
[embedonomicon]: https://docs.rust-embedded.org/embedonomicon/
[std-training]: https://esp-rs.github.io/std-training/
[ferrous-systems]: https://ferrous-systems.com/

## 翻译

本书目前仅提供英文版本。一旦本书内容相对稳定，我们计划将其翻译成其他语言。随着翻译工作的完成，本节将更新以包含相应的翻译版本。

## 如何使用这本书

本书假设你按顺序从头到尾阅读。在没有前面章节的背景知识时，后面章节涵盖的内容可能会不太容易理解。

## 为本书做出贡献

本书的工作是在[此代码仓库][book-repository]中进行协调的。

如果你在按照书中的说明进行操作时遇到问题，或者发现书中的某些部分不够清晰，那么这就是一个 bug。请在本书的[ issue 追踪器][book-issues]中报告该问题。

欢迎提交修复 typo 和添加新内容的 Pull Request。

[book-issues]: https://github.com/esp-rs/book/issues/
[book-repository]: https://github.com/esp-rs/book

## 重用本材料

本书根据以下许可分发：

- 本书中包含的示例代码和独立的 Cargo 项目均根据 [MIT 许可证][mit-license]和 [Apache 许可证 v2.0][apache-license] 的条款获得许可。
- 本书中包含的文字、图片和图表均根据 Creative Commons [CC-BY-SA v4.0][cc-license] 许可条款获得许可。

总而言之，如果要在你的作品中使用本书的文本或图像，你需要：

- 给予适当的认可（例如，在幻灯片上提及这本书，并提供相关页面的链接）
- 提供指向 [CC-BY-SA v4.0][cc-license] 许可证的链接
- 指出你是否以任何方式更改了材料，并使这些更改在相同的许可证下可用

如果你觉得这本书有用，请告诉我们！

[mit-license]: https://opensource.org/licenses/MIT
[apache-license]: http://www.apache.org/licenses/LICENSE-2.0
[cc-license]: https://creativecommons.org/licenses/by-sa/4.0/legalcode
