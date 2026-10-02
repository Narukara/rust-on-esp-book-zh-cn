# `probe-rs`

[`probe-rs`][probe-rs] 项目提供了一套工具，可以通过各种调试探针与嵌入式微控制器交互，并对[乐鑫芯片][chips]提供了完善的支持。

除了烧录和监控，它还提供完善的调试功能。

如果不确定现在是否需要它，可以暂时跳过安装，以后再回来安装。

带有 `USB-JTAG-SERIAL` 外设的乐鑫设备无需额外的硬件，就可以使用 `probe-rs`。没有这个外设的设备则需要 [ESP-Prog][esp-prog] 等外部编程器。

> [!NOTE]
> ESP32-C6、ESP32-H2、ESP32-S3 和 ESP32-C3（修订版 0.3 或更新版本）提供 `USB-JTAG-SERIAL` 外设。

[probe-rs]: https://probe.rs/
<!--- probe-rs 网站上的搜索功能目前不可用 --->
[chips]: https://probe.rs/targets/?q=espressif&p=0
[esp-prog]: https://docs.espressif.com/projects/esp-iot-solution/en/latest/hw-reference/ESP-Prog_guide.html

## 安装

请参阅 probe-rs 网站上的[安装][probe-rs-installation]和[配置][probe-rs-setup]指南。

[probe-rs-installation]: https://probe.rs/docs/getting-started/installation/
[probe-rs-setup]: https://probe.rs/docs/getting-started/probe-setup/
