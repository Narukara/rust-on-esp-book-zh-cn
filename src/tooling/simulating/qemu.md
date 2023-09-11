# QEMU

Espressif 维护了一个 QEMU 的分支，位于[espressif/QEMU][espressif-qemu]，其中包含了必要的补丁，使其能够在 Espressif 芯片上运行。
请参考[QEMU wiki][qemu-wiki]以了解如何构建 QEMU 并使用它来仿真项目。

构建完成 QEMU 后，您应该有`qemu-system-xtensa`文件。

[espressif-qemu]: https://github.com/espressif/qemu
[qemu-wiki]: https://github.com/espressif/qemu/wiki

## 使用 QEMU 运行您的项目

> ⚠️ **注意**: 目前只支持 ESP32，因此请确保您正在编译`xtensa-esp32-espidf`目标。

要在 QEMU 中运行我们的项目，我们需要一个固件/镜像，其中包含引导加载程序和分区表的合并。
我们可以使用[`cargo-espflash`][cargo-espflash]来生成它：

```shell
cargo espflash save-image --chip esp32 --merge <OUTFILE> --release
```

如果您想使用[`espflash`][espflash]，您可以先构建项目，然后生成镜像来实现相同的结果：

```shell
cargo build --release
espflash save-image --merge ESP32 target/xtensa-esp32-espidf/release/<NAME> <OUTFILE>
```

现在，在 QEMU 中运行镜像：

```shell
/path/to/qemu-system-xtensa -nographic -machine esp32 -drive file=<OUTFILE>,if=mtd,format=raw
```

[cargo-espflash]: https://github.com/esp-rs/espflash/tree/main/cargo-espflash
[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash
