# 辅助 crate 概览

在详细介绍编写应用程序所需的各种包和概念之前，先大致了解整个生态系统会有所帮助。这既包括 `esp-hal` 生态，也包括更广泛的嵌入式 Rust 生态。

## `esp-hal` 生态系统

开展项目的第一步是创建项目，主要方式是使用 `esp-generate`。你可以在介绍此工具的[章节](../getting-started/tooling/esp-generate.md)中了解更多信息。

`esp-hal` 是使用 Rust 开发乐鑫芯片的核心 crate。通过它，你可以完成芯片的基本初始化，并访问芯片上的外设驱动。针对所选芯片的完整 [`esp-hal` 文档]会明确说明可用的外设，以及各外设驱动的稳定性。

你可能还需要使用芯片的高级功能，例如网络和连接能力。这部分由生态系统中的 `esp-radio` 负责，它整合了各种乐鑫产品上可用的通信协议驱动：`Wi-Fi`、`BLE`、`esp-now`，以及用于底层通信的 `IEEE 802.15.4`。各芯片的详细信息可在 [`esp-radio` 子仓库]中找到。需要注意，无线功能要求协议栈在后台持续运行，涉及定时器、中断和状态机等。`esp-radio` 依赖 [`esp-radio-rtos-driver`] 的实现，该驱动定义了协议栈可靠运行所需的调度和运行时接口。`esp-rtos` 是我们提供并支持的默认后端；原则上，你也可以将它替换为其他驱动实现。在启用相应的模板选项时，`esp-generate` 会自动加入 `esp-rtos`。

如果需要更深入地管理芯片内存，或在 `no_std` 中使用 `alloc` crate 提供的、需要堆分配的集合类型，可以使用 `esp-alloc`。本书有专门的[章节](./../application-development/alloc.md)介绍它。

下表简要介绍了 `esp-hal` 生态系统中的所有 crate 及其用途：

| Crate | 描述 | 稳定性 |
| --- | --- | --- |
| `esp-alloc` | 内存分配工具。 | 不稳定 |
| `esp-backtrace` | 提供回溯支持。 | 不稳定 |
| `esp-bootloader-esp-idf` | 为 ESP-IDF 二级 bootloader 提供额外支持，包括 OTA。 | 不稳定 |
| `esp-build` | 用于 esp-hal 和其他相关包的构建工具，供构建脚本使用。 | 不稳定 |
| `esp-config` | 配置系统。 | 不稳定 |
| `esp-hal` | 适用于所有乐鑫 ESP32 设备的裸机（`no_std`）HAL。 | 稳定<sup>*</sup> |
| `esp-hal-proc-macros` | 用于 esp-hal 系列 HAL 包的过程宏。 | 不稳定 |
| `esp-lp-hal` | 适用于部分乐鑫设备上的低功耗和超低功耗核心的裸机（`no_std`）HAL。 | 不稳定 |
| `esp-metadata` | 乐鑫设备的元数据，主要供构建脚本使用。 | 不稳定 |
| `esp-preempt` | 线程与支持线程的同步原语，主要用于 `esp-radio`。 | 不稳定 |
| `esp-println` | 乐鑫设备的打印和日志功能。 | 不稳定 |
| `esp-riscv-rt` | 乐鑫 RISC-V CPU 的最小启动代码和运行时。 | 不稳定 |
| `esp-rom-sys` | ROM 代码支持。 | 不稳定 |
| `esp-rtos` | esp-radio 的调度器实现，以及 `esp-hal` 的 embassy 支持。 | 不稳定 |
| `esp-sync` | 乐鑫设备的同步原语。 | 不稳定 |
| `esp-storage` | 乐鑫设备的存储工具。 | 不稳定 |
| `esp-radio` | 乐鑫设备的 Wi-Fi、BLE、IEEE 802.15.4 和 ESP-NOW 功能。 | 不稳定 |
| `xtensa-lx` | 对 Xtensa LX 处理器和外设的底层访问。 | 不稳定 |
| `xtensa-lx-rt` | Xtensa LX CPU 的最小启动代码和运行时。 | 不稳定 |

> [!NOTE]
> `esp-hal` 内部各外设驱动的稳定性有所不同。请参阅[外设支持部分][peripheral-support]，了解各外设的稳定性详情。

你可以在 [esp-rs 文档][docs]中找到这些包的详细信息。

[docs]: https://docs.espressif.com/projects/rust/index.html
[peripheral-support]: https://github.com/esp-rs/esp-hal/tree/main/esp-hal#peripheral-support

## 与嵌入式 Rust 生态系统集成

嵌入式 Rust 领域最常用的硬件抽象层是 [`embedded-hal`]。它为多种外设提供了 trait，使你可以编写不依赖特定 HAL 的设备驱动。`esp-hal` 在其驱动中实现了这些 trait。此外，我们也实现了嵌入式 Rust 领域中其他 crate 提供的各种 trait，例如为随机数生成器（RNG）外设实现的 [`rand_core`] trait，以及 [`embedded-io`] trait。后者是面向 `no_std` 应用程序、与 `std::io` trait 对应的接口。

[`esp-hal` 文档]: https://docs.espressif.com/projects/rust/esp-hal/latest/
[`esp-radio` 子仓库]: https://github.com/esp-rs/esp-hal/tree/main/esp-radio
[`esp-radio-rtos-driver`]: https://github.com/esp-rs/esp-hal/tree/main/esp-radio-rtos-driver
[`embedded-hal`]: https://docs.rs/embedded-hal/latest/embedded_hal/index.html
[`rand_core`]: https://crates.io/crates/rand_core
[`embedded-io`]: https://crates.io/crates/embedded-io
