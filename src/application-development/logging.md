# 日志

日志是嵌入式系统开发的重要组成部分，它使系统行为可观察，并帮助调试和监控。在 Rust 生态系统中，常用的两种主要日志框架是 [`defmt`][defmt] 和 [`log`][log]。

生成项目时，无论你选择下面的哪一种工具，[`esp-generate`][esp-generate] 都会确保配置正确，你只需根据自己的需求调整所使用的日志工具。

## `defmt`

[`defmt`][defmt] 是一个高效的日志框架，专为嵌入式系统等资源受限的环境设计。它使用紧凑的二进制编码日志消息，减少了传统字符串日志带来的开销。更多信息请参阅 [`defmt` 文档][defmt-documentation]。在乐鑫芯片上，我们推荐将 `defmt` 与 `probe-rs` 配合使用，以取得最佳效果。

## `log`

[`log`][log] crate 是 Rust 社区广泛采用的日志门面。它定义了一组宏（`info!`、`warn!`、`error!` 等），用于记录不同级别的日志消息。我们在 [`esp-println`] 中提供了一个 [logger][logger] 实现；如果需要，你也可以自行实现 logger。

[log]: https://crates.io/crates/log
[defmt]: https://crates.io/crates/defmt
[defmt-documentation]: https://defmt.ferrous-systems.com/introduction
[filtering]: https://defmt.ferrous-systems.com/filtering#filtering
[esp-generate]: ./../getting-started/tooling/esp-generate.md
[logger]: https://docs.rs/log/latest/log/#implementing-a-logger
[`esp-println`]: https://github.com/esp-rs/esp-hal/tree/main/esp-println
