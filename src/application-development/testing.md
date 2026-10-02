# 测试

测试是应用开发不可或缺的一部分。参考 `esp-hal` 的做法，你可以为应用程序编写和运行直接在硬件上执行的测试。

## 主机测试

在可行且合理的情况下，应尽量在主机上进行测试，而不是在目标设备上测试。主机测试更容易在 CI 中运行、速度更快，也不会消耗设备的 flash 擦写寿命。对于_必须_在真实硬件上执行的测试，则应采用硬件在环测试环境。

## 硬件在环测试

硬件在环（HIL）测试是指在测试环境中使用真实设备。我们使用 [`embedded-test`] 框架编写单元测试和集成测试，因此整个流程与普通的非嵌入式项目只有少许差异。我们使用 [`probe-rs`] 将测试烧录到目标设备并运行（请在 [`hil-test` 子仓库][`hil-test` sub-repository]中查看正确的版本）。为此，你**必须只使用**开发板上的 **`USB-Serial-JTAG` 接口**（参阅[硬件概览](../introduction/hardware-overview.md)）。如果设备没有这种接口，就需要使用 [esp-prog] 或其他合适的编程器，并按照[连接说明][connection instructions]接线（在页面中选择所需芯片）。

使用 `esp-generate` 时，在 `probe-rs` 下选择 `embedded-test`，即可为项目配置测试。设备正确连接后，你只需在本地运行 `cargo test`。

### `embedded-test`

[`embedded-test`] 的测试以带有 `#[test]` 宏的函数形式编写，类似于 `std` 测试框架。通常，测试结果由该函数的执行结果决定：如果代码发生 panic，则认为测试失败，并继续运行下一个测试。不过，你可以通过多种方式自定义这个过程，例如使用 `#[should_panic]` 属性宏，将 panic 视为测试成功的条件，或为测试设置超时等。详情请参阅 [`embedded-test` 文档][`embedded-test` documentation]。由于它模拟了默认的 Rust 测试工具，也支持与 IDE 集成。

[`embedded-test`]: https://github.com/probe-rs/embedded-test
[`probe-rs`]: https://probe.rs
[`hil-test` sub-repository]: https://github.com/esp-rs/esp-hal/tree/main/hil-test
[esp-prog]: https://docs.espressif.com/projects/esp-dev-kits/en/latest/other/esp-prog/user_guide.html
[connection instructions]: https://docs.espressif.com/projects/esp-idf/en/v5.2.3/esp32s2/api-guides/jtag-debugging/configure-other-jtag.html
[`embedded-test` documentation]: https://docs.rs/embedded-test/0.6.2/embedded_test/
