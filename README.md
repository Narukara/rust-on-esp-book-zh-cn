这里是 https://github.com/esp-rs/book 的简体中文翻译。[直接在网页中阅读](https://narukara.github.io/rust-on-esp-book-zh-cn/)

目前进度：已经翻译完成（部分更新的内容需要重新翻译），跟踪到 b66f338

---

# The Rust on ESP Book

本仓库包含了《The Rust on ESP》一书的源代码。

## 快速上手

本书是使用 [`mdbook`] 生成的，另外使用了 [`mdbook-mermaid`] 预处理器来添加对图表的支持。要安装这些工具，运行：

```shell
cargo install mdbook mdbook-mermaid
```

安装了 `mdbook` 和 `mdbook-mermaid` 后，就可以运行以下命令，克隆此仓库并启动一个服务器：

```shell
git clone https://github.com/esp-rs/book
cd book/
mdbook serve
```

[`mdbook`]: https://github.com/rust-lang/mdBook
[`mdbook-mermaid`]: https://github.com/badboy/mdbook-mermaid

## License

The Rust on ESP Book is distributed under the following licenses:

- The code samples contained within this book are licensed under the terms of
  both the [MIT License] and the [Apache License v2.0].
- The written prose contained within this book is licensed under the terms of
  the Creative Commons [CC-BY-SA v4.0] license.

[mit license]: ./LICENSE-MIT
[apache license v2.0]: ./LICENSE-APACHE
[cc-by-sa v4.0]: ./LICENSE-CC-BY-SA

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the
work by you, as defined in the Apache-2.0 license, shall be licensed as above, without any
additional terms or conditions.

While contributing, please follow the [Rust Documentation Style Guide](rust-doc-style-guide.md).
