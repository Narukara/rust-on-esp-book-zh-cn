# `probe-rs`

[`probe-rs`][probe-rs] 项目是一组工具，用于使用各种调试探针与嵌入式 MCU 进行交互。它类似于 [OpenOCD][openocd]、[pyOCD][pyocd]、[Segger 工具][segger-tools]等。支持 `ARM` 和 `RISC-V` 架构以及一系列工具，包括但不限于：

- 调试器
  - GDB 支持。
  - 用于交互式调试的 CLI。
  - VS Code 扩展。
- 实时传输（RTT）
  - 类似于 IDF 的 app_trace 组件。
- 烧录算法

有关 probe-rs 及如何设置项目的更多信息，请参见 [probe-rs] 网站。

[probe-rs]: https://probe.rs/
[openocd]: https://openocd.org/
[pyocd]: https://pyocd.io/
[segger-tools]: https://www.segger.com/

## ESP32-C3 的 `USB-JTAG-SERIAL` 外设

从 `probe-rs` v0.12 开始，可以使用内置的 `USB-JTAG-SERIAL` 外设对 ESP32-C3 进行烧录和调试，无需任何外部硬件调试器。有关配置接口的更多信息，请参见[官方文档][official-documentation]。

[official-documentation]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-guides/jtag-debugging/configure-builtin-jtag.html

## 乐鑫芯片的支持

`probe-rs` 目前仅支持 `ARM` 和 `RISC-V`，因此目前限制了可以使用的乐鑫芯片数量。

|   芯片   | 烧录 | 调试 |
| :------: | :--: | :--: |
| ESP32-C3 |  ✅  |  ⚠️  |

> ⚠️ **注意**：_标有 ⚠️ 的项目目前正在进行中，可用但可能存在错误。_

## 权限 - Linux

在 Linux 上，可能会遇到与乐鑫探针交互时的权限问题。安装以下 `udev` 规则并重新加载应该可以解决此问题。

```text
# Espressif dev kit FTDI
ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6010", MODE="660", GROUP="plugdev", TAG+="uaccess"

# Espressif USB JTAG/serial debug unit
ATTRS{idVendor}=="303a", ATTRS{idProduct}=="1001", MODE="660", GROUP="plugdev", TAG+="uaccess"

# Espressif USB Bridge
ATTRS{idVendor}=="303a", ATTRS{idProduct}=="1002", MODE="660", GROUP="plugdev", TAG+="uaccess"
```

<!-- TODO: 当probe-rs可以实际调试至少具有良好回溯等功能的C3时，在此处添加一个示例配置：参见https://github.com/probe-rs/probe-rs/issues/877 -->
