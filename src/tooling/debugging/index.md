# 调试

在本章中，我们将介绍使用不同工具进行调试 Rust 应用程序的方法。

请参考下表，了解每种调试方法支持的芯片：

|              | **probe-rs** | **OpenOCD** |
| :----------: | :----------: | :---------: |
|  **ESP32**   |      ✅       |      ✅      |
| **ESP32-C2** |      ✅       |      ✅      |
| **ESP32-C3** |      ✅       |      ✅      |
| **ESP32-C6** |      ✅       |      ✅      |
| **ESP32-H2** |      ✅       |      ✅      |
| **ESP32-S2** |      ✅       |      ✅      |
| **ESP32-S3** |      ✅       |      ✅      |

> ⚠️ **注意**：Xtensa 支持仍在进行中，请参阅 [probe-rs#2001][probe-rs-issue-2001] 以获取更多信息。

[probe-rs-issue-2001]: https://github.com/probe-rs/probe-rs/issues/2001

## `USB-JTAG-SERIAL` 外设

我们最近的一些产品包含 `USB-JTAG-SERIAL` 外设，允许在不借助任何外部硬件调试器的情况下进行调试。对于支持此外设的芯片，可以在官方文档里找到关于配置接口的更多信息：
- [ESP32-C3][esp32c3-docs]
    - 内置 JTAG 接口的可用性取决于 ESP32-C3 版本：
      - 0.3 之前的版本**没有**内置 JTAG 接口。
      - 0.3（及之后的版本）**具有**内置 JTAG 接口，无需连接外部设备即可进行调试。
      - 默认情况下，ESP32-C3 Devkit C 不会通过 USB 提供 JTAG 接口，请参阅 [ESP32-C3 调试文档][esp32c3-docs] 配置开发板进行调试，或考虑使用 [esp32c3-rust-board]。

    要查询 ESP32-C3 的版本，请运行以下命令：
    ```shell
    cargo espflash board-info
    # 或者
    espflash board-info
    ```
- [ESP32-C6][esp32c6-docs]
- [ESP32-H2][esp32h2-docs]
- [ESP32-S3][esp32s3-docs]

[esp32c3-docs]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-guides/jtag-debugging/configure-builtin-jtag.html
[esp32c6-docs]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32c6/api-guides/jtag-debugging/configure-builtin-jtag.html
[esp32h2-docs]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32h2/api-guides/jtag-debugging/configure-builtin-jtag.html
[esp32s3-docs]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/api-guides/jtag-debugging/configure-builtin-jtag.html
[esp32c3-rust-board]: https://github.com/esp-rs/esp-rust-board
