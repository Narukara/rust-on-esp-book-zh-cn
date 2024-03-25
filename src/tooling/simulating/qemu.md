# QEMU

乐鑫维护了一个 QEMU 的分支，位于 [espressif/QEMU][espressif-qemu]，其中包含了必要的补丁，使其能够在乐鑫芯片上运行。
请参考 [ESP 专用的 QEMU 使用指南][esp-qemu-doc] 以了解如何构建 QEMU 并使用它来仿真项目。

构建完成 QEMU 后，应该有 `qemu-system-xtensa` 文件。

[espressif-qemu]: https://github.com/espressif/qemu
[esp-qemu-doc]: https://github.com/espressif/esp-toolchain-docs/tree/main/qemu/esp32#overview

## 使用 QEMU 运行项目

> ⚠️ **注意**: 目前只支持 ESP32，因此请确保正在编译 `xtensa-esp32-espidf` 目标。

要在 QEMU 中运行我们的项目，我们需要一个固件（firmware）/镜像（image），其中包含引导加载程序（bootloader）和分区表。
我们可以使用 [`cargo-espflash`][cargo-espflash] 来生成它：

```shell
cargo espflash save-image --chip esp32 --merge <OUTFILE> --release
```

如果想使用 [`espflash`][espflash]，可以先构建项目，然后生成镜像来实现相同的结果：

```shell
cargo build --release
espflash save-image --chip ESP32 --merge target/xtensa-esp32-espidf/release/<NAME> <OUTFILE>
```

现在，在 QEMU 中运行镜像：

```shell
/path/to/qemu-system-xtensa -nographic -machine esp32 -drive file=<OUTFILE>,if=mtd,format=raw
```

[cargo-espflash]: https://github.com/esp-rs/espflash/tree/main/cargo-espflash
[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash
