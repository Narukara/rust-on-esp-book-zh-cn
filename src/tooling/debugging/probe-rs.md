# `probe-rs`

[`probe-rs`][probe-rs] 项目是一组工具，用于使用各种调试探针与嵌入式 MCU 进行交互。它类似于 [OpenOCD][openocd]、[pyOCD][pyocd]、[Segger 工具][segger-tools]等。支持 `ARM` 和 `RISC-V` 架构以及一系列工具，包括但不限于：

- 调试器
  - GDB 支持。
  - 用于交互式调试的 CLI。
  - VS Code 扩展。
- [实时传输（RTT）][rtt]
  - 类似于 [IDF 的 `app_trace` 组件][app-trace-idf]。
- 烧录算法

请按照 [`probe-rs`][probe-rs] 网站上的[安装][prober-rs-installation]和[设置][prober-rs-setup]说明进行操作。

包含 [`USB-JTAG-SERIAL` 外设][usb-jtag-serial]的乐鑫产品无需任何外部硬件即可使用 `probe-rs`。

[probe-rs]: https://probe.rs/
[openocd]: https://openocd.org/
[pyocd]: https://pyocd.io/
[segger-tools]: https://www.segger.com/
[app-trace-idf]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/app_trace.html
[rtt]: https://wiki.segger.com/RTT
[prober-rs-installation]: https://probe.rs/docs/getting-started/installation/
[prober-rs-setup]: https://probe.rs/docs/getting-started/probe-setup/
[usb-jtag-serial]: index.md#usb-jtag-serial-peripheral

## 用 `probe-rs` 烧写

`probe-rs` 可以用于烧写程序，因为它支持 [ESP-IDF image format][idf-image]。
  - 烧写 ESP32-C3 的命令示例： `probe-rs run --chip esp32c3`

添加以下内容到项目中的 `.cargo/config.toml` 文件，就可以把烧写命令用作自定义 Cargo runner：

```toml
[target.'cfg(any(target_arch = "riscv32", target_arch = "xtensa"))']
runner = "probe-rs run --chip esp32c3"
```

通过此配置，就可以使用 `cargo run` 来烧写并监控你的应用程序。

[idf-image]: https://docs.espressif.com/projects/esptool/en/latest/esp32c3/advanced-topics/firmware-image-format.html

## VS Code 扩展

VS Code 有 `probe-rs` 扩展。关于如何安装、配置和使用，请参考 `probe-rs` [VS Code 文档][probe-rs-vscode]。

### 示例 `launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "probe-rs-debug",
            "request": "launch",
            "name": "Launch",
            "cwd": "${workspaceFolder}",
            "chip": "esp32c3", //!MODIFY
            // probe field only needed if multiple probes connected. <Serial> is the MAC address of your esp in case of usb-jtag       
            "probe": "VID:PID:<Serial>", //!MODIFY (or remove) | optional field
            "flashingConfig": {
                "flashingEnabled": true,
                "haltAfterReset": true,
                "formatOptions": {
                    "binaryFormat": "idf"
                }
            },
            "coreConfigs": [
                {
                    "coreIndex": 0,
                    "programBinary": "target/riscv32imc-unknown-none-elf/debug/${workspaceFolderBasename}", //!MODIFY
                    // svdFiles describe the hardware register names off the esp peripherals, such as the LEDC peripheral. 
                    // They can be downloaded seperatly @ https://github.com/espressif/svd/tree/main/svd
                    "svdFile": "${workspaceFolder}/esp32c3.svd" //!MODIFY (or remove) | optional field
                }
            ]
        },
        {
            "type": "probe-rs-debug",
            "request": "attach",
            "name": "Attach",
            "cwd": "${workspaceFolder}",
            "chip": "esp32c3", //!MODIFY       
            "probe": "VID:PID:<Serial>", //!MODIFY (or remove) | optional field
            "coreConfigs": [
                {
                    "coreIndex": 0,
                    "programBinary": "target/riscv32imc-unknown-none-elf/debug/${workspaceFolderBasename}", //!MODIFY
                    "svdFile": "${workspaceFolder}/esp32c3.svd" //!MODIFY (or remove) | optional field
                }
            ]
        }
    ]
}
```

`Launch` 配置将烧写设备并开始调试，而 `Attach` 将在正在运行的应用程序上开始调试。有关更多详细信息，请参考 [launch 和 attach 之间差异][vscode-configs]的 VS Code 文档。


[probe-rs-vscode]: https://probe.rs/docs/tools/debugger/
[vscode-configs]: https://code.visualstudio.com/docs/editor/debugging#_launch-versus-attach-configurations

## `cargo-flash` 和 `cargo-embed`

`probe-rs` 附带这两个工具：
- [`cargo-flash`][cargo-flash]：一个烧写工具，可将二进制文件烧写到目标设备，并运行。
- [`cargo-embed`][cargo-embed]：`cargo-flash` 的超集，允许打开 RTT 终端或 GDB 服务器。可以用[配置文件][cargo-embed-config]来定义其行为。

[cargo-flash]: https://probe.rs/docs/tools/cargo-flash/
[cargo-embed]: https://probe.rs/docs/tools/cargo-embed/
[cargo-embed-config]: https://probe.rs/docs/tools/cargo-embed/#configuration

## GDB 集成

`probe-rs` 包含 GDB stub，可以使用常用工具集成到你的常用工作流程中。 `probe-rs gdb` 命令会启动 GDB server，默认在 `1337` 端口上运行。

[`espressif/binutils-gdb`][binutils-repo] 包含支持所有乐鑫设备的 GDB。

[binutils-repo]: https://github.com/espressif/binutils-gdb
