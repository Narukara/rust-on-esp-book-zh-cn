# OpenOCD

与[`probe-rs`][probe-rs]类似，OpenOCD 不支持`Xtensa`架构。然而，Espressif 在[espressif/openocd-esp32][espressif-openocd-esp32]下维护了一个 OpenOCD 的分支，该分支支持 Espressif 的芯片。

有关如何在您的平台上安装`openocd-esp32`的说明可以在[Espressif 文档][espressif-documentation]中找到。

[probe-rs]: ./probe-rs.md
[espressif-openocd-esp32]: https://github.com/espressif/openocd-esp32
[espressif-documentation]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-guides/jtag-debugging/index.html#setup-of-openocd

## Espressif 芯片的设置

<!-- how to choose interface & chip -->

安装完成后，只需使用正确的脚本运行`openocd`即可。对于具有内置 USB JTAG 的芯片，通常有一个可以直接使用的配置，例如在 ESP32-C3 上：

```shell
openocd -f board/esp32c3-builtin.cfg
```

对于其他配置，可能需要指定芯片和接口，例如，使用 J-Link 的 ESP32：

```shell
openocd -f interface/jlink.cfg -f target/esp32.cfg
```
