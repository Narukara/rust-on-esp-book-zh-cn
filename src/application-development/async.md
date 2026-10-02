# 异步方案

> [!NOTE]
> 本节不是异步编程教程或教学材料。如果需要学习异步编程，请阅读[官方 async-book][official async-book]。

`esp-hal` 为大多数受支持的驱动提供阻塞和异步 API。驱动默认以 [`Blocking`] 模式创建。要使用异步驱动，需要通过 `into_async` 方法将它转换为 [`Async`] 模式。更多信息和入门示例，请参阅 [esp-hal 包][esp-hal package]中的 `examples`。

> [!NOTE]
> 我们的 `Async` 驱动不实现 `Send`，因为它们会在当前核心上注册中断。将它们移动到另一个核心可能导致问题。如果需要将驱动发送（移动）到另一个核心，应先发送 `Blocking` 版本，再在正确的核心上调用 `into_async`，使驱动正确绑定到该核心。

## Embassy

[Embassy] 是专为嵌入式 Rust 开发设计的异步框架。它的 [embassy-executor] crate 提供一个 `async/await` 执行器，用于执行在启动时静态分配的固定数量的任务，也可以在之后启动更多任务。为了在之后启动任务，你可以保留 `Spawner` 的副本，例如将它作为参数传给初始任务。有关 `embassy` 的更多信息，请参阅 [Embassy book]。

[`esp-rtos`] crate 提供了 [`esp-hal`] 与 [Embassy] 异步框架之间的集成，支持以下功能：

1. 中断模式执行器。
2. 支持多核的线程模式 embassy 执行器。
3. Embassy 时间驱动。
4. 定时器等待队列。

## ArielOS

[ArielOS] 是一个面向安全、内存安全、低功耗物联网的操作系统。它基于包括 `esp-hal` 在内的多个嵌入式 Rust 生态项目构建。ArielOS 注重紧密集成，补充了多核调度器、安全网络、可移植驱动和统一构建系统等操作系统功能。由此，它成为基于 C 的实时操作系统（RTOS）方案的强大替代方案，并且完全使用 Rust 实现。它与 embassy 集成良好，可以通过多种方式配合 embassy 使用。

## RTIC

[实时中断驱动并发（RTIC）][Real-Time Interrupt-driven Concurrency (RTIC)] 是一个由社区支持的并发框架，用于构建实时系统。实时任务不是异步的，而“软件”任务是异步的。目前仅支持 ESP32-C3 和 ESP32-C6。

<!-- TODO: 准备就绪后，将 ArielOS 链接改为 crates.io 链接 -->
[official async-book]: https://rust-lang.github.io/async-book/
[`Blocking`]: https://docs.espressif.com/projects/rust/esp-hal/1.0.0/esp32c6/esp_hal/struct.Blocking.html
[`Async`]: https://docs.espressif.com/projects/rust/esp-hal/1.0.0/esp32c6/esp_hal/struct.Async.html
[Embassy]: https://embassy.dev
[embassy-executor]: https://crates.io/crates/embassy-executor
[`esp-rtos`]: https://crates.io/crates/esp-rtos
[`esp-hal`]: https://crates.io/crates/esp-hal
[Embassy book]: https://embassy.dev/book/
[esp-hal package]: https://github.com/esp-rs/esp-hal
[ArielOS]: https://github.com/ariel-os/ariel-os
[Real-Time Interrupt-driven Concurrency (RTIC)]: https://crates.io/crates/rtic
