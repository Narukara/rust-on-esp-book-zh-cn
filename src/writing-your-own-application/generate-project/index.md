# 从模板生成项目

我们目前维护了两个模板仓库：
- [`esp-generate`][esp-generate] - `no_std` 模板。
- [`esp-idf-template`][esp-idf-template] - `std` 模板。


## `esp-generate`

`esp-generate` is project generation tool that can be used to generate an application with all the required configurations and dependencies

1. Install `esp-generate`:
    ```shell
    cargo install esp-generate
    ```
2. Generate a project based on the template, selecting the chip and the name of the project:
    ```shell
    esp-generate --chip=esp32c6 your-project
    ```
    See [Understanding `esp-generate`][understanding-esp-generate] for more details on the template project.

    When the `esp-generate` subcommand is invoked, you will be prompted with a TUI where you can select the configuration of your application. Upon completion of this process, you will have a buildable project with all the correct configurations.

3. Build/Run the generated project:
   - Use `cargo build` to compile the project using the appropriate toolchain and target.
   - Use `cargo run` to compile the project, flash it, and open a serial monitor with our target device.

[esp-generate]: https://github.com/esp-rs/esp-generate
[understanding-esp-generate]: ./esp-generate.md

## `esp-idf-template`

`esp-idf-template` is based on [`cargo-generate`][cargo-generate], a tool that allows you to create a new project based on some existing template. In our case, [`esp-idf-template`][esp-idf-template] can be used to generate an application with all the required configurations and dependencies.

1. 安装 `cargo generate`：
    ```shell
    cargo install cargo-generate
    ```
2. Generate a project based on the template:
    ```shell
    cargo generate esp-rs/esp-idf-template cargo
    ```
    See [Understanding `esp-idf-template`][understanding-esp-idf-template] for more details on the template project.

    调用 `cargo generate` 子命令时，它会询问几个关于应用程序目标的问题。完成这些问题后，就会生成一个配置好的项目，可以直接构建。

3. 构建/运行生成的项目：
   - 用 `cargo build` 编译项目（自动使用合适的工具链和目标）。
   - 用 `cargo run` 编译项目、向目标设备烧写程序、并开启一个串口监视器。

[cargo-generate]: https://github.com/cargo-generate/cargo-generate
[esp-idf-template]: https://github.com/esp-rs/esp-idf-template
[understanding-esp-idf-template]: ./esp-idf-template.md

## 在模板中使用开发容器（Dev Container）

两个模板仓库都带有开发容器支持。

开发容器使用 [`idf-rust`][idf-rust] 镜像，[配置开发环境][setting-env]中的[使用容器][using-container]一节对此进行了解释。这个镜像提供了一个无需安装即可为乐鑫芯片开发 Rust 应用程序的环境。开发容器还可以与 [Wokwi 模拟器][wokwi]协作，以模拟项目，并允许使用 [`web-flash`][web-flash] 从容器中进行烧写。

[idf-rust]: https://hub.docker.com/r/espressif/idf-rust/tags
[using-container]: ../../installation/using-containers.md
[wokwi]: https://wokwi.com/
[web-flash]: https://github.com/bjoernQ/esp-web-flash-server
[setting-env]: ../../installation/index.md
