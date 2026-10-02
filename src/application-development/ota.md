# 空中升级（OTA）

空中升级（OTA）是指_无需_生产烧录工具即可更新应用程序的能力。OTA 高度依赖 bootloader，由它处理 OTA 镜像（固件更新）的切换、替换和回滚。对于每种受支持的 bootloader，我们都提供相应的支持 crate。目前只支持 ESP-IDF bootloader，因此只有 [`esp-bootloader-esp-idf`] crate。

`esp-hal` 仓库中有一个[简单的 OTA 示例][small OTA example]。这个示例虽然基础，但展示了实现 OTA 功能所需的基本组件。请务必查看相关文档，其中也提供了使用 `espflash` 创建 OTA 二进制文件的说明。

[`esp-bootloader-esp-idf`]: https://github.com/esp-rs/esp-hal/blob/main/esp-bootloader-esp-idf
[small OTA example]: https://github.com/esp-rs/esp-hal/tree/main/examples/ota
