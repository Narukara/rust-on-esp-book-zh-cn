# 在 Visual Studio Code 中进行调试

在 Visual Studio Code 中，还可以直接进行可视化的调试。

## ESP32

### 配置

1. 连接外部 JTAG 适配器：可以使用 [ESP-Prog][esp-prog]。

| ESP32 引脚  | JTAG 信号 |
| :---------: | :-------: |
| MTDO/GPIO15 |    TDO    |
| MTDI/GPIO12 |    TDI    |
| MTCK/GPIO13 |    TCK    |
| MTMS/GPIO14 |    TMS    |
|     3V3     |   VJTAG   |
|     GND     |    GND    |

> ⚠️ **注意**：在 Windows 上，`USB Serial Converter A 0403 6010 00` 驱动程序应为 WinUSB。

2. 设置 VSCode
   1. 安装 VS Code 的 [Cortex-Debug][cortex-debug] 扩展。
   2. 在要调试的项目树中创建 `.vscode/launch.json` 文件。
   3. 更新 `executable`、`svdFile`、`serverpath` 路径和 `toolchainPrefix` 字段。

```json
{
  // 使用IntelliSense了解可能的属性。
  // 悬停以查看现有属性的描述。
  // 有关更多信息，请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      // 更多信息请参见：https://github.com/Marus/cortex-debug/blob/master/package.json
      "name": "Attach",
      "type": "cortex-debug",
      "request": "attach", // 使用 attach 而不是 launch，避免因为尝试写入 flash 导致运行失败
      "cwd": "${workspaceRoot}",
      "executable": "target/xtensa-esp32-none-elf/debug/.....",
      "servertype": "openocd",
      "interface": "jtag",
      "svdFile": "../../esp-pacs/esp32/svd/esp32.svd",
      "toolchainPrefix": "xtensa-esp32-elf",
      "openOCDPreConfigLaunchCommands": ["set ESP_RTOS none"],
      "serverpath": "C:/Espressif/tools/openocd-esp32/v0.11.0-esp32-20220411/openocd-esp32/bin/openocd.exe",
      "configFiles": ["board/esp32-wrover-kit-3.3v.cfg"],
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

[esp-prog]: https://docs.espressif.com/projects/espressif-esp-iot-solution/en/latest/hw-reference/ESP-Prog_guide.html
[cortex-debug]: https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug

## ESP32-C3

内置 JTAG 接口的可用性取决于 ESP32-C3 版本：

- 早于 3 的版本**没有**内置 JTAG 接口。
- 版本 3（及更高版本）**具有**内置 JTAG 接口，无需连接外部设备即可进行调试。

要查找 ESP32-C3 版本，请运行：

```shell
cargo espflash board-info
# 或者
espflash board-info
```

### 配置

1.（**仅适用于早于 3 的版本**）连接外部 JTAG 适配器，可以使用 [ESP-Prog][esp-prog]。

| ESP32-C3 引脚 | JTAG 信号 |
| :-----------: | :-------: |
|  MTDO/GPIO7   |    TDO    |
|  MTDI/GPIO5   |    TDI    |
|  MTCK/GPIO6   |    TCK    |
|  MTMS/GPIO4   |    TMS    |
|      3V3      |   VJTAG   |
|      GND      |    GND    |

> ⚠️ **注意**：在 Windows 上，`USB Serial Converter A 0403 6010 00` 驱动程序应为 WinUSB。

2. 设置 VSCode
   1. 安装 VS Code 的 [Cortex-Debug][cortex-debug] 扩展。
   2. 在要调试的项目树中创建 `.vscode/launch.json` 文件。
   3. 更新 `executable`、`svdFile`、`serverpath` 路径和 `toolchainPrefix` 字段。
```json
{
  // 使用IntelliSense了解可能的属性。
  // 悬停以查看现有属性的描述。
  // 有关更多信息，请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      // 更多信息请参见：https://github.com/Marus/cortex-debug/blob/master/package.json
      "name": "Attach",
      "type": "cortex-debug",
      "request": "attach", // 使用 attach 而不是 launch，避免因为尝试写入 flash 导致运行失败
      "cwd": "${workspaceRoot}",
      "executable": "target/riscv32imc-unknown-none-elf/debug/examples/usb_serial_jtag", //
      "servertype": "openocd",
      "interface": "jtag",
      "svdFile": "../../esp-pacs/esp32c3/svd/esp32c3.svd",
      "toolchainPrefix": "riscv32-esp-elf",
      "openOCDPreConfigLaunchCommands": ["set ESP_RTOS none"],
      "serverpath": "C:/Espressif/tools/openocd-esp32/v0.11.0-esp32-20220411/openocd-esp32/bin/openocd.exe",
      "configFiles": ["board/esp32c3-builtin.cfg"],
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
