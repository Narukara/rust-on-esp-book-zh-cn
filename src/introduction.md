<p style="text-align:center;"><img src="./assets/esp-logo-black.svg" width="50%"></p>

# 引言

这本书的目的是提供一个关于将[Rust编程语言][rust]与[Espressif][espressif]设备一起使用的全面指南。

Rust对这些设备的支持仍在不断改进中，并且进展迅速。因此，本文档的某些部分可能已经过时，或者在多次阅读之间发生了重大变化。

有关ESP上与Rust相关的工具和库，请查看GitHub上的[esp-rs组织][esp-rs]。该组织由Espressif的员工以及社区成员共同管理。

[rust]: https://www.rust-lang.org/
[espressif]: https://espressif.com/
[esp-rs]: https://github.com/esp-rs/

## 谁需要这本书

本书适用于具有一定Rust经验并且对嵌入式开发和电子知识有基础了解的人群。对于没有相关经验的读者，我们建议先阅读[前提条件][prerequisites]和[资源][resources]部分，以快速掌握相关知识。

[prerequisites]: #assumptions-and-prerequisites
[resources]: #resources

### 前提和先决条件

- 您对Rust编程语言感到熟悉，并且已经在桌面环境下编写和运行过应用程序。
- 你应该熟悉[Rust 2021版][rust-2021]的惯用法，因为本书面向的是Rust 2021版。
- 你熟悉在其他语言（如C或C++）开发嵌入式系统，并熟悉以下概念：
  - 交叉编译
  - 常见数字接口，如UART，SPI，I2C等
  - 内存映射外设
  - 中断
[rust-2021]: https://doc.rust-lang.org/edition-guide/rust-2021/index.html

### 资源

如果你对上述提到的任何内容不熟悉或经验有限，或者如果你想要关于本书中提到的特定主题的更多信息，你可能会发现以下资源很有帮助：

| 资源                                         | 描述                                                       |
| -------------------------------------------- | ---------------------------------------------------------- |
| [Rust程序设计语言][rust-book]                | 如果你不熟悉Rust，我们建议你先读这本书。                   |
| [嵌入式Rust编程][embedded-rust-book]         | 在这里，您可以找到由Rust的嵌入式工作组提供的其他几个资源。 |
| [嵌入式宝典][embedonomicon]                  | 在使用Rust进行嵌入式编程时的细节。                         |
| [Embedded Rust on Espressif][std-training]   | 与[Ferrous Systems][ferrous-systems]合作创建的培训材料。   |

[rust-book]: https://doc.rust-lang.org/book/
[embedded-rust-book]: https://docs.rust-embedded.org/book/index.html
[embedonomicon]: https://docs.rust-embedded.org/embedonomicon/
[std-training]: https://esp-rs.github.io/std-training/
[ferrous-systems]: https://ferrous-systems.com/

## 翻译

该书目前仅提供英文版本。一旦书籍内容相对稳定，我们计划将其翻译成其他语言。随着翻译工作的完成，本节将更新以包括相应的翻译版本。

## 怎么使用这本书

本书假设您按顺序从头到尾阅读。后面章节涵盖的内容可能没有上一章节的背景知识会显得不太容易理解。

## 为本书做出贡献

这本书的工作是在[这个代码仓库][book-repository]中进行协调的。

如果您在按照本书中的说明遇到问题，或者发现本书的某些部分不够清晰，那么这是一个错误。请在本书的[问题追踪器][book-issues]中报告该问题。

欢迎提交修复拼写错误和添加新内容的PR。

[book-issues]: https://github.com/esp-rs/book/issues/
[book-repository]: https://github.com/esp-rs/book

## Re-Using This Material

This book is distributed under the following licenses:

- The code samples and freestanding Cargo projects contained within this book are licensed under the terms of both the [MIT License][mit-license] and the [Apache License v2.0][apache-license].
- The written prose, pictures, and diagrams contained within this book are licensed under the terms of the Creative Commons [CC-BY-SA v4.0][cc-license] license.

In summary, to use our text or images in your work, you need to:

- Give the appropriate credit (i.e. mention this book on your slide, and provide a link to the relevant page)
- Provide a link to the [CC-BY-SA v4.0][cc-license] license
- Indicate if you have changed the material in any way, and make any changes to our material available under the same license

Please do let us know if you find this book useful!

[mit-license]: https://opensource.org/licenses/MIT
[apache-license]: http://www.apache.org/licenses/LICENSE-2.0
[cc-license]: https://creativecommons.org/licenses/by-sa/4.0/legalcode
