# 应用启动与 bootloader

许多嵌入式设备上电后，会直接从 flash 中的某个地址开始执行代码。乐鑫芯片的启动过程稍微复杂一些，需要先设置 flash、缓存，并完成其他一些操作。为此，我们需要一个 bootloader：它是一个简单的应用程序，负责完成上述设置，然后跳转到其他代码开始执行。

乐鑫设备使用两级 bootloader 来启动应用程序：

- 一级 bootloader（ROM bootloader）：设置与架构相关的寄存器，检查[启动模式][boot-mode]和复位原因，并加载二级 bootloader。这个 bootloader 已固化在 ROM 中，是 SoC 的一部分，因此无需烧录，也无法修改。
- 二级 bootloader：加载你的应用程序，并设置内存（RAM、PSRAM 或 flash）。

虽然从_技术上_讲二级 bootloader 并非必需，但仍建议使用。它支持 OTA（一级 bootloader 只能从 flash 中的固定偏移处加载应用程序），并且可以启用 flash 加密和安全启动。详情请参阅 [OTA 章节](./ota.md)。

有关启动过程的更多信息，请参阅 [ESP-IDF 文档][esp-idf-startup]。不过，其中某些内容可能仅适用于 ESP-IDF。

[boot-mode]: https://docs.espressif.com/projects/esptool/en/latest/esp32c6/advanced-topics/boot-mode-selection.html?highlight=boot%20mode
[esp-idf-startup]: https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-guides/startup.html

## 二级 bootloader

目前仅支持将 ESP-IDF bootloader 用作二级 bootloader。未来这一情况会有所改变，因为我们计划加入对 [MCUBOOT] 等其他 bootloader 的支持。

### ESP-IDF bootloader

它使用 [ESP 镜像格式][esp-image-format]，详情请参阅 [ESP-IDF 文档][esp-idf-second-stage-bootloader]。ESP-IDF bootloader 配合分区表，确定二进制文件的位置。

[esp-idf-second-stage-bootloader]: https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-guides/startup.html#second-stage-bootloader

#### 分区表

乐鑫设备的 flash 可以存储多个应用程序，以及校准数据、文件系统和参数存储等各种数据。为了管理这些内容，需要将分区表烧录到设备上的默认偏移处。

ESP-IDF 二级 bootloader 通过查看分区表，确定二进制文件的位置。分区表中的每个条目都有名称（标签）、类型（`app`、`data` 或其他类型）、子类型，以及分区在 flash 中的偏移。

使用 [`espflash`][espflash] 时，如果没有提供二级 bootloader 或分区表，`espflash` 会使用默认的 bootloader 和分区表；你也可以创建[自定义分区表][custom-partition-table]。

[esp-image-format]: https://docs.espressif.com/projects/esptool/en/latest/esp32/advanced-topics/firmware-image-format.html
[espflash]: ../getting-started/tooling/espflash.md
[custom-partition-table]: https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-guides/partition-tables.html#creating-custom-tables

#### 构建自定义 ESP-IDF bootloader

`espflash` 和 `cargo-espflash` 包含使用默认设置编译的预构建 ESP-IDF [bootloader][bootloaders]，无需额外配置即可开始使用。不过，如果需要更高级的功能或自定义设置，就需要自行构建 bootloader，以满足具体需求。

要构建自定义 ESP-IDF bootloader：
1. [安装 ESP-IDF][esp-idf-install]。
2. 创建一个新项目，或进入已有项目。
   - 最简单的方式是使用 `esp-idf/examples` 目录中的任意示例。
3. 使用 `idf.py menuconfig` 或编辑 `sdkconfig` 文件，对 bootloader 进行所需的修改。
   - 详情请参阅[配置选项参考][config-reference]。
4. 使用 `idf.py set-target <CHIP_TARGET> build bootloader` 构建 bootloader。
   - 生成的 bootloader 二进制文件位于 `build/bootloader/bootloader.bin`。
5. 通过 `--bootloader` 参数或[配置文件][espflash-config-file]，在 `espflash/cargo-espflash` 中使用构建好的 bootloader 二进制文件。

[bootloaders]: https://github.com/esp-rs/espflash/tree/main/espflash/resources/bootloaders
[esp-idf-install]: https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html#manual-installation
[config-reference]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/kconfig-reference.html#configuration-options-reference
[espflash-config-file]: https://github.com/esp-rs/espflash/tree/main/espflash#configuration-file
[MCUBOOT]: https://docs.mcuboot.com/
