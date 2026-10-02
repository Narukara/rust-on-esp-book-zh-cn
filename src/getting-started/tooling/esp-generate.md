# `esp-generate`

[`esp-generate`][esp-generate] 是一个项目生成工具，可以帮助你创建能够正常工作的项目，并预先应用大部分所需配置。

## 安装

要安装 `esp-generate`，执行：

```shell
cargo install esp-generate --locked
```

你也可以直接下载预编译好的[发行二进制文件][release-binaries]，或使用 [`cargo-binstall`][cargo-binstall]。

## `esp-generate` 配置了什么

`esp-generate` 不仅负责选择依赖项，还会根据所选的模板选项，应用一组已知的 crate 和 feature 组合，从而减少创建可用项目时所需的手动配置。

选择模板选项后，`esp-generate` 会更新生成的 `Cargo.toml`，加入这些选项所需的 crate 和 Cargo feature。模板会在确保生成的应用程序骨架能够按照所选配置构建和运行的前提下，尽量精简依赖项列表，使你无需手动配置依赖项就能成功完成首次构建。

如果需要进一步了解相关细节，[辅助 crate](../../introduction/ancillary-crates.md)章节介绍了无线、异步和网络选项与各个 crate 之间的对应关系。

一些选项的配置相互关联。例如，日志可以通过 `defmt` 或 `log` 配合相应的前端进行配置。某些 crate 也会作为标准基础配置的一部分加入项目，因为它们支持常见的嵌入式开发流程。例如，`esp-bootloader-esp-idf` 提供对二级 bootloader 的额外支持；`critical-section` 也会被加入，因为许多嵌入式 crate 依赖它来实现中断临界区。

> [!TIP]
> 每个版本的 `esp-generate` 都对应特定版本的生态系统 crate。如果希望使用最新发布的版本，请记得更新 `esp-generate`。

[release-binaries]: https://github.com/esp-rs/esp-generate/releases
[cargo-binstall]: https://github.com/cargo-bins/cargo-binstall
[esp-generate]: https://github.com/esp-rs/esp-generate
