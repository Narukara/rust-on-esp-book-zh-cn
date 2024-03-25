
# OpenOCD

与 [`probe-rs`][probe-rs] 类似，OpenOCD 不支持 `Xtensa` 架构。然而，乐鑫在 [`espressif/openocd-esp32`][espressif-openocd-esp32] 下维护了一个 OpenOCD 的分支，该分支支持乐鑫的芯片。

有关如何在你的平台上安装 `openocd-esp32` 的说明可以在[乐鑫文档][espressif-documentation]中找到。

GDB with all the Espressif products supported can be obtained in [`espressif/binutils-gdb`][binutils-repo].

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

## VS Code Extension

OpenOCD can be used in VS Code via the [`cortex-debug`][cortex-debug] extension to debug Espressif products.

[cortex-debug]: https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug

### Configuration

1. If required, connect the external JTAG adapter.
   1. See Configure Other JTAG Interfaces section of ESP-IDF Programming Guide. Eg: [Section for ESP32][jtag-interfaces-esp32]
> ⚠️ **Note**: On Windows, `USB Serial Converter A 0403 6010 00` driver should be WinUSB.
2. Set up VSCode
   1. Install [Cortex-Debug][cortex-debug] extension for VS Code.
   2. Create the `.vscode/launch.json` file in the project tree you want to debug.
   3. Update `executable`, `svdFile`, `serverpath` paths, and `toolchainPrefix` fields.

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

# Debugging with Multiple Cores

Sometimes you may need to debug each core individually in GDB or with VSCode. In this case, change `set ESP_RTOS none` to `set ESP_RTOS hwthread`. This will make each core appear as a hardware thread in GDB. This is not currently documented in Espressif official documentation but in OpenOCD docs: https://openocd.org/doc/html/GDB-and-OpenOCD.html
