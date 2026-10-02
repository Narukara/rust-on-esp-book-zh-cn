# 配置

[`esp-config`][esp-config] crate 为 `esp-*` crate 提供了一种管理额外配置的方式，这些配置不适合通过 Cargo feature 表达。

## 查找可用的配置

完整的可用选项列表位于相应 crate 的[文档][documentation]中。例如，这里列出了 ESP32-C6 的 [`esp-hal` 配置选项][esp-hal-config]。

## 使用方法

创建项目时，你可能需要配置一些额外的高级参数，例如将外设放在 RAM 中以提高性能，或更改某个 crate 的 RX/TX 队列大小。为此，你需要调整 `esp-config` 提供的配置项。

你可以使用以下两种方式：

- 设置环境变量。例如，在 `esp-hal` 中，如果想将匿名符号放在 RAM 中，需要创建名为 `ESP_HAL_CONFIG_PLACE_ANON_IN_RAM` 的环境变量，并修改其值。该配置项的默认值为 `false`。

- 在 `.cargo/config.toml` 中设置所需参数（这种方式同样会设置环境变量）：

  ```toml
  # .cargo/config.toml

  [env]
  ESP_HAL_CONFIG_PLACE_ANON_IN_RAM="true"
  ```

  修改 `.cargo/config.toml` 的 `[env]` 部分后，建议**清理构建产物后重新构建**。

> [!NOTE]
> 在命令行中设置的环境变量优先于 `[env]` 部分。

## 多套配置

根据应用程序的需求，你可能希望在同一个项目中支持不同的开发板、芯片或目标。这时，各目标可能需要设置不同的选项。我们建议采用以下配置方式：

- 一个基础的 `.cargo/config.toml`，包含常用的构建参数（无论是否传入其他 `--config` 参数，Cargo _始终_会读取并遵循这个文件）。
- 在 `.cargo/` 下为每套配置准备一个配置文件。
- （**推荐**）设置一个 Cargo [别名][alias]，用于按指定配置构建，例如 `run-config-a = "run --config=./.cargo/config_a.toml --release"`。简单情况下，也可以直接在命令行中传入 `--config`。

请参阅[这个示例仓库][this example repo]，进一步了解使用多套配置的项目。

## 定义自己的配置选项

你可能也想在项目中定义一些配置选项。为此，需要在 `esp_config.yml` 文件中以声明的方式定义这些选项、默认值，以及其他参数和检查。详情请参阅项目仓库中的[定义配置选项][Defining Configuration Options]部分。

[documentation]: https://docs.espressif.com/projects/rust/
[esp-config]: https://crates.io/crates/esp-config
[Defining Configuration Options]: https://github.com/esp-rs/esp-hal/tree/main/esp-config#defining-configuration-options
[esp-hal-config]: https://docs.espressif.com/projects/rust/esp-hal/1.0.0/esp32c6/esp_hal/index.html#additional-configuration
[this example repo]: https://github.com/bjoernQ/esp-hal-multiconfig-example/tree/main
[alias]: https://doc.rust-lang.org/cargo/reference/config.html#alias
