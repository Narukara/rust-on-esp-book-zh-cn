# 从模板生成项目

我们目前维护了两个模板仓库：
- [`esp-generate`][esp-generate] - `no_std` 模板。
- [`esp-idf-template`][esp-idf-template] - `std` 模板。


## `esp-generate`

`esp-generate` 是一个项目生成工具，可用于生成包含所有必需配置和依赖项的应用程序

1. 安装 `esp-generate`：
    ```shell
    cargo install esp-generate
    ```
2. 基于模板生成项目，选择芯片和项目名称：
    ```shell
    esp-generate --chip=esp32c6 your-project
    ```
    参见[`esp-generate` 简介][understanding-esp-generate]了解模板项目的更多详细信息。

    调用 `esp-generate` 子命令时，它会提示一个 TUI，你可以在其中选择应用程序的配置。完成此过程后，你将获得一个配置正确且可构建的项目。

3. 构建/运行生成的项目：
   - 用 `cargo build` 编译项目（使用合适的工具链和目标）。
   - 用 `cargo run` 编译项目、向目标设备烧写程序、并开启一个串口监视器。

[esp-generate]: https://github.com/esp-rs/esp-generate
[understanding-esp-generate]: ./esp-generate.md

## `esp-idf-template`

`esp-idf-template` 基于 [`cargo-generate`][cargo-generate]，这是一个允许你基于现有模板创建新项目的工具。在我们的场景中，[`esp-idf-template`][esp-idf-template] 可用于生成包含所有必需配置和依赖项的应用程序。

1. 安装 `cargo generate`：
    ```shell
    cargo install cargo-generate
    ```
2. 基于模板生成项目：
    ```shell
    cargo generate esp-rs/esp-idf-template cargo
    ```
    参见[`esp-idf-template` 简介][understanding-esp-idf-template]了解模板项目的更多详细信息。

    调用 `cargo generate` 子命令时，它会询问几个关于应用程序目标的问题。完成这些问题后，就会生成一个配置好的项目，可以直接构建。

3. 构建/运行生成的项目：
   - 用 `cargo build` 编译项目（自动使用合适的工具链和目标）。
   - 用 `cargo run` 编译项目、向目标设备烧写程序、并开启一个串口监视器。

[cargo-generate]: https://github.com/cargo-generate/cargo-generate
[esp-idf-template]: https://github.com/esp-rs/esp-idf-template
[understanding-esp-idf-template]: ./esp-idf-template.md

## 在模板中使用开发容器（Dev Container）

两个模板仓库都支持开发容器。

开发容器使用 [`idf-rust`][idf-rust] 镜像，[配置开发环境][setting-env]中的[使用容器][using-container]一节对此进行了解释。这个镜像提供了一个无需安装即可为乐鑫芯片开发 Rust 应用程序的环境。开发容器还可以与 [Wokwi 模拟器][wokwi]协作，以模拟项目，并允许使用 [`web-flash`][web-flash] 从容器中进行烧写。

[idf-rust]: https://hub.docker.com/r/espressif/idf-rust/tags
[using-container]: ../../installation/using-containers.md
[wokwi]: https://wokwi.com/
[web-flash]: https://github.com/bjoernQ/esp-web-flash-server
[setting-env]: ../../installation/index.md
