<p style="text-align:center;"><img src="./assets/esp-rs.svg" width="25%"></p>

# 前言

欢迎阅读这份在乐鑫产品上使用 Rust 进行嵌入式开发的指南。本书旨在帮助你入门，并熟悉我们的工具和生态系统。我们将介绍软件栈的结构，并带你了解项目生成和工具使用的基本流程。读完本书后，你就可以通过参考文档和外部培训资源，进一步探索更深入的内容。

## 这本书适合谁

本书面向对嵌入式开发感兴趣的 Rust 开发者，即使你没有嵌入式系统的开发经验，也可以阅读。熟悉一些底层编程概念会有所帮助，但我们会在涉及这些概念时介绍其中的关键思想。如果你想补充基础知识，可以学习[补充资源][resources]中的内容。

## 稳定性与可用性

我们努力保持稳定性，但随着 API 改进、性能优化和新功能的引入，你仍应预期会有定期的修改。已经稳定的[模块][modules]会遵循语义化版本规范（`SemVer`），不会引入破坏性变更。不过，`esp-hal` 的部分组件和某些驱动等 `unstable` 功能仍在积极开发中，不受 `SemVer` 保证的约束。这意味着，使用这些 `unstable` 组件时，简单的一次 `cargo update` 就可能导致项目无法正常工作，类似于使用 Rust 的 `nightly` 编译器。这种不稳定性在整个仍在快速发展的 Rust 嵌入式生态中很常见。请留意变更，并密切跟踪依赖项。对于所有主要 crate，我们都提供版本间的迁移指南，帮助你保持更新。

## 补充资源

如果你不熟悉本书涉及的某些概念，或想深入了解特定主题，以下资源可能会有所帮助：

| 资源 | 描述 |
| --- | --- |
| [The Rust Programming Language][rust-book] | 如果你不熟悉 Rust，可以阅读这本书。 |
| [The Embedded Rust Book][embedded-rust-book] | Rust 嵌入式工作组提供的资源。 |
| [Embedded Rust (`no_std`) on Espressif][no_std-training] | 在乐鑫 SoC 上使用 `no_std` 的指南。 |
| [Awesome ESP Rust][awesome-esp-rust] | 在乐鑫产品上使用 Rust 开发的相关资源列表。 |
| [Awesome Embedded Rust][awesome-embedded-rust] | 与嵌入式 Rust 和底层编程相关的资源列表，包括一些实用的 crate。 |

## 为本书做出贡献

本书的工作在[这个仓库][book-repository]中进行协调。

如果你在按照说明操作时遇到困难，或发现某些章节不够清晰，请在 [issue 追踪器][book-issues]中反馈。欢迎通过 Pull Request 修正拼写错误或改进表述！

## 支持与社区

如果你需要帮助、有问题，或想讨论与 `esp-rs` 相关的话题，欢迎加入 [Matrix 上的社区聊天室](https://matrix.to/#/#esp-rs:matrix.org)。

我们希望本书能帮助你积累知识和信心，在乐鑫产品上使用 Rust 构建健壮、高效且安全的嵌入式应用。开始吧！

[modules]: https://docs.espressif.com/projects/rust/esp-hal/1.0.0/esp32c6/esp_hal/index.html#modules
[resources]: #补充资源
[rust-book]: https://doc.rust-lang.org/book/
[embedded-rust-book]: https://docs.rust-embedded.org/book/index.html
[no_std-training]: https://esp-rs.github.io/no_std-training/
[awesome-esp-rust]: https://github.com/esp-rs/awesome-esp-rust.git
[awesome-embedded-rust]: https://github.com/rust-embedded/awesome-embedded-rust
[book-repository]: https://github.com/esp-rs/book
[book-issues]: https://github.com/esp-rs/book/issues/
