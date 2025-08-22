
# OpenOCD

与 [`probe-rs`][probe-rs] 类似，OpenOCD 不支持 `Xtensa` 架构。然而，乐鑫在 [`espressif/openocd-esp32`][espressif-openocd-esp32] 下维护了一个 OpenOCD 的分支，该分支支持乐鑫的芯片。

有关如何在你的平台上安装 `openocd-esp32` 的说明可以在[乐鑫文档][espressif-documentation]中找到。

支持所有乐鑫产品的 GDB 可以在 [`espressif/binutils-gdb`][binutils-repo] 中获得。

安装完成后，只需使用正确的参数运行 `openocd` 即可。对于具有内置 [`USB-JTAG-SERIAL` 外设][usb-jtag-serial] 的芯片，通常有一个可以直接使用的配置文件，例如在 ESP32-C3 上：

```shell
openocd -f board/esp32c3-builtin.cfg
```

对于其他配置，可能需要指定芯片和接口，例如，使用 J-Link 的 ESP32：

```shell
openocd -f interface/jlink.cfg -f target/esp32.cfg
```

[probe-rs]: ./probe-rs.md
[espressif-openocd-esp32]: https://github.com/espressif/openocd-esp32
[espressif-documentation]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-guides/jtag-debugging/index.html#setup-of-openocd
[binutils-repo]: https://github.com/espressif/binutils-gdb
[usb-jtag-serial]: index.md#usb-jtag-serial-peripheral

## VS Code 扩展

OpenOCD 可以通过 [`cortex-debug`][cortex-debug] 扩展在 VS Code 中使用，以调试乐鑫产品。

[cortex-debug]: https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug

### 配置

1. 如果需要，连接外部 JTAG 适配器。
   1. 请参阅 ESP-IDF 编程指南的"配置其他 JTAG 接口"部分。例如：[ESP32 部分][jtag-interfaces-esp32]
> ⚠️ **注意**：在 Windows 上，`USB Serial Converter A 0403 6010 00` 驱动程序应该是 WinUSB。
2. 设置 VSCode
   1. 为 VS Code 安装 [Cortex-Debug][cortex-debug] 扩展。
   2. 在要调试的项目树中创建 `.vscode/launch.json` 文件。
   3. 更新 `executable`、`svdFile`、`serverpath` 路径和 `toolchainPrefix` 字段。

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      // more info at: https://github.com/Marus/cortex-debug/blob/master/package.json
      "name": "Attach",
      "type": "cortex-debug",
      "request": "attach", // launch will fail when attempting to download the app into the target
      "cwd": "${workspaceRoot}",
      "executable": "target/xtensa-esp32-none-elf/debug/.....", //!MODIFY
      "servertype": "openocd",
      "interface": "jtag",
      "toolchainPrefix": "xtensa-esp32-elf", //!MODIFY
      "openOCDPreConfigLaunchCommands": ["set ESP_RTOS none"],
      "serverpath": "C:/Espressif/tools/openocd-esp32/v0.11.0-esp32-20220411/openocd-esp32/bin/openocd.exe", //!MODIFY
      "gdbPath": "C:/Espressif/tools/riscv32-esp-elf-gdb/riscv32-esp-elf-gdb/bin/riscv32-esp-elf-gdb.exe", //!MODIFY
      "configFiles": ["board/esp32-wrover-kit-3.3v.cfg"], //!MODIFY
      "overrideAttachCommands": [
        "set remote hardware-watchpoint-limit 2",
        "mon halt",
        "flushregs"
      ],
      "overrideRestartCommands": ["mon reset halt", "flushregs", "c"]
    }
  ]
}
```

[jtag-interfaces-esp32]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/configure-other-jtag.html

# 多核调试

有时你可能需要在 GDB 或 VSCode 中单独调试每个核心。在这种情况下，将 `set ESP_RTOS none` 更改为 `set ESP_RTOS hwthread`。这将使每个核心在 GDB 中显示为硬件线程。这在乐鑫官方文档中目前没有记录，但在 OpenOCD 文档中有说明：https://openocd.org/doc/html/GDB-and-OpenOCD.html
