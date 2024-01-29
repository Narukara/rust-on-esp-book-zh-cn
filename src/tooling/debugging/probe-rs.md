# `probe-rs`

[`probe-rs`][probe-rs] 项目是一组工具，用于使用各种调试探针与嵌入式 MCU 进行交互。它类似于 [OpenOCD][openocd]、[pyOCD][pyocd]、[Segger 工具][segger-tools]等。支持 `ARM` 和 `RISC-V` 架构以及一系列工具，包括但不限于：

- 调试器
  - GDB 支持。
  - 用于交互式调试的 CLI。
  - VS Code 扩展。
- [实时传输（RTT）][rtt]
  - 类似于 [IDF 的 `app_trace` 组件][app-trace-idf]。
- 烧录算法

Follow the [installation][prober-rs-installation] and [setup][prober-rs-setup] instructions at the [`probe-rs`][probe-rs] website.

Espressif products containing the [`USB-JTAG-SERIAL` peripheral][usb-jtag-serial] can use `probe-rs` without any external hardware.

[probe-rs]: https://probe.rs/
[openocd]: https://openocd.org/
[pyocd]: https://pyocd.io/
[segger-tools]: https://www.segger.com/
[app-trace-idf]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/app_trace.html
[rtt]: https://wiki.segger.com/RTT
[prober-rs-installation]: https://probe.rs/docs/getting-started/installation/
[prober-rs-setup]: https://probe.rs/docs/getting-started/probe-setup/
[usb-jtag-serial]: index.md#usb-jtag-serial-peripheral

## Flashing with `probe-rs`

`probe-rs` can be used to flash applications to your target since it supports the [ESP-IDF image format][idf-image].
  - Example command for flashing an ESP32-C3: `probe-rs run --chip esp32c3`

The flashing command can be set as a custom Cargo runner by adding the following to your project's `.cargo/config.toml` file:

```toml
[target.'cfg(any(target_arch = "riscv32", target_arch = "xtensa"))']
runner = "probe-rs run --chip esp32c3"
```

With this configuration, you can flash and monitor your application using `cargo run`.

[idf-image]: https://docs.espressif.com/projects/esptool/en/latest/esp32c3/advanced-topics/firmware-image-format.html

## VS Code Extension

There is a `probe-rs` extension in VS Code, see `probe-rs` [VS Code documentation][probe-rs-vscode] for details on how to install, configure and use it.

### Example `launch.json`

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
            "flashingConfig": {
                "flashingEnabled": true,
                "resetAfterFlashing": true,
                "haltAfterReset": true,
                "formatOptions": {
                    "format": "idf" //!MODIFY (or remove). Valid values are: 'elf'(default), 'idf'
                }
            },
            "coreConfigs": [
                {
                    "coreIndex": 0,
                    "programBinary": "target/riscv32imc-unknown-none-elf/debug/${workspaceFolderBasename}", //!MODIFY
                    "rttEnabled": true,
                    "rttChannelFormats": [
                        {
                            "channelNumber": 0,
                            "dataFormat": "String",
                            "showTimestamp": true,
                        }
                    ]
                }
            ]
        },
        {
            "type": "probe-rs-debug",
            "request": "attach",
            "name": "Attach",
            "cwd": "${workspaceFolder}",
            "chip": "esp32c3", //!MODIFY
            "coreConfigs": [
                {
                    "coreIndex": 0,
                    "programBinary": "target/riscv32imc-unknown-none-elf/debug/${workspaceFolderBasename}", //!MODIFY
                    "rttEnabled": true,
                    "rttChannelFormats": [
                        {
                            "channelNumber": 0,
                            "dataFormat": "String",
                            "showTimestamp": true,
                        }
                    ]
                }
            ]
        }
    ]
}
```

> ⚠️ **Note**: The example `launch.json` uses `rtt`, which may require enabling such feature in some crates, like [`esp-println`][esp-println] and [`esp-backtrace`][esp-backtrace]
> Eg: ESP32-C3 `no_std` project that uses `esp-println` and `esp-backtrace`:
> ```toml
> esp-backtrace = { version = "0.9.0", features = ["esp32c3", "panic-handler", "exception-handler", "print-rtt"] }
> esp-println = { version = "0.7.0", features = ["esp32c3", "rtt"], default-features = flase }
> ```

The `Launch` configuration will flash the device and start debugging process while `Attach` will start the debugging in the already running application of the device. See VS Code documentation on [differences between launch and attach][vscode-configs] for more details.


[probe-rs-vscode]: https://probe.rs/docs/tools/debugger/
[esp-println]: https://github.com/esp-rs/esp-println
[esp-backtrace]: https://github.com/esp-rs/esp-backtrace?tab=readme-ov-file#features
[vscode-configs]: https://code.visualstudio.com/docs/editor/debugging#_launch-versus-attach-configurations

## `cargo-flash` and `cargo-embed`

`probe-rs` comes along with these two tools:
- [`cargo-flash`][cargo-flash]: A flash tool that downloads your binary to the target and runs it.
- [`cargo-embed`][cargo-embed]: Superset of `cargo-flash` that also allows opening an RTT terminal or a GDB server. A [configuration file][cargo-embed-config] can used to define the behavior.

[cargo-flash]: https://probe.rs/docs/tools/cargo-flash/
[cargo-embed]: https://probe.rs/docs/tools/cargo-embed/
[cargo-embed-config]: https://probe.rs/docs/tools/cargo-embed/#configuration

## GDB Integration

`probe-rs` includes a GDB stub to integrate into your usual workflow with common tools. The `probe-rs gdb` command runs a GDB server, by default in port, `1337`.

GDB with all the Espressif products supported can be obtained in [`espressif/binutils-gdb`][binutils-repo]

[binutils-repo]: https://github.com/espressif/binutils-gdb
